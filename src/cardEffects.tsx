import type { TranslationKeys } from "./i18n";
import { GameCard, type ResourceMap, type DropPayload, type EffectTiming, type Checkbox, RESOURCE_KEYS, emptyResource, type Upgrade } from "./types";

// -------------------
// Types
// -------------------
export type GameContext = {
  card: GameCard;
  cardsForTrigger?: GameCard[];
  zone: string;
  resources: ResourceMap;
  filterZone: (zone: string, filter: (card: GameCard) => boolean) => GameCard[],
  setResources: React.Dispatch<React.SetStateAction<ResourceMap>>;
  draw: (n: number) => void;
  effectEndTurn: () => void;
  dropToPlayArea: (payload: DropPayload) => Promise<void>;  // ← Changé
  dropToBlocked: (payload: DropPayload) => Promise<void>;   // ← Changé
  dropToDiscard: (payload: DropPayload) => Promise<void>;   // ← Changé
  dropToCampaign: (payload: DropPayload) => Promise<void>;  // ← Changé
  dropToPermanent: (payload: DropPayload) => Promise<void>; // ← Changé
  setDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPlayArea: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setDiscard: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPermanentZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setCampaignDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardList: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardListImmediate: (cards: GameCard[]) => void;
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  mill: (nbCards: number) => Promise<void>;
  openCheckboxPopup: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) => void ;
  selectResourceChoice: (options: Array<Partial<ResourceMap>>, rawInput?: boolean) => Promise<Partial<ResourceMap> | null>;
  selectCardsFromZone: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, requiredCount: number, triggeringCard?: GameCard, optionalCount?: number) => Promise<GameCard[]>;
  selectCardsFromArray: (cards: GameCard[], zone: string, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number, optionalCount?: number, zone?: string) => Promise<boolean>;
  boostProductivity: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, prodBoost: Partial<ResourceMap> | null) => Promise<boolean>;
  registerEndRoundEffect: (description: string, effect: () => Promise<void>, forceResolve?: boolean) => void;
  addCardEffect: (id: number, face: number, zone: string, effect: CardEffect, effectText: string) => void;
  fetchCardsInZone: (filter: (card: GameCard) => boolean, zone: string) => GameCard[];
  selectCardSides: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selectedSides: number[]) => void) => void;
  selectUpgradeCost: (card: GameCard, selectResource: boolean, callback: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void) => void;
  selectTextInput: (description: string, required: boolean) => Promise<string | null>;
  selectStringChoice: (description: string, choices: string[]) => Promise<string>;
  updateBlocks: (blocker: number, blocked: number[] | null) => void;
  getBlockedBy: (blocker: number) => GameCard[];
  getCardZone: (id: number) => string;
  upgradeCard: (card: GameCard, nextSide: number) => Promise<boolean>;
  handleCardUpdate: (updatedCard: GameCard, zone: string) => void;
  addDiscoverableCard: (cardId: number, force?: boolean) => void;
  hasBeenUsedThisTurn: (cardId: number, effectIndex: number) => number;
  markAsUsedThisTurn: (cardId: number, effectIndex: number) => void;
  t: (key: TranslationKeys) => string;
};

export type CardEffect = {
  description: ((t: (key: TranslationKeys) => string) => string);
  timing: EffectTiming;
  execute: (context: GameContext) => boolean | number | Promise<boolean | number>;
  requiresChoice?: boolean;
  choices?: string[];
  uses?: number;
  unusable?: boolean;
  usesPerTurn?: number;
  productionModifier?: {
    filter: (card: GameCard, t: (key: TranslationKeys) => string) => boolean;
    zones: string[] | ((t: (key: TranslationKeys) => string) => string[]);
    bonus?: Partial<ResourceMap> | ((ctx: GameContext) => Partial<ResourceMap>);
    addOptions?: (card: GameCard) => Array<Partial<ResourceMap>>;
  };
};

export type CardFameValue = {
  description: string;
  execute: (context: GameContext) => number;
};

export type CardUpgradeCost = {
  description: string;
  execute: (context: GameContext) => boolean | Promise<boolean>;
};

// -------------------
// Effects
// -------------------
const stayInPlayText: string = 'staysInPlay';

const stayInPlayEffect: CardEffect = {
  description: (t) => t('staysInPlay'),
  timing: "staysInPlay",
  execute: async function (ctx: GameContext) {
    if(ctx) {
      return false;
    }
    return true;
  }
}

// -------------------
// Private Stuff
// -------------------
const applyChoice = (ctx: GameContext, choice: Partial<ResourceMap>)=> {
  ctx.setResources(prev => {
    const next = { ...prev };
    Object.entries(choice).forEach(([k, v]) => {
      next[k as keyof ResourceMap] = (next[k as keyof ResourceMap] || 0) + v;
    });
    return next;
  });
}

function getCheckboxResources(content: string | undefined): Partial<ResourceMap> | undefined {
  if (!content || content.trim() === "") return;
  if (content.trim() === "*") return;
  
  const resources = content.split(",").map((s) => s.trim()).filter(Boolean);
  const resourceMap: Partial<ResourceMap> = {};

  resources.forEach(resource => {
    const match = resource.match(/^(\w+)\s*x(\d+)$/i); 

    if (match && RESOURCE_KEYS.includes(match[1] as keyof ResourceMap)) {
      // Format: "coin x5"
      const key = match[1] as keyof ResourceMap;
      resourceMap[key] = (resourceMap[key] || 0) + parseInt(match[2]);
    } 
    else if (RESOURCE_KEYS.includes(resource as keyof ResourceMap)) {
      // Format: "coin" - additionne au lieu d'écraser
      const key = resource as keyof ResourceMap;
      resourceMap[key] = (resourceMap[key] || 0) + 1;
    }
  });

  if (Object.keys(resourceMap).length === 0) {
    return;
  }

  return resourceMap;
}

function getLastCheckboxChecked(card: GameCard): boolean {
  const currentCheckboxes = card.checkboxes[card.currentSide - 1];
  return currentCheckboxes?.[currentCheckboxes.length - 1]?.checked ?? false;
};

function hasEnoughResources(
  available: Partial<ResourceMap>, 
  required: Partial<ResourceMap>
): boolean {
  return Object.entries(required).every(([key, value]) => {
    const resourceKey = key as keyof ResourceMap;
    const availableAmount = available[resourceKey] || 0;
    return availableAmount >= (value || 0);
  });
}

function applyResourceMapDelta(
  setResources: (fn: (prev: ResourceMap) => ResourceMap) => void,
  delta: Partial<ResourceMap> | undefined,
  deduct?: boolean
) {
  setResources(prev => {
    if(!delta) {
      return { ...prev };
    }
    const updated = { ...prev };
    for (const key in delta) {
      const resourceKey = key as keyof ResourceMap;
      const amount = delta[resourceKey] ?? 0;
      if (deduct) {
        updated[resourceKey] = (updated[resourceKey] ?? 0) - amount;
      }
      else {
        updated[resourceKey] = (updated[resourceKey] ?? 0) + amount;
      }
    }
    return updated;
  });
}

async function addResourceMapToCard(
  card: GameCard,
  added: Partial<ResourceMap> | undefined
) {
  if (!added) {
    return;
  }
  for (const key in added) {
    const resourceKey = key as keyof ResourceMap;
    const amount = added[resourceKey] ?? 0;
    for (const resourceMap of card.GetResources() ?? []) {
      resourceMap[resourceKey] = (resourceMap[resourceKey] ?? 0) + amount;
    }
  }
}

async function setResourceMapToCard(
  card: GameCard,
  added: Partial<ResourceMap> | undefined
) {
  if (!added) return;
  
  for (const key in added) {
    const resourceKey = key as keyof ResourceMap;
    const amount = added[resourceKey] ?? 0;
    
    card.resources[card.currentSide - 1] = [{ ...emptyResource }];
    
    for (const resourceMap of card.GetResources()) {
      resourceMap[resourceKey] = amount;
    }
  }
}

async function checkBoxes(
  card: GameCard,
  checkboxes: Checkbox[]
) {
  for(const checkbox of checkboxes) {
    for(const cardCheckbox of card.checkboxes[card.currentSide - 1]) {
      if (checkbox.content === cardCheckbox.content && !cardCheckbox.checked) {
        cardCheckbox.checked = true;
        break;
      }
    }
  }
}

function getResourcesCount(
  res: Partial<ResourceMap>
) {
  let resTot = 0;
  for (const key in res) {
    const resourceKey = key as keyof ResourceMap;
    resTot += (res[resourceKey] ?? 0);
  }
  return resTot;
}

async function checkNextBox(
  card: GameCard
) {
  for (const checkbox of card.checkboxes[card.currentSide - 1]) {
    if (!checkbox.checked) {
      checkbox.checked = true;
      break;
    }
  }
}

async function checkNextBoxApplyEffect(
  ctx: GameContext
) {
  for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
    if (!checkbox.checked) {
      checkbox.checked = true;
      for(const effect of cardEffectsRegistry[ctx.card.id][ctx.card.currentSide]) {
        await effect.execute(ctx);
      }
      break;
    }
  }
}

async function removeResourceFromCard(
  card: GameCard,
  removed: Partial<ResourceMap> | undefined
) {
  if (!removed) {
    return;
  }
  for (const key in removed) {
    const resourceKey = key as keyof ResourceMap;
    const amount = removed[resourceKey] ?? 0;
    for (const resourceMap of card.GetResources()) {
      resourceMap[resourceKey] = Math.max(0, (resourceMap[resourceKey] ?? 0) - amount);
    }
  }
}

