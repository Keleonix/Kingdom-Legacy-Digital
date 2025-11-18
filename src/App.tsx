import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { emptyResource, GameCard, RESOURCE_KEYS, EFFECT_KEYWORDS, TYPE_COLORS, type ResourceMap, type PopupPayload, type DropPayload, type Checkbox, type Upgrade, type EffectTiming } from "./types";
import { allCards } from "./cards";
import { getCardEffects, type GameContext, type CardEffect, cardEffectsRegistry, getCardFameValue, getCardUpgradeAdditionalCost, getCardSelectionValue } from "./cardEffects";
import { useTranslation, type Language, LanguageSelector, type TranslationKeys } from './i18n';
import { createPortal } from 'react-dom';

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

  if (card.negative[card.currentSide - 1]) {
    colors.push(TYPE_COLORS["enemy"]); // ← Utiliser la clé en anglais
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

function renderCheckboxContent(content: string | undefined) {
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
    return (<span className="text-[9px] font-medium">{content}</span>);
  }

  return (
    <div className="flex items-center justify-center flex-wrap">
      {parsedResources.map((res, i) => (
        <div key={i} className="flex items-center">
          <img 
            src={resourceIconPath(res.name as keyof ResourceMap)} 
            alt={res.name} 
            className="w-4 h-4 flex-shrink-0" 
          />
          {res.count > 1 && (
            <span className="text-[9px] font-medium">{res.count}</span>
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

  function renderEffectText(effect: string) {
    return effect.split(/(\s+)/).map((part, idx) => {
      if (/^\s+$/.test(part)) {
        return <span key={idx}>{part}</span>;
      }
      if (part.startsWith("resources/") || part.startsWith("effects/")) {
        return (
          <img
            key={idx}
            src={part.concat(".png")}
            alt={part}
            className="inline w-4 h-4 mx-0.5"
          />
        );
      }
      return (
        <span key={idx} className="inline">
          {part}
        </span>
      );
    });
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
      className="fixed z-50 p-3 border-2 rounded-lg bg-white shadow-2xl pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        minWidth: '450px',
        maxWidth: '450px'
      }}
    >
      <div className="font-bold text-lg mb-3 text-center">{t('card')} #{card.id}</div>

      <div className="relative">
        <div className="grid grid-cols-2 gap-3 max-w-[450px]">
          {/* Front Up (Side 1) - INDEX 0 */}
          <div ref={cardRefs.frontUp} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 0)}>
            <div className="font-semibold text-sm mb-1">{t('frontUp')}</div>
            {card.name[0] ? (
              <>
                <div className="text-xs font-bold mb-1 border-t">
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
                    {renderEffectText(card.GetEffect(t, 0))}
                  </div>
                )}
                {card.upgrades[0]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[0].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {sideLabel(upg.nextSide, t)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">None</div>
            )}
          </div>

          {/* Back Up (Side 3) - INDEX 2 */}
          <div ref={cardRefs.backUp} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 2)}>
            <div className="font-semibold text-sm mb-1">{t('backUp')}</div>
            {card.name[2] ? (
              <>
                <div className="text-xs font-bold mb-1 border-t">
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
                    {renderEffectText(card.GetEffect(t, 2))}
                  </div>
                )}
                {card.upgrades[2]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[2].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {sideLabel(upg.nextSide, t)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">None</div>
            )}
          </div>

          {/* Front Down (Side 2) - INDEX 1 */}
          <div ref={cardRefs.frontDown} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 1)}>
            <div className="font-semibold text-sm mb-1">{t('frontDown')}</div>
            {card.name[1] ? (
              <>
                <div className="text-xs font-bold mb-1 border-t">
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
                    {renderEffectText(card.GetEffect(t, 1))}
                  </div>
                )}
                {card.upgrades[1]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[1].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {sideLabel(upg.nextSide, t)}</span>
                        <span className="text-gray-600 flex items-center gap-1">
                          ({renderUpgradeCost(upg)})
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-xs text-gray-400 italic">None</div>
            )}
          </div>

          {/* Back Down (Side 4) - INDEX 3 */}
          <div ref={cardRefs.backDown} className="border rounded p-2 max-w-[200px]" style={getBackgroundStyle(card, 3)}>
            <div className="font-semibold text-sm mb-1">{t('backDown')}</div>
            {card.name[3] ? (
              <>
                <div className="text-xs font-bold mb-1 border-t">
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
                    {renderEffectText(card.GetEffect(t, 3))}
                  </div>
                )}
                {card.upgrades[3]?.length > 0 && (
                  <div className="mt-2 border-t pt-2">
                    <div className="text-[9px] font-semibold mb-1">{t('upgrades')}:</div>
                    {card.upgrades[3].map((upg, idx) => (
                      <div key={idx} className="text-[8px] mb-1 flex items-center gap-1 flex-wrap">
                        <span className="text-blue-600">→ {sideLabel(upg.nextSide, t)}</span>
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

  function renderEffectText(effect: string) {
    return effect.split(/(\s+)/).map((part, idx) => {
      if (/^\s+$/.test(part)) {
        return <span key={idx}>{part}</span>;
      }

      if (part.startsWith("resources/") || part.startsWith("effects/")) {
        return (
          <img
            key={idx}
            src={part.concat(".png")}
            alt={part}
            className="inline w-4 h-4 mx-0.5"
          />
        );
      }

      return (
        <span key={idx} className="inline">
          {part}
        </span>
      );
    });
  }

  function renderEffect(raw: string) {
    const { before, effects } = parseEffects(raw);
    const cardEffects = getCardEffects(card.id, card.currentSide);

    return (
      <div className="flex flex-col gap-1">
        {before && (
          <div 
            className="text-sm overflow-hidden" 
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {renderEffectText(before)}
          </div>
        )}

        {effects.map((effObj, parsedIdx) => {
          // L'index dans cardEffects correspond directement à parsedIdx
          // car les deux tableaux sont construits dans le même ordre
          const effect = cardEffects[parsedIdx];
          const isClickable = effect && effect.timing === "onClick";

          if (isClickable) {
            return (
              <button
                key={parsedIdx}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  await onExecuteCardEffect?.(card, fromZone, "onClick", parsedIdx);
                }}
                className="text-[10px] px-2 py-1 border rounded transition text-left w-full bg-blue-50 hover:bg-blue-100 border-blue-300"
              >
                {renderEffectText(effObj.text)}
              </button>
            );
          } else {
            return (
              <div key={parsedIdx} className="text-[10px] px-2 py-1">
                {renderEffectText(effObj.text)}
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
        className={`w-49 h-70 m-2 flex flex-col items-center justify-between border-2 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
          ${!interactable ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"}
          ${isHighlighted ? "ring-4 ring-blue-400 border-blue-500" : ""}`}
        >
        <CardContent className="text-center p-2 overflow-hidden">
          {card.GetType(t).includes(t('permanent')) && <img src={"effects/permanent.png"} alt={t('permanentZone')} title={t('permanentZone')} className="w-49 h-2" />}
          {card.choice && (card.currentSide == 1 || card.currentSide == 3) && <button><img src={"effects/choice.png"} alt={t('choice')} title={t('choice')} className="w-49 h-2" /></button>}
          <div>
            <p className="font-bold text-sm line-clamp-2">
              {card.id >= 0 ? card.id : ""} {" | "} {name} {" | "} {type}
            </p>
          </div>

          {/* Normal (in-play) resources */}
          <div className="mt-2 flex flex-wrap justify-center gap-2 items-center">
            {resOptions.map((opt, idx) => {
              const productionBonus = gatherProductionBonus ? gatherProductionBonus(card, fromZone) : {};
              
              const displayOpt = { ...opt };
              Object.entries(productionBonus).forEach(([key, value]) => {
                const resourceKey = key as keyof ResourceMap;
                displayOpt[resourceKey] = (displayOpt[resourceKey] || 0) + (value || 0);
              });
              
              const icons = RESOURCE_KEYS.flatMap((k) => {
                const baseCount = opt[k] ?? 0;
                const bonusCount = productionBonus[k] ?? 0;
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
                    className="text-[10px] px-2 py-1 border rounded bg-white flex items-center hover:bg-gray-100 transition"
                  >
                    {icons}
                  </button>
                </div>
              );
            }).filter(Boolean)}
          </div>

          <div className="mt-2">
            {effect && <div className="mb-2 text-sm line-clamp-5">{renderEffect(effect)}</div>}
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).lastMouseX = e.clientX;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).lastMouseY = e.clientY;
                    setUpgradePreviewSide(upg.nextSide);
                    setShowUpgradePreview(true);
                  }}
                  onMouseLeave={() => {
                    setShowUpgradePreview(false);
                    setUpgradePreviewSide(null);
                  }}
                  className="text-[10px] px-2 py-1 border rounded bg-white flex items-center hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-1">
                    {upg.cost ? (
                      Object.entries(upg.cost).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1 text-[11px]">
                          <img src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-3 h-3" />x{v}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px]">{t('noCost')}</span>
                    )}
                    {upg.otherCost && (
                      <span className="text-[11px] italic">{upg.otherCost}</span>
                    )}
                  </div>
                  <div className="text-[11px]">{"→ "}{sideLabel(upg.nextSide, t)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes - Fixed size and layout */}
          <div className="mt-2">
            <div className="grid grid-cols-6 gap-1 justify-items-center">
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
                  className={`w-7 h-7 border rounded flex items-center justify-center p-1 text-[10px] ${
                    box.checked ? "bg-green-100 border-green-400" : "bg-white border-gray-300"
                  } hover:border-gray-400 transition-colors`}
                  title={box.content || t('emptyCheckbox')}
                >
                  {renderCheckboxContent(box.content)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
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
      {showUpgradePreview && upgradePreviewSide !== null && (
        <div 
          ref={upgradePreviewRef}
          className="fixed z-[60] p-3 border-2 rounded-lg bg-white shadow-2xl pointer-events-none"
          style={{
            top: `${upgradePreviewPosition.top}px`,
            left: `${upgradePreviewPosition.left}px`,
            minWidth: '225px',
            maxWidth: '225px'
          }}
        >
          <div className="font-bold text-center mb-2">
            {sideLabel(upgradePreviewSide, t)}
          </div>
          
          <div className="border rounded p-2" style={getBackgroundStyle(card, upgradePreviewSide - 1)}>
            {card.name[upgradePreviewSide - 1] ? (
              <>
                <div className="text-sm font-bold mb-1">{t(card.name[upgradePreviewSide - 1] as TranslationKeys)}</div>
                <div className="text-xs text-gray-700 mb-2">{t(card.type[upgradePreviewSide - 1] as TranslationKeys)}</div>
                
                {/* Resources */}
                <div className="text-xs mb-2">
                  {renderSideOptions(card.resources[upgradePreviewSide - 1], upgradePreviewSide - 1)}
                </div>
                
                {/* Effects */}
                {card.effects[upgradePreviewSide - 1] && (
                  <div className="text-[10px] mt-2 border-t pt-2">
                    {renderEffectText(t(card.effects[upgradePreviewSide - 1] as TranslationKeys))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-gray-400 italic text-center py-4">{t('emptySide')}</div>
            )}
          </div>
        </div>
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
  showAll = true,
  interactable = true,
  onTapAction,
  highlightedCardId,
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
  showAll?: boolean;
  interactable?: boolean;
  onTapAction?: (card: GameCard, zone: string) => void;
  highlightedCardId?: number | null;
}) {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: { id: number; fromZone: string }) => {
        onDrop({ id: item.id, fromZone: item.fromZone });
      },
      canDrop: () => interactable,
    }),
    [onDrop, interactable]
  );
  drop(ref);

  let displayCards = cards;
  if (!showAll && cards.length > 0) {
    displayCards = [cards[cards.length - 1]];
  }

  // --- Layout rules ---
  let containerClass = "grid gap-2";
  let gridTemplate: string | undefined;
  let isPermanentZone = false;

  if (name === t('playArea') || name === t('blocked')) {
    // Mobile-friendly flex row with wrap
    containerClass = "flex flex-wrap gap-2 justify-start items-start";
  } else if (name === t('permanentZone')) {
    // Permanent zone: overlapping cards layout
    containerClass = "relative flex justify-start items-start";
    isPermanentZone = true;
  } else {
    // Default: responsive grid for mobile
    const cols = Math.min(6, displayCards.length || 1);
    gridTemplate = `repeat(${cols}, minmax(220px, 1fr))`;
  }

  // Calculate offset for overlapping cards in permanent zone (max 6 per line)
  const getCardStyle = (index: number): React.CSSProperties => {
    if (!isPermanentZone) return {};
    
    // Maximum 6 cards per line, each offset by 120px (showing more of each card)
    const cardsPerLine = 6;
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
  };

  // Calculate container dimensions for permanent zone
  const getContainerStyle = (): React.CSSProperties => {
    if (!isPermanentZone) return {};
    
    const offsetPerCard = 80;
    const offsetY = 290;
    const fixedWidth = 220 + (5 * offsetPerCard);
    const totalLines = Math.ceil(displayCards.length / 6);
    const totalHeight = totalLines * offsetY;
    
    return {
      width: `${fixedWidth}px`,
      minHeight: `${totalHeight}px`,
    };
  };

  return (
    <div ref={ref} className="p-4 border-2 rounded-xl min-h-[130px] shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-3 text-gray-800">{name}</h2>
      <div
        className={containerClass}
        style={
          isPermanentZone 
            ? getContainerStyle()
            : gridTemplate 
              ? { gridTemplateColumns: gridTemplate, alignItems: "start" } 
              : {}
        }
      >
      {displayCards.length > 0 ? (
        displayCards.map((c, index) => (
          <div
            key={`${name}-${c.id}-${c.currentSide}`}
            style={getCardStyle(index)}
            className={isPermanentZone ? "group" : ""}
            onMouseEnter={(e) => {
              if (isPermanentZone) {
                e.currentTarget.style.zIndex = '1000';
              }
            }}
            onMouseLeave={(e) => {
              if (isPermanentZone) {
                e.currentTarget.style.zIndex = String(index);
              }
            }}
          >
            <div className={isPermanentZone ? "group-hover:scale-105 transition-transform duration-300" : ""}>
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
  const maxCount = requiredCount + (optionalCount ?? 0);
  
  const [selectedCards, setSelectedCards] = useState<GameCard[]>(() => {
    let totalValue = 0;
    const selected: GameCard[] = [];
    
    for (const card of cards) {
      const cardValue = getCardSelectionValue(card, searchType || "");
      if (totalValue + cardValue <= maxCount) {
        selected.push(card);
        totalValue += cardValue;
      } else {
        break;
      }
    }
    
    const allCardsValue = cards.reduce((sum, c) => sum + getCardSelectionValue(c, searchType || ""), 0);
    if (allCardsValue <= maxCount) {
      return [...cards];
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
        if (selectedValue + cardValue <= maxCount) {
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

  const canConfirm = selectedValue >= requiredCount && selectedValue <= maxCount;

  const displayMessage = (() => {
  const allCardsValue = cards.reduce((sum, c) => sum + getCardSelectionValue(c, searchType || ""), 0);
  const autoSelected = allCardsValue <= maxCount;
  
  if (optionalCount) {
    return `${effectDescription} (${requiredCount}-${maxCount} valeur${autoSelected ? t('autoSelected') : ''})`;
  }
    return `${effectDescription} (${requiredCount} valeur${autoSelected ? t('autoSelected') : ''})`;
  })();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80]">
      <div className="bg-white p-4 rounded-xl space-y-4 max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Show triggering card if provided */}
        {triggeringCard && (
          <div className="border-b pb-3">
            <h3 className="text-sm font-semibold mb-2">{triggeringCard ? triggeringCard.GetName(t) : ""}:</h3>
            <div className="flex justify-center">
              <CardView
                card={triggeringCard}
                fromZone={zone}
                onRightClick={() => {}}
                interactable={false}
              />
            </div>
          </div>
        )}
        
        <h2 className="font-bold">{displayMessage}</h2>
        
        <div className="flex-1 overflow-y-auto p-2 border rounded">
          <div className="grid grid-cols-3 gap-2">
            {cards.map((card) => {
              const isSelected = selectedCards.some(c => c.id === card.id);
              const cardValue = getCardSelectionValue(card, searchType || "");
              
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
                  {/* Badge pour afficher la valeur si > 1 */}
                  {cardValue > 1 && (
                    <div className="absolute top-2 right-2 z-20 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm">
                      {cardValue}
                    </div>
                  )}
                  
                  <div 
                    className="absolute inset-0 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(card);
                    }}
                  />
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

        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm text-gray-600">
            Valeur: {selectedValue} / {optionalCount ? `${requiredCount}-${maxCount}` : requiredCount}
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
          <p>{description}</p>
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
                    <span>{renderCheckboxContent(checkbox.content) ?? `Case ${i + 1}`}</span>
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
              const sideName = card.name[sideNum - 1] || `Side ${sideNum}`;
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
                    disabled={
                      !isSelected && selected.length >= requiredCount + optionalCount
                    }
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
  onConfirm: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void;
  onCancel: () => void;
}> = ({ card, onConfirm, onCancel }) => {
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
                      → {sideLabel(upg.nextSide, t)}
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
                </button>
              ))}
            </div>

            {selectedUpgradeIndex !== null && currentUpgrades[selectedUpgradeIndex].cost && (
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
              if (selectedUpgradeIndex !== null && selectedResourceKey !== null) {
                onConfirm(selectedUpgradeIndex, selectedResourceKey);
              }
            }}
            disabled={selectedUpgradeIndex === null || selectedResourceKey === null}
            className={`px-3 py-1 rounded ${
              selectedUpgradeIndex !== null && selectedResourceKey !== null
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
          {description}
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
          {description}
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
              {choice}
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

  const [pendingPlayedCards, setPendingPlayedCards] = useState<GameCard[]>([]);

  const [pendingEndRoundEffects, setPendingEndRoundEffects] = useState<Array<{
    description: string;
    effect: () => Promise<void>;
    forceResolve: boolean;
  }>>([]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playArea, permanentZone]);

  const [showUpgradeCostPopup, setShowUpgradeCostPopup] = useState(false);
  const [upgradeCostPopupCard, setUpgradeCostPopupCard] = useState<GameCard | null>(null);
  const [onUpgradeCostConfirm, setOnUpgradeCostConfirm] = useState<
    ((upgradeIndex: number, resourceKey: keyof ResourceMap) => void) | null
  >(null);

  const [highlightedCardId, setHighlightedCardId] = useState<number | null>(null);

  // ----------- immediate refs & setters (à ajouter près des useState) -----------
  const deckRef = useRef<GameCard[]>([]);
  const playAreaRef = useRef<GameCard[]>([]);
  const discardRef = useRef<GameCard[]>([]);
  const blockedZoneRef = useRef<GameCard[]>([]);
  const temporaryCardListRef = useRef<GameCard[]>([]);

  // Keep refs in sync if other code uses setPlayArea / setDiscard directly
  useEffect(() => { deckRef.current = deck; }, [deck]);
  useEffect(() => { playAreaRef.current = playArea; }, [playArea]);
  useEffect(() => { discardRef.current = discard; }, [discard]);
  useEffect(() => { blockedZoneRef.current = blockedZone; }, [blockedZone]);

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
      temporaryCardListRef.current = v;
      setTemporaryCardList(v);
    } else {
      temporaryCardListRef.current = next as GameCard[];
      setTemporaryCardList(next as GameCard[]);
    }
  }

  // -------------------
  // Game Phases
  // -------------------
  const checkPlayRestrictions = (): boolean => {
    const allActiveCards = [...playArea];
    
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

  const checkUpgradeRestrictions = (): boolean => {
    if (turnEndFlag) {
      return true;
    }

    const allActiveCards = [...playArea];
    
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
    const allActiveCards = [...playArea];
    
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

  const draw = (nbCards: number) => {
    if (checkPlayRestrictions()) {
      return;
    }

    const drawn = deck.slice(0, nbCards);
    const newCards = drawn.map(cloneGameCard);
    
    for (const card of drawn) {
      dropToPlayArea({id: card.id, fromZone: t('deck')});
    }
    setPendingPlayedCards(newCards);
  };

  useEffect(() => {
    if (pendingPlayedCards.length > 0) {
      (async () => {
        for (const card of pendingPlayedCards) {
          await handleExecuteCardEffect(card, t('playArea'), "played");

        }
        for (const card of pendingPlayedCards) {
          await handleExecuteCardEffect(card, t('playArea'), "otherCardPlayed", pendingPlayedCards);
        }
        setPendingPlayedCards([]);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPlayedCards]);

  const drawNewTurn = async () => {
    if (!turnEndFlag) {
      await discardEndTurn();
    }
    setResources((prev) => {
      const reset: ResourceMap = { ...emptyResource };
      if ("fame" in prev) (reset as Partial<ResourceMap>).fame = (prev as Partial<ResourceMap>).fame;
      return reset;
    });
    draw(4);

    setTurnEndFlag(false);
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
    for(const card of playArea) {
      await handleExecuteCardEffect(card, t('playArea'), "endOfTurn");
    }
  }

  const gatherEffectsEndOfRound = async () => {
    const cardsWithEffects: Array<{ card: GameCard, effectIndex: number }> = [];
    
    for (const card of playArea) {
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
      const realCard = deckRef.current.find(c => c.id === card.id);
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
      setPlayAreaImmediate([]);
      setBlockedZoneImmediate([]);
      setDiscardImmediate([]);
      setTemporaryCardListImmediate([]);
      
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
        } else {
          blockedToDiscard.push(blockedCard);
        }
      });

      setPlayAreaImmediate(cardsToKeep);
      setBlockedZoneImmediate(blockedToKeep);
      setDiscardImmediate((d) => [...d, ...cardsToDiscard, ...blockedToDiscard]);
      
      const allDiscarded = [...cardsToDiscard, ...blockedToDiscard];
      if (allDiscarded.length > 0) {
        await triggerOnCardDiscarded(allDiscarded);
      }
      
      setTemporaryCardListImmediate([]);
    }
  };

  const handleEndBaseGame = async () => {
    await discardEndTurn(true);
    setShouldComputeFame(true);
  };

  useEffect(() => {
    if (shouldComputeFame && deck.length > 0) {
      // Compute total fame from deck
      let totalFame = 0;

      const cardList = [...deck, ...permanentZone];
      
      for (const card of cardList) {
        const currentSideIndex = card.currentSide - 1;
        const resourceMaps = card.resources[currentSideIndex] || [];
        
        // Get max fame from resource maps for current side
        const maxFameFromResources = resourceMaps.reduce(
          (max, res) => Math.max(max, res.fame || 0),
          0
        );
        
        // Check if card has special fame calculation
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
              t,
            };
            
            const specialFameValue = fameValueEffect.execute(context);
            totalFame += specialFameValue;
          }
          totalFame += maxFameFromResources;
      }
      
      // Update fame resource
      setResources(prev => ({ ...prev, fame: totalFame }));
      setHasEndedBaseGame(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, shouldComputeFame]);
  
  const mill = (
    nbCards: number
  ): void => {
    const discarded = deck.slice(0, nbCards);
    setDiscard((p) => [...p, ...discarded.map(cloneGameCard)]);
    setDeck((d) => d.slice(nbCards));
  }

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
        filteredCards = permanentZone.filter(filter); // Celui-ci n'a pas de ref encore
        break;
      case t('campaign'):
        filteredCards = campaignDeck.filter(filter);
        break;
    }
    return filteredCards;
  };

  const selectResourceChoice = (options: Array<Partial<ResourceMap>>): Promise<Partial<ResourceMap> | null> => {
    return new Promise((resolve) => {
      setResourceChoicePopup({ options, resolve });
    });
  };

  const selectCardsFromZone = (
    filter: (card: GameCard) => boolean,
    zone: string,
    effectDescription: string,
    requiredCount: number,
    triggeringCard?: GameCard,
    optionalCount?: number,
  ): Promise<GameCard[]> => {
    return new Promise((resolve) => {
      const filteredCards = filterZone(zone, filter);
      if (filteredCards.length === 0) {
        resolve([]);
        return;
      }
      let searchType = "";
      const typeKeywords = ['person', 'building', 'terrain', 'knight', 'dame', 'maritime', 'ship', 'event'];
      const translatedPattern = typeKeywords.map(key => t(key as TranslationKeys)).join('|');
      const typeMatch = effectDescription.match(new RegExp(`\\b(${translatedPattern})\\b`, 'i'));
      if (typeMatch) {
        searchType = typeMatch[1];
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
        resolve,
      });
    });
  };

  const selectCardsFromArray = (
    cards: GameCard[],
    zone: string,
    effectDescription: string,
    requiredCount: number
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
        resolve
      });
    });
  };

  const discoverCard = (
    filter: (card: GameCard) => boolean,
    effectDescription: string,
    requiredCount: number,
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
        resolve: (selectedCards: GameCard[] | null) => {
          if (selectedCards) {
            for(const card of selectedCards) {
              setCampaignDeck(prev => prev.filter(c => c.id !== card.id));
              if(zone) {
                if(zone === t('deck')) {
                  setDeck(prev => [...prev, cloneGameCard(card)]);
                }
              }
              else {
                setDiscard(prev => [...prev, cloneGameCard(card)]);
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
    prodBoost: Partial<ResourceMap> | null
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
      filter: (card: GameCard, t?: (key: TranslationKeys) => string) => boolean;
      zones: string[] | ((t: (key: TranslationKeys) => string) => string[]);
      bonus: Partial<ResourceMap>;
      source: GameCard;
    }> = [];
    
    for (const activeCard of playArea) {
      const effects = getCardEffects(activeCard.id, activeCard.currentSide);
      for (const effect of effects) {
        if (effect.timing === "modifyProduction" && effect.productionModifier) {
          modifiers.push({
            ...effect.productionModifier,
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
              ...effect.productionModifier,
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
      
      if (resolvedZones.includes(zone) && modifier.filter(card, t)) {
        Object.entries(modifier.bonus).forEach(([key, value]) => {
          const resourceKey = key as keyof ResourceMap;
          bonus[resourceKey] = (bonus[resourceKey] || 0) + (value as number);
        });
      }
    }
    
    return bonus;
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
    
    if (zone === t('deck')) {
      setDeck(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " - " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === t('playArea')) {
      setPlayArea(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " - " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === t('discard')) {
      setDiscard(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " - " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === t('permanentZone')) {
      setPermanentZone(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " - " + effectText;
          return updated;
        }
        return c;
      }));
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

  function selectUpgradeCost(card: GameCard, callback: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void) {
    setUpgradeCostPopupCard(card);
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

  const addDiscoverableCard = (cardId: number, force?: boolean) => {
    if (!force) {
      force = false;
    }
    
    setAvailableDiscoverableCards(prev => {
      if (prev.includes(cardId)) return prev;
      
      const card = campaignDeck.find(c => c.id === cardId);
      if (!card) return prev;
      
      if (!force && prev.length >= 2) return prev;
      
      if (prev.length === 0) {
        const firstCard = campaignDeck.find(c => c.id === prev[0]);
        if (firstCard && firstCard.name.some(n => n === "STOP !")) {
          return prev;
        }
      }
      
      return [...prev, cardId].sort((a, b) => a - b);
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
    if (firstCard.name.some(n => n === "STOP !")) {
      setAvailableDiscoverableCards([firstCard.id]);
      return;
    }
    const discoverableCards = allDiscoverable
      .slice(0, 2)
      .map(card => card.id);
    
    setAvailableDiscoverableCards(discoverableCards);
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
      t,
    };

    if (typeof effectIndex === "number" && effectIndex >= 0 && effectIndex < effects.length) {
      const eff = effects[effectIndex];
      
      const effectText = card.effects[card.currentSide - 1];
      const { effects: parsedEffects } = parseEffects(effectText);
      
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
        dropToDiscard({ id: card.id, fromZone: zone });
      }
      return;
    }

    const matchingEffects = effects.filter(effect => effect.timing === timing);
    
    if (matchingEffects.length === 0) {
      return; // Pas d'effet à exécuter, pas d'animation
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
        dropToDiscard({ id: card.id, fromZone: zone });
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

  const handleDropToZone = (toZone: string) => async (payload: DropPayload) => {
    const { id, fromZone } = payload;
    if (fromZone === toZone) return;

    if (toZone === t('playArea') && checkPlayRestrictions()) {
      return;
    }
    if (fetchCardsInZone((c) => c.id === id, fromZone)[0].GetType(t).includes(t('scroll')) && toZone !== t('destroy')) {
      return;
    }

    const removeById = (arr: GameCard[], removeId: number) =>
      arr.filter((c) => c.id !== removeId);

    const sourceCard = findCardInAllZones(id);
    if (!sourceCard) return;

    const toAdd: GameCard = sourceCard;

    if (fromZone === t('deck')) setDeck((d) => removeById(d, id));
    if (fromZone === t('playArea')) setPlayAreaImmediate((p) => removeById(p, id));
    if (fromZone === t('discard')) setDiscardImmediate((f) => removeById(f, id));
    if (fromZone === t('campaign')) {
      setCampaignDeck((g) => removeById(g, id));
      setAvailableDiscoverableCards(prev => prev.filter(cardId => cardId !== id));
    }
    if (fromZone === t('blocked')) setBlockedZone((b) => removeById(b, id));
    if (fromZone === t('permanentZone')) setPermanentZone((pe) => removeById(pe, id));

    if (fetchCardsInZone((c) => c.id === id, fromZone)[0].GetType(t).includes(t('permanent'))) {
      setPermanentZone((pe) => [...pe, toAdd]);
      return;
    }

    if (toZone === t('deck')) {
      setDeck((d) => [cloneGameCard(toAdd), ...d]);
    }
    if (toZone === t('discard')) {
      setDiscard((f) => [...f, toAdd]);
    }
    if (toZone === t('blocked')) {
      setBlockedZone((b) => [...b, toAdd]);
    }
    if (toZone === t('permanentZone')) {
      setPermanentZone((pe) => [...pe, toAdd]);
    }
    if (toZone === t('playArea')) {
      setPlayArea((p) => [...p, toAdd]);

      setResources(() => emptyResource);

      handleExecuteCardEffect(toAdd, t('playArea'), "played");
      for (const card of playArea) {
        handleExecuteCardEffect(card, t('playArea'), "otherCardPlayed", [toAdd]);
      }
    }

    if (toZone === t('discard') && (fromZone === t('playArea') || fromZone === t('blocked'))) {
      await triggerOnCardDiscarded(fetchCardsInZone((card) => card.id === id, fromZone));
    }

    if ((toZone !== t('playArea') && toZone !== t('permanentZone')) && (fromZone === t('playArea') || fromZone === t('permanentZone'))) {
      const blockedIds = blockMap.get(id);
      if (blockedIds) {
        setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
        setPlayArea(prev => [...prev, ...blockedZone.filter(c => blockedIds.includes(c.id))]);
        updateBlocks(id, null);
      }
    }
  };

  const dropToDeck = handleDropToZone(t('deck'));
  const dropToPlayArea = handleDropToZone(t('playArea'));
  const dropToDiscard = handleDropToZone(t('discard'));
  const dropToCampaign = handleDropToZone(t('campaign'));
  const dropToDestroy = handleDropToZone(t('destroy'));
  const dropToBlocked = handleDropToZone(t('blocked'));
  const dropToPermanent = handleDropToZone(t('permanentZone'));

  // -------------------
  // End Round / Shuffle
  // -------------------
  const handleEndRound = async () => {
    await discardEndTurn(true);

    await resolveEndRoundEffects();

    setShowEndRound(true);
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

  // const handleShuffle15Rand = () => {
  //   if (discard.length === 0) return;
    
  //   const randomCards: GameCard[] = [];
  //   const availableCards = [...discard];
    
  //   const numCardsToTake = Math.min(15, availableCards.length);
    
  //   for (let i = 0; i < numCardsToTake; i++) {
  //     const randomIndex = Math.floor(Math.random() * availableCards.length);
  //     randomCards.push(availableCards[randomIndex]);
  //     availableCards.splice(randomIndex, 1);
  //   }
    
  //   setDeck(prev => [...prev, ...randomCards]);
  //   setDiscard(prev => prev.filter(card => !randomCards.includes(card)));
  // };

  // const handleTopDiscardToBottom = () => {
  //   if (discard.length === 0) return;

  //   const card = discard[discard.length - 1];

  //   setDeck(prev => [...prev, card]);
  //   discard.pop();
  // }

  const getCardZone = (id: number): string => {
    if (deck.some(c => c.id === id)) return t('deck');
    if (playArea.some(c => c.id === id)) return t('playArea');
    if (discard.some(c => c.id === id)) return t('discard');
    if (campaignDeck.some(c => c.id === id)) return t('campaign');
    if (blockedZone.some(c => c.id === id)) return t('blocked');
    if (permanentZone.some(c => c.id === id)) return t('permanentZone');
    return "Deleted"; // TODO : May need to change
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
      return deck.filter(filter);
    } else if (zone === t('playArea')) {
      return playArea.filter(filter);
    } else if (zone === t('discard')) {
      return discard.filter(filter);
    } else if (zone === t('campaign')) {
      return campaignDeck.filter(filter);
    } else if (zone === t('blocked')) {
      return blockedZone.filter(filter);
    } else if (zone === t('permanentZone')) {
      return permanentZone.filter(filter);
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
    await upgradeCard(upgraded, upg.nextSide);

    if (zone === t('playArea')) {
      // Remove from play area
      setPlayArea((prev) => prev.filter((c) => c.id !== card.id));
      // Add upgraded card to discard
      setDiscard((prev) => [...prev, upgraded]);
    } else {
      // Default behavior: just replace in the same zone
      replaceCardInZone(zone, card.id, upgraded);
    }

    if (blockedIds && cardsToUnblock.length > 0) {
      setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
      setPlayArea(prev => [...prev, ...cardsToUnblock]);
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
            t,
          };
          
          if (await effect.execute(context)) {
            dropToDiscard({id: card.id, fromZone: t('playArea')});
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
    if (!name) return alert(t('enterKingdomName'));
    const payload = {
      deck,
      campaignDeck,
      playArea,
      discard,
      blockedZone,
      permanentZone,
      resources,
      timestamp: Date.now(),
    };
    try {
      localStorage.setItem(`citysave:${name}`, JSON.stringify(payload));
      alert(`${t('saveSuccess')} '${name}'.`);
    } catch (e) {
      console.error(e);
      alert(t('failedToSave') + e);
    }
  };

  // Modifier la fonction loadGame :
  const loadGame = (name: string) => {
    if (!name) return alert(t('enterKingdomName'));
    try {
      const raw = localStorage.getItem(`citysave:${name}`);
      if (!raw) return alert(`${t('noSaveFound')} '${name}'.`);
      const parsed = JSON.parse(raw);
      
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
      setResources(parsed.resources || { ...emptyResource });
      setShowSettings(false);
      alert(`${t('loadSuccess')} '${name}'.`);
    } catch (e) {
      console.error(e);
      alert(t('failedToLoad') + e);
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
    if (!confirm(t('resetWarning'))) return;
    const answer = prompt(t('resetConfirm'));
    if (answer !== "YES" && answer !== "OUI") return;

    setDeck(shuffle(allCards.filter((c) => c.id >= 1 && c.id <= 10).map((c) => cloneGameCard(c))));
    setCampaignDeck(shuffle(allCards.filter((c) => c.id > 10).map((c) => cloneGameCard(c))));
    setPlayArea([]);
    setDiscard([]);
    setBlockedZone([]);
    setPermanentZone([]);
    setResources({ ...emptyResource });
    setShowSettings(false);
  };

  const [language] = useState<Language>(() => {
    const saved = localStorage.getItem('kingdom-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('kingdom-language', language);
  }, [language]);

  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.minHeight = "100vh";
    
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.minHeight = "";
    };
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 space-y-4 min-h-screen">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            {/* Deck */}
            <div className="min-w-[200px]">
              <Zone
                name={t('deck')}
                cards={deck}
                onDrop={(p) => dropToDeck(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                showAll={false}
                onTapAction={handleTapAction}
              />
              <Button disabled={deck.length === 0} onClick={() => setShowDeck(true)}className="mt-2">{t('seeDeck')}</Button>
            </div>

            {/* Discard */}
            <div className="min-w-[200px]">
              <Zone
                name={t('discard')}
                cards={discard}
                onDrop={(p) => dropToDiscard(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                showAll={false}
                onTapAction={handleTapAction}
              />
              <Button disabled={discard.length === 0} onClick={() => setShowDiscard(true)}className="mt-2">{t('seeDiscard')}</Button>
            </div>

            {/* Permanent zone */}
            <div className="min-w-[750px]">
              <Zone
                name={t('permanentZone')}
                cards={permanentZone}
                onDrop={(p) => dropToPermanent(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                onTapAction={handleTapAction}
                onCardUpdate={handleCardUpdate}
                onExecuteCardEffect={(card, zone, timing, effectId) => handleExecuteCardEffect(card, zone, timing, undefined, effectId)}
                interactable={true}
                highlightedCardId={highlightedCardId}
              />
            </div>

            {/* Destroy */}
            <div className="min-w-[200px]">
              <Zone
                name={t('destroy')}
                cards={[]}
                onDrop={(p) => dropToDestroy(p)}
                onRightClick={() => {}}
                onTapAction={undefined}
                onCardUpdate={undefined}
              />
            </div>

            {/* Campaign Deck */}
            <div className="w-[200px]">
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

        {/* Play Area */}
        <div className="flex flex-col lg:flex-row gap-4 min-w-[1400px]">
          <div className="flex-1 min-w-[1200px]">
            <Zone
              name={t('playArea')}
              cards={playArea}
              onDrop={(p) => dropToPlayArea(p)}
              onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
              onTapAction={handleTapAction}
              onCardUpdate={handleCardUpdate}
              onUpgrade={handleUpgrade}
              onGainResources={handleGainResources}
              onExecuteCardEffect={(card, zone, timing, effectIndex) => handleExecuteCardEffect(card, zone, timing, undefined, effectIndex)}
              gatherProductionBonus={gatherProductionBonus}
              highlightedCardId={highlightedCardId}
            />
          </div>

          {/* Blocked zone */}
          <div className="w-full lg:w-120 min-w-[120px]">
            <Zone
              name={t('blocked')}
              cards={blockedZone}
              onDrop={(p) => dropToBlocked(p)}
              onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
              onTapAction={handleTapAction}
              onCardUpdate={handleCardUpdate}
              onUpgrade={handleUpgrade}
              onGainResources={handleGainResources}
              interactable={true}
            />
          </div>
        </div>

        {/* Action Buttons (with Shuffle next to End Round) */}
        <div className="space-x-2">
          <Button onClick={drawNewTurn} disabled={deck.length === 0}>{t('newTurn')}</Button>
          <Button onClick={() => discardEndTurn(false)} disabled={deck.length === 0 || turnEndFlag}>{t('pass')}</Button>
          <Button onClick={advance} disabled={turnEndFlag || isPlayBlocked || deck.length === 0}>{t('advance')}</Button>
          {/* Conditionnal controls */}
          <Button disabled={deck.length > 0} className="bg-red-600 hover:bg-red-500 text-white" onClick={handleEndRound}>{t('endRound')}</Button>
          {/* Manual actions */}
          <Button onClick={shuffleDeck} className="bg-blue-600 hover:bg-blue-500 text-white" hidden={true}>{"Shuffle Deck"}</Button>
          {/* Hidden controls */}
          {/* <Button hidden={campaignDeck.some(card => card.id === 95) && campaignDeck.some(card => card.id === 110)} className="bg-green-600 hover:bg-green-500 text-white" onClick={handleTopDiscardToBottom}>Top Discard to Bottom Deck</Button> */}
          {/* <Button hidden={campaignDeck.some(card => card.id === 98)} className="bg-green-600 hover:bg-green-500 text-white" onClick={handleShuffle15Rand}>Shuffle 15 Rand</Button> */}
          <Button hidden={hasEndedBaseGame || campaignDeck.some(card => card.id === 70)} disabled={deck.length > 0} className="bg-red-600 hover:bg-red-500 text-white" onClick={handleEndBaseGame}>{t('endGame')}</Button>
        </div>

        {/* Resource Pool */}
        <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border-2 border-gray-200 max-w-[700px]">
          <div className="grid grid-cols-7 gap-2 max-w-[1400px]">
            {RESOURCE_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-1 p-1 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-200">
                <img src={resourceIconPath(key)} alt={key} title={key} className="w-5 h-5 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="w-10 text-center border rounded text-xs py-0.5"
                    value={resources[key]}
                    onChange={(e) => setResources((r) => ({ ...r, [key]: parseInt(e.target.value || "0", 10) || 0 }))}
                    disabled={key === "fame"}
                  />
                </div>
              </div>
            ))}
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

                <Button onClick={() => setShowSettings(false)}>{t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Guide Modal */}
        {showAbout && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-2xl">
              <h2 className="font-bold">About</h2>
              <div className="text-sm">
                <p className="font-bold">Original Board Game:</p><br/>
                <p className="font-bold">Kingdom Legacy</p><br/>
                <p>Game Design: Jonathan Fryxelius</p>
                <p>Assistant Design: FryxGames</p>
                <p>Art Director: Jonathan Fryxelius</p>
                <p>Designer Thanks: Benjamin, Daniel, Abram, Thomas, Kezia, and Stina, for eagerly testing all new ideas through all iterations.</p><br/>
                <p>Special thanks to the ultimate King; may your Kingdom come!</p><br/>
                <p className="font-bold">Publisher:</p>
                <p>Intrafin Toys & Games Distribution</p>
                <p>(Official distributor of Kingdom Legacy and other titles across Europe.)</p><br/>
                <p className="font-bold">Digital Fan Adaptation:</p>
                <p>This digital version of Kingdom Legacy is a non-commercial fan project, created with admiration for the original design. It was made to make the game easier to learn, share, and play online.</p>
                <p>Digitalization Team:</p>
                <p>Project Lead / Developer: Keleonix</p>
                <p>Digital Art / Assets Adaptation: Freepik, Smashicons</p>
                <p>Playtesters / Feedback: Keleonix</p><br/>
                <p className="font-bold">Disclaimer:</p>
                <p>This is an unofficial fan project and is not affiliated with, endorsed by, or sponsored by FryxGames, Intrafin, or Jonathan Fryxelius. All rights to the original game, rules, and artwork remain with their respective copyright holders.</p>
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
              <h2 className="font-bold">Guide & Controls</h2>
              <div className="text-sm">
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://fryxgames.se/wp-content/uploads/2023/12/FK-Rules-Small.pdf"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  <p>Before reading the controls, please read the full rules.</p>
                </a>
                <ul className="list-disc pl-5">
                  <li>Tap a card to open the editor where you can:</li>
                  <ul className="list-disc pl-5">
                    <li>Edit resources/options per side</li>
                    <li>Add / remove checkboxes for each side; each checkbox can contain '*' or multiple resource icons (comma-separated), or be blank</li>
                    <li>Choose which checkbox index is the "selected" one (used for tap action)</li>
                  </ul>
                  <li>Tap a card's checkbox to use check it.</li>
                  <li>Tap a card's upgrade to upgrade it.</li>
                  <li>Drag cards between zones.</li>
                  <li>Use Settings:</li>
                  <ul className="list-disc pl-5">
                    <li>Reset to fully reset the game (extra confirmation required).</li>
                    <li>Save your current Kingdom's progress.</li>
                    <li>Continue a saved Kingdom's game.</li>
                  </ul>
                </ul>
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
                  onTapAction={handleTapAction}
                  onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                />
                <Zone name={t('discard')} cards={discard.slice(-1)} onDrop={(p) => {dropToDiscard(p); setCampaignPreview(null);}} onTapAction={handleTapAction} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} showAll={true} />
                <Zone name={t('destroy')} cards={[]} onDrop={(p) => {dropToDestroy(p); setCampaignPreview(null);}} onRightClick={() => {}} />
              </div>
              <Button onClick={() => setCampaignPreview(null)}>{t('close')}</Button>
            </div>
          </div>
        )}

        {/* Full Discard Modal */}
        {showDiscard && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-hidden flex flex-col">
              <h2 className="font-bold text-xl">{t('discard')}</h2>
              <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {discard.map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone={t('discard')}
                        onRightClick={(x, zone) => setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })}
                        onTapAction={handleTapAction}
                      />
                    ))}
                  </div>
                </div>
                <div className="lg:min-w-[220px]">
                  <Zone name={t('playArea')} cards={playArea.slice(-1)} onDrop={(p) => dropToPlayArea(p)} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} onTapAction={handleTapAction} />
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
                      } else {
                        handleTapAction(card, t('campaign'));
                      }
                    }}
                    onRightClick={handleTapAction}
                    onExecuteCardEffect={async (card, zone) => {
                      if (card.GetType(t) === "Parchemin") {
                        return handleExecuteCardEffect(card, zone, "onClick");
                      }
                      return Promise.resolve();
                    }}
                  />
                </div>

                <div className="flex-1 flex-col lg:flex-row gap-4 max-w-[230px]">
                  <p className="font-bold">{t('deck')}</p>
                  <Zone name={t('deck')} cards={deck.slice(0, 1)} onDrop={(p) => dropToDeck(p)} onTapAction={handleTapAction} onRightClick={handleTapAction} />
                  {<Button onClick={() => setShowDeck(true)}>{t('seeDeck')}</Button>}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  onClick={() => {
                    setShowEndRound(false);
                    shuffleDeck();
                    refreshDiscoverableCards();
                  }}
                  disabled={campaignDeck.filter(card => availableDiscoverableCards.includes(card.id)).length !== 0}
                >
                {t('close')}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Full Deck Modal */}
        {showDeck && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-hidden flex flex-col">
              <h2 className="font-bold text-xl">{t('deck')}</h2>
              <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {[...deck].sort((a, b) => a.id - b.id).map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone={t('deck')}
                        onRightClick={(x, zone) => setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })}
                        onTapAction={handleTapAction}
                      />
                    ))}
                  </div>
                </div>
                <Zone name={t('destroy')} cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowDeck(false)}>{t('close')}</Button>
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
          requiredCount={cardSelectionPopup.requiredCount}
          optionalCount={cardSelectionPopup.optionalCount}
          onConfirm={(selectedCards) => {
            cardSelectionPopup.resolve(selectedCards);
            setCardSelectionPopup(null);
          }}
          onCancel={() => {
            cardSelectionPopup.resolve([]);
            setCardSelectionPopup(null);
          }}
          zone={cardSelectionPopup.zone}
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
          card={upgradeCostPopupCard}
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
      </div>
    </DndProvider>
  );
}
