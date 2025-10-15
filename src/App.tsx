import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { emptyResource, GameCard, RESOURCE_KEYS, EFFECT_KEYWORDS, TYPE_COLORS, type ResourceMap, type PopupPayload, type DropPayload, type Checkbox, type Upgrade, type EffectTiming } from "./types";
import { allCards } from "./cards";
import { getCardEffects, type GameContext, type CardEffect, cardEffectsRegistry, getCardFameValue, getCardUpgradeAdditionalCost, getCardSelectionValue } from "./cardEffects";

// deep-clone preserving prototype/methods
function cloneGameCard(src: GameCard): GameCard {
  const out = new GameCard({});
  out.id = src.id;
  out.name = src.name;
  // Default to 1 (Front Up) if currentSide is not set
  out.currentSide = src.currentSide || 1;
  out.type = [...src.type];
  out.choice = src.choice;
  out.enemy = [...src.enemy];

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
function sideLabel(side: number) {
  return side === 1
    ? "Front Up"
    : side === 2
    ? "Front Down"
    : side === 3
    ? "Back Up"
    : "Back Down";
}

// -------------------
// Helper to render background card color
// -------------------
function getBackgroundStyle(card: GameCard, sideIdx: number) {
  const rawType = card.type?.[sideIdx];
  if (!rawType) return {};

  let types: string[] = [];

  if (Array.isArray(rawType)) {
    types = rawType.flatMap((t) => t.split(" - ").map((s: string) => s.trim()));
  } else if (typeof rawType === "string") {
    types = rawType.split(" - ").map((s: string) => s.trim());
  }
  types = types.filter((t) => t !== "Permanente");

  const colors = types.map((t) => TYPE_COLORS[t] || "#ffffff");

  if (card.enemy[card.currentSide - 1]) {
    colors.push(TYPE_COLORS["Ennemi"]);
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
      // Format: "gold x5"
      parsedResources.push({ name: match[1], count: parseInt(match[2]) });
    }
    else if (RESOURCE_KEYS.includes(resource as keyof ResourceMap)) {
      // Format: "gold" (default count = 1)
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
  interactable = true,
}: {
  card: GameCard;
  fromZone: string;
  onRightClick: (card: GameCard, zone: string) => void;
  onTapAction?: (card: GameCard, zone: string) => void;
  onUpgrade?: (card: GameCard, upgrade: Upgrade, zone: string) => void;
  onGainResources?: (card: GameCard, resources: Partial<ResourceMap>, zone: string) => void;
  onCardUpdate?: (updatedCard: GameCard, zone: string) => void;
  onExecuteCardEffect?: (card: GameCard, zone: string, timing: EffectTiming, effectId: number) => Promise<void>;
  interactable?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ top: 0, left: 0 });
  const touchTimeout = useRef<string | number | NodeJS.Timeout | undefined>(undefined);

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

  const resOptions = card.GetResources();
  const effect = card.GetEffect();
  const currentUpgrades = card.GetUpgrades();
  const type = card.GetType();
  const name = card.GetName();

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
        style={getBackgroundStyle(card, currentSideIdx)}
        className={`w-49 h-70 m-2 flex flex-col items-center justify-between border 
          ${!interactable ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
        <CardContent className="text-center p-2 overflow-hidden">
          {card.GetType().includes("Permanente") && <img src={"effects/permanent.png"} alt={"Permanent"} title={"Permanent"} className="w-49 h-2" />}
          {card.choice && (card.currentSide == 1 || card.currentSide == 3) && <img src={"effects/choice.png"} alt={"Choice"} title={"Choice"} className="w-49 h-2" />}
          <div>
            <p className="font-bold text-sm line-clamp-2">
              {card.id >= 0 ? card.id : ""} {" | "} {name} {" | "} {type}
            </p>
          </div>

          {/* Normal (in-play) resources */}
          <div className="mt-2 flex flex-wrap justify-center gap-2 items-center">
            {resOptions.map((opt, idx) => {
              const icons = RESOURCE_KEYS.flatMap((k) => {
                const count = opt[k] ?? 0;
                if (!count) return [];
                return [
                    <div key={`${idx}-${k}`} className="flex items-center gap-1">
                      <img src={resourceIconPath(k)} alt={k} title={`${k} x${count}`} className="w-4 h-4" />
                      {count !== 1 && <span className="text-xs">x{count}</span>}
                    </div>
                ];
              });

              // Ne pas afficher le bouton s'il n'y a pas de ressources
              if (icons.length === 0) {
                return null;
              }

              return (
                <div key={idx} className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!interactable || ! onGainResources) return;
                      onGainResources(card, opt, fromZone);
                    }}
                    className="text-[10px] px-2 py-1 border rounded bg-white flex items-center gap-1 hover:bg-gray-100 transition"
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
                  className="text-[10px] px-2 py-1 border rounded bg-white flex items-center gap-1 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-1">
                    {upg.cost ? (
                      Object.entries(upg.cost).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1 text-[11px]">
                          <img src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-3 h-3" />x{v}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px]">No cost</span>
                    )}
                    {upg.otherCost && (
                      <span className="text-[11px] italic">{upg.otherCost}</span>
                    )}
                  </div>
                  <div className="text-[11px]">{"→ "}{sideLabel(upg.nextSide)}</div>
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
                  title={box.content || "Empty checkbox"}
                >
                  {renderCheckboxContent(box.content)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- PREVIEW POPUP --- */}
      {showPreview && (
        <div 
          ref={previewRef}
          className="fixed z-50 w-64 p-2 border rounded bg-white shadow-lg pointer-events-none"
          style={{
            top: `${previewPosition.top}px`,
            left: `${previewPosition.left}px`
          }}
        >
          <div className="font-bold">{card.id}</div>

          {/* Names/Types */}
          <div>
            <div className="text-sm">{`${card.name[0]}: ${card.type[0]} | ${card.name[1]}: ${card.type[1]}`}</div>
            <div className="text-sm">{`${card.name[2]}: ${card.type[2]} | ${card.name[3]}: ${card.type[3]}`}</div>
          </div>
          <div className="my-1">-----</div>

          {/* Resources per side */}
          <div className="mt-2 text-xs flex flex-wrap justify-center items-center">
            {Array.isArray(card.resources) && card.resources.length > 0 ? (
              card.resources.map((sideOpts: Record<string, number>[], sideIdx: number) => (
                <span key={`preview-side-${sideIdx}`} className="inline-flex items-center mr-2">
                  {renderSideOptions(sideOpts, sideIdx)}
                  {sideIdx < card.resources.length - 1 && <span className="mx-1">|</span>}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400"></span>
            )}
          </div>

          {/* Effects per side - WITHOUT line-clamp */}
          <div className="my-1">-----</div>
          {card.effects?.map((eff, idx) => {
            const { before, effects } = parseEffects(eff);
            return (
              <div key={idx}>
                {idx > 0 && <div className="my-1">-----</div>}
                <div className="text-xs mt-1">
                  {/* Display full before text without truncation */}
                  {before && <div className="text-xs mb-1">{renderEffectText(before)}</div>}
                  {/* Display effect buttons/blocks */}
                  {effects.map((effObj, effIdx) => (
                    <div key={effIdx} className="text-[9px] px-1 py-0.5 border rounded bg-white mb-1">
                      {renderEffectText(effObj.text)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
  showAll = true,
  interactable = true,
  onTapAction,
}: {
  name: string;
  cards: GameCard[];
  onDrop: (payload: { id: number; fromZone: string }) => void;
  onRightClick: (c: GameCard, zone: string) => void;
  onUpgrade?: (card: GameCard, upgrade: Upgrade, zone: string) => void;
  onGainResources?: (card: GameCard, resources: Partial<ResourceMap>, zone: string) => void;
  onCardUpdate?: (updatedCard: GameCard, zone: string) => void;
  onExecuteCardEffect?: (card: GameCard, zone: string, timing: EffectTiming, effectId: number) => Promise<void>;
  showAll?: boolean;
  interactable?: boolean;
  onTapAction?: (card: GameCard, zone: string) => void;
}) {
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

if (name === "Play Area" || name === "Blocked") {
  // Mobile-friendly flex row with wrap
  containerClass = "flex flex-wrap gap-2 justify-start items-start";
} else if (name === "Permanent") {
  // Permanent zone: 3 cards per row grid layout
  containerClass = "grid gap-2";
  gridTemplate = "repeat(3, minmax(200px, 1fr))";
} else {
  // Default: responsive grid for mobile
  const cols = Math.min(6, displayCards.length || 1);
  gridTemplate = `repeat(${cols}, minmax(200px, 1fr))`;
}

  return (
    <div ref={ref} className="p-2 border rounded min-h-[130px]" style={{background: "linear-gradient(to top left, #ebebebff, #ecececff)"}}>
      <h2 className="text-lg font-bold">{name}</h2>
      <div
        className={containerClass}
        style={gridTemplate ? { gridTemplateColumns: gridTemplate, alignItems: "start" } : {}}
      >
        {displayCards.length > 0 ? (
          displayCards.map((c) => (
            <CardView
              key={`${name}-${c.id}-${c.currentSide}`}
              card={c}
              fromZone={name}
              onRightClick={onRightClick}
              interactable={interactable}
              onTapAction={onTapAction}
              onUpgrade={onUpgrade}
              onGainResources={onGainResources}
              onCardUpdate={onCardUpdate}
              onExecuteCardEffect={onExecuteCardEffect}
            />
          ))
        ) : (
          <Card className="w-49 h-70 m-2 flex items-center justify-center border bg-gray-100">
            <CardContent className="text-center text-gray-400">Empty</CardContent>
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
        <h2 className="font-bold">{localCard.GetName()}</h2>

        {/* Editeur de noms pour chaque face */}
        <div>
          <h3 className="font-bold">Card Names</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((sideNum) => (
              <div key={sideNum} className="flex flex-col gap-1">
                <label className="text-sm font-medium">
                  {sideNum <= 2 ? 'Front' : 'Back'} - {sideNum % 2 === 1 ? 'Up' : 'Down'}
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
            <h3 className="font-bold flex-1 text-left">Front</h3>
            <h3 className="font-bold flex-1 text-left-center">Back</h3>
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
                Up
              </Button>
              <Button
                disabled={!localCard.name[1] || localCard.name[1].trim() === ""}
                variant={localCard.currentSide === 2 ? "default" : "secondary"}
                onClick={() => setSide(2)}
              >
                Down
              </Button>
            </div>

            {/* Back buttons */}
            <div className="flex gap-2 flex-1 justify-left-center">
              <Button
                disabled={!localCard.name[2] || localCard.name[2].trim() === ""}
                variant={localCard.currentSide === 3 ? "default" : "secondary"}
                onClick={() => setSide(3)}
              >
                Up
              </Button>
              <Button
                disabled={!localCard.name[3] || localCard.name[3].trim() === ""}
                variant={localCard.currentSide === 4 ? "default" : "secondary"}
                onClick={() => setSide(4)}
              >
                Down
              </Button>
            </div>
          </div>
        </div>

        {/* Effects section */}
        <div>
          <h3 className="font-bold">Effect (for {sideLabel(localCard.currentSide)})</h3>
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={3}
            value={localCard.effects[localCard.currentSide - 1] || ""}
            onChange={(e) => {
              localCard.effects[localCard.currentSide - 1] = e.target.value;
              setLocalCard(cloneGameCard(localCard));
            }}
            placeholder="Enter effect text (use 'resources/gold' or 'effects/fire' for icons)"
          />
        </div>

        {/* Editable Resources: multiple options per side, show as list, allow add/remove */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Resources (options for {sideLabel(localCard.currentSide)})</h3>
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
            <h3 className="font-bold">Checkboxes (for {sideLabel(localCard.currentSide)})</h3>
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
                  placeholder="'*' or comma-separated resource keys (e.g. gold,silver)"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Upgrades for current side */}
        <div>
          <h3 className="font-bold">Upgrades ({sideLabel(localCard.currentSide)})</h3>
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
                    {sideLabel(upg.nextSide)}: {localCard.name[upg.nextSide - 1] || 'Unnamed'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-2 justify-end">
          <Button onClick={close}>Close</Button>
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
  onConfirm,
  onCancel,
}: {
  cards: GameCard[];
  effectDescription: string;
  zone: string;
  requiredCount: number;
  optionalCount?: number;
  searchType?: string;
  onConfirm: (selectedCards: GameCard[]) => void;
  onCancel: () => void;
}) {
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

  // Helper functions from CardView for preview
  function resourceIconPath(key: keyof ResourceMap) {
    return `/resources/${String(key).toLowerCase()}.png`;
  }

  function renderSideOptions(sideOpts: Record<string, number>[] | undefined, sideIdx: number) {
    if (!Array.isArray(sideOpts) || sideOpts.length === 0) {
      return <span className="text-xs text-gray-400"></span>;
    }
    return (
      <>
        {sideOpts.map((opt, optIdx) => (
          <span key={`side-${sideIdx}-opt-${optIdx}`} className="inline-flex items-center">
            {RESOURCE_KEYS.flatMap((k) => {
              const count = opt[k] ?? 0;
              if (!count) return [];
              return (
                <span key={`${sideIdx}-${optIdx}-${k}`} className="inline-flex items-center gap-1 mr-1">
                  <img src={resourceIconPath(k)} alt={k} className="w-3 h-3" />
                  <span className="text-xs">x{count}</span>
                </span>
              );
            })}
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

  function parseEffects(raw: string) {
    if (!raw) return { before: "", effects: [] as string[] };
    const pattern = new RegExp(`(${EFFECT_KEYWORDS.join("|")})`, "g");
    let match: RegExpExecArray | null;
    const indices: number[] = [];
    while ((match = pattern.exec(raw)) !== null) {
      indices.push(match.index);
    }
    if (indices.length === 0) {
      return { before: raw.trim(), effects: [] };
    }
    const before = raw.slice(0, indices[0]).trim();
    const effects: string[] = [];
    for (let i = 0; i < indices.length; i++) {
      const start = indices[i];
      const end = i < indices.length - 1 ? indices[i + 1] : raw.length;
      const chunk = raw.slice(start, end).trim();
      const stop = chunk.search(/[.)](?!.*[.)])/);
      if (stop !== -1) {
        effects.push(chunk.slice(0, stop + 1).trim());
      } else {
        effects.push(chunk);
      }
    }
    return { before, effects };
  }

  function renderEffect(raw: string) {
    const { before, effects } = parseEffects(raw);
    return (
      <div className="flex flex-col gap-1">
        {before && <div className="text-sm">{renderEffectText(before)}</div>}
        {effects.map((eff, idx) => (
          <div key={idx} className="text-[10px] px-2 py-1 border rounded bg-white">
            {renderEffectText(eff)}
          </div>
        ))}
      </div>
    );
  }

  const displayMessage = (() => {
  const allCardsValue = cards.reduce((sum, c) => sum + getCardSelectionValue(c, searchType || ""), 0);
  const autoSelected = allCardsValue <= maxCount;
  
  if (optionalCount) {
    return `${effectDescription} (${requiredCount}-${maxCount} valeur${autoSelected ? ' - Auto-selected' : ''})`;
  }
    return `${effectDescription} (${requiredCount} valeur${autoSelected ? ' - Auto-selected' : ''})`;
  })();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80]">
      <div className="bg-white p-4 rounded-xl space-y-4 max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
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
            <Button onClick={onCancel} variant="secondary" hidden={zone === "Campaign"}>
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
        <div 
          ref={previewRef}
          className="fixed z-[90] w-64 p-2 border rounded bg-white shadow-lg pointer-events-none"
          style={{
            top: `${previewPosition.top}px`,
            left: `${previewPosition.left}px`
          }}
        >
          <div className="font-bold">{hoveredCard.id}</div>

          <div>
            <div className="text-sm">{`${hoveredCard.name[0]}: ${hoveredCard.type[0]} | ${hoveredCard.name[1]}: ${hoveredCard.type[1]}`}</div>
            <div className="text-sm">{`${hoveredCard.name[2]}: ${hoveredCard.type[2]} | ${hoveredCard.name[3]}: ${hoveredCard.type[3]}`}</div>
          </div>
          <div className="my-1">-----</div>

          <div className="mt-2 text-xs flex flex-wrap justify-center items-center">
            {Array.isArray(hoveredCard.resources) && hoveredCard.resources.length > 0 ? (
              hoveredCard.resources.map((sideOpts: Record<string, number>[], sideIdx: number) => (
                <span key={`preview-side-${sideIdx}`} className="inline-flex items-center mr-2">
                  {renderSideOptions(sideOpts, sideIdx)}
                  {sideIdx < hoveredCard.resources.length - 1 && <span className="mx-1">|</span>}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400"></span>
            )}
          </div>

          <div className="my-1">-----</div>
          {hoveredCard.effects?.map((eff, idx) => (
            <div key={idx}>
              {idx > 0 && <div className="my-1">-----</div>}
              <div className="text-xs mt-1">{renderEffect(eff)}</div>
            </div>
          ))}
        </div>
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
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80]">
      <div className="bg-white p-6 rounded-xl space-y-4 max-w-md">
        <h2 className="font-bold text-lg">Effet de fin de round</h2>
        
        <div className="text-sm py-4">
          <p>{description}</p>
        </div>

        <div className="flex justify-end gap-3">
          <Button 
            onClick={onSkip}
            variant="secondary"
          >
            Reporter au prochain round
          </Button>
          <Button 
            onClick={onConfirm}
          >
            Résoudre maintenant
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
          Select between {requiredCount} and {requiredCount + optionalCount} box(es)
        </h2>
        {available.length === 0 ? (
          <div className="text-sm mb-4">No checkbox available.</div>
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
            Cancel
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
            Confirm
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
          Select between {requiredCount} and {requiredCount + optionalCount} side(s)
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
                    <span className="font-medium text-sm">{sideLabel(sideNum)}</span>
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
            Cancel
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
            Confirm
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
  const [selectedUpgradeIndex, setSelectedUpgradeIndex] = useState<number | null>(null);
  const [selectedResourceKey, setSelectedResourceKey] = useState<keyof ResourceMap | null>(null);

  const currentUpgrades = card.GetUpgrades();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">
          Sélectionnez un upgrade et une ressource à retirer
        </h2>
        
        {currentUpgrades.length === 0 ? (
          <div className="text-sm mb-4">Aucun upgrade disponible.</div>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-sm font-medium">1. Choisissez un upgrade :</h3>
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
                    <span className="font-medium text-sm">Upgrade {idx + 1}</span>
                    <span className="text-xs text-gray-600">
                      → {sideLabel(upg.nextSide)}
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
                      <span className="text-xs text-gray-400">Pas de coût</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedUpgradeIndex !== null && currentUpgrades[selectedUpgradeIndex].cost && (
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-sm font-medium">2. Choisissez une ressource à retirer :</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(currentUpgrades[selectedUpgradeIndex].cost || {})
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
            Annuler
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
            Confirmer
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
  const [discard, setDiscard] = useState<GameCard[]>([]);
  const [playArea, setPlayArea] = useState<GameCard[]>([]);
  const [permanentZone, setPermanentZone] = useState<GameCard[]>([]);
  const [temporaryCardList, setTemporaryCardList] = useState<GameCard[]>([]);
  const [popupCard, setPopupCard] = useState<PopupPayload | null>(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showDeck, setShowDeck] = useState(false);
  const [showEndRound, setShowEndRound] = useState(false);
  const [campaignPreview, setCampaignPreview] = useState<GameCard | null>(null);
  const [resources, setResources] = useState<ResourceMap>({ ...emptyResource });
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [cityNameInput, setCityNameInput] = useState("");
  const [selectedKingdom, setSelectedKingdom] = useState("New Kingdom");

  const [hasUpgradedCard, setHasUpgradedCard] = useState(false);
  const [hasEndedBaseGame, setHasEndedBaseGame] = useState(false);

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
    resolve: (selectedCards: GameCard[]) => void;
  } | null>(null);

  const [showCheckboxPopup, setShowCheckboxPopup] = useState(false);
  const [checkboxPopupCard, setCheckboxPopupCard] = useState<GameCard | null>(null);
  const [checkboxRequiredCount, setCheckboxRequiredCount] = useState(1);
  const [checkboxOptionalCount, setCheckboxOptionalCount] = useState(1);
  const [onCheckboxConfirm, setOnCheckboxConfirm] = useState<
    ((selected: Checkbox[]) => void) | null
  >(null);

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

  // ----------- immediate refs & setters (à ajouter près des useState) -----------
  const playAreaRef = useRef<GameCard[]>([]);
  const discardRef = useRef<GameCard[]>([]);
  const temporaryCardListRef = useRef<GameCard[]>([]);

  // Keep refs in sync if other code uses setPlayArea / setDiscard directly
  useEffect(() => { playAreaRef.current = playArea; }, [playArea]);
  useEffect(() => { discardRef.current = discard; }, [discard]);
  useEffect(() => { temporaryCardListRef.current = temporaryCardList; }, [temporaryCardList]);

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
      .map((c) => cloneGameCard(c))
  );

  const [blockedZone, setBlockedZone] = useState<GameCard[]>(() =>
    allCards
      .filter((c) => c.id === 0)
      .map((c) => cloneGameCard(c))
  );

  // -------------------
  // Game Phases
  // -------------------
  const updateResource = (key: keyof ResourceMap, delta: number) => {
    setResources((r) => ({ ...r, [key]: r[key] + delta }));
  };

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
    
    setPlayArea((p) => [...p, ...newCards]);
    setDeck((d) => d.slice(nbCards));
    setPendingPlayedCards(newCards);
  };

  useEffect(() => {
    if (pendingPlayedCards.length > 0) {
      (async () => {
        for (const card of pendingPlayedCards) {
          await handleExecuteCardEffect(card, "Play Area", "played");

        }
        for (const card of pendingPlayedCards) {
          await handleExecuteCardEffect(card, "Play Area", "otherCardPlayed", pendingPlayedCards);
        }
        setPendingPlayedCards([]);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPlayedCards]);

  const drawNewTurn = async () => {
    await discardEndTurn();
    draw(4);
  }
  
  const progress = () => draw(2);

  const handleEffectsEndOfTurn = async () => {
    for(const card of playArea) {
      await handleExecuteCardEffect(card, "Play Area", "endOfTurn");
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
  for (const { card } of cardsWithEffects) {
    await handleExecuteCardEffect(card, "Deck", "endOfRound");
  }
};

  const effectEndTurn = async () => {
    await discardEndTurn(false);
  };

  const discardEndTurn = async (endRound?: boolean) => {
  await handleEffectsEndOfTurn();

  if (endRound) {
    const endOfRoundCardList = await gatherEffectsEndOfRound();

    setDeck((d) => [...d, ...playArea, ...blockedZone, ...discard]);
    setPlayArea([]);
    setBlockedZone([]);
    setDiscard([]);
    setTemporaryCardList([]);

    await handleEffectsEndOfRound(endOfRoundCardList);
    }
    else {
      const cardsToDiscard: GameCard[] = [];
      const cardsToKeep: GameCard[] = [];

      const currentPlayArea = playAreaRef.current;
      currentPlayArea.forEach(card => {
        const effects = getCardEffects(card.id, card.currentSide);
        const hasStayInPlay = effects.some(eff => eff.timing === "stayInPlay");
        const isInTemporaryList = temporaryCardListRef.current.some(tempCard => tempCard.id === card.id);

        if (hasStayInPlay || isInTemporaryList) cardsToKeep.push(card);
        else cardsToDiscard.push(card);
      });

      setDiscard((d) => [...d, ...cardsToDiscard, ...blockedZone]);
      setPlayArea(cardsToKeep);
      setBlockedZone([]);
      setTemporaryCardList([]);
    }

    setResources((prev) => {
      const reset: ResourceMap = { ...emptyResource };
      if ("fame" in prev) (reset as Partial<ResourceMap>).fame = (prev as Partial<ResourceMap>).fame;
      return reset;
    });

    setHasUpgradedCard(false);

    await new Promise(resolve => setTimeout(resolve, 100));
  };

  const handleEndBaseGame = async () => {
    await discardEndTurn(true);
    
    // Calculate total fame from deck
    let totalFame = 0;
    
    for (const card of deck) {
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
            zone: "Deck",
            resources,
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDiscard,
            setDeck,
            setPlayArea,
            setDiscard,
            setPermanentZone,
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
            updateBlocks,
            getBlockedBy,
          };
          
          const specialFameValue = await fameValueEffect.execute(context);
          totalFame += specialFameValue;
        }
        totalFame += maxFameFromResources;
    }
    
    // Update fame resource
    setResources(prev => ({ ...prev, fame: totalFame }));
    setHasEndedBaseGame(true);
  };
  
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
      case "Play Area":
        filteredCards = playArea.filter(filter);
        break;
      case "Discard":
        filteredCards = discard.filter(filter);
        break;
      case "Deck":
        filteredCards = deck.filter(filter);
        break;
      case "Permanent":
        filteredCards = permanentZone.filter(filter);
        break;
      case "Campaign":
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
    optionalCount?: number
  ): Promise<GameCard[]> => {
    return new Promise((resolve) => {
      const filteredCards = filterZone(zone, filter);
      if (filteredCards.length === 0) {
        resolve([]);
        return;
      }
      let searchType = "";
      const typeMatch = effectDescription.match(/\b(Personne|Bâtiment|Terrain|Chevalier|Dame|Maritime|Navire|Evénement)\b/i);
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
        zone: "Campaign",
        requiredCount: adjustedCount,
        optionalCount: optionalCount,
        resolve: (selectedCards: GameCard[] | null) => {
          if (selectedCards) {
            for(const card of selectedCards) {
              setCampaignDeck(prev => prev.filter(c => c.id !== card.id));
              if(zone) {
                if(zone === "Deck") {
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
              // Filtrer les options : retirer fame et les valeurs <= 0
              const filteredOptions = selectedCard.resources[selectedCard.currentSide - 1].map(option => {
                const filtered: Partial<ResourceMap> = {};
                Object.entries(option).forEach(([key, value]) => {
                  if (key !== 'fame' && typeof value === 'number' && value > 0) {
                    filtered[key as keyof ResourceMap] = value;
                  }
                });
                return filtered;
              }).filter(option => Object.keys(option).length > 0); // Retirer les options vides
              
              if (filteredOptions.length === 0) {
                resolve(false);
                return;
              }
              
              // Attendre le choix de l'utilisateur
              const chosenResources = await selectResourceChoice(filteredOptions);
              if (chosenResources) {
                finalBoost = chosenResources;
              } else {
                resolve(false);
                return;
              }
            }
            
            // Appliquer le boost à toutes les options de ressources de la carte
            for (const resourceChoice of selectedCard.resources[selectedCard.currentSide - 1]) {
              for (const key in finalBoost) {
                const resourceKey = key as keyof ResourceMap;
                const amount = finalBoost[resourceKey] ?? 0;
                resourceChoice[resourceKey] = (resourceChoice[resourceKey] ?? 0) + amount;
              }
            }
            
            // Mettre à jour la carte dans le deck
            replaceCardInZone(zone, selectedCard.id, selectedCard);
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  };

  function openCheckboxPopup(card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) {
    setCheckboxPopupCard(card);
    setCheckboxRequiredCount(requiredCount);
    setCheckboxOptionalCount(optionalCount);
    setOnCheckboxConfirm(() => (selected: Checkbox[]) => {
      callback(selected);
      replaceCardInZone("Play Area", card.id, card);
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
    
    if (zone === "Deck") {
      setDeck(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === "Play Area") {
      setPlayArea(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === "Discard") {
      setDiscard(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " " + effectText;
          return updated;
        }
        return c;
      }));
    } else if (zone === "Permanent") {
      setPermanentZone(prev => prev.map(c => {
        if (c.id === id) {
          const updated = cloneGameCard(c);
          updated.effects[updated.currentSide - 1] += " " + effectText;
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
      setDeck,
      setPlayArea,
      setDiscard,
      setPermanentZone,
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
      updateBlocks,
      getBlockedBy,
    };

    if (typeof effectIndex === "number" && effectIndex >= 0 && effectIndex < effects.length) {
      const eff = effects[effectIndex];
      
      const effectText = card.effects[card.currentSide - 1];
      const { effects: parsedEffects } = parseEffects(effectText);
      
      if (effectIndex < parsedEffects.length) {
        const currentEffectText = parsedEffects[effectIndex].text;
        
        if (isTimeEffect(currentEffectText) && checkTimeEffectRestrictions()) {
          return;
        }
      }
      
      if (await eff.execute(context)) {
        dropToDiscard({ id: card.id, fromZone: zone });
      }
      return;
    }

    for (const effect of effects) {
      if (effect.timing === timing) {
        if (await effect.execute(context)) {
          dropToDiscard({ id: card.id, fromZone: zone });
          break;
        }
      }
    }
  };

  // -------------------
  // Drag & Drop Handlers
  // -------------------
  const handleDropToZone = (toZone: string) => (payload: DropPayload) => {
    const { id, fromZone } = payload;
    if (fromZone === toZone) return;

    if (toZone === "Play Area" && checkPlayRestrictions()) {
      return;
    }

    const removeById = (arr: GameCard[], removeId: number) =>
      arr.filter((c) => c.id !== removeId);

    const findCardInAllZones = (snap?: {
      deck?: GameCard[];
      playArea?: GameCard[];
      discard?: GameCard[];
      campaignDeck?: GameCard[];
      blockedZone?: GameCard[];
      permanentZone?: GameCard[];
    }) => {
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

    const sourceCard = findCardInAllZones();
    if (!sourceCard) return;

    const toAdd: GameCard = sourceCard;

    if (fromZone === "Deck") setDeck((d) => removeById(d, id));
    if (fromZone === "Play Area") setPlayAreaImmediate((p) => removeById(p, id));
    if (fromZone === "Discard") setDiscardImmediate((f) => removeById(f, id));
    if (fromZone === "Campaign") setCampaignDeck((g) => removeById(g, id));
    if (fromZone === "Blocked") setBlockedZone((b) => removeById(b, id));
    if (fromZone === "Permanent") setPermanentZone((pe) => removeById(pe, id));

    if (toZone === "Deck") {
      setDeck((d) => [cloneGameCard(toAdd), ...d]);
    }
    if (toZone === "Discard") {
      setDiscard((f) => [...f, toAdd]);
    }
    if (toZone === "Blocked") {
      setBlockedZone((b) => [...b, toAdd]);
    }
    if (toZone === "Permanent") {
      setPermanentZone((pe) => [...pe, toAdd]);
    }
    if (toZone === "Play Area") {
      setPlayArea((p) => [...p, toAdd]);

      handleExecuteCardEffect(toAdd, "Play Area", "played");
      for (const card of playArea) {
        handleExecuteCardEffect(card, "Play Area", "otherCardPlayed", [toAdd]);
      }
    }

    if ((toZone !== "Play Area" && toZone !== "Permanent") && (fromZone === "Play Area" || fromZone === "Permanent")) {
      const blockedIds = blockMap.get(id);
      if (blockedIds) {
        setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
        setPlayArea(prev => [...prev, ...blockedZone.filter(c => blockedIds.includes(c.id))]);
        updateBlocks(id, null);
      }
    }
  };

  const dropToDeck = handleDropToZone("Deck");
  const dropToPlayArea = handleDropToZone("Play Area");
  const dropToDiscard = handleDropToZone("Discard");
  const dropToCampaign = handleDropToZone("Campaign");
  const dropToDestroy = handleDropToZone("Destroy");
  const dropToBlocked = handleDropToZone("Blocked");
  const dropToPermanent = handleDropToZone("Permanent");

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

  const handleShuffle15Rand = () => {
    if (discard.length === 0) return;
    
    const randomCards: GameCard[] = [];
    const availableCards = [...discard];
    
    const numCardsToTake = Math.min(15, availableCards.length);
    
    for (let i = 0; i < numCardsToTake; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      randomCards.push(availableCards[randomIndex]);
      availableCards.splice(randomIndex, 1);
    }
    
    setDeck(prev => [...prev, ...randomCards]);
    setDiscard(prev => prev.filter(card => !randomCards.includes(card)));
  };

  const handleTopDiscardToBottom = () => {
    if (discard.length === 0) return;

    const card = discard[discard.length - 1];

    setDeck(prev => [...prev, card]);
    discard.pop();
  }

  // -------------------
  // Replace card in zone by id (used by popup apply)
  // -------------------
  function replaceCardInZone(zone: string, id: number, newCard: GameCard): void {
    if (zone === "Deck") {
      setDeck((d) => d.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === "Play Area") {
      setPlayArea((p) => p.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === "Discard") {
      setDiscard((f) => f.map((c) => (c.id === id ? cloneGameCard(newCard) : c)));
    } else if (zone === "Campaign") {
      setCampaignDeck((c) => c.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    } else if (zone === "Blocked") {
      setBlockedZone((b) => b.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    } else if (zone === "Permanent") {
      setPermanentZone((pe) => pe.map((card) => (card.id === id ? cloneGameCard(newCard) : card)));
    }
  }

  function deleteCardInZone(zone: string, id: number): void {
    if (zone === "Deck") {
      setDeck((d) => d.filter((c) => c.id !== id));
    } else if (zone === "Play Area") {
      const blockedIds = blockMap.get(id);
      if (blockedIds) {
        setBlockedZone(prev => prev.filter(c => !blockedIds.includes(c.id)));
        setPlayArea(prev => [...prev, ...blockedZone.filter(c => blockedIds.includes(c.id))]);
        updateBlocks(id, null);
      }
      setPlayArea((p) => p.filter((c) => c.id !== id));
    } else if (zone === "Discard") {
      setDiscard((f) => f.filter((c) => c.id !== id));
    } else if (zone === "Campaign") {
      setCampaignDeck((c) => c.filter((card) => card.id !== id));
    } else if (zone === "Blocked") {
      setBlockedZone((b) => b.filter((card) => card.id !== id));
    } else if (zone === "Permanent") {
      setPermanentZone((pe) => pe.filter((card) => card.id !== id));
    }
  }

  function fetchCardsInZone(filter: (card: GameCard) => boolean, zone: string): GameCard[] {
    if (zone === "Deck") {
      return deck.filter(filter);
    } else if (zone === "Play Area") {
      return playArea.filter(filter);
    } else if (zone === "Discard") {
      return discard.filter(filter);
    } else if (zone === "Campaign") {
      return campaignDeck.filter(filter);
    } else if (zone === "Blocked") {
      return blockedZone.filter(filter);
    } else if (zone === "Permanent") {
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
          setDeck,
          setPlayArea,
          setDiscard,
          setPermanentZone,
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
          updateBlocks,
          getBlockedBy,
        };
        
        const additionalCostPaid = await additionalCostEffect.execute(context);
        if (!additionalCostPaid) {
          return; // Don't upgrade if additional cost not paid
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

    // Switch side
    const upgraded = cloneGameCard(card);
    upgraded.currentSide = upg.nextSide;

    if (zone === "Play Area") {
      // Remove from play area
      setPlayArea((prev) => prev.filter((c) => c.id !== card.id));
      // Add upgraded card to discard
      setDiscard((prev) => [...prev, upgraded]);
    } else {
      // Default behavior: just replace in the same zone
      replaceCardInZone(zone, card.id, upgraded);
    }

    setHasUpgradedCard(true);
    discardEndTurn();
  };

  const handleGainResources = async (card: GameCard, resources: Partial<ResourceMap>, zone: string) => {
    for (const c of [...playArea]) {
      const effects = getCardEffects(c.id, c.currentSide, "onResourceGain");
      for (const effect of effects) {
        if (effect.timing === "onResourceGain") {
          const context: GameContext = {
            card: c,
            zone: playArea.includes(c) ? "Play Area" : "Permanent",
            resources: { ...emptyResource, ...resources },
            cardsForTrigger: [card],
            filterZone,
            setResources,
            draw,
            effectEndTurn,
            dropToPlayArea,
            dropToBlocked,
            dropToDiscard,
            setDeck,
            setPlayArea,
            setDiscard,
            setPermanentZone,
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
            updateBlocks,
            getBlockedBy,
          };
          
          await effect.execute(context);
        }
      }
    }

    // Vérifier si les ressources contiennent autre chose que fame AVANT setResources
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

    deleteCardInZone(zone, card.id);
    setDiscard((prev) => [...prev, card]);
  };

  const handleCardUpdate = (updatedCard: GameCard, zone: string) => {
    replaceCardInZone(zone, updatedCard.id, updatedCard);
  };

  // -------------------
  // Memory management
  // -------------------
  const saveGame = (name: string) => {
    if (!name) return alert("Please give a name for this save.");
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
      alert(`Saved city '${name}'.`);
    } catch (e) {
      console.error(e);
      alert("Failed to save: " + e);
    }
  };

  const loadGame = (name: string) => {
    if (!name) return alert("Please provide the name of a save to load.");
    try {
      const raw = localStorage.getItem(`citysave:${name}`);
      if (!raw) return alert(`No save found named '${name}'.`);
      const parsed = JSON.parse(raw);
      
      // Helper function to reconstruct GameCard instances from saved data
      const reconstructCards = (cards: GameCard[]): GameCard[] => {
        return (cards || []).map(cardData => {
          const card = new GameCard({});
          // Copy all properties from saved data
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
      alert(`Loaded city '${name}'.`);
    } catch (e) {
      console.error(e);
      alert("Failed to load: " + e);
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
    if (!confirm("Are you sure you want to reset the entire game? This cannot be undone without reloading. Type YES to confirm.")) return;
    const answer = prompt("Type YES to confirm full reset:");
    if (answer !== "YES") return;

    setDeck(shuffle(allCards.filter((c) => c.id >= 1 && c.id <= 10).map((c) => cloneGameCard(c))));
    setCampaignDeck(shuffle(allCards.filter((c) => c.id > 10).map((c) => cloneGameCard(c))));
    setPlayArea([]);
    setDiscard([]);
    setBlockedZone([]);
    setPermanentZone([]);
    setResources({ ...emptyResource });
    setShowSettings(false);
  };

  useEffect(() => {
    document.body.style.background = "linear-gradient(to top left, #6d6d6dff, #ebebebff)";
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
                name="Deck"
                cards={deck.slice(0, 1)}
                onDrop={(p) => dropToDeck(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                onTapAction={handleTapAction}
              />
            </div>

            {/* Discard */}
            <div className="min-w-[200px]">
              <Zone
                name="Discard"
                cards={discard}
                onDrop={(p) => dropToDiscard(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                showAll={false}
                onTapAction={handleTapAction}
              />
              {discard.length > 0 && <Button onClick={() => setShowDiscard(true)}>See discard</Button>}
            </div>

            {/* Campaign Deck */}
            <div className="p-2 border rounded" style={{background: "linear-gradient(to bottom right, #ebebebff, #ecececff)"}}>
              <h2 className="text-lg font-bold">Campaign Deck</h2>
              <p>Click here and type ID to preview</p>
              <div
                onClick={() => {
                  const id = prompt("Enter Card ID:");
                  const card = campaignDeck.find((c) => c.id === Number(id));
                  if (card) setCampaignPreview(card);
                }}
                className="cursor-pointer"
              >
                <div className="w-49 h-70 border bg-gray-300 flex items-center justify-center">Hidden</div>
              </div>
            </div>

            {/* Permanent zone */}
            <div className="flex flex-col lg:flex-row gap-4">
              <Zone
                name="Permanent"
                cards={permanentZone}
                onDrop={(p) => dropToPermanent(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                onTapAction={handleTapAction}
                onCardUpdate={handleCardUpdate}
                onExecuteCardEffect={(card, zone, timing, effectIndex) => handleExecuteCardEffect(card, zone, timing, undefined, effectIndex)}
                interactable={true}
              />
            </div>

            {/* Destroy */}
            <div className="min-w-[200px]">
              <Zone
                name="Destroy"
                cards={[]}
                onDrop={(p) => dropToDestroy(p)}
                onRightClick={() => {}}
                onTapAction={undefined}
                onCardUpdate={undefined}
              />
            </div>
          </div>

          {/* Settings button */}
          <div>
            <Button onClick={() => setShowSettings(true)}>Settings</Button>
          </div>
        </div>

        {/* Play Area */}
        <div className="flex flex-col lg:flex-row gap-4 min-w-[1400px]">
          <div className="flex-1 min-w-[1200px]">
            <Zone
              name="Play Area"
              cards={playArea}
              onDrop={(p) => dropToPlayArea(p)}
              onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
              onTapAction={handleTapAction}
              onCardUpdate={handleCardUpdate}
              onUpgrade={handleUpgrade}
              onGainResources={handleGainResources}
              onExecuteCardEffect={(card, zone, timing, effectIndex) => handleExecuteCardEffect(card, zone, timing, undefined, effectIndex)}
            />
          </div>

          {/* Blocked zone */}
          <div className="w-full lg:w-120 min-w-[120px]">
            <Zone
              name="Blocked"
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
          <Button onClick={drawNewTurn} disabled={deck.length === 0}>{"New Turn"}</Button>
          <Button onClick={() => discardEndTurn(false)} disabled={deck.length === 0}>{"Pass"}</Button>
          <Button onClick={progress} disabled={hasUpgradedCard || isPlayBlocked || deck.length === 0}>{"Progress"}</Button>
          {/* Conditionnal controls */}
          <Button disabled={deck.length > 0} className="bg-red-600 hover:bg-red-500 text-white" onClick={handleEndRound}>End Round</Button>
          {/* Manual actions */}
          <Button onClick={shuffleDeck} className="bg-blue-600 hover:bg-blue-500 text-white">{"Shuffle Deck"}</Button>
          {/* Hidden controls */}
          <Button hidden={campaignDeck.some(card => card.id === 95) && campaignDeck.some(card => card.id === 110)} className="bg-green-600 hover:bg-green-500 text-white" onClick={handleTopDiscardToBottom}>Top Discard to Bottom Deck</Button>
          <Button hidden={campaignDeck.some(card => card.id === 98)} className="bg-green-600 hover:bg-green-500 text-white" onClick={handleShuffle15Rand}>Shuffle 15 Rand</Button>
          <Button hidden={hasEndedBaseGame || campaignDeck.some(card => card.id === 70)} disabled={deck.length > 0} className="bg-red-600 hover:bg-red-500 text-white" onClick={handleEndBaseGame}>End Base Game</Button>
        </div>

        {/* Resource Pool */}
        <div>
          <div className="grid grid-cols-7 sm:grid-cols-7 lg:grid-cols-7 gap-2 sm:gap-3 lg:gap-4 min-w-240 max-h-0">
            {RESOURCE_KEYS.map((key) => (
              <div key={key} className="flex flex-col items-center gap-2 p-2 bg-white rounded-lg min-w-0">
                <img src={resourceIconPath(key)} alt={key} title={key} className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                <div className="flex items-center gap-1 w-full justify-center">
                  <Button size="sm" gap-1 onClick={() => updateResource(key, -1)}>-</Button>
                  <input
                    type="number"
                    className="w-12 sm:w-16 text-center border rounded text-xs sm:text-sm py-1"
                    value={resources[key]}
                    onChange={(e) => setResources((r) => ({ ...r, [key]: parseInt(e.target.value || "0", 10) || 0 }))}
                  />
                  <Button size="sm" gap-1 onClick={() => updateResource(key, 1)}>+</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-md">
              <h2 className="font-bold">Settings</h2>
              <div className="flex flex-col gap-2">
                <Button onClick={resetGame}>Reset (full game)</Button>
                <Button onClick={() => { setShowGuide(true); setShowSettings(false); }}>Guide</Button>

                <div className="flex flex-col gap-2">
                  <label className="text-sm">Kingdom Save / Load</label>
                  
                  {/* Dropdown to select Kingdom */}
                  <select 
                    className="border p-1 rounded" 
                    value={selectedKingdom} 
                    onChange={(e) => setSelectedKingdom(e.target.value)}
                  >
                    <option value="New Kingdom">New Kingdom</option>
                    {getSavedKingdoms().map(kingdom => (
                      <option key={kingdom} value={kingdom}>{kingdom}</option>
                    ))}
                  </select>

                  {/* Input for new name */}
                  {selectedKingdom === "New Kingdom" && (
                    <input 
                      className="border p-1 rounded" 
                      value={cityNameInput} 
                      onChange={(e) => setCityNameInput(e.target.value)} 
                      placeholder="Enter new kingdom name" 
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
                      Save
                    </Button>
                    <Button 
                      disabled={selectedKingdom === "New Kingdom"}
                      onClick={() => loadGame(selectedKingdom)}
                    >
                      Continue
                    </Button>
                    <Button onClick={() => { setShowAbout(true); setShowSettings(false); }}>About</Button>
                  </div>
                </div>

                <Button onClick={() => setShowSettings(false)}>Close</Button>
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
                <Button onClick={() => setShowAbout(false)}>Close</Button>
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
                <Button onClick={() => setShowGuide(false)}>Close</Button>
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
              <h2 className="font-bold">Campaign Card #{campaignPreview.id}</h2>
              <div className="flex gap-4">
                <Zone
                  name="Campaign"
                  cards={[campaignPreview]}
                  onDrop={(p) => dropToCampaign(p)}
                  onTapAction={handleTapAction}
                  onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                />
                <Zone name="Discard" cards={discard.slice(-1)} onDrop={(p) => {dropToDiscard(p); setCampaignPreview(null);}} onTapAction={handleTapAction} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} showAll={true} />
                <Zone name="Destroy" cards={[]} onDrop={(p) => {dropToDestroy(p); setCampaignPreview(null);}} onRightClick={() => {}} />
              </div>
              <Button onClick={() => setCampaignPreview(null)}>Close</Button>
            </div>
          </div>
        )}

        {/* Full Discard Modal */}
        {showDiscard && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-hidden flex flex-col">
              <h2 className="font-bold text-xl">Discard</h2>
              <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {discard.map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone="Discard"
                        onRightClick={(x, zone) => setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })}
                        onTapAction={handleTapAction}
                      />
                    ))}
                  </div>
                </div>
                <div className="lg:min-w-[220px]">
                  <Zone name="Play Area" cards={playArea.slice(-1)} onDrop={(p) => dropToPlayArea(p)} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} onTapAction={handleTapAction} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowDiscard(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* End Round Modal */}
        {showEndRound && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-hidden flex flex-col">
              <h2 className="font-bold">End Round</h2>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-bold">Campaign Deck</p>
                  <Zone
                    name="Campaign"
                    cards={campaignDeck.slice(0, 1)}
                    onDrop={() => {}}
                    onTapAction={handleTapAction}
                    onRightClick={handleTapAction}
                    onExecuteCardEffect={async (card, zone) => {
                      if (card.GetType() === "Parchemin") {
                        return handleExecuteCardEffect(card, zone, "onClick");
                      }
                      return Promise.resolve();
                    }}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-bold">Deck</p>
                  <Zone name="Deck" cards={deck.slice(0, 1)} onDrop={(p) => dropToDeck(p)} onTapAction={handleTapAction} onRightClick={handleTapAction} />
                  {<Button onClick={() => setShowDeck(true)}>See deck</Button>}
                </div>

                <div className="flex-1">
                  <p className="font-bold">Temporary (Blocked)</p>
                  <Zone name="Blocked" cards={blockedZone.slice(-1)} onDrop={(p) => dropToBlocked(p)} onTapAction={handleTapAction} onRightClick={handleTapAction} />
                </div>

                <div className="flex-1">
                  <p className="font-bold">Destroy</p>
                  <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => {
                    setShowEndRound(false);
                    shuffleDeck();
                  }
                }>
                Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Full Deck Modal */}
        {showDeck && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2">
            <div className="bg-white p-4 rounded-xl space-y-4 w-full h-full max-w-[300vw] max-h-[300vh] overflow-hidden flex flex-col">
              <h2 className="font-bold">Deck</h2>
              <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-6 gap-2">
                    {deck.map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentSide}-${Math.random()}`}
                        card={c}
                        fromZone="Deck"
                        onRightClick={(x, zone) => setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })}
                        onTapAction={handleTapAction}
                      />
                    ))}
                  </div>
                </div>
                <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button onClick={() => setShowDeck(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {resourceChoicePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[70]">
          <div className="bg-white p-4 rounded-xl space-y-4 max-w-md">
            <h2 className="font-bold">Choose Resources</h2>
            
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
              Cancel
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
      </div>
    </DndProvider>
  );
}