// -------------------
// Get Effects
// -------------------
export const cardEffectsRegistry: Record<number, Record<number, CardEffect[]>> = {
  0: {
    1: [{ // Bienvue
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function(ctx)  {
        await ctx.upgradeCard(ctx.card, 3);
        return false;
      }
    }],
    3: [{ // Règles d'Or
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          ctx.deleteCardInZone(ctx.t('blocked'), ctx.card.id);
          return false;
        }
    }],
  },
  1: {
    2: [{ // Plaines
      description: (t) => t('effect_description_plains'),
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, coin: prev.coin + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  2: {
    2: [{ // Plaines
      description: (t) => t('effect_description_plains'),
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, coin: prev.coin + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  3: {
    2: [{ // Plaines
      description: (t) => t('effect_description_plains'),
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, coin: prev.coin + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  4: {
    2: [{ // Plaines
      description: (t) => t('effect_description_plains'),
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, coin: prev.coin + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  5: {
    2: [{ // Zone Rocheuse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => t('effect_description_shallow_mines'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  6: {
    2: [{ // Zone Rocheuse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => t('effect_description_shallow_mines'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  7: {
    1: [{ // Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        await ctx.upgradeCard(ctx.card, 2);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => t('effect_description_sacred_well'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  8: {
    1: [{ // Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        await ctx.upgradeCard(ctx.card, 2);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => t('effect_description_sacred_well'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  9: {
    2: [{ // Hôtel de Ville
      description: (t) => t('effect_description_town_hall'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    3: [{ // Château
      description: (t) => t('effect_description_castle'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    4: [{ // Donjon
      description: (t) => t('effect_description_keep'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land')) || card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0]
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
  },
  10: {
    1: [{ // Commerçante
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: (t) => t('effect_description_bazaar'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: (t) => t('effect_description_market'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 },
            { metal: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
  },
  11: {
    1: [{ // Jungle
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Arbres Géants
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, wood: prev.wood + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Cabane dans les Arbres
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  12: {
    3: [{ // Explorateurs
      description: (t) => t('effect_description_explorers'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([71, 72, 73, 74].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          await ctx.upgradeCard(ctx.card, 4);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  13: {
    1: [{ // Exploitant
      description: (t) => t('effect_description_field_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
    3: [{ // Domestique
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 }
          ]);
          if(choice) {
            applyChoice(ctx, choice);
            return true;
          }
        return false;
      }
    }],
  },
  14: {
    1: [{ // Bandit
      description: (t) => t('effect_description_bandit'),
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (card.GetResources().some((res) => (res.coin ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1);
        }
        if (selectedCards.length !== 0) {
          ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 1) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 1}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: (t) => t('effect_description_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  15: {
    2: [{ // Zone Rocheuse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => t('effect_description_shallow_mines'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  16: {
    1: [{ // Bandit
      description: (t) => t('effect_description_bandit'),
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (card.GetResources().some((res) => (res.coin ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1);
        }
        if (selectedCards.length !== 0) {
          ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 1) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 1}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: (t) => t('effect_description_field_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  17: {
    2: [{ // Chappelle
      description: (t) => t('effect_description_chapel'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([103].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Cathédrale
      description: (t) => t('none'),
      timing: "modifyProduction",
      productionModifier: {
        filter: (card: GameCard) => card.id === 17,
        zones: (t) => [t('playArea')],
        bonus: (ctx) => ({ 
          coin: ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length 
        })
      },
      execute: async function () {
        return false;
      }
    }],
    4: [{ // Eglise
      description: (t) => t('effect_description_church'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 4) {
          if (await ctx.discoverCard(
            (card) => ([104].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 4 }));
            return true;
          }
        }
        return false;
      }
    }],
  },
  18: {
    2: [{ // Forge
      description: (t) => t('effect_description_smithy'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([90].includes(card.id)),
          this.description(ctx.t),
          1
          )) {
          await ctx.upgradeCard(ctx.card, 1);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Muraille
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
    4: [{ // Armurerie
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, sword: prev.sword + ctx.filterZone(ctx.t('playArea'), (card: GameCard) => (card.GetType(ctx.t) == ctx.t('person'))).length }));
        return true;
      }
    }],
  },
  19: {
    1: [{ // Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        await ctx.upgradeCard(ctx.card, 2);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => t('effect_description_sacred_well'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  20: {

  },
  21: {

  },
  22: {
    3: [
      { // Phare
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Phare
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          await ctx.mill(1);
          return false;
        }
      },
    ],
    4: [{ // Bateau de Pêche
      description: (t) => t('effect_description_fishing_boat'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([75].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          return true;
        }
        return false;
      }
    }],
  },
  23: {
    1: [{ // STOP
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const cardsIds = [24, 25, 26, 27];
          for (const id of cardsIds) {
            ctx.addDiscoverableCard(id, true);
          }
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
  },
  24: {
    1: [{ // Terre Fertile/Efficacité
        description: (t) => t('effect_description_fertile_soil_efficiency'),
        timing: "onClick",
        execute: async function (ctx) {
          const selected: GameCard = (await ctx.selectCardsFromZone((c) => c.GetType(ctx.t) === ctx.t('land'), ctx.t('deck'), this.description(ctx.t), 1))[0];
          await addResourceMapToCard(selected, { coin: 1 });
          /* Tempo to let popup properly discard */
          await ctx.mill(0);
          await ctx.boostProductivity((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), null)
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
  },
  25: {
    1: [{ // Armée
        description: (t) => t('effect_description_army'),
        timing: "onClick",
        execute: async function (ctx) {
          let militaryToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            militaryToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.sword >= militaryToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, sword: prev.sword - militaryToPay }));
                ctx.effectEndTurn();
                break;
              }
            }
          }
          // Apply resource effect
          let lastCheckbox;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              const checkboxResources = getCheckboxResources(lastCheckbox?.content);
              if (checkboxResources) {
                await setResourceMapToCard(ctx.card, checkboxResources);
              }
              break;
            }
            lastCheckbox = checkbox;
          }
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            ctx.card.currentSide = 3;
            await ctx.discoverCard(
              (card) => ([135].includes(card.id)),
              this.description(ctx.t),
              1
            )
          }
          return false;
        }
      }],
    3: [{ // Grande Armée
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          let checkedBoxes = 0;
          const militaryToPay = [10, 10, 12, 12, 15];
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            checkedBoxes += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.sword >= militaryToPay[checkedBoxes]) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, sword: prev.sword - militaryToPay[checkedBoxes] }));
                ctx.effectEndTurn();
                break;
              }
            }
          }
          // Apply resource effect
          let lastCheckbox;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              const checkboxResources = getCheckboxResources(lastCheckbox?.content);
              if (checkboxResources) {
                await setResourceMapToCard(ctx.card, {fame: (checkboxResources.fame?? 0) + 50});
              }
              break;
            }
            lastCheckbox = checkbox;
          }
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await setResourceMapToCard(ctx.card, {fame: 100});
          }
          return false;
        }
      }],
  },
  26: {
    1: [{ // Trésor
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.coin >= goldToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, coin: prev.coin - goldToPay }));
                ctx.effectEndTurn();
                break;
              }
            }
          }
          // Apply resource effect
          let lastCheckbox;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              const checkboxResources = getCheckboxResources(lastCheckbox?.content);
              if (checkboxResources) {
                await setResourceMapToCard(ctx.card, checkboxResources);
              }
              break;
            }
            lastCheckbox = checkbox;
          }
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            ctx.card.currentSide = 3;
          }
          return false;
        }
      }],
    3: [{ // Immense Trésor
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 12;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.coin >= goldToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, coin: prev.coin - goldToPay }));
                ctx.effectEndTurn();
                break;
              }
            }
          }
          // Apply resource effect
          let lastCheckbox;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              const checkboxResources = getCheckboxResources(lastCheckbox?.content);
              if (checkboxResources) {
                await setResourceMapToCard(ctx.card, {fame: (checkboxResources.fame?? 0) + 50});
              }
              break;
            }
            lastCheckbox = checkbox;
          }
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await setResourceMapToCard(ctx.card, {fame: 100});
          }
          return false;
        }
      }],
  },
  27: {
    1: [{ // Exportation
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const oldExportValue = ctx.card.GetResources()[0].tradegood ?? 0;
          const thresholdValues = [10, 20, 30, 40, 55, 75, 100];

          if (ctx.resources.tradegood > 0) {
            await addResourceMapToCard(ctx.card, { tradegood: ctx.resources.tradegood });
            ctx.setResources(prev => ({ ...prev, tradegood: 0 }));
          }

          const newExport = ctx.card.GetResources()[0].tradegood ?? 0;
          for (const threshold of thresholdValues) {
            if (oldExportValue < threshold && newExport >= threshold) {
              switch(threshold) {
                case 10:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_10'),
                    async () => {
                      let choice = null;
                      while (choice === null) {
                        choice = await ctx.selectResourceChoice([
                          { coin: 1 },  
                          { wood: 1 },
                          { stone: 1 }
                        ]);
                      }
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType(ctx.t) === ctx.t('land')), ctx.t('deck'), this.description(ctx.t), choice);
                      }
                    },
                    false
                  );
                  break;
                case 20:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_20'),
                    async () => {
                      const card = (await ctx.selectCardsFromZone((card) => (card.GetType(ctx.t).includes(ctx.t('person'))), ctx.t('deck'), "Récompense tradegood (seuil 20): Ajoute \"Reste en Jeu\" à une personne", 1)).slice(0)[0];
                      ctx.addCardEffect(card.id, card.currentSide, ctx.t('deck'), stayInPlayEffect, stayInPlayText);
                    },
                    false
                  );
                  break;
                case 30:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_30'),
                    async () => {
                      await ctx.discoverCard(
                        (card) => [86].includes(card.id),
                        ctx.t('export') + ctx.t('eor_export_30'),
                        1,
                        0,
                        ctx.t('deck')
                      );
                    },
                    false
                  );
                  break;
                case 40:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_40'),
                    async () => {
                      let choice = null;
                      while (choice === null) {
                        choice = await ctx.selectResourceChoice([
                          { metal: 1 },  
                          { sword: 1 },
                          { tradegood: 1 }
                        ]);
                      }
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType(ctx.t) === ctx.t('building')), ctx.t('deck'), this.description(ctx.t), choice);
                      }
                    },
                    false
                  );
                  break;
                case 55:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_55'),
                    async () => {
                      let choice = null;
                      while (choice === null) {
                        choice = await ctx.selectResourceChoice([
                          { wood: 1 },  
                          { stone: 1 },  
                          { metal: 1 },  
                          { sword: 1 },
                        ]);
                      }
                      if(choice) {
                        await ctx.boostProductivity(() => (true), ctx.t('deck'), this.description(ctx.t), choice);
                      }
                    },
                    false
                  );
                  break;
                case 75:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_75'),
                    async () => {
                      await ctx.boostProductivity(() => (true), ctx.t('deck'), this.description(ctx.t), { fame: 5 });
                    },
                    false
                  );
                  break;
                case 100:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_100'),
                    async () => {
                      ctx.card.currentSide = 3;
                    },
                    false
                  );
                  break;
              }
            }
          }
          return false;
        }
      }],
    3: [{ // Exportation de Masse
        description: (t) => t('effect_description_mass_export'),
        timing: "onClick",
        execute: async function (ctx) {
          const oldExportValue = ctx.card.GetResources()[0].tradegood ?? 0;
          const thresholdValues = [25, 50, 75, 100, 150, 200, 250];

          if (ctx.resources.tradegood > 0) {
            await addResourceMapToCard(ctx.card, { tradegood: ctx.resources.tradegood });
            ctx.setResources(prev => ({ ...prev, tradegood: 0 }));
          }

          const newExport = ctx.card.GetResources()[0].tradegood ?? 0;
          for (const threshold of thresholdValues) {
            if (oldExportValue < threshold && newExport >= threshold) {
              switch(threshold) {
                case 25:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_25'),
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('land'))), ctx.t('deck'), this.description(ctx.t), { fame: 1 });
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('land'))), ctx.t('deck'), this.description(ctx.t), { fame: 1 });
                    },
                    false
                  );
                  break;
                case 50:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_50'),
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('person'))), ctx.t('deck'), this.description(ctx.t), { fame: 5 });
                    },
                    false
                  );
                  break;
                case 75:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_75'),
                    async () => {
                      await ctx.discoverCard(
                        (card) => [107].includes(card.id),
                        ctx.t('export') + ctx.t('eor_mass_export_75'),
                        1,
                        0,
                        ctx.t('deck')
                      );
                    },
                    false
                  );
                  break;
                case 100:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_100'),
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('building'))), ctx.t('deck'), this.description(ctx.t), { fame: 5 });
                    },
                    false
                  );
                  break;
                case 150:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_150'),
                    async () => {
                      const card = (await ctx.selectCardsFromZone(
                          (card) => (card.id !== ctx.card.id && card.checkboxes.length !== 0),
                          ctx.t('permanentZone'),
                          ctx.t('export') + ctx.t('eor_mass_export_150'),
                          1
                      ))[0];
                      const subCtx = ctx;
                      subCtx.card = card;
                      await checkNextBoxApplyEffect(subCtx);
                    },
                    false
                  );
                  break;
                case 200:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_200'),
                    async () => {
                      const cards = ctx.fetchCardsInZone(
                        (card) => (card.id !== ctx.card.id && card.checkboxes.length !== 0),
                        ctx.t('permanentZone')
                      );
                      const subCtx = ctx;
                      for(const card of cards) {
                        subCtx.card = card;
                        await checkNextBoxApplyEffect(subCtx);
                      }
                    },
                    false
                  );
                  break;
                case 250:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_250'),
                    async () => {
                      await ctx.discoverCard(
                        (card) => [117].includes(card.id),
                        ctx.t('export') + ctx.t('eor_mass_export_250'),
                        1,
                        0,
                        ctx.t('deck')
                      );
                    },
                    false
                  );
                  break;
              }
            }
          }
          return false;
        }
      }],
  },
  28: {
    1: [{ // Eruption Volcanique
      description: (t) => t('effect_description_volcanic_eruption'),
      timing: "otherCardPlayed",
      execute: async function (ctx) {
        const selectableCards = [];
        for (const card of (ctx.cardsForTrigger?? [])) {
          if (card.GetType(ctx.t).includes(ctx.t('land'))) selectableCards.push(card);
        }
        if(selectableCards.length !== 0) {
          ctx.deleteCardInZone(ctx.t('playArea'), (await ctx.selectCardsFromArray(selectableCards, ctx.t('playArea'), this.description(ctx.t), 1))[0].id);
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Jeune Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if(!getLastCheckboxChecked(ctx.card)) {
          let i = 0;
          await checkNextBox(ctx.card);
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if(!checkbox.checked){
              i++;
            }
          }
          if (i % 2 === 0) {
            await addResourceMapToCard(ctx.card, { wood: 1 });
          }
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  29: {
    4: [{ // Prétendu Noble
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedSides = await new Promise<number[]>((resolve) => {
          ctx.selectCardSides(ctx.card, 1, 0, resolve);
        });
        const resourcesCount = getResourcesCount(ctx.card.resources[selectedSides[0] - 1][0]);
        if (selectedSides.length > 0 && ((selectedSides[0] !== 4 && resourcesCount <= 1) || (selectedSides[0] === 4 && resourcesCount <= 4))) {
          const targetSide = selectedSides[0];
          
          const resourceChoice = await ctx.selectResourceChoice([
            { coin: 1 }, { wood: 1 }, { stone: 1 }, { metal: 1 }, {sword: 1} 
          ]);
          
          if (resourceChoice) {
            ctx.card.resources[targetSide - 1].forEach(option => {
              Object.entries(resourceChoice).forEach(([key, value]) => {
                option[key as keyof ResourceMap] = 
                  (option[key as keyof ResourceMap] || 0) + value;
              });
            });
          }
          else {
            return false;
          }
          
          ctx.handleCardUpdate(ctx.card, ctx.zone);
          await ctx.upgradeCard(ctx.card, 1);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  30: {
    1: [{ // STOP !
      description: (t) => t('effect_description_stop_2'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 31 && card.id <= 34), ctx.t('campaign'), this.description(ctx.t), 2)).splice(0);
        const ids = [31, 32, 33, 34];

        ctx.setDeck((d) => [...d, ...cards]);
        
        for (const id of ids) {
          ctx.deleteCardInZone(ctx.t('campaign'), id);
        }

        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }],
  },
  31: {
    1: [{ // Entrepreneur
      description: (t) => t('effect_description_etrepeneur'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 118, ctx.t('effect_description_etrepeneur'), 1)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Hôtel
      description: (t) => t('effect_description_hotel'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => (
          { ...prev, coin: prev.coin + ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length }
        ));
        ;
        return true;
      }
    }],
    3: [{ // Taverne
      description: (t) => t('effect_description_tavern'),
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => card.id === 87, ctx.t('effect_description_tavern'), 1)).valueOf();
      }
    }],
    4: [{ // Bar Confortable
      description: (t) => t('effect_description_cozy_pub'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === 92, ctx.t('campaign')).length !== 1) return false;
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1)).splice(0)[0];
        if(card && (await ctx.discoverCard((card) => card.id === 92, ctx.t('effect_description_cozy_pub'), 1)).valueOf()) {
          ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          return true;
        }
        return false;
      }
    }],
  },
  32: {
    1: [{ // Scientifique
      description: (t) => t('none'),
      timing: "modifyProduction",
      productionModifier: {
        filter: (card: GameCard, t) => card.GetType(t!).includes(t!('person')),
        zones: (t) => [t('playArea')],
        bonus: { coin: 1 }
      },
      execute: async function (ctx) {
        if (ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Observatoire
      description: (t) => t('effect_description_observatory'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 95, this.description(ctx.t), 1)) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
    4: [{ // Laboratoire
      description: (t) => t('effect_description_lab'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 96, this.description(ctx.t), 1)) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
  },
  33: {
    1: [{ // Ingénieur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = [ctx.t('lumberjack'), ctx.t('food_barns'), ctx.t('fishing_boat')];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName(ctx.t)), ctx.t('playArea'), this.description(ctx.t), 1)).slice(0)[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (100 + cardsNames.indexOf(card.GetName(ctx.t))), this.description(ctx.t), 1);
          if (discovered) {
            ctx.deleteCardInZone(ctx.t('playArea'), card.id);
            await new Promise(resolve => setTimeout(resolve, 100));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Trébuchet
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const playAreaCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
        const discardCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        const permanentCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('permanentZone'));
        const card = (await ctx.selectCardsFromArray([...playAreaCards, ...discardCards, ...permanentCards], ctx.t('playArea'), this.description(ctx.t), 1)).splice(0)[0];
        if (card) {
          let zone = ctx.t('playArea')

          if (discardCards.includes(card)) {
            zone = ctx.t('discard');
          }
          else if (permanentCards.includes(card)) {
            zone = ctx.t('permanentZone');
          }

          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          ctx.deleteCardInZone(zone, card.id);

          const subCtx = ctx;
          subCtx.card = ctx.fetchCardsInZone((c) => c.id === 25, ctx.t('permanentZone'))[0];
          subCtx.zone = ctx.t('permanentZone');
          
          await checkNextBoxApplyEffect(subCtx);
        }
        return false;
      }
    }],
  },
  34: {
    3: [{ // Inventrice Inspirée
      description: (t) => t('effect_description_inspired_inventor'),
      timing: "onClick",
      execute: async function (ctx) {
        let choice = 'Resources';
        if (ctx.fetchCardsInZone((card) => card.id >= 97 && card.id <= 99, ctx.t('campaign')).length !== 0) {
          choice = await ctx.selectStringChoice(
            "Resources or Invention?",
            ["Resources", "Invention"]
          );
        }
        let checkedBoxes = 1;
        for (const checkbox of ctx.card.checkboxes[0]) {
          if (checkbox.checked) checkedBoxes++;
        }
        if(checkedBoxes > 3) checkedBoxes = 3;

        if (choice.includes('Resources')) {
          const resourcesChoice = [
            {coin: checkedBoxes},
            {wood: checkedBoxes},
            {stone: checkedBoxes},
            {metal: checkedBoxes},
            {sword: checkedBoxes},
            {tradegood: checkedBoxes}
          ];
          
          const selectedResource = await ctx.selectResourceChoice(resourcesChoice);
          
          if (selectedResource !== null) {
            ctx.setResources(prev => {
              const next = { ...prev };
              for (const key in selectedResource) {
                const resourceKey = key as keyof ResourceMap;
                next[resourceKey] = (next[resourceKey] || 0) + (selectedResource[resourceKey] || 0);
              }
              return next;
            });
            await ctx.upgradeCard(ctx.card, 1);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await checkNextBox(ctx.card);
            return true;
          }
        }
        else {
          if((await ctx.discoverCard(
            (card) => card.id >= 97 && card.id <= 99, 
            this.description(ctx.t), 
            1
          )).valueOf()) {
            await ctx.upgradeCard(ctx.card, 1);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await checkNextBox(ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
  },
  35: {
    2: [{ // Zone Rocheuse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => t('effect_description_shallow_mines'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  36: {
    1: [{ // Mercenaire
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        return new Promise<boolean>((resolve) => {
          ctx.openCheckboxPopup(ctx.card, 1, 1, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
              }
              await checkBoxes(ctx.card, boxes);
              ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      }
    }],
    3: [
        { // Sir ___
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.metal >= 3) {
            await addResourceMapToCard(ctx.card, { sword: 1});
            ctx.setResources(prev => ({ ...prev, metal: prev.metal - 3 }));
            ctx.effectEndTurn();
            this.unusable = true;
            return false;
          }
          return false;
        }
      },
      { // Sir ___
        description: (t) => t('none'),
        timing: "onClick",
        uses: 0,
        execute: async function (ctx) {
          if(ctx.resources.metal >= 4) {
            await addResourceMapToCard(ctx.card, { sword: 1});
            ctx.setResources(prev => ({ ...prev, metal: prev.metal - 4 }));
            ctx.effectEndTurn();
            this.unusable = true;
            return false;
          }
          return false;
        }
      }
    ],
  },
  37: {
    1: [{ // STOP
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const cardsIds = [38, 39, 40, 41, 42];
          for (const id of cardsIds) {
            ctx.addDiscoverableCard(id, true);
          }
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
  },
  38: {

  },
  39: {

  },
  40: {

  },
  41: {
    1: [
      { // Bouffon
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          await ctx.mill(1);
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                await checkBoxes(ctx.card, boxes);
                resolve(true);
              } else {
                resolve(false);
              }
            });
          });
        }
      }
    ],
    3: [{ // Marchande
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 1, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                await checkBoxes(ctx.card, boxes);
                resolve(true);
              } else {
                resolve(false);
              }
            });
          });
        }
    }],
  },
  42: {
    1: [{ // Exploitant
      description: (t) => t('effect_description_field_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
    3: [
      { // Grenier
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Grenier
        description: (t) => t('effect_description_storage'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone(
            (card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1
          );
          if (!selected || selected.length === 0) return false;

          if(ctx.setTemporaryCardListImmediate) {
            ctx.setTemporaryCardListImmediate(selected);
          }
          else {
            ctx.setTemporaryCardList(selected);
          }

          return true;
        }
      },
    ]
  },
  43: {
    1: [{ // Maçon
      description: (t) => t('effect_description_mason'),
      timing: "onClick",
      execute: async function (ctx) {
        if(ctx.resources.coin >= 2) {
          if (await ctx.discoverCard(
            (card) => ([88, 89].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Route Pavée
        description: (t) => t('effect_description_brick_road'),
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([109, 110].includes(card.id)),
            ctx.t('campaign'),
            this.description(ctx.t),
            1
          );
          const card = cards[0];
          if (card) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('campaign')});
            const id = (card.id === 109) ? 110 : 109;
            ctx.deleteCardInZone(ctx.t('campaign'), id);
            ctx.effectEndTurn();
            return false;
          }
          return false;
        }
      }],
      4: [{ // Rue Pavée
        description: (t) => t('effect_description_stone_street'),
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([111, 112].includes(card.id)),
            ctx.t('campaign'),
            this.description(ctx.t),
            1
          );
          const card = cards[0];
          if (card) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('campaign')});
            const id = (card.id === 111) ? 112 : 111;
            ctx.deleteCardInZone(ctx.t('campaign'), id);
            ctx.effectEndTurn();
            return false;
          }
          return false;
        }
      }],
  },
  44: {
    1: [{ // Orage
      description: (t) => t('none'),
      timing: "played",
      execute: async function (ctx) {
        await ctx.mill(3);
        await ctx.upgradeCard(ctx.card, 3);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [
      { // Pluie
        description: (t) => t('none'),
        timing: "onResourceGain",
        execute: async function (ctx) {
          const card = (ctx.cardsForTrigger?ctx.cardsForTrigger:[])[0];
          if(card.GetType(ctx.t).includes(ctx.t('land'))) {
            applyResourceMapDelta(ctx.setResources, ctx.resources);
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "restrictPlay",
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 1);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ]
  },
  45: {
    1: [
      { // Chevalier Noir
        description: (t) => t('none'),
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3}));
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    },
    ],
    3: [{ // Garçon Admiratif
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          ctx.setResources(prev => ({ ...prev, sword: prev.sword + 2 }));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
    4: [{ // Ecuyer
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, sword: prev.sword + 3 }));
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  46: {
    2: [{ // Camp d'Entrainement
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.coin >= 1) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, sword: prev.sword + 1 }));
            return true;
          }
          return false;
        }
      }]
  },
  47: {
    1: [{ // STOP !
      description: (t) => t('effect_description_stop_3'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 48 && card.id <= 51), ctx.t('campaign'), this.description(ctx.t), 2)).splice(0);
        const ids = [48, 49, 50, 51];

        ctx.setDeck((d) => [...d, ...cards]);
        
        for (const id of ids) {
          ctx.deleteCardInZone(ctx.t('campaign'), id);
        }

        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }],
  },
  48: {
    1: [{ // Envoyé
      description: (t) => t('effect_description_envoy'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([119].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    2: [{ // Emissaire
      description: (t) => t('effect_description_emissary'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([120].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    3: [{ // Ambassadeur
      description: (t) => t('effect_description_ambassador'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([121].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    4: [{ // Diplomate
      description: (t) => t('effect_description_diplomat'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([122].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
  },
  49: {
    1: [{ // Architecte Royal
      description: (t) => t('effect_description_royal_architect'),
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = [ctx.t('castle'), ctx.t('diamond_mine'), ctx.t('temple')];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName(ctx.t)), ctx.t('playArea'), this.description(ctx.t), 1)).slice(0)[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (123 + cardsNames.indexOf(card.GetName(ctx.t))), this.description(ctx.t), 1);
          if (discovered) {
            ctx.deleteCardInZone(ctx.t('playArea'), card.id);
            await new Promise(resolve => setTimeout(resolve, 100));
            return true;
          }
        }
        return false;
      }
    }],
  },
  50: {
    1: [{ // Voyageur
      description: (t) => t('effect_description_traveller_1'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([126].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Voyageur
      description: (t) => t('effect_description_traveller_2'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([127].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [
      { // Voyageur
        description: (t) => t('effect_description_traveller_3'),
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([129].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_traveller_3'),
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'), this.description(ctx.t), 1);
          const card = cards[0];
          if (card) {
            const choice1 = await ctx.selectResourceChoice([
              { coin: 1 },  
              { wood: 1 },
              { stone: 1 },
              { sword: 1 },
              { metal: 1 },
              { tradegood: 1 },
            ]);
            if (!choice1) {
              return false;
            }
            const choice2 = await ctx.selectResourceChoice([
              { coin: 1 },  
              { wood: 1 },
              { stone: 1 },
              { sword: 1 },
              { metal: 1 },
              { tradegood: 1 },
            ]);
            if(choice2) {
              applyChoice(ctx, choice1);
              applyChoice(ctx, choice2);
              ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              return true;
            }
          }
          return false;
        }
      },
    ],
    4: [{ // Voyageur
      description: (t) => t('effect_description_traveller_4'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([128].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  51: {
    1: [{ // Magistrat
      description: (t) => t('effect_description_magistrate_1'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([130].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Magistrat
      description: (t) => t('effect_description_magistrate_2'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([131].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [{ // Stratège
      description: (t) => t('effect_description_strategist'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.GetName(ctx.t).includes(ctx.t('wall')) || card.GetType(ctx.t).includes(ctx.t('knight')),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card
        );
        const card = cards[0];
        if (card) {
          ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    4: [{ // Magistrat
      description: (t) => t('effect_description_magistrate_3'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([132].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  52: {
    3: [{ // Village Culminant
      description: (t) => t('effect_description_peak_village'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([105].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          await ctx.upgradeCard(ctx.card, 1);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  53: {
    1: [
      { // Sorcière
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3 }));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_witch'),
        timing: "onClick",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 3, ctx.card);
            if(selected.length !== 0) {
              for (const card of selected) {
                ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')})
              }
              await ctx.upgradeCard(ctx.card, 3);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              return true;
            }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_witch'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, ctx.t('campaign'))
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description(ctx.t), 2);
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Hutte de la Sorcière
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3 }));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_witch_cabin'),
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card))[0];
          if (card) {
            ctx.deleteCardInZone(ctx.t('playArea'), card.id);
            ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_witch_cabin'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, ctx.t('campaign'))
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description(ctx.t), 2);
          ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          return false;
        }
      }
    ]
  },
  54: {
    1: [{ // Scribe
      description: (t) => t('effect_description_scribe'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Architecte
      description: (t) => t('effect_description_architect'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([78, 79].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          await ctx.upgradeCard(ctx.card, 1);
          await ctx.dropToDiscard({id: ctx.card.id, fromZone: ctx.zone})
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  55: {
    1: [
      { // Lord Aethan
        description: (t) => t('effect_description_lord_aethan'),
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([80, 81].includes(card.id)),
            this.description(ctx.t),
            1
          )) {
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                await checkBoxes(ctx.card, boxes);
              }
              resolve(false);
            });
          });
        }
      }
    ],
    3: [
      { // Lord Nimrod
        description: (t) => t('effect_description_lord_nimrod'),
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([133, 134].includes(card.id)),
            this.description(ctx.t),
            2
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                await checkBoxes(ctx.card, boxes);
                resolve(true);
              } else {
                resolve(false);
              }
            });
          });
        }
      }
    ],
  },
  56: {
    1: [
      { // Peste
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_plague'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('deck'), this.description(ctx.t), 2);
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      },
    ],
    3: [
      { // Soldat Ennemi
        description: (t) => t('effect_description_enemy_soldier'),
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType(ctx.t).includes(ctx.t('land')) || card.GetType(ctx.t).includes(ctx.t('building')));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1);
          }
          if (selectedCards.length !== 0) {
            ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
          }
          return false;
        }
      },
      {
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const blocked = ctx.getBlockedBy(ctx.card.id)[0];
          if (blocked) {
            ctx.deleteCardInZone(ctx.t('deck'), blocked.id);
            ctx.updateBlocks(ctx.card.id, null);
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_enemy_soldier'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 2 }));
            ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          }
          return false;
        }
      },
    ]
  },
  57: {
    1: [
      { // Assassin
        description: (t) => t('effect_description_assassin'),
        timing: "otherCardPlayed",
        execute: async function (ctx) {
          const selectableCards = [];
          for (const card of (ctx.cardsForTrigger?? [])) {
            if (card.GetType(ctx.t).includes(ctx.t('person'))) selectableCards.push(card);
          }
          if(selectableCards.length !== 0) {
            ctx.deleteCardInZone(ctx.t('playArea'), (await ctx.selectCardsFromArray(selectableCards, ctx.t('playArea'), this.description(ctx.t), 1))[0].id);
            await ctx.upgradeCard(ctx.card, 3);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3 }));
            await ctx.upgradeCard(ctx.card, 3);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      }
    ],
    3: [
      { // Soldat Ennemi
        description: (t) => t('effect_description_enemy_soldier'),
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType(ctx.t).includes(ctx.t('land')) || card.GetType(ctx.t).includes(ctx.t('building')));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1);
          }
          if (selectedCards.length !== 0) {
            ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
          }
          return false;
        }
      },
      {
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const blocked = ctx.getBlockedBy(ctx.card.id)[0];
          if (blocked) {
            ctx.deleteCardInZone(ctx.t('deck'), blocked.id);
            ctx.updateBlocks(ctx.card.id, null);
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 2 }));
            ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          }
          return false;
        }
      }
    ],
  },
  58: {
    1: [
      { // Ville en Flamme
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_city_fire'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), 1);
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      },
    ],
    4: [{ // Jeune Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if(!getLastCheckboxChecked(ctx.card)) {
          let i = 0;
          await checkNextBox(ctx.card);
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if(!checkbox.checked){
              i++;
            }
          }
          if (i % 2 === 0) {
            await addResourceMapToCard(ctx.card, { wood: 1 });
          }
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  59: {
    3: [{ // Trésor
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Civilisation Oubliée
      description: (t) => t('effect_description_lost_civilization'),
      timing: "onClick",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((card) => !card.negative[card.currentSide - 1] && card.id !== ctx.card.id, ctx.t('playArea')).length < 7) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1] && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 6);
        if (cards.length === 6) {
          if (await ctx.discoverCard((card) => [108].includes(card.id), this.description(ctx.t), 1)) {
            for(const card of cards) {
              ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
            }
            return true;
          }
        }
        return false;
        }
    }],
  },
  60: {
    1: [{ // Bandit d'Elite
      description: (t) => t('effect_description_skilled_bandit'),
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (card.GetResources().some(
            (res) => ((res.coin ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.metal ?? 0) + (res.sword ?? 0) + (res.tradegood ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 3);
        }
        if (selectedCards.length !== 0) {
          for (const card of selectedCards) {
            ctx.dropToBlocked({id: card.id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [card.id]);
          }
        }
        return false;
      }
    },
    {
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
            return false;
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: (t) => t('effect_description_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  61: {
    1: [
      { // Prince des Ténèbres
        description: (t) => t('none'),
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 5) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 5}));
            await ctx.upgradeCard(ctx.card, 3);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
    ],
    3: [{ // Garçon Admiratif
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          ctx.setResources(prev => ({ ...prev, sword: prev.sword + 2 }));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
    4: [{ // Ecuyer
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, sword: prev.sword + 3 }));
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  62: {
    2: [{ // Camp d'Entrainement
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.coin >= 1) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, sword: prev.sword + 1 }));
            return true;
          }
          return false;
        }
      }]
  },
  63: {
    3: [{ // Muraille
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Aubergiste
      description: (t) => t('effect_description_innkeeper'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1);
        if (selected.length === 1) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.dropToDiscard({id: selected[0].id, fromZone: ctx.t('playArea')});
            return true;
          }
        }
        return false;
      }
    }],
  },
  64: {
    1: [{ // Bandit d'Elite
      description: (t) => t('effect_description_skilled_bandit'),
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (card.GetResources().some(
            (res) => ((res.coin ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.metal ?? 0) + (res.sword ?? 0) + (res.tradegood ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 3);
        }
        if (selectedCards.length !== 0) {
          for (const card of selectedCards) {
            ctx.dropToBlocked({id: card.id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [card.id]);
          }
        }
        return false;
      }
    },
    {
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 3}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
            return false;
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: (t) => t('effect_description_field_worker'),
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(selectedCards[0].GetResources());
            if(choice) {
              applyChoice(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  65: {
    1: [
      { // Tornade
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_tornado'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone(
            (card) => (!(card.negative[card.currentSide - 1])),
            ctx.t('deck'),
            this.description(ctx.t),
            3
          );
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Innodations
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_flooding'),
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType(ctx.t).includes(ctx.t('building')));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 5);
          }
          if (selectedCards.length !== 0) {
            for (const card of selectedCards) {
              ctx.dropToBlocked({id: card.id, fromZone: ctx.zone});
              ctx.updateBlocks(ctx.card.id, [card.id]);
            }
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_flooding'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const blockedCards = ctx.getBlockedBy(ctx.card.id);
          ctx.updateBlocks(ctx.card.id, null);
          let selected: GameCard[] = [];
          if (!blockedCards || blockedCards.length === 0) {
            selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1], ctx.t('deck'), this.description(ctx.t), 2);
          }
          else {
            const blockedIds = blockedCards.map((card) => card.id);
            selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1] && !blockedIds.includes(card.id), ctx.t('deck'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
            if (selected.length !== 2) {
              selected = [];
              while (selected.length !== 1) {
                selected = await ctx.selectCardsFromArray(blockedCards, ctx.t('deck'), this.description(ctx.t), 1);
              }
              ctx.deleteCardInZone(ctx.t('deck'), selected[0].id);
              ctx.deleteCardInZone(ctx.t('deck'), ctx.card.id);
              return false;
            }
          }
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          ctx.deleteCardInZone(ctx.t('deck'), ctx.card.id);
          return false;
        }
      }
    ]
  },
  66: {
    1: [{ // Jeune Princesse
        description: (t) => t('effect_description_young_princess'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
          if (selected.length !== 2) {
            await ctx.upgradeCard(ctx.card, 2);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      }],
      2: [{ // Princesse Pourrie Gâtée
        description: (t) => t('effect_description_spoiled_princess'),
        timing: "played",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 2);
          for (const card of selected) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          return false;
        }
      }],
      3: [{ // Princesse Bien Elevée
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice1) {
            applyChoice(ctx, choice1);
            return true;
          }
          return false;
        }
      }]
  },
  67: {
    1: [{ // Maladie
        description: (t) => t('none'),
        timing: "played",
        execute: async function (ctx) {
          await ctx.mill(1);
          return false;
        }
      }],
      3: [{ // Festin
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice1) {
            applyChoice(ctx, choice1);
            return true;
          }
          return false;
        }
      }]
  },
  68: {
    1: [{ // STOP
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const cardsIds = [69, 70];
          for (const id of cardsIds) {
            ctx.addDiscoverableCard(id, true);
          }
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
  },
  69: {
    1: [{ // Touche Finale
        description: (t) => t('effect_description_finishing_touch'),
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1))[0];
          if (card) {
            await addResourceMapToCard(card, {tradegood: 1, fame: 5});
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }],
      3: [{ // Festin
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice3) {
            return false;
          }
          const choice4 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice4) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            applyChoice(ctx, choice4);
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }]
  },
  70: {
    1: [{ // Visite Royale
      description: (t) => t('effect_description_royal_visit'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          ctx.t('playArea'), 
          this.description(ctx.t), 
          1
        );
        
        if (cards.length === 0) {
          return false;
        }
        
        const selectedCard = cards[0];
        
        await new Promise<void>((resolve) => {
          ctx.selectUpgradeCost(selectedCard, true, (upgradeIndex, resourceKey) => {
            const upgrade = selectedCard.upgrades[selectedCard.currentSide - 1][upgradeIndex];
            if (upgrade.cost && upgrade.cost[resourceKey]) {
              upgrade.cost[resourceKey] = Math.max(0, upgrade.cost[resourceKey] - 1);
              
              if (upgrade.cost[resourceKey] === 0) {
                delete upgrade.cost[resourceKey];
              }
            }
            
            ctx.replaceCardInZone(ctx.t('playArea'), selectedCard.id, selectedCard);
            resolve();
          });
        });
        return true;
      }
    }],
    3: [{ // Inquisitrice
      description: (t) => t('effect_description_inquisitor'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length === 1) {
          ctx.deleteCardInZone(ctx.t('playArea'), selected[0].id);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
        return false;
      }
    }]
  },
  71: {
    2: [{ // Zone Rocheuse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => t('effect_description_shallow_mines'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  72: {
    1: [{ // Forêt
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        await ctx.upgradeCard(ctx.card, 2);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => t('effect_description_sacred_well'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  73: {
    3: [{ // Muraille
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
  },
  74: {
    3: [{ // Route Commerciale
      description: (t) => t('effect_description_trade_route'),
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description(ctx.t),
          1
        );
        return false;
      }
    }],
  },
  75: {
    3: [{ // Route Commerciale
      description: (t) => t('effect_description_trade_route'),
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description(ctx.t),
          1
        );
        return false;
      }
    }],
  },
  76: {
    1: [
      { // Pirate
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function () {return false;}
      },
      {
        description: (t) => t('none'),
        timing: "onResourceGain",
        execute: async function (ctx) {
          if (ctx.resources.coin > 0) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
          }
        return false;
        }
      },
      {
        description: (t) => t('effect_description_pirate'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            if ((await ctx.discoverCard((card) => [77].includes(card.id), this.description(ctx.t), 1))) {
              ctx.setResources(prev => ({ ...prev, sword: prev.sword - 2}));
              ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
            }
          }
          return false;
        }
      },
    ],
    3: [{ // Précieux Allié
      description: (t) => t('effect_description_skilled_ally'),
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => [93].includes(card.id), this.description(ctx.t), 1));
      }
    }],
  },
  77: {
    3: [{ // Sea Gate Wall
      description: (t) => t('effect_description_sea_gate_wall'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('discard'), this.description(ctx.t), 1);
        if (selected.length !== 0) {
          ctx.dropToPlayArea({id: selected[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
  },
  78: {

  },
  79: {
    1: [{ // Villa
      description: (t) => t('effect_description_villa'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Demeure
      description: (t) => t('effect_description_estate'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Palais
      description: (t) => t('effect_description_palace'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Manoir
      description: (t) => t('effect_description_mansion'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
  },
  80: {
    1: [{ // Coopération
      description: (t) => t('effect_description_cooperation'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 2);
        if (selected.length !== 2) {
          return false
        }
        const choice1 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            for (const card of selected) {
              ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
            }
            await ctx.upgradeCard(ctx.card, 3);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        return false;
      }
    }],
    3: [
      { // Faveur
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice([
            { coin: 1 },  
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 },
          ]);
          if(choice) {
            applyChoice(ctx, choice);
            await ctx.upgradeCard(ctx.card, 1);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        return false;
        }
      }
    ]
  },
  81: { // TODO : Test purge
    2: [{ // Domaine Aethien
      description: (t) => t('effect_description_aethan_estate_1'),
      timing: "purged",
      execute: async function (ctx) {
         if (ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Domaine Aethien
      description: (t) => t('effect_description_aethan_estate_2'),
      timing: "purged",
      execute: async function (ctx) {
         if (ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Domaine Aethien
      description: (t) => t('effect_description_aethan_estate_3'),
      timing: "purged",
      execute: async function (ctx) {
         if (ctx) {
          return false;
        }
        return true;
      }
    }],
  },
  82: {
    1: [{ // Autel
      description: (t) => t('effect_description_shrine'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: (t) => t('effect_description_sanctuary'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: (t) => t('effect_description_temple'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 4);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: (t) => t('effect_description_oratory'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 3);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
  },
  83: {
    1: [{ // Autel
      description: (t) => t('effect_description_shrine'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: (t) => t('effect_description_sanctuary'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: (t) => t('effect_description_temple'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 4);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: (t) => t('effect_description_oratory'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 3);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
  },
  84: {

  },
  85: {

  },
  86: {
    1: [
      { // Adoubement
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_dubbing'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('deck'), this.description(ctx.t), 1);
          const card = selected[0];
          await addResourceMapToCard(card, {coin: 1, sword: 1});
          card.type[card.currentSide - 1] += ' - knight';
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Faveur
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_favor'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let choice1;
          let choice2;
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), 1);
          while (!choice1) {
            choice1 = await ctx.selectResourceChoice([  
              { wood: 1 },
              { stone: 1 },
            ]);
          }
          while (!choice2) {
            choice2 = await ctx.selectResourceChoice([  
              { metal: 1 },
              { tradegood: 1 },
            ]);
          }
          const card = selected[0];
          await addResourceMapToCard(card, choice1);
          await addResourceMapToCard(card, choice2);
          ctx.deleteCardInZone(ctx.t('deck'), ctx.card.id);
          return false;
        }
      }
    ]
  },
  87: {
    1: [{ // Quêtes
      description: (t) => t('effect_description_quests'),
      timing: "onClick",
      execute: async function (ctx) {
        let checkedBoxes = 0;
        const peopleToDiscard = [1, 2, 2, 3, 3, 4, 5, 6, 7];
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          checkedBoxes += checkbox.checked ? 1 : 0;
        }
        if (ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < peopleToDiscard[checkedBoxes] ||
            checkedBoxes >= peopleToDiscard.length) {
          return false;
        }
        const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], peopleToDiscard[checkedBoxes]);
        // Checkbox
        if (selected.length === peopleToDiscard[checkedBoxes]) {
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              for (const card of selected) {
                ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              }
              ctx.effectEndTurn();
              break;
            }
          }
        }
        // Apply resource effect
        let lastCheckbox;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          if (!checkbox.checked) {
            const checkboxResources = getCheckboxResources(lastCheckbox?.content);
            if (checkboxResources) {
              await setResourceMapToCard(ctx.card, {fame: checkboxResources.fame?? 0});
            }
            break;
          }
          lastCheckbox = checkbox;
        }
        const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          await setResourceMapToCard(ctx.card, {fame: 45});
        }
        return false;
      }
    }],
  },
  88: {
    1: [{ // Une Tour Idéale
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        let stoneToPay = 1;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          stoneToPay += checkbox.checked ? 1 : 0;
        }
        // Checkbox
        if (ctx.resources.stone >= stoneToPay) {
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              ctx.setResources(prev => ({ ...prev, stone: prev.stone - stoneToPay }));
              ctx.effectEndTurn();
              break;
            }
          }
        }
        // Apply resource effect
        let lastCheckbox;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          if (!checkbox.checked) {
            const checkboxResources = getCheckboxResources(lastCheckbox?.content);
            if (checkboxResources) {
              await setResourceMapToCard(ctx.card, checkboxResources);
            }
            break;
          }
          lastCheckbox = checkbox;
        }
        const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          await setResourceMapToCard(ctx.card, {fame: 75});
        }
        return false;
      }
    }]
  },
  89: {
    2: [{ // Puits du Village
      description: (t) => t('none'),
      timing: "modifyProduction",
      productionModifier: {
        filter: (card: GameCard, t) => card.GetType(t!).includes(t!('building')),
        zones: (t) => [t('playArea')],
        bonus: { coin: 1 }
      },
      execute: async function (ctx) {
        if (ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Colonie de la Fosse
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        await checkNextBox(ctx.card);
        if (getLastCheckboxChecked(ctx.card)) {
          await ctx.upgradeCard(ctx.card, 4);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        }
        return true;
      }
    }],
    4: [
      { // Prison
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_prison'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.fetchCardsInZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea')).length !== 0) {
            const result = new Promise<boolean>((resolve) => {
              ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
                if(boxes.length !== 0) {
                  for(const box of boxes) {
                    applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                  }
                  await checkBoxes(ctx.card, boxes);
                  const selected = await ctx.selectCardsFromZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 1);
                  ctx.dropToDiscard({id: selected[0].id, fromZone: ctx.t('playArea')});
                  resolve(true);
                } else {
                  resolve(false);
                }
              });
            });
            return result;
          }
          return false;
        }
      }
    ],
  },
  90: {
    1: [{ // Bijoux
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        let ingotToPay = 1;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          ingotToPay += checkbox.checked ? 1 : 0;
        }
        // Checkbox
        if (ctx.resources.metal >= ingotToPay) {
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              ctx.setResources(prev => ({ ...prev, metal: prev.metal - ingotToPay, tradegood: prev.tradegood + 5 }));
              ctx.effectEndTurn();
              break;
            }
          }
        }
        // Apply resource effect
        let lastCheckbox;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          if (!checkbox.checked) {
            const checkboxResources = getCheckboxResources(lastCheckbox?.content);
            if (checkboxResources) {
              await setResourceMapToCard(ctx.card, checkboxResources);
            }
            break;
          }
          lastCheckbox = checkbox;
        }
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          await setResourceMapToCard(ctx.card, {fame: 40});
        }
        return false;
      }
    }]
  },
  91: {
    1: [{ // Construire une Arche
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        let woodToPay = 2;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          woodToPay += checkbox.checked ? 2 : 0;
        }
        // Checkbox
        if (ctx.resources.wood >= woodToPay) {
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              ctx.setResources(prev => ({ ...prev, wood: prev.wood - woodToPay }));
              ctx.effectEndTurn();
              break;
            }
          }
        }
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          await ctx.upgradeCard(ctx.card, 3);
          await ctx.dropToDiscard({id: ctx.card.id, fromZone: ctx.t('permanentZone')})
        }
        return false;
      }
    }],
    3: [{ // L'Arche
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const people = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (people.length < 2) {
          return false;
        }
        for (let i = 0; i < (people.length - 1)/2; i++) {
          await checkNextBox(ctx.card);
        }
        return true;
      }
    }],
  },
  92: {
    1: [{ // __
      description: (t) => t('effect_description____1'),
      timing: "played",
      uses: 0,
      execute: async function (ctx) {
        switch(this.uses) {
          case 0: {
            const newName = await ctx.selectTextInput(this.description(ctx.t), true);
            if (newName) {
              ctx.card.name[ctx.card.currentSide - 1] = newName;
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              this.uses++;
            }
            break;
          }
          case 1: {
            let resource1: Partial<ResourceMap> | null = null;
            while (resource1 === null) {
              resource1 = await ctx.selectResourceChoice([
                  { sword: 1 },
                  { fame: 5 }
                ], 
                true
              );
            }
            await addResourceMapToCard(ctx.card, resource1);
            ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
            this.uses++;
            break;
          }
          case 2: {
            let resource2: Partial<ResourceMap> | null = null;
            while (resource2 === null) {
              resource2 = await ctx.selectResourceChoice([
                  { tradegood: 1 },
                  { fame: 5 }
                ],
                true
              );
            }
            await addResourceMapToCard(ctx.card, resource2);
            ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
            this.uses++;
            break;
          }
          default:
        }
        return false;
      }
    }],
    3: [
      { // __
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description____2'),
        timing: "played",
        uses: 0,
        execute: async function (ctx) {
          switch(this.uses) {
            case 0: {
              const newName = await ctx.selectTextInput(this.description(ctx.t), true);
              if (newName) {
                ctx.card.name[ctx.card.currentSide - 1] = newName;
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              }
              this.uses++;
              break;
            }
            case 1: {
              let resource1: Partial<ResourceMap> | null = null;
              while (resource1 === null) {
                resource1 = await ctx.selectResourceChoice([
                    { coin: 1 },
                    { wood: 1 },
                    { stone: 1 },
                    { sword: 1 },
                    { metal: 1 },
                    { tradegood: 1 }
                  ],
                  true
                );
              }
              await addResourceMapToCard(ctx.card, resource1);
              ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
              this.uses++;
              break;
            }
            case 2: {
              let resource2: Partial<ResourceMap> | null = null;
              while (resource2 === null) {
                resource2 = await ctx.selectResourceChoice([
                    { coin: 1 },
                    { wood: 1 },
                    { stone: 1 },
                    { sword: 1 },
                    { metal: 1 },
                    { tradegood: 1 }
                  ],
                  true
                );
              }
              await addResourceMapToCard(ctx.card, resource2);
              ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
              this.uses++;
              break;
            }
            default:
          }
          return false;
        }
      }
    ],
  },
  93: {
    2: [{ // Baie des Pirates
        description: (t) => t('effect_description_pirate_cove'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          await ctx.discoverCard((card) => [94].includes(card.id), this.description(ctx.t), 1)
          return false;
        }
    }]
  },
  94: {
    1: [
      { // Traître
        description: (t) => t('effect_description_backstabber'),
        timing: "played",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 2);
          for (const card of selected) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 4) {
            ctx.setResources(prev => ({ ...prev, sword: prev.sword - 4 }));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }
    ],
    3: [{ // Malédiction
      description: (t) => t('none'),
      timing: "onAdvance",
      execute: async function () {
        return 2;
      }
    }]
  },
  95: {
    1: [{ // Astronome
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
          await checkNextBox(ctx.card);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Astrologue
      description: (t) => t('effect_description_astrologist'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 3);
        if (selected.length !== 0) {
          const position = await ctx.selectStringChoice(ctx.t('string_choice_top_or_bottom'),
            [ctx.t('top'), ctx.t('bottom')]
          );
          
          if (position === ctx.t('bottom')) {
            ctx.setDeck(prev => [...prev, ...selected]);
          } else {
            ctx.setDeck(prev => [...selected, ...prev]);
          }
          ctx.setPlayArea(prev => prev.filter((card) => !selected.includes(card)));
          for(const card of selected) {
            const cardsToUnblock = ctx.getBlockedBy(card.id);
            ctx.setBlockedZone(prev => prev.filter(c => !cardsToUnblock.includes(c)));
            ctx.setPlayArea(prev => [...prev, ...cardsToUnblock]);
            ctx.updateBlocks(card.id, null);
          }
          return true;
        }
        return false;
      }
    }]
  },
  96: {
    1: [{ // Alchimiste
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          const selectedSides = await new Promise<number[]>((resolve) => {
            ctx.selectCardSides(ctx.card, 1, 0, resolve);
          });
          
          const side = selectedSides[0];
          if (side !== 1) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
            await ctx.upgradeCard(ctx.card, side);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
    2: [{ // Potion de Force
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, sword: prev.sword + 3 }));
        await ctx.upgradeCard(ctx.card, 1);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Potion d'Amour
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, tradegood: prev.tradegood + 5 }));
        await ctx.upgradeCard(ctx.card, 1);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    4: [{ // Potion de Soin
      description: (t) => t('none'),
      timing: "onCardsDiscarded",
      execute: async function (ctx) {
        if (!ctx.cardsForTrigger) return false;
        
        const people = ctx.cardsForTrigger.filter((card) => 
          card.GetType(ctx.t).includes(ctx.t('person'))
        );
        
        if (people.length === 0) return false;
        
        const choice = await ctx.selectStringChoice(
          ctx.t('string_choice_health_potion'),
          [ctx.t('yes'), ctx.t('no')]
        );
        
        if (choice === ctx.t('no')) return false;
        
        let selected: GameCard[];
        if (people.length > 1) {
          selected = await ctx.selectCardsFromArray(
            people, 
            ctx.t('discard'), 
            ctx.t('string_choice_health_potion'), 
            1
          );
        } else {
          selected = [people[0]];
        }
        
        if (selected && selected.length > 0) {
          ctx.dropToPlayArea({id: selected[0].id, fromZone: ctx.t('discard')});
          await ctx.upgradeCard(ctx.card, 1);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        
        return false;
      }
    }],
  },
  97: {

  },
  98: {
    1: [{ // Boussole
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('playArea'));
        if (cards.length < 1) {
          return false;
        }
        const result = await new Promise<boolean>((resolve) => {
          ctx.openCheckboxPopup(ctx.card, 0, cards.length, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
              }
              await checkBoxes(ctx.card, boxes);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 2);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return true;
        }
        return false;
      }
    }],
    2: [{ // Navigation
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('playArea'));
        if (cards.length < 1) {
          return false;
        }
        const result = await new Promise<boolean>((resolve) => {
          ctx.openCheckboxPopup(ctx.card, 0, cards.length, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
              }
              await checkBoxes(ctx.card, boxes);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 4);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return true;
        }
        return false;
      }
    }],
    3: [{ // Calendrier
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1][ctx.card.checkboxes.length - 1].checked) {
          return false;
        }
        const discardPile = ctx.filterZone(ctx.t('discard'), () => true);
        
        if (discardPile.length === 0) {
          return false;
        }
        
        const numCardsToTake = Math.min(15, discardPile.length);
        const randomCards: GameCard[] = [];
        const availableCards = [...discardPile];
        
        for (let i = 0; i < numCardsToTake; i++) {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          randomCards.push(availableCards[randomIndex]);
          availableCards.splice(randomIndex, 1);
        }
        
        ctx.setDeck(prev => [...prev, ...randomCards]);
        
        ctx.setDiscard(prev => 
          prev.filter(card => !randomCards.some(rc => rc.id === card.id))
        );
        
        checkNextBox(ctx.card)
        
        return true;
      }
    }],
    4: [{ // Astrolabe
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('playArea'));
        if (cards.length < 1) {
          return false;
        }
        const result = await new Promise<boolean>((resolve) => {
          ctx.openCheckboxPopup(ctx.card, 0, cards.length, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
              }
              await checkBoxes(ctx.card, boxes);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 3);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return true;
        }
        return false;
      }
    }],
  },
  99: {

  },
  100: {
    2: [{ // Industrie du Bois
      description: (t) => t('effect_description_saw_mill'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([91].includes(card.id)),
          this.description(ctx.t),
          1
        )) {
          return true;
        }
        return false;
      }
    }],
    4: [{ // Cargaison de Bois
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) { // TODO : Create a new timing => onResourceUse (HUGE refactor => create a function to use resources)
        if (ctx.resources.tradegood > 0) {
          ctx.setResources(prev => ({ ...prev, wood: prev.wood + prev.tradegood, tradegood: 0 }));
        }
        else if (ctx.resources.wood > 0) {
          ctx.setResources(prev => ({ ...prev, wood: 0, tradegood: prev.wood + prev.tradegood }));
        }
        return false;
      }
    }],
  },
  101: {
    2: [{ // Machines Agricoles
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
    3: [{ // Grange Agrandie
      description: (t) => t('effect_description_larger_barns'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
        }
        return false;
      }
    }],
    4: [{ // Entrepôt Royal
      description: (t) => t('effect_description_royal_storehouse'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
        }
        return false;
      }
    }],
  },
  102: {
    3: [{ //
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        await checkNextBox(ctx.card);
        const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          await ctx.upgradeCard(ctx.card, 4);
          await ctx.dropToPermanent({id: ctx.card.id, fromZone: ctx.zone});
          return false;
        }
        return true;
      }
    }],
    4: [{ //
      description: (t) => t('none'),
      timing: "modifyProduction",
      productionModifier: {
        filter: (card: GameCard, t) => card.GetType(t!).includes(t!('seafaring')),
        zones: (t) => [t('playArea')],
        bonus: { coin: 1 }
      },
      execute: async function (ctx) {
        if (ctx) {
          return false;
        }
        return true;
      }
    }],
  },
  103: {
    1: [{ // Missionaire
      description: (t) => t('effect_description_missionary'),
      timing: "onClick",
      execute: async function (ctx) {
        const bandits = ctx.fetchCardsInZone((card) => card.GetName(ctx.t).includes(ctx.t('bandit')), ctx.t('playArea'));
        if (ctx.resources.coin >= 3 && bandits.length !== 0) {
          const card = (await ctx.selectCardsFromArray(bandits, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (!card) {
            return false;
          }
          await ctx.upgradeCard(card, 3);
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 3 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Apiculteur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        let allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          return false;
        }
        await checkNextBox(ctx.card);
        allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          addResourceMapToCard(ctx.card, {coin: 1});
        }
        return true;
      }
    }],
  },
  104: {
    1: [{ // Prêtre
      description: (t) => t('effect_description_priest'),
      timing: "onClick",
      execute: async function (ctx) {
        let effectSuccessfull = false;
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id, ctx.t('playArea'));
        if (ctx.resources.coin >= 2 && cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          
          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              let upgradeable = true;
              upgrade.cost = upgrade.cost ? upgrade.cost : {};
              if (ctx.resources['coin'] >= (upgrade.cost['coin'] ?? 0) + 2) {
                for (const key in upgrade.cost) {
                  const resourceKey = key as keyof ResourceMap;
                  const amount = upgrade.cost[resourceKey] ?? 0;
                  if (ctx.resources[resourceKey] < amount) {
                    return effectSuccessfull;
                  }
                }

                if (upgrade.otherCost) {
                  const additionalCostEffect = getCardUpgradeAdditionalCost(card.id, card.currentSide);
                  const cardToUpgradeCtx = ctx;
                  cardToUpgradeCtx.card = card;
                  upgradeable = await additionalCostEffect.execute(cardToUpgradeCtx);
                }
                if (upgradeable) {
                  ctx.setResources(prev => ({
                    ...prev,
                    ...(upgrade.cost && Object.fromEntries(
                      Object.entries(upgrade.cost).map(([key, value]) => [
                        key, 
                        prev[key as keyof ResourceMap] - value
                      ])
                    )),
                    coin: prev.coin - (upgrade.cost?.coin ?? 0) - 2
                  }));

                  await ctx.upgradeCard(card, upgrade.nextSide);
                  ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
                  await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
                  effectSuccessfull = true;
                  return effectSuccessfull;
                }
              }
              resolve();
            });
          });

        }
        return effectSuccessfull;
      }
    }],
    3: [{ // Cardinal
      description: (t) => t('effect_description_cardinal'),
      timing: "onClick",
      execute: async function (ctx) {
        let effectSuccessfull = false;
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id, ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          
          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              let upgradeable = true;
              upgrade.cost = upgrade.cost ? upgrade.cost : {};
              if (ctx.resources['coin'] >= (upgrade.cost['coin'] ?? 0)) {
                for (const key in upgrade.cost) {
                  const resourceKey = key as keyof ResourceMap;
                  const amount = upgrade.cost[resourceKey] ?? 0;
                  if (ctx.resources[resourceKey] < amount) {
                    return effectSuccessfull;
                  }
                }

                if (upgrade.otherCost) {
                  const additionalCostEffect = getCardUpgradeAdditionalCost(card.id, card.currentSide);
                  const cardToUpgradeCtx = ctx;
                  cardToUpgradeCtx.card = card;
                  upgradeable = await additionalCostEffect.execute(cardToUpgradeCtx);
                }
                if (upgradeable) {
                  ctx.setResources(prev => ({
                    ...prev,
                    ...(upgrade.cost && Object.fromEntries(
                      Object.entries(upgrade.cost).map(([key, value]) => [
                        key, 
                        prev[key as keyof ResourceMap] - value
                      ])
                    )),
                  }));

                  await ctx.upgradeCard(card, upgrade.nextSide);
                  ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
                  await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
                  effectSuccessfull = true;
                  return effectSuccessfull;
                }
              }
              resolve();
            });
          });

        }
        return effectSuccessfull;
      }
    }],
  },
  105: {
    1: [{ // Petit Village sur la Colline
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          const choice = await ctx.selectResourceChoice([
            { coin: 1 },
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 2 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    2: [{ // Village sur la Colline
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          const choice = await ctx.selectResourceChoice([
            { coin: 1 },
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Ville sur la Colline
      description: (t) => t('effect_description_city_on_a_hill'),
      timing: "onClick",
      execute: async function (ctx) {
        const cardId = ctx.card.id;
        const success = await ctx.discoverCard((card) => [106].includes(card.id), this.description(ctx.t), 1);

        if (success) {
          await ctx.upgradeCard(ctx.card, 1);
          await ctx.dropToCampaign({ id: cardId, fromZone: ctx.zone });
          const forgottenCard = ctx.fetchCardsInZone((card) => card.id === cardId, "Campaign Deck");
          if (forgottenCard.length === 0) {
            ctx.setCampaignDeck((prev) => [...prev, ctx.card]);
          }
        }

        return false;
      }
    }],
    4: [{ // Grande Ville
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        // Créer un objet avec seulement les ressources disponibles (> 0)
        const availableResources: Partial<ResourceMap> = {};
        (Object.keys(ctx.resources) as (keyof ResourceMap)[]).forEach(key => {
          if (ctx.resources[key] > 0 && key != "fame") {
            availableResources[key] = ctx.resources[key];
          }
        });
        
        if (Object.keys(availableResources).length === 0) {
          return false;
        }
        
        const resToPay = await ctx.selectResourceChoice(Object.entries(availableResources).map(([key, value]) => ({[key]: (value >= 1 ? 1 : 0)})));
        if (!resToPay) {
          return false;
        }
        
        const choice = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        
        if (choice) {
          const paidResourceKey = Object.keys(resToPay)[0] as keyof ResourceMap;
          ctx.setResources(prev => ({ 
            ...prev, 
            [paidResourceKey]: prev[paidResourceKey] - 1 
          }));
          
          applyChoice(ctx, choice);
          return true;
        }
        
        return false;
      }
    }],
  },
  106: {
    3: [{ // Camelot
      description: (t) => t('none'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone(() => (true), ctx.t('deck')).length === 0) {
          await checkNextBox(ctx.card);
        }
        return false;
      }
    }],
  },
  107: {
    1: [{ // Visite Royale
      description: (t) => t('effect_description_royal_visit'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          ctx.t('playArea'), 
          this.description(ctx.t), 
          1
        );
        
        if (cards.length === 0) {
          return false;
        }
        
        const selectedCard = cards[0];
        
        await new Promise<void>((resolve) => {
          ctx.selectUpgradeCost(selectedCard, true, (upgradeIndex, resourceKey) => {
            const upgrade = selectedCard.upgrades[selectedCard.currentSide - 1][upgradeIndex];
            if (upgrade.cost && upgrade.cost[resourceKey]) {
              upgrade.cost[resourceKey] = Math.max(0, upgrade.cost[resourceKey] - 1);
              
              if (upgrade.cost[resourceKey] === 0) {
                delete upgrade.cost[resourceKey];
              }
            }
            
            ctx.replaceCardInZone(ctx.t('playArea'), selectedCard.id, selectedCard);
            resolve();
          });
        });
        return true;
      }
    }],
    3: [{ // Inquisitrice
      description: (t) => t('effect_description_inquisitor'),
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
        if (selected.length === 1) {
          ctx.deleteCardInZone(ctx.t('playArea'), selected[0].id);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
        return false;
      }
    }]
  },
  108: {
    1: [{ // Cristal Ethéré Royale
      description: (t) => t('none'),
      timing: "removed",
      execute: async function () {
        return false;
      }
    }]
  },
  109: {
    3: [{ // Manoir de la Guilde
      description: (t) => t('effect_description_grand_guild_hall'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          return false;
        }
        const maxPeopleCount = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length;
        if (maxPeopleCount === 0) {
          return false;
        }
        const people = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], maxPeopleCount);
        if (people.length !== 0) {
          for (const card of people) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          addResourceMapToCard(ctx.card, {fame: people.length});
          await checkNextBox(ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  110: {
    3: [{ // Campagne Prospère
      description: (t) => t('effect_description_thriving_countryside'),
      timing: "onClick",
      execute: async function (ctx) {
        const zone = await ctx.selectStringChoice(
          ctx.t('string_choice_thriving_countryside'),
          [ctx.t('playArea'), ctx.t('discard')]
        );
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, zone, this.description(ctx.t), 1))[0];
        if (card) {
          ctx.setDeck((prev) => [...prev, card]);
          if (zone === ctx.t('playArea')) {
            ctx.setPlayArea((prev) => prev.filter((c) => c.id !== card.id));
          }
          else {
            ctx.setDiscard((prev) => prev.filter((c) => c.id !== card.id));
          }
          const cardsToUnblock = ctx.getBlockedBy(card.id);
          ctx.setBlockedZone(prev => prev.filter(c => !cardsToUnblock.includes(c)));
          ctx.setPlayArea(prev => [...prev, ...cardsToUnblock]);
          ctx.updateBlocks(card.id, null);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Campagne
      description: (t) => t('effect_description_countryside'),
      timing: "onClick",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.setDeck((prev) => [...prev, card]);
          ctx.setPlayArea((prev) => prev.filter((c) => c.id !== card.id));
          
          const cardsToUnblock = ctx.getBlockedBy(card.id);
          ctx.setBlockedZone(prev => prev.filter(c => !cardsToUnblock.includes(c)));
          ctx.setPlayArea(prev => [...prev, ...cardsToUnblock]);
          ctx.updateBlocks(card.id, null);
          return true;
        }
        return false;
      }
    }],
  },
  111: {
    1: [{ // Manoir
      description: (t) => t('none'),
      timing: "onResourceGain",
      execute: async function (ctx) {
        if (ctx.cardsForTrigger && ctx.cardsForTrigger[0].id === ctx.card.id) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin }));
          if (ctx.card.GetResources()[0].coin ?? 0 > 0) {
            addResourceMapToCard(ctx.card, {coin: -1});
          }
        }
        return true;
      }
    }],
    2: [{ // Grand Manoir
      description: (t) => t('none'),
      timing: "onResourceGain",
      execute: async function (ctx) {
        if (ctx.cardsForTrigger && ctx.cardsForTrigger[0].id === ctx.card.id) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin }));
          if (ctx.card.GetResources()[0].coin ?? 0 > 0) {
            addResourceMapToCard(ctx.card, {coin: -1});
          }
        }
        return true;
      }
    }],
    3: [{ // Imposante Demeur
      description: (t) => t('effect_description_grand_residence'),
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => [116].includes(card.id), this.description(ctx.t), 1)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    4: [{ // Noble Demeur
      description: (t) => t('none'),
      timing: "onResourceGain",
      execute: async function (ctx) {
        if (ctx.cardsForTrigger && ctx.cardsForTrigger[0].id === ctx.card.id) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin }));
          if (ctx.card.GetResources()[0].coin ?? 0 > 0) {
            addResourceMapToCard(ctx.card, {coin: -1});
          }
        }
        return true;
      }
    }],
  },
  112: {
    1: [{ // Etable
      description: (t) => t('effect_description_stable_1'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [113].includes(card.id), this.description(ctx.t), 1)) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    2: [{ // Etable
      description: (t) => t('effect_description_stable_2'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [114].includes(card.id), this.description(ctx.t), 1)) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    3: [
      { // Palfrenier
        description: (t) => t('effect_description_groom'),
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => (card.GetType(ctx.t).includes(ctx.t('horse'))) && (getResourcesCount(card.GetResources()[0]) <= 2), ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice([
              { coin: 1 },
              { wood: 1 },
              { stone: 1 },
              { sword: 1 },
              { metal: 1 },
              { tradegood: 1 }
            ]);
            if (choice) {
              addResourceMapToCard(card, choice);
              return true;
            }
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_groom'),
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('horse')), ctx.t('discard'), this.description(ctx.t), 1))[0];
          if (card) {
            ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
            return true;
          }
          return false;
        }
      }
    ],
    4: [{ // Grande Etable
      description: (t) => t('effect_description_large_stable'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [115].includes(card.id), this.description(ctx.t), 1)) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
  },
  113: {

  },
  114: {

  },
  115: {

  },
  116: {
    1: [
      { // Aric Blackwood
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_aric_blackwood'),
        timing: "played",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (card) {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          return false;
        }
      }
    ],
    3: [
      { // Eadric Shadowstrike
        description: (t) => t('staysInPlay'),
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('effect_description_eadric_shadowstrike'),
        timing: "onClick",
        execute: async function (ctx) {
          const cards = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 2));
          if (cards.length === 2) {
            for (const card of cards) {
              ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
            }
            ctx.setResources(prev => ({ ...prev, sword: prev.sword + 3 }));
            return true;
          }
          return false;
        }
      }
    ],
  },
  117: {
    1: [{
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.tradegood >= 3) {
          const choice = await ctx.selectResourceChoice([
            { coin: 1 },
            { wood: 1 },
            { stone: 1 },
            { sword: 1 },
            { metal: 1 },
            { tradegood: 1 }
          ]);
          if (choice) {
            ctx.setResources(prev => ({ ...prev, tradegood: prev.tradegood - 3 }));
            applyResourceMapDelta(ctx.setResources, choice);
          }
        }
        return false;
      }
    }],
  },
  118: {
    1: [{ // Petite Ecole
      description: (t) => t('effect_description_small_school'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];

          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              await ctx.upgradeCard(card, upgrade.nextSide);
              ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
              await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              resolve();
            });
          });

          await ctx.upgradeCard(ctx.card, 2);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Ecole
      description: (t) => t('effect_description_school'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          
          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              await ctx.upgradeCard(card, upgrade.nextSide);
              ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
              await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              resolve();
            });
          });

          await ctx.upgradeCard(ctx.card, 4);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [{ // Ecole Reconnue
      description: (t) => t('effect_description_renowned_school'),
      timing: "onClick",
      uses: 0,
      execute: async function (ctx) {
        if (this.uses !== 0) {
          return false;
        }
        const cards = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice([
              { coin: 1 },
              { wood: 1 },
              { stone: 1 },
              { sword: 1 },
              { metal: 1 },
              { tradegood: 1 }
            ]);
            if (choice) {
              addResourceMapToCard(card, choice);
              await ctx.upgradeCard(ctx.card, 3);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              ctx.effectEndTurn();
              this.uses += 1;
            }
          }
        }
        return false;
      }
    }],
    4: [{ // Ecole Reconnue
      description: (t) => t('effect_description_prominent_school'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice([
              { coin: 1 },
              { wood: 1 },
              { stone: 1 },
              { sword: 1 },
              { metal: 1 },
              { tradegood: 1 }
            ]);
            if (choice) {
              addResourceMapToCard(card, choice);
              await ctx.upgradeCard(ctx.card, 3);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              ctx.effectEndTurn();
            }
          }
        }
        return false;
      }
    }],
  },
  119: {
    1: [{ // Commerçante
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: (t) => t('effect_description_bazaar'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: (t) => t('effect_description_market'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 },
            { metal: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
  },
  120: {
    1: [{ // Investisseur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice2) {
          return false;
        }
        const choice3 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (choice3) {
          applyResourceMapDelta(ctx.setResources, choice1);
          applyResourceMapDelta(ctx.setResources, choice2);
          applyResourceMapDelta(ctx.setResources, choice3);
          await ctx.upgradeCard(ctx.card, 2);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Investisseur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice2) {
          return false;
        }
        const choice3 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (choice3) {
          applyResourceMapDelta(ctx.setResources, choice1);
          applyResourceMapDelta(ctx.setResources, choice2);
          applyResourceMapDelta(ctx.setResources, choice3);
          await ctx.upgradeCard(ctx.card, 4);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Investisseur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (choice) {
          applyResourceMapDelta(ctx.setResources, choice);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Investisseur
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (!choice2) {
          return false;
        }
        const choice3 = await ctx.selectResourceChoice([
          { coin: 1 },
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 }
        ]);
        if (choice3) {
          applyResourceMapDelta(ctx.setResources, choice1);
          applyResourceMapDelta(ctx.setResources, choice2);
          applyResourceMapDelta(ctx.setResources, choice3);
          await ctx.upgradeCard(ctx.card, 3);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  121: {
    1: [{ // Roi Alahar
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Reine Jemimah
      description: (t) => t('effect_description_queen_jeminah'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          return false;
        }
        const people = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')) && (card.GetResources()[card.GetResources().length - 1].fame?? 0) >= 5, ctx.t('playArea'));
        if (people.length === 0) {
          return false;
        }
        const card = (await ctx.selectCardsFromArray(people, ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          await checkNextBox(ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  122: {

  },
  123: {
    1: [{ // Château Majestueux
      description: (t) => t('effect_description_grand_castle'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    2: [{ // Château Monumental
      description: (t) => t('effect_description_huge_castle'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    3: [
      { // Forteresse Imprenable
        description: (t) => t('effect_description_impregnable_fortress'),
        timing: "onClick",
        execute: async function(ctx) {
          const selectedCards = await ctx.selectCardsFromZone(
            () => (true),
            ctx.t('discard'),
            this.description(ctx.t),
            1
          );
          if (selectedCards.length > 0) {
            await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_impregnable_fortress'),
        timing: "onCardsDiscarded",
        execute: async function(ctx) {
          if (!ctx.cardsForTrigger) return false;
          
          const isThisCardDiscarded = ctx.cardsForTrigger.some((c) => c.id === ctx.card.id);
    
          if (isThisCardDiscarded) {
            const cards = await ctx.selectCardsFromZone((card) => card.GetName(ctx.t).includes(ctx.t('wall')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 2);
            if (cards.length === 2) {
              for (const card of cards) {
                ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              }
              ctx.dropToPlayArea({id: ctx.card.id, fromZone: ctx.t('discard')});
            }
          }
          return false;
        }
      }
    ],
    4: [{ // Forteresse
      description: (t) => t('effect_description_fortress'),
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
  },
  124: {

  },
  125: {
    1: [{ // Grand Temple
      description: (t) => t('effect_description_large_temple'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 5);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Temple Sculpté
      description: (t) => t('effect_description_ornate_temple'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 5);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [
      { // Temple de la Lumière
        description: (t) => t('effect_description_temple_of_light'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
          const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 5);
          ctx.setTemporaryCardListImmediate(selected);
          if (selected.length > 0) {
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.tradegood >= 4 && !ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
            await checkNextBox(ctx.card);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    4: [{ // Temple Légendaire
      description: (t) => t('effect_description_legendary_temple'),
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 5);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
  },
  126: {

  },
  127: {
    4: [{ // Champignons
      description: (t) => t('effect_description_mushrooms'),
      timing: "onClick",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          ctx.setResources(prev => ({ ...prev, tradegood: prev.tradegood + 2 }));
        }
        return false;
      }
    }]
  },
  128: {
    3: [{ // Site de Fouilles
      description: (t) => t('effect_description_excavation_site'),
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked) || ctx.resources.stone < 3) {
          return false;
        }
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          ctx.setResources(prev => ({ ...prev, stone: prev.stone - 3 }));
          await checkNextBox(ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }]
  },
  129: {
    1: [{ // Sources Chaudes
      description: (t) => t('effect_description_hot_springs'),
      timing: "onUpgrade",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          await addResourceMapToCard(card, {coin: 1});
          ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
        }
        return false;
      }
    }],
    2: [{ // Fontaine
      description: (t) => t('effect_description_fountain'),
      timing: "onUpgrade",
      execute: async function (ctx) {
        await ctx.boostProductivity((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), null);
        return false;
      }
    }],
    4: [{ // Canaux
      description: (t) => t('effect_description_canals'),
      timing: "onUpgrade",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.addCardEffect(card.id, card.currentSide, ctx.t('playArea'), stayInPlayEffect, stayInPlayText);
        }
        return false;
      }
    }],
  },
  130: {
    2: [{ // Mur Intérieur
      description: (t) => t('effect_description_watchtower'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        ctx.setDeck((d) => {
          ctx.selectCardsFromArray([d[0], d[1]], ctx.t('deck'), this.description(ctx.t), 0);
          return d;
        })
        return false;
      }
    }],
    3: [{ // Mur Intérieur
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Double Muraille
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
  },
  131: {
    2: [{ // Douves
      description: (t) => t('effect_description_moat'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          ctx.setResources(prev => ({ ...prev, sword: prev.sword + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Muraille
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Pont de Douves
      description: (t) => t('effect_description_moat_bridge'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        if (ctx.resources.coin < 1) {
          return false;
        }
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('discard'), this.description(ctx.t), 1))[0];
        if (card) {
          ctx.setResources(prev => ({ ...prev, coin: prev.coin - 1 }));
          ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
  },
  132: {
    4: [{ // Muraille
      description: (t) => t('staysInPlay'),
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
  },
  133: {
    1: [{ // Pillage
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if(choice) {
          applyChoice(ctx, choice);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Razzia
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if(choice2) {
          applyChoice(ctx, choice1);
          applyChoice(ctx, choice2);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Saccage
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if (!choice2) {
          return false;
        }
        const choice3 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if(choice3) {
          applyChoice(ctx, choice1);
          applyChoice(ctx, choice2);
          applyChoice(ctx, choice3);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Pillage
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx) {
        const choice1 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if (!choice1) {
          return false;
        }
        const choice2 = await ctx.selectResourceChoice([
          { coin: 1 },  
          { wood: 1 },
          { stone: 1 },
          { sword: 1 },
          { metal: 1 },
          { tradegood: 1 },
        ]);
        if(choice2) {
          applyChoice(ctx, choice1);
          applyChoice(ctx, choice2);
          return true;
        }
        return false;
      }
    }],
  },
  134: {
    1: [
      { // Rival Beau-Gosse
        description: (t) => t('none'),
        timing: "destroyed",
        execute: async function (ctx) {
          return (ctx.cardsForTrigger?.some((card) => card.GetName(ctx.t) !== ctx.t('lord_nimrod'))?? true);
        }
      },
      {
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const lord = ctx.fetchCardsInZone((card) => card.GetName(ctx.t) === ctx.t('lord_nimrod'), ctx.t('playArea'))[0];
          if (!lord) {
            return false;
          }
          const result = await new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                const cbResources = getCheckboxResources(box.content)?? {};
                if (hasEnoughResources(ctx.resources, cbResources)) {
                  applyResourceMapDelta(ctx.setResources, cbResources, true);
                  await checkBoxes(ctx.card, boxes);
                  await ctx.dropToDiscard({ id: lord.id, fromZone: ctx.t('playArea') });
                  if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
                    await ctx.upgradeCard(ctx.card, 3);
                    ctx.replaceCardInZone(ctx.t('playArea'), ctx.card.id, ctx.card);
                  }
                  resolve(true);
                }
              }
            }
            resolve(false);
            })
          });
          return result;
        }
      }
    ],
    3: [{ // Rival Beau-Gosse
      description: (t) => t('effect_description_handsome_rival'),
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')) && card.id !==  ctx.card.id, ctx.t('playArea'));
        if (cards.length > 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1))[0];
          if (card) {
            let resources;
            if (card.GetResources().length > 1) {
              resources = await ctx.selectResourceChoice(card.GetResources());
            }
            else {
              resources = card.GetResources()[0];
            }
            if (resources && resources !== null) {
              applyResourceMapDelta(ctx.setResources, resources);
              return true;
            }
          }
        }
        return false;
      }
    }],
  },
  135: {
    1: [{ // Terres Frontalières
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const upgrade = ctx.card.GetUpgrades()[0];
        if (upgrade.cost && ctx.resources.sword >= 5) {
          if (!upgrade.cost.sword) {
            return false;
          }
          upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
          
          if (upgrade.cost.sword === 0) {
            delete upgrade.cost.sword;
          }
          applyResourceMapDelta(ctx.setResources, {sword: 5}, true);
          ctx.handleCardUpdate(ctx.card, ctx.zone);
        }
        return false;
      }
    }],
    2: [{ // Occupation
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const upgrade = ctx.card.GetUpgrades()[0];
        if (upgrade.cost && ctx.resources.sword >= 5) {
          if (!upgrade.cost.sword) {
            return false;
          }
          upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
          
          if (upgrade.cost.sword === 0) {
            delete upgrade.cost.sword;
          }
          applyResourceMapDelta(ctx.setResources, {sword: 5}, true);
          ctx.handleCardUpdate(ctx.card, ctx.zone);
        }
        return false;
      }
    }],
    3: [{ // Etats Vassaux
      description: (t) => t('none'),
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        await ctx.upgradeCard(ctx.card, 1);
        return true;
      }
    }],
    4: [
      { // Villages Alliés
        description: (t) => t('none'),
        timing: "onClick",
        execute: async function (ctx) {
          const upgrade = ctx.card.GetUpgrades()[0];
          if (upgrade.cost && ctx.resources.sword >= 5) {
            if (!upgrade.cost.sword) {
              return false;
            }
            upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
            
            if (upgrade.cost.sword === 0) {
              delete upgrade.cost.sword;
            }
            applyResourceMapDelta(ctx.setResources, {sword: 5}, true);
            ctx.handleCardUpdate(ctx.card, ctx.zone);
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "onUpgrade",
        uses: 0,
        execute: async function (ctx) {
          if ((this.uses?? 9) >= 9) {
            return false;
          }
          if (!this.uses) {
            this.uses = 0;
          }
          ctx.card.currentSide = 3;
          addResourceMapToCard(ctx.card, {fame: 20});
          ctx.card.currentSide = 4;
          this.uses += 1;
          return false;
        }
      }
    ],
  },
  136: {
    1: [
      { // Prospérité
        description: (t) => t('effect_description_prosperity_expansion'),
        timing: "modifyProduction",
        productionModifier: {
          filter: (card: GameCard) => !card.negative[card.currentSide - 1],
          zones: (t) => [t('playArea')],
          bonus: { coin: 1 }
        },
        execute: async function (ctx) {
          if (ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 2;
          return false;
        }
      },
    ],
    2: [
      { // Engranger des réserves
        description: (t) => t('effect_description_hoarding'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.fetchCardsInZone((c) => c.id === ctx.card.id, ctx.zone)[0], 1);
          if (selected.length > 0) {
            ctx.setTemporaryCardListImmediate(selected);
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 4;
          return false;
        }
      },
    ],
    3: [
      { // Décret Royal
        description: (t) => t('effect_description_royal_decree'),
        timing: "endOfRound",
        execute: async function (ctx) {
          let checked = 0;
          for(const box of ctx.card.checkboxes[3]) {
            if(box.checked) {
              checked += 1;
            }
          }
          if (checked === 0) {
            return false;
          }
          const selected = await ctx.selectCardsFromZone(
            (card) => getResourcesCount(card.GetResources()[0]) !== 0, 
            ctx.t('deck'), 
            this.description(ctx.t), 
            checked
          );
          
          if (selected.length !== 0) {
            for(const card of selected) {
              let selectedResource = null;
              while(selectedResource === null) {
                selectedResource = await ctx.selectResourceChoice(card.GetResources());
              }
              await removeResourceFromCard(card, selectedResource);
              ctx.replaceCardInZone(ctx.t('deck'), card.id, card);
            }
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.deleteCardInZone(ctx.t('permanentZone'), ctx.card.id);
          return false;
        }
      },
    ],
    4: [
      { // Soulèvement
        description: (t) => t('effect_description_uprising'),
        timing: "otherCardPlayed",
        execute: async function (ctx) {
          const peopleInPlay = ctx.fetchCardsInZone(
            (c) => c.GetType(ctx.t).includes(ctx.t('person')), 
            ctx.t('playArea')
          );
          
          const peoplePlayed = ctx.cardsForTrigger?.filter(
            (c) => c.GetType(ctx.t).includes(ctx.t('person'))
          ) || [];
          
          for (const playedPerson of peoplePlayed) {
            if (peopleInPlay.length >= 2 && !peopleInPlay.includes(playedPerson)) {
              await checkNextBox(ctx.card);
            }
          }
          
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 3;
          return false;
        }
      },
    ],
  },
  137: {
    1: [
      { // Moulin à Eau
        description: (t) => t('effect_description_the_water_mill_expansion'),
        timing: "onClick",
        usesPerTurn: 1,
        execute: async (context) => {
          context.setResources(prev => ({ 
            ...prev, 
            coin: (prev.coin || 0) + 3
          }));
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 2;
          return false;
        }
      },
    ],
    2: [
      { // Récoltes Productives
        description: (t) => t('effect_description_efficient_farming'),
        timing: "onClick",
        execute: async function (ctx) {
          const buildings = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea'));
          const lands = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'));
          if (buildings.length < 2 || lands.length < 1) {
            return false;
          }
          const selected = await ctx.selectCardsFromArray(buildings, ctx.t('playArea'), this.description(ctx.t), 2);
          if (selected.length === 2) {
            const land = (await ctx.selectCardsFromArray(lands, ctx.t('playArea'), this.description(ctx.t), 1))[0];
            if (land) {
              addResourceMapToCard(land, {coin: 1});
              for (const building of selected) {
                await ctx.dropToDiscard({id: building.id, fromZone: ctx.t('playArea')});
              }
              ctx.effectEndTurn();
            }
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 4;
          return false;
        }
      },
    ],
    3: [
      { // Fermes Abandonnées
        description: (t) => t('effect_description_obsolete_farms'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((c) => c.GetResources().some((map) => hasEnoughResources(map, {coin: 1})), ctx.t('deck'), this.description(ctx.t), 1, ctx.card))[0];
          if (!card) {
            return false;
          }
          ctx.deleteCardInZone(ctx.t('deck'), card.id);
          ctx.deleteCardInZone(ctx.t('permanentZone'), ctx.card.id);
          return false;
        }
      },
    ],
    4: [
      { // Surplus
        description: (t) => t('effect_description_surplus'),
        timing: "modifyProduction",
        productionModifier: {
          filter: (card: GameCard, t) => {
            return (card.GetResources().some((map) => (map.coin || 0) >= 1) && card.GetType(t).includes(t('land')));
          },
          zones: (t) => [t('playArea')],
          addOptions: (card: GameCard) => {
            const newOptions: Array<Partial<ResourceMap>> = [];
            
            for (const resourceMap of card.GetResources()) {
              const coinAmount = resourceMap.coin || 0;
              if (coinAmount > 0) {
                const tradegoodOption: Partial<ResourceMap> = { ...resourceMap };
                delete tradegoodOption.coin;
                tradegoodOption.tradegood = (tradegoodOption.tradegood || 0) + coinAmount;
                newOptions.push(tradegoodOption);
              }
            }
            
            return newOptions;
          }
        },
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 3;
          return false;
        }
      },
    ],
  },
  138: {
    1: [
      { // Border Dispute
        description: (t) => t('effect_description_border_dispute_expansion'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          ctx.setTemporaryCardListImmediate(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.zone));
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 2;
          return false;
        }
      },
    ],
    2: [
      { // Espionnage
        description: (t) => t('effect_description_espionage'),
        timing: "otherCardPlayed",
        execute: async function (ctx) {
          let discarded: GameCard[] = [];
          for(const card of ctx.cardsForTrigger ? ctx.cardsForTrigger : []) {
            if(card.GetType(ctx.t).includes(ctx.t('person'))) {
              let choice = ctx.t('string_choice_discard_two_other_cards');
              if(!getLastCheckboxChecked(ctx.card) && ctx.fetchCardsInZone(() => true, ctx.t('playArea')).length > discarded.length) {
                choice = await ctx.selectStringChoice(ctx.t('effect_description_espionage'), [ctx.t('string_choice_discard_two_other_cards'), ctx.t('string_choice_add_one_check')]);
              }
              if(choice === ctx.t('string_choice_discard_two_other_cards')) {
                const cards = await ctx.selectCardsFromZone((c) => !discarded.includes(c), ctx.zone, this.description(ctx.t), 2, ctx.card);
                discarded = [...discarded, ...cards];
              }
              else {
                await checkNextBox(ctx.card);
                if(getLastCheckboxChecked(ctx.card)) {
                  /* Mill Deck */
                  ctx.mill(ctx.fetchCardsInZone(() => true, ctx.t('deck')).length);
                }

              }
            }
          }
          for(const card of discarded) {
            await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          return false;
        }
      },
      {
        description: (t) => t('none'),
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.card.currentSide = 4;
          return false;
        }
      },
    ],
    3: [
      { // Resistance
        description: (t) => t('effect_description_resistance'),
        timing: "onClick",
        execute: async function (ctx) {
          addResourceMapToCard(ctx.card, { sword: ctx.resources.sword });
          ctx.setResources(prev => ({ ...prev, sword: 0 }));
          return false;
        }
      },
      {
        description: (t) => t('effect_description_resistance'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const land = (await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card))[0];
          addResourceMapToCard(land, {fame: ((ctx.card.GetResources()[0].sword ?? 0) > 100 ? 100: ctx.card.GetResources()[0].sword)})
          ctx.deleteCardInZone(ctx.t('permanentZone'), ctx.card.id);
          return false;
        }
      },
    ],
    4: [
      { // Attaque
        description: (t) => t('effect_description_attack'),
        timing: "endOfTurn",
        execute: async function (ctx) {
          let hasSword = false;
          for(const card of (ctx.fetchCardsInZone(() => true, ctx.t('playArea')))) {
            for(const resourceMap of card.GetResources()) {
              if(resourceMap.sword) {
                hasSword = true;
                break;
              }
            }
            if(hasSword) {
              break;
            }
          }
          if(!hasSword) {
            const card = (await ctx.selectCardsFromZone((c) => getResourcesCount(c.GetResources()[0]) !== 0, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card))[0];
            if(card) {
              let resources: Partial<ResourceMap>|null = null;
              while(resources === null) {
                resources = (await ctx.selectResourceChoice(card.GetResources()));
              }
              resources = { coin: resources.coin ? 1 : 0, wood: resources.wood ? 1 : 0, stone: resources.stone ? 1 : 0,
                            sword: resources.sword ? 1 : 0, metal: resources.metal ? 1 : 0, tradegood: resources.tradegood ? 1 : 0};
              await removeResourceFromCard(card, resources);
            }
          }
          return false;
        }
      },
      {
        description: (t) => t('effect_description_attack'),
        timing: "endOfRound",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1], ctx.t('deck'), this.description(ctx.t), 1, ctx.card))[0];
          const resource = (await ctx.selectResourceChoice([{ coin: 1}, {wood: 1}, {stone: 1}, {sword: 1}, {metal: 1}, {tradegood: 1 }])) ?? {};
          await ctx.boostProductivity((c) => c.id === card.id, ctx.t('deck'), this.description(ctx.t), resource);
          ctx.card.currentSide = 3;
          return false;
        }
      },
    ],
  },
};

export const cardFameValueRegistry: Record<number, Record<number, CardFameValue>> = {
  34: {
    1: { // Inventrice
      description: "Vaut 5 par check",
      execute: function(ctx)  {
        return 5 * (ctx.card.checkboxes[0].filter(cb => cb.checked).length);
      }
    },
    3: { // Inventrice Inspirée
      description: "Vaut 5 par check",
      execute: function(ctx)  {
        return 5 * (ctx.card.checkboxes[0].filter(cb => cb.checked).length);
      }
    }
  },
  38: {
    1: { // L'Union fait la Force
      description: "Vaut 2 par Personne",
      execute: function(ctx)  {
        return 2 * (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('deck')).length);
      }
    },
    3: { // Domination Militaire
      description: "Vaut 2 par production de sword",
      execute: function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, ctx.t('deck'));

        const totalMilitary = cards.reduce((sum, card) => {
          const resourceMaps = card.GetResources() || [];

          const maxMilitary = resourceMaps.reduce(
            (max, res) => Math.max(max, res.sword || 0),
            0
          );

          return sum + maxMilitary;
        }, 0);

        return totalMilitary * 2;
      }
    }
  },
  39: {
    1: { // Elargir les frontières
      description: "Vaut -2 par carte manquante jusqu'à la taille de 70",
      execute: function(ctx)  {
        return Math.min(-2 * (70 - (ctx.fetchCardsInZone(() => (true), ctx.t('deck')).length)), 0);
      }
    },
    3: { // Optimisation
      description: "Vaut -1 par carte sans fame",
      execute: function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, ctx.t('deck'));

        const noFameCount = cards.filter(card => {
          const resourceMaps = card.GetResources() || [];
          return resourceMaps.every(res => (res.fame || 0) === 0);
        }).length;

        return -1 * noFameCount;
      }
    }
  },
  40: {
    1: { // Loyauté
      description: "Vaut 35 s'il n'y a plus d'Ennemi",
      execute: function(ctx)  {
        return (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('deck')).length === 0) ? 35 : 0;
      }
    },
    3: { // Commerce
      description: "Vaut 25 si vous produisez 8+ tradegood",
      execute: function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, ctx.t('deck'));

        const totalExport = cards.reduce((sum, card) => {
          const resourceMaps = card.GetResources() || [];

          const exportProduced = resourceMaps.reduce(
            (max, res) => Math.max(max, res.tradegood || 0),
            0
          );

          return sum + exportProduced;
        }, 0);

        return (totalExport >= 8) ? 25 : 0;
      }
    }
  },
  89: {
    4: { // Prison
      description: "Vaut 2 par check",
      execute: function(ctx)  {
        return 2 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  91: {
    3: { // L'Arche
      description: "Vaut 1 par check",
      execute: function(ctx)  {
        return (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  95: {
    1: { // Astronome
      description: "Vaut 2 par check",
      execute: function(ctx)  {
        return 2 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  106: {
    3: { // Camelot
      description: "Vaut 5 par check",
      execute: function(ctx)  {
        return 5 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  121: {
    3: { // Reine Jemimah
      description: "Vaut 3 par check",
      execute: function(ctx)  {
        return 3 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  125: {
    3: { // Temple de la Lumière
      description: "Vaut 10 par check",
      execute: function(ctx)  {
        return 10 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  128: {
    3: { // Site de Fouilles
      description: "Vaut 7 par check",
      execute: function(ctx)  {
        return 7 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  130: {
    4: { // Double Muraille
      description: "Vaut 4 par Muraille",
      execute: function(ctx)  {
        return 4 * (ctx.fetchCardsInZone((c) => c.GetName(ctx.t).includes(ctx.t('wall')), ctx.t('deck')).length);
      }
    }
  },
  134: {
    1: { // Rival Beau-Gosse
      description: "Vaut -5 par non-check",
      execute: function(ctx)  {
        return -5 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => !cb.checked).length);
      }
    }
  },
  135: {
   1: { // Terres Frontalières
      description: "Vaut side 3",
      execute: function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[2];

          const fameCount = resourceMaps.reduce(
            (max, res) => Math.max(max, res.fame || 0),
            0
          );

          return sum + fameCount;
        }, 0);
      }
    },
    2: { // Occupation
      description: "Vaut side 3",
      execute: function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[2] || [];

          const fameCount = resourceMaps.reduce(
            (max, res) => Math.max(max, res.fame || 0),
            0
          );

          return sum + fameCount;
        }, 0);
      }
    },
    4: { // Villages Alliés
      description: "Vaut side 3",
      execute: function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[2] || [];

          const fameCount = resourceMaps.reduce(
            (max, res) => Math.max(max, res.fame || 0),
            0
          );

          return sum + fameCount;
        }, 0);
      }
    }
  },
}

export const cardUpgradeAdditionalCostRegistry: Record<number, Record<number, CardUpgradeCost>> = {
  49: {
    1: {
      description: "Détruisez le Pont de Pierre (12)",
      execute: async function (ctx) {
        const card = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === "Pont de Pierre", ctx.t('playArea'))[0];
        if(card) {
          ctx.deleteCardInZone(ctx.t('playArea'), card.id);
          return true;
        }
        return false;
      }
    }
  },
  59: {
    1: {
      description: "Défaussez 1 Personne",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 1, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  66: {
    1: {
      description: "Défaussez 2 Personnes, 2 Terrains, 2 Bâtiments",
      execute: async function (ctx) {
        if( ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2 ||
            ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea')).length < 2 ||
            ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea')).length < 2
          )
        {
          return false;
        }
        const people = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card);
        if (people.length !== 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const lands = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'), this.description, 2, ctx.card);
        if (lands.length !== 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const buildings = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea'), this.description, 2, ctx.card);
        const cards = [...people, ...lands, ...buildings];
        if(cards.length === 6) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length === 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  74: {
    4: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  75: {
    4: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  93: {
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "Défaussez 2 Maritimes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('seafaring')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length === 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  109: {
    1: {
      description: "Défaussez 1 Personne",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 1, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  127: {
    3: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length === 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  128: {
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card);
        if(cards.length !== 0) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
}

export const cardSelectionValues: Record<number, Record<number, Record<string, number>>> = {
  73: { // TODO : Finish implementation
    2: { // Mineurs
      "Personne": 2
    }
  }
};

export function getCardEffects(cardId: number, side: number, timing?: EffectTiming) {
  const effects = cardEffectsRegistry[cardId]?.[side] ?? [];
  return timing ? effects.filter(e => e.timing === timing) : effects;
}

export function getCardFameValue(cardId: number, side: number) {
  return cardFameValueRegistry[cardId]?.[side] ?? [];
}

export function getCardUpgradeAdditionalCost(cardId: number, side: number) {
  return cardUpgradeAdditionalCostRegistry[cardId]?.[side] ?? [];
}

export function getCardSelectionValue(card: GameCard, searchType: string): number {
  const cardValues = cardSelectionValues[card.id];
  if (!cardValues) return 1;
  
  const sideValues = cardValues[card.currentSide];
  if (!sideValues) return 1;
  
  const typeValue = sideValues[searchType];
  if (typeValue !== undefined) return typeValue;
  
  return 1;
}
