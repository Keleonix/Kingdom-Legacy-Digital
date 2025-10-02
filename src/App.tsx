import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { emptyResource, GameCard, RESOURCE_KEYS, EFFECT_KEYWORDS, TYPE_COLORS, type ResourceMap, type PopupPayload, type Checkbox, type Upgrade } from "./types";
import { allCards } from "./cards";

// deep-clone preserving prototype/methods
function cloneGameCard(src: GameCard): GameCard {
  const out = new GameCard({});
  out.id = src.id;
  out.name = src.name;
  // Default to 1 (Front Up) if currentSide is not set
  out.currentSide = src.currentSide || 1;
  out.type = [...src.type];
  out.choice = src.choice;
  out.up = src.up;
  out.flipped = src.flipped;

  // deep-copy resources (sides -> options -> resource keys)
  out.resources = src.resources.map((side) =>
    side.map((r) => ({ ...emptyResource, ...r }))
  );
  while (out.resources.length < 4) out.resources.push([{ ...emptyResource }]);
  
  out.effects = [...src.effects];
  out.upgrades = src.upgrades.map((arr) =>
    arr.map((u) => ({ cost: u.cost ? { ...u.cost } : null, nextSide: u.nextSide }))
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

  if (colors.length ===0 ) {
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
  interactable = true,
}: {
  card: GameCard;
  fromZone: string;
  onRightClick: (card: GameCard, zone: string) => void;
  onTapAction?: (card: GameCard, zone: string) => void;
  onUpgrade?: (card: GameCard, upgrade: Upgrade, zone: string) => void;
  onGainResources?: (card: GameCard, resources: Partial<ResourceMap>, zone: string) => void;
  onCardUpdate?: (updatedCard: GameCard, zone: string) => void;
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

  function parseEffects(raw: string) {
    if (!raw) return { before: "", effects: [] as string[] };

    // On repÃ¨re toutes les occurrences de keywords
    const pattern = new RegExp(
      `(${EFFECT_KEYWORDS.join("|")})`,
      "g"
    );

    let match: RegExpExecArray | null;

    const indices: number[] = [];
    while ((match = pattern.exec(raw)) !== null) {
      indices.push(match.index);
    }

    if (indices.length === 0) {
      return { before: raw.trim(), effects: [] };
    }

    // Le texte avant le premier effet
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

    return (
      <div className="flex flex-col gap-1">
        {/* Texte avant les effets */}
        {before && (
          <div className="text-sm">
            {renderEffectText(before)} {/* <-- rendu avec icones si besoin */}
          </div>
        )}

        {/* One button per effect */}
        {effects.map((eff, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Effet déclenché :", eff);
            }}
            className="text-[10px] px-2 py-1 border rounded bg-white hover:bg-gray-100 transition text-left w-full whitespace-pre-wrap flex flex-wrap justify-center"
          >
            {renderEffectText(eff)} {/* Icones here */}
          </button>
        ))}
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
                  </div>
                  <div className="text-[11px]">{"->"}{sideLabel(upg.nextSide)}</div>
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

          {/* Resources per side (each side's options joined with '/', sides separated by ' | ') */}
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

          {/* Effects per side */}
          <div className="my-1">-----</div>
          {card.effects?.map((eff, idx) => (
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
              key={`${name}-${c.id}-${c.currentSide}-${c.flipped}`}
              card={c}
              fromZone={name}
              onRightClick={onRightClick}
              interactable={interactable}
              onTapAction={onTapAction}
              onUpgrade={onUpgrade}
              onGainResources={onGainResources}
              onCardUpdate={onCardUpdate}
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
      arr.map((u) => ({ cost: u.cost ? { ...u.cost } : null, nextSide: u.nextSide }))
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

        {/* Ã‰diteur de noms pour chaque face */}
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
                    <div className="text-xs font-medium mb-1">Cost:</div>
                    <div className="grid grid-cols-3 gap-2">
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
// The Game
// -------------------

export default function Game() {
  const [discard, setDiscard] = useState<GameCard[]>([]);
  const [playArea, setPlayArea] = useState<GameCard[]>([]);
  const [permanentZone, setPermanentZone] = useState<GameCard[]>([]);
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

  const draw = (nbCards: number) => {
    const drawn = deck.slice(0, nbCards);
    setPlayArea((p) => [...p, ...drawn.map(cloneGameCard)]);
    setDeck((d) => d.slice(nbCards));
  };

  const drawNewTurn = () => {
    discardEndTurn();
    draw(4);
  }
  
  const progress = () => draw(2);

  const discardEndTurn = () => {
    setDiscard((d) => [...d, ...playArea]);
    setPlayArea([]);

    setResources((prev) => {
      const reset: ResourceMap = { ...emptyResource };
      if ("fame" in prev) (reset as Partial<ResourceMap>).fame = (prev as Partial<ResourceMap>).fame;
      return reset;
    });

    setHasUpgradedCard(false);
  };

  const handleEndBaseGame = () => {
    discardEndTurn();
    setHasEndedBaseGame(true);
  };

  // -------------------
  // Drag & Drop Handlers
  // -------------------

  type DropPayload = { id: number; fromZone: string };

  const handleDropToZone = (toZone: string) => (payload: DropPayload) => {
    const { id, fromZone } = payload;
    if (fromZone === toZone) return;

    // helper: remove a card by id from a given array
    const removeById = (arr: GameCard[], removeId: number) => arr.filter((c) => c.id !== removeId);

    // Find the original card object to clone for adding to destination (search current states first).
    const findCardInAllZones = (snap?: {
      deck?: GameCard[];
      playArea?: GameCard[];
      discard?: GameCard[];
      campaignDeck?: GameCard[];
      blockedZone?: GameCard[];
      permanentZone?: GameCard[];
    }) => {
      const sources = snap ?? { deck, playArea, discard, campaignDeck, blockedZone, permanentZone };
      const find = (arr?: GameCard[]) => (arr ? arr.find((c) => c.id === id) ?? null : null);
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

    // find source BEFORE we remove it
    const sourceCard = findCardInAllZones();
    const toAdd = sourceCard ? cloneGameCard(sourceCard) : new GameCard({ id });

    // Remove from source zone (functional updates to avoid stale closures)
    if (fromZone === "Deck") setDeck((d) => removeById(d, id));
    if (fromZone === "Play Area") setPlayArea((p) => removeById(p, id));
    if (fromZone === "Discard") setDiscard((f) => removeById(f, id));
    if (fromZone === "Campaign") setCampaignDeck((g) => removeById(g, id));
    if (fromZone === "Blocked") setBlockedZone((b) => removeById(b, id));
    if (fromZone === "Permanent") setPermanentZone((pe) => removeById(pe, id));

    // Add to destination zone (add cloned instance)
    if (toZone === "Deck") setDeck((d) => [toAdd, ...d]);
    if (toZone === "Play Area") setPlayArea((p) => [...p, toAdd]);
    if (toZone === "Discard") setDiscard((f) => [...f, toAdd]);
    if (toZone === "Destroy") { /* empty */ } // intentionally drop permanently (do nothing but ensure it was removed from source)
    if (toZone === "Blocked") setBlockedZone((b) => [...b, toAdd]);
    if (toZone === "Permanent") setPermanentZone((pe) => [...pe, toAdd]);
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

  const handleEndRound = () => {
    setDeck((d) => [...discard.map(cloneGameCard), ...playArea.map(cloneGameCard), ...blockedZone.map(cloneGameCard), ...d]);
    setDiscard([]);
    setPlayArea([]);
    setBlockedZone([]);
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

  const handleUpgrade = (card: GameCard, upg: Upgrade, zone: string) => {
    if (upg.cost) {
      // Verify
      const hasEnough = Object.entries(upg.cost).every(([k, v]) => {
        const key = k as keyof ResourceMap;
        return (resources[key] || 0) >= (Number(v) || 0);
      });

      if (!hasEnough) {
        console.warn("Pas assez de ressources pour cet upgrade");
        return; // On sort, pas d'upgrade
      }

      // Deduct
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
  };

  const handleGainResources = (card: GameCard, resources: Partial<ResourceMap>, zone: string) => {
    let onlyFame = true;

    if (resources) {
      setResources((prev) => {
        const next = { ...prev };
        Object.entries(resources).forEach(([k, v]) => {
          const key = k as keyof ResourceMap;
          if(key !== "fame" && Number(v) != 0){
            onlyFame = false;
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

  // Reset game (fail-safe confirmation)
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
          <Button onClick={drawNewTurn}>{"New Turn"}</Button>
          <Button onClick={discardEndTurn}>{"Pass"}</Button>
          <Button onClick={progress} disabled={hasUpgradedCard}>{"Progress"}</Button>
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
                <Zone name="Campaign" cards={[campaignPreview]} onDrop={(p) => dropToCampaign(p)} onTapAction={handleTapAction} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} />
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
                  <Zone name="Campaign" cards={campaignDeck.slice(0, 1)} onDrop={() => {}} onTapAction={handleTapAction} onRightClick={handleTapAction} />
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
      </div>
    </DndProvider>
  );
}
