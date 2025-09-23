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

export const TYPE_COLORS: Record<string, string> = {
  Maritime: "#a7bed3",   // muted blue
  Bâtiment: "#cfd4d9",   // light grey
  Personne: "#f6e5a5",   // soft pastel yellow
  Evénement: "#f4c2d7",  // pastel pink
  Terrain: "#b6d7a8",    // muted green
  Ennemi: "#e6a5a5",     // soft red
  Parchemin: "#e6c2a5ff",// soft brown
  default: "#f4c2d7"
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
};

export class GameCard {
  id = -1;
  name: string[] = ["", "", "", ""];
  currentHalf = 1; // 1..4
  type = ["", "", "", ""];
  permanent = false;
  up = true;
  flipped = false;
  resources: ResourceMap[][] = [];
  effects: string[] = [];
  upgrades: Upgrade[][] = [];
  checkboxes: any;

  constructor({
    id = -1,
    name = ["", "", "", ""],
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
    name: string[];
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

  GetName(): string {
    return this.name[this.currentHalf - 1] ?? "";
  }

  GetType(): string {
    return this.type[this.currentHalf - 1] ?? "";
  }

  GetUpgrades(): Upgrade[] {
    return this.upgrades[this.currentHalf - 1] ?? [];
  }
}