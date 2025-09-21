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

export const RESOURCE_KEYS: (keyof ResourceMap)[] = [
  "gold",
  "wood",
  "stone",
  "military",
  "ingot",
  "export",
  "fame"
];

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
  selectedCheckboxes: any[] | undefined;
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
    selectedCheckboxes: any[];
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