import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { emptyResource, GameCard, RESOURCE_KEYS, type ResourceMap, type PopupPayload } from "./types";
import { allCards } from "./cards";

// deep-clone preserving prototype/methods
function cloneGameCard(src: GameCard): GameCard {
  const out = new GameCard({});
  out.id = src.id;
  out.name = src.name;
  // Default to 1 (Front Up) if currentHalf is not set
  out.currentHalf = src.currentHalf || 1;
  out.type = [...src.type];
  out.permanent = src.permanent;
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
  out.checkboxes = (src.checkboxes || []).map((side: any) => side.map((c: any) => ({ ...c })));
  while (out.checkboxes.length < 4) out.checkboxes.push([]);

  // NEW: which checkbox index is "selected" per side (used by tap-to-check behavior)
  out.selectedCheckboxes = src.selectedCheckboxes ? [...src.selectedCheckboxes] : [0,0,0,0];
  while (out.selectedCheckboxes.length < 4) out.selectedCheckboxes.push(0);

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
// Helper to render effect string as icons
// -------------------
function renderEffect(effect: string) {
  return effect.split(" ").map((word, idx) => {
    if (word.startsWith("resources/") || word.startsWith("effects/")) {
      return (
        <img
          key={idx}
          src={word.concat(".png")}
          alt={word}
          className="inline w-4 h-4 mx-0.5"
        />
      );
    } else {
      return (
        <span key={idx} className="inline">
          {word}{" "}
        </span>
      );
    }
  });
}

// -------------------
// Card View Component
// -------------------

function CardView({
  card,
  fromZone,
  onRightClick,
  onTapAction,
  interactable = true,
}: {
  card: GameCard;
  fromZone: string;
  onRightClick: (card: GameCard, zone: string) => void;
  onTapAction?: (card: GameCard, zone: string) => void; // called on left click / tap
  interactable?: boolean; // when false, disable drag & tap
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const touchTimeout = useRef<any>(null);

  const [, drag] = useDrag(
  () => ({
   type: "CARD",
   item: { id: card.id, fromZone, card },
   canDrag: () => interactable,
  }),
  [card, fromZone, interactable]
  );
  drag(ref);

  const resOptions = card.GetResources();
  const effect = card.GetEffect();
  const currentUpgrades = card.GetUpgrades();
  const type = card.GetType();
  const name = card.GetName();

  function renderCheckboxContent(content: string | undefined) {
    if (!content || content.trim() === "") return <span className="text-xs text-gray-400">—</span>;
    if (content.trim() === "*") return <span className="font-bold">*</span>;
    const keys = content.split(",").map((s) => s.trim()).filter(Boolean);
    return (
      <div className="flex items-center gap-1">
        {keys.map((k, i) => (
          <img key={i} src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-3 h-3" />
        ))}
      </div>
    );
  }

  // helper to render icons for a single resource option object (opt)
  function renderOptionIcons(opt: any, keyPrefix = "") {
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

    return icons.length > 0 ? <>{icons}</> : <span className="text-xs text-gray-400">—</span>;
  }

  // helper to render a side's options (option objects separated by '/')
  function renderSideOptions(sideOpts: any[] | undefined, sideIdx: number) {
    if (!Array.isArray(sideOpts) || sideOpts.length === 0) {
      return <span className="text-xs text-gray-400">—</span>;
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

  const currentSideIdx = (card.currentHalf || 1) - 1;
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
        className={`w-40 h-56 m-2 flex flex-col items-center justify-between border ${!interactable ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <CardContent className="text-center p-2 overflow-hidden">
          <div>
            <p className="font-bold text-sm line-clamp-2">
              {card.id > 0 ? card.id : ""} {" | "} {name} {" | "} {type}
            </p>
            {card.permanent && <p className="text-xs">(Permanent)</p>}
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
                    {count !== 0 && <span className="text-xs">x{count}</span>}
                  </div>,
                ];
              });

              return (
                <div key={idx} className="flex items-center gap-1">
                  {icons.length > 0 ? icons : <span className="text-xs text-gray-400">—</span>}
                  {idx < resOptions.length - 1 && <span className="mx-1">/</span>}
                </div>
              );
            })}
          </div>

          {effect && <div className="mb-2 text-sm line-clamp-3">{renderEffect(effect)}</div>}

          {/* Upgrades */}
          <div className="mt-2">
            <div className="flex gap-1 flex-wrap justify-center line-clamp-2">
              {currentUpgrades.map((upg, i) => (
                <div
                  key={i}
                  className="text-[10px] px-2 py-1 border rounded bg-white flex items-center gap-1"
                >
                  <div className="flex items-center gap-1">
                    {upg.cost ? (
                      Object.entries(upg.cost).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1 text-[11px]">
                          {v}
                          <img src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-3 h-3" />
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px]">No cost</span>
                    )}
                  </div>
                  <div className="text-[11px]">→ {sideLabel(upg.nextSide)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="mt-2 flex gap-1 justify-center items-center">
            {sideCheckboxes.map((box: any, idx: number) => (
              <button
                key={idx}
                onClick={(ev) => {
                  ev.stopPropagation();
                  if (!interactable) return;
                  box.checked = !box.checked;
                  if (card.selectedCheckboxes) {
                    card.selectedCheckboxes[currentSideIdx] =
                      card.selectedCheckboxes[currentSideIdx] || 0;
                  }
                }}
                className={`border rounded px-1 py-0.5 text-[11px] flex items-center gap-1 ${
                  box.checked ? "bg-green-100" : "bg-white"
                }`}
              >
                {renderCheckboxContent(box.content)}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* --- PREVIEW POPUP --- */}
      {showPreview && (
        <div className="absolute z-50 -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full w-64 p-2 border rounded bg-white shadow-lg">
          <div className="font-bold">{card.id}</div>

          {/* Names/Types */}
          <div>
            <div className="text-sm">{`${card.name[0]}: ${card.type[0]} | ${card.name[2]}: ${card.type[2]}`}</div>
            <div className="text-sm">{`${card.name[1]}: ${card.type[1]} | ${card.name[3]}: ${card.type[3]}`}</div>
          </div>

          {/* Resources per side (each side's options joined with '/', sides separated by ' | ') */}
          <div className="mt-2 text-xs flex flex-wrap justify-center items-center">
            {Array.isArray(card.resources) && card.resources.length > 0 ? (
              card.resources.map((sideOpts: any[], sideIdx: number) => (
                <span key={`preview-side-${sideIdx}`} className="inline-flex items-center mr-2">
                  {renderSideOptions(sideOpts, sideIdx)}
                  {sideIdx < card.resources.length - 1 && <span className="mx-1">|</span>}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">—</span>
            )}
          </div>

          {/* Effects per side */}
          {card.effects?.map((eff: any, idx: number) => (
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
  showAll = true,
  interactable = true,
  onTapAction,
}: {
  name: string;
  cards: GameCard[];
  onDrop: (payload: { id: number; fromZone: string }) => void;
  onRightClick: (c: GameCard, zone: string) => void;
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

  if (name === "Play Area") {
    // Left-aligned flex row
    containerClass = "flex flex-wrap gap-2 justify-start";
  } else if ((name === "Permanent" || name === "Blocked") && displayCards.length < 6) {
    // Expand horizontally (1–5 columns only)
    gridTemplate = `repeat(${displayCards.length || 1}, minmax(0, 1fr))`;
  } else {
    // Default: max 6 per row
    gridTemplate = `repeat(${Math.min(6, displayCards.length || 1)}, minmax(0, 1fr))`;
  }

  return (
    <div ref={ref} className="p-2 border rounded min-h-[120px]">
      <h2 className="text-lg font-bold">{name}</h2>
      <div
        className={containerClass}
        style={gridTemplate ? { gridTemplateColumns: gridTemplate, alignItems: "start" } : {}}
      >
        {displayCards.length > 0 ? (
          displayCards.map((c) => (
            <CardView
              key={`${name}-${c.id}-${c.currentHalf}-${c.flipped}`}
              card={c}
              fromZone={name}
              onRightClick={onRightClick}
              interactable={interactable}
              onTapAction={onTapAction}
            />
          ))
        ) : (
          <Card className="w-32 h-48 m-2 flex items-center justify-center border bg-gray-100">
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
    localCard.currentHalf = half;
    setLocalCard(cloneGameCard(localCard));
    setSelectedUpgradeIndex(null);
  };

  // current side options (array of ResourceMap)
  const currentSideResources = localCard.GetResources();
  const currentSideUpgrades = localCard.GetUpgrades();

  // add an option (empty) to current side
  const addOption = () => {
    localCard.resources[localCard.currentHalf - 1].push({ ...emptyResource });
    setLocalCard(cloneGameCard(localCard));
  };

  // remove option
  const removeOption = (optIdx: number) => {
    localCard.resources[localCard.currentHalf - 1].splice(optIdx, 1);
    if (localCard.resources[localCard.currentHalf - 1].length === 0) {
      localCard.resources[localCard.currentHalf - 1].push({ ...emptyResource });
    }
    setLocalCard(cloneGameCard(localCard));
  };

  // -------------------
  // Checkbox editing helpers
  // -------------------
  const currentSideIdx = localCard.currentHalf - 1;
  const currentCheckboxes = localCard.checkboxes?.[currentSideIdx] ?? [];

  const addCheckbox = () => {
    if (!localCard.checkboxes) localCard.checkboxes = [[],[],[],[]];
    localCard.checkboxes[currentSideIdx].push({ content: "", checked: false });
    setLocalCard(cloneGameCard(localCard));
  };
  const removeCheckbox = (idx: number) => {
    localCard.checkboxes[currentSideIdx].splice(idx, 1);
    setLocalCard(cloneGameCard(localCard));
  };

  // set the selected checkbox index for tap action
  const setSelectedIndex = (idx: number) => {
    if (!localCard.selectedCheckboxes) localCard.selectedCheckboxes = [0,0,0,0];
    localCard.selectedCheckboxes[currentSideIdx] = idx;
    setLocalCard(cloneGameCard(localCard));
  };

  const applyChanges = () => {
    // 1) if an upgrade was selected, deduct its cost from global resources and set the card's currentHalf to nextSide
    let appliedCard = cloneGameCard(localCard);

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
      appliedCard.currentHalf = upg.nextSide;
    }

    appliedCard.resources = localCard.resources.map((side) => side.map((r) => ({ ...r })));
    appliedCard.effects = [...localCard.effects];
    appliedCard.upgrades = localCard.upgrades.map((arr) =>
      arr.map((u) => ({ cost: u.cost ? { ...u.cost } : null, nextSide: u.nextSide }))
    );

    // persist checkboxes & selectedCheckboxes
    appliedCard.checkboxes = localCard.checkboxes?.map((side: any) => side.map((c: any) => ({ ...c }))) ?? [[],[],[],[]];
    appliedCard.selectedCheckboxes = [...(localCard.selectedCheckboxes || [0,0,0,0])];

    // Replace by id in the original zone (this will keep the card id the same but substitute the instance)
    replaceCardInZone(payload.originZone, payload.originalId, appliedCard);

    // 4) close popup
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-white p-4 rounded-xl space-y-4 max-w-3xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="font-bold">{localCard.GetName()}</h2>

        {/* Side chooser (4 sides) */}
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((half) => {
            const label = sideLabel(half);
            return (
              <div
                key={half}
                className={`relative w-28 h-40 border flex items-center justify-center cursor-pointer ${
                  localCard.currentHalf === half ? "bg-yellow-200" : "bg-gray-200"
                }`}
                onClick={() => setSide(half)}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Effects section */}
        <div>
          <h3 className="font-bold">Effects (current side)</h3>
          <div className="text-sm">
            {localCard.GetEffect() ? renderEffect(localCard.GetEffect()) : <span className="text-gray-400">No effect</span>}
          </div>
        </div>

        {/* Editable Resources: multiple options per side, show as list, allow add/remove */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Resources (options for {sideLabel(localCard.currentHalf)})</h3>
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
                        localCard.resources[localCard.currentHalf - 1][optIdx][key] = val;
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
            <h3 className="font-bold">Checkboxes (for {sideLabel(localCard.currentHalf)})</h3>
            <div className="flex gap-2">
              <Button size="sm" onClick={addCheckbox}>Add Checkbox</Button>
            </div>
          </div>

          {currentCheckboxes.length === 0 && <div className="text-sm text-gray-400">No checkboxes</div>}

          {currentCheckboxes.map((box: any, idx: number) => (
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
                <span className="text-xs text-gray-500">Preview:</span>
                <div className="flex items-center gap-1">
                  {box.content === '*' ? <span className="font-bold">*</span> : (
                    box.content.split(',').map((s: string, i: number) => s.trim() ? <img key={i} src={resourceIconPath(s.trim() as keyof ResourceMap)} alt={s} className="w-4 h-4" /> : null)
                  )}
              </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm">Use for tap:</label>
                <input
                  type="radio"
                  name={`selected-${currentSideIdx}`}
                  checked={localCard.selectedCheckboxes?.[currentSideIdx] === idx}
                  onChange={() => setSelectedIndex(idx)}
                />
                <Button size="sm" onClick={() => removeCheckbox(idx)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrades for current side (clickable to select) */}
        <div>
          <h3 className="font-bold">Upgrades ({sideLabel(localCard.currentHalf)})</h3>
          {currentSideUpgrades.length === 0 ? (
            <div className="text-sm text-gray-400">No upgrades</div>
          ) : (
            currentSideUpgrades.map((upg, idx) => {
              const selected = selectedUpgradeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-sm p-2 border rounded cursor-pointer ${
                    selected ? "bg-blue-100 border-blue-400" : "bg-white"
                  }`}
                  onClick={() => setSelectedUpgradeIndex(selected ? null : idx)}
                >
                  <div className="flex items-center gap-2">
                    {upg.cost ? (
                      Object.entries(upg.cost).map(([k, v]) => (
                        <span key={k} className="flex items-center gap-1 text-[13px]">
                          {v}
                          <img src={resourceIconPath(k as keyof ResourceMap)} alt={k} className="w-4 h-4 inline" />
                        </span>
                      ))
                    ) : (
                      <span>No cost</span>
                    )}
                  </div>
                  <div>→ {sideLabel(upg.nextSide)}</div>
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
  const [blockedZone, setBlockedZone] = useState<GameCard[]>([]);
  const [permanentZone, setPermanentZone] = useState<GameCard[]>([]);
  const [popupCard, setPopupCard] = useState<PopupPayload | null>(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showEndRound, setShowEndRound] = useState(false);
  const [campaignPreview, setCampaignPreview] = useState<GameCard | null>(null);
  const [resources, setResources] = useState<ResourceMap>({ ...emptyResource });
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const [cityNameInput, setCityNameInput] = useState("");

  const updateResource = (key: keyof ResourceMap, delta: number) => {
    setResources((r) => ({ ...r, [key]: r[key] + delta }));
  };

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
    allCards.filter((c) => c.id > 10).map((c) => cloneGameCard(c))
  );

  // -------------------
  // Game Phases
  // -------------------
  const draw = (nbCards: number) => {
    const drawn = deck.slice(0, nbCards);
    setPlayArea((p) => [...p, ...drawn.map(cloneGameCard)]);
    setDeck((d) => d.slice(nbCards));
  };

  const drawNewTurn = () => draw(4);
  const progress = () => draw(2);

  const discardEndTurn = () => {
    setDiscard((d) => [...d, ...playArea]);
    setPlayArea([]);

    setResources((prev) => {
      const reset: ResourceMap = { ...emptyResource };
      if ("fame" in prev) (reset as any).fame = (prev as any).fame;
      return reset;
    });
  };

  const actions = [
    { label: "Progress", onClick: () => progress() },
    { label: "Pass", onClick: () => discardEndTurn() },
  ];

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
    if (fromZone === "Campaign") setCampaignDeck((c) => removeById(c, id));
    if (fromZone === "Blocked") setBlockedZone((b) => removeById(b, id));
    if (fromZone === "Permanent") setPermanentZone((pe) => removeById(pe, id));

    // Add to destination zone (add cloned instance)
    if (toZone === "Deck") setDeck((d) => [toAdd, ...d]);
    if (toZone === "Play Area") setPlayArea((p) => [...p, toAdd]);
    if (toZone === "Discard") setDiscard((f) => [...f, toAdd]);
    if (toZone === "Destroy") {
      // intentionally drop permanently (do nothing but ensure it was removed from source)
    }
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
    setDeck((d) => [...discard.map(cloneGameCard), ...playArea.map(cloneGameCard), ...d]);
    setDiscard([]);
    setPlayArea([]);
    setShowEndRound(true);
  };

  // Shuffle deck (Fisher-Yates)
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

  // -------------------
  // Tap action: when user taps a card (mobile), attempt to toggle the selected checkbox for that card's current side.
  // If there are no checkboxes, fallback to opening the popup editor.
  // -------------------
  const handleTapAction = (card: GameCard, zone: string) => {
    setPopupCard({ 
      originZone: zone, 
      originalId: card.id, 
      editable: cloneGameCard(card) 
    });
  };

  // -------------------
  // Save / Load (by city name) -> stored in localStorage
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
      setDeck(parsed.deck || []);
      setCampaignDeck(parsed.campaignDeck || []);
      setPlayArea(parsed.playArea || []);
      setDiscard(parsed.discard || []);
      setBlockedZone(parsed.blockedZone || []);
      setPermanentZone(parsed.permanentZone || []);
      setResources(parsed.resources || { ...emptyResource });
      setShowSettings(false);
      alert(`Loaded city '${name}'.`);
    } catch (e) {
      console.error(e);
      alert("Failed to load: " + e);
    }
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 space-y-4">
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
            <div className="p-2 border rounded">
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
                <div className="w-32 h-48 border bg-gray-300 flex items-center justify-center">Hidden</div>
              </div>
            </div>

            {/* Permanent zone */}
            <div className="w-96">
              <Zone
                name="Permanent"
                cards={permanentZone}
                onDrop={(p) => dropToPermanent(p)}
                onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
                onTapAction={handleTapAction}
                interactable={true}
              />
            </div>

            <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
          </div>

          {/* Settings button */}
          <div>
            <Button onClick={() => setShowSettings(true)}>Settings</Button>
          </div>
        </div>

        {/* Play Area + Blocked (blocked to the right) */}
        <div className="flex gap-4">
          <div className="flex-1 w-512">
            <Zone
              name="Play Area"
              cards={playArea}
              onDrop={(p) => dropToPlayArea(p)}
              onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
              onTapAction={handleTapAction}
            />
          </div>

          {/* Blocked zone: visible but not interactable except via drag/drop to it explicitly */}
          <div className="w-96">
            <Zone
              name="Blocked"
              cards={blockedZone}
              onDrop={(p) => dropToBlocked(p)}
              onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })}
              onTapAction={handleTapAction}
              interactable={true}
            />
          </div>
        </div>

        {/* Resource Pool */}
        <div>
          <h2 className="text-lg font-bold">Resources</h2>
          <div className="grid grid-cols-3 gap-4">
            {RESOURCE_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <img src={resourceIconPath(key)} alt={key} className="w-4 h-4" />
                <span className="w-16 capitalize">{key}</span>
                <Button size="sm" onClick={() => updateResource(key, -1)}>-</Button>
                <input
                  type="number"
                  className="w-16 text-center border rounded"
                  value={resources[key]}
                  onChange={(e) => setResources((r) => ({ ...r, [key]: parseInt(e.target.value || "0", 10) || 0 }))}
                />
                <Button size="sm" onClick={() => updateResource(key, 1)}>+</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons (with Shuffle next to End Round) */}
        <div className="space-x-2">
          <Button onClick={drawNewTurn}>New Turn</Button>
          {actions.map((a, i) => (
            <Button key={i} onClick={a.onClick}>{a.label}</Button>
          ))}
          {/* End Round only active when deck empty */}
          <Button disabled={deck.length > 0} onClick={handleEndRound}>End Round</Button>
          <Button onClick={shuffleDeck}>Shuffle Deck</Button>
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
                  <label className="text-sm">City Save / Load</label>
                  <input className="border p-1 rounded" value={cityNameInput} onChange={(e) => setCityNameInput(e.target.value)} placeholder="City name" />
                  <div className="flex gap-2">
                    <Button onClick={() => saveGame(cityNameInput)}>Save</Button>
                    <Button onClick={() => loadGame(cityNameInput)}>Continue</Button>
                  </div>
                </div>

                <Button onClick={() => setShowSettings(false)}>Close</Button>
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
                <ul className="list-disc pl-5">
                  <li>Tap a card to toggle its currently selected checkbox (mobile-friendly).</li>
                  <li>Right-click (or long-press) a card to open the editor where you can:</li>
                  <ul className="list-disc pl-5">
                    <li>Edit resources/options per side</li>
                    <li>Add / remove checkboxes for each side; each checkbox can contain '*' or multiple resource icons (comma-separated), or be blank</li>
                    <li>Choose which checkbox index is the "selected" one (used for tap action)</li>
                  </ul>
                  <li>Drag cards between zones (Deck, Play Area, Discard, Blocked). Blocked zone is shown to the right of the play area and is non-interactable; use drag-drop to place cards into it.</li>
                  <li>Use Settings → Reset to fully reset the game (extra confirmation required).</li>
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
                <Zone name="Discard" cards={discard.slice(-1)} onDrop={(p) => dropToDiscard(p)} onTapAction={handleTapAction} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} showAll={true} />
                <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
              </div>
              <Button onClick={() => setCampaignPreview(null)}>Close</Button>
            </div>
          </div>
        )}

        {/* Full Discard Modal */}
        {showDiscard && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <h2 className="font-bold">Discard</h2>
              <div className="flex gap-4 h-[70vh]">
                <div className="flex-1 overflow-y-auto p-2 border rounded">
                  <div className="grid grid-cols-3 gap-2">
                    {discard.map((c) => (
                      <CardView
                        key={`modal-${c.id}-${c.currentHalf}-${Math.random()}`}
                        card={c}
                        fromZone="Discard"
                        onRightClick={(x, zone) => setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })}
                        onTapAction={handleTapAction}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-80 p-2 border rounded">
                  <h3 className="font-bold">Play Area (preview)</h3>
                  <Zone name="Play Area" cards={playArea.slice(-6)} onDrop={(p) => dropToPlayArea(p)} onRightClick={(c, zone) => setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })} onTapAction={handleTapAction} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowDiscard(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* End Round Modal */}
        {showEndRound && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-4xl">
              <h2 className="font-bold">End Round</h2>

              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="font-bold">Campaign Deck (top card revealed)</p>
                  {campaignDeck.length > 0 ? (
                    <Zone name="Campaign" cards={[campaignDeck[0]]} onDrop={(p) => dropToCampaign(p)} onRightClick={() => {}} />
                  ) : (
                    <p>No more campaign cards</p>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-bold">Deck (top)</p>
                  <Zone name="Deck" cards={deck.slice(0, 1)} onDrop={(p) => dropToDeck(p)} onRightClick={() => {}} />
                </div>

                <div className="flex-1">
                  <p className="font-bold">Destroy</p>
                  <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
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
      </div>
    </DndProvider>
  );
}
