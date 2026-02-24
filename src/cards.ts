import { emptyResource, type GameCard, type ResourceMap, type Upgrade } from "./types";

export const allCards: GameCard[] = [
  { id: 0,
    name: ['welcome', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_welcome',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 1,
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_plains',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 2,
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_plains',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 3,
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_plains',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 4,
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_plains',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 5,
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_rocky_area',
      'effect_description_shallow_mines',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 6,
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_rocky_area',
      'effect_description_shallow_mines',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 7,
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      'effect_description_forest',
      '',
      'effect_description_sacred_well',
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 8,
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      'effect_description_forest',
      '',
      'effect_description_sacred_well',
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 9,
    name: ['headquarters', 'town_hall', 'castle', 'keep'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { sword: 1, fame: 3 }
      ],
      [
        { sword: 1, fame: 12 }
      ],
      [
        { sword: 1, fame: 7 }
      ],
    ],
    effects: [
      '',
      'effect_description_town_hall',
      'effect_description_castle',
      'effect_description_keep',
    ],
    upgrades: [
      [{ cost: { stone: 3, wood: 1 }, nextSide: 2 }],
      [{ cost: { stone: 4, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 6, wood: 2, metal: 1 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 10,
    name: ['trader', 'bazaar', 'festival', 'market'],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1 },
        { metal: 1, fame: 4 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      'effect_description_trader',
      'effect_description_bazaar',
      '',
      'effect_description_market',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'event', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 11,
    name: ['jungle', 'huge_trees', 'treehouses', 'deep_jungle'],
    resources: [
      [{ ...emptyResource }],
      [
        { wood: 1 }
      ],
      [
        { coin: 1, wood: 2, fame: 4 }
      ],
      [
        { wood: 2 }
      ],
    ],
    effects: [
      'effect_description_jungle',
      'effect_description_huge_trees',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 12,
    name: ['river', 'bridge', 'explorers', 'stone_bridge'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { coin: 1, fame: 4 }
      ],
      [
        { coin: 1, fame: 4 }
      ],
    ],
    effects: [
      '',
      '',
      'effect_description_explorers',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'person', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 13,
    name: ['field_worker', '', 'servant', ''],
    resources: [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      'effect_description_field_worker',
      '',
      'effect_description_servant',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 14,
    name: ['bandit', '', 'worker', ''],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      'effect_description_bandit',
      '',
      'effect_description_worker',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 15,
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_rocky_area',
      'effect_description_shallow_mines',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 16,
    name: ['bandit', '', 'field_worker', ''],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      'effect_description_bandit',
      '',
      'effect_description_field_worker',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 17,
    name: ['hill', 'chapel', 'cathedral', 'church'],
    resources: [
      [ { coin: 1 } ],
      [ { coin: 1, fame: 1 } ],
      [ { coin: 1, fame: 7 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      'effect_description_chapel',
      'effect_description_cathedral',
      'effect_description_church',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, stone: 1 }, nextSide: 2 }],
      [{ cost: { wood: 2, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { metal: 1, wood: 2, stone: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 18,
    name: ['east_cliffs', 'smithy', 'wall', 'arsenal'],
    resources: [
      [ { stone: 1 } ],
      [ { metal: 1, fame: 1 } ],
      [ { sword: 1, fame: 3 } ],
      [ { metal: 1, fame: 4 } ],
    ],
    effects: [
      '',
      'effect_description_smithy',
      'staysInPlay',
      'effect_description_arsenal',
    ],
    upgrades: [
      [{ cost: { stone: 1, wood: 1, metal: 2 }, nextSide: 2 },
        { cost: { stone: 3 }, nextSide: 3 }
      ],
      [{ cost: { coin: 2, metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 19,
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      'effect_description_forest',
      '',
      'effect_description_sacred_well',
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 20,
    name: ['swamp', 'accessible_swamp', 'exotic_fruit_trees', 'swamp_garden'],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { tradegood: 2, fame: 4 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 21,
    name: ['swamp', 'accessible_swamp', 'exotic_fruit_trees', 'swamp_garden'],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { tradegood: 2, fame: 4 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 22,
    name: ['lake', 'fishermans_cabin', 'lighthouse', 'fishing_boat'],
    resources: [
      [ { coin: 1, fame: 1 } ],
      [ { coin: 1, fame: 1 } ],
      [ { fame: 5 } ],
      [ { coin: 2, tradegood: 2, fame: 1 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_lighthouse',
      'effect_description_fishing_boat',
    ],
    upgrades: [
      [{ cost: { stone: 2, wood: 1 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { wood: 3 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 23,
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_stop_1',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 24,
    name: ['fertile_soil_efficiency', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_fertile_soil_efficiency',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 25,
    name: ['army', '', 'grand_army', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 50 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_army',
      '',
      'effect_description_grand_army',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
    choice: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x4", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x19", checked: false},
        {content: "fame x25", checked: false},
        {content: "fame x32", checked: false},
        {content: "fame x40", checked: false},
        {content: "(135) →", checked: false}
      ],
      [],
      [
        {content: "fame x10", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x40", checked: false},
        {content: "fame x50", checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 26,
    name: ['treasure', '', 'extended_treasure', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 50 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_treasure',
      '',
      'effect_description_extended_treasure',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
    choice: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x2", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x5", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x19", checked: false},
        {content: "fame x25", checked: false},
        {content: "fame x32", checked: false},
        {content: "fame x40", checked: false},
        {content: "→", checked: false},
      ],
      [],
      [
        {content: "fame x10", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x40", checked: false},
        {content: "fame x50", checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 27,
    name: ['export', '', 'mass_export', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 25 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_export',
      '',
      'effect_description_mass_export',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 28,
    name: ['volcanic_eruption', '', 'ashlands', 'young_forest'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: -2 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_volcanic_eruption',
      '',
      '',
      'effect_description_young_forest',
    ],
    upgrades: [
      [],
      [],
      [ {cost: {coin: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'land', 'land'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
      ],
    ],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 29,
    name: ['opportunist', 'recruit', 'labourer', 'pretend_noble'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1 } ],
      [ { stone: 1 } ],
      [ { fame: 4 } ],
    ],
    effects: [
      '',
      '',
      '',
      'effect_description_pretend_noble',
    ],
    upgrades: [
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 30,
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_stop_2',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 31,
    name: ['entrepreneur', 'hotel', 'tavern', 'cozy_pub'],
    resources: [
      [ { tradegood: 1 } ],
      [ { coin: 1, tradegood: 1, fame: 2 } ],
      [ { coin: 2, tradegood: 2, fame: 4 } ],
      [ { tradegood: 2, fame: 2 } ],
    ],
    effects: [
      'effect_description_entrepreneur',
      'effect_description_hotel',
      'effect_description_tavern',
      'effect_description_cozy_pub',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, tradegood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 32,
    name: ['scientist', '', 'observatory', 'lab'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 1, tradegood: 1, fame: 5 } ],
      [ { coin: 1, tradegood: 2, fame: 10 } ],
    ],
    effects: [
      'effect_description_scientist',
      '',
      'effect_description_observatory',
      'effect_description_lab',
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, metal: 1 }, nextSide: 3 }],
      [],
      [{ cost: { coin: 1, stone: 2, metal: 2 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 33,
    name: ['engineer', '', 'trebuchet', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { sword: 1, fame: 1 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_engineer',
      '',
      'effect_description_trebuchet',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 34,
    name: ['inventor', '', 'inspired_inventor', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_inventor',
      '',
      'effect_description_inspired_inventor',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 4 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [ {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 35,
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_rocky_area',
      'effect_description_shallow_mines',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 36,
    name: ['mercenary', '', 'sir__', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { sword: 1, fame: 3 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_mercenary',
      '',
      'effect_description_sir__',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 3, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false}
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 37,
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_stop_3',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 38,
    name: ['strength_in_number', '', 'military_domination', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_strength_in_number',
      '',
      'effect_description_military_domination',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 39,
    name: ['expanding_borders', '', 'maximizer', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_expanding_borders',
      '',
      'effect_description_maximizer',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 40,
    name: ['loyalty', '', 'trader_obj', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_loyalty',
      '',
      'effect_description_trader_obj',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 41,
    name: ['jester', '', 'merchant', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 15 } ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_jester',
      '',
      'effect_description_merchant',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "coin, wood", checked: false},
        {content: "coin, wood", checked: false},
        {content: "coin, wood", checked: false},
        {content: "tradegood, tradegood", checked: false},
        {content: "tradegood, tradegood", checked: false}
      ],
      [],
      [
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false}
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 42,
    name: ['field_worker', '', 'storage', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_field_worker',
      '',
      'effect_description_storage',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 43,
    name: ['mason', '', 'brick_road', 'stone_street'],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { coin: 1, fame: 3 } ],
      [ { coin: 1, fame: 7 } ],
    ],
    effects: [
      'effect_description_mason',
      '',
      'effect_description_brick_road',
      'effect_description_stone_street',
    ],
    upgrades: [
      [{ cost: { coin: 1, stone: 2 }, nextSide: 3 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 44,
    name: ['thunderstorm', '', 'rain', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_thunderstorm',
      '',
      'effect_description_rain',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 45,
    name: ['dark_knight', '', 'impressed_boy', 'squire'],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { coin: 0 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      'effect_description_dark_knight',
      '',
      'effect_description_impressed_boy',
      'effect_description_squire',
    ],
    upgrades: [
      [],
      [],
      [{ cost: { metal: 1, sword: 1 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 46,
    name: ['camp', 'training_grounds', '', 'sir__'],
    resources: [
      [ { coin: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { sword: 2, fame: 3 } ],
    ],
    effects: [
      '',
      'effect_description_training_grounds',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, metal: 1 }, nextSide: 2 }],
      [{ cost: { metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', '', 'person - knight'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 47,
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_stop_4',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 48,
    name: ['envoy', 'emissary', 'ambassador', 'diplomat'],
    resources: [
      [ emptyResource ],
      [ { fame: 1 } ],
      [ { fame: 5 } ],
      [ { fame: 2 } ],
    ],
    effects: [
      'effect_description_envoy',
      'effect_description_emissary',
      'effect_description_ambassador',
      'effect_description_diplomat',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 6 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 6 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 49,
    name: ['royal_architect', '', 'bridge_of_marvel', ''],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { fame: 15 } ],
      [],
    ],
    effects: [
      'effect_description_royal_architect',
      '',
      '',
      '',
    ],
    upgrades: [
      [ {cost: {}, nextSide: 3, otherCost: 'other_cost_destroy_stone_bridge' } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 50,
    name: ['traveller', 'traveller', 'traveller', 'traveller'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_traveller_1',
      'effect_description_traveller_2',
      'effect_description_traveller_3',
      'effect_description_traveller_4',
    ],
    upgrades: [
      [{ cost: { tradegood: 3 }, nextSide: 2 }],
      [{ cost: { tradegood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { tradegood: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 51,
    name: ['magistrate', 'magistrate', 'strategist', 'magistrate'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 5 } ],
      [ { fame: 2 } ],
    ],
    effects: [
      'effect_description_magistrate_1',
      'effect_description_magistrate_2',
      'effect_description_strategist',
      'effect_description_magistrate_3',
    ],
    upgrades: [
      [{ cost: { stone: 3 }, nextSide: 2 }],
      [{ cost: { stone: 2, metal: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 3, metal: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 52,
    name: ['mighty_mound', 'hill_settlement', 'peak_village', 'hill_village'],
    resources: [
      [ emptyResource ],
      [ { coin: 1, fame: 1 } ],
      [ { coin: 2, tradegood: 1, fame: 6 } ],
      [ { coin: 1, fame: 2 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_peak_village',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 53,
    name: ['witch', '', 'witch_cabin', ''],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      'effect_description_witch',
      '',
      'effect_description_witch_cabin',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 54,
    name: ['scribe', '', 'architect', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { stone: 1 } ],
      [],
    ],
    effects: [
      'effect_description_scribe',
      '',
      'effect_description_architect',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 5 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 55,
    name: ['lord_aethan', '', 'lord_nimrod', ''],
    resources: [
      [ { coin: 1, wood: 1, stone: 1 } ],
      [],
      [ { sword: 1 } ],
      [],
    ],
    effects: [
      'effect_description_lord_aethan',
      '',
      'effect_description_lord_nimrod',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "wood, wood", checked: false},
        {content: "wood, wood", checked: false},
        {content: "stone, stone", checked: false},
        {content: "tradegood", checked: false},
        {content: "sword", checked: false},
        {content: "metal", checked: false},
      ],
      [],
      [
        {content: "coin, coin", checked: false},
        {content: "stone, stone", checked: false},
        {content: "metal, metal", checked: false},
        {content: "sword, sword", checked: false},
        {content: "sword, sword", checked: false},
        {content: "sword, sword, sword", checked: false},
        {content: "wood", checked: false},
        {content: "metal", checked: false},
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 56,
    name: ['plague', '', 'enemy_soldier', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      'effect_description_plague',
      '',
      'effect_description_enemy_soldier',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 57,
    name: ['assassin', '', 'enemy_soldier', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      'effect_description_assassin',
      '',
      'effect_description_enemy_soldier',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 58,
    name: ['city_fire', '', 'ashlands', 'young_forest'],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      'effect_description_city_fire',
      '',
      '',
      'effect_description_young_forest',
    ],
    upgrades: [
      [],
      [],
      [ {cost: {coin: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'land', 'land'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
      ],
    ],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 59,
    name: ['mysterious_cave', 'dungeon', 'treasures', 'lost_civilization'],
    resources: [
      [ emptyResource ],
      [ { fame: 2 } ],
      [ { coin: 2, fame: 8 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      '',
      '',
      'staysInPlay',
      'effect_description_lost_civilization',
    ],
    upgrades: [
      [{ cost: {}, nextSide: 2, otherCost: 'other_cost_one_person' }],
      [{ cost: {}, nextSide: 4, otherCost: 'other_cost_two_people' }],
      [],
      [{ cost: { coin: 1, metal: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 60,
    name: ['skilled_bandit', '', 'worker', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_skilled_bandit',
      '',
      'effect_description_worker',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 61,
    name: ['dark_prince', '', 'impressed_boy', 'squire'],
    resources: [
      [ { fame: -7 } ],
      [],
      [ emptyResource ],
      [ { fame: 3 } ],
    ],
    effects: [
      'effect_description_dark_prince',
      '',
      'effect_description_impressed_boy',
      'effect_description_squire',
    ],
    upgrades: [
      [],
      [],
      [{ cost: { metal: 1, sword: 1 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 62,
    name: ['camp', 'training_grounds', '', 'sir__'],
    resources: [
      [ { coin: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { sword: 2, fame: 3 } ],
    ],
    effects: [
      '',
      'effect_description_training_grounds',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, metal: 1 }, nextSide: 2 }],
      [{ cost: { metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', '', 'person - knight'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 63,
    name: ['far_fields', 'inn', 'wall', 'innkeeper'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 2 }
      ],
      [
        { sword: 1, fame: 3 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      '',
      '',
      'staysInPlay',
      'effect_description_innkeeper',
    ],
    upgrades: [
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { coin: 6 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 64,
    name: ['skilled_bandit', '', 'field_worker', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_skilled_bandit',
      '',
      'effect_description_field_worker',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 65,
    name: ['tornado', '', 'flooding', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_tornado',
      '',
      'effect_description_flooding',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 66,
    name: ['young_princess', 'spoiled_princess', 'educated_princess', ''],
    resources: [
      [ { fame: 2 } ],
      [ emptyResource ],
      [ { fame: 8 } ],
      [],
    ],
    effects: [
      'effect_description_young_princess',
      'effect_description_spoiled_princess',
      'effect_description_educated_princess',
      '',
    ],
    upgrades: [
      [{ cost: {}, nextSide: 3, otherCost: 'other_cost_two_people_two_lands_two_buildings' }],
      [{ cost: {}, nextSide: 1, otherCost: 'other_cost_two_people' }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person - lady', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 67,
    name: ['sickness', 'crippled', 'feast', ''],
    resources: [
      [ { fame: -8 } ],
      [ { fame: -2 } ],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_sickness',
      'thisCardIsPermanent',
      'effect_description_feast',
      '',
    ],
    upgrades: [
      [
        {cost: {tradegood: 6}, nextSide: 3},
        {cost: {coin: 1}, nextSide: 2}
      ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', 'state - permanent', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 68,
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_stop_5',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 69,
    name: ['finishing_touch', '', 'banquet', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_finishing_touch',
      '',
      'effect_description_banquet',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 70,
    name: ['royal_visit', '', 'inquisitor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1 } ],
      [],
    ],
    effects: [
      'effect_description_royal_visit',
      '',
      'effect_description_inquisitor',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 71,
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      '',
      'effect_description_rocky_area',
      'effect_description_shallow_mines',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 72,
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      'effect_description_forest',
      '',
      'effect_description_sacred_well',
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 73,
    name: ['west_canyon', 'miners', 'wall', 'forced_labour'],
    resources: [
      [
        { stone: 1 },
        { metal: 1 }
      ],
      [ { stone: 1, metal: 1, fame: 2 } ],
      [ { sword: 1, fame: 3 } ],
      [ { stone: 2, metal: 2, fame: -3 } ],
    ],
    effects: [
      '',
      'effect_description_miners',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [
        { cost: { stone: 3 }, nextSide: 3 },
        { cost: { stone: 1, metal: 1, coin: 1, wood: 1 }, nextSide: 2 }
      ],
      [{ cost: { sword: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'person', 'building', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 74,
    name: ['shore', 'shipyard', 'trade_route', 'trade_ship'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { metal: 1 },
        { tradegood: 1, fame: 13 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { tradegood: 1, fame: 6 }
      ],
    ],
    effects: [
      '',
      '',
      'effect_description_trade_route',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood : 2}, nextSide: 3, otherCost: 'other_cost_two_people' }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'seafaring - ship', 'seafaring - ship'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 75,
    name: ['shore', 'shipyard', 'trade_route', 'trade_ship'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { metal: 1 },
        { tradegood: 1, fame: 13 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { tradegood: 1, fame: 6 }
      ],
    ],
    effects: [
      '',
      '',
      'effect_description_trade_route',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood : 2}, nextSide: 3, otherCost: 'other_cost_two_people' }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'seafaring - ship', 'seafaring - ship'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 76,
    name: ['pirate', '', 'skilled_ally', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [
        { sword: 1 },
        { metal: 1, fame: 3 }
      ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_pirate',
      '',
      'effect_description_skilled_ally',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 4, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person - seafaring', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 77,
    name: ['laggon', 'raft', 'sea_gate_wall', 'lush_island'],
    resources: [
      [ { coin: 1 } ],
      [ emptyResource ],
      [ { sword: 1, fame: 3 } ],
      [ { coin: 2, tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_sea_gate_wall',
      '',
    ],
    upgrades: [
      [
        { cost: { stone: 3, tradegood: 1 }, nextSide: 2 },
        { cost: { wood: 3 }, nextSide: 3 }
      ],
      [ {cost: {}, nextSide: 4} ],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'seafaring', 'building', 'land - seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 78,
    name: ['statue', 'monument', 'golden_pillar', 'obelisk'],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 5 } ],
      [ { fame: 15 } ],
      [ { fame: 10 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 79,
    name: ['villa', 'estate', 'palace', 'mansion'],
    resources: [
      [ emptyResource ],
      [ { fame: 3 } ],
      [ { fame: 12 } ],
      [ { fame: 7 } ],
    ],
    effects: [
      'effect_description_villa',
      'effect_description_estate',
      'effect_description_palace',
      'effect_description_mansion',
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 4, stone: 2 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 80,
    name: ['cooperation', '', 'favor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_cooperation',
      '',
      'effect_description_favor',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 81,
    name: ['aethan_estate', 'aethan_estate', 'aethan_estate', 'aethan_estate'],
    resources: [
      [ emptyResource ],
      [ { fame: 3 } ],
      [ { fame: 10 } ],
      [ { fame: 6 } ],
    ],
    effects: [
      '',
      'effect_description_aethan_estate_1',
      'effect_description_aethan_estate_2',
      'effect_description_aethan_estate_3',
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { wood: 3, stone: 3 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 82,
    name: ['shrine', 'sanctuary', 'temple', 'oratory'],
    resources: [
      [
        { fame: 3 }
      ],
      [
        { fame: 5 }
      ],
      [
        { fame: 15 }
      ],
      [
        { fame: 9 }
      ],
    ],
    effects: [
      'effect_description_shrine',
      'effect_description_sanctuary',
      'effect_description_temple',
      'effect_description_oratory',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 83,
    name: ['shrine', 'sanctuary', 'temple', 'oratory'],
    resources: [
      [
        { fame: 3 }
      ],
      [
        { fame: 5 }
      ],
      [
        { fame: 15 }
      ],
      [
        { fame: 9 }
      ],
    ],
    effects: [
      'effect_description_shrine',
      'effect_description_sanctuary',
      'effect_description_temple',
      'effect_description_oratory',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 84,
    name: ['mine', 'deep_mine', 'diamond_mine', 'ruby_mine'],
    resources: [
      [
        { stone: 1, metal: 1, fame: 4 }
      ],
      [
        { stone: 1, metal: 2, fame: 6 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 2, fame: 13 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 1, fame: 9 }
      ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 85,
    name: ['mine', 'deep_mine', 'diamond_mine', 'ruby_mine'],
    resources: [
      [
        { stone: 1, metal: 1, fame: 4 }
      ],
      [
        { stone: 1, metal: 2, fame: 6 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 2, fame: 13 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 1, fame: 9 }
      ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 86,
    name: ['dubbing', '', 'renovation', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_dubbing',
      '',
      'effect_description_renovation',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 87,
    name: ['quests', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_quests',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
    choice: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x6", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x27", checked: false},
        {content: "fame x35", checked: false},
        {content: "fame x45", checked: false}
      ],
      [],
      [],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 88,
    name: ['a_perfect_tower', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_a_perfect_tower',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
    choice: false,
    checkboxes: [
      [ {content: "fame x3", checked: false},
        {content: "fame x6", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x15", checked: false},
        {content: "fame x22", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x38", checked: false},
        {content: "fame x48", checked: false},
        {content: "fame x60", checked: false},
        {content: "fame x75", checked: false}
      ],
      [],
      [],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 89,
    name: ['deep_pit', 'town_well', 'pit_settlement', 'prison'],
    resources: [
      [ { stone: 1 } ],
      [ { fame: 3 } ],
      [ { wood: 1, stone: 1, fame: 1 } ],
      [ { sword: 1 } ],
    ],
    effects: [
      '',
      'effect_description_town_well',
      'effect_description_pit_settlement',
      'effect_description_prison',
    ],
    upgrades: [
      [
        { cost: { wood: 1, stone: 1 }, nextSide: 2 },
        { cost: { wood: 4 }, nextSide: 3 }
      ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "coin", checked: false},
        {content: "coin x2", checked: false},
        {content: "coin x3", checked: false}
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 90,
    name: ['jewellery', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_jewellery',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
    choice: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x2", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x5", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x28", checked: false},
        {content: "fame x40", checked: false}
      ],
      [],
      [],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 91,
    name: ['build_an_ark', '', 'the_ark', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 24 } ],
      [],
    ],
    effects: [
      'effect_description_build_an_ark',
      '',
      'effect_description_the_ark',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'seafaring', ''],
    choice: false,
    checkboxes: [
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [],
      [ {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}, 
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 92,
    name: ['___', '', '___', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description____1',
      '',
      'effect_description____2',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 93,
    name: ['treasure_hunt', 'pirate_cove', 'pirate_treasure', 'treasure_map'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 2, fame: 15 } ],
      [ { coin: 1, fame: 5 } ],
    ],
    effects: [
      '',
      'effect_description_pirate_cove',
      '',
      '',
    ],
    upgrades: [
      [ {cost: {coin: 1, wood: 1, metal: 1}, nextSide: 2} ],
      [ {cost: {sword: 1, metal: 1}, nextSide: 4, otherCost: 'other_cost_two_people' } ],
      [],
      [ {cost: {}, nextSide: 3, otherCost: 'other_cost_two_seafarings' } ],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'event', 'seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 94,
    name: ['backstabber', '', 'blood_curse', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      'effect_description_backstabber',
      '',
      'effect_description_blood_curse',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'event', ''],
    choice: true,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 95,
    name: ['astronomer', '', 'astrologist', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { sword: 1 } ],
      [],
    ],
    effects: [
      'effect_description_astronomer',
      '',
      'effect_description_astrologist',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 96,
    name: ['alchemist', 'potion_of_stregnt', 'love_potion', 'healing_potion'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_alchemist',
      'effect_description_potion_of_strength',
      'effect_description_love_potion',
      'effect_description_healing_potion',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', 'potion - item', 'potion - item', 'potion - item'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 97,
    name: ['spinning_wheel', 'silk', 'fashion', 'cloth_export'],
    resources: [
      [ { fame: 2 } ],
      [ { tradegood: 1, fame: 4 } ],
      [ { tradegood: 3, fame: 10 } ],
      [ { tradegood: 2, fame: 6 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2 }, nextSide: 2 } ],
      [ { cost: { coin: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['invention', 'invention', 'invention', 'invention'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 98,
    name: ['compass', 'navigation', 'calendar', 'astrolabe'],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 8 } ],
      [ { fame: 15 } ],
      [ { fame: 15 } ],
    ],
    effects: [
      'effect_description_compass',
      'effect_description_navigation',
      'effect_description_calendar',
      'effect_description_astrolabe',
    ],
    upgrades: [
      [],
      [],
      [ {cost: {}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'invention', 'seafaring'],
    choice: false,
    checkboxes: [
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
      ],
      [
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "tradegood", checked: false }, { content: "tradegood", checked: false },
        { content: "tradegood", checked: false }, { content: "tradegood", checked: false },
      ],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 99,
    name: ['public_punishment', 'torture_device', 'post_barbaric', 'torture_chamber'],
    resources: [
      [ { sword: 1, fame: -2 } ],
      [ { sword: 1, tradegood: 1, fame: -3 } ],
      [ { fame: 15 } ],
      [ { sword: 2, fame: -6 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { metal: 2 }, nextSide: 2 } ],
      [ { cost: { metal: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['invention', 'invention - item', 'state', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 100,
    name: ['saw_mill', 'wood_industry', 'wood_export', 'wood_shipment'],
    resources: [
      [ { wood: 3, fame: 3 } ],
      [ { wood: 4, fame: 3 } ],
      [ { tradegood: 2, fame: 4 } ],
      [
        { wood: 2 },
        { tradegood: 2, fame: 6 }
      ],
    ],
    effects: [
      '',
      'effect_description_saw_mill',
      '',
      'effect_description_wood_shipment',
    ],
    upgrades: [
      [ { cost: { wood: 3 }, nextSide: 2 } ],
      [],
      [ { cost: { coin: 4 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'seafaring'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 101,
    name: ['ploughs', 'farming_machines', 'larger_barns', 'royal_storehouse'],
    resources: [
      [ { coin: 3, fame: 4 } ],
      [ { coin: 4, fame: 8 } ],
      [ { coin: 2, fame: 3 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      '',
      'staysInPlay',
      'effect_description_larger_barns',
      'effect_description_royal_storehouse',
    ],
    upgrades: [
      [ { cost: { wood: 4 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, metal: 2 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['land - invention', 'land - invention', 'building', 'building'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 102,
    name: ['fishing_ships', 'fish_n_chips', 'fish_quota', 'fishing_excellence'],
    resources: [
      [ { coin: 3, fame: 2 } ],
      [ { coin: 2, tradegood: 2, fame: 4 } ],
      [ { coin: 2, fame: 4 } ],
      [ { fame: 13 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_fish_quota',
      'effect_description_fishing_excellence',
    ],
    upgrades: [
      [ { cost: { wood: 2, coin: 1, metal: 1 }, nextSide: 2 } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'seafaring', 'state - permanent'],
    choice: true,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 103,
    name: ['missionary', '', 'beekeeper', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1, fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_missionary',
      '',
      'effect_description_beekeeper',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 3 }, nextSide: 3 } ],
      [],
      [ { cost: {}, nextSide: 1 } ],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 104,
    name: ['priest', '', 'cardinal', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 5 } ],
      [],
    ],
    effects: [
      'effect_description_priest',
      '',
      'effect_description_cardinal',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 6, tradegood: 2 }, nextSide: 3 } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 105,
    name: ['small_hill_town', 'hill_town', 'city_on_a_hill', 'large_town'],
    resources: [
      [ { fame: 6 } ],
      [ { fame: 8 } ],
      [ { fame: 12 } ],
      [ { fame: 10 } ],
    ],
    effects: [
      'effect_description_small_hill_town',
      'effect_description_hill_town',
      'effect_description_city_on_a_hill',
      'effect_description_large_town',
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 3, stone: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { wood: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 106,
    name: ['camelot', 'camelot', 'camelot', 'camelot'],
    resources: [
      [ { fame: 15 } ],
      [ { fame: 20 } ],
      [ { fame: 30 } ],
      [ { fame: 40 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_camelot',
      '',
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 1, stone: 3, metal: 2 }, nextSide: 4 } ],
      [],
      [ { cost: { stone: 6, metal: 3 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 107,
    name: ['royal_visit', '', 'inquisitor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1 } ],
      [],
    ],
    effects: [
      'effect_description_royal_visit',
      '',
      'effect_description_inquisitor',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 108,
    name: ['ether_crystal', '', '', ''],
    resources: [
      [ { fame: 10 } ],
      [],
      [],
      [],
    ],
    effects: [
      'thisCardIsIndestructible',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['artefact - permanent', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 109,
    name: ['small_guild', 'guild', 'grand_guild_hall', 'guild_hall'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { coin: 1, wood: 1, stone: 1 } ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1, fame: 3 }
      ],
    ],
    effects: [
      '',
      '',
      'effect_description_grand_guild_hall',
      '',
    ],
    upgrades: [
      [ { cost: { wood: 2 }, nextSide: 2, otherCost: 'other_cost_one_person' } ],
      [ { cost: { stone: 2 }, nextSide: 4, otherCost: 'other_cost_two_people' } ],
      [],
      [ { cost: { stone: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false },
        { content: '', checked: false },
        { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 110,
    name: ['barn', 'large_barn', 'thriving_countryside', 'countryside'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { coin: 2, wood: 1, fame: 5 } ],
      [ { coin: 1, wood: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_thriving_countryside',
      'effect_description_countryside',
    ],
    upgrades: [
      [ {cost: { wood: 3 }, nextSide: 2} ],
      [ {cost: { wood: 6 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 6 }, nextSide: 3} ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 111,
    name: ['manor', 'large_manor', 'grand_residence', 'noble_residence'],
    resources: [
      [ { coin: 6 } ],
      [ { coin: 6 } ],
      [ { coin: 3, fame: 5 } ],
      [ { coin: 6 } ],
    ],
    effects: [
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
      'effect_description_grand_residence',
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 112,
    name: ['stable', 'stable', 'groom', 'large_stable'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_stable_1',
      'effect_description_stable_2',
      'effect_description_groom',
      'effect_description_large_stable',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'person', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 113,
    name: ['horse', '', '', ''],
    resources: [
      [ { coin: 1 } ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 114,
    name: ['horse', '', '', ''],
    resources: [
      [ { sword: 1 } ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 115,
    name: ['horse', '', '', ''],
    resources: [
      [
        { wood: 1 },
        { stone: 1 }
      ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 116,
    name: ['aric_blackwood', '', 'eadric_shadowstrike', ''],
    resources: [
      [ { coin: 2 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      'effect_description_aric_blackwood',
      '',
      'effect_description_eadric_shadowstrike',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 117,
    name: ['trade_relations', '', '', ''],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      'effect_description_trade_relations',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 118,
    name: ['small_school', 'school', 'renowned_school', 'prominent_school'],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { fame: 6 } ],
      [ { fame: 4 } ],
    ],
    effects: [
      'effect_description_small_school',
      'effect_description_school',
      'effect_description_renowned_school',
      'effect_description_prominent_school',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 119,
    name: ['trader', 'bazaar', 'festival', 'market'],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1 },
        { metal: 1, fame: 4 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      'effect_description_trader',
      'effect_description_bazaar',
      '',
      'effect_description_market',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'event', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 120,
    name: ['investor', 'investor', 'investor', 'investor'],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      'effect_description_investor_1',
      'effect_description_investor_2',
      'effect_description_investor_3',
      'effect_description_investor_4',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person - lady', 'person - lady', 'person - lady', 'person - lady'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 121,
    name: ['king_alahar', '', 'queen_jeminah', ''],
    resources: [
      [ { sword: 2, fame: -5 } ],
      [ { ...emptyResource} ],
      [ { coin: 1 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      'staysInPlay',
      '',
      'effect_description_queen_jeminah',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person - lady', ''],
    choice: true,
    checkboxes:  [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 122,
    name: ['royal_consort', '', 'royal_consort', ''],
    resources: [
      [ { coin: 1, tradegood: 2 } ],
      [ { ...emptyResource} ],
      [ { wood: 1, stone: 1 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person - lady', '', 'person - knight', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 123,
    name: ['grand_castle', 'huge_castle', 'impregnable_fortress', 'fortress'],
    resources: [
      [ { sword: 1, fame: 15 } ],
      [ { sword: 2, fame: 20 } ],
      [ { sword: 3, fame: 30 } ],
      [ { sword: 2, fame: 25 } ],
    ],
    effects: [
      'effect_description_grand_castle',
      'effect_description_huge_castle',
      'effect_description_impregnable_fortress',
      'effect_description_fortress',
    ],
    upgrades: [
      [ {cost: { wood: 2, stone: 2, metal: 2 }, nextSide: 2} ],
      [ {cost: { stone: 3, metal: 3 }, nextSide: 4} ],
      [],
      [ {cost: { stone: 4, metal: 4 }, nextSide: 3} ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 124,
    name: ['jewel_extraction', 'jewel_cutting', 'jewel_exhibit', 'jewel_polishing'],
    resources: [
      [ { stone: 1, metal: 2, tradegood: 2, fame: 15 } ],
      [ { metal: 2, tradegood: 3, fame: 18 } ],
      [ { metal: 3, tradegood: 6, fame: 25 } ],
      [ { metal: 3, tradegood: 4, fame: 21 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ {cost: { wood: 2, metal: 2 }, nextSide: 2} ],
      [ {cost: { wood: 2, metal: 3 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 2, metal: 4 }, nextSide: 2} ],
    ],
    currentSide: 1,
    type: ['event', 'event', 'event', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 125,
    name: ['large_temple', 'ornate_temple', 'temple_of_light', 'legendary_temple'],
    resources: [
      [ { stone: 1, fame: 18 } ],
      [ { fame: 22 } ],
      [ { fame: 30 } ],
      [ { fame: 28 } ],
    ],
    effects: [
      'effect_description_large_temple',
      'effect_description_ornate_temple',
      'effect_description_temple_of_light',
      'effect_description_legendary_temple',
    ],
    upgrades: [
      [ { cost: { coin: 3, tradegood: 3 }, nextSide: 2 } ],
      [ { cost: { coin: 3, stone: 3, tradegood: 3 }, nextSide: 4 } ],
      [],
      [{ cost: { tradegood: 8 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: '', checked: false}, {content: '', checked: false},
        {content: '', checked: false}, {content: '', checked: false},
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 126,
    name: ['pine_forest', 'pine_forest', 'pond', 'fish_pond'],
    resources: [
      [ { wood: 1 } ],
      [ { wood: 2 } ],
      [ { coin: 1 } ],
      [ { coin: 2, tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2, metal: 1 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 4 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 127,
    name: ['boulders', 'boulders', 'mushrooms', 'mushrooms'],
    resources: [
      [ { stone: 1 } ],
      [ { stone: 2 } ],
      [ { tradegood: 1 } ],
      [ { tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      '',
      'effect_description_mushrooms',
    ],
    upgrades: [
      [ { cost: { metal: 2 }, nextSide: 2 } ],
      [],
      [ { cost: {}, nextSide: 4, otherCost: 'other_cost_two_people' } ],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 128,
    name: ['ravine', 'chasm', 'excavation_site', 'ancient_ruins'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 1, tradegood: 1 } ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      'effect_description_excavation_site',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2, wood: 2 }, nextSide: 2 } ],
      [ { cost: {}, nextSide: 4, otherCost: 'other_cost_two_people' } ],
      [],
      [ { cost: {}, nextSide: 3, otherCost: 'other_cost_two_people' } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes:  [
      [],
      [],
      [
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }
      ],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 129,
    name: ['hot_springs', 'fountain', 'sweet_water_river', 'canals'],
    resources: [
      [ emptyResource ],
      [ { fame: 2 } ],
      [ { fame: 9 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      'effect_description_hot_springs',
      'effect_description_fountain',
      '',
      'effect_description_canals',
    ],
    upgrades: [
      [ { cost: { coin: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 2 }, nextSide: 4 } ],
      [],
      [ { cost: {}, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 130,
    name: ['town_border', 'watchtower', 'inner_wall', 'double_wall'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 4 } ],
      [ { sword: 1, fame: 3 } ],
      [ { sword: 2 } ],
    ],
    effects: [
      '',
      'effect_description_watchtower',
      'staysInPlay',
      'effect_description_double_wall',
    ],
    upgrades: [
      [
        { cost: { coin: 1, wood: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [],
      [{ cost: { wood: 2, stone: 4}, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 131,
    name: ['north_plains', 'moat', 'wall', 'moat_bridge'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 2 } ],
      [ { sword: 1, fame: 3 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      '',
      'effect_description_moat',
      'staysInPlay',
      'effect_description_moat_bridge',
    ],
    upgrades: [
      [
        { cost: { coin: 1, stone: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [{ cost: { coin: 2, metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 132,
    name: ['south_hills', 'terrace_land', 'windmill', 'wall'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 2 } ],
      [ { coin: 3, fame: 4 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
      'staysInPlay',
    ],
    upgrades: [
      [
        { cost: { wood: 3, stone: 2 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 133,
    name: ['raid', 'looting', 'plundering', 'pillaging'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 5 } ],
      [ { fame: 3 } ],
    ],
    effects: [
      'effect_description_raid',
      'effect_description_looting',
      'effect_description_plundering',
      'effect_description_pillaging',
    ],
    upgrades: [
      [ { cost: { sword: 2 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { sword: 5 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['event', 'event', 'event', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 134,
    name: ['handsome_rival', '', 'noble_ally', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 6 } ],
      [],
    ],
    effects: [
      'effect_description_handsome_rival',
      '',
      'effect_description_noble_ally',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes:  [
      [
        { content: "coin x5", checked: false },
        { content: "sword x2", checked: false },
        { content: "sword x3", checked: false },
        { content: "tradegood x3", checked: false },
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 135,
    name: ['bordering_lands', 'occupation', 'vassal_states', 'unruly_towns'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      'effect_description_bordering_lands',
      'effect_description_occupation',
      'effect_description_vassal_states',
      'effect_description_unruly_towns',
    ],
    upgrades: [
      [ { cost: { sword: 12 }, nextSide: 2 } ],
      [ { cost: { sword: 9 }, nextSide: 4 } ],
      [],
      [ { cost: { sword: 8 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'event', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 136,
    name: ['prosperity_expansion', 'hoarding', 'royal_decree', 'uprising'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_prosperity_expansion',
      'effect_description_hoarding',
      'effect_description_royal_decree',
      'effect_description_uprising',
    ],
    upgrades: [],
    currentSide: 1,
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 137,
    name: ['the_water_mill_expansion', 'efficient_farming', 'obsolete_farms', 'surplus'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_the_water_mill_expansion',
      'effect_description_efficient_farming',
      'effect_description_obsolete_farms',
      'effect_description_surplus',
    ],
    upgrades: [],
    currentSide: 1,
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 138,
    name: ['border_dispute_expansion', 'espionage', 'resistance', 'attack'],
    resources: [
      [],
      [],
      [{...emptyResource}],
      [],
    ],
    effects: [
      'effect_description_border_dispute_expansion',
      'effect_description_espionage',
      'effect_description_resistance',
      'effect_description_attack',
    ],
    upgrades: [],
    currentSide: 1,
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false }
      ],
      [],
      [],
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 139,
    name: ['welcomeToRiddingTheWoods', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_welcome_to_ridding_the_woods',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 140,
    name: ['aCertainLady', '', 'rogueLady', ''],
    resources: [
      [ { fame: 6 } ],
      [],
      [ { fame: -3 } ],
      [],
    ],
    effects: [
      'effect_description_a_certain_lady',
      '',
      'effect_description_rogue_lady',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person - lady', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 141,
    name: ['robbinLeader', '', 'sobbing', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_robbin_leader',
      '',
      'effect_description_sobbing',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [
      [
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
      ],
      [],
      [],
      []
    ],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 142,
    name: ['bandit', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_bandit_ridding_the_woods',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 143,
    name: ['robberForest', 'unsafeForest', 'peacefulForest', 'calmForest'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_robber_forest',
      'effect_description_unsafe_forest',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [ { cost: { sword: 4 }, nextSide: 2 } ],
      [],
      [],
      [ { cost: { coin: 8 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'land - enemy', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, true, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 144,
    name: ['terrifiedTown', 'uneasyTown', '_Town', 'guardedTown'],
    resources: [
      [ { sword: 1 } ],
      [ { sword: 1 } ],
      [ { sword: 2, fame: 7 } ],
      [ { sword: 2, fame: 3 } ],
    ],
    effects: [
      'effect_description_terrified_town',
      'effect_description_uneasy_town',
      'effect_description___town',
      'effect_description_guarded_town',
    ],
    upgrades: [
      [ { cost: { sword: 4 }, nextSide: 2 } ],
      [ { cost: { sword: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { sword: 5 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 145,
    name: ['bandit', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_bandit_ridding_the_woods',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 146,
    name: ['hugeRobber', '', 'prisoner', ''],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_huge_robber',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 147,
    name: ['largeRobberCamp', 'smallRobberCamp', 'richForest', 'emptyCamp'],
    resources: [
      [],
      [],
      [ { coin: 1, wood: 1, fame: 3 } ],
      [ { wood: 1 } ],
    ],
    effects: [
      'effect_description_large_robber_camp',
      'effect_description_small_robber_camp',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [ { cost: { sword: 4 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'land - enemy', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, true, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 148,
    name: ['fortGrounds', 'wall', 'smallDungeon', 'largeDungeon'],
    resources: [
      [],
      [ { fame: 3 } ],
      [],
      [],
    ],
    effects: [
      '',
      'staysInPlay',
      'effect_description_small_dungeon',
      'effect_description_large_dungeon',
    ],
    upgrades: [
      [ { cost: { stone: 4 }, nextSide: 2 },  { cost: { stone: 2 }, nextSide: 3 }  ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "→", checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 149,
    name: ['taxCollector', '', '', ''],
    resources: [
      [ { coin: 4 } ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_tax_collector',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', '', ''],
    choice: false,
    checkboxes: [
      [
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false}
      ],
      [],
      [],
      []
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 150,
    name: ['robberVeteran', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_robber_veteran',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 151,
    name: ['archeryContest', '', 'baitAndTrap', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_archery_contest',
      '',
      'effect_description_bait_and_trap',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [
      [
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "→", checked: false}
      ],
      [],
      [],
      []
    ],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 152,
    name: ['lousyGuard', 'impatientGuard', 'braveKnight', 'guard'],
    resources: [
      [ { sword: 1 } ],
      [ { sword: 1 } ],
      [ { sword: 2, fame: 13 } ],
      [ { sword: 1, fame:3 } ],
    ],
    effects: [
      'effect_description_lousy_guard',
      'effect_description_impatient_guard',
      'effect_description_brave_knight',
      '',
    ],
    upgrades: [
      [ { cost: { metal: 2 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: {  }, nextSide: 3, otherCost:  'other_cost_one_enemy'} ],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person - knight', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 153,
    name: ['treasureWagon', '', '', ''],
    resources: [
      [ { coin: 9 } ],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_treasure_wagon',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['wagon', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 154,
    name: ['powerfulPrince', '', 'prince_', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [ { fame: -12 } ],
      [],
    ],
    effects: [
      'effect_description_powerful_prince',
      '',
      'effect_description_prince__',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 155,
    name: ['largeRobberCamp', 'smallRobberCamp', 'denseForest', 'emptyCamp'],
    resources: [
      [],
      [],
      [ { wood: 3, fame: 3 } ],
      [ { wood: 1 } ],
    ],
    effects: [
      'effect_description_large_robber_camp',
      'effect_description_small_robber_camp',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { sword: 4 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'land - enemy', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, true, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 156,
    name: ['largeRobberCamp', 'smallRobberCamp', 'cliffyForest', 'emptyCamp'],
    resources: [
      [],
      [],
      [ { stone: 1, wood: 1, fame: 3 } ],
      [ { wood: 1 } ],
    ],
    effects: [
      'effect_description_large_robber_camp',
      'effect_description_small_robber_camp',
      'staysInPlay',
      '',
    ],
    upgrades: [
      [ { cost: { sword: 4 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'land - enemy', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, true, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 157,
    name: ['robberSaboteur', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_robber_saboteur',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 158,
    name: ['rebelliousMonk', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_rebellious_monk',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 159,
    name: ['bardOfThePeople', '', 'obedientBard', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_bard_of_the_people',
      '',
      'effect_description_obedient_bard',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy - person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "", checked: false},
      ],
      []
    ],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 160,
    name: ['rescuer', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_rescuer',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 161,
    name: ['rescuer', '', 'prisoner', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: 2 } ],
      [],
    ],
    effects: [
      'effect_description_rescuer',
      '',
      'effect_description_prisoner',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'state', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 162,
    name: ['oldOakTree', '', 'stump', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      'effect_description_old_oak_tree',
      '',
      'effect_description_stump',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', '', 'land', ''],
    choice: false,
    checkboxes: [
      [
        {content: "", checked: false},{content: "", checked: false},
        {content: "", checked: false},{content: "→", checked: false}
      ],
      [],
      [
        {content: "wood, wood", checked: false},{content: "wood, wood", checked: false},
        {content: "wood, wood", checked: false},{content: "wood, wood, wood", checked: false},
        {content: "wood, wood, wood", checked: false}
      ],
      []
    ],
    negative: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 163,
    name: ['druidCamp', 'druidSanctuary', 'singingForest', 'secludedForest'],
    resources: [
      [],
      [],
      [ { wood: 1, tradegood: 2, fame: 5 } ],
      [ { wood: 1 } ],
    ],
    effects: [
      'effect_description_druid_camp',
      'effect_description_druid_sanctuary',
      '',
      'effect_description_secluded_forest',
    ],
    upgrades: [
      [ { cost: { tradegood: 2, coin: 2, sword: 2 }, nextSide: 2 } ],
      [ { cost: { sword: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'land - enemy', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, true, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 164,
    name: ['hilltop', 'hillMonument', 'ceremony', 'hillMegalith'],
    resources: [
      [ { coin: 1 } ],
      [ { coin:1, fame: 4 } ],
      [ { fame: 10 } ],
      [ { coin: 1, fame: 10 } ],
    ],
    effects: [
      '',
      '',
      'effect_description_ceremony',
      'effect_description_hill_megalith',
    ],
    upgrades: [
      [ { cost: { stone: 3 }, nextSide: 2} ],
      [ { cost: { stone: 6 }, nextSide: 4} ],
      [],
      [ { cost: {  }, nextSide: 3} ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'event', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 165,
    name: ['keeperOfSecrets', 'theChase', '', 'etherConnector'],
    resources: [
      [],
      [],
      [],
      [ { fame: 10 } ],
    ],
    effects: [
      'effect_description_keeper_of_secrets',
      'effect_description_the_chase',
      '',
      'thisCardIsIndestructible',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', 'event', '', 'artefact - permanent'],
    choice: false,
    checkboxes: [
      [],
      [
        {content: "✓", checked: false},{content: "✓", checked: false},{content: "✓ →", checked: false},
        {content: "X", checked: false},{content: "X", checked: false},{content: "X effects/destroy", checked: false}
      ],
      [],
      []
    ],
    negative: [true, true, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 166,
    name: ['sheriff', '', 'fearedSheriff', ''],
    resources: [
      [],
      [],
      [ { fame: -12 } ],
      [],
    ],
    effects: [
      'effect_description_sheriff',
      '',
      'effect_description_feared_sheriff',
      ''
    ],
    upgrades: [
      [ { cost: { tradegood: 12 }, nextSide: 3} ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 167,
    name: ['treasury', '', 'famedTreasury', ''],
    resources: [
      [],
      [],
      [ { fame: 50 } ],
      [],
    ],
    effects: [
      'effect_description_treasury',
      '',
      'effect_description_famed_treasury',
      ''
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
    choice: false,
    checkboxes: [
      [
        {content: "fame", checked: false},
        {content: "fame x2", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x5", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x19", checked: false},
        {content: "fame x25", checked: false},
        {content: "fame x32", checked: false},
        {content: "fame x40", checked: false},
        {content: "→", checked: false}
      ],
      [],
      [
        {content: "fame x10", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x40", checked: false},
        {content: "fame x50", checked: false},
        {content: "fame x60", checked: false},
        {content: "fame x70", checked: false},
        {content: "fame x80", checked: false},
        {content: "fame x100", checked: false},
        {content: "fame x125", checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 168,
    name: ['outpostConstruction', 'pallisade', 'walledOutpost', 'forestOutpost'],
    resources: [
      [],
      [],
      [ { sword: 1, fame: 5 } ],
      [ { fame: 3 } ],
    ],
    effects: [
      '',
      'effect_description_pallisade',
      'effect_description_walled_outpost',
      'effect_description_forest_outpost',
    ],
    upgrades: [
      [ { cost: { wood: 4 }, nextSide: 2} ],
      [ { cost: { wood: 5 }, nextSide: 4} ],
      [],
      [ { cost: { wood: 4, stone: 4 }, nextSide: 3} ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land - building - wall', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  }
];