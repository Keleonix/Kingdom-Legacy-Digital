import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// -------------------
// Types
// -------------------

type ResourceMap = {
  gold: number;
  wood: number;
  stone: number;
  military: number;
  ingot: number;
  export: number;
  fame: number;
};

const RESOURCE_KEYS: (keyof ResourceMap)[] = [
  "gold",
  "wood",
  "stone",
  "military",
  "ingot",
  "export",
  "fame"
];

const emptyResource: ResourceMap = {
  gold: 0,
  wood: 0,
  stone: 0,
  military: 0,
  ingot: 0,
  export: 0,
  fame: 0
};

type Upgrade = {
  cost: Partial<ResourceMap> | null;
  nextSide: number; // 1..4
};

class GameCard {
  id = -1;
  name = "";
  currentHalf = 1; // 1..4
  type = ["", "", "", ""];
  permanent = false;
  up = true;
  flipped = false;
  resources: ResourceMap[][] = [];
  effects: string[] = [];
  upgrades: Upgrade[][] = [];

  constructor({
    id = -1,
    name = "",
    currentHalf = 1,
    type = ["", "", "", ""],
    permanent = false,
    up = true,
    flipped = false,
    resources = [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects = ["", "", "", ""],
    upgrades = [[], [], [], []],
  }: Partial<{
    id: number;
    name: string;
    currentHalf: number;
    type: string[];
    permanent: boolean;
    up: boolean;
    flipped: boolean;
    resources: ResourceMap[][];
    effects: string[];
    upgrades: Upgrade[][];
  }> = {}) {
    this.id = id;
    this.name = name;
    this.currentHalf = currentHalf;
    this.type = type;
    this.permanent = permanent;
    this.up = up;
    this.flipped = flipped;
    this.resources = Array.isArray(resources)
      ? resources.map((side) => side.map((r) => ({ ...emptyResource, ...r })))
      : [];
    while (this.resources.length < 4) this.resources.push([{ ...emptyResource }]);
    this.effects = effects;
    this.upgrades = upgrades;
  }

  // returns array of options for the current side
  GetResources(): ResourceMap[] {
    return this.resources[this.currentHalf - 1] ?? [{ ...emptyResource }];
  }

  GetEffect(): string {
    return this.effects[this.currentHalf - 1] ?? "";
  }

  GetUpgrades(): Upgrade[] {
    return this.upgrades[this.currentHalf - 1] ?? [];
  }
}

// deep-clone preserving prototype/methods
function cloneGameCard(src: GameCard): GameCard {
  const out = new GameCard({});
  out.id = src.id;
  out.name = src.name;
  out.currentHalf = src.currentHalf;
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
}: {
  card: GameCard;
  fromZone: string;
  onRightClick: (card: GameCard, zone: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Drag item contains the id and fromZone; we still include the card reference for convenience,
  // but the handlers will operate by id to avoid identity problems.
  const [, drag] = useDrag(
    () => ({
      type: "CARD",
      item: { id: card.id, fromZone, card },
    }),
    [card, fromZone]
  );
  drag(ref);

  const resOptions = card.GetResources();
  const effect = card.GetEffect();
  const currentUpgrades = card.GetUpgrades();

  return (
    <Card
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(card, fromZone);
      }}
      className="w-40 h-56 m-2 flex flex-col items-center justify-between border cursor-pointer"
    >
      <CardContent className="text-center p-2">
        <div>
          <p className="font-bold text-sm">
            {card.id > 0 ? card.id : ""} {" | "} {card.name}
          </p>
          {card.permanent && <p className="text-xs">(Permanent)</p>}
        </div>

        {/* Render current side resources: each option -> icons; options separated by " / " */}
        <div className="mt-2 flex flex-wrap justify-center gap-2 items-center">
          {resOptions.map((opt, idx) => {
            // render icons for this option
            const icons = RESOURCE_KEYS.flatMap((k) => {
              const count = opt[k] ?? 0;
              if (!count || count <= 0) return [];
              // show single icon and number if >1 to keep compact
              return [
                <div key={`${idx}-${k}`} className="flex items-center gap-1">
                  <img
                    src={resourceIconPath(k)}
                    alt={k}
                    title={`${k} x${count}`}
                    className="w-4 h-4"
                  />
                  {count > 1 && <span className="text-xs">x{count}</span>}
                </div>,
              ];
            });

            return (
              <div key={idx} className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  {icons.length > 0 ? icons : <span className="text-xs text-gray-400">—</span>}
                </div>
                {idx < resOptions.length - 1 && <div className="mx-1">/</div>}
              </div>
            );
          })}
        </div>

        {effect && <div className="mb-2 text-sm">{renderEffect(effect)}</div>}

        {/* Only current side's upgrades */}
        <div className="mt-2">
          <div className="text-xs font-semibold mb-1">Upgrades ({sideLabel(card.currentHalf)})</div>
          <div className="flex gap-1 flex-wrap justify-center">
            {currentUpgrades.length === 0 ? (
              <div className="text-[10px] px-2 py-1 border rounded bg-gray-100">No upgrades</div>
            ) : (
              currentUpgrades.map((upg, i) => (
                <div key={i} className="text-[10px] px-2 py-1 border rounded bg-white flex items-center gap-1">
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
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
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
}: {
  name: string;
  cards: GameCard[];
  onDrop: (payload: { id: number; fromZone: string }) => void;
  onRightClick: (c: GameCard, zone: string) => void;
  showAll?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: (item: { id: number; fromZone: string }) => {
        onDrop({ id: item.id, fromZone: item.fromZone });
      },
    }),
    [onDrop]
  );
  drop(ref);

  let displayCards = cards;
  if (!showAll && cards.length > 0) {
    displayCards = [cards[cards.length - 1]];
  }

  return (
    <div ref={ref} className="p-2 border rounded min-h-[120px]">
      <h2 className="text-lg font-bold">{name}</h2>
      <div className="flex flex-wrap">
        {displayCards.length > 0 ? (
          displayCards.map((c) => (
            <CardView
              key={`${name}-${c.id}-${c.currentHalf}-${c.flipped}`}
              card={c}
              fromZone={name}
              onRightClick={onRightClick}
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
// The Game
// -------------------

type PopupPayload = {
  originZone: string;
  originalId: number;
  editable: GameCard;
};

export default function Game() {
  const campaignDeckInit = [
    new GameCard({
      id: 10,
      name: "Chevalier",
      resources: [
        [{ military: 3 }],
        [{ ...emptyResource }],
        [{ ...emptyResource }],
        [{ ...emptyResource }],
      ],
    }),
    new GameCard({
      id: 11,
      name: "Mineur",
      resources: [[{ gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 2 }], [{ ...emptyResource }], [{ ...emptyResource }], [{ ...emptyResource }]],
    }),
    new GameCard({
      id: 12,
      name: "Marchand",
      resources: [[{ gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }], [{ ...emptyResource }], [{ ...emptyResource }], [{ ...emptyResource }]],
    }),
  ];

  const initialDeck = [
    new GameCard({
      id: 1,
      name: "Fermier",
      resources: [
        [
          { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
          { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        ],
        [{ gold: 0, wood: 2, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 }],
        [{ ...emptyResource }],
        [{ ...emptyResource }],
      ],
      effects: [
        "effects/activate : Pay resources/gold and gain resources/stone resources/stone",
        "",
        "",
        "Other test",
      ],
      upgrades: [
        [{ cost: { gold: 2 }, nextSide: 3 }, { cost: { wood: 2, stone: 1 }, nextSide: 2 }],
        [],
        [{ cost: { gold: 4 }, nextSide: 4 }],
        [],
      ],
    }),
    new GameCard({
      id: 2,
      name: "Artisant",
      resources: [[{ gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }], [{ ...emptyResource }], [{ ...emptyResource }], [{ ...emptyResource }]],
    }),
    new GameCard({
      id: 3,
      name: "Renégat",
      resources: [[{ gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }], [{ ...emptyResource }], [{ ...emptyResource }], [{ ...emptyResource }]],
    }),
  ];

  const [deck, setDeck] = useState<GameCard[]>(initialDeck);
  const [discard, setDiscard] = useState<GameCard[]>([]);
  const [playArea, setPlayArea] = useState<GameCard[]>([]);
  const [campaignDeck, setCampaignDeck] = useState<GameCard[]>(campaignDeckInit);

  // popup now stores origin zone, original card id, and editable clone
  const [popupCard, setPopupCard] = useState<PopupPayload | null>(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const [showEndRound, setShowEndRound] = useState(false);
  const [campaignPreview, setCampaignPreview] = useState<GameCard | null>(null);

  const [resources, setResources] = useState<ResourceMap>({ ...emptyResource });

  const updateResource = (key: keyof ResourceMap, delta: number) => {
    setResources((r) => ({ ...r, [key]: r[key] + delta }));
  };

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
    setDiscard((d) => [...d, ...playArea.map(cloneGameCard)]);
    setPlayArea([]);
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

    // Remove from source zone (by id only)
    if (fromZone === "Deck") setDeck((d) => removeById(d, id));
    if (fromZone === "Play Area") setPlayArea((p) => removeById(p, id));
    if (fromZone === "Discard") setDiscard((f) => removeById(f, id));
    if (fromZone === "Campaign") setCampaignDeck((c) => removeById(c, id));

    // Find the original card object to clone for adding to destination (prefer searching in current states).
    // If not found (shouldn't happen often), create a minimal placeholder to avoid crashes.
    const findCardInAllZones = (): GameCard | null => {
      const find = (arr: GameCard[]) => arr.find((c) => c.id === id) ?? null;
      return find(deck) || find(playArea) || find(discard) || find(campaignDeck) || null;
    };

    const sourceCard = findCardInAllZones();

    // If the source card wasn't located (e.g. it was just removed / or fromZone had an outdated reference),
    // create a tiny placeholder so we can add something sensible.
    const toAdd = sourceCard ? cloneGameCard(sourceCard) : new GameCard({ id, name: `Card #${id}` });

    // Add to destination zone (add cloned instance)
    if (toZone === "Deck") setDeck((d) => [toAdd, ...d]);
    if (toZone === "Play Area") setPlayArea((p) => [...p, toAdd]);
    if (toZone === "Discard") setDiscard((f) => [...f, toAdd]);
    if (toZone === "Destroy") {
      // intentionally drop permanently (do nothing but ensure it was removed from source)
    }
  };

  // wrappers for Zone components
  const dropToDeck = handleDropToZone("Deck");
  const dropToPlayArea = handleDropToZone("Play Area");
  const dropToDiscard = handleDropToZone("Discard");
  const dropToCampaign = handleDropToZone("Campaign");
  const dropToDestroy = handleDropToZone("Destroy");

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
    }
  }

  // -------------------
  // Render
  // -------------------

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 space-y-4">
        {/* Top Row: Deck, Discard, Campaign Deck, Destroy */}
        <div className="flex gap-4">
          {/* Deck */}
          <Zone
            name="Deck"
            cards={deck.slice(0, 1)}
            onDrop={(p) => dropToDeck(p)}
            onRightClick={(c, zone) =>
              setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })
            }
          />

          {/* Discard */}
          <div>
            <Zone
              name="Discard"
              cards={discard}
              onDrop={(p) => dropToDiscard(p)}
              onRightClick={(c, zone) =>
                setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })
              }
              showAll={false}
            />
            {discard.length > 0 && (
              <Button onClick={() => setShowDiscard(true)}>See discard</Button>
            )}
          </div>

          {/* Campaign Deck */}
          <div className="p-2 border rounded">
            <h2 className="text-lg font-bold">Campaign Deck</h2>
            <p>Right click here and type ID to preview</p>
            <div
              onContextMenu={(e) => {
                e.preventDefault();
                const id = prompt("Enter Card ID:");
                const card = campaignDeck.find((c) => c.id === Number(id));
                if (card) setCampaignPreview(cloneGameCard(card));
              }}
            >
              <div className="w-32 h-48 border bg-gray-300 flex items-center justify-center">Hidden</div>
            </div>
          </div>

          <Zone name="Destroy" cards={[]} onDrop={(p) => dropToDestroy(p)} onRightClick={() => {}} />
        </div>

        {/* Play Area */}
        <Zone
          name="Play Area"
          cards={playArea}
          onDrop={(p) => dropToPlayArea(p)}
          onRightClick={(c, zone) =>
            setPopupCard({ originZone: zone, originalId: c.id, editable: cloneGameCard(c) })
          }
        />

        {/* Resource Pool */}
        <div>
          <h2 className="text-lg font-bold">Resources</h2>
          <div className="grid grid-cols-3 gap-4">
            {RESOURCE_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <img src={resourceIconPath(key)} alt={key} className="w-4 h-4" />
                <span className="w-16 capitalize">{key}</span>
                <Button size="sm" onClick={() => updateResource(key, -1)}>
                  -
                </Button>
                <input
                  type="number"
                  className="w-16 text-center border rounded"
                  value={resources[key]}
                  onChange={(e) =>
                    setResources((r) => ({ ...r, [key]: parseInt(e.target.value || "0", 10) || 0 }))
                  }
                />
                <Button size="sm" onClick={() => updateResource(key, 1)}>
                  +
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons (with Shuffle next to End Round) */}
        <div className="space-x-2">
          <Button onClick={drawNewTurn}>New Turn</Button>
          {actions.map((a, i) => (
            <Button key={i} onClick={a.onClick}>
              {a.label}
            </Button>
          ))}
          {/* End Round only active when deck empty */}
          <Button disabled={deck.length > 0} onClick={handleEndRound}>
            End Round
          </Button>
          <Button onClick={shuffleDeck}>Shuffle Deck</Button>
        </div>

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
              <Zone name="Campaign" cards={[campaignPreview]} onDrop={(p) => dropToCampaign(p)} onRightClick={() => {}} />
              <Button onClick={() => setCampaignPreview(null)}>Close</Button>
            </div>
          </div>
        )}

        {/* Full Discard Modal */}
        {showDiscard && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl space-y-4 max-w-2xl">
              <h2 className="font-bold">Discard</h2>
              <div className="flex flex-wrap">
                {discard.map((c) => (
                  <CardView
                    key={`modal-${c.id}-${c.currentHalf}`}
                    card={c}
                    fromZone="Discard"
                    onRightClick={(x, zone) =>
                      setPopupCard({ originZone: zone, originalId: x.id, editable: cloneGameCard(x) })
                    }
                  />
                ))}
              </div>
              <Button onClick={() => setShowDiscard(false)}>Close</Button>
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
                  <p className="font-bold">Discard</p>
                  <Zone name="Discard" cards={discard} onDrop={(p) => dropToDiscard(p)} onRightClick={() => {}} showAll={true} />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setShowEndRound(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}

// -------------------
// Card Popup Component
// -------------------

function CardPopup({
  payload,
  close,
  replaceCardInZone,
  resources,
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

    // Replace by id in the original zone (this will keep the card id the same but substitute the instance)
    replaceCardInZone(payload.originZone, payload.originalId, appliedCard);

    // 4) close popup
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]">
      <div className="bg-white p-4 rounded-xl space-y-4 max-w-3xl relative">
        <h2 className="font-bold">{localCard.name}</h2>

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
