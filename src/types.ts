// -------------------
// Types
// -------------------

import type { TranslationKeys } from "./i18n";
import type { TutorialStep } from "./tutorial";

export type ResourceMap = {
  coin: number;
  wood: number;
  stone: number;
  sword: number;
  metal: number;
  tradegood: number;
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
  "coin",
  "wood",
  "stone",
  "sword",
  "metal",
  "tradegood",
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
  seafaring: "#a7bed3",   // muted blue
  ship: "#a7bed3",   // muted blue
  building: "#cfd4d9",   // light grey
  permanent: "#dbdbdbff",   // light grey
  person: "#f6e5a5",   // soft pastel yellow
  knight: "#f6e5a5",   // soft pastel yellow
  lady: "#f6e5a5",   // soft pastel yellow
  goal: "#f6e5a5",   // soft pastel yellow
  event: "#f4c2d7",  // pastel pink
  land: "#b6d7a8",    // muted green
  enemy: "#e6a5a5",     // soft red
  scroll: "#e6c2a5ff",// soft brown
  livestock: "#f8ad70ff",
  horse: "#f8ad70ff",
  cargo: "#c59f90ff",
  default: "#f7a0c4ff",  // pastel redish pink
};

export const emptyResource: ResourceMap = {
  coin: 0,
  wood: 0,
  stone: 0,
  sword: 0,
  metal: 0,
  tradegood: 0,
  fame: 0
};

export type Upgrade = {
  cost: Partial<ResourceMap> | null;
  nextSide: number; // 1..4
  otherCost?: string;
};

export type DropPayload = {
  id: number | number[];
  fromZone: string
};

export type EffectTiming =
  | "played"
  | "endOfTurn"
  | "endOfRound"
  | "otherCardPlayed"
  | "onClick"
  | "staysInPlay"
  | "onResourceGain"
  | "onAdvance"
  | "doesNothing"
  | "restrictPlay"
  | "restrictAll"
  | "onEndOfGame"
  | "onCardsDiscarded"
  | "onUpgrade"
  | "destroyed"
  | "removed"
  | "purged"
  | "modifyProduction"
;

export class GameCard {
  id = -1;
  name: string[] = ["", "", "", ""];
  currentSide = 1; // 1..4
  type: string[] = ["", "", "", ""];
  choice = false;
  resources: Partial<ResourceMap>[][] = [];
  effects: string[] = [];
  upgrades: Upgrade[][] = [];
  checkboxes: Checkbox[][] = [];
  negative: boolean[] = [false, false, false];
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
    negative = [false, false, false],
    discoverable = false
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
    negative?: boolean[];
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
    this.negative = negative;
    this.discoverable = discoverable;
  }

  // returns array of options for the current side
  GetResources(sideIndex?: number): Partial<ResourceMap>[] {
    const index = sideIndex !== undefined ? sideIndex : (this.currentSide - 1);
    return this.resources[index] ?? [{ ...emptyResource }];
  }

  GetEffect(t: (key: TranslationKeys) => string, sideIndex?: number): string {
    const index = sideIndex !== undefined ? sideIndex : (this.currentSide - 1);
    const rawEffects = this.effects[index];
    if (!rawEffects) return "";
    
    const translateSingle = (singleEffect: string): string => {
      const normalized = singleEffect.trim();
      
      try {
        return t(normalized as TranslationKeys);
      } catch {
        return singleEffect;
      }
    };
    
    return rawEffects.split(" - ")
      .map(effect => translateSingle(effect))
      .join(" - ");
  }

  GetName(t: (key: TranslationKeys) => string, sideIndex?: number): string {
    const index = sideIndex !== undefined ? sideIndex : (this.currentSide - 1);
    return t(this.name[index] as TranslationKeys);
  }

  GetType(t: (key: TranslationKeys) => string, sideIndex?: number): string {
    const index = sideIndex !== undefined ? sideIndex : (this.currentSide - 1);
    const rawType = this.type[index];
    if (!rawType) return "";
    
    const translateSingle = (singleType: string): string => {
      const normalized = singleType.trim();
      
      try {
        return t(normalized as TranslationKeys);
      } catch {
        return singleType;
      }
    };
    
    return rawType.split(" - ")
      .map(type => translateSingle(type))
      .join(" - ");
  }

  GetUpgrades(sideIndex?: number): Upgrade[] {
    const index = sideIndex !== undefined ? sideIndex : (this.currentSide - 1);
    return this.upgrades[index] ?? [];
  }
}

export type SortMode = 'byId' | 'byType' | null;

export type ExpansionType = 'card' | 'block';

export interface ExpansionData {
  id: string;
  name: string;
  type: ExpansionType;
  iconPath: string;

  // Pour type 'card'
  cardId?: number;
  
  // Pour type 'block'
  campaignCardIds?: number[];
  deckPurgeValue?: number;
  focus?: Partial<ResourceMap>;
  permanentPurgeValue?: number;
  discoverValue?: number;
  
  // For tutorial
  tutorialSteps?: TutorialStep[];
}

export interface GameScore {
  baseGame: number;
  expansions: {
    [expansionId: string]: number;
  };
}

export interface SavedGame {
  deck: GameCard[];
  campaignDeck: GameCard[];
  playArea: GameCard[];
  discard: GameCard[];
  blockedZone: GameCard[];
  permanentZone: GameCard[];
  purgedCards: GameCard[];
  resources: ResourceMap;
  timestamp: number;
  completedExpansions: string[];
  currentExpansion: string | null;
  scores: GameScore;
}
