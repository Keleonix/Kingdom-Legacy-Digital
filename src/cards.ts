import { emptyResource, type GameCard, type ResourceMap, type Upgrade } from "./types";

export const allCards: GameCard[] = [
  {
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
    currentHalf: 0,
    type: [],
    permanent: false,
    up: false,
    flipped: false,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 2,
    name: "Levrette",
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
    currentHalf: 0,
    type: [],
    permanent: false,
    up: false,
    flipped: false,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 11,
    name: "Levrette",
    resources: [
      [
        { gold: 0, wood: 0, stone: 0, military: 10, ingot: 0, export: 0, fame: 0 },
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
      [{ cost: {  }, nextSide: 3 }, { cost: { wood: 2, stone: 1 }, nextSide: 2 }],
      [],
      [{ cost: { gold: 4 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: [],
    permanent: false,
    up: false,
    flipped: false,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  // ... keep adding cards here
];