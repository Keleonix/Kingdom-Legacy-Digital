// -------------------
// Types
// -------------------

export type ResourceMap = {
  gold: number;
  wood: number;
  stone: number;
  military: number;
  ingot: number;
  export: number;
  fame: number;
};

export type Checkbox = {
  content: string;
  checked: boolean;
};

export type PopupPayload = {
  originZone: string;
  originalId: number;
  editable: GameCard;
};

export const RESOURCE_KEYS: (keyof ResourceMap)[] = [
  "gold",
  "wood",
  "stone",
  "military",
  "ingot",
  "export",
  "fame"
];

export const EFFECT_KEYWORDS = [
  "effects/time",
  "effects/activate",
  "effects/destroy",
  "effects/optional",
  "effects/oneTime",
  "effects/forced",
  "effects/passive",
  "effects/description",
];

export const EFFECT_BUTTON_KEYWORDS = [
  "effects/time",
  "effects/activate",
  "effects/destroy",
  "effects/optional",
  "effects/oneTime",
];

export const TYPE_COLORS: Record<string, string> = {
  Maritime: "#a7bed3",   // muted blue
  Navire: "#a7bed3",   // muted blue
  Bâtiment: "#cfd4d9",   // light grey
  Personne: "#f6e5a5",   // soft pastel yellow
  Chevalier: "#f6e5a5",   // soft pastel yellow
  Dame: "#f6e5a5",   // soft pastel yellow
  Objectif: "#f6e5a5",   // soft pastel yellow
  Evénement: "#f4c2d7",  // pastel pink
  Terrain: "#b6d7a8",    // muted green
  Ennemi: "#e6a5a5",     // soft red
  Catastrophe: "#e6a5a5",// soft red
  Parchemin: "#e6c2a5ff",// soft brown
  Elevage: "#f8ad70ff",
  Cheval: "#f8ad70ff",
  Cargaison: "#c59f90ff",
};

export const emptyResource: ResourceMap = {
  gold: 0,
  wood: 0,
  stone: 0,
  military: 0,
  ingot: 0,
  export: 0,
  fame: 0
};

export type Upgrade = {
  cost: Partial<ResourceMap> | null;
  nextSide: number; // 1..4
  otherCost?: string;
};

export type DropPayload = {
  id: number;
  fromZone: string
};

export type EffectTiming =
  "played" |
  "endOfTurn" |
  "endOfRound" |
  "otherCardPlayed" |
  "onClick" |
  "stayInPlay" |
  "onResourceGain" |
  "onProgress" |
  "doesNothing" |
  "restrictPlay" |
  "restrictAll" |
  "onEndOfGame" |
  "onOtherCardDiscarded"
;

export class GameCard {
  id = -1;
  name: string[] = ["", "", "", ""];
  currentSide = 1; // 1..4
  type = ["", "", "", ""];
  choice = false;
  resources: Partial<ResourceMap>[][] = [];
  effects: string[] = [];
  upgrades: Upgrade[][] = [];
  checkboxes: Checkbox[][] = [];
  enemy: boolean[] = [false, false, false];
  discoverable: boolean = false;
  constructor({
    id = -1,
    name = ["", "", "", ""],
    currentSide = 1,
    type = ["", "", "", ""],
    choice = false,
    resources = [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects = ["", "", "", ""],
    upgrades = [[], [], [], []],
    enemy = [false, false, false],
  }: Partial<{
    id: number;
    name: string[];
    currentSide: number;
    type: string[];
    permanent?: boolean;
    choice?: boolean;
    resources?: ResourceMap[][];
    effects?: string[];
    upgrades?: Upgrade[][];
    enemy?: boolean[];
    discoverable?: boolean;
  }> = {}) {
    this.id = id;
    this.name = name;
    this.currentSide = currentSide;
    this.type = type;
    this.choice = choice;
    this.resources = Array.isArray(resources)
      ? resources.map((side) => side.map((r) => ({ ...emptyResource, ...r })))
      : [];
    while (this.resources.length < 4) this.resources.push([{ ...emptyResource }]);
    this.effects = effects;
    this.upgrades = upgrades;
    this.enemy = enemy;
    this.discoverable = this.discoverable;
  }

  // returns array of options for the current side
  GetResources(): Partial<ResourceMap>[] {
    return this.resources[this.currentSide - 1] ?? [{ ...emptyResource }];
  }

  GetEffect(): string {
    return this.effects[this.currentSide - 1] ?? "";
  }

  GetName(): string {
    return this.name[this.currentSide - 1] ?? "";
  }

  GetType(): string {
    return this.type[this.currentSide - 1] ?? "";
  }

  GetUpgrades(): Upgrade[] {
    return this.upgrades[this.currentSide - 1] ?? [];
  }
}
