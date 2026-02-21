import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MouseTransition, TouchTransition, MultiBackend } from 'react-dnd-multi-backend';
import { emptyResource, GameCard, RESOURCE_KEYS, EFFECT_KEYWORDS, TYPE_COLORS, type ResourceMap, type PopupPayload, type DropPayload, type Checkbox, type Upgrade, type EffectTiming, type SavedGame, type GameScore, type SortMode } from "./types";
import { allCards } from "./cards";
import { getCardEffects, type GameContext, type CardEffect, cardEffectsRegistry, getCardFameValue, getCardUpgradeAdditionalCost, getCardSelectionValue } from "./cardEffects";
import { useTranslation, type Language, LanguageSelector, type TranslationKeys } from './i18n';
import { createPortal } from 'react-dom';
import { EXPANSIONS, FOCUS_KEYS } from "./expansions";
import { DEFAULT_TUTORIAL_STEPS, tutorial, TutorialOverlay } from "./tutorial";

const ZONE_MIN_HEIGHT = "290px";

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

const cardHighlightStyle = `
  @keyframes cardPulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
    }
    50% { 
      transform: scale(1.05);
      box-shadow: 0 0 20px 10px rgba(59, 130, 246, 0.4);
    }
  }
`;

// deep-clone preserving prototype/methods
function cloneGameCard(src: GameCard): GameCard {
  const out = new GameCard({});
  out.id = src.id;
  out.name = src.name;
  // Default to 1 (Front Up) if currentSide is not set
  out.currentSide = src.currentSide || 1;
  out.type = [...src.type];
  out.choice = src.choice;
  out.negative = [...src.negative];
  out.discoverable = src.discoverable;

  // deep-copy resources (sides -> options -> resource keys)
  out.resources = src.resources.map((side) =>
    side.map((r) => ({ ...emptyResource, ...r }))
  );
  while (out.resources.length < 4) out.resources.push([{ ...emptyResource }]);
  
  out.effects = [...src.effects];
  out.upgrades = src.upgrades.map((arr) =>
    arr.map((u) => ({ 
      cost: u.cost ? { ...u.cost } : null, 
      nextSide: u.nextSide,
      otherCost: u.otherCost 
    }))
  );

  // Expected shape: checkboxes: Array< Array<{ content: string, checked: boolean }> > length 4
  out.checkboxes = (src.checkboxes || []).map((side: Checkbox[]) => side.map((c: Checkbox) => ({ ...c })));
  while (out.checkboxes.length < 4) out.checkboxes.push([]);

  return out;
}

// helper to get icon path for a resource key (assumes public/resources/<key>.png)
function resourceIconPath(key: keyof ResourceMap) {
  return `/resources/${String(key).toLowerCase()}.png`;
}

// side label helper
function sideLabel(side: number, t: (key: TranslationKeys) => string) {
  return side === 1
    ? t('frontUp')
    : side === 2
    ? t('frontDown')
    : side === 3
    ? t('backUp')
    : t('backDown');
}

// -------------------
// Helper to render background card color
// -------------------
function getBackgroundStyle(card: GameCard, sideIdx: number) {
  const rawType = card.type?.[sideIdx];
  if (!rawType) return {};

  let types: string[] = [];

  if (Array.isArray(rawType)) {
    types = rawType.flatMap((t) => t.split(" - ").map((s: string) => s.trim().toLowerCase()));
  } else if (typeof rawType === "string") {
    types = rawType.split(" - ").map((s: string) => s.trim().toLowerCase());
  }

  // Les types sont maintenant en minuscules et correspondent aux clés de TYPE_COLORS
  const colors = types.map((t) => TYPE_COLORS[t] || TYPE_COLORS["default"]);

  if (card.negative[sideIdx]) {
    colors.push(TYPE_COLORS["enemy"]);
  }

  if (colors.length === 0) {
    colors.push(TYPE_COLORS["default"]);
  }

  if (colors.length === 1) {
    return { background: colors[0] };
  }
  if (colors.length >= 2) {
    return {
      background: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
    };
  }
  return {};
}

function renderCheckboxContent(content: string | undefined, outOfBox?: boolean) {
  if (!content || content.trim() === "") return <span className="text-xs text-gray-400"></span>;
  if (content.trim() === "*") return <span className="font-bold text-sm">*</span>;
  
  // Parse resources: handle both "resource" and "resource x5" formats
  const resources = content.split(",").map((s) => s.trim()).filter(Boolean);
  const parsedResources: Array<{name: string, count: number}> = [];

  resources.forEach(resource => {
    const match = resource.match(/^(\w+)\s*x(\d+)$/i);
    if (match && RESOURCE_KEYS.includes(match[1] as keyof ResourceMap)) {
      // Format: "coin x5"
      parsedResources.push({ name: match[1], count: parseInt(match[2]) });
    }
    else if (RESOURCE_KEYS.includes(resource as keyof ResourceMap)) {
      // Format: "coin" (default count = 1)
      parsedResources.push({ name: resource, count: 1 });
    }
  });

  if (parsedResources.length === 0) {
    // Fallback: render as plain text
    return (<span className="text-[8px] font-bold">{content}</span>);
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      {parsedResources.map((res, i) => (
        <div key={i} className="flex items-center">
          <img 
            src={resourceIconPath(res.name as keyof ResourceMap)} 
            alt={res.name} 
            className="w-full h-full object-contain" 
            style={{ marginBottom: res.count > 1 && !outOfBox ? '-8px' : undefined, marginLeft: outOfBox ? '-16px' : undefined }}
          />
          {res.count > 1 && (
            <span className="relative text-xxs font-medium" style={{ marginLeft: !outOfBox ? '-10px' : '6px', marginTop: !outOfBox ? '-16px' : undefined }}>{res.count}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function parseEffects(raw: string) {
  if (!raw) return { before: "", effects: [] as { text: string; keyword: string }[] };

  const pattern = new RegExp(`\\b(${EFFECT_KEYWORDS.join("|")})`, "gi");

  const matches: Array<{ index: number; keyword: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(raw)) !== null) {
    matches.push({ index: match.index, keyword: match[0].toLowerCase() });
  }

  if (matches.length === 0) {
    return { before: raw.trim(), effects: [] };
  }

  const validMatches = matches.filter(m => {
    let depth = 0;
    for (let i = 0; i < m.index; i++) {
      if (raw[i] === '(') depth++;
      else if (raw[i] === ')') depth--;
    }
    if (depth !== 0) return false;

    let lastPeriodIndex = -1;
    for (let i = m.index - 1; i >= 0; i--) {
      if (raw[i] === '.') { lastPeriodIndex = i; break; }
    }
    const textBefore = raw.slice(lastPeriodIndex + 1, m.index);
    return /^\s*$/.test(textBefore);
  });

  if (validMatches.length === 0) {
    return { before: raw.trim(), effects: [] };
  }

  const before = raw.slice(0, validMatches[0].index).trim();
  const effects: { text: string; keyword: string }[] = [];

  for (let i = 0; i < validMatches.length; i++) {
    const start = validMatches[i].index;
    let effectText = "";
    let depth = 0;
    let foundEnd = false;

    for (let j = start; j < raw.length; j++) {
      const ch = raw[j];

      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === '.' && depth === 0) {
        const nextKeywordIndex = i < validMatches.length - 1 ? validMatches[i + 1].index : Infinity;

        let hasParenAfter = false;
        let parenStart = -1;
        for (let k = j + 1; k < nextKeywordIndex && k < raw.length; k++) {
          if (raw[k] === '(') { hasParenAfter = true; parenStart = k; break; }
          else if (raw[k].trim() && validMatches.some(vm => vm.index === k)) { break; }
        }

        if (hasParenAfter && parenStart < nextKeywordIndex) {
          let parenDepth = 1;
          let parenEnd = -1;
          for (let k = parenStart + 1; k < raw.length; k++) {
            if (raw[k] === '(') parenDepth++;
            else if (raw[k] === ')') {
              parenDepth--;
              if (parenDepth === 0) { parenEnd = k; break; }
            }
          }
          if (parenEnd !== -1) {
            effectText = raw.slice(start, parenEnd + 1).trim();
            foundEnd = true;
            break;
          }
        } else {
          effectText = raw.slice(start, j + 1).trim();
          foundEnd = true;
          break;
        }
      }
    }

    if (!foundEnd) {
      const end = i < validMatches.length - 1 ? validMatches[i + 1].index : raw.length;
      effectText = raw.slice(start, end).trim();
    }

    if (effectText) {
      effects.push({ text: effectText, keyword: validMatches[i].keyword });
    }
  }

  return { before, effects };
}

export function renderEffectText(effect: string, t: (key: TranslationKeys) => string) {
  const parts = effect.split(/(\s+)/);
  return parts.map((part, idx) => {
    if (/^\s+$/.test(part)) {
      return <span key={idx}>{part}</span>;
    }
    if (part.startsWith("resources/") || part.startsWith("effects/")) {
      const isWide = part.includes('effects/choice') || part.includes('effects/permanent');
      return (
        <img
          key={idx}
          src={part.concat(".png")}
          alt={part}
          className={`inline mx-0.5 ${isWide ? "w-20 h-2" : "w-4 h-4"}`}
        />
      );
    }
    else if (part.startsWith("i18n/")) {
      return (
        <span key={idx} className="inline">
          {t(part.split("i18n/")[1] as TranslationKeys)}
        </span>
      );
    }
    return (
      <span key={idx} className="inline">
        {part}
      </span>
    );
  });
}

// -------------------
// Card Preview Popup Component
// -------------------
function CardPreviewPopup({
  card,
  position,
  previewRef
}: {
  card: GameCard;
  position: { top: number; left: number };
  previewRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { t } = useTranslation();

  const cardRefs = {
    frontUp: useRef<HTMLDivElement>(null),
    backUp: useRef<HTMLDivElement>(null),
    frontDown: useRef<HTMLDivElement>(null),
    backDown: useRef<HTMLDivElement>(null),
  };

  const [arrowCoordinates, setArrowCoordinates] = useState({
    leftColumn: {
      topCardBottom: 0,
      bottomCardTop: 0,
      arrowHeight: 0,
    },
    rightColumn: {
      topCardBottom: 0,
      bottomCardTop: 0,
      arrowHeight: 0,
    },
  });

  useEffect(() => {
    const measureHeights = () => {
      const frontUpHeight = cardRefs.frontUp.current?.offsetHeight ?? 0;
      const backUpHeight = cardRefs.backUp.current?.offsetHeight ?? 0;

      const gap = 12;

      setArrowCoordinates({
        leftColumn: {
          topCardBottom: frontUpHeight,
          bottomCardTop: frontUpHeight,
          arrowHeight: gap,
        },
        rightColumn: {
          topCardBottom: backUpHeight,
          bottomCardTop: backUpHeight,
          arrowHeight: gap,
        },
      });
    };

    const timer = setTimeout(measureHeights, 100);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  function renderOptionIcons(opt: Record<string, number>, keyPrefix = "") {
    const optMap = (opt || {}) as Record<string, number>;
    const icons = RESOURCE_KEYS.flatMap((k) => {
      const count = optMap[k as string] ?? 0;
      if (!count) return [];
      return (
        <span key={`${keyPrefix}-${k}`} className="inline-flex items-center gap-1 mr-1">
          <img src={resourceIconPath(k)} alt={k} className="w-3 h-3" />
          <span className="text-xs">x{count}</span>
        </span>
      );
    });
    return icons.length > 0 ? <>{icons}</> : <span className="text-xs text-gray-400"></span>;
  }

  function renderSideOptions(sideOpts: Record<string, number>[] | undefined, sideIdx: number) {
    if (!Array.isArray(sideOpts) || sideOpts.length === 0) {
      return <span className="text-xs text-gray-400"></span>;
    }
    return (
      <>
        {sideOpts.map((opt, optIdx) => (
          <span key={`side-${sideIdx}-opt-${optIdx}`} className="inline-flex items-center">
            {renderOptionIcons(opt, `s${sideIdx}o${optIdx}`)}
            {optIdx < sideOpts.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </>
    );
  }

  function renderUpgradeCost(upg: Upgrade) {
    const elements = [];
    
    if (upg.cost && Object.keys(upg.cost).length > 0) {
      Object.entries(upg.cost).forEach(([key, value]) => {
        if (value > 0) {
          elements.push(
            <span key={key} className="inline-flex items-center gap-0.5">
              <img 
                src={resourceIconPath(key as keyof ResourceMap)} 
                alt={key} 
                className="w-3 h-3" 
              />
              <span className="text-[8px]">x{value}</span>
            </span>
          );
        }
      });
    }
    
    if (upg.otherCost) {
      if (elements.length > 0) {
        elements.push(<span key="separator" className="text-[8px]">, </span>);
      }
      elements.push(<span key="other" className="text-[8px] italic">{upg.otherCost}</span>);
    }
    
    if (elements.length === 0) {
      return <span className="text-[8px] text-gray-500">{t('none')}</span>;
    }
    
    return <>{elements}</>;
  }

  return (
    <div 
      ref={previewRef}
      className="fixed z-9999 p-3 border-2 rounded-lg bg-white shadow-2xl pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        minWidth: '450px',
        maxWidth: '450px'
      }}
    >
      {/* Card ID */}
      <div className="absolute text-bold text-xs left-[48%] text-center mb-3" style={{top: `${arrowCoordinates.leftColumn.topCardBottom + 10}px`}}>
        {card.id}
      </div>
      <div className="relative">
        <div className="grid grid-cols-2 gap-3 max-w-[450px]">
          {/* Front Up (Side 1) - INDEX 0 */}
          <div ref={cardRefs.frontUp} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 0)}>
            {/* Badge */}
            <div className="absolute left-24 top-2 w-8 h-8">
              <img
                src={`/badges/${card.name[0]}.png`}
                alt={' '}
                className="relative left-16 w-8 h-8 shrink-0 object-contain pointer-events-none"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            {card.name[0] ? (
              <>
                <div className="text-xs font-bold mb-1">
                  {card.GetName(t, 0)}
                </div>
                <div className="text-[10px] text-gray-700 mb-1">
                  {card.GetType(t, 0)}
                </div>
                <div className="text-[10px] mb-1">
                  {renderSideOptions(card.resources[0], 0)}
                </div>
                {card.effects[0] && (
                  <div className="text-[9px] mt-1 border-t pt-2">
                    {renderEffectText(card.GetEffect(t, 0), t)}
                  </div>
                )}
                {card.upgrades[0]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[0].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {t(card.name[upg.nextSide - 1] as TranslationKeys)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">{t('none')}</div>
            )}
          </div>

          {/* Back Up (Side 3) - INDEX 2 */}
          <div ref={cardRefs.backUp} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 2)}>
            {/* Badge */}
            <div className="absolute right-20 top-2 w-8 h-8">
              <img
                src={`/badges/${card.name[2]}.png`}
                alt={' '}
                className="relative left-16 w-8 h-8 shrink-0 object-contain pointer-events-none"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            {card.name[2] ? (
              <>
                <div className="text-xs font-bold mb-1">
                  {card.GetName(t, 2)}
                </div>
                <div className="text-[10px] text-gray-700 mb-1">
                  {card.GetType(t, 2)}
                </div>
                <div className="text-[10px] mb-1">
                  {renderSideOptions(card.resources[2], 2)}
                </div>
                {card.effects[2] && (
                  <div className="text-[9px] mt-1 border-t pt-2">
                    {renderEffectText(card.GetEffect(t, 2), t)}
                  </div>
                )}
                {card.upgrades[2]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[2].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {t(card.name[upg.nextSide - 1] as TranslationKeys)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">{t('none')}</div>
            )}
          </div>

          {/* Front Down (Side 2) - INDEX 1 */}
          <div ref={cardRefs.frontDown} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 1)}>
            {/* Badge */}
            <div className="absolute left-24 w-8 h-8" style={{top: `${arrowCoordinates.leftColumn.topCardBottom + 20}px`}}>
              <img
                src={`/badges/${card.name[1]}.png`}
                alt={' '}
                className="relative left-16 w-8 h-8 shrink-0 object-contain pointer-events-none"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            {card.name[1] ? (
              <>
                <div className="text-xs font-bold mb-1">
                  {card.GetName(t, 1)}
                </div>
                <div className="text-[10px] text-gray-700 mb-1">
                  {card.GetType(t, 1)}
                </div>
                <div className="text-[10px] mb-1">
                  {renderSideOptions(card.resources[1], 1)}
                </div>
                {card.effects[1] && (
                  <div className="text-[9px] mt-1 border-t pt-2">
                    {renderEffectText(card.GetEffect(t, 1), t)}
                  </div>
                )}
                {card.upgrades[1]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[1].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {t(card.name[upg.nextSide - 1] as TranslationKeys)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">{t('none')}</div>
            )}
          </div>

          {/* Back Down (Side 4) - INDEX 3 */}
          <div ref={cardRefs.backDown} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 3)}>
            {/* Badge */}
            <div className="absolute right-20 w-8 h-8" style={{top: `${arrowCoordinates.rightColumn.topCardBottom + 20}px`}}>
              <img
                src={`/badges/${card.name[3]}.png`}
                alt={' '}
                className="relative left-16 w-8 h-8 shrink-0 object-contain pointer-events-none"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            {card.name[3] ? (
              <>
                <div className="text-xs font-bold mb-1">
                  {card.GetName(t, 3)}
                </div>
                <div className="text-[10px] text-gray-700 mb-1">
                  {card.GetType(t, 3)}
                </div>
                <div className="text-[10px] mb-1">
                  {renderSideOptions(card.resources[3], 3)}
                </div>
                {card.effects[3] && (
                  <div className="text-[9px] mt-1 border-t pt-2">
                    {renderEffectText(card.GetEffect(t, 3), t)}
                  </div>
                )}
                {card.upgrades[3]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[3].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {t(card.name[upg.nextSide - 1] as TranslationKeys)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">{t('none')}</div>
            )}
          </div>
        </div>

        {/* [1] Front Up → [2] Front Down (vertical down, left column) */}
        {card.upgrades[0]?.some(u => u.nextSide === 2) && (
          <div 
            className="absolute left-[20%] w-0.5 bg-blue-500"
            style={{
              top: `${arrowCoordinates.leftColumn.topCardBottom}px`,
              height: `${arrowCoordinates.leftColumn.arrowHeight}px`,
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-blue-500"></div>
          </div>
        )}

        {/* [2] Front Down → [1] Front Up (vertical up, left column) */}
        {card.upgrades[1]?.some(u => u.nextSide === 1) && (
          <div 
            className="absolute left-[22%] w-0.5 bg-green-500"
            style={{
              top: `${arrowCoordinates.leftColumn.bottomCardTop}px`,
              height: `${arrowCoordinates.leftColumn.arrowHeight}px`,
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-500"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}

        {/* [3] Back Up → [4] Back Down (vertical down, right column) */}
        {card.upgrades[2]?.some(u => u.nextSide === 4) && (
          <div 
            className="absolute right-[20%] w-0.5 bg-blue-500"
            style={{
              top: `${arrowCoordinates.rightColumn.topCardBottom}px`,
              height: `${arrowCoordinates.rightColumn.arrowHeight}px`,
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-blue-500"></div>
          </div>
        )}

        {/* [4] Back Down → [3] Back Up (vertical up, right column) */}
        {card.upgrades[3]?.some(u => u.nextSide === 3) && (
          <div 
            className="absolute right-[22%] w-0.5 bg-green-500"
            style={{
              top: `${arrowCoordinates.rightColumn.bottomCardTop}px`,
              height: `${arrowCoordinates.rightColumn.arrowHeight}px`,
            }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-green-500"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}

        {/* [1] Front Up → [3] Back Up (horizontal right, top row, offset up) */}
        {card.upgrades[0]?.some(u => u.nextSide === 3) && (
          <div className="absolute top-[14%] left-[47%] w-[5%] h-0.5 bg-purple-500">
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-purple-500"></div>
          </div>
        )}

        {/* [3] Back Up → [1] Front Up (horizontal left, top row, offset up) */}
        {card.upgrades[2]?.some(u => u.nextSide === 1) && (
          <div className="absolute top-[16%] right-[48%] w-[5%] h-0.5 bg-orange-500">
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-orange-500"></div>
          </div>
        )}

        {/* [2] Front Down → [4] Back Down (horizontal right, bottom row, offset down) */}
        {card.upgrades[1]?.some(u => u.nextSide === 4) && (
          <div className="absolute bottom-[14%] left-[47%] w-[5%] h-0.5 bg-purple-500">
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-purple-500"></div>
          </div>
        )}

        {/* [4] Back Down → [2] Front Down (horizontal left, bottom row, offset down) */}
        {card.upgrades[3]?.some(u => u.nextSide === 2) && (
          <div className="absolute bottom-[16%] right-[48%] w-[5%] h-0.5 bg-orange-500">
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[6px] border-r-orange-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------
// Card View Component
// -------------------
function CardView({
  card,
  fromZone,
  onRightClick,
  onTapAction,
  onUpgrade,
  onGainResources,
  onCardUpdate,
  onExecuteCardEffect,
  gatherProductionBonus,
  gatherAdditionalProductionOptions,
  interactable = true,
  isHighlighted = false,
}: {
  card: GameCard;
  fromZone: string;
  onRightClick: (card: GameCard, zone: string) => void;
  onTapAction?: (card: GameCard, zone: string) => void;
  onUpgrade?: (card: GameCard, upgrade: Upgrade, zone: string) => void;
  onGainResources?: (card: GameCard, resources: Partial<ResourceMap>, zone: string) => void;
  onCardUpdate?: (updatedCard: GameCard, zone: string) => void;
  onExecuteCardEffect?: (card: GameCard, zone: string, timing: EffectTiming, effectId: number) => Promise<void>;
  gatherProductionBonus?: (card: GameCard, zone: string) => Partial<ResourceMap>;
  gatherAdditionalProductionOptions?: (card: GameCard, zone: string) => Array<Partial<ResourceMap>>;
  interactable?: boolean;
  isHighlighted?: boolean;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
  const touchTimeout = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
  const upgradePreviewRef = useRef<HTMLDivElement | null>(null);
  const [showUpgradePreview, setShowUpgradePreview] = useState(false);
  const [upgradePreviewSide, setUpgradePreviewSide] = useState<number | null>(null);
  const [upgradePreviewPosition, setUpgradePreviewPosition] = useState({ top: 0, left: 0 });

  const [, drag] = useDrag(
  () => ({
   type: "CARD",
   item: { id: card.id, fromZone, card },
   canDrag: () => interactable,
  }),
  [card, fromZone, interactable]
  );
  drag(ref);

  // Calculate optimal popup position
  useEffect(() => {
    if (showPreview && ref.current && previewRef.current) {
      const cardRect = ref.current.getBoundingClientRect();
      const previewRect = previewRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      // Default: to the left of the card
      let top = cardRect.top + (cardRect.height / 2) - (previewRect.height / 2);
      let left = cardRect.left - previewRect.width - 8;

      // If popup goes outside left edge, move to the right side
      if (left < 8) {
        left = cardRect.right + 8;
      }

      // Keep inside viewport vertically
      if (top < 8) {
        top = 8;
      } else if (top + previewRect.height > viewport.height - 8) {
        top = viewport.height - previewRect.height - 8;
      }

      setPreviewPosition({ top, left });
    }
  }, [showPreview]);

  useEffect(() => {
    if (showUpgradePreview && upgradePreviewRef.current) {
      const previewRect = upgradePreviewRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      // Get mouse position from the last mouse event
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mouseX = (window as any).lastMouseX || viewport.width / 2;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mouseY = (window as any).lastMouseY || viewport.height / 2;

      let top = mouseY - previewRect.height / 2;
      let left = mouseX + 20;

      // Keep inside viewport
      if (left + previewRect.width > viewport.width - 8) {
        left = mouseX - previewRect.width - 20;
      }
      if (top < 8) {
        top = 8;
      } else if (top + previewRect.height > viewport.height - 8) {
        top = viewport.height - previewRect.height - 8;
      }

      setUpgradePreviewPosition({ top, left });
    }
  }, [showUpgradePreview, upgradePreviewSide]);

  const resOptions = card.GetResources();
  const effect = card.GetEffect(t);
  const currentUpgrades = card.GetUpgrades();
  const type = card.GetType(t);
  const name = card.GetName(t);

  // helper to render icons for a single resource option object (opt)
  function renderOptionIcons(opt: Record<string, number>, keyPrefix = "") {
    const optMap = (opt || {}) as Record<string, number>;
    const icons = RESOURCE_KEYS.flatMap((k) => {
      const count = optMap[k as string] ?? 0;
      if (!count) return [];
      return (
        <span key={`${keyPrefix}-${k}`} className="inline-flex items-center gap-1 mr-1">
          <img src={resourceIconPath(k)} alt={k} className="w-3 h-3" />
          <span className="text-xs">x{count}</span>
        </span>
      );
    });

    return icons.length > 0 ? <>{icons}</> : <span className="text-xs text-gray-400"></span>;
  }

  // helper to render a side's options (option objects separated by '/')
  function renderSideOptions(sideOpts: Record<string, number>[] | undefined, sideIdx: number) {
    if (!Array.isArray(sideOpts) || sideOpts.length === 0) {
      return <span className="text-xs text-gray-400"></span>;
    }
    return (
      <>
        {sideOpts.map((opt, optIdx) => (
          <span key={`side-${sideIdx}-opt-${optIdx}`} className="inline-flex items-center">
            {renderOptionIcons(opt, `s${sideIdx}o${optIdx}`)}
            {optIdx < sideOpts.length - 1 && <span className="mx-1">/</span>}
          </span>
        ))}
      </>
    );
  }

  function renderEffect(raw: string) {
    const { before, effects } = parseEffects(raw);
    const cardEffects = getCardEffects(card.id, card.currentSide);

    const visibleEffects = effects.filter((_, parsedIdx) => {
      const effect = cardEffects[parsedIdx];
      return !(effect?.unusable === true);
    });

    return (
      <div className="flex flex-col gap-1">
        {before && (
          <div 
            className="text-[10px] italic overflow-auto overscroll-contain" 
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {renderEffectText(before, t)}
          </div>
        )}

        {visibleEffects.map((effObj, displayIdx) => {
          const originalIdx = effects.indexOf(effObj);
          const effect = cardEffects[originalIdx];
          const isClickable = effect && effect.timing === "onClick";

          if (isClickable) {
            return (
              <button
                key={displayIdx}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  await onExecuteCardEffect?.(card, fromZone, "onClick", originalIdx);
                }}
                className="text-[10px] px-2 py-1 border rounded transition text-left w-full bg-blue-50 hover:bg-blue-100 border-blue-300"
              >
                {renderEffectText(effObj.text, t)}
              </button>
            );
          } else {
            return (
              <div key={displayIdx} className="text-[10px] px-2 py-1">
                {renderEffectText(effObj.text, t)}
              </div>
            );
          }
        })}
      </div>
    );
  }

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = cardHighlightStyle;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const currentSideIdx = (card.currentSide || 1) - 1;
  const sideCheckboxes = card.checkboxes?.[currentSideIdx] ?? [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
      onTouchStart={() => {
        touchTimeout.current = setTimeout(() => setShowPreview(true), 450);
      }}
      onTouchEnd={() => {
        clearTimeout(touchTimeout.current);
        setShowPreview(false);
      }}
    >
      <Card
        ref={ref}
        onContextMenu={(e) => {
          e.preventDefault();
          onRightClick(card, fromZone);
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!interactable) return;
          if (onTapAction) onTapAction(card, fromZone);
        }}
        style={{
          ...getBackgroundStyle(card, currentSideIdx),
          animation: isHighlighted ? 'cardPulse 0.6s ease-in-out' : undefined,
        }}
        className={`w-49 h-70 m-0 flex flex-col items-center justify-between border-2 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
          ${!interactable ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"}
          ${isHighlighted ? "ring-4 ring-4 ring-blue-400 border-blue-500" : ""}`}
      >

        <CardContent className="text-center p-2 overflow-auto flex flex-col h-full w-full">
          {card.GetType(t).includes(t('permanent')) && <img src={"effects/permanent.png"} alt={t('permanentZone')} title={t('permanentZone')} className="w-49 h-2" />}
          {card.choice && fromZone === t('campaign') &&(card.currentSide == 1 || card.currentSide == 3) && <button><img src={"effects/choice.png"} alt={t('choice')} title={t('choice')} className="w-49 h-2" /></button>}
          <div>
            <div className="absolute bottom-1 left-44 text-[8px]">{card.id > 0 ? card.id : ""}</div>
          </div>
          <div>
            <p className="font-bold text-[16px] line-clamp-2 text-center">
              {name}
            </p>
            <p className="font-bold text-[9px] line-clamp-2 text-center">
              {type}
            </p>
          </div>

          {/* Normal (in-play) resources */}
          <div className="mt-2 flex flex-wrap justify-center gap-2 items-center">
            {(() => {
              const baseOptions = resOptions;
              const productionBonus = gatherProductionBonus ? gatherProductionBonus(card, fromZone) : {};
              
              const additionalOptions = gatherAdditionalProductionOptions ? gatherAdditionalProductionOptions(card, fromZone) : [];
              
              const allOptions = [...baseOptions, ...additionalOptions];
              
              return allOptions.map((opt, idx) => {
                const displayOpt = { ...opt };
                
                if (idx < baseOptions.length && productionBonus) {
                  Object.entries(productionBonus).forEach(([key, value]) => {
                    const resourceKey = key as keyof ResourceMap;
                    displayOpt[resourceKey] = (displayOpt[resourceKey] || 0) + (value || 0);
                  });
                }
                
                const icons = RESOURCE_KEYS.flatMap((k) => {
                  const baseCount = opt[k] ?? 0;
                  const bonusCount = (idx < baseOptions.length && productionBonus) ? (productionBonus[k] ?? 0) : 0;
                  const totalCount = baseCount + bonusCount;
                  
                  if (totalCount === 0) return [];
                  
                  return [
                    <div key={`${idx}-${k}`} className="flex items-center gap-1">
                      <img src={resourceIconPath(k)} alt={k} title={`${k} x${totalCount}`} className="w-4 h-4" />
                      {totalCount !== 1 && (
                        <span className="text-xs">
                          {baseCount > 0 && bonusCount > 0 ? (
                            <>
                              {baseCount}
                              <span className="text-green-600 font-bold">+{bonusCount}</span>
                            </>
                          ) : (
                            `x${totalCount}`
                          )}
                        </span>
                      )}
                    </div>
                  ];
                });

                if (icons.length === 0) return null;

                return (
                  <div key={idx} className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!interactable || !onGainResources) return;
                        onGainResources(card, displayOpt, fromZone);
                      }}
                      className="
                        relative overflow-hidden
                        text-[10px] px-2 py-1 rounded-md
                        flex items-center gap-1.5
                        border-blue-300
                        bg-gradient-to-br from-slate-200 via-blue-200 to-slate-300
                        text-slate-700
                        shadow-blue-100
                        hover:shadow-blue-200
                        hover:from-slate-100 hover:via-blue-200 hover:to-slate-300
                        hover:shadow-lg hover:shadow-blue-200
                        hover:-translate-y-0.5
                        active:translate-y-0 active:shadow-sm
                        transition-all duration-150
                      "
                    >
                      {/* Brillance */}
                      <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-md" />
                      <div className="relative flex items-center gap-1">
                        {icons}
                      </div>
                    </button>
                  </div>
                );
              }).filter(Boolean);
            })()}
          </div>

          <div className="mt-2">
            {effect && <div className="mb-2 text-sm line-clamp-5">{renderEffect(effect)}</div>}
          </div>

          {/* Checkboxes - Fixed size and layout */}
          <div className="mt-2">
            <div className="grid grid-cols-8 gap-1 justify-items-center">
              {sideCheckboxes.map((box: Checkbox, idx: number) => (
                <button
                  key={idx}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    if (!interactable) return;
                    if (onCardUpdate) {
                      box.checked = !box.checked;
                      onCardUpdate(card, fromZone);
                    }
                  }}
                  className={`w-6 h-6 border rounded flex items-center justify-center p-1 text-[10px] ${
                    box.checked ? "bg-green-100 border-green-400" : "bg-white border-gray-300"
                  } hover:border-gray-400 transition-colors`}
                  title={box.content || t('emptyCheckbox')}
                >
                  {renderCheckboxContent(box.content)}
                </button>
              ))}
            </div>
          </div>

          {/* Upgrades */}
          <div className="mt-2">
            <div className="flex gap-1 flex-wrap justify-center line-clamp-2">
              {currentUpgrades.map((upg, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!interactable || !onUpgrade) return;
                    onUpgrade(card, upg, fromZone);
                  }}
                  onMouseEnter={(e) => {
                    (window as any).lastMouseX = e.clientX;
                    (window as any).lastMouseY = e.clientY;
                    setUpgradePreviewSide(upg.nextSide);
                    setShowUpgradePreview(true);
                  }}
                  onMouseLeave={() => {
                    setShowUpgradePreview(false);
                    setUpgradePreviewSide(null);
                  }}
                  className="
                    relative overflow-hidden
                    text-[10px] px-2 py-1 rounded-md
                    flex items-center gap-1
                    font-semibold tracking-wide
                    border border-amber-400
                    bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500
                    text-amber-900
                    shadow-md shadow-amber-200
                    hover:from-amber-200 hover:via-yellow-300 hover:to-amber-400
                    hover:shadow-lg hover:shadow-amber-300
                    hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-sm
                    transition-all duration-150
                  "
                >
                  {/* Brillance */}
                  <span className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-md" />

                  <div className="flex items-center gap-1 relative">
                    {upg.cost ? (
                      Object.entries(upg.cost).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-0.5">
                          <img src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-3 h-3" />
                          <span>x{v}</span>
                        </span>
                      ))
                    ) : (
                      <span>{t('noCost')}</span>
                    )}
                    {upg.otherCost && (
                      <span className="italic">{upg.otherCost}</span>
                    )}
                  </div>
                  <span className="relative opacity-60">→</span>
                  <span className="relative">{t(card.name[upg.nextSide - 1] as TranslationKeys)}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        {/* Pixel art bottom left */}
        <div className="relative bottom-1 right-19 w-8 h-8">
          <img 
            src={`/badges/${card.name[card.currentSide - 1]}.png`}
            alt={' '}
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      </Card>

      {/* --- PREVIEW POPUP --- */}
      {showPreview && createPortal(
        <CardPreviewPopup 
          card={card} 
          position={previewPosition} 
          previewRef={previewRef} 
        />,
        document.body
      )}
      {/* --- UPGRADE PREVIEW POPUP --- */}
      {showUpgradePreview && upgradePreviewSide !== null && createPortal(
        <div 
          ref={upgradePreviewRef}
          className="fixed z-[9999] p-3 border-2 rounded-lg bg-white shadow-2xl pointer-events-none"
          style={{
            top: `${upgradePreviewPosition.top}px`,
            left: `${upgradePreviewPosition.left}px`,
            minWidth: '225px',
            maxWidth: '225px'
          }}
        >
          <div className="border rounded p-2" style={getBackgroundStyle(card, upgradePreviewSide - 1)}>
            {card.name[upgradePreviewSide - 1] ? (
              <>
                <div className="text-sm font-bold mb-1">{t(card.name[upgradePreviewSide - 1] as TranslationKeys)}</div>
                <div className="text-xs text-gray-700 mb-2">{t(card.type[upgradePreviewSide - 1] as TranslationKeys)}</div>
                
                {/* Resources */}
                <div className="text-xs mb-2">
                  {renderSideOptions(card.resources[upgradePreviewSide - 1], upgradePreviewSide - 1)}
                </div>

                {/* Pixel art bottom right */}
                <div className="absolute top-6 right-5 w-8 h-8">
                  <img 
                    src={`/badges/${card.name[upgradePreviewSide - 1]}.png`}
                    alt={' '}
                    className="relative right-align w-8 h-8 shrink-0 object-contain pointer-events-none"
                    style={{ imageRendering: 'pixelated' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                
                {/* Effects */}
                {card.effects[upgradePreviewSide - 1] && (
                  <div className="text-[10px] mt-2 border-t pt-2">
                    {renderEffectText(t(card.effects[upgradePreviewSide - 1] as TranslationKeys), t)}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-400 italic text-center py-4">{t('emptySide')}</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// -------------------
// Drop Zone Component
// -------------------
function Zone({
  name,
  cards,
  onDrop,
  onRightClick,
  onUpgrade,
  onGainResources,
  onCardUpdate,
  onExecuteCardEffect,
  gatherProductionBonus,
  gatherAdditionalProductionOptions,
  showAll = true,
  interactable = true,
  onTapAction,
  highlightedCardId,
  onReorderCards,
  onZoneRef,
  debugMode,
}: {
  name: string;
  cards: GameCard[];
  onDrop: (payload: { id: number; fromZone: string }) => void;
  onRightClick: (c: GameCard, zone: string) => void;
  onUpgrade?: (card: GameCard, upgrade: Upgrade, zone: string) => void;
  onGainResources?: (card: GameCard, resources: Partial<ResourceMap>, zone: string) => void;
  onCardUpdate?: (updatedCard: GameCard, zone: string) => void;
  onExecuteCardEffect?: (card: GameCard, zone: string, timing: EffectTiming, effectId: number) => Promise<void>;
  gatherProductionBonus?: (card: GameCard, zone: string) => Partial<ResourceMap>;
  gatherAdditionalProductionOptions?: (card: GameCard, zone: string) => Array<Partial<ResourceMap>>;
  showAll?: boolean;
  interactable?: boolean;
  onTapAction?: (card: GameCard, zone: string) => void;
  highlightedCardId?: number | null;
  onReorderCards?: (cardIds: number[]) => void;
  onZoneRef?: (el: HTMLDivElement | null) => void;
  debugMode?: boolean;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [sortMode, setSortMode] = useState<SortMode>(null);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const sortableZones = [t('playArea'), t('permanentZone'), t('blocked')];

  let displayCards = cards;
  if (!showAll && cards.length > 0) {
    displayCards = [cards[cards.length - 1]];
  }

  const [, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: { id: number; fromZone: string }) => {
        if (!debugMode) return;
        if (item.fromZone !== name) {
          onDrop(item);
          return;
        }
        
        const draggedCard = displayCards.find(c => c.id === item.id);
        if (draggedCard && draggedOverIndex !== null) {
          const newOrder = [...displayCards];
          const draggedIdx = newOrder.findIndex(c => c.id === item.id);
          newOrder.splice(draggedIdx, 1);
          newOrder.splice(draggedOverIndex, 0, draggedCard);
          onReorderCards?.(newOrder.map(c => c.id));
        }
        setDraggedOverIndex(null);
      },
      hover: (item: { id: number; fromZone: string }, monitor) => {
        if (!debugMode) return;
        if (item.fromZone === name && ref.current) {
          const hoverIndex = Math.floor(
            (displayCards.length * monitor.getClientOffset()!.x) / ref.current.offsetWidth
          );
          setDraggedOverIndex(hoverIndex);
        }
      },
      canDrop: () => interactable && !!debugMode,
    }),
    [displayCards, draggedOverIndex, name, interactable, onDrop, onReorderCards, debugMode]
  );

  drop(ref);

  // --- Layout rules ---
  let containerClass = "grid gap-2";
  let isPermanentZone = false;
  let isBlockedZone = false;
  let isPlayArea = false;
  let gridTemplate: string | undefined;

  if (name === t('playArea')) {
    containerClass = "relative flex justify-start items-start";
    isPlayArea = true;
  } else if (name === t('permanentZone')) {
    containerClass = "relative flex justify-start items-start";
    isPermanentZone = true;
  } else if (name === t('blocked')) {
    containerClass = "relative flex justify-start items-start";
    isBlockedZone = true;
  }
  else if (name === t('deck')) {
    if (!showAll && cards.length > 0) {
      displayCards = [cards[0]];
    }
  }
  else {
    const cols = Math.min(6, displayCards.length || 1);
    gridTemplate = `repeat(${cols}, minmax(220px, 1fr))`;
  }

  // Calculate offset for overlapping cards in permanent zone (max 6 per line)
  const getCardStyle = (index: number): React.CSSProperties => {
    if (!isPermanentZone && !isBlockedZone && !isPlayArea) return {};
    
    if (isPermanentZone || isBlockedZone) {
      const cardsPerLine = isBlockedZone ? 3 : 9;
      const offsetX = 90;
      const offsetY = 290;
      const lineIndex = Math.floor(index / cardsPerLine);
      const positionInLine = index % cardsPerLine;
      
      return {
        position: 'absolute',
        left: `${positionInLine * offsetX}px`,
        top: `${lineIndex * offsetY}px`,
        zIndex: index,
        transition: 'all 0.3s ease',
      };
    }
    
    if (isPlayArea) {
      const cardsPerLine = 6;
      const cardWidth = 196;
      const gap = 8;
      const lineIndex = Math.floor(index / cardsPerLine);
      const positionInLine = index % cardsPerLine;
      
      return {
        position: 'absolute',
        left: `${positionInLine * (cardWidth + gap)}px`,
        top: `${lineIndex * 300}px`,
        zIndex: index,
        transition: 'all 0.3s ease',
      };
    }
    
    return {};
  };

  // Calculate container dimensions for permanent zone
  const getContainerStyle = (): React.CSSProperties => {
    if (isPermanentZone || isBlockedZone) {
      const cardsPerLine = isBlockedZone ? 3 : 9;
      const offsetX = 90;
      const offsetY = 290;
      const fixedWidth = 220 + ((cardsPerLine - 1) * offsetX);
      const totalLines = Math.max(1, Math.ceil(displayCards.length / cardsPerLine));
      const totalHeight = totalLines * offsetY - 10;
      
      return {
        position: "relative",
        width: `${fixedWidth}px`,
        height: `${totalHeight}px`,
      };
    }
    
    if (isPlayArea) {
      const cardsPerLine = 6;
      const cardWidth = 196;
      const gap = 8;
      const fixedWidth = (cardsPerLine * cardWidth) + ((cardsPerLine - 1) * gap);
      const totalLines = Math.max(1, Math.ceil(displayCards.length / cardsPerLine));
      const totalHeight = totalLines * 310 - 10;
      
      return {
        position: "relative",
        width: `${fixedWidth}px`,
        height: `${totalHeight}px`,
      };
    }
    
    // Pour Deck/Discard et autres zones grid
    const cardsPerLine = Math.min(6, displayCards.length || 1);
    const fixedWidth = cardsPerLine * 220; // 220px par colonne (largeur d'une carte)
    
    return {
      position: "relative",
      height: ZONE_MIN_HEIGHT,
      width: `${fixedWidth}px`,
    };
  };

  const handleZoneClick = () => {
    if (!sortableZones.includes(name)) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (newCount === 2) {
      // Appliquer le tri suivant
      const modes: SortMode[] = ['byId', 'byType'];
      const currentIndex = modes.indexOf(sortMode);
      const nextMode = modes[(currentIndex + 1) % modes.length];
      
      applySorting(nextMode);
      setSortMode(nextMode);
      setClickCount(0);
    } else {
      // Réinitialiser après 800ms
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 800);
    }
  };

  const applySorting = (mode: SortMode) => {
    if (!mode) return;

    const sorted = [...displayCards];

    switch (mode) {
      case 'byId':
        sorted.sort((a, b) => a.id - b.id);
        break;
      case 'byType':
        sorted.sort((a, b) => {
          const typeA = a.GetType(t).split(' - ')[0].toLowerCase();
          const typeB = b.GetType(t).split(' - ')[0].toLowerCase();
          return typeA.localeCompare(typeB);
        });
        break;
    }

    onReorderCards?.(sorted.map(c => c.id));
  };

  return (
  <div 
    ref={(el) => {
      ref.current = el;
      if (onZoneRef && el) onZoneRef(el);
    }}
    className="p-4 border-2 rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-shadow duration-300"
    onClick={handleZoneClick}
  >
    <h2 className="text-xl font-bold mb-3 text-gray-800">
      {name}
    </h2>
    <div
      className={containerClass}
      style={{...(
        isPermanentZone || isBlockedZone || isPlayArea || name.includes(t('deck')) || name.includes(t('discard'))
          ? getContainerStyle()
          : {gridTemplateColumns: gridTemplate, alignItems: "start" }
        ),
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'}}
    >
      {displayCards.length > 0 ? (
        displayCards.map((c, index) => (
          <div
            key={`${name}-${c.id}-${c.currentSide}`}
            style={{
                ...getCardStyle(index),
                transition: 'all 0.3s ease-out',
              }}
            className={(isPermanentZone || isBlockedZone || isPlayArea) ? "group" : ""}
            onMouseEnter={(e) => {
              if (isPermanentZone || isBlockedZone || isPlayArea) {
                e.currentTarget.style.zIndex = '1000';
              }
            }}
            onMouseLeave={(e) => {
              if (isPermanentZone || isBlockedZone || isPlayArea) {
                e.currentTarget.style.zIndex = String(index);
              }
            }}
          >
            <div className={(isPermanentZone || isBlockedZone || isPlayArea) ? "group-hover:scale-105 transition-transform duration-300" : ""}>
              <CardView
                card={c}
                fromZone={name}
                onRightClick={onRightClick}
                interactable={interactable}
                onTapAction={onTapAction}
                onUpgrade={onUpgrade}
                onGainResources={onGainResources}
                onCardUpdate={onCardUpdate}
                onExecuteCardEffect={onExecuteCardEffect}
                gatherProductionBonus={gatherProductionBonus}
                gatherAdditionalProductionOptions={gatherAdditionalProductionOptions}
                isHighlighted={highlightedCardId === c.id}
              />
            </div>
          </div>
        ))
      ) : (
        <Card className="w-49 h-70 m-2 flex items-center justify-center border bg-gray-100">
          <CardContent className="text-center text-gray-400">{t('none')}</CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}

// -------------------
// Card Popup Component
// -------------------
function CardPopup({
  payload,
  close,
  replaceCardInZone,
  setResources,
}: {
  payload: PopupPayload;
  close: () => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  resources: ResourceMap;
  setResources: (updater: React.SetStateAction<ResourceMap>) => void;
}) {
  const { t } = useTranslation();
  const [localCard, setLocalCard] = useState<GameCard>(cloneGameCard(payload.editable));
  const [selectedUpgradeIndex, setSelectedUpgradeIndex] = useState<number | null>(null);

  // Side chooser
  const setSide = (half: number) => {
    localCard.currentSide = half;
    setLocalCard(cloneGameCard(localCard));
    setSelectedUpgradeIndex(null);
  };

  // current side options (array of ResourceMap)
  const currentSideResources = localCard.GetResources();
  const currentSideUpgrades = localCard.GetUpgrades();

  // add an option (empty) to current side
  const addOption = () => {
    localCard.resources[localCard.currentSide - 1].push({ ...emptyResource });
    setLocalCard(cloneGameCard(localCard));
  };

  // remove option
  const removeOption = (optIdx: number) => {
    localCard.resources[localCard.currentSide - 1].splice(optIdx, 1);
    if (localCard.resources[localCard.currentSide - 1].length === 0) {
      localCard.resources[localCard.currentSide - 1].push({ ...emptyResource });
    }
    setLocalCard(cloneGameCard(localCard));
  };

  // -------------------
  // Checkbox editing helpers
  // -------------------
  const currentSideIdx = localCard.currentSide - 1;
  const currentCheckboxes = localCard.checkboxes?.[currentSideIdx] ?? [];

  // -------------------
  // Upgrade cost editing helpers
  // -------------------
  const updateUpgradeCost = (upgradeIdx: number, resourceKey: keyof ResourceMap, value: number) => {
    const upg = localCard.upgrades[currentSideIdx][upgradeIdx];
    if (!upg.cost) {
      upg.cost = {};
    }
    upg.cost[resourceKey] = value;
    setLocalCard(cloneGameCard(localCard));
  };

  const updateUpgradeOtherCost = (upgradeIdx: number, value: string) => {
    const upg = localCard.upgrades[currentSideIdx][upgradeIdx];
    upg.otherCost = value;
    setLocalCard(cloneGameCard(localCard));
  };

  const applyChanges = () => {
    // 1) if an upgrade was selected, deduct its cost from global resources and set the card's currentSide to nextSide
    const appliedCard = cloneGameCard(localCard);

    if (selectedUpgradeIndex !== null && currentSideUpgrades[selectedUpgradeIndex]) {
      const upg = currentSideUpgrades[selectedUpgradeIndex];
      if (upg.cost) {
        // Deduct cost keys from player resources
        setResources((prev) => {
          const next = { ...prev };
          Object.entries(upg.cost!).forEach(([k, v]) => {
            const key = k as keyof ResourceMap;
            next[key] = (next[key] || 0) - (v || 0);
          });
          return next;
        });
      }
      // set the card side to the upgrade nextSide
      appliedCard.currentSide = upg.nextSide;
    }

    appliedCard.resources = localCard.resources.map((side) => side.map((r) => ({ ...r })));
    appliedCard.effects = [...localCard.effects];
    appliedCard.upgrades = localCard.upgrades.map((arr) =>
      arr.map((u) => ({ cost: u.cost ? { ...u.cost } : null, nextSide: u.nextSide, otherCost: u.otherCost }))
    );
    appliedCard.name = [...localCard.name]; // Persist name changes

    // persist checkboxes
    appliedCard.checkboxes = localCard.checkboxes?.map((side: Checkbox[]) => side.map((c: Checkbox) => ({ ...c }))) ?? [[],[],[],[]];

    // Replace by id in the original zone (this will keep the card id the same but substitute the instance)
    replaceCardInZone(payload.originZone, payload.originalId, appliedCard);

    // 4) close popup
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-white p-4 rounded-xl space-y-4 max-w-3xl relative max-h-[80vh] overflow-y-auto">
        <h2 className="font-bold">{localCard.GetName(t)}</h2>

        {/* Editeur de noms pour chaque face */}
        <div>
          <h3 className="font-bold">{t('cardNames')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((sideNum) => (
              <div key={sideNum} className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  {sideNum <= 2 ? t('front') : t('back')} - {sideNum % 2 === 1 ? t('up') : t('down')}
                </label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm"
                  value={localCard.name[sideNum - 1] || ""}
                  onChange={(e) => {
                    localCard.name[sideNum - 1] = e.target.value;
                    setLocalCard(cloneGameCard(localCard));
                  }}
                  placeholder={`Name for side ${sideNum}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Side chooser (4 sides) */}
        <div className="flex flex-col gap-2">
          {/* Titres sur une seule ligne */}
          <div className="flex">
            <h3 className="font-bold flex-1 text-left">{t('front')}</h3>
            <h3 className="font-bold flex-1 text-left-center">{t('back')}</h3>
          </div>

          {/* Buttons underneath */}
          <div className="flex">
            {/* Front buttons */}
            <div className="flex gap-2 flex-1 justify-start">
              <Button
                disabled={!localCard.name[0] || localCard.name[0].trim() === ""}
                variant={localCard.currentSide === 1 ? "default" : "secondary"}
                onClick={() => setSide(1)}
              >
                {t('up')}
              </Button>
              <Button
                disabled={!localCard.name[1] || localCard.name[1].trim() === ""}
                variant={localCard.currentSide === 2 ? "default" : "secondary"}
                onClick={() => setSide(2)}
              >
                {t('down')}
              </Button>
            </div>

            {/* Back buttons */}
            <div className="flex gap-2 flex-1 justify-left-center">
              <Button
                disabled={!localCard.name[2] || localCard.name[2].trim() === ""}
                variant={localCard.currentSide === 3 ? "default" : "secondary"}
                onClick={() => setSide(3)}
              >
                {t('up')}
              </Button>
              <Button
                disabled={!localCard.name[3] || localCard.name[3].trim() === ""}
                variant={localCard.currentSide === 4 ? "default" : "secondary"}
                onClick={() => setSide(4)}
              >
                {t('down')}
              </Button>
            </div>
          </div>
        </div>

        {/* Effects section */}
        <div>
          <h3 className="font-bold">Effect (for {sideLabel(localCard.currentSide, t)})</h3>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={3}
            value={localCard.effects[localCard.currentSide - 1] || ""}
            onChange={(e) => {
              localCard.effects[localCard.currentSide - 1] = e.target.value;
              setLocalCard(cloneGameCard(localCard));
            }}
            placeholder="Enter effect text (use 'resources/coin' or 'effects/fire' for icons)"
          />
        </div>

        {/* Editable Resources: multiple options per side, show as list, allow add/remove */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Resources (options for {sideLabel(localCard.currentSide, t)})</h3>
            <Button size="sm" onClick={addOption}>Add Option</Button>
          </div>

          {currentSideResources.map((opt, optIdx) => (
            <div key={optIdx} className="border rounded p-2 my-2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium">Option {optIdx + 1}</div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => removeOption(optIdx)}>Remove</Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {RESOURCE_KEYS.map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <img src={resourceIconPath(key)} alt={key} className="w-4 h-4" />
                    <span className="w-16 capitalize">{key}</span>
                    <input
                      type="number"
                      className="w-20 text-center border rounded"
                      value={opt[key] || 0}
                      onChange={(e) => {
                        const val = parseInt(e.target.value || "0", 10) || 0;
                        localCard.resources[localCard.currentSide - 1][optIdx][key] = val;
                        setLocalCard(cloneGameCard(localCard));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Checkboxes editor for current side */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Checkboxes (for {sideLabel(localCard.currentSide, t)})</h3>
          </div>

          {currentCheckboxes.length === 0 && <div className="text-sm text-gray-400">No checkboxes</div>}

          {currentCheckboxes.map((box: Checkbox, idx: number) => (
            <div key={idx} className="border rounded p-2 my-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!box.checked}
                  onChange={(e) => {
                    box.checked = e.target.checked;
                    setLocalCard(cloneGameCard(localCard));
                  }}
                />
                <input
                  type="text"
                  className="border rounded px-2 py-1 text-sm"
                  value={box.content}
                  onChange={(e) => {
                    box.content = e.target.value;
                    setLocalCard(cloneGameCard(localCard));
                  }}
                  placeholder="'*' or comma-separated resource keys (e.g. coin,silver)"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Upgrades for current side */}
        <div>
          <h3 className="font-bold">Upgrades ({sideLabel(localCard.currentSide, t)})</h3>
          {currentSideUpgrades.length === 0 ? (
            <div className="text-sm text-gray-400">No upgrades</div>
          ) : (
            currentSideUpgrades.map((upg, idx) => {
              const selected = selectedUpgradeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border rounded p-3 my-2 ${
                    selected ? "bg-blue-100 border-blue-400" : "bg-white"
                  }`}
                >
                  {/* Header */}
                  <div
                    className="flex items-center justify-between cursor-pointer mb-2"
                    onClick={() => setSelectedUpgradeIndex(selected ? null : idx)}
                  >
                    <div className="font-medium text-sm">Upgrade {idx + 1}</div>
                    <div className="text-xs text-gray-600">
                      {selected ? "-> Selected" : "Click to select"}
                    </div>
                  </div>

                  {/* Editor */}
                  <div className="mb-2">
                    <div className="text-xs font-medium mb-1">Resource Cost:</div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {RESOURCE_KEYS.map((key) => (
                        <div key={key} className="flex items-center gap-1">
                          <img src={resourceIconPath(key)} alt={key} className="w-4 h-4" />
                          <input
                            type="number"
                            className="w-16 text-center border rounded text-sm"
                            value={upg.cost?.[key] || 0}
                            onChange={(e) => {
                              const val = parseInt(e.target.value || "0", 10) || 0;
                              updateUpgradeCost(idx, key, val);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-medium mb-1">Other Cost:</div>
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={upg.otherCost || ""}
                      onChange={(e) => updateUpgradeOtherCost(idx, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="e.g., 'Discard 2 cards' or 'Pay 1 fame'"
                    />
                  </div>

                  {/* Select Upgrade */}
                  <div>
                    <div className="text-xs font-medium mb-1">Upgrades to:</div>
                    {sideLabel(upg.nextSide, t)}: {localCard.name[upg.nextSide - 1] || 'Unnamed'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button onClick={close}>{t('close')}</Button>
          <Button onClick={applyChanges}>Apply</Button>
        </div>
      </div>
    </div>
  );
}

// -------------------
// Cards Selection Popup
// -------------------
function CardSelectionPopup({
  cards,
  effectDescription,
  zone,
  requiredCount,
  optionalCount,
  searchType,
  triggeringCard,
  onConfirm,
  onCancel,
}: {
  cards: GameCard[];
  effectDescription: string;
  zone: string;
  requiredCount: number;
  optionalCount?: number;
  searchType?: string;
  triggeringCard?: GameCard;
  onConfirm: (selectedCards: GameCard[]) => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  
  const [localCards, setLocalCards] = useState<GameCard[]>(cards);
  
  useEffect(() => {
    setLocalCards(cards);
  }, [cards]);
  
  const maxCount = requiredCount + (optionalCount ?? 0);
  
  const [selectedCards, setSelectedCards] = useState<GameCard[]>(() => {
    let totalValue = 0;
    const selected: GameCard[] = [];
    
    for (const card of localCards) {
      const cardValue = getCardSelectionValue(card, searchType || "");
      if (totalValue + cardValue <= maxCount) {
        selected.push(card);
        totalValue += cardValue;
      } else {
        break;
      }
    }
    
    const allCardsValue = localCards.reduce((sum, c) => sum + getCardSelectionValue(c, searchType || ""), 0);
    if (allCardsValue <= maxCount) {
      return [...localCards];
    }
    
    return [];
  });
  
  const [hoveredCard, setHoveredCard] = useState<GameCard | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
  const previewRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Calculer la valeur totale sélectionnée
  const selectedValue = selectedCards.reduce((sum, card) => {
    return sum + getCardSelectionValue(card, searchType || "");
  }, 0);
  
  const toggleCard = (card: GameCard) => {
    setSelectedCards(prev => {
      const isSelected = prev.some(c => c.id === card.id);
      if (isSelected) {
        return prev.filter(c => c.id !== card.id);
      } else {
        const cardValue = getCardSelectionValue(card, searchType || "");
        const wouldExceed = selectedValue + cardValue > maxCount;
        
        const otherSelectableCards = localCards.filter(c => 
          c.id !== card.id && getCardSelectionValue(c, searchType || "") <= maxCount
        );
        const isOnlyOption = wouldExceed && otherSelectableCards.length === 0 && prev.length === 0;

        if (!wouldExceed || (wouldExceed && cardValue > 1) || isOnlyOption) {
          return [...prev, card];
        }
      }
      return prev;
    });
  };

  // Calculate preview position
  useEffect(() => {
    if (hoveredCard && previewRef.current) {
      const cardElement = cardRefs.current.get(hoveredCard.id);
      if (!cardElement) return;

      const cardRect = cardElement.getBoundingClientRect();
      const previewRect = previewRef.current.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let top = cardRect.top + (cardRect.height / 2) - (previewRect.height / 2);
      let left = cardRect.left - previewRect.width - 8;

      if (left < 8) {
        left = cardRect.right + 8;
      }

      if (top < 8) {
        top = 8;
      } else if (top + previewRect.height > viewport.height - 8) {
        top = viewport.height - previewRect.height - 8;
      }

      setPreviewPosition({ top, left });
    }
  }, [hoveredCard]);

  const onlyCardExceedsMax = localCards.length === 1 && 
    getCardSelectionValue(localCards[0], searchType || "") > maxCount;

  const canConfirm = (selectedValue >= requiredCount && selectedValue <= maxCount)
    || (onlyCardExceedsMax && selectedCards.length === 1)
    || (selectedCards.length >= requiredCount && selectedCards.length <= maxCount);

  const displayMessage = (() => {
    return (
      <>
        {renderEffectText(effectDescription, t)}{" "}
      </>
    );
  })();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80]">
      <div className="bg-white p-4 rounded-xl max-w-5xl max-h-[80vh] overflow-auto flex flex-col">
        <h2 className="font-bold mb-3">{displayMessage}</h2>

        <div className="flex flex-1 gap-4 overflow-auto">
          {triggeringCard && (
            <div className="w-[220px] flex-shrink-0 border rounded p-3 flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-2 text-center">{t('triggeredCard')}</h3>
              <CardView
                card={triggeringCard}
                fromZone={zone}
                onRightClick={() => {}}
                interactable={false}
              />
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-2 border rounded">
            <div className="grid grid-cols-3 gap-2">
              {localCards.map((card) => {
                const isSelected = selectedCards.some(c => c.id === card.id);
                const cardValue = getCardSelectionValue(card, searchType || "");
                const canSwitch = card.choice && (card.currentSide === 1 || card.currentSide === 3) && zone === t('campaign');
                
                return (
                  <div
                    key={`select-${card.id}-${card.currentSide}`}
                    ref={(el) => {
                      if (el) cardRefs.current.set(card.id, el);
                    }}
                    className={`cursor-pointer transition-all relative ${
                      isSelected 
                        ? "ring-4 ring-blue-500 scale-105" 
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                    onMouseEnter={() => setHoveredCard(card)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {cardValue > 1 && (
                      <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
                        {cardValue}
                      </div>
                    )}
                    
                    {/* Zone clickable pour le choix */}
                    {canSwitch && (
                      <button
                        className="absolute top-0 left-0 right-0 h-12 z-30 bg-transparent transition-colors cursor-pointer border-b-2 border-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newSide = card.currentSide === 1 ? 3 : 1;
                          const updatedCard = cloneGameCard(card);
                          updatedCard.currentSide = newSide;
                          
                          setLocalCards(prev => prev.map(c => c.id === card.id ? updatedCard : c));
                          setSelectedCards(prev => prev.map(c => c.id === card.id ? updatedCard : c));
                        }}
                        title={t('choice')}
                      >
                        <img 
                          src="effects/choice.png" 
                          alt={t('choice')} 
                          className="w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity"
                        />
                      </button>
                    )}
                    
                    {/* Zone clickable pour la sélection */}
                    <div 
                      className="absolute inset-0 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCard(card);
                      }}
                    />
                    
                    {/* La carte elle-même - pas d'interaction directe */}
                    <div style={{ pointerEvents: 'none' }}>
                      <CardView
                        card={card}
                        fromZone={zone}
                        onRightClick={() => {}}
                        interactable={false}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 mt-3 border-t">
          <span className="text-sm text-gray-600">
            {selectedValue} / {optionalCount ? `${requiredCount}-${maxCount}` : requiredCount}
          </span>
          <div className="flex gap-2">
            <Button onClick={onCancel} variant="secondary" hidden={zone === t('campaign') || requiredCount !== 0}>
              Cancel
            </Button>
            <Button 
              onClick={() => onConfirm(selectedCards)}
              disabled={!canConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>

        {/* Preview popup */}
        {hoveredCard && (
          <CardPreviewPopup 
            card={hoveredCard} 
            position={previewPosition} 
            previewRef={previewRef} 
          />
        )}
      </div>
    </div>
  );
}

// -------------------
// Effect Confirmation Popup
// -------------------
function EffectConfirmationPopup({
  description,
  onConfirm,
  onSkip
}: {
  description: string;
  onConfirm: () => void;
  onSkip: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80]">
      <div className="bg-white p-6 rounded-xl space-y-4 max-w-md">
        <h2 className="font-bold text-lg">{t('endOfRoundEffect')}</h2>
        
        <div className="text-sm py-4">
          <p>{renderEffectText(description, t)}</p>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            onClick={onSkip}
            variant="secondary"
          >
            {t('report')}
          </Button>
          <Button 
            onClick={onConfirm}
          >
            {t('resolve')}
          </Button>
        </div>
      </div>
    </div>
  );
}

// -------------------
// Checkbox Selection Popup
// -------------------
const CheckboxSelectionPopup: React.FC<{
  card: GameCard;
  requiredCount: number;
  optionalCount: number;
  onConfirm: (selected: Checkbox[]) => void;
  onCancel: () => void;
}> = ({ card, requiredCount, optionalCount, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const sideIndex = card.currentSide - 1;
  const allCheckboxes = card.checkboxes?.[sideIndex] ?? [];
  const available = allCheckboxes.filter((c) => !c.checked);
  const [selected, setSelected] = useState<Checkbox[]>([]);

  const toggle = (checkbox: Checkbox) => {
    if (selected.includes(checkbox)) {
      setSelected(selected.filter((c) => c !== checkbox));
    } else if (selected.length < requiredCount + optionalCount) {
      setSelected([...selected, checkbox]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2">
          {t('selectBetween')} {requiredCount} {t('and')} {requiredCount + optionalCount} {t('checkboxes')}
        </h2>
        {available.length === 0 ? (
          <div className="text-sm mb-4">{t('noCheckboxAvailable')}</div>
        ) : (
          <div className="flex flex-col gap-2 mb-4">
            <div className="grid grid-cols-4">
              {available.map((checkbox, i) => {
                const isSelected = selected.includes(checkbox);
                return (
                  <label
                    key={i}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(checkbox)}
                      disabled={
                        !isSelected && selected.length >= requiredCount + optionalCount
                      }
                    />
                    <span className="p-3">{renderCheckboxContent(checkbox.content, true) ?? `Case ${i + 1}`}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length < requiredCount || selected.length > requiredCount + optionalCount}
            className={`px-3 py-1 rounded ${
              (selected.length >= requiredCount && selected.length <= requiredCount + optionalCount)
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------
// Card Side Selection Popup
// -------------------
const CardSideSelectionPopup: React.FC<{
  card: GameCard;
  requiredCount: number;
  optionalCount: number;
  onConfirm: (selectedSides: number[]) => void;
  onCancel: () => void;
}> = ({ card, requiredCount, optionalCount, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (sideIndex: number) => {
    if (selected.includes(sideIndex)) {
      setSelected(selected.filter((s) => s !== sideIndex));
    } else if (selected.length < requiredCount + optionalCount) {
      setSelected([...selected, sideIndex]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">
          {t('selectBetween')} {requiredCount} {t('and')} {requiredCount + optionalCount} {t('side')}(s)
        </h2>
        <div className="flex flex-col gap-2 mb-4">
           <div className="grid grid-cols-2 gap-2">
            {[1, 3, 2, 4].map((sideNum) => {
              const isSelected = selected.includes(sideNum);
              const sideName = t(card.name[sideNum - 1] as TranslationKeys) || `Side ${sideNum}`;
              return (
                <label
                  key={sideNum}
                  className={`flex items-center gap-2 p-3 rounded cursor-pointer border-2 transition ${
                    isSelected 
                      ? "bg-blue-100 border-blue-500" 
                      : "bg-gray-50 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(sideNum)}
                    disabled={!isSelected && selected.length >= requiredCount + optionalCount}
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{sideLabel(sideNum, t)}</span>
                    <span className="text-xs text-gray-600">{sideName}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => onConfirm(selected)}
            disabled={selected.length < requiredCount || selected.length > requiredCount + optionalCount}
            className={`px-3 py-1 rounded ${
              (selected.length >= requiredCount && selected.length <= requiredCount + optionalCount)
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------
// Upgrade Cost Selection Popup
// -------------------
const UpgradeCostSelectionPopup: React.FC<{
  card: GameCard;
  selectResource: boolean;
  onConfirm: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void;
  onCancel: () => void;
}> = ({ card, selectResource, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const [selectedUpgradeIndex, setSelectedUpgradeIndex] = useState<number | null>(null);
  const [selectedResourceKey, setSelectedResourceKey] = useState<keyof ResourceMap | null>(null);

  const currentUpgrades = card.GetUpgrades();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">
          {t('selectUpgradeRemoveCost')}
        </h2>
        
        {currentUpgrades.length === 0 ? (
          <div className="text-sm mb-4">{t('noUpgradeAvailable')}</div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-sm font-medium">1. {t('selectAnUpgrade')} :</h3>
              {currentUpgrades.map((upg, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedUpgradeIndex(idx);
                    setSelectedResourceKey(null);
                  }}
                  className={`p-3 border rounded transition text-left ${
                    selectedUpgradeIndex === idx
                      ? "bg-blue-100 border-blue-500"
                      : "bg-gray-50 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{t('upgrades')} {idx + 1}</span>
                    <span className="text-xs text-gray-600">
                      → {t(card.name[upg.nextSide - 1] as TranslationKeys)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {upg.cost && Object.keys(upg.cost).length > 0 ? (
                      Object.entries(upg.cost).map(([key, value]) => (
                        <span key={key} className="flex items-center gap-1 text-xs">
                          <img 
                            src={resourceIconPath(key as keyof ResourceMap)} 
                            alt={key} 
                            className="w-4 h-4" 
                          />
                          x{value}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">{t('noCost')}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {upg.otherCost ? (
                        <span className="flex items-center gap-1 text-xs">
                          {upg.otherCost}
                        </span>
                    ): (
                      <span className="text-xs text-gray-400"></span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectResource && selectedUpgradeIndex !== null && currentUpgrades[selectedUpgradeIndex].cost && (
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-sm font-medium">2. {t('selectAResource')} :</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(currentUpgrades[selectedUpgradeIndex].cost || {})
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .filter(([_, value]) => value > 0)
                    .map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedResourceKey(key as keyof ResourceMap)}
                        className={`p-2 border rounded transition ${
                          selectedResourceKey === key
                            ? "bg-green-100 border-green-500"
                            : "bg-gray-50 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <img 
                            src={resourceIconPath(key as keyof ResourceMap)} 
                            alt={key} 
                            className="w-6 h-6" 
                          />
                          <span className="text-xs">x{value}</span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => {
              if (selectedUpgradeIndex !== null) {
                const resourceKey = selectResource && selectedResourceKey !== null 
                  ? selectedResourceKey 
                  : 'coin' as keyof ResourceMap;
                onConfirm(selectedUpgradeIndex, resourceKey);
              }
            }}
            disabled={
              selectedUpgradeIndex === null || 
              (selectResource && selectedResourceKey === null)
            }
            className={`px-3 py-1 rounded ${
              selectedUpgradeIndex !== null && (!selectResource || selectedResourceKey !== null)
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------
// Text Input Popup
// -------------------
const TextInputPopup: React.FC<{
  description: string;
  required: boolean;
  onConfirm: (text: string) => void;
  onCancel: () => void;
}> = ({ description, required, onConfirm, onCancel }) => {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">
          {renderEffectText(description, t)}
        </h2>
        
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Entrez votre texte..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (inputText.trim() || !required)) {
              onConfirm(inputText);
            }
          }}
        />

        <div className="flex justify-end gap-2">
          {!required && (
            <button
              onClick={onCancel}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
            >
              {t('cancel')}
            </button>
          )}
          <button
            onClick={() => onConfirm(inputText)}
            disabled={required && !inputText.trim()}
            className={`px-3 py-1 rounded ${
              (!required || inputText.trim())
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------
// String Choice Popup
// -------------------
const StringChoicePopup: React.FC<{
  description: string;
  choices: string[];
  onConfirm: (choice: string) => void;
}> = ({ description, choices, onConfirm }) => {
  const { t } = useTranslation();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-[90] bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">
          {renderEffectText(description, t)}
        </h2>
        
        <div className="space-y-2 mb-4">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => setSelectedChoice(choice)}
              className={`w-full p-3 border-2 rounded-lg transition text-left font-medium ${
                selectedChoice === choice
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {renderEffectText(choice, t)}
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => selectedChoice && onConfirm(selectedChoice)}
            disabled={!selectedChoice}
            className={`px-4 py-2 rounded ${
              selectedChoice
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------
// The Game
// -------------------
export default function Game() {
  const { t } = useTranslation();
  
  // -------------------
  // Init
  // -------------------
  function shuffle<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const [deck, setDeck] = useState<GameCard[]>(() =>
    shuffle(
      allCards
        .filter((c) => c.id >= 1 && c.id <= 10)
        .map((c) => cloneGameCard(c))
    )
  );

  const [campaignDeck, setCampaignDeck] = useState<GameCard[]>(() =>
    allCards
      .filter((c) => c.id > 10)
      .sort((a, b) => a.id - b.id)
      .map((c) => cloneGameCard(c))
  );

  const [blockedZone, setBlockedZone] = useState<GameCard[]>(() =>
    allCards
      .filter((c) => c.id === 0)
      .map((c) => cloneGameCard(c))
  );

  const [discard, setDiscard] = useState<GameCard[]>([]);
  const [playArea, setPlayArea] = useState<GameCard[]>([]);
  const [permanentZone, setPermanentZone] = useState<GameCard[]>([]);
  const [temporaryCardList, setTemporaryCardList] = useState<GameCard[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  temporaryCardList;
  const [popupCard, setPopupCard] = useState<PopupPayload | null>(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [showPurged, setShowPurged] = useState(false);
  const [showEndRound, setShowEndRound] = useState(false);
  const [campaignPreview, setCampaignPreview] = useState<GameCard | null>(null);
  const [resources, setResources] = useState<ResourceMap>({ ...emptyResource });
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [availableDiscoverableCards, setAvailableDiscoverableCards] = useState<number[]>([]);

  const [cityNameInput, setCityNameInput] = useState("");
  const [selectedKingdom, setSelectedKingdom] = useState("New Kingdom");

  const [turnEndFlag, setTurnEndFlag] = useState(false);
  const [hasEndedBaseGame, setHasEndedBaseGame] = useState(false);
  const [shouldComputeFame, setShouldComputeFame] = useState(false);

  const [blockMap, setBlockMap] = useState<Map<number, number[]>>(new Map());

  // Effects handling
  const [resourceChoicePopup, setResourceChoicePopup] = useState<{
    options: Array<Partial<ResourceMap>>;
    resolve: (choice: Partial<ResourceMap> | null) => void;
  } | null>(null);

  const [cardSelectionPopup, setCardSelectionPopup] = useState<{
    cards: GameCard[];
    effectDescription: string;
    zone: string;
    requiredCount: number;
    optionalCount?: number;
    searchType?: string;
    triggeringCard?: GameCard;
    resolve: (selectedCards: GameCard[]) => void;
  } | null>(null);

  useEffect(() => {
    if (availableDiscoverableCards.length > 0) return;
    
    const discoverableCards = campaignDeck
      .filter(card => card.discoverable === true)
      .sort((a, b) => a.id - b.id)
      .slice(0, 2)
      .map(card => card.id);
    
    setAvailableDiscoverableCards(discoverableCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const zoneRefsMap = useRef<Map<string, HTMLDivElement>>(new Map());

  const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
  const [checkboxPopupCard, setCheckboxPopupCard] = useState<GameCard | null>(null);
  const [checkboxRequiredCount, setCheckboxRequiredCount] = useState(1);
  const [checkboxOptionalCount, setCheckboxOptionalCount] = useState(1);
  const [onCheckboxConfirm, setOnCheckboxConfirm] = useState<
    ((selected: Checkbox[]) => void) | null
  >(null);

  const [textInputPopup, setTextInputPopup] = useState<{
    description: string;
    required: boolean;
    resolve: (input: string | null) => void;
  } | null>(null);

  const [stringChoicePopup, setStringChoicePopup] = useState<{
    description: string;
    choices: string[];
    resolve: (choice: string) => void;
  } | null>(null);

  const [pendingEndRoundEffects, setPendingEndRoundEffects] = useState<Array<{
    description: string;
    effect: () => Promise<void>;
    forceResolve: boolean;
  }>>([]);

  const [slidingCards, setSlidingCards] = useState<Map<number, { fromZone: string; toZone: string }>>(new Map());
  const [effectConfirmationPopup, setEffectConfirmationPopup] = useState<{
    description: string;
    onConfirm: () => void;
    onSkip: () => void;
  } | null>(null);

  const [showCardSidePopup, setShowCardSidePopup] = useState(false);
  const [cardSidePopupCard, setCardSidePopupCard] = useState<GameCard | null>(null);
  const [cardSideRequiredCount, setCardSideRequiredCount] = useState(1);
  const [cardSideOptionalCount, setCardSideOptionalCount] = useState(0);
  const [onCardSideConfirm, setOnCardSideConfirm] = useState<
    ((selected: number[]) => void) | null
  >(null);

  const [isPlayBlocked, setIsPlayBlocked] = useState(false);
  useEffect(() => {
    setIsPlayBlocked(checkPlayRestrictions());
  }, [playArea, permanentZone]);

  const [showUpgradeCostPopup, setShowUpgradeCostPopup] = useState(false);
  const [upgradeCostPopupCard, setUpgradeCostPopupCard] = useState<{card: GameCard, selectResource: boolean} | null>(null);
  const [onUpgradeCostConfirm, setOnUpgradeCostConfirm] = useState<
    ((upgradeIndex: number, resourceKey: keyof ResourceMap) => void) | null
  >(null);

  const [highlightedCardId, setHighlightedCardId] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const [confirmationPopup, setConfirmationPopup] = useState<{
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  } | null>(null);

  const [debugMode, setDebugMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [purgedCards, setPurgedCards] = useState<GameCard[]>([]);
  const [completedExpansions, setCompletedExpansions] = useState<string[]>([]);
  const [currentExpansion, setCurrentExpansion] = useState<string | null>(null);
  const [scores, setScores] = useState<GameScore>({ 
    baseGame: 0, 
    expansions: {} 
  });

  const [usedEffectsThisTurn, setUsedEffectsThisTurn] = useState<Map<string, number>>(new Map());

  // Flags
  const [isChoosingExpansion, setIsChoosingExpansion] = useState(false);
  const [showExpansionChoice, setShowExpansionChoice] = useState(false);

  const ZONE_KEY_MAP = {
    deck:          t("deck"),
    discard:       t("discard"),
    permanentZone: t("permanentZone"),
    playArea:      t("playArea"),
    blocked:       t("blocked"),
    actionButtons: t("actionButtons"),
    resourcePool:  t("resourcePool"),
    campaign:      t("campaign"),
  };

  const {
    isActive: isTutorialActive,
    startTutorial,
    stop: stopTutorial,
    currentStep,
    stepIndex,
    totalSteps,
    next: tutorialNext,
    previous: tutorialPrev,
    spotlightRect,
  } = tutorial(zoneRefsMap, ZONE_KEY_MAP, DEFAULT_TUTORIAL_STEPS);

  // ----------- immediate refs & setters (à ajouter près des useState) -----------
  const deckRef = useRef<GameCard[]>([]);
  const playAreaRef = useRef<GameCard[]>([]);
  const discardRef = useRef<GameCard[]>([]);
  const blockedZoneRef = useRef<GameCard[]>([]);
  const permanentZoneRef = useRef<GameCard[]>([]);
  const temporaryCardListRef = useRef<GameCard[]>([]);
  const purgedCardsRef = useRef<GameCard[]>([]);

  // Keep refs in sync if other code uses setPlayArea / setDiscard directly
  useEffect(() => { deckRef.current = deck; }, [deck]);
  useEffect(() => { playAreaRef.current = playArea; }, [playArea]);
  useEffect(() => { discardRef.current = discard; }, [discard]);
  useEffect(() => { blockedZoneRef.current = blockedZone; }, [blockedZone]);
  useEffect(() => { permanentZoneRef.current = permanentZone; }, [permanentZone]);
  useEffect(() => { purgedCardsRef.current = purgedCards; }, [purgedCards]);

  function setPlayAreaImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(playAreaRef.current);
      playAreaRef.current = v;
      setPlayArea(v);
    } else {
      playAreaRef.current = next as GameCard[];
      setPlayArea(next as GameCard[]);
    }
  }

  function setDiscardImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(discardRef.current);
      discardRef.current = v;
      setDiscard(v);
    } else {
      discardRef.current = next as GameCard[];
      setDiscard(next as GameCard[]);
    }
  }

  function setDeckImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(deckRef.current);
      deckRef.current = v;
      setDeck(v);
    } else {
      deckRef.current = next as GameCard[];
      setDeck(next as GameCard[]);
    }
  }

  function setBlockedZoneImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(blockedZoneRef.current);
      blockedZoneRef.current = v;
      setBlockedZone(v);
    } else {
      blockedZoneRef.current = next as GameCard[];
      setBlockedZone(next as GameCard[]);
    }
  }

  function setTemporaryCardListImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(temporaryCardListRef.current);
      temporaryCardListRef.current =  [...temporaryCardListRef.current, ...v];
      setTemporaryCardList((prev) => [...prev, ...v]);
    } else {
      temporaryCardListRef.current = [...temporaryCardListRef.current, ...next];
      setTemporaryCardList((prev) => [...prev, ...next]);
    }
  }

  function setPurgedCardsImmediate(next: React.SetStateAction<GameCard[]>) {
    if (typeof next === "function") {
      const v = (next as (prev: GameCard[]) => GameCard[])(purgedCardsRef.current);
      purgedCardsRef.current = v;
      setPurgedCards(v);
    } else {
      purgedCardsRef.current = next as GameCard[];
      setPurgedCards(next as GameCard[]);
    }
  }

  const handleDebugClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (newCount >= 5) {
      setDebugMode(!debugMode);
      setClickCount(0);
      setConfirmationPopup({
        message: `Debug mode ${!debugMode ? 'enabled' : 'disabled'}`,
        onConfirm: () => setConfirmationPopup(null)
      });
    } else {
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  };

  // -------------------
  // Game Phases
  // -------------------
  const checkPlayRestrictions = (): boolean => {
    const allActiveCards = [...playAreaRef.current];
    
    for (const card of allActiveCards) {
      const effects = getCardEffects(card.id, card.currentSide);
      for (const effect of effects) {
        if (effect.timing === "restrictPlay" || effect.timing === "restrictAll") {
          return true;
        }
      }
    }
    return false;
  };

  const reorderCardsInZone = (zone: string, cardIds: number[]) => {
    const reorderedCards = cardIds
      .map(id => {
        if (zone === t('playArea')) return playArea.find(c => c.id === id);
        if (zone === t('permanentZone')) return permanentZone.find(c => c.id === id);
        if (zone === t('blocked')) return blockedZone.find(c => c.id === id);
        return null;
      })
      .filter((card): card is GameCard => card !== null);

    if (zone === t('playArea')) {
      setPlayAreaImmediate(reorderedCards);
    } else if (zone === t('permanentZone')) {
      setPermanentZone(reorderedCards);
    } else if (zone === t('blocked')) {
      setBlockedZoneImmediate(reorderedCards);
    }
  };

  const checkUpgradeRestrictions = (): boolean => {
    if (turnEndFlag) {
      return true;
    }

    const allActiveCards = [...playAreaRef.current];
    
    for (const card of allActiveCards) {
      const effects = getCardEffects(card.id, card.currentSide);
      for (const effect of effects) {
        if (effect.timing === "restrictAll") {
          return true;
        }
      }
    }
    return false;
  };

  const checkTimeEffectRestrictions = (): boolean => {
    const allActiveCards = [...playAreaRef.current];
    
    for (const card of allActiveCards) {
      const effects = getCardEffects(card.id, card.currentSide);
      for (const effect of effects) {
        if (effect.timing === "restrictAll") {
          return true;
        }
      }
    }
    return false;
  };

  const isTimeEffect = (effectText: string): boolean => {
    return effectText.startsWith("effects/time");
  };

  async function draw(nbCards: number) {
    if (checkPlayRestrictions()) {
      return;
    }

    const drawn = deck.slice(0, nbCards);
    const cardIds = drawn.map(c => c.id);
    
    dropToPlayArea({id: cardIds, fromZone: t('deck')});
  };

  const drawNewTurn = async () => {
    setIsAnimating(true);
    if (!turnEndFlag) {
      await discardEndTurn();
    }
    setResources((prev) => {
      const reset: ResourceMap = { ...emptyResource };
      if ("fame" in prev) (reset as Partial<ResourceMap>).fame = (prev as Partial<ResourceMap>).fame;
      return reset;
    });
    setUsedEffectsThisTurn(new Map());
    await draw(4);
    setTurnEndFlag(false);
    setIsAnimating(false);
  }
  
  const advance = async () => {
    let bonusCards = 0;
    
    for (const card of playArea) {
      const effects = getCardEffects(card.id, card.currentSide);
      for (const effect of effects) {
        if (effect.timing === "onAdvance") {
          const context: GameContext = {
            card,
            zone: t('playArea'),
            resources,
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDeck,
            dropToDiscard,
            dropToCampaign,
            dropToPermanent,
            setDeck: setDeckImmediate,
            setPlayArea: setPlayAreaImmediate,
            setDiscard: setDiscardImmediate,
            setPermanentZone,
            setCampaignDeck,
            setTemporaryCardList,
            setTemporaryCardListImmediate,
            setBlockedZone,
            setPurgedCards: setPurgedCardsImmediate,
            deleteCardInZone,
            replaceCardInZone,
            mill,
            openCheckboxPopup,
            selectResourceChoice,
            selectCardsFromZone,
            selectCardsFromArray,
            discoverCard,
            boostProductivity,
            registerEndRoundEffect,
            addCardEffect,
            fetchCardsInZone,
            selectCardSides,
            selectUpgradeCost,
            selectTextInput,
            selectStringChoice,
            updateBlocks,
            getBlockedBy,
            getCardZone,
            upgradeCard,
            handleCardUpdate,
            addDiscoverableCard,
            hasBeenUsedThisTurn,
            markAsUsedThisTurn,
            t,
          };
          
          const result = await effect.execute(context);
          if (typeof result === 'number') {
            bonusCards += result;
          }
        }
      }
    }
    
    draw(2 + bonusCards);
  };

  const handleEffectsEndOfTurn = async () => {
    for(const card of [...playAreaRef.current, ...permanentZone]) {
      await handleExecuteCardEffect(card, t('playArea'), "endOfTurn");
    }
  }

  const gatherEffectsEndOfRound = async () => {
    const cardsWithEffects: Array<{ card: GameCard, effectIndex: number }> = [];
    
    for (const card of [...playAreaRef.current, ...permanentZone]) {
      const effects = getCardEffects(card.id, card.currentSide);
      effects.forEach((effect, index) => {
        if (effect.timing === "endOfRound") {
          cardsWithEffects.push({ 
            card: cloneGameCard(card), 
            effectIndex: index 
          });
        }
      });
    }
    
    return cardsWithEffects;
  };

  const handleEffectsEndOfRound = async (cardsWithEffects: Array<{ card: GameCard, effectIndex: number }>) => {
    for (const { card, effectIndex } of cardsWithEffects) {
      let realCard = deckRef.current.find(c => c.id === card.id);
      if (!realCard) {
        realCard = permanentZoneRef.current.find(c => c.id === card.id);
      }
      if (realCard) {
        await handleExecuteCardEffect(realCard, t('deck'), "endOfRound", undefined, effectIndex);
      }
    }
  };

  const handleEffectsUpgrade = async (card: GameCard) => {
    const effects = getCardEffects(card.id, card.currentSide, "onUpgrade");
    for (const effect of effects) {
      if (effect.timing === "onUpgrade") {
        const context: GameContext = {
          card: card,
          zone: playArea.includes(card) ? t('playArea') : t('permanentZone'),
          resources,
          filterZone,
          setResources,
          draw,
          effectEndTurn,
          dropToPlayArea,
          dropToBlocked,
          dropToDeck,
          dropToDiscard,
          dropToCampaign,
          dropToPermanent,
          setDeck: setDeckImmediate,
          setPlayArea: setPlayAreaImmediate,
          setDiscard: setDiscardImmediate,
          setPermanentZone,
          setCampaignDeck,
          setTemporaryCardList,
          setTemporaryCardListImmediate,
          setBlockedZone,
          setPurgedCards: setPurgedCardsImmediate,
          deleteCardInZone,
          replaceCardInZone,
          mill,
          openCheckboxPopup,
          selectResourceChoice,
          selectCardsFromZone,
          selectCardsFromArray,
          discoverCard,
          boostProductivity,
          registerEndRoundEffect,
          addCardEffect,
          fetchCardsInZone,
          selectCardSides,
          selectUpgradeCost,
          selectTextInput,
          selectStringChoice,
          updateBlocks,
          getBlockedBy,
          getCardZone,
          upgradeCard,
          handleCardUpdate,
          addDiscoverableCard,
          hasBeenUsedThisTurn,
          markAsUsedThisTurn,
          t,
        };
        
        await effect.execute(context);
      }
    }
  };

  const effectEndTurn = async () => {
    await discardEndTurn(false);
  };

  const discardEndTurn = async (endRound?: boolean) => {
    setTurnEndFlag(true);
    await handleEffectsEndOfTurn();

    if (endRound) {
      const endOfRoundCardList = await gatherEffectsEndOfRound();
      
      setDeckImmediate((d) => [...d, ...playAreaRef.current, ...blockedZoneRef.current, ...discardRef.current]);

      await new Promise(resolve => setTimeout(resolve, 300));

      setPlayAreaImmediate([]);
      setBlockedZoneImmediate([]);
      setDiscardImmediate([]);
      setTemporaryCardListImmediate([]);
      temporaryCardListRef.current = [];

      await new Promise(resolve => setTimeout(resolve, 100));
      
      await handleEffectsEndOfRound(endOfRoundCardList);

      setTurnEndFlag(false);
    }
    else {
      const cardsToDiscard: GameCard[] = [];
      const cardsToKeep: GameCard[] = [];

      const currentPlayArea = playAreaRef.current;
      currentPlayArea.forEach(card => {
        const effects = getCardEffects(card.id, card.currentSide);
        const hasStayInPlay = effects.some(eff => eff.timing === "staysInPlay");
        const isInTemporaryList = temporaryCardListRef.current.some(tempCard => tempCard.id === card.id);

        if (hasStayInPlay || isInTemporaryList) cardsToKeep.push(card);
        else cardsToDiscard.push(card);
      });

      const blockersStayingInPlay = cardsToKeep.map(c => c.id);
      
      const blockedToKeep: GameCard[] = [];
      const blockedToDiscard: GameCard[] = [];
      
      blockedZoneRef.current.forEach(blockedCard => {
        const isStillBlocked = Array.from(blockMap.entries()).some(([blockerId, blockedIds]) => 
          blockersStayingInPlay.includes(blockerId) && blockedIds.includes(blockedCard.id)
        );
        
        if (isStillBlocked) {
          blockedToKeep.push(blockedCard);
        } else if(!blockedCard.GetType(t).includes(t('scroll'))) {
          blockedToDiscard.push(blockedCard);
        }
      });
      
      const allToDiscard = [
        ...cardsToDiscard.map(c => ({ card: c, zone: t('playArea') })),
        ...blockedToDiscard.map(c => ({ card: c, zone: t('blocked') }))
      ];

      for (let i = 0; i < allToDiscard.length; i++) {
        const { card, zone } = allToDiscard[i];
        await new Promise(resolve => setTimeout(resolve, 100));
        dropToDiscard({ id: card.id, fromZone: zone });
      }
      await new Promise(resolve => setTimeout(resolve, 300));

      setPlayAreaImmediate(cardsToKeep);
      setBlockedZoneImmediate(blockedToKeep);
      
      const allDiscarded = [...cardsToDiscard, ...blockedToDiscard];
      if (allDiscarded.length > 0) {
        await triggerOnCardDiscarded(allDiscarded);
      }
      
      setTemporaryCardListImmediate([]);
      temporaryCardListRef.current = [];
    }
  };

  const handleEndBaseGame = async () => {
    await discardEndTurn(true);
    setShouldComputeFame(true);
    setIsChoosingExpansion(true);
  };

  useEffect(() => {
    if (shouldComputeFame && deck.length > 0) {
      let totalFame = 0;

      const cardList = [...deck, ...permanentZone];
      
      for (const card of cardList) {
        const currentSideIndex = card.currentSide - 1;
        const resourceMaps = card.resources[currentSideIndex] || [];
        
        const maxFameFromResources = resourceMaps.reduce(
          (max, res) => Math.max(max, res.fame || 0),
          0
        );
        
        const fameValueEffect = getCardFameValue(card.id, card.currentSide);
        if (fameValueEffect.execute) {
          const context: GameContext = {
              card,
              zone: t('deck'),
              resources,
              filterZone,
              setResources,
              draw,
              effectEndTurn,
              dropToPlayArea,
              dropToBlocked,
              dropToDeck,
              dropToDiscard,
              dropToCampaign,
              dropToPermanent,
              setDeck: setDeckImmediate,
              setPlayArea: setPlayAreaImmediate,
              setDiscard: setDiscardImmediate,
              setPermanentZone,
              setCampaignDeck,
              setTemporaryCardList,
              setTemporaryCardListImmediate,
              setBlockedZone,
              setPurgedCards: setPurgedCardsImmediate,
              deleteCardInZone,
              replaceCardInZone,
              mill,
              openCheckboxPopup,
              selectResourceChoice,
              selectCardsFromZone,
              selectCardsFromArray,
              discoverCard,
              boostProductivity,
              registerEndRoundEffect,
              addCardEffect,
              fetchCardsInZone,
              selectCardSides,
              selectUpgradeCost,
              selectTextInput,
              selectStringChoice,
              updateBlocks,
              getBlockedBy,
              getCardZone,
              upgradeCard,
              handleCardUpdate,
              addDiscoverableCard,
              hasBeenUsedThisTurn,
              markAsUsedThisTurn,
              t,
            };
          
          const specialFameValue = fameValueEffect.execute(context);
          totalFame += specialFameValue;
        }
        totalFame += maxFameFromResources;
      }
      
      for (const card of purgedCards) {
        const currentSideIndex = card.currentSide - 1;
        const resourceMaps = card.resources[currentSideIndex] || [];
        
        const maxFameFromResources = resourceMaps.reduce(
          (max, res) => Math.max(max, res.fame || 0),
          0
        );
        
        const fameValueEffect = getCardFameValue(card.id, card.currentSide);
        if (fameValueEffect.execute) {
          const context: GameContext = {
              card,
              zone: t('deck'),
              resources,
              filterZone,
              setResources,
              draw,
              effectEndTurn,
              dropToPlayArea,
              dropToBlocked,
              dropToDeck,
              dropToDiscard,
              dropToCampaign,
              dropToPermanent,
              setDeck: setDeckImmediate,
              setPlayArea: setPlayAreaImmediate,
              setDiscard: setDiscardImmediate,
              setPermanentZone,
              setCampaignDeck,
              setTemporaryCardList,
              setTemporaryCardListImmediate,
              setBlockedZone,
              setPurgedCards: setPurgedCardsImmediate,
              deleteCardInZone,
              replaceCardInZone,
              mill,
              openCheckboxPopup,
              selectResourceChoice,
              selectCardsFromZone,
              selectCardsFromArray,
              discoverCard,
              boostProductivity,
              registerEndRoundEffect,
              addCardEffect,
              fetchCardsInZone,
              selectCardSides,
              selectUpgradeCost,
              selectTextInput,
              selectStringChoice,
              updateBlocks,
              getBlockedBy,
              getCardZone,
              upgradeCard,
              handleCardUpdate,
              addDiscoverableCard,
              hasBeenUsedThisTurn,
              markAsUsedThisTurn,
              t,
            };
          
          const specialFameValue = fameValueEffect.execute(context);
          totalFame += specialFameValue;
        }
        totalFame += maxFameFromResources;
      }
      
      if (currentExpansion) {
        setScores((prev) => ({
          ...prev,
          expansions: {
            ...prev.expansions,
            [currentExpansion]: totalFame
          }
        }));
        setCurrentExpansion(null);
      } else {
        setScores((prev) => ({ ...prev, baseGame: totalFame }));
      }
      
      setResources(prev => ({ ...prev, fame: totalFame }));
      setHasEndedBaseGame(true);
      setIsChoosingExpansion(true);
      setShouldComputeFame(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, purgedCards, shouldComputeFame, currentExpansion]);

  useEffect(() => {
    if (currentExpansion && !isChoosingExpansion) {
      const expansion = EXPANSIONS.find(e => e.id === currentExpansion);
      if (expansion?.type === 'card') {
        const cardStillExists = permanentZone.some(c => c.id === expansion.cardId);
        if (!cardStillExists && deck.length === 0) {
          handleEndExpansion();
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permanentZone, currentExpansion, deck.length, isChoosingExpansion]);
  
  const mill = async (
    nbCards: number
  ): Promise<void> => {
    let count = 0;
    for (const card of deckRef.current) {
      if (count >= nbCards) {
        return;
      }
      dropToDiscard({id: card.id, fromZone: t('deck')});
      count += 1;
    }
  };

  const filterZone = (
    zone: string,
    filter: (card: GameCard) => boolean
  ): GameCard[] => {
    let filteredCards: GameCard[] = [];
    switch(zone) {
      case t('playArea'):
        filteredCards = playAreaRef.current.filter(filter); // Utilise les refs
        break;
      case t('discard'):
        filteredCards = discardRef.current.filter(filter);
        break;
      case t('deck'):
        filteredCards = deckRef.current.filter(filter);
        break;
      case t('permanentZone'):
        filteredCards = permanentZoneRef.current.filter(filter); // Celui-ci n'a pas de ref encore
        break;
      case t('campaign'):
        filteredCards = campaignDeck.filter(filter);
        break;
    }
    return filteredCards;
  };

  const cleanResourceOption = (option: Partial<ResourceMap>): Partial<ResourceMap> => {
    return Object.fromEntries(
      Object.entries(option).filter(([key, value]) => 
        key !== 'fame' && value !== undefined && value > 0
      )
    ) as Partial<ResourceMap>;
  };

  const selectResourceChoice = (options: Array<Partial<ResourceMap>>, rawInput?: boolean): Promise<Partial<ResourceMap> | null> => {
    return new Promise((resolve) => {
      if (rawInput) {
        const cleanedOptions = options
          .filter(option => Object.keys(option).length > 0);
        setResourceChoicePopup({ options: cleanedOptions, resolve });
      }
      else {
        const cleanedOptions = options
          .map(cleanResourceOption)
          .filter(option => Object.keys(option).length > 0);
        setResourceChoicePopup({ options: cleanedOptions, resolve });
      }
    });
  };

  const selectCardsFromZone = (
    filter: (card: GameCard) => boolean,
    zone: string,
    effectDescription: string,
    requiredCount: number,
    triggeringCard?: GameCard,
    optionalCount?: number,
    searchType?: string
  ): Promise<GameCard[]> => {
    return new Promise((resolve) => {
      const filteredCards = filterZone(zone, filter);
      if (filteredCards.length === 0) {
        resolve([]);
        return;
      }
      
      const adjustedCount = Math.min(requiredCount, filteredCards.length);
      setCardSelectionPopup({
        cards: filteredCards,
        effectDescription: effectDescription,
        zone: zone,
        requiredCount: adjustedCount,
        optionalCount: optionalCount,
        searchType: searchType,
        triggeringCard: triggeringCard,
        resolve: (selectedCards: GameCard[]) => {
          setCardSelectionPopup(null);
          setTimeout(() => {
            resolve(selectedCards);
          }, 50);
        }
      });
    });
  };

  const selectCardsFromArray = (
    cards: GameCard[],
    zone: string,
    effectDescription: string,
    requiredCount: number,
    optionalCount?: number,
    triggeringCard?: GameCard,
    searchType?: string
  ): Promise<GameCard[]> => {
    return new Promise((resolve) => {
      if (cards.length === 0) {
        resolve([]);
        return;
      }
      const adjustedCount = Math.min(requiredCount, cards.length);
      setCardSelectionPopup({
        cards: cards,
        effectDescription: effectDescription,
        zone: zone,
        requiredCount: adjustedCount,
        optionalCount: optionalCount,
        triggeringCard: triggeringCard,
        searchType: searchType,
        resolve: (selectedCards: GameCard[]) => {
          setCardSelectionPopup(null);
          setTimeout(() => {
            resolve(selectedCards);
          }, 50);
        }
      });
    });
  };

  const discoverCard = (
    filter: (card: GameCard) => boolean,
    effectDescription: string,
    requiredCount: number,
    triggeringCard?: GameCard,
    optionalCount?: number,
    zone?: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const filteredCards = campaignDeck.filter(filter);
      
      if (filteredCards.length === 0) {
        resolve(false);
        return;
      }
      
      const adjustedCount = Math.min(requiredCount, filteredCards.length);
      setCardSelectionPopup({
        cards: filteredCards,
        effectDescription: effectDescription,
        zone: t('campaign'),
        requiredCount: adjustedCount,
        optionalCount: optionalCount,
        triggeringCard: triggeringCard,
        resolve: (selectedCards: GameCard[] | null) => {
          if (selectedCards) {
            for(const card of selectedCards) {
              setCampaignDeck(prev => prev.filter(c => c.id !== card.id));
              if(zone) {
                if(zone === t('deck')) {
                  dropToDeck({id: card.id, fromZone: t('campaign')});
                }
              }
              else {
                  dropToDiscard({id: card.id, fromZone: t('campaign')});
              }
              const c = findCardInAllZones(card.id);
              if (c) {
                c.currentSide = card.currentSide;
              }
            }
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  };

  const boostProductivity = (
    filter: (card: GameCard) => boolean,
    zone: string,
    effectDescription: string,
    prodBoost: Partial<ResourceMap> | null,
    triggeringCard?: GameCard
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      const filteredCards = filterZone(zone, filter);
      
      if (filteredCards.length === 0) {
        resolve(false);
        return;
      }
      
      setCardSelectionPopup({
        cards: filteredCards,
        effectDescription: effectDescription,
        zone: zone,
        requiredCount: 1,
        triggeringCard: triggeringCard,
        resolve: async (cards: GameCard[] | null) => {
          if (cards && cards.length > 0) {
            const selectedCard = cards[0];
            let finalBoost = prodBoost;
            
            if (finalBoost === null) {
              const availableResources = new Set<string>();
              selectedCard.resources[selectedCard.currentSide - 1].forEach(option => {
                Object.entries(option).forEach(([key, value]) => {
                  if (key !== 'fame' && typeof value === 'number' && value > 0) {
                    availableResources.add(key);
                  }
                });
              });
              
              if (availableResources.size === 0) {
                resolve(false);
                return;
              }
              
              const resourceOptions: Array<Partial<ResourceMap>> = Array.from(availableResources).map(key => ({
                [key as keyof ResourceMap]: 1
              }));
              
              const chosenResources = await selectResourceChoice(resourceOptions);
              if (chosenResources) {
                finalBoost = chosenResources;
              } else {
                resolve(false);
                return;
              }
            }
            
            for (const resourceChoice of selectedCard.resources[selectedCard.currentSide - 1]) {
              for (const key in finalBoost) {
                const resourceKey = key as keyof ResourceMap;
                resourceChoice[resourceKey] = (resourceChoice[resourceKey] ?? 0) + 1;
              }
            }
            
            replaceCardInZone(zone, selectedCard.id, selectedCard);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  };

  const gatherProductionBonus = (card: GameCard, zone: string): Partial<ResourceMap> => {
    const bonus: Partial<ResourceMap> = {};
    
    if (zone !== t('playArea') && zone !== t('permanentZone')) {
      return bonus;
    }
    
    const modifiers: Array<{
      filter: (card: GameCard, t: (key: TranslationKeys) => string) => boolean;
      zones: string[] | ((t: (key: TranslationKeys) => string) => string[]);
      bonus?: Partial<ResourceMap> | ((card: GameContext) => Partial<ResourceMap>);
      source: GameCard;
    }> = [];

    for (const activeCard of playArea) {
      const effects = getCardEffects(activeCard.id, activeCard.currentSide);
      for (const effect of effects) {
        if (effect.timing === "modifyProduction" && effect.productionModifier) {
          modifiers.push({
            filter: effect.productionModifier.filter,
            zones: effect.productionModifier.zones,
            bonus: effect.productionModifier.bonus,
            source: activeCard
          });
        }
      }
    }
    
    for (const activeCard of permanentZone) {
      if (activeCard.GetType(t).includes(t('permanent'))) {
        const effects = getCardEffects(activeCard.id, activeCard.currentSide);
        for (const effect of effects) {
          if (effect.timing === "modifyProduction" && effect.productionModifier) {
            modifiers.push({
              filter: effect.productionModifier.filter,
              zones: effect.productionModifier.zones,
              bonus: effect.productionModifier.bonus,
              source: activeCard
            });
          }
        }
      }
    }
    
    for (const modifier of modifiers) {
      const resolvedZones = typeof modifier.zones === 'function' 
        ? modifier.zones(t) 
        : modifier.zones;
      
      const context: GameContext = {
            card,
            zone,
            resources,
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDeck,
            dropToDiscard,
            dropToCampaign,
            dropToPermanent,
            setDeck: setDeckImmediate,
            setPlayArea: setPlayAreaImmediate,
            setDiscard: setDiscardImmediate,
            setPermanentZone,
            setCampaignDeck,
            setTemporaryCardList,
            setTemporaryCardListImmediate,
            setBlockedZone,
            setPurgedCards: setPurgedCardsImmediate,
            deleteCardInZone,
            replaceCardInZone,
            mill,
            openCheckboxPopup,
            selectResourceChoice,
            selectCardsFromZone,
            selectCardsFromArray,
            discoverCard,
            boostProductivity,
            registerEndRoundEffect,
            addCardEffect,
            fetchCardsInZone,
            selectCardSides,
            selectUpgradeCost,
            selectTextInput,
            selectStringChoice,
            updateBlocks,
            getBlockedBy,
            getCardZone,
            upgradeCard,
            handleCardUpdate,
            addDiscoverableCard,
            hasBeenUsedThisTurn,
            markAsUsedThisTurn,
            t,
        };

      if (resolvedZones.includes(zone) && modifier.filter(card, t) && modifier.bonus) {
        const bonusToApply = typeof modifier.bonus === 'function'
          ? modifier.bonus(context)
          : modifier.bonus;
        
        if (bonusToApply) {
          Object.entries(bonusToApply).forEach(([key, value]) => {
            const resourceKey = key as keyof ResourceMap;
            bonus[resourceKey] = (bonus[resourceKey] || 0) + (value as number);
          });
        }
      }
    }
    
    return bonus;
  };

  const gatherAdditionalProductionOptions = (card: GameCard, zone: string): Array<Partial<ResourceMap>> => {
    const additionalOptions: Array<Partial<ResourceMap>> = [];
    
    if (zone !== t('playArea') && zone !== t('permanentZone')) {
      return additionalOptions;
    }
    
    const modifiers: Array<{
      filter: (card: GameCard, t: (key: TranslationKeys) => string) => boolean;
      zones: string[] | ((t: (key: TranslationKeys) => string) => string[]);
      addOptions?: (card: GameCard) => Array<Partial<ResourceMap>>;
      source: GameCard;
    }> = [];
    
    for (const activeCard of playArea) {
      const effects = getCardEffects(activeCard.id, activeCard.currentSide);
      for (const effect of effects) {
        if (effect.timing === "modifyProduction" && effect.productionModifier?.addOptions) {
          modifiers.push({
            filter: effect.productionModifier.filter,
            zones: effect.productionModifier.zones,
            addOptions: effect.productionModifier.addOptions,
            source: activeCard
          });
        }
      }
    }
    
    for (const activeCard of permanentZone) {
      if (activeCard.GetType(t).includes(t('permanent'))) {
        const effects = getCardEffects(activeCard.id, activeCard.currentSide);
        for (const effect of effects) {
          if (effect.timing === "modifyProduction" && effect.productionModifier?.addOptions) {
            modifiers.push({
              filter: effect.productionModifier.filter,
              zones: effect.productionModifier.zones,
              addOptions: effect.productionModifier.addOptions,
              source: activeCard
            });
          }
        }
      }
    }
    
    for (const modifier of modifiers) {
      const resolvedZones = typeof modifier.zones === 'function' 
        ? modifier.zones(t) 
        : modifier.zones;
      
      if (resolvedZones.includes(zone) && modifier.filter(card, t) && modifier.addOptions) {
        const newOptions = modifier.addOptions(card);
        additionalOptions.push(...newOptions);
      }
    }
    
    return additionalOptions;
  };

  function openCheckboxPopup(card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) {
    setCheckboxPopupCard(card);
    setCheckboxRequiredCount(requiredCount);
    setCheckboxOptionalCount(optionalCount);
    setOnCheckboxConfirm(() => (selected: Checkbox[]) => {
      callback(selected);
      replaceCardInZone(t('playArea'), card.id, card);
    });
    setShowCheckboxPopup(true);
  }

  const registerEndRoundEffect = (
    description: string, 
    effect: () => Promise<void>,
    forceResolve: boolean = false
  ) => {
    setPendingEndRoundEffects(prev => [...prev, { description, effect, forceResolve }]);
  };

  const showEffectConfirmation = (description: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setEffectConfirmationPopup({
        description,
        onConfirm: () => resolve(true),
        onSkip: () => resolve(false)
      });
    });
  };

  const resolveEndRoundEffects = async () => {
    const effectsToKeep: typeof pendingEndRoundEffects = [];
    
    for (const pending of pendingEndRoundEffects) {
      if (pending.forceResolve) {
        await pending.effect();
      } else {
        const shouldResolve = await showEffectConfirmation(pending.description);
        
        if (shouldResolve) {
          await pending.effect();
        } else {
          effectsToKeep.push(pending);
        }
      }
    }
    setPendingEndRoundEffects(effectsToKeep);
  };

  const addCardEffect = (
    id: number,
    face: number,
    zone: string,
    effect: CardEffect,
    effectText: string
  ) => {
    if (!cardEffectsRegistry[id]) {
      cardEffectsRegistry[id] = {};
    }
    if (!cardEffectsRegistry[id][face]) {
      cardEffectsRegistry[id][face] = [];
    }
    
    cardEffectsRegistry[id][face].push(effect);
    
    const updateCard = (c: GameCard) => {
      if (c.id === id) {
        const updated = cloneGameCard(c);
        const currentEffect = updated.effects[updated.currentSide - 1];
        
        if (!currentEffect || currentEffect.trim() === '') {
          updated.effects[updated.currentSide - 1] = effectText;
        } else {
          updated.effects[updated.currentSide - 1] = currentEffect + ' [+] ' + effectText;
        }
        
        return updated;
      }
      return c;
    };
    
    if (zone === t('deck')) {
      setDeck(prev => prev.map(updateCard));
    } else if (zone === t('playArea')) {
      setPlayArea(prev => prev.map(updateCard));
    } else if (zone === t('discard')) {
      setDiscard(prev => prev.map(updateCard));
    } else if (zone === t('permanentZone')) {
      setPermanentZone(prev => prev.map(updateCard));
    } else if (zone === t('blocked')) {
      setBlockedZone(prev => prev.map(updateCard));
    }
  };

  function selectCardSides(card: GameCard, requiredCount: number, optionalCount: number, callback: (selectedSides: number[]) => void) {
    setCardSidePopupCard(card);
    setCardSideRequiredCount(requiredCount);
    setCardSideOptionalCount(optionalCount);
    setOnCardSideConfirm(() => (selected: number[]) => {
      callback(selected);
    });
    setShowCardSidePopup(true);
  }

  function selectUpgradeCost(card: GameCard, selectResource: boolean, callback: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void) {
    setUpgradeCostPopupCard({card, selectResource});
    setOnUpgradeCostConfirm(() => (upgradeIndex: number, resourceKey: keyof ResourceMap) => {
      callback(upgradeIndex, resourceKey);
    });
    setShowUpgradeCostPopup(true);
  }

  const selectTextInput = (description: string, required: boolean): Promise<string | null> => {
    return new Promise((resolve) => {
      setTextInputPopup({ description, required, resolve });
    });
  };

  const selectStringChoice = (description: string, choices: string[]): Promise<string> => {
    return new Promise((resolve) => {
      setStringChoicePopup({ description, choices, resolve });
    });
  };

  function updateBlocks(blocker: number, blockedCards: number[] | null) {
    if(blockedCards === null) {
      blockMap.delete(blocker);
    }
    else {
      setBlockMap(prev => {
      const next = new Map(prev);
      if (blockedCards && blockedCards.length > 0) {
        const arr = next.get(blocker) ?? [];
        for(const blockedCard of blockedCards) {
          if (!arr.includes(blockedCard)) arr.push(blockedCard);
          next.set(blocker, arr);
        }
      } else {
        next.delete(blocker);
      }
      return next;
    });
    }
  }

  function getBlockedBy(blocker: number): GameCard[] {
    const ids = blockMap.get(blocker) ?? [];
    return blockedZone.filter(c => ids.includes(c.id));
  }

  async function upgradeCard(card: GameCard, nextSide: number): Promise<boolean> {
    if (card.name[nextSide - 1] === "" || turnEndFlag) {
      return false;
    }

    await handleEffectsUpgrade(card);

    const blockedIds = blockMap.get(card.id);
    const cardsToUnblock = blockedIds ? blockedZoneRef.current.filter(c => blockedIds.includes(c.id)) : [];

    card.currentSide = nextSide;

    if (blockedIds && cardsToUnblock.length > 0) {
      setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
      setPlayAreaImmediate(prev => [...prev, ...cardsToUnblock]);
      updateBlocks(card.id, null);
    }

    return true;
  }

  const triggerOnCardDestroy = async (destroyedCards: GameCard[]) => {
    for (const card of destroyedCards) {
      const effects = getCardEffects(card.id, card.currentSide);
      
      for (const effect of effects) {
        if (effect.timing === "destroyed" || effect.timing === "removed") {
          const context: GameContext = {
            card,
            zone: getCardZone(card.id),
            cardsForTrigger: destroyedCards,
            resources,
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDeck,
            dropToDiscard,
            dropToCampaign,
            dropToPermanent,
            setDeck: setDeckImmediate,
            setPlayArea: setPlayAreaImmediate,
            setDiscard: setDiscardImmediate,
            setPermanentZone,
            setCampaignDeck,
            setTemporaryCardList,
            setTemporaryCardListImmediate,
            setBlockedZone,
            setPurgedCards: setPurgedCardsImmediate,
            deleteCardInZone,
            replaceCardInZone,
            mill,
            openCheckboxPopup,
            selectResourceChoice,
            selectCardsFromZone,
            selectCardsFromArray,
            discoverCard,
            boostProductivity,
            registerEndRoundEffect,
            addCardEffect,
            fetchCardsInZone,
            selectCardSides,
            selectUpgradeCost,
            selectTextInput,
            selectStringChoice,
            updateBlocks,
            getBlockedBy,
            getCardZone,
            upgradeCard,
            handleCardUpdate,
            addDiscoverableCard,
            hasBeenUsedThisTurn,
            markAsUsedThisTurn,
            t,
          };
          
          const canDestroy = await effect.execute(context);
          if (!canDestroy) {
            return false;
          }
        }
      }
    }
    
    return true;
  };

  const getMaxDiscoverCount = (): number => {
    const expansion = EXPANSIONS.find(e => e.id === currentExpansion);
    return expansion?.discoverValue ?? 2;
  };

  const addDiscoverableCard = (cardId: number, force?: boolean) => {
    if (!force) {
      force = false;
    }
    
    setAvailableDiscoverableCards(prev => {
      if (prev.includes(cardId)) return prev;
      
      const card = campaignDeck.find(c => c.id === cardId);
      if (!card) return prev;

      if (!force && prev.length >= getMaxDiscoverCount()) return prev;
      
      if (prev.length === 0) {
        const firstCard = campaignDeck.find(c => c.id === prev[0]);
        if (firstCard && firstCard.GetName(t).includes(t('stop'))) {
          return prev;
        }
      }
      
      if(force) {
        return [...prev, cardId].sort((a, b) => a - b);
      }
      else {
        const stop = availableDiscoverableCards.filter((id) => fetchCardsInZone((c) => c.id === id, t('campaign'))[0].GetName(t).includes(t('stop'))).length !== 0;
        if (!stop) {
          return [...prev, cardId].sort((a, b) => a - b);
        }
      }

      return prev;
    });
  };

  const refreshDiscoverableCards = () => {
    const allDiscoverable = campaignDeck
      .filter(card => card.discoverable === true)
      .sort((a, b) => a.id - b.id);
    
    if (allDiscoverable.length === 0) {
      setAvailableDiscoverableCards([]);
      return;
    }
    
    const firstCard = allDiscoverable[0];
    if (firstCard.GetName(t).includes(t('stop'))) {
      setAvailableDiscoverableCards([firstCard.id]);
      return;
    }
    else {
      setAvailableDiscoverableCards(allDiscoverable
        .slice(0, getMaxDiscoverCount())
        .map(card => card.id));
    }
  };

  const hasBeenUsedThisTurn = (cardId: number, effectIndex: number): number => {
    const key = `${cardId}-${effectIndex}`;

    return usedEffectsThisTurn.get(key) ?? 0;
  };

  const markAsUsedThisTurn = (cardId: number, effectIndex: number): void => {
    const key = `${cardId}-${effectIndex}`;

    setUsedEffectsThisTurn(prev => {
      const safePrev = prev instanceof Map ? prev : new Map();
      const newMap = new Map(safePrev);
      const count = newMap.get(key) ?? 0;

      newMap.set(key, count + 1);
      return newMap;
    });
  };

  const handleExecuteCardEffect = async (
    card: GameCard,
    zone: string,
    timing: EffectTiming,
    cardsForTrigger?: GameCard[],
    effectIndex?: number
  ) => {
    const effects = getCardEffects(card.id, card.currentSide);

    if (effects.length === 0) return;

    const context: GameContext = {
      card,
      cardsForTrigger,
      zone,
      resources,
      filterZone,
      setResources,
      draw,
      effectEndTurn,
      dropToPlayArea,
      dropToBlocked,
      dropToDeck,
      dropToDiscard,
      dropToCampaign,
      dropToPermanent,
      setDeck: setDeckImmediate,
      setPlayArea: setPlayAreaImmediate,
      setDiscard: setDiscardImmediate,
      setPermanentZone,
      setCampaignDeck,
      setTemporaryCardList,
      setTemporaryCardListImmediate,
      setBlockedZone,
      setPurgedCards: setPurgedCardsImmediate,
      deleteCardInZone,
      replaceCardInZone,
      mill,
      openCheckboxPopup,
      selectResourceChoice,
      selectCardsFromZone,
      selectCardsFromArray,
      discoverCard,
      boostProductivity,
      registerEndRoundEffect,
      addCardEffect,
      fetchCardsInZone,
      selectCardSides,
      selectUpgradeCost,
      selectTextInput,
      selectStringChoice,
      updateBlocks,
      getBlockedBy,
      getCardZone,
      upgradeCard,
      handleCardUpdate,
      addDiscoverableCard,
      hasBeenUsedThisTurn,
      markAsUsedThisTurn,
      t,
      startTutorial,
    };

    if (typeof effectIndex === "number" && effectIndex >= 0 && effectIndex < effects.length) {
      const eff = effects[effectIndex];

      if (eff.usesPerTurn && eff.usesPerTurn <= hasBeenUsedThisTurn(card.id, effectIndex)) {
        return;
      }
      
      const effectText = card.effects[card.currentSide - 1];
      const { effects: parsedEffects } = parseEffects(t(effectText as TranslationKeys));
      
      if (effectIndex < parsedEffects.length) {
        const currentEffectText = parsedEffects[effectIndex].text;
        
        if ((isTimeEffect(currentEffectText) && checkTimeEffectRestrictions()) ||
            (currentEffectText.startsWith("effects/time") && turnEndFlag)) {
          return;
        }
      }

      const shouldHighlight = (zone === t('playArea') || zone === t('permanentZone')) && 
                            eff.timing !== 'onClick';
      
      if (shouldHighlight) {
        setHighlightedCardId(card.id);
        await new Promise(resolve => setTimeout(resolve, 600));
        setHighlightedCardId(null);
      }

      if (await eff.execute(context)) {
        await dropToDiscard({ id: card.id, fromZone: zone });
      }
      
      if (eff.usesPerTurn) {
        markAsUsedThisTurn(card.id, effectIndex);
      }
      return;
    }

    const matchingEffects = effects.filter(effect => effect.timing === timing);
    
    if (matchingEffects.length === 0) {
      return;
    }

    const shouldHighlight = (zone === t('playArea') || zone === t('permanentZone')) && 
                          timing !== 'onClick';
    
    if (shouldHighlight) {
      setHighlightedCardId(card.id);
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedCardId(null);
    }

    for (const effect of matchingEffects) {
      if (await effect.execute(context)) {
        await dropToDiscard({ id: card.id, fromZone: zone });
        break;
      }
    }
  };

  // -------------------
  // Drag & Drop Handlers
  // -------------------
  const findCardInAllZones = (
    id: number,
    snap?: {
      deck?: GameCard[];
      playArea?: GameCard[];
      discard?: GameCard[];
      campaignDeck?: GameCard[];
      blockedZone?: GameCard[];
      permanentZone?: GameCard[];
    }
  ) => {
    const sources = snap ?? {
      deck,
      playArea,
      discard,
      campaignDeck,
      blockedZone,
      permanentZone,
    };
    const find = (arr?: GameCard[]) =>
      arr ? arr.find((c) => c.id === id) ?? null : null;
    return (
      find(sources.deck) ||
      find(sources.playArea) ||
      find(sources.discard) ||
      find(sources.campaignDeck) ||
      find(sources.blockedZone) ||
      find(sources.permanentZone) ||
      null
    );
  };

  const handleDropToZone = (toZone: string) => async (payload: DropPayload): Promise<void> => {
    const { id, fromZone } = payload;
    if (fromZone === toZone) return;

    const cardIds = Array.isArray(id) ? id : [id];
    const cards: GameCard[] = [];

    for(const id of cardIds) {
      if (toZone === t('playArea') && checkPlayRestrictions()) {
        return;
      }
      const cardToCheck = fetchCardsInZone((c) => c.id === id, fromZone)[0];
      if (cardToCheck && cardToCheck.GetType(t).includes(t('scroll')) && toZone !== t('destroy')) {
        return;
      }

      setSlidingCards(prev => new Map(prev).set(id, { fromZone, toZone }));

      const delayBeforeAction = 100;
      
      await new Promise(resolve => setTimeout(resolve, delayBeforeAction));

      const removeById = (arr: GameCard[], removeId: number) =>
        arr.filter((c) => c.id !== removeId);

      const sourceCard = findCardInAllZones(id, {
        deck: deckRef.current, playArea: playAreaRef.current,
        discard: discardRef.current, blockedZone: blockedZoneRef.current,
        campaignDeck: campaignDeck, permanentZone: permanentZoneRef.current
      });
      if (!sourceCard) {
        setSlidingCards(prev => {
          const map = new Map(prev);
          map.delete(id);
          return map;
        });
        return;
      }
      cards.push(sourceCard);

      const toAdd: GameCard = sourceCard;

      if (fetchCardsInZone((c) => c.id === id, fromZone)[0]?.GetType(t).includes(t('permanent'))) {
        setPermanentZone((pe) => [...pe, cloneGameCard(toAdd)]);
      }
      else {
        if (toZone === t('deck')) {
          setDeckImmediate((d) => [cloneGameCard(toAdd), ...d]);
        }
        if (toZone === t('discard')) {
          setDiscardImmediate((f) => [...f, cloneGameCard(toAdd)]);
        }
        if (toZone === t('blocked')) {
          setBlockedZoneImmediate((b) => [...b, cloneGameCard(toAdd)]);
        }
        if (toZone === t('permanentZone')) {
          setPermanentZone((pe) => [...pe, cloneGameCard(toAdd)]);
        }
        if (toZone === t('playArea')) {
          setPlayAreaImmediate((p) => [...p, cloneGameCard(toAdd)]);
          setResources(() => emptyResource);
        }
        if (toZone === t('campaign')) {
          setCampaignDeck((c) => [...c, cloneGameCard(toAdd)]);
        }
      }

      if (fromZone === t('deck')) setDeckImmediate((d) => removeById(d, id));
      if (fromZone === t('playArea')) setPlayAreaImmediate((p) => removeById(p, id));
      if (fromZone === t('discard')) setDiscardImmediate((f) => removeById(f, id));
      if (fromZone === t('campaign')) {
        setCampaignDeck((g) => removeById(g, id));
        setAvailableDiscoverableCards(prev => prev.filter(cardId => cardId !== id));
      }
      if (fromZone === t('blocked')) setBlockedZoneImmediate((b) => removeById(b, id));
      if (fromZone === t('permanentZone')) setPermanentZone((pe) => removeById(pe, id));

      if ((toZone !== t('playArea') && toZone !== t('permanentZone')) && (fromZone === t('playArea') || fromZone === t('permanentZone'))) {
        const blockedIds = blockMap.get(id);
        if (blockedIds) {
          setBlockedZoneImmediate(prev => prev.filter(c => !blockedIds.includes(c.id)));
          setPlayAreaImmediate(prev => [...prev, ...blockedZone.filter(c => blockedIds.includes(c.id))]);
          updateBlocks(id, null);
        }
      }
      
      setSlidingCards(prev => {
        const map = new Map(prev);
        map.delete(id);
        return map;
      });
    }
    if (toZone === t('playArea')) {
      for (const card of cards) {
        await handleExecuteCardEffect(card, t('playArea'), "played");
      }
      for (const card of [...playAreaRef.current, ...permanentZoneRef.current]) {
        if(playAreaRef.current.includes(card) || (permanentZoneRef.current.includes(card) && card.GetType(t).includes(t('permanent')))) {
          await handleExecuteCardEffect(card, t('playArea'), "otherCardPlayed", cards);
        }
      }
    }
    if (toZone === t('discard') && (fromZone === t('playArea') || fromZone === t('blocked'))) {
      for (const card of cards) {
        await triggerOnCardDiscarded(fetchCardsInZone((c) => c.id === card.id, t('discard')));
      }
    }
  };

  const dropToDeck = (payload: DropPayload) => handleDropToZone(t('deck'))(payload);
  const dropToPlayArea = (payload: DropPayload) => handleDropToZone(t('playArea'))(payload);
  const dropToDiscard = (payload: DropPayload) => handleDropToZone(t('discard'))(payload);
  const dropToCampaign = (payload: DropPayload) => handleDropToZone(t('campaign'))(payload);
  const dropToDestroy = (payload: DropPayload) => handleDropToZone(t('destroy'))(payload);
  const dropToBlocked = (payload: DropPayload) => handleDropToZone(t('blocked'))(payload);
  const dropToPermanent = (payload: DropPayload) => handleDropToZone(t('permanentZone'))(payload);

  // -------------------
  // End Round / Shuffle
  // -------------------
  const handleEndRound = async () => {
    await discardEndTurn(true);
    await resolveEndRoundEffects();

    await new Promise(resolve => setTimeout(resolve, 100));

    if (checkExpansionEnd()) {
      await handleEndExpansion();
      return;
    }
    const expansion = EXPANSIONS.find(e => e.id === currentExpansion);
    if (expansion? !expansion.type.includes('card') : true) {
      refreshDiscoverableCards();
      setShowEndRound(true);
    }
  };

  const shuffleDeck = () => {
    setDeck((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  };

  const getCardZone = (id: number): string => {
    if (deck.some(c => c.id === id)) return t('deck');
    if (playArea.some(c => c.id === id)) return t('playArea');
    if (discard.some(c => c.id === id)) return t('discard');
    if (campaignDeck.some(c => c.id === id)) return t('campaign');
    if (blockedZone.some(c => c.id === id)) return t('blocked');
    if (permanentZone.some(c => c.id === id)) return t('permanentZone');
    return "Deleted";
  };

  const startPurgeProcess = async (
    purgeType: 'deck' | 'permanent',
    purgeValue: number,
    focus?: Partial<ResourceMap>
  ) => {
    const sourceCards = purgeType === 'deck' 
      ? deck
      : permanentZone;

    let purged: GameCard[] = [];

    if (purgeType === 'deck') {
      let batch: GameCard[] = sourceCards.slice(0, purgeValue);;
      let offset = 0;
      while (batch.length === purgeValue) {
        const tmpPurged = await performPurgeCycle(batch, purgeType, purgeValue, focus);
        purged = [...purged, ...tmpPurged];
        offset += purgeValue;
        batch = sourceCards.slice(offset, offset + purgeValue);

        if (focus) {
          focus = Object.fromEntries(
            FOCUS_KEYS.map((k) => [k, focus![k] ? focus![k]! - 1 : undefined])
          ) as Partial<ResourceMap>;

          if (FOCUS_KEYS.every((k) => !focus![k])) {
            focus = undefined;
          }
        }
      }
    }
    else {
      purged = await performPurgeCycle(sourceCards, purgeType, purgeValue);
    }

    setPurgedCardsImmediate(prev => [...prev, ...purged]);

    // Trigger onPurge effects
    for (const card of purged) {
      const effects = getCardEffects(card.id, card.currentSide);
      for (const effect of effects) {
        if (effect.timing === 'purged') {
          const context: GameContext = {
              card,
              zone: purgeType === 'deck' ? t('deck') : t('permanentZone'),
              resources,
              cardsForTrigger: purgedCardsRef.current,
              filterZone,
              setResources,
              draw,
              effectEndTurn,
              dropToPlayArea,
              dropToBlocked,
              dropToDeck,
              dropToDiscard,
              dropToCampaign,
              dropToPermanent,
              setDeck: setDeckImmediate,
              setPlayArea: setPlayAreaImmediate,
              setDiscard: setDiscardImmediate,
              setPermanentZone,
              setCampaignDeck,
              setTemporaryCardList,
              setTemporaryCardListImmediate,
              setBlockedZone,
              setPurgedCards: setPurgedCardsImmediate,
              deleteCardInZone,
              replaceCardInZone,
              mill,
              openCheckboxPopup,
              selectResourceChoice,
              selectCardsFromZone,
              selectCardsFromArray,
              discoverCard,
              boostProductivity,
              registerEndRoundEffect,
              addCardEffect,
              fetchCardsInZone,
              selectCardSides,
              selectUpgradeCost,
              selectTextInput,
              selectStringChoice,
              updateBlocks,
              getBlockedBy,
              getCardZone,
              upgradeCard,
              handleCardUpdate,
              addDiscoverableCard,
              hasBeenUsedThisTurn,
              markAsUsedThisTurn,
              t,
            };
          await effect.execute(context);
        }
      }
    }

    // Finally remove cards
    for (const card of purged) {
      // Retirer de la zone source
      if (purgeType === 'deck') {
        setDeck(prev => prev.filter(c => c.id !== card.id));
      } else {
        setPermanentZone(prev => prev.filter(c => c.id !== card.id));
      }
    }
  };

  const performPurgeCycle = async (
    batch: GameCard[],
    purgeType: 'deck' | 'permanent',
    purgeValue?: number,
    focus?: Partial<ResourceMap>
  ): Promise<GameCard[]> => {
    let purgeable = batch.filter(card => {
      if (card.negative[card.currentSide - 1]) {
        return false;
      }
      const effects = getCardEffects(card.id, card.currentSide);
      const context: GameContext = {
        card,
        zone: purgeType === 'deck' ? t('deck') : t('permanentZone'),
        resources,
        filterZone,
        setResources,
        draw,
        effectEndTurn,
        dropToPlayArea,
        dropToBlocked,
        dropToDeck,
        dropToDiscard,
        dropToCampaign,
        dropToPermanent,
        setDeck: setDeckImmediate,
        setPlayArea: setPlayAreaImmediate,
        setDiscard: setDiscardImmediate,
        setPermanentZone,
        setCampaignDeck,
        setTemporaryCardList,
        setTemporaryCardListImmediate,
        setBlockedZone,
        setPurgedCards: setPurgedCardsImmediate,
        deleteCardInZone,
        replaceCardInZone,
        mill,
        openCheckboxPopup,
        selectResourceChoice,
        selectCardsFromZone,
        selectCardsFromArray,
        discoverCard,
        boostProductivity,
        registerEndRoundEffect,
        addCardEffect,
        fetchCardsInZone,
        selectCardSides,
        selectUpgradeCost,
        selectTextInput,
        selectStringChoice,
        updateBlocks,
        getBlockedBy,
        getCardZone,
        upgradeCard,
        handleCardUpdate,
        addDiscoverableCard,
        hasBeenUsedThisTurn,
        markAsUsedThisTurn,
        t,
      };
      const cannotBePurged = effects.some(eff =>
        (eff.timing === 'removed' || eff.timing === 'purged') && 
        !eff.execute(context)
      );
      return !cannotBePurged;
    });
    
    if (purgeable.length === 0) {
      return [];
    }

    if (focus) {
      const tmpPurgeable = purgeable;
      purgeable = purgeable.filter((c) =>
        c.GetResources().some((resMap) =>
          FOCUS_KEYS.some((k) => focus[k] && (resMap[k] ?? 0) > 0)
        )
      );
      if (purgeable.length === 0) {
        purgeable = tmpPurgeable;
      }
    }
    
    const selected = await selectCardsFromArray(
      purgeable,
      purgeType === 'deck' ? t('deck') : t('permanentZone'),
      t('selectCardToPurge'),
      purgeType === 'deck' ?
        1 :
        purgeValue?? 0
    );
    
    if (selected.length > 0) {
      return selected;
    }
    
    return [];
  };

  const startExpansion = async (expansionId: string) => {
    const expansion = EXPANSIONS.find(e => e.id === expansionId);
    if (!expansion) return;
    
    setShowExpansionChoice(false);
    
    await discardEndTurn(true);
    
    setCurrentExpansion(expansionId);
    
    if (expansion.type === 'card') {
      const expansionCard = allCards.find(c => c.id === expansion.cardId);
      if (expansionCard) {
        setPermanentZone(prev => [...prev, cloneGameCard(expansionCard)]);
      }
    }
    else if (expansion.type === 'block') {
      if (expansion.deckPurgeValue) {
        await startPurgeProcess('deck', expansion.deckPurgeValue, expansion.focus);
      }
      
      if (expansion.permanentPurgeValue) {
        await startPurgeProcess('permanent', expansion.permanentPurgeValue);
      }

      const newCampaignCards = expansion.campaignCardIds
        ?.map(id => allCards.find(c => c.id === id))
        .filter(Boolean)
        .map(c => cloneGameCard(c!)) || [];
      
      setCampaignDeck(prev => [...prev, ...newCampaignCards].sort((a, b) => a.id - b.id));
      
      // TODO: Post v1.0 : Might not work as expected, test with ridding_the_woods
      refreshDiscoverableCards();
    }
    
    await discardEndTurn(true);
    
    setIsChoosingExpansion(false);
  };

  const checkExpansionEnd = (): boolean => {
    if (!currentExpansion) return false;
    
    const expansion = EXPANSIONS.find(e => e.id === currentExpansion);
    if (!expansion) return false;
    
    else if (expansion.type === 'card') {
      return !permanentZoneRef.current.find(c => c.id === expansion.cardId);
    }
    
    return false;
  };

  // Dans handleEndBaseGame, ajoute :
  const handleEndExpansion = async () => {
    setShouldComputeFame(true);
    
    if (currentExpansion) {
      setCompletedExpansions(prev => [...prev, currentExpansion]);
    }
  };

  // -------------------
  // Replace card in zone by id (used by popup apply)
  // -------------------
  function replaceCardInZone(zone: string, id: number, newCard: GameCard): void {
    if (zone === t('deck')) {
      setDeck((d) => d.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === t('playArea')) {
      setPlayArea((p) => p.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === t('discard')) {
      setDiscard((f) => f.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === t('campaign')) {
      setCampaignDeck((c) => c.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    } else if (zone === t('blocked')) {
      setBlockedZone((b) => b.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    } else if (zone === t('permanentZone')) {
      setPermanentZone((pe) => pe.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    }
  }

  async function deleteCardInZone(zone: string, id: number): Promise<void> {
  
    const sourceCard = findCardInAllZones(id);
    if (!sourceCard) return;
    
    const canDestroy = await triggerOnCardDestroy([sourceCard]);
    
    if (!canDestroy) {
      return;
    }
    
    // Procède à la destruction
    if (zone === t('deck')) setDeck((d) => d.filter(c => c.id !== id));
    if (zone === t('playArea')) setPlayAreaImmediate((p) => p.filter(c => c.id !== id));
    if (zone === t('discard')) setDiscardImmediate((f) => f.filter(c => c.id !== id));
    if (zone === t('campaign')) setCampaignDeck((g) => g.filter(c => c.id !== id));
    if (zone === t('blocked')) setBlockedZone((b) => b.filter(c => c.id !== id));
    if (zone === t('permanentZone')) setPermanentZone((pe) => pe.filter(c => c.id !== id));
    
    const blockedIds = blockMap.get(id);
    if (blockedIds) {
      setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
      setPlayArea(prev => [...prev, ...blockedZone.filter(c => blockedIds.includes(c.id))]);
      updateBlocks(id, null);
    }
  }

  function fetchCardsInZone(filter: (card: GameCard) => boolean, zone: string): GameCard[] {
    if (zone === t('deck')) {
      return deckRef.current.filter(filter);
    } else if (zone === t('playArea')) {
      return playAreaRef.current.filter(filter);
    } else if (zone === t('discard')) {
      return discardRef.current.filter(filter);
    } else if (zone === t('campaign')) {
      return campaignDeck.filter(filter);
    } else if (zone === t('blocked')) {
      return blockedZoneRef.current.filter(filter);
    } else if (zone === t('permanentZone')) {
      return permanentZoneRef.current.filter(filter);
    }
    return [];
  }

  // -------------------
  // Tap actions (pop up, upgrade, resources, etc...)
  // -------------------
  const handleTapAction = (card: GameCard, zone: string) => {
    setPopupCard({ 
      originZone: zone, 
      originalId: card.id, 
      editable: cloneGameCard(card) 
    });
  };

  const handleUpgrade = async (card: GameCard, upg: Upgrade, zone: string) => {
    if (checkUpgradeRestrictions()) {
      return;
    }
    
    if (upg.cost) {
      const hasEnough = Object.entries(upg.cost).every(([k, v]) => {
        const key = k as keyof ResourceMap;
        return (resources[key] || 0) >= (Number(v) || 0);
      });

      if (!hasEnough) {
        return;
      }

      // Check for additional upgrade cost
      const additionalCostEffect = getCardUpgradeAdditionalCost(card.id, card.currentSide);
      if (additionalCostEffect.execute) {
        const context: GameContext = {
          card,
          zone,
          resources,
          filterZone,
          setResources,
          draw,
          effectEndTurn,
          dropToPlayArea,
          dropToBlocked,
          dropToDeck,
          dropToDiscard,
          dropToCampaign,
          dropToPermanent,
          setDeck: setDeckImmediate,
          setPlayArea: setPlayAreaImmediate,
          setDiscard: setDiscardImmediate,
          setPermanentZone,
          setCampaignDeck,
          setTemporaryCardList,
          setTemporaryCardListImmediate,
          setBlockedZone,
          setPurgedCards: setPurgedCardsImmediate,
          deleteCardInZone,
          replaceCardInZone,
          mill,
          openCheckboxPopup,
          selectResourceChoice,
          selectCardsFromZone,
          selectCardsFromArray,
          discoverCard,
          boostProductivity,
          registerEndRoundEffect,
          addCardEffect,
          fetchCardsInZone,
          selectCardSides,
          selectUpgradeCost,
          selectTextInput,
          selectStringChoice,
          updateBlocks,
          getBlockedBy,
          getCardZone,
          upgradeCard,
          handleCardUpdate,
          addDiscoverableCard,
          hasBeenUsedThisTurn,
          markAsUsedThisTurn,
          t,
        };
        
        const additionalCostPaid = await additionalCostEffect.execute(context);
        if (!additionalCostPaid) {
          return;
        }
      }

      setResources((prev) => {
        const next = { ...prev };
        Object.entries(upg.cost !== null ? upg.cost : []).forEach(([k, v]) => {
          const key = k as keyof ResourceMap;
          next[key] = (Number(next[key]) || 0) - (Number(v) || 0);
        });
        return next;
      });
    }

    const blockedIds = blockMap.get(card.id);
    const cardsToUnblock = blockedIds ? blockedZone.filter(c => blockedIds.includes(c.id)) : [];

    // Switch side
    const upgraded = cloneGameCard(card);

    if (zone === t('playArea') && await upgradeCard(upgraded, upg.nextSide)) {
      replaceCardInZone(zone, card.id, upgraded);
      await dropToDiscard({id: upgraded.id, fromZone: t('playArea')});
    } else {
      replaceCardInZone(zone, card.id, upgraded);
    }

    if (blockedIds && cardsToUnblock.length > 0) {
      setBlockedZoneImmediate(prev => prev.filter(c => !blockedIds.includes(c.id)));
      setPlayAreaImmediate(prev => [...prev, ...cardsToUnblock]);
      updateBlocks(card.id, null);
    }

    await discardEndTurn();
  };

  const handleGainResources = async (card: GameCard, resources: Partial<ResourceMap>, zone: string, toZone?: string) => {
    for (const c of [...playArea, ...permanentZone]) {
      const effects = getCardEffects(c.id, c.currentSide, "onResourceGain");
      for (const effect of effects) {
        if (effect.timing === "onResourceGain") {
          const context: GameContext = {
            card: c,
            zone: playArea.includes(c) ? t('playArea') : t('permanentZone'),
            resources: { ...emptyResource, ...resources },
            cardsForTrigger: [card],
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDeck,
            dropToDiscard,
            dropToCampaign,
            dropToPermanent,
            setDeck: setDeckImmediate,
            setPlayArea: setPlayAreaImmediate,
            setDiscard: setDiscardImmediate,
            setPermanentZone,
            setCampaignDeck,
            setTemporaryCardList,
            setTemporaryCardListImmediate,
            setBlockedZone,
            setPurgedCards: setPurgedCardsImmediate,
            deleteCardInZone,
            replaceCardInZone,
            mill,
            openCheckboxPopup,
            selectResourceChoice,
            selectCardsFromZone,
            selectCardsFromArray,
            discoverCard,
            boostProductivity,
            registerEndRoundEffect,
            addCardEffect,
            fetchCardsInZone,
            selectCardSides,
            selectUpgradeCost,
            selectTextInput,
            selectStringChoice,
            updateBlocks,
            getBlockedBy,
            getCardZone,
            upgradeCard,
            handleCardUpdate,
            addDiscoverableCard,
            hasBeenUsedThisTurn,
            markAsUsedThisTurn,
            t,
          };
          
          await effect.execute(context);
        }
      }
    }

    const onlyFame = !Object.entries(resources || {}).some(([key, value]) => 
      key !== "fame" && Number(value) !== 0
    );
    
    if (resources) {
      setResources((prev) => {
        const next = { ...prev };
        Object.entries(resources).forEach(([k, v]) => {
          const key = k as keyof ResourceMap;
          if(key !== "fame" && Number(v) !== 0){
            next[key] = (Number(next[key]) || 0) + (Number(v) || 0);
          }
        });
        return next;
      });
    }
    
    if(onlyFame) {
      return;
    }

    const targetZone = toZone || t('discard');
    const drop = handleDropToZone(targetZone);
    await drop({fromZone: zone, id: card.id});
  };

  const triggerOnCardDiscarded = async (discardedCards: GameCard[]) => {
    const allActiveCards = [...playAreaRef.current, ...permanentZone, ...discardedCards];
    
    for (const card of allActiveCards) {
      const effects = getCardEffects(card.id, card.currentSide);
      
      for (const effect of effects) {
        if (effect.timing === "onCardsDiscarded") {
          const context: GameContext = {
            card,
            zone: playAreaRef.current.includes(card) ? t('playArea') : t('blocked'),
            cardsForTrigger: discardedCards,
            resources,
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDeck,
            dropToDiscard,
            dropToCampaign,
            dropToPermanent,
            setDeck: setDeckImmediate,
            setPlayArea: setPlayAreaImmediate,
            setDiscard: setDiscardImmediate,
            setPermanentZone,
            setCampaignDeck,
            setTemporaryCardList,
            setTemporaryCardListImmediate,
            setBlockedZone,
            setPurgedCards: setPurgedCardsImmediate,
            deleteCardInZone,
            replaceCardInZone,
            mill,
            openCheckboxPopup,
            selectResourceChoice,
            selectCardsFromZone,
            selectCardsFromArray,
            discoverCard,
            boostProductivity,
            registerEndRoundEffect,
            addCardEffect,
            fetchCardsInZone,
            selectCardSides,
            selectUpgradeCost,
            selectTextInput,
            selectStringChoice,
            updateBlocks,
            getBlockedBy,
            getCardZone,
            upgradeCard,
            handleCardUpdate,
            addDiscoverableCard,
            hasBeenUsedThisTurn,
            markAsUsedThisTurn,
            t,
          };
          
          if (await effect.execute(context)) {
            await dropToDiscard({id: card.id, fromZone: t('playArea')});
          }
        }
      }
    }
  };

  const handleCardUpdate = (updatedCard: GameCard, zone: string) => {
    replaceCardInZone(zone, updatedCard.id, updatedCard);
  };

  // -------------------
  // Memory management
  // -------------------
  const saveGame = (name: string) => {
    if (!name) {
      setConfirmationPopup({
        message: t('enterKingdomName'),
        onConfirm: () => setConfirmationPopup(null)
      });
      return;
    }
    const payload: SavedGame = {
      deck,
      campaignDeck,
      playArea,
      discard,
      blockedZone,
      permanentZone,
      purgedCards,
      resources,
      timestamp: Date.now(),
      completedExpansions,
      currentExpansion,
      scores,
    };
    try {
      localStorage.setItem(`citysave:${name}`, JSON.stringify(payload));
      setConfirmationPopup({
        message: `${t('saveSuccess')} '${name}'.`,
        onConfirm: () => setConfirmationPopup(null)
      });
    } catch (e) {
      console.error(e);
      setConfirmationPopup({
        message: t('failedToSave') + e,
        onConfirm: () => setConfirmationPopup(null)
      });
    }
  };

  const loadGame = (name: string) => {
    if (!name) {
      setConfirmationPopup({
        message: t('enterKingdomName'),
        onConfirm: () => setConfirmationPopup(null)
      });
      return;
    }
    try {
      const raw = localStorage.getItem(`citysave:${name}`);
      if (!raw) {
        setConfirmationPopup({
          message: t('noSaveFound') + ": " + name,
          onConfirm: () => setConfirmationPopup(null)
        });
        return;
      }
      const parsed: SavedGame = JSON.parse(raw);
      
      const reconstructCards = (cards: GameCard[]): GameCard[] => {
        return (cards || []).map(cardData => {
          const card = new GameCard({});
          Object.assign(card, cardData);
          return card;
        });
      };
      
      setDeck(reconstructCards(parsed.deck));
      setCampaignDeck(reconstructCards(parsed.campaignDeck));
      setPlayArea(reconstructCards(parsed.playArea));
      setDiscard(reconstructCards(parsed.discard));
      setBlockedZone(reconstructCards(parsed.blockedZone));
      setPermanentZone(reconstructCards(parsed.permanentZone));
      setPurgedCards(reconstructCards(parsed.purgedCards || []));
      setResources(parsed.resources || { ...emptyResource });
      setCompletedExpansions(parsed.completedExpansions || []);
      setCurrentExpansion(parsed.currentExpansion || null);
      setScores(parsed.scores || { baseGame: 0, extensions: {} });
      
      setShowSettings(false);
      setConfirmationPopup({
        message: t('loadSuccess') + ": " + name,
        onConfirm: () => setConfirmationPopup(null)
      });
    } catch (e) {
      console.error(e);
      setConfirmationPopup({
        message: t('failedToLoad') + ": " + e,
        onConfirm: () => setConfirmationPopup(null)
      });
    }
  };

  const getSavedKingdoms = () => {
    const kingdoms = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('citysave:')) {
        kingdoms.push(key.replace('citysave:', ''));
      }
    }
    return kingdoms.sort();
  };

  const resetGame = () => {
    setConfirmationPopup({
      message: t('resetWarning'),
      onConfirm: () => {
        setConfirmationPopup({
          message: t('resetConfirm'),
          onConfirm: () => {
            setDeck(shuffle(allCards.filter((c) => c.id >= 1 && c.id <= 10).map((c) => cloneGameCard(c))));
            setCampaignDeck(shuffle(allCards.filter((c) => c.id > 10).map((c) => cloneGameCard(c))));
            setPlayArea([]);
            setDiscard([]);
            setBlockedZone([]);
            setPermanentZone([]);
            setResources({ ...emptyResource });
            setShowSettings(false);
            setConfirmationPopup(null);
          },
          onCancel: () => setConfirmationPopup(null)
        });
      },
      onCancel: () => setConfirmationPopup(null)
    });
  };

  const [language] = useState<Language>(() => {
    const saved = localStorage.getItem('kingdom-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('kingdom-language', language);
  }, [language]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || /Android|iPad|iPhone/i.test(navigator.userAgent);
    
    const attachment = isMobile ? "fixed" : "fixed";
    const bgSize = "cover";
    const bgPosition = "center";
    
    document.documentElement.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)";
    document.documentElement.style.backgroundAttachment = attachment;
    document.documentElement.style.backgroundSize = bgSize;
    document.documentElement.style.backgroundPosition = bgPosition;
    document.documentElement.style.minHeight = "100vh";
    document.documentElement.style.backgroundRepeat = "no-repeat";
    
    document.body.style.background = "transparent";
    document.body.style.backgroundAttachment = "unset";
    document.body.style.minHeight = "100vh";
    
    return () => {
      document.documentElement.style.background = "";
      document.documentElement.style.backgroundSize = "";
      document.documentElement.style.backgroundPosition = "";
    };
  }, []);

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="p-4 space-y-4 min-h-screen">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            {/* Deck */}
            <div className="min-w-[200px]">
              <div className="relative">
                <Zone
                  name={t('deck')}
                  cards={deck}
                  onDrop={(p) => dropToDeck(p)}
                  onRightClick={() => {}}
                  showAll={false}
                  onTapAction={debugMode ? handleTapAction : undefined}
                  onZoneRef={(el) => { if (el) zoneRefsMap.current.set(t('deck'), el);}}
                  debugMode={debugMode}
                />
                <span className="absolute top-5 right-5 text-sm text-gray-500">
                  {deck.length}
                </span>
              </div>
              <Button disabled={deck.length === 0} onClick={() => setShowDeck(true)}className="mt-2">{t('seeDeck')}</Button>
            </div>

            {/* Discard */}
            <div className="min-w-[200px]">
              <Zone
                name={t('discard')}
                cards={discard}
                onDrop={(p) => dropToDiscard(p)}
                onRightClick={() => {}}
                showAll={false}
                onTapAction={debugMode ? handleTapAction : undefined}
                onZoneRef={(el) => { if (el) zoneRefsMap.current.set(t('discard'), el);}}
                debugMode={debugMode}
              />
              <Button disabled={discard.length === 0} onClick={() => setShowDiscard(true)}className="mt-2">{t('seeDiscard')}</Button>
            </div>

            {/* Permanent zone */}
            <div className="min-w-[750px]">
              <Zone
                name={t('permanentZone')}
                cards={permanentZone}
                onDrop={(p) => dropToPermanent(p)}
                onRightClick={() => {}}
                onTapAction={debugMode ? handleTapAction : undefined}
                onCardUpdate={handleCardUpdate}
                onExecuteCardEffect={(card, zone, timing, effectId) => handleExecuteCardEffect(card, zone, timing, undefined, effectId)}
                interactable={true}
                highlightedCardId={highlightedCardId}
                onReorderCards={(cardIds) => reorderCardsInZone(t('permanentZone'), cardIds)}
                onZoneRef={(el) => { if (el) zoneRefsMap.current.set(t('permanentZone'), el);}}
                debugMode={debugMode}
              />
            </div>

            {/* Campaign Deck */}
            <div className="w-[200px]" hidden={!debugMode}>
              <div className="w-[200px] bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl shadow-lg border-2 border-purple-200">
                <h2 className="text-sm font-bold mb-2 text-purple-800">{t('campaign')}</h2>
                <div className="space-y-2">
                  <select 
                    className="w-full border rounded px-2 py-1 text-s"
                    value={selectedCampaignId || ""}
                    onChange={(e) => setSelectedCampaignId(e.target.value ? Number(e.target.value) : null)}
                  >
                    <option value="">{t('select')}...</option>
                    {campaignDeck
                      .filter(() => true)
                      .sort((a, b) => a.id - b.id)
                      .map((card) => (
                        <option key={card.id} value={card.id}>
                          {t('id')} - {card.id}
                        </option>
                      ))
                    }
                  </select>
                  <Button 
                    onClick={() => {
                      if (selectedCampaignId) {
                        const card = campaignDeck.find((c) => c.id === selectedCampaignId);
                        if (card) setCampaignPreview(card);
                      }
                    }}
                    disabled={!selectedCampaignId}
                    className="w-full text-xs py-1"
                    size="sm"
                  >
                    {t('preview')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Settings button */}
          <div>
            <Button onClick={() => setShowSettings(true)}>{t('settings')}</Button>
          </div>
        </div>

        <div className="flex flex-col flex-row gap-4 max-w-[1300px]">
          {/* Play Area */}
          <div className="flex-1 max-w-[1300px]">
            <Zone
              name={t('playArea')}
              cards={playArea}
              onDrop={(p) => dropToPlayArea(p)}
              onRightClick={() => {}}
              onTapAction={debugMode ? handleTapAction : undefined}
              onCardUpdate={handleCardUpdate}
              onUpgrade={handleUpgrade}
              onGainResources={handleGainResources}
              onExecuteCardEffect={(card, zone, timing, effectIndex) => handleExecuteCardEffect(card, zone, timing, undefined, effectIndex)}
              gatherProductionBonus={gatherProductionBonus}
              gatherAdditionalProductionOptions={gatherAdditionalProductionOptions}
              highlightedCardId={highlightedCardId}
              onReorderCards={(cardIds) => reorderCardsInZone(t('playArea'), cardIds)}
              onZoneRef={(el) => { if (el) zoneRefsMap.current.set(t('playArea'), el);}}
              debugMode={debugMode}
            />
          </div>

          {/* Blocked zone */}
          <div className="w-full w-[450px] min-w-[450px]">
            <Zone
              name={t('blocked')}
              cards={blockedZone}
              onDrop={(p) => dropToBlocked(p)}
              onRightClick={() => {}}
              onCardUpdate={handleCardUpdate}
              onUpgrade={handleUpgrade}
              onGainResources={handleGainResources}
              onExecuteCardEffect={(card, zone, timing, effectId) => {
                if (card.GetType(t).includes(t('scroll'))) {
                  return handleExecuteCardEffect(card, zone, timing, undefined, effectId);
                }
                return Promise.resolve();
              }}
              interactable={true}
              onReorderCards={(cardIds) => reorderCardsInZone(t('blocked'), cardIds)}
              onZoneRef={(el) => { if (el) zoneRefsMap.current.set(t('blocked'), el);}}
              debugMode={debugMode}
            />
          </div>
        </div>

        {/* Action Buttons, Resource Pool et Infos sur une seune ligne */}
        <div className="flex gap-4 items-center">
          {/* Action Buttons à gauche */}
          <div className="flex flex-wrap gap-2 flex-shrink-0" ref={(el) => { if (el) zoneRefsMap.current.set(t('actionButtons'), el);}}>
            <Button onClick={drawNewTurn} disabled={deck.length === 0 || isChoosingExpansion || isAnimating}>{t('newTurn')}</Button>
            <Button onClick={async () => { setIsAnimating(true); await advance(); setIsAnimating(false); }} disabled={deck.length === 0 || isChoosingExpansion || turnEndFlag || isPlayBlocked || isAnimating}>{t('advance')}</Button>
            <Button disabled={deck.length !== 0} className="bg-red-600 hover:bg-red-500 text-white" onClick={handleEndRound}>{t('endRound')}</Button>
            <Button hidden={purgedCards.length === 0} onClick={() => setShowPurged(true)} className="bg-blue-600 hover:bg-blue-500 text-white">{t('seePurged')}</Button>
            <Button hidden={(hasEndedBaseGame || campaignDeck.some(card => card.id === 70)) || (currentExpansion !== null && !checkExpansionEnd())} disabled={deck.length !== 0 || isAnimating} className="bg-red-600 hover:bg-red-500 text-white" onClick={currentExpansion ? handleEndExpansion : handleEndBaseGame}>{currentExpansion ? t('endExpansion') : t('endGame')}</Button>
            <Button onClick={() => setShowExpansionChoice(true)} hidden={!isChoosingExpansion || completedExpansions.length >= 9} disabled={isAnimating} className="bg-purple-600 hover:bg-purple-500 text-white">{t('chooseExpansion')}</Button>
          </div>

          {/* Resource Pool au centre */}
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border-2 border-gray-200 flex-shrink-0" ref={(el) => { if (el) zoneRefsMap.current.set(t('resourcePool'), el);}}>
            <div className="grid grid-cols-7 gap-2">
              {RESOURCE_KEYS.map((key) => (
                <div key={key} className="flex items-center gap-1 p-1 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <img src={resourceIconPath(key)} alt={key} title={key} className="w-5 h-5 flex-shrink-0" />
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      className="w-10 text-center border rounded text-xs py-0.5"
                      value={resources[key]}
                      onChange={(e) => setResources((r) => ({ ...r, [key]: parseInt(e.target.value || "0", 10) || 0 }))}
                      disabled={key === "fame" || !debugMode}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infos à droite - masquées sur mobile */}
          <div 
            onClick={handleDebugClick}
            className="hidden md:block text-xs text-gray-700 whitespace-nowrap ml-auto flex-shrink-0 cursor-pointer select-none"
          >
            Kingdom Legacy - Digital by Keleonix | v0.8.0 {debugMode && '🐛'}
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl space-y-4 max-w-md w-full mx-4 animate-[slideUp_0.3s_ease-out]">
            <h2 className="font-bold text-2xl text-gray-800 border-b-2 border-blue-500 pb-2">{t('settings')}</h2>
              <div className="flex flex-col gap-2">
                {/* Language Selection */}
                <LanguageSelector />
                <Button onClick={resetGame}>{t('resetFullGame')}</Button>
                <Button onClick={() => { setShowGuide(true); setShowSettings(false); }}>Guide</Button>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">{t('kingdomSaveLoad')}</label>
                  
                  <select 
                    className="border p-1 rounded" 
                    value={selectedKingdom} 
                    onChange={(e) => setSelectedKingdom(e.target.value)}
                  >
                    <option value="New Kingdom">{t('newKingdom')}</option>
                    {getSavedKingdoms().map(kingdom => (
                      <option key={kingdom} value={kingdom}>{kingdom}</option>
                    ))}
                  </select>

                  {selectedKingdom === "New Kingdom" && (
                    <input 
                      className="border p-1 rounded" 
                      value={cityNameInput} 
                      onChange={(e) => setCityNameInput(e.target.value)} 
                      placeholder={t('enterKingdomName')} 
                    />
                  )}

                  <div className="flex gap-2">
                    <Button onClick={() => {
                      if (selectedKingdom === "New Kingdom") {
                        saveGame(cityNameInput);
                      } else {
                        saveGame(selectedKingdom);
                      }
                    }}>
                      {t('save')}
                    </Button>
                    <Button 
                      disabled={selectedKingdom === "New Kingdom"}
                      onClick={() => loadGame(selectedKingdom)}
                    >
                      {t('continue')}
                    </Button>
                    <Button onClick={() => { setShowAbout(true); setShowSettings(false); }}>{t('about')}</Button>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-bold mb-2">{t('scores')}</h3>
                  
                  {/* Score du jeu de base */}
                  <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded">
                    <img src="seals/baseGame.png" alt="Base Game" className="w-8 h-8" />
                    <span className="flex-1">{t('baseGame')}</span>
                    <span className="font-bold text-lg">{scores.baseGame} {t('fame')}</span>
                  </div>
                  
                  {/* Scores des extensions */}
                  {Object.entries(scores.expansions).map(([expId, score]) => {
                    const expansion = EXPANSIONS.find(e => e.id === expId);
                    if (!expansion) return null;
                    
                    return (
                      <div key={expId} className="flex items-center gap-2 mb-2 p-2 bg-purple-50 rounded">
                        <img 
                          src={'seals/' + expansion.iconPath}
                          alt={t(expansion.name as TranslationKeys)} 
                          className="w-8 h-8" 
                        />
                        <span className="flex-1">{t(expansion.name as TranslationKeys)}</span>
                        <span className="font-bold text-lg">{score as number} {t('fame')}</span>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={() => setShowSettings(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* About Modal */}
        {showAbout && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-2xl">
              <h2 className="font-bold">{t('about')}</h2>
              <div className="text-sm whitespace-pre-line">
                {t('aboutContent')}
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowAbout(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Guide Modal */}
        {showGuide && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-2xl">
              <h2 className="font-bold">{t('guideTitle')}</h2>
              <div className="text-sm">
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://fryxgames.se/wp-content/uploads/2023/12/FK-Rules-Small.pdf"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  <p>{t('guideRulesLink')}</p>
                </a>
                <div dangerouslySetInnerHTML={{ __html: t('guideContent') }} />
              </div>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowGuide(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {popupCard && (
          <CardPopup
            payload={popupCard}
            close={() => setPopupCard(null)}
            replaceCardInZone={replaceCardInZone}
            resources={resources}
            setResources={setResources}
          />
        )}

        {/* Campaign Preview Popup */}
        {campaignPreview && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4">
              <h2 className="font-bold">{t('campaign')} {t('card')} #{campaignPreview.id}</h2>
              <div className="flex gap-4">
                <Zone
                  name={t('campaign')}
                  cards={[campaignPreview]}
                  onDrop={(p) => dropToCampaign(p)}
                  onTapAction={debugMode ? handleTapAction : undefined}
                  onRightClick={() => {}}
                  debugMode={debugMode}
                />
                <Zone name={t('discard')} cards={discard.slice(-1)} onDrop={(p) => {dropToDiscard(p); setCampaignPreview(null);}} onTapAction={debugMode ? handleTapAction : undefined} onRightClick={() => {}} showAll={true} debugMode={debugMode} />
                <Zone name={t('destroy')} cards={[]} onDrop={(p) => {dropToDestroy(p); setCampaignPreview(null);}} onRightClick={() => {}} debugMode={debugMode} />
              </div>
              <Button onClick={() => setCampaignPreview(null)}>{t('close')}</Button>
            </div>
          </div>
        )}

        {/* Full Discard Modal */}
        {showDiscard && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-auto flex flex-col">
              <h2 className="font-bold text-xl">{t('discard')}</h2>
              <div className="flex flex-col flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {discard.map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone={t('discard')}
                        onRightClick={() => {}}
                        onTapAction={debugMode ? handleTapAction : undefined}
                      />
                    ))}
                  </div>
                </div>
                <div className="min-w-[220px]">
                  <Zone name={t('playArea')} cards={playArea} onDrop={(p) => dropToPlayArea(p)} onRightClick={() => {}} onTapAction={debugMode ? handleTapAction : undefined} debugMode={debugMode} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowDiscard(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* End Round Modal */}
        {showEndRound && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4">
              <h2 className="font-bold">{t('endRound')}</h2>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-bold">{t('campaign')} {t('deck')}</p>
                  <Zone
                    name={t('campaign')}
                    cards={campaignDeck.filter(card => availableDiscoverableCards.includes(card.id)).sort((a, b) => a.id -b.id)}
                    onDrop={() => {}}
                    onTapAction={(card) => {
                      if (card.choice && (card.currentSide === 1 || card.currentSide === 3)) {
                        const newSide = card.currentSide === 1 ? 3 : 1;
                        const updatedCard = cloneGameCard(card);
                        updatedCard.currentSide = newSide;
                        replaceCardInZone(t('campaign'), card.id, updatedCard);
                      } else if (debugMode) {
                        handleTapAction(card, t('campaign'));
                      }
                    }}
                    onRightClick={() => {}}
                    onExecuteCardEffect={async (card, zone) => {
                      if (card.GetType(t) === "Parchemin") {
                        return handleExecuteCardEffect(card, zone, "onClick");
                      }
                      return Promise.resolve();
                    }}
                    debugMode={debugMode}
                  />
                </div>

                <div className="flex-1 flex-col flex-row gap-4 max-w-[230px]">
                  <p className="font-bold">{t('deck')}</p>
                  <Zone name={t('deck')} cards={deck.slice(0, 1)} onDrop={(p) => dropToDeck(p)} onTapAction={debugMode ? handleTapAction : undefined} onRightClick={() => {}} debugMode={debugMode} />
                  {<Button onClick={() => setShowDeck(true)}>{t('seeDeck')}</Button>}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button 
                  disabled={availableDiscoverableCards.filter((id) => fetchCardsInZone((c) => c.id === id, t('campaign'))[0]?.GetType(t).includes(t('scroll'))).length !== 0}
                  onClick={async () => {
                    const cardsToAdd = campaignDeck.filter(card => 
                      availableDiscoverableCards.includes(card.id)
                    );
                    
                    for (const card of cardsToAdd) {
                      dropToDeck({ id: card.id, fromZone: t('campaign') });
                    }
                    await new Promise(resolve => setTimeout(resolve, 300));
                    
                    shuffleDeck();
                    setShowEndRound(false);
                  }}
                >
                  {t('add')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Full Deck Modal */}
        {showDeck && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-auto flex flex-col">
              <h2 className="font-bold text-xl">{t('deck')}</h2>
              <div className="flex flex-col flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {[...deck].sort((a, b) => a.id - b.id).map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone={t('deck')}
                        onRightClick={() => {}}
                        onTapAction={debugMode ? handleTapAction : undefined}
                      />
                    ))}
                  </div>
                </div>
                <Zone name={t('destroy')} cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} debugMode={debugMode} />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowDeck(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Purged Modal */}
        {showPurged && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-auto flex flex-col">
              <h2 className="font-bold text-xl">{t('purged')}</h2>
              <div className="flex flex-col flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {[...purgedCards].sort((a, b) => a.id - b.id).map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone={t('purged')}
                        onRightClick={() => {}}
                        onTapAction={debugMode ? handleTapAction : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowPurged(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {resourceChoicePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70]">
          <div className="bg-white p-4 rounded-xl space-y-4 max-w-md">
            <h2 className="font-bold">{t('chooseResource')}</h2>
            
            <div className="space-y-2">
              {resourceChoicePopup.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    resourceChoicePopup.resolve(option);
                    setResourceChoicePopup(null);
                  }}
                  className="w-full p-3 border rounded hover:bg-gray-100 transition flex items-center gap-2 justify-center"
                >
                  {Object.entries(option).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-1">
                      <img 
                        src={resourceIconPath(key as keyof ResourceMap)} 
                        alt={key} 
                        className="w-5 h-5" 
                      />
                      <span className="text-sm">x{value}</span>
                    </div>
                  ))}
                </button>
              ))}
            </div>

            <Button 
              onClick={() => {
                resourceChoicePopup.resolve(null);
                setResourceChoicePopup(null);
              }}
              variant="secondary"
              className="w-full"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}

      {cardSelectionPopup && (
        <CardSelectionPopup
          cards={cardSelectionPopup.cards}
          effectDescription={cardSelectionPopup.effectDescription}
          zone={cardSelectionPopup.zone}
          requiredCount={cardSelectionPopup.requiredCount}
          optionalCount={cardSelectionPopup.optionalCount}
          searchType={cardSelectionPopup.searchType}
          triggeringCard={cardSelectionPopup.triggeringCard}
          onConfirm={(selected) => {
            cardSelectionPopup.resolve(selected);
            setCardSelectionPopup(null);
          }}
          onCancel={() => setCardSelectionPopup(null)}
        />
      )}

      {showCheckboxPopup && checkboxPopupCard && onCheckboxConfirm && (
        <CheckboxSelectionPopup
          card={checkboxPopupCard}
          requiredCount={checkboxRequiredCount}
          optionalCount={checkboxOptionalCount}
          onConfirm={(selected) => {
            onCheckboxConfirm(selected);
            setShowCheckboxPopup(false);
            setCheckboxPopupCard(null);
          }}
          onCancel={() => {
            setShowCheckboxPopup(false);
            setCheckboxPopupCard(null);
          }}
        />
      )}

      {effectConfirmationPopup && (
        <EffectConfirmationPopup
          description={effectConfirmationPopup.description}
          onConfirm={() => {
            effectConfirmationPopup.onConfirm();
            setEffectConfirmationPopup(null);
          }}
          onSkip={() => {
            effectConfirmationPopup.onSkip();
            setEffectConfirmationPopup(null);
          }}
        />
      )}

      {showCardSidePopup && cardSidePopupCard && onCardSideConfirm && (
        <CardSideSelectionPopup
          card={cardSidePopupCard}
          requiredCount={cardSideRequiredCount}
          optionalCount={cardSideOptionalCount}
          onConfirm={(selectedSides) => {
            onCardSideConfirm(selectedSides);
            setShowCardSidePopup(false);
            setCardSidePopupCard(null);
          }}
          onCancel={() => {
            setShowCardSidePopup(false);
            setCardSidePopupCard(null);
          }}
        />
      )}

      {showUpgradeCostPopup && upgradeCostPopupCard && onUpgradeCostConfirm && (
        <UpgradeCostSelectionPopup
          card={upgradeCostPopupCard.card}
          selectResource={upgradeCostPopupCard.selectResource}
          onConfirm={(upgradeIndex, resourceKey) => {
            onUpgradeCostConfirm(upgradeIndex, resourceKey);
            setShowUpgradeCostPopup(false);
            setUpgradeCostPopupCard(null);
          }}
          onCancel={() => {
            setShowUpgradeCostPopup(false);
            setUpgradeCostPopupCard(null);
          }}
        />
      )}

      {textInputPopup && (
        <TextInputPopup
          description={textInputPopup.description}
          required={textInputPopup.required}
          onConfirm={(text) => {
            textInputPopup.resolve(text);
            setTextInputPopup(null);
          }}
          onCancel={() => {
            textInputPopup.resolve(null);
            setTextInputPopup(null);
          }}
        />
      )}

      {stringChoicePopup && (
        <StringChoicePopup
          description={stringChoicePopup.description}
          choices={stringChoicePopup.choices}
          onConfirm={(choice) => {
            stringChoicePopup.resolve(choice);
            setStringChoicePopup(null);
          }}
        />
      )}

      {confirmationPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-xl space-y-4 max-w-md mx-4">
            <p className="text-center">{confirmationPopup.message}</p>
            <div className="flex justify-center gap-3">
              {confirmationPopup.onCancel && (
                <Button onClick={confirmationPopup.onCancel} variant="secondary">
                  {t('cancel')}
                </Button>
              )}
              <Button onClick={confirmationPopup.onConfirm}>
                {t('confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showExpansionChoice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl space-y-4 max-w-2xl">
            <h2 className="font-bold text-xl">{t('chooseExpansion')}</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {EXPANSIONS
                .filter(exp => !completedExpansions.includes(exp.id))
                .map(expansion => (
                  <button
                    key={expansion.id}
                    onClick={() => startExpansion(expansion.id)}
                    className="p-4 border-2 rounded-lg hover:border-purple-500 transition flex flex-col items-center gap-2"
                  >
                    <img 
                      src={'seals/' + expansion.iconPath} 
                      alt={t(expansion.name as TranslationKeys)}
                      className="w-20 h-20"
                    />
                    <span className="font-medium text-sm">
                      {t(expansion.name as TranslationKeys)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {expansion.type === 'card' ? t('expansionCard') : t('expansionBlock')}
                    </span>
                    <span className="text-xs text-black-500" hidden={!expansion.deckPurgeValue}>
                      {t('purged')} : {expansion.deckPurgeValue}
                    </span>
                    <span className="text-xs text-black-500" hidden={!expansion.focus}>
                      {expansion.focus
                        ? renderEffectText(
                            "Focus: " + Object.entries(expansion.focus)
                              .filter(([, v]) => v && v > 0)
                              .map(([k, v]) => `resources/${k} x${v}`)
                              .join(" "),
                            t
                          )
                        : ""}
                    </span>
                  </button>
                ))}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setShowExpansionChoice(false)}>
                {t('close')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {slidingCards.size > 0 && createPortal(
        <svg
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 40,
          }}
        >
          <defs>
            <style>{`
              @keyframes slideCard {
                0% {
                  opacity: 1;
                  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
                }
                100% {
                  opacity: 0.3;
                  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5));
                }
              }
            `}</style>
          </defs>
          {Array.from(slidingCards.entries()).map(([cardId, { fromZone, toZone }], index) => {
            const sourceZone = zoneRefsMap.current.get(fromZone);
            const destZone = zoneRefsMap.current.get(toZone);
            
            if (!sourceZone || !destZone) return null;
            
            const sourceRect = sourceZone.getBoundingClientRect();
            const destRect = destZone.getBoundingClientRect();
            
            const startX = sourceRect.left + sourceRect.width / 2 - 98;
            const startY = sourceRect.top + sourceRect.height / 2 - 140;
            
            const endX = destRect.left + destRect.width / 2 - 98;
            const endY = destRect.top + destRect.height / 2 - 140;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            const card = findCardInAllZones(cardId);
            if (!card) return null;
            
            const delayMs = index * 100;
            
            return (
              <g key={cardId}>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from={`0 0`}
                  to={`${deltaX} ${deltaY}`}
                  dur="0.3s"
                  fill="remove"
                  calcMode="spline"
                  keySplines="0.25 0.46 0.45 0.94"
                  begin={`${delayMs}ms`}
                />
                <foreignObject
                  x={startX}
                  y={startY}
                  width="196"
                  height="280"
                  style={{
                    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                    animation: `slideCard ease-out forwards ${delayMs}ms`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ pointerEvents: 'none' }}>
                    <CardView
                      card={card}
                      fromZone={fromZone}
                      onRightClick={() => {}}
                      interactable={false}
                    />
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>,
        document.body
      )}
      </div>
      <TutorialOverlay
        isActive={isTutorialActive}
        currentStep={currentStep}
        stepIndex={stepIndex}
        totalSteps={totalSteps}
        spotlightRect={spotlightRect}
        onNext={tutorialNext}
        onPrevious={tutorialPrev}
        onStop={stopTutorial}
        t={t}
      />
    </DndProvider>
  );
}
