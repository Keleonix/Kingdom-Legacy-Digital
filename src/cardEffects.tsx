import { parseEffects } from "./utils";
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
  handleGainResources: (card: GameCard, resources: Partial<ResourceMap>, zone: string, toZone?: string) => Promise<void>;
  handlePayResources: (card: GameCard, resources: Partial<ResourceMap>, zone: string, toZone?: string) => Promise<boolean>;
  draw: (n: number) => void;
  effectEndTurn: () => void;
  dropToPlayArea: (payload: DropPayload) => Promise<void>;
  dropToBlocked: (payload: DropPayload) => Promise<void>;
  dropToDeck: (payload: DropPayload) => Promise<void>;
  dropToDiscard: (payload: DropPayload) => Promise<void>;
  dropToCampaign: (payload: DropPayload) => Promise<void>;
  dropToPermanent: (payload: DropPayload) => Promise<void>;
  setDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPlayArea: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setDiscard: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPermanentZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setCampaignDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardList: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardListImmediate: (cards: GameCard[]) => void;
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPurgedCards: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  mill: (nbCards: number) => Promise<void>;
  openCheckboxPopup: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) => void ;
  selectResourceChoice: (options: Partial<ResourceMap> | Partial<ResourceMap>[], totalLevel: number, rawInput?: boolean) => Promise<Partial<ResourceMap> | null>;
  selectCardsFromZone: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, requiredCount: number, triggeringCard?: GameCard, optionalCount?: number, searchType?: string) => Promise<GameCard[]>;
  selectCardsFromArray: (cards: GameCard[], zone: string, effectDescription: string, requiredCount: number, optionalCount?: number, triggeringCard?: GameCard, searchType?: string) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number, triggeringCard?: GameCard, optionalCount?: number, zone?: string) => Promise<boolean>;
  boostProductivity: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, prodBoost: Partial<ResourceMap> | null, triggeringCard?: GameCard) => Promise<boolean>;
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
  upgradeCard: (card: GameCard, nextSide: number, forced?: boolean) => Promise<boolean>;
  handleCardUpdate: (updatedCard: GameCard, zone: string) => void;
  handleEnemyDefeated: (card: GameCard, zone: string) => Promise<void>;
  addDiscoverableCard: (cardId: number, force?: boolean) => void;
  getCardProduction: (card: GameCard, zone: string) => Partial<ResourceMap>[];
  hasBeenUsedThisTurn: (cardId: number, effectIndex: number) => number;
  markAsUsedThisTurn: (cardId: number, effectIndex: number) => void;
  t: (key: TranslationKeys) => string;
  startTutorial?: () => Promise<void>;
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
  priority?: number;
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

async function applyResourceMapDelta(
  ctx: GameContext,
  delta: Partial<ResourceMap>,
  deduct?: boolean
) {
  if (deduct) {
    return await ctx.handlePayResources(ctx.card, delta, ctx.zone, ctx.t('none'));
  }
  else {
    await ctx.handleGainResources(ctx.card, delta, ctx.zone, ctx.t('none'));
  }
  return true;
}

async function addResourceMapToCard(
  card: GameCard,
  added: Partial<ResourceMap> | undefined
) {
  if (!added) {
    return;
  }
  if (!card.GetResources()) {
    card.resources[card.currentSide - 1] = [{...emptyResource}];
  }
  for (const key in added) {
    const resourceKey = key as keyof ResourceMap;
    const amount = added[resourceKey] ?? 0;
    for (const resourceMap of card.GetResources()) {
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
    1: [{ // Bienvenue
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        if (ctx.startTutorial) {
          await ctx.dropToPlayArea({id: 41, fromZone: 'campaign'});
          await ctx.startTutorial();
          ctx.setPlayArea(() => []);
        }
        return false;
      }
    }]
  },
  1: {
    2: [{ // Plaines
      description: (t) => parseEffects(t('effect_description_plains')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          await applyResourceMapDelta(ctx, { coin: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_plains')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          await applyResourceMapDelta(ctx, { coin: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_plains')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          await applyResourceMapDelta(ctx, { coin: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_plains')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.negative[card.currentSide - 1]) && card.id != ctx.card.id),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          await applyResourceMapDelta(ctx, { coin: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { stone: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => parseEffects(t('effect_description_shallow_mines')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  6: {
    2: [{ // Zone Rocheuse
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { stone: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => parseEffects(t('effect_description_shallow_mines')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  7: {
    1: [{ // Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { wood: 3 });
        await ctx.upgradeCard(ctx.card, 2, true);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => parseEffects(t('effect_description_sacred_well')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  8: {
    1: [{ // Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { wood: 3 });
        await ctx.upgradeCard(ctx.card, 2, true);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => parseEffects(t('effect_description_sacred_well')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  9: {
    2: [{ // Hôtel de Ville
      description: (t) => parseEffects(t('effect_description_town_hall')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land'
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    3: [{ // Château
      description: (t) => parseEffects(t('effect_description_castle')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    4: [{ // Donjon
      description: (t) => parseEffects(t('effect_description_keep')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land')) || card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land - building'
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { wood: 1 });
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: (t) => parseEffects(t('effect_description_bazaar')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ wood: 1, stone: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: (t) => parseEffects(t('effect_description_market')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ wood: 1, stone: 1, metal: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
  },
  11: {
    1: [{ // Jungle
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { wood: 1 });
          return true;
        }
        return false;
      }
    }],
    2: [{ // Arbres Géants
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { wood: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Cabane dans les Arbres
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_explorers')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        (await ctx.discoverCard(
          (card) => ([71, 72, 73, 74].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        ))
        await ctx.upgradeCard(ctx.card, 4, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
  },
  13: {
    1: [{ // Exploitant
      description: (t) => parseEffects(t('effect_description_field_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
    3: [{ // Domestique
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        return false;
      }
    }],
  },
  14: {
    1: [{ // Bandit
      description: (t) => parseEffects(t('effect_description_bandit')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (ctx.getCardProduction(card, ctx.zone).some((res) => (res.coin ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0);
        }
        if (selectedCards.length !== 0) {
          await ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: (t) => parseEffects(t('none')).effects[1].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 1) {
          if (! await applyResourceMapDelta(ctx, { sword: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: (t) => parseEffects(t('effect_description_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'building'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  15: {
    2: [{ // Zone Rocheuse
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { stone: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => parseEffects(t('effect_description_shallow_mines')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  16: {
    1: [{ // Bandit
      description: (t) => parseEffects(t('effect_description_bandit')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (ctx.getCardProduction(card, ctx.zone).some((res) => (res.coin ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0);
        }
        if (selectedCards.length !== 0) {
          await ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: (t) => parseEffects(t('none')).effects[1].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 1) {
          if (! await applyResourceMapDelta(ctx, { sword: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: (t) => parseEffects(t('effect_description_field_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
  },
  17: {
    2: [{ // Chappelle
      description: (t) => parseEffects(t('effect_description_chapel')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3 && ctx.fetchCardsInZone((c) => c.id === 103, ctx.t('campaign')).length > 0) {
          if (! await applyResourceMapDelta(ctx, { coin: 3 }, true)) {
            return false;
          }
          return await ctx.discoverCard((card) => ([103].includes(card.id)), this.description(ctx.t), 1, ctx.card );
        }
        return false;
      }
    }],
    3: [{ // Cathédrale
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_church')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 4 && ctx.fetchCardsInZone((c) => c.id === 104, ctx.t('campaign')).length > 0) {
          if (! await applyResourceMapDelta(ctx, { coin: 4 }, true)) {
            return false;
          }
          return await ctx.discoverCard((card) => ([104].includes(card.id)), this.description(ctx.t), 1, ctx.card);
        }
        return false;
      }
    }],
  },
  18: {
    2: [{ // Forge
      description: (t) => parseEffects(t('effect_description_smithy')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => (
            [90].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
          await ctx.upgradeCard(ctx.card, 1, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Muraille
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
    4: [{ // Armurerie
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { sword: ctx.filterZone(ctx.t('playArea'), (card: GameCard) => (card.GetType(ctx.t) == ctx.t('person'))).length });
        return true;
      }
    }],
  },
  19: {
    1: [{ // Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { wood: 3 });
        await ctx.upgradeCard(ctx.card, 2, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => parseEffects(t('effect_description_sacred_well')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Phare
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          await ctx.mill(1);
          return false;
        }
      },
    ],
    4: [{ // Bateau de Pêche
      description: (t) => parseEffects(t('effect_description_fishing_boat')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([75].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          return true;
        }
        return false;
      }
    }],
  },
  23: {
    1: [{ // STOP
        description: (t) => parseEffects(t('none')).effects[0].text,
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
        description: (t) => parseEffects(t('effect_description_fertile_soil_efficiency')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const selected: GameCard = (await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0, 'land'))[0];
          await addResourceMapToCard(selected, { coin: 1 });
          /* Tempo to let popup properly discard */
          await ctx.mill(0);
          await ctx.boostProductivity((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), null, ctx.card)
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
  },
  25: {
    1: [{ // Armée
        description: (t) => parseEffects(t('effect_description_army')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          let militaryToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            militaryToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.sword >= militaryToPay) {
            if (! await applyResourceMapDelta(ctx, { sword: militaryToPay }, true)) {
              return false;
            }
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
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
            await ctx.upgradeCard(ctx.card, 3, true);
            await ctx.discoverCard(
              (card) => ([135].includes(card.id)),
              this.description(ctx.t),
              1,
              ctx.card
            )
          }
          return false;
        }
      }],
    3: [{ // Grande Armée
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (getLastCheckboxChecked(ctx.card)) {
            return false;
          }
          let checkedBoxes = 0;
          const militaryToPay = [10, 10, 12, 12, 15];
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            checkedBoxes += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.sword >= militaryToPay[checkedBoxes]) {
            if (! await applyResourceMapDelta(ctx, { sword: militaryToPay[checkedBoxes] }, true)) {
              return false;
            }
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
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
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.coin >= goldToPay) {
            if (! await applyResourceMapDelta(ctx, { coin: goldToPay }, true)) {
              return false;
            }
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
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
            await ctx.upgradeCard(ctx.card, 3, true);
          }
          return false;
        }
      }],
    3: [{ // Immense Trésor
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (getLastCheckboxChecked(ctx.card)) {
            return false;
          }
          let goldToPay = 12;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.coin >= goldToPay) {
            if (! await applyResourceMapDelta(ctx, { coin: goldToPay }, true)) {
              return false;
            }
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
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
        description: (t) => parseEffects(t('none')).effects[0].text,
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
                        choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1 }, 1);
                      }
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType(ctx.t) === ctx.t('land')), ctx.t('deck'), ctx.t('eor_export_10'), choice, ctx.card);
                      }
                    },
                    false
                  );
                  break;
                case 20:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_20'),
                    async () => {
                      const card = (await ctx.selectCardsFromZone((card) => (card.GetType(ctx.t).includes(ctx.t('person'))), ctx.t('deck'), ctx.t('eor_export_20'), 1, ctx.card, 0, 'person')).slice(0)[0];
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
                        ctx.card,
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
                        choice = await ctx.selectResourceChoice({ metal: 1, sword: 1, tradegood: 1 }, 1);
                      }
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType(ctx.t) === ctx.t('building')), ctx.t('deck'), ctx.t('eor_export_40'), choice, ctx.card);
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
                        choice = await ctx.selectResourceChoice({ wood: 1, stone: 1, metal: 1, sword: 1 }, 1);
                      }
                      if(choice) {
                        await ctx.boostProductivity(() => (true), ctx.t('deck'), ctx.t('eor_export_55'), choice, ctx.card);
                      }
                    },
                    false
                  );
                  break;
                case 75:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_75'),
                    async () => {
                      await ctx.boostProductivity(() => (true), ctx.t('deck'), ctx.t('eor_export_75'), { fame: 5 }, ctx.card);
                    },
                    false
                  );
                  break;
                case 100:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_export_100'),
                    async () => {
                      await ctx.upgradeCard(ctx.card, 3, true);
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
        description: (t) => parseEffects(t('effect_description_mass_export')).effects[0].text,
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
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('land'))), ctx.t('deck'), ctx.t('eor_mass_export_25'), { fame: 1 }, ctx.card);
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('land'))), ctx.t('deck'), ctx.t('eor_mass_export_25'), { fame: 1 }, ctx.card);
                    },
                    false
                  );
                  break;
                case 50:
                  ctx.registerEndRoundEffect(
                    ctx.t('export') + ctx.t('eor_mass_export_50'),
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('person'))), ctx.t('deck'), ctx.t('eor_mass_export_50'), { fame: 5 }, ctx.card);
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
                        ctx.card,
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
                      await ctx.boostProductivity((card) => (card.GetType(ctx.t).includes(ctx.t('building'))), ctx.t('deck'), ctx.t('eor_mass_export_100'), { fame: 5 }, ctx.card);
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
                          1,
                          ctx.card,
                          0
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
                        ctx.card,
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
      description: (t) => parseEffects(t('effect_description_volcanic_eruption')).effects[0].text,
      timing: "otherCardPlayed",
      execute: async function (ctx) {
        const selectableCards = [];
        for (const card of (ctx.cardsForTrigger?? [])) {
          if (card.GetType(ctx.t).includes(ctx.t('land'))) selectableCards.push(card);
        }
        if(selectableCards.length !== 0) {
          ctx.deleteCardInZone(ctx.t('playArea'), (await ctx.selectCardsFromArray(selectableCards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land'))[0].id);
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Jeune Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedSides = await new Promise<number[]>((resolve) => {
          ctx.selectCardSides(ctx.card, 1, 0, resolve);
        });
        const resourcesCount = getResourcesCount(ctx.card.resources[selectedSides[0] - 1][0]);
        if (selectedSides.length > 0 && ((selectedSides[0] !== 4 && resourcesCount <= 1) || (selectedSides[0] === 4 && resourcesCount <= 4))) {
          const targetSide = selectedSides[0];
          
          const resourceChoice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, metal: 1, sword: 1 }, 1);
          
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
          await ctx.upgradeCard(ctx.card, 1, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  30: {
    1: [{ // STOP !
      description: (t) => parseEffects(t('effect_description_stop_2')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 31 && card.id <= 34), ctx.t('campaign'), this.description(ctx.t), 2, ctx.card, 0)).splice(0);
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
      description: (t) => parseEffects(t('effect_description_entrepreneur')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 118, ctx.t('effect_description_entrepreneur'), 1, ctx.card)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Hôtel
      description: (t) => parseEffects(t('effect_description_hotel')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length === 0) {
          return false;
        }
        await applyResourceMapDelta(ctx, { coin: ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length });
        return true;
      }
    }],
    3: [{ // Taverne
      description: (t) => parseEffects(t('effect_description_tavern')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => card.id === 87, ctx.t('effect_description_tavern'), 1, ctx.card));
      }
    }],
    4: [{ // Bar Confortable
      description: (t) => parseEffects(t('effect_description_cozy_pub')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === 92, ctx.t('campaign')).length !== 1) return false;
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'person'))[0];
        if(card && (await ctx.discoverCard((card) => card.id === 92, ctx.t('effect_description_cozy_pub'), 1, ctx.card))) {
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          return true;
        }
        return false;
      }
    }],
  },
  32: {
    1: [{ // Scientifique
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_observatory')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 95, this.description(ctx.t), 1, ctx.card)) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
    4: [{ // Laboratoire
      description: (t) => parseEffects(t('effect_description_lab')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 96, this.description(ctx.t), 1, ctx.card)) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
  },
  33: {
    1: [{ // Ingénieur
      description: (t) => parseEffects(t('effect_description_engineer')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = [ctx.t('lumberjack'), ctx.t('food_barns'), ctx.t('fishing_boat')];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName(ctx.t)), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (100 + cardsNames.indexOf(card.GetName(ctx.t))), this.description(ctx.t), 1, ctx.card);
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
      description: (t) => parseEffects(t('effect_description_trebuchet')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const playAreaCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
        const discardCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        const permanentCards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('permanentZone'));
        const card = (await ctx.selectCardsFromArray([...playAreaCards, ...discardCards, ...permanentCards], ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
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
      description: (t) => parseEffects(t('effect_description_inspired_inventor')).effects[0].text,
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
          const resourcesChoice = {coin: 1, wood: 1, stone: 1, metal: 1, sword: 1, tradegood: 1};
          
          const selectedResource = await ctx.selectResourceChoice(resourcesChoice, checkedBoxes);
          
          if (selectedResource !== null) {
            await applyResourceMapDelta(ctx, selectedResource);
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await checkNextBox(ctx.card);
            return true;
          }
        }
        else {
          if((await ctx.discoverCard(
            (card) => card.id >= 97 && card.id <= 99, 
            this.description(ctx.t), 
            1,
            ctx.card
          )).valueOf()) {
            await ctx.upgradeCard(ctx.card, 1, true);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { stone: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => parseEffects(t('effect_description_shallow_mines')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  36: {
    1: [{ // Mercenaire
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if(! await applyResourceMapDelta(ctx, { coin: 2 }, true)) {
          return false;
        }
        return new Promise<boolean>((resolve) => {
          ctx.openCheckboxPopup(ctx.card, 1, 1, async (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
              }
              await checkBoxes(ctx.card, boxes);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
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
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.metal >= 3) {
            if (! await applyResourceMapDelta(ctx, { metal: 3 }, true)) {
              return false;
            }
            await addResourceMapToCard(ctx.card, { sword: 1});
            ctx.effectEndTurn();
            this.unusable = true;
            this.timing = 'doesNothing';
            return false;
          }
          return false;
        }
      },
      { // Sir ___
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.metal >= 4) {
            if (! await applyResourceMapDelta(ctx, { metal: 4 }, true)) {
              return false;
            }
            await addResourceMapToCard(ctx.card, { sword: 1});
            ctx.effectEndTurn();
            this.unusable = true;
            this.timing = 'doesNothing';
            return false;
          }
          return false;
        }
      }
    ],
  },
  37: {
    1: [{ // STOP
        description: (t) => parseEffects(t('none')).effects[0].text,
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          await ctx.mill(1);
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text,
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                }
                await checkBoxes(ctx.card, boxes);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 1, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                }
                await checkBoxes(ctx.card, boxes);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
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
      description: (t) => parseEffects(t('effect_description_field_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
              return true;
            }
          }
          return false;
      }
    }],
    3: [
      { // Grenier
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Grenier
        description: (t) => parseEffects(t('effect_description_storage')).effects[1].text,
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
      description: (t) => parseEffects(t('effect_description_mason')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if(ctx.resources.coin >= 2 && (ctx.fetchCardsInZone((c) => [88, 89].includes(c.id), ctx.t('campaign')))) {
          if (! await applyResourceMapDelta(ctx, { coin: 2 }, true)) {
            return false;
          }
          return await ctx.discoverCard((card) => ([88, 89].includes(card.id)), this.description(ctx.t), 1, ctx.card);
        }
        return false;
      }
    }],
    3: [{ // Route Pavée
        description: (t) => parseEffects(t('effect_description_brick_road')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([109, 110].includes(card.id)),
            ctx.t('campaign'),
            this.description(ctx.t),
            1,
            ctx.card,
            0
          );
          const card = cards[0];
          if (card) {
            await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('campaign')});
            const id = (card.id === 109) ? 110 : 109;
            ctx.deleteCardInZone(ctx.t('campaign'), id);
            ctx.effectEndTurn();
            return false;
          }
          return false;
        }
      }],
      4: [{ // Rue Pavée
        description: (t) => parseEffects(t('effect_description_stone_street')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([111, 112].includes(card.id)),
            ctx.t('campaign'),
            this.description(ctx.t),
            1,
            ctx.card,
            0
          );
          const card = cards[0];
          if (card) {
            await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('campaign')});
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        await ctx.mill(3);
        await ctx.upgradeCard(ctx.card, 3, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [
      { // Pluie
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onResourceGain",
        execute: async function (ctx) {
          const card = (ctx.cardsForTrigger?ctx.cardsForTrigger:[])[0];
          if(card.GetType(ctx.t).includes(ctx.t('land'))) {
            Object.keys(ctx.resources).forEach(key => {
              ctx.resources[key as keyof ResourceMap] *= 2;
            });
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "restrictPlay",
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 1, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ]
  },
  45: {
    1: [
      { // Chevalier Noir
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
      description: (t) => parseEffects(t('none')).effects[1].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
            return false;
          }
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
          return true;
        }
        return false;
      }
    },
    ],
    3: [{ // Garçon Admiratif
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          await applyResourceMapDelta(ctx, { sword: 2 });
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
    4: [{ // Ecuyer
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { sword: 3 });
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  46: {
    2: [{ // Camp d'Entrainement
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.coin >= 1) {
            if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
              return false;
            }
            await applyResourceMapDelta(ctx, { sword: 1 });
            return true;
          }
          return false;
        }
      }]
  },
  47: {
    1: [{ // STOP !
      description: (t) => parseEffects(t('effect_description_stop_3')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 48 && card.id <= 51), ctx.t('campaign'), this.description(ctx.t), 2, ctx.card, 0)).splice(0);
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
      description: (t) => parseEffects(t('effect_description_envoy')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([119].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            await applyResourceMapDelta(ctx, {coin: 3}, true);
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    2: [{ // Emissaire
      description: (t) => parseEffects(t('effect_description_emissary')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([120].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            await applyResourceMapDelta(ctx, {coin: 3}, true);
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    3: [{ // Ambassadeur
      description: (t) => parseEffects(t('effect_description_ambassador')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([121].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            await applyResourceMapDelta(ctx, {coin: 3}, true);
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    4: [{ // Diplomate
      description: (t) => parseEffects(t('effect_description_diplomat')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 3) {
          if (await ctx.discoverCard(
            (card) => ([122].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            await applyResourceMapDelta(ctx, {coin: 3}, true);
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
  },
  49: {
    1: [{ // Architecte Royal
      description: (t) => parseEffects(t('effect_description_royal_architect')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = [ctx.t('castle'), ctx.t('diamond_mine'), ctx.t('temple')];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName(ctx.t)), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0)).slice(0)[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (123 + cardsNames.indexOf(card.GetName(ctx.t))), this.description(ctx.t), 1, ctx.card);
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
      description: (t) => parseEffects(t('effect_description_traveller_1')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([126].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Voyageur
      description: (t) => parseEffects(t('effect_description_traveller_2')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([127].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [
      { // Voyageur
        description: (t) => parseEffects(t('effect_description_traveller_3')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([129].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_traveller_3')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'land');
          const card = cards[0];
          if (card) {
            const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
            if (!choice) {
              return false;
            }
            await applyResourceMapDelta(ctx, choice);
            await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
            return true;
          }
          return false;
        }
      },
    ],
    4: [{ // Voyageur
      description: (t) => parseEffects(t('effect_description_traveller_4')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([128].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  51: {
    1: [{ // Magistrat
      description: (t) => parseEffects(t('effect_description_magistrate_1')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([130].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Magistrat
      description: (t) => parseEffects(t('effect_description_magistrate_2')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([131].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [{ // Stratège
      description: (t) => parseEffects(t('effect_description_strategist')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.GetName(ctx.t).includes(ctx.t('wall')) || card.GetType(ctx.t).includes(ctx.t('knight')),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'knight'
        );
        const card = cards[0];
        if (card) {
          await ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    4: [{ // Magistrat
      description: (t) => parseEffects(t('effect_description_magistrate_3')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([132].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  52: {
    3: [{ // Village Culminant
      description: (t) => parseEffects(t('effect_description_peak_village')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([105].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          await ctx.upgradeCard(ctx.card, 1, true);
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
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_witch')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const people = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'));
          if (people.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 3) {
            return false;
          }
          const cards = (await ctx.selectCardsFromArray(people, ctx.t('playArea'), this.description(ctx.t), 3, 0, ctx.card, 'person'));
          if (cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 3) {
            await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_witch')).effects[2].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, ctx.t('campaign'))
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description(ctx.t), 2, ctx.card);
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Hutte de la Sorcière
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_witch_cabin')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'person'))[0];
          if (card) {
            ctx.deleteCardInZone(ctx.t('playArea'), card.id);
            ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_witch_cabin')).effects[2].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, ctx.t('campaign'))
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description(ctx.t), 2,ctx.card);
          ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
          return false;
        }
      }
    ]
  },
  54: {
    1: [{ // Scribe
      description: (t) => parseEffects(t('effect_description_scribe')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Architecte
      description: (t) => parseEffects(t('effect_description_architect')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await ctx.discoverCard((card) => ([78, 79].includes(card.id)), this.description(ctx.t), 1, ctx.card);
        await ctx.upgradeCard(ctx.card, 1, true);
        await ctx.dropToDiscard({id: ctx.card.id, fromZone: ctx.zone})
        ctx.effectEndTurn();
        return true;
      }
    }],
  },
  55: {
    1: [
      { // Lord Aethan
        description: (t) => parseEffects(t('effect_description_lord_aethan')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([80, 81].includes(card.id)),
            this.description(ctx.t),
            1,
            ctx.card
          )) {
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (getLastCheckboxChecked(ctx.card)) {
            return false;
          }
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                }
                await checkBoxes(ctx.card, boxes);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              }
              resolve(false);
            });
          });
        }
      }
    ],
    3: [
      { // Lord Nimrod
        description: (t) => parseEffects(t('effect_description_lord_nimrod')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([133, 134].includes(card.id)),
            this.description(ctx.t),
            2,
            ctx.card
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (getLastCheckboxChecked(ctx.card)) {
            return false;
          }
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                }
                await checkBoxes(ctx.card, boxes);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_plague')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          const people = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('deck'));
          if (people.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
            return false;
          }
          const selected = (await ctx.selectCardsFromArray(people, ctx.t('deck'), this.description(ctx.t), 2, 0, ctx.card, 'person'));
          if (selected.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
            return false;
          }
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      },
    ],
    3: [
      { // Soldat Ennemi
        description: (t) => parseEffects(t('effect_description_enemy_soldier')).effects[0].text,
        timing: "played",
        execute: async function (ctx) {
          const cards = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('building')) || c.GetType(ctx.t).includes(ctx.t('land')) && c.id !== ctx.card.id, ctx.t('playArea'));
          if (cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'land - building'), 0) < 1) {
            return false;
          }
          const selected = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land - building'));
          if (selected.reduce((sum, c) => sum + getCardSelectionValue(c, 'land - building'), 0) < 1) {
            return false;
          }
          if (selected.length !== 0) {
            await ctx.dropToBlocked({id: selected[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selected[0].id]);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('staysInPlay')).effects[1].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text,
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
        description: (t) => parseEffects(t('effect_description_enemy_soldier')).effects[3].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            if (! await applyResourceMapDelta(ctx, { sword: 2 }, true)) {
              return false;
            }
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
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
        description: (t) => parseEffects(t('effect_description_assassin')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function (ctx) {
          const selectableCards = [];
          for (const card of (ctx.cardsForTrigger?? [])) {
            if (card.GetType(ctx.t).includes(ctx.t('person'))) selectableCards.push(card);
          }
          if(selectableCards.length !== 0) {
            ctx.deleteCardInZone(ctx.t('playArea'), (await ctx.selectCardsFromArray(selectableCards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0].id);
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 3) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      }
    ],
    3: [
      { // Soldat Ennemi
        description: (t) => parseEffects(t('effect_description_enemy_soldier')).effects[0].text,
        timing: "played",
        execute: async function (ctx) {
          const cards = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('building')) || c.GetType(ctx.t).includes(ctx.t('land')) && c.id !== ctx.card.id, ctx.t('playArea'));
          if (cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'land - building'), 0) < 1) {
            return false;
          }
          const selected = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land - building'));
          if (selected.reduce((sum, c) => sum + getCardSelectionValue(c, 'land - building'), 0) < 1) {
            return false;
          }
          if (selected.length !== 0) {
            await ctx.dropToBlocked({id: selected[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selected[0].id]);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('staysInPlay')).effects[1].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text,
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
        description: (t) => parseEffects(t('none')).effects[3].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            if (! await applyResourceMapDelta(ctx, { sword: 2 }, true)) {
              return false;
            }
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_city_fire')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0, 'building');
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      },
    ],
    4: [{ // Jeune Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Civilisation Oubliée
      description: (t) => parseEffects(t('effect_description_lost_civilization')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if((  ctx.fetchCardsInZone((card) => !card.negative[card.currentSide - 1] && card.id !== ctx.card.id, ctx.t('playArea')).length < 6)
          ||  ctx.fetchCardsInZone((c) => c.id === 108, ctx.t('campaign')).length < 1) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1] && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 6, ctx.card, 0);
        if (cards.length >= 6) {
          if (await ctx.discoverCard((card) => [108].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
            await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
            return true;
          }
        }
        return false;
        }
    }],
  },
  60: {
    1: [{ // Bandit d'Elite
      description: (t) => parseEffects(t('effect_description_skilled_bandit')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (ctx.getCardProduction(card, ctx.zone).some(
            (res) => ((res.coin ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.metal ?? 0) + (res.sword ?? 0) + (res.tradegood ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 3, ctx.card, 0);
        }
        if (selectedCards.length !== 0) {
          await ctx.dropToBlocked({id: selectedCards.map((c) => c.id), fromZone: ctx.zone});
          for (const card of selectedCards) {
            ctx.updateBlocks(ctx.card.id, [card.id]);
          }
        }
        return false;
      }
    },
    {
      description: (t) => parseEffects(t('none')).effects[1].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
          if (!choice) {
            return false;
          }
          if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: (t) => parseEffects(t('effect_description_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('building'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'building'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
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
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 5) {
            if (! await applyResourceMapDelta(ctx, { sword: 5 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
    ],
    3: [{ // Garçon Admiratif
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          await applyResourceMapDelta(ctx, { sword: 2 });
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
    4: [{ // Ecuyer
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { sword: 3 });
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  62: {
    2: [{ // Camp d'Entrainement
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.coin >= 1) {
            if (!await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
              return false;
            }
            await applyResourceMapDelta(ctx, { sword: 1 });
            return true;
          }
          return false;
        }
      }]
  },
  63: {
    3: [{ // Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Aubergiste
      description: (t) => parseEffects(t('effect_description_innkeeper')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'person');
        if (selected.length === 1) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.dropToDiscard({id: selected[0].id, fromZone: ctx.t('playArea')});
          return true;
        }
        return false;
      }
    }],
  },
  64: {
    1: [{ // Bandit d'Elite
      description: (t) => parseEffects(t('effect_description_skilled_bandit')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (ctx.getCardProduction(card, ctx.zone).some(
            (res) => ((res.coin ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.metal ?? 0) + (res.sword ?? 0) + (res.tradegood ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 3, ctx.card, 0);
        }
        if (selectedCards.length !== 0) {
          await ctx.dropToBlocked({id: selectedCards.map((c) => c.id), fromZone: ctx.zone});
          for (const card of selectedCards) {
            ctx.updateBlocks(ctx.card.id, [card.id]);
          }
        }
        return false;
      }
    },
    {
      description: (t) => parseEffects(t('none')).effects[1].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.sword >= 3) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
          if (!choice) {
            return false;
          }
          if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: (t) => parseEffects(t('effect_description_field_worker')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType(ctx.t).includes(ctx.t('land'))),
          ctx.t('playArea'),
          this.description(ctx.t),
          1,
          ctx.card,
          0,
          'land'
        );
        if (selectedCards.length > 0) {
          const choice = await ctx.selectResourceChoice(ctx.getCardProduction(selectedCards[0], ctx.zone), 1);
            if(choice) {
              await applyResourceMapDelta(ctx, choice);
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_tornado')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone(
            (card) => (!(card.negative[card.currentSide - 1])),
            ctx.t('deck'),
            this.description(ctx.t),
            3,
            ctx.card,
            0
          );
          for (const card of selected) {
            ctx.deleteCardInZone(ctx.t('deck'), card.id);
          }
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Innodations
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_flooding')).effects[1].text,
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType(ctx.t).includes(ctx.t('building')));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, ctx.t('playArea'), this.description(ctx.t), 5, ctx.card, 0, 'building');
          }
          if (selectedCards.length !== 0) {
            await ctx.dropToBlocked({id: selectedCards.map((c) => c.id), fromZone: ctx.zone});
            for (const card of selectedCards) {
              ctx.updateBlocks(ctx.card.id, [card.id]);
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_flooding')).effects[2].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          const blockedCards = ctx.getBlockedBy(ctx.card.id);
          ctx.updateBlocks(ctx.card.id, null);
          let selected: GameCard[] = [];
          if (!blockedCards || blockedCards.length === 0) {
            selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1], ctx.t('deck'), this.description(ctx.t), 2, ctx.card, 0);
          }
          else {
            const blockedIds = blockedCards.map((card) => card.id);
            selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1] && !blockedIds.includes(card.id), ctx.t('deck'), this.description(ctx.t), 0, ctx.card, 2);
            if (selected.length !== 2) {
              selected = [];
              while (selected.length !== 1) {
                selected = await ctx.selectCardsFromArray(blockedCards, ctx.t('deck'), this.description(ctx.t), 1, 0, ctx.card);
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
        description: (t) => parseEffects(t('effect_description_young_princess')).effects[0].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2, 'person');
          if (selected.length !== 2) {
            await ctx.upgradeCard(ctx.card, 2, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      }],
      2: [{ // Princesse Pourrie Gâtée
        description: (t) => parseEffects(t('effect_description_spoiled_princess')).effects[0].text,
        timing: "played",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => !card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 2, ctx.card, 0);
          await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
          return false;
        }
      }],
      3: [{ // Princesse Bien Elevée
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
          return false;
        }
      }]
  },
  67: {
    1: [{ // Maladie
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "played",
        execute: async function (ctx) {
          await ctx.mill(1);
          return false;
        }
      }],
      3: [{ // Festin
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
          return false;
        }
      }]
  },
  68: {
    1: [{ // STOP
        description: (t) => parseEffects(t('none')).effects[0].text,
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
        description: (t) => parseEffects(t('effect_description_finishing_touch')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1))[0];
          if (card) {
            await addResourceMapToCard(card, {tradegood: 1, fame: 5});
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }],
      3: [{ // Festin
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 4);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }]
  },
  70: {
    1: [{ // Visite Royale
      description: (t) => parseEffects(t('effect_description_royal_visit')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          ctx.t('playArea'), 
          this.description(ctx.t), 
          1,
          ctx.card,
          0
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
      description: (t) => parseEffects(t('effect_description_inquisitor')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, {stone: 2});
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: (t) => parseEffects(t('effect_description_shallow_mines')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  72: {
    1: [{ // Forêt
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { wood: 3 });
        await ctx.upgradeCard(ctx.card, 2, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: (t) => parseEffects(t('effect_description_sacred_well')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  73: {
    3: [{ // Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_trade_route')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        );
        return false;
      }
    }],
  },
  75: {
    3: [{ // Route Commerciale
      description: (t) => parseEffects(t('effect_description_trade_route')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        );
        return false;
      }
    }],
  },
  76: {
    1: [
      { // Pirate
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function () {return false;}
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onResourceGain",
        execute: async function (ctx) {
          if (ctx.resources.coin > 0) {
            await applyResourceMapDelta(ctx, { coin: 1 }, true);
          }
        return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_pirate')).effects[2].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 2) {
            if (! await applyResourceMapDelta(ctx, { sword: 2 }, true)) {
              return false;
            }
            if ((await ctx.discoverCard((card) => [77].includes(card.id), this.description(ctx.t), 1, ctx.card))) {
              await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
              ctx.deleteCardInZone(ctx.t('playArea'), ctx.card.id);
            }
          }
          return false;
        }
      },
    ],
    3: [{ // Précieux Allié
      description: (t) => parseEffects(t('effect_description_skilled_ally')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => [93].includes(card.id), this.description(ctx.t), 1,ctx.card));
      }
    }],
  },
  77: {
    3: [{ // Sea Gate Wall
      description: (t) => parseEffects(t('effect_description_sea_gate_wall')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('seafaring')), ctx.t('discard'), this.description(ctx.t), 1, ctx.card, 0, ctx.t('seafaring'));
        if (selected.length !== 0) {
          await ctx.dropToPlayArea({id: selected[0].id, fromZone: ctx.t('discard')});
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
      description: (t) => parseEffects(t('effect_description_villa')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1, 'person');
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Demeure
      description: (t) => parseEffects(t('effect_description_estate')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2, 'person');
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Palais
      description: (t) => parseEffects(t('effect_description_palace')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Manoir
      description: (t) => parseEffects(t('effect_description_mansion')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
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
      description: (t) => parseEffects(t('effect_description_cooperation')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const people = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'));
        if (people.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const selected = (await ctx.selectCardsFromArray(people, ctx.t('playArea'), this.description(ctx.t), 2, 0, ctx.card, 'person'));
        if (selected.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false
        }
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
        await ctx.upgradeCard(ctx.card, 3, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [
      { // Faveur
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        return false;
        }
      }
    ]
  },
  81: {
    2: [{ // Domaine Aethien
      description: (t) => parseEffects(t('effect_description_aethan_estate_1')).effects[0].text,
      timing: "onPurge",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromArray(ctx.cardsForTrigger?.filter((c) => c.id !== ctx.card.id) ?? [], ctx.zone, this.description(ctx.t), 0, 1, ctx.card))[0];
        if (card) {
          ctx.setPurgedCards(prev => prev.filter((c) => c.id !== card.id));
        }
        return false;
      }
    }],
    3: [{ // Domaine Aethien
      description: (t) => parseEffects(t('effect_description_aethan_estate_2')).effects[0].text,
      timing: "onPurge",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromArray(ctx.cardsForTrigger?.filter((c) => c.id !== ctx.card.id) ?? [], ctx.zone, this.description(ctx.t), 0, 3, ctx.card));
        if (cards) {
          ctx.setPurgedCards(prev => prev.filter((c) => !cards.map(c => c.id).includes(c.id)));
        }
        return false;
      }
    }],
    4: [{ // Domaine Aethien
      description: (t) => parseEffects(t('effect_description_aethan_estate_3')).effects[0].text,
      timing: "onPurge",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromArray(ctx.cardsForTrigger?.filter((c) => c.id !== ctx.card.id) ?? [], ctx.zone, this.description(ctx.t), 0, 2, ctx.card));
        if (cards) {
          ctx.setPurgedCards(prev => prev.filter((c) => !cards.map(c => c.id).includes(c.id)));
        }
        return false;
      }
    }],
  },
  82: {
    1: [{ // Autel
      description: (t) => parseEffects(t('effect_description_shrine')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: (t) => parseEffects(t('effect_description_sanctuary')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: (t) => parseEffects(t('effect_description_temple')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 4);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: (t) => parseEffects(t('effect_description_oratory')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 3);
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
      description: (t) => parseEffects(t('effect_description_shrine')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: (t) => parseEffects(t('effect_description_sanctuary')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: (t) => parseEffects(t('effect_description_temple')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 4);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: (t) => parseEffects(t('effect_description_oratory')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 3);
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_dubbing')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0, 'person');
          const card = selected[0];
          await addResourceMapToCard(card, {coin: 1, sword: 1});
          card.type[card.currentSide - 1] += ' - knight';
          await ctx.upgradeCard(ctx.card, 3, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          return false;
        }
      }
    ],
    3: [
      { // Faveur
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_favor')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          let choice1;
          let choice2;
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0, 'building');
          while(! choice1) {
            choice1 = await ctx.selectResourceChoice({ wood: 1, stone: 1 }, 1);
          }
          /* Tempo */
          await ctx.mill(0);
          while(! choice2) {
            choice2 = await ctx.selectResourceChoice({ metal: 1, tradegood: 1 }, 1);
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
      description: (t) => parseEffects(t('effect_description_quests')).effects[0].text,
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
        const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, peopleToDiscard[checkedBoxes], 'person');
        // Checkbox
        if (selected.length === peopleToDiscard[checkedBoxes]) {
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        let stoneToPay = 1;
        if (getLastCheckboxChecked(ctx.card)) {
          return false;
        }
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          stoneToPay += checkbox.checked ? 1 : 0;
        }
        // Checkbox
        if (ctx.resources.stone >= stoneToPay) {
          if(! await applyResourceMapDelta(ctx, { stone: stoneToPay }, true)) {
            return false;
          }
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
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
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await checkNextBox(ctx.card);
        if (getLastCheckboxChecked(ctx.card)) {
          await ctx.upgradeCard(ctx.card, 4, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        }
        return true;
      }
    }],
    4: [
      { // Prison
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_prison')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (getLastCheckboxChecked(ctx.card)) {
            return false;
          }
          if (ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea')).length !== 0) {
            const result = new Promise<boolean>((resolve) => {
              ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
                if(boxes.length !== 0) {
                  for(const box of boxes) {
                    await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                  }
                  await checkBoxes(ctx.card, boxes);
                  ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
                  const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'enemy');
                  await ctx.dropToDiscard({id: selected[0].id, fromZone: ctx.t('playArea')});
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (getLastCheckboxChecked(ctx.card)) {
          return false;
        }
        let ingotToPay = 1;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          ingotToPay += checkbox.checked ? 1 : 0;
        }
        // Checkbox
        if (ctx.resources.metal >= ingotToPay) {
          if (! await applyResourceMapDelta(ctx, { metal: ingotToPay }, true)) {
            return false;
          }
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              await applyResourceMapDelta(ctx, { tradegood: 5 });
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        let woodToPay = 2;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          woodToPay += checkbox.checked ? 2 : 0;
        }
        // Checkbox
        if (ctx.resources.wood >= woodToPay) {
          if (! await applyResourceMapDelta(ctx, { wood: woodToPay }, true)) {
            return false;
          }
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            if (!checkbox.checked) {
              checkbox.checked = true;
              ctx.effectEndTurn();
              break;
            }
          }
        }
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          await ctx.upgradeCard(ctx.card, 3, true);
          await ctx.dropToDiscard({id: ctx.card.id, fromZone: ctx.t('permanentZone')})
        }
        return false;
      }
    }],
    3: [{ // L'Arche
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const people = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (people.length < 2 || getLastCheckboxChecked(ctx.card)) {
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
      description: (t) => parseEffects(t('effect_description____1')).effects[0].text,
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
            resource1 = await ctx.selectResourceChoice([{ sword: 1 }, { fame: 5 }], 1, true);
            if (!resource1) {
              return false;
            }
            await addResourceMapToCard(ctx.card, resource1);
            ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
            this.uses++;
            break;
          }
          case 2: {
            let resource2: Partial<ResourceMap> | null = null;
            resource2 = await ctx.selectResourceChoice([{ tradegood: 1 }, { fame: 5 }], 1, true);
            if (!resource2) {
              return false;
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description____2')).effects[1].text,
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
              resource1 = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1, true);
              if (!resource1) {
                return false;
              }
              await addResourceMapToCard(ctx.card, resource1);
              ctx.handleCardUpdate(ctx.card, ctx.t('playArea'));
              this.uses++;
              break;
            }
            case 2: {
              let resource2: Partial<ResourceMap> | null = null;
              resource2 = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1, true);
              if (!resource2) {
                return false;
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
        description: (t) => parseEffects(t('effect_description_pirate_cove')).effects[0].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          await ctx.discoverCard((card) => [94].includes(card.id), this.description(ctx.t), 1, ctx.card);
          return false;
        }
    }]
  },
  94: {
    1: [
      { // Traître
        description: (t) => parseEffects(t('effect_description_backstabber')).effects[0].text,
        timing: "played",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 2, ctx.card, 0, 'person');
          await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.sword >= 4) {
            if (! await applyResourceMapDelta(ctx, { sword: 4 }, true)) {
              return false;
            }
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }
    ],
    3: [{ // Malédiction
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onAdvance",
      execute: async function () {
        return 2;
      }
    }]
  },
  95: {
    1: [{ // Astronome
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (! await applyResourceMapDelta(ctx, { coin: 2 }, true)) {
            return false;
          }
          await checkNextBox(ctx.card);
          return true;
        }
        return false;
      }
    }],
    3: [{ // Astrologue
      description: (t) => parseEffects(t('effect_description_astrologist')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 3);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          const selectedSides = await new Promise<number[]>((resolve) => {
            ctx.selectCardSides(ctx.card, 1, 0, resolve);
          });
          
          const side = selectedSides[0];
          if (side !== 1) {
            if (! await applyResourceMapDelta(ctx, { coin: 2 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, side, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
    2: [{ // Potion de Force
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { sword: 3 });
        await ctx.upgradeCard(ctx.card, 1, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Potion d'Amour
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await applyResourceMapDelta(ctx, { tradegood: 5 });
        await ctx.upgradeCard(ctx.card, 1, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    4: [{ // Potion de Soin
      description: (t) => parseEffects(t('none')).effects[0].text,
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

        const currentResources = ctx.resources;
        
        let selected: GameCard[];
        if (people.length > 1) {
          selected = await ctx.selectCardsFromArray(
            people, 
            ctx.t('discard'), 
            ctx.t('string_choice_health_potion'), 
            1,
            0,
            ctx.card,
            'person'
          );
        } else {
          selected = [people[0]];
        }
        
        if (selected && selected.length > 0) {
          await ctx.dropToPlayArea({id: selected[0].id, fromZone: ctx.t('discard')});
          await ctx.upgradeCard(ctx.card, 1, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          /* Make sure to put back the resources */
          await applyResourceMapDelta(ctx, currentResources);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
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
                await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
              }
              await checkBoxes(ctx.card, boxes);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 2, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return true;
        }
        return false;
      }
    }],
    2: [{ // Navigation
      description: (t) => parseEffects(t('none')).effects[0].text,
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
                await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
              }
              await checkBoxes(ctx.card, boxes);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 4, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return true;
        }
        return false;
      }
    }],
    3: [{ // Calendrier
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
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
                await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
              }
              await checkBoxes(ctx.card, boxes);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
        if (result) {
          const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
          if (allChecked) {
            await ctx.upgradeCard(ctx.card, 3, true);
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
      description: (t) => parseEffects(t('effect_description_saw_mill')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([91].includes(card.id)),
          this.description(ctx.t),
          1,
          ctx.card
        )) {
          return true;
        }
        return false;
      }
    }],
    4: [{ // Cargaison de Bois
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
    3: [{ // Grange Agrandie
      description: (t) => parseEffects(t('effect_description_larger_barns')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
        }
        return false;
      }
    }],
    4: [{ // Entrepôt Royal
      description: (t) => parseEffects(t('effect_description_royal_storehouse')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
        }
        return false;
      }
    }],
  },
  102: {
    3: [{ //
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        await checkNextBox(ctx.card);
        const allChecked = ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked);
        if (allChecked) {
          await ctx.upgradeCard(ctx.card, 4, true);
          await ctx.dropToPermanent({id: ctx.card.id, fromZone: ctx.zone});
          return false;
        }
        return true;
      }
    }],
    4: [{ //
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_missionary')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const bandits = ctx.fetchCardsInZone((card) => card.GetName(ctx.t).includes(ctx.t('bandit')), ctx.t('playArea'));
        if (ctx.resources.coin >= 3 && bandits.length !== 0) {
          if (! await applyResourceMapDelta(ctx, { coin: 3 }, true)) {
            return false;
          }
          const card = (await ctx.selectCardsFromArray(bandits, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
          if (!card) {
            return false;
          }
          await ctx.upgradeCard(card, 3, true);
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          return true;
        }
        return false;
      }
    }],
    3: [{ // Apiculteur
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_priest')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        let effectSuccessfull = false;
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id, ctx.t('playArea'));
        if (ctx.resources.coin >= 2 && cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
          
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
                    resolve();
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

                  await ctx.upgradeCard(card, upgrade.nextSide, true);
                  ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
                  await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
                  effectSuccessfull = true;
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
      description: (t) => parseEffects(t('effect_description_cardinal')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        let effectSuccessfull = false;
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id, ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
          
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
                    resolve();
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

                  await ctx.upgradeCard(card, upgrade.nextSide, true);
                  ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
                  await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
                  effectSuccessfull = true;
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (! await applyResourceMapDelta(ctx, { coin: 2 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    2: [{ // Village sur la Colline
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Ville sur la Colline
      description: (t) => parseEffects(t('effect_description_city_on_a_hill')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => [106].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
          await ctx.upgradeCard(ctx.card, 1, true);
          await ctx.dropToCampaign({ id: ctx.card.id, fromZone: ctx.zone });
        }
        return false;
      }
    }],
    4: [{ // Grande Ville
      description: (t) => parseEffects(t('none')).effects[0].text,
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
        
        const resToPay = await ctx.selectResourceChoice(Object.entries(availableResources).map(([key, value]) => ({[key]: (value >= 1 ? 1 : 0)})), 1);
        if (!resToPay) {
          return false;
        }
        
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
        
        if (choice) {
          const paidResourceKey = Object.keys(resToPay)[0] as keyof ResourceMap;
          ctx.setResources(prev => ({ 
            ...prev, 
            [paidResourceKey]: prev[paidResourceKey] - 1 
          }));
          
          await applyResourceMapDelta(ctx, choice);
          return true;
        }
        
        return false;
      }
    }],
  },
  106: {
    3: [{ // Camelot
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_royal_visit')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          ctx.t('playArea'), 
          this.description(ctx.t), 
          1,
          ctx.card,
          0
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
      description: (t) => parseEffects(t('effect_description_inquisitor')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.negative[card.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "removed",
      execute: async function () {
        return false;
      }
    }]
  },
  109: {
    3: [{ // Manoir de la Guilde
      description: (t) => parseEffects(t('effect_description_grand_guild_hall')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          return false;
        }
        const maxPeopleCount = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0);
        if (maxPeopleCount === 0) {
          return false;
        }
        const people = await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, maxPeopleCount, 'person');
        if (people.length !== 0) {
          let peopleValue = 0;
          await ctx.dropToDiscard({id: people.map((c) => c.id), fromZone: ctx.t('playArea')});
          for (const card of people) {
            peopleValue += getCardSelectionValue(card, 'person');
          }
          addResourceMapToCard(ctx.card, {fame: peopleValue});
          await checkNextBox(ctx.card);
          return true;
        }
        return false;
      }
    }],
  },
  110: {
    3: [{ // Campagne Prospère
      description: (t) => parseEffects(t('effect_description_thriving_countryside')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const zone = await ctx.selectStringChoice(
          ctx.t('string_choice_thriving_countryside'),
          [ctx.t('playArea'), ctx.t('discard')]
        );
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, zone, this.description(ctx.t), 1, ctx.card, 0))[0];
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
      description: (t) => parseEffects(t('effect_description_countryside')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
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
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_grand_residence')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => [116].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    4: [{ // Noble Demeure
      description: (t) => parseEffects(t('none')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_stable_1')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [113].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    2: [{ // Etable
      description: (t) => parseEffects(t('effect_description_stable_2')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [114].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    3: [
      { // Palfrenier
        description: (t) => parseEffects(t('effect_description_groom')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => (card.GetType(ctx.t).includes(ctx.t('horse'))) && (getResourcesCount(card.GetResources()[0]) <= 2), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, ctx.t('horse')))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
            if (choice) {
              addResourceMapToCard(card, choice);
              return true;
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_groom')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('horse')), ctx.t('discard'), this.description(ctx.t), 1, ctx.card, 0, ctx.t('horse')))[0];
          if (card) {
            await ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
            return true;
          }
          return false;
        }
      }
    ],
    4: [{ // Grande Etable
      description: (t) => parseEffects(t('effect_description_large_stable')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 2) {
          if (await ctx.discoverCard((card) => [115].includes(card.id), this.description(ctx.t), 1, ctx.card)) {
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
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_aric_blackwood')).effects[1].text,
        timing: "played",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
          if (card) {
            await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          }
          return false;
        }
      }
    ],
    3: [
      { // Eadric Shadowstrike
        description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
        timing: "staysInPlay",
        execute: async function (ctx: GameContext) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_eadric_shadowstrike')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          const people = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'));
          if (people.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
            return false;
          }
          const cards = (await ctx.selectCardsFromArray(people, ctx.t('playArea'), this.description(ctx.t), 2, 0, ctx.card, 'person'));
          if (cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
            await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
            await applyResourceMapDelta(ctx, { sword: 3 });
            return true;
          }
          return false;
        }
      }
    ],
  },
  117: {
    1: [{
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.tradegood >= 3) {
          if (! await applyResourceMapDelta(ctx, { tradegood: 3 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
          if (choice) {
            await applyResourceMapDelta(ctx, choice);
          }
        }
        return false;
      }
    }],
  },
  118: {
    1: [{ // Petite Ecole
      description: (t) => parseEffects(t('effect_description_small_school')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0];

          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              await ctx.upgradeCard(card, upgrade.nextSide, true);
              ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
              await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              resolve();
            });
          });

          await ctx.upgradeCard(ctx.card, 2, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Ecole
      description: (t) => parseEffects(t('effect_description_school')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetUpgrades().length !== 0 && card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0];
          
          await new Promise<void>((resolve) => {
            ctx.selectUpgradeCost(card, false, async (upgradeIndex) => {
              const upgrade: Upgrade = card.upgrades[card.currentSide - 1][upgradeIndex];
              await ctx.upgradeCard(card, upgrade.nextSide, true);
              ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
              await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
              resolve();
            });
          });

          await ctx.upgradeCard(ctx.card, 4, true);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [{ // Ecole Reconnue
      description: (t) => parseEffects(t('effect_description_renowned_school')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
            if (choice) {
              addResourceMapToCard(card, choice);
              await ctx.upgradeCard(ctx.card, 3, true);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              ctx.effectEndTurn();
              this.unusable = true;
              this.timing = 'doesNothing';
            }
          }
        }
        return false;
      }
    }],
    4: [{ // Ecole Reconnue
      description: (t) => parseEffects(t('effect_description_prominent_school')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'));
        if (cards.length !== 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0];
          if (card) {
            const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
            if (choice) {
              addResourceMapToCard(card, choice);
              await ctx.upgradeCard(ctx.card, 3, true);
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          await applyResourceMapDelta(ctx, { wood: 1 });
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: (t) => parseEffects(t('effect_description_bazaar')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ wood: 1, stone: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: (t) => parseEffects(t('effect_description_market')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 1) {
          if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ wood: 1, stone: 1, metal: 1 }, 1);
          if(choice) {
            await applyResourceMapDelta(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
  },
  120: {
    1: [{ // Investisseur
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        await ctx.upgradeCard(ctx.card, 2, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    2: [{ // Investisseur
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        await ctx.upgradeCard(ctx.card, 4, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
    3: [{ // Investisseur
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        return true;
      }
    }],
    4: [{ // Investisseur
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        await ctx.upgradeCard(ctx.card, 3, true);
        ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        return true;
      }
    }],
  },
  121: {
    1: [{ // Roi Alahar
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Reine Jemimah
      description: (t) => parseEffects(t('effect_description_queen_jeminah')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
          return false;
        }
        const people = ctx.fetchCardsInZone((card) => card.id !== ctx.card.id && card.GetType(ctx.t).includes(ctx.t('person')) && (card.GetResources()[card.GetResources().length - 1].fame?? 0) >= 5, ctx.t('playArea'));
        if (people.length === 0) {
          return false;
        }
        const card = (await ctx.selectCardsFromArray(people, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'person'))[0];
        if (card) {
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
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
      description: (t) => parseEffects(t('effect_description_grand_castle')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
        );
        if (selectedCards.length > 0) {
          await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
    2: [{ // Château Monumental
      description: (t) => parseEffects(t('effect_description_huge_castle')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
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
        description: (t) => parseEffects(t('effect_description_impregnable_fortress')).effects[0].text,
        timing: "onClick",
        execute: async function(ctx) {
          const selectedCards = await ctx.selectCardsFromZone(
            () => (true),
            ctx.t('discard'),
            this.description(ctx.t),
            1,
            ctx.card,
            0
          );
          if (selectedCards.length > 0) {
            await ctx.dropToPlayArea({id: selectedCards[0].id, fromZone: ctx.t('discard')});
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_impregnable_fortress')).effects[1].text,
        timing: "onCardsDiscarded",
        execute: async function(ctx) {
          if (!ctx.cardsForTrigger) return false;
          
          const isThisCardDiscarded = ctx.cardsForTrigger.some((c) => c.id === ctx.card.id);
    
          if (isThisCardDiscarded) {
            const cards = await ctx.selectCardsFromZone((card) => card.GetName(ctx.t).includes(ctx.t('wall')), ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2);
            if (cards.length === 2) {
              await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
              await ctx.dropToPlayArea({id: ctx.card.id, fromZone: ctx.t('discard')});
            }
          }
          return false;
        }
      }
    ],
    4: [{ // Forteresse
      description: (t) => parseEffects(t('effect_description_fortress')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          ctx.t('discard'),
          this.description(ctx.t),
          1,
          ctx.card,
          0
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
      description: (t) => parseEffects(t('effect_description_large_temple')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 5);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Temple Sculpté
      description: (t) => parseEffects(t('effect_description_ornate_temple')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 5);
        if (selected.length > 0) {
          ctx.setTemporaryCardListImmediate(selected);
          return true;
        }
        return false;
      }
    }],
    3: [
      { // Temple de la Lumière
        description: (t) => parseEffects(t('effect_description_temple_of_light')).effects[0].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
          const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 5);
          ctx.setTemporaryCardListImmediate(selected);
          if (selected.length > 0) {
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.tradegood >= 4 && !ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
            await checkNextBox(ctx.card);
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text,
        timing: "onPurge",
        execute: async function (ctx) {
          await addResourceMapToCard(ctx.card, { fame: 10 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length) });
          return false;
        }
      },
    ],
    4: [{ // Temple Légendaire
      description: (t) => parseEffects(t('effect_description_legendary_temple')).effects[0].text,
      timing: "endOfTurn",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === ctx.card.id, ctx.t('playArea')).length === 0) return false;
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 5);
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
      description: (t) => parseEffects(t('effect_description_mushrooms')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'person'))[0];
        if (card) {
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          await applyResourceMapDelta(ctx, { tradegood: 2 });
        }
        return false;
      }
    }]
  },
  128: {
    3: [{ // Site de Fouilles
      description: (t) => parseEffects(t('effect_description_excavation_site')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked) || ctx.resources.stone < 3 || ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea')).length === 0) {
          return false;
        }
        if (! await applyResourceMapDelta(ctx, { stone: 3 }, true)) {
          return false;
        }
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0,ctx.t('person')))[0];
        if (card) {
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          await checkNextBox(ctx.card);
          ctx.effectEndTurn();
        }
        return false;
      }
    }]
  },
  129: {
    1: [{ // Sources Chaudes
      description: (t) => parseEffects(t('effect_description_hot_springs')).effects[0].text,
      timing: "onUpgrade",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'land'))[0];
        if (card) {
          await addResourceMapToCard(card, {coin: 1});
          ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
        }
        return false;
      }
    }],
    2: [{ // Fontaine
      description: (t) => parseEffects(t('effect_description_fountain')).effects[0].text,
      timing: "onUpgrade",
      execute: async function (ctx) {
        await ctx.boostProductivity((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), null, ctx.card);
        return false;
      }
    }],
    4: [{ // Canaux
      description: (t) => parseEffects(t('effect_description_canals')).effects[0].text,
      timing: "onUpgrade",
      execute: async function (ctx) {
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('land')) && card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0, 'land'))[0];
        if (card) {
          ctx.addCardEffect(card.id, card.currentSide, ctx.t('playArea'), stayInPlayEffect, stayInPlayText);
        }
        return false;
      }
    }],
  },
  130: {
    2: [{ // Mur Intérieur
      description: (t) => parseEffects(t('effect_description_watchtower')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        ctx.setDeck((d) => {
          ctx.selectCardsFromArray([d[0], d[1]], ctx.t('deck'), this.description(ctx.t), 0, 0, ctx.card);
          return d;
        })
        return false;
      }
    }],
    3: [{ // Mur Intérieur
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Double Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('effect_description_moat')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
        if (card) {
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.t('playArea')});
          await applyResourceMapDelta(ctx, { sword: 2 });
          return true;
        }
        return false;
      }
    }],
    3: [{ // Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx: GameContext) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Pont de Douves
      description: (t) => parseEffects(t('effect_description_moat_bridge')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        if (ctx.resources.coin < 1 || ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('discard')).length === 0) {
          return false;
        }
        if (! await applyResourceMapDelta(ctx, { coin: 1 }, true)) {
            return false;
          }
        const card = (await ctx.selectCardsFromZone((card) => card.GetType(ctx.t).includes(ctx.t('person')), ctx.t('discard'), this.description(ctx.t), 1, ctx.card, 0, 'person'))[0];
        if (card) {
          await ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
          return true;
        }
        return false;
      }
    }],
  },
  132: {
    4: [{ // Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 1);
        if(choice) {
          await applyResourceMapDelta(ctx, choice);
          return true;
        }
        return false;
      }
    }],
    2: [{ // Razzia
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        return true;
      }
    }],
    3: [{ // Saccage
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        return true;
      }
    }],
    4: [{ // Pillage
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        return true;
      }
    }],
  },
  134: {
    1: [
      { // Rival Beau-Gosse
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "destroyed",
        execute: async function (ctx) {
          const lord = [  ...ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('lord_nimrod'), ctx.t('deck')),
                          ...ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('lord_nimrod'), ctx.t('discard')),
                          ...ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('lord_nimrod'), ctx.t('playArea')),
                          ...ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('lord_nimrod'), ctx.t('permanentZone'))
          ]
          return (lord.length === 0);
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
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
                  if (! await applyResourceMapDelta(ctx, cbResources, true)) {
                    return false;
                  }
                  await checkBoxes(ctx.card, boxes);
                  ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
                  await ctx.dropToDiscard({ id: lord.id, fromZone: ctx.t('playArea') });
                  if (ctx.card.checkboxes[ctx.card.currentSide - 1].every(cb => cb.checked)) {
                    await ctx.upgradeCard(ctx.card, 3, true);
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
    3: [{ // Noble Allié
      description: (t) => parseEffects(t('effect_description_noble_ally')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('person')) && card.id !==  ctx.card.id, ctx.t('playArea'));
        if (cards.length > 0) {
          const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card,ctx.t('person')))[0];
          if (card) {
            let resources;
            if (card.GetResources().length > 1) {
              const choice = await ctx.selectResourceChoice(card.GetResources(), 1);
              if (!choice) {
                return false;
              }
              resources = await ctx.selectResourceChoice(choice, 1);
            }
            else {
              resources = card.GetResources()[0];
            }
            if (resources && resources !== null) {
              if (! await applyResourceMapDelta(ctx, resources)) {
                return false;
              }
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
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const upgrade = ctx.card.GetUpgrades()[0];
        if (upgrade.cost && ctx.resources.sword >= 5) {
          if (!upgrade.cost.sword) {
            return false;
          }
          if (! await applyResourceMapDelta(ctx, { sword: 5 }, true)) {
            return false;
          }
          upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
          
          if (upgrade.cost.sword === 0) {
            delete upgrade.cost.sword;
          }
          ctx.handleCardUpdate(ctx.card, ctx.zone);
        }
        return false;
      }
    }],
    2: [{ // Occupation
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        const upgrade = ctx.card.GetUpgrades()[0];
        if (upgrade.cost && ctx.resources.sword >= 5) {
          if (!upgrade.cost.sword) {
            return false;
          }
          if (! await applyResourceMapDelta(ctx, { sword: 5 }, true)) {
            return false;
          }
          upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
          
          if (upgrade.cost.sword === 0) {
            delete upgrade.cost.sword;
          }
          ctx.handleCardUpdate(ctx.card, ctx.zone);
        }
        return false;
      }
    }],
    3: [{ // Etats Vassaux
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx: GameContext) {
        await ctx.upgradeCard(ctx.card, 1, true);
        return true;
      }
    }],
    4: [
      { // Villages Alliés
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const upgrade = ctx.card.GetUpgrades()[0];
          if (upgrade.cost && ctx.resources.sword >= 5) {
            if (!upgrade.cost.sword) {
              return false;
            }
            if (! await applyResourceMapDelta(ctx, { sword: 5 }, true)) {
              return false;
            }
            upgrade.cost.sword = Math.max(0, (upgrade.cost.sword?? 0) - 1);
            
            if (upgrade.cost.sword === 0) {
              delete upgrade.cost.sword;
            }
            ctx.handleCardUpdate(ctx.card, ctx.zone);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
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
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          this.uses += 1;
          return false;
        }
      }
    ],
  },
  136: {
    1: [
      { // Prospérité
        description: (t) => parseEffects(t('effect_description_prosperity_expansion')).effects[0].text,
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
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 2, true);
          return false;
        }
      },
    ],
    2: [
      { // Engranger des réserves
        description: (t) => parseEffects(t('effect_description_hoarding')).effects[0].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone(() => true, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 1);
          if (selected.length > 0) {
            ctx.setTemporaryCardListImmediate(selected);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 4, true);
          return false;
        }
      },
    ],
    3: [
      { // Décret Royal
        description: (t) => parseEffects(t('effect_description_royal_decree')).effects[0].text,
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
            checked,
            ctx.card,
            0
          );
          
          if (selected.length !== 0) {
            for(const card of selected) {
              const resources = await ctx.selectResourceChoice(card.GetResources(), 1);
              if (! resources) {
                return false;
              }
              const selectedResource = await ctx.selectResourceChoice(resources, 1);
              if (! selectedResource) {
                return false;
              }
              await removeResourceFromCard(card, selectedResource);
              ctx.replaceCardInZone(ctx.t('deck'), card.id, card);
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          ctx.deleteCardInZone(ctx.t('permanentZone'), ctx.card.id);
          return false;
        }
      },
    ],
    4: [
      { // Soulèvement
        description: (t) => parseEffects(t('effect_description_uprising')).effects[0].text,
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
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 3, true);
          return false;
        }
      },
    ],
  },
  137: {
    1: [
      { // Moulin à Eau
        description: (t) => parseEffects(t('effect_description_the_water_mill_expansion')).effects[0].text,
        timing: "onClick",
        usesPerTurn: 1,
        execute: async (ctx) => {
          await applyResourceMapDelta(ctx, { sword: 3 });
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 2, true);
          return false;
        }
      },
    ],
    2: [
      { // Récoltes Productives
        description: (t) => parseEffects(t('effect_description_efficient_farming')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          const buildings = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea'));
          const lands = ctx.fetchCardsInZone((card) => card.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'));
          if (buildings.length < 2 || lands.length < 1) {
            return false;
          }
          const selected = await ctx.selectCardsFromArray(buildings, ctx.t('playArea'), this.description(ctx.t), 2, 0, ctx.card, 'building');
          if (selected.length === 2) {
            const land = (await ctx.selectCardsFromArray(lands, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land'))[0];
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
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 4, true);
          return false;
        }
      },
    ],
    3: [
      { // Fermes Abandonnées
        description: (t) => parseEffects(t('effect_description_obsolete_farms')).effects[0].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((c) => c.GetResources().some((map) => hasEnoughResources(map, {coin: 1})), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0))[0];
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
        description: (t) => parseEffects(t('effect_description_surplus')).effects[0].text,
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
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 3, true);
          return false;
        }
      },
    ],
  },
  138: {
    1: [
      { // Border Dispute
        description: (t) => parseEffects(t('effect_description_border_dispute_expansion')).effects[0].text,
        timing: "endOfTurn",
        execute: async function (ctx) {
          ctx.setTemporaryCardListImmediate(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.zone));
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 2, true);
          return false;
        }
      },
    ],
    2: [
      { // Espionnage
        description: (t) => parseEffects(t('effect_description_espionage')).effects[0].text,
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
                const cards = await ctx.selectCardsFromZone((c) => !discarded.includes(c), ctx.zone, this.description(ctx.t), 2, ctx.card, 0);
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
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          await ctx.upgradeCard(ctx.card, 4, true);
          return false;
        }
      },
    ],
    3: [
      { // Resistance
        description: (t) => parseEffects(t('effect_description_resistance')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          addResourceMapToCard(ctx.card, { sword: ctx.resources.sword });
          ctx.setResources(prev => ({ ...prev, sword: 0 }));
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_resistance')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          const land = (await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0, 'land'))[0];
          addResourceMapToCard(land, {fame: ((ctx.card.GetResources()[0].sword ?? 0) > 100 ? 100: ctx.card.GetResources()[0].sword)})
          ctx.deleteCardInZone(ctx.t('permanentZone'), ctx.card.id);
          return false;
        }
      },
    ],
    4: [
      { // Attaque
        description: (t) => parseEffects(t('effect_description_attack')).effects[0].text,
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
            const card = (await ctx.selectCardsFromZone((c) => getResourcesCount(c.GetResources()[0]) !== 0, ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
            if(card) {
              const choice = await ctx.selectResourceChoice(card.GetResources(), 1);
              if (!choice) {
                return false;
              }
              let resources = await ctx.selectResourceChoice(choice, 1) ?? {};
              resources = { coin: resources.coin ? 1 : 0, wood: resources.wood ? 1 : 0, stone: resources.stone ? 1 : 0,
                            sword: resources.sword ? 1 : 0, metal: resources.metal ? 1 : 0, tradegood: resources.tradegood ? 1 : 0};
              await removeResourceFromCard(card, resources);
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_attack')).effects[1].text,
        timing: "endOfRound",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1], ctx.t('deck'), this.description(ctx.t), 1, ctx.card, 0))[0];
          const resource = (await ctx.selectResourceChoice({coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1}, 1)) ?? {};
          await addResourceMapToCard(card, resource);
          await ctx.upgradeCard(ctx.card, 3, true);
          return false;
        }
      },
    ],
  },
  // Ridding the Woods
  139: {
    1: [{ // Bienvenue dans la Forêt des Brigands
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        if (ctx.startTutorial) {
          await ctx.startTutorial();
        }
        return false;
      }
    }]
  },
  140: {
    1: [
      { // Une Certaine Dame
        description: (t) => parseEffects(t('effect_description_a_certain_lady')).effects[0].text,
        timing: "onPlayAreaUpdated",
        execute: async function(ctx)  {
          let enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (! ctx.cardsForTrigger?.map((c) => c.id).includes(ctx.card.id)) {
            const discardedEnemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
            enemies = enemies.filter((c) => ctx.cardsForTrigger?.map((d) => d.id).includes(c.id) && !discardedEnemies.map((d) => d.id).includes(c.id));
          }
          for (let i = 0; i < enemies.length; i++) {
            await checkNextBox(ctx.card);
          }
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          await ctx.mill(0);
          if (getLastCheckboxChecked(ctx.card)) {
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_a_certain_lady')).effects[1].text,
        timing: "onEndOfExpansion",
        execute: async function(ctx)  {
          cardEffectsRegistry[ctx.card.id][1][0].timing = 'doesNothing';
          cardEffectsRegistry[ctx.card.id][1][0].unusable = true;
          cardEffectsRegistry[ctx.card.id][1][1].timing = 'doesNothing';
          cardEffectsRegistry[ctx.card.id][1][1].unusable = true;
          return false;
        }
      }
    ],
    3: [{ // Maraudeuse
      description: (t) => parseEffects(t('effect_description_a_certain_lady')).effects[0].text,
      timing: "played",
      execute: async function(ctx)  {
        const card = (await ctx.selectCardsFromZone((c) => ctx.getCardProduction(c, ctx.zone).some((map) => hasEnoughResources(map, {coin: 1})), ctx.t('playArea'), this.description(ctx.t), 1, ctx.card, 0))[0];
        if (card) {
          await removeResourceFromCard(card, {coin: 1});
          ctx.replaceCardInZone(ctx.zone, card.id, card);
          await checkNextBox(ctx.card);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          if (getLastCheckboxChecked(ctx.card)) {
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
        }
        return false;
      }
    }]
  },
  141: {
    1: [
      { // Roi des Voleurs
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onResourceGain",
        priority: 1,
        execute: async function(ctx)  {
          Object.keys(ctx.resources).forEach(key => {
            if (key !== 'sword') ctx.resources[key as keyof ResourceMap] = 0;
          });
          return true;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (hasEnoughResources(ctx.resources, {sword: 3})) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await checkNextBox(ctx.card);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            if (getLastCheckboxChecked(ctx.card)) {
              if (ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('a_certain_lady'), ctx.getCardZone(140)).length > 0) {
                ctx.deleteCardInZone(ctx.getCardZone(140), 140);
                await ctx.upgradeCard(ctx.card, 3, true);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              }
              else {
                ctx.deleteCardInZone(ctx.zone, ctx.card.id);
                return false;
              }
            }
            return true;
          }
          return false;
        }
      }
    ],
    3: [
      { // Pleurs
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onAdvance",
        execute: async function () {
          return 2;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onPurge",
        execute: async function (ctx) {
          await addResourceMapToCard(ctx.card, { fame: -4 });
          return false;
        }
      },
    ]
  },
  142: {
    1: [
      { // Bandit
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const cards = ctx.fetchCardsInZone((c) => ctx.getCardProduction(c, ctx.zone).some((map) => hasEnoughResources(map, {wood: 1})), ctx.zone);
          await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (hasEnoughResources(ctx.resources, {sword: 3})) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  143: {
    1: [{ // Forêt des Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "played",
      execute: async function (ctx) {
        const card = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('robbin_leader'), ctx.t('discard'))[0];
        if (card) {
          await ctx.dropToPlayArea({id: card.id, fromZone: ctx.t('discard')});
        }
        return false;
      }
    }],
    2: [{ // Forêt Dangereuse
      description: (t) => parseEffects(t('effect_description_unsafe_forest')).effects[0].text,
      timing: "onEnemyDefeated",
      execute: async function (ctx) {
        if (ctx.resources.coin >= 4 && ctx.resources.sword >= 2) {
          const choice = await ctx.selectStringChoice(this.description(ctx.t), [ctx.t('string_choice_upgrade'), ctx.t('string_choice_pass')]);
          if (choice === ctx.t('string_choice_upgrade')) {
            if (! await applyResourceMapDelta(ctx, { coin: 4, sword: 2 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 4, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Forêt Paisible
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }]
  },
  144: {
    1: [{ // Ville Terrorisée
      description: (t) => parseEffects(t('effect_description_terrified_town')).effects[0].text,
      timing: "otherCardPlayed",
      execute: async function(ctx)  {
        if (ctx.cardsForTrigger?.filter((c) => c.GetType(ctx.t).includes(ctx.t('enemy'))).length ?? 0 > 0) {
          const cards = await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1], ctx.zone, this.description(ctx.t), 3, ctx.card, 0);
          await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
        }
        return false;
      }
    }],
    2: [{ // Ville Tourmentée
      description: (t) => parseEffects(t('effect_description_uneasy_town')).effects[0].text,
      timing: "otherCardPlayed",
      execute: async function(ctx)  {
        if (ctx.cardsForTrigger?.filter((c) => c.GetType(ctx.t).includes(ctx.t('enemy'))).length ?? 0 > 0) {
          const cards = await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1], ctx.zone, this.description(ctx.t), 2, ctx.card, 0);
          await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
        }
        return false;
      }
    }],
    3: [{ // _
      description: (t) => parseEffects(t('effect_description___town')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        if (await ctx.discoverCard((c) => [166].includes(c.id), this.description(ctx.t), 1, ctx.card, 0)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    4: [{ // Ville aux Aguets
      description: (t) => parseEffects(t('effect_description_guarded_town')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        if (ctx.resources.wood >= 4 && ctx.fetchCardsInZone((c) => [168].includes(c.id), ctx.t('campaign')).length !== 0) {
          if (! await applyResourceMapDelta(ctx, { wood: 4 }, true)) {
            return false;
          }
          return await ctx.discoverCard((c) => [168].includes(c.id), this.description(ctx.t), 1, ctx.card, 0);
        }
        return false;
      }
    }]
  },
  145: {
    1: [
      { // Bandit
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const cards = ctx.fetchCardsInZone((c) => ctx.getCardProduction(c, ctx.zone).some((map) => hasEnoughResources(map, {wood: 1})), ctx.zone);
          await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (hasEnoughResources(ctx.resources, {sword: 3})) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  146: {
    1: [
      { // Voleur Immense
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "restrictAdvance",
        execute: async function () {
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_huge_robber')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.zone).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 4) {
            const cards = (await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.zone, this.description(ctx.t), 4, ctx.card, 0, 'person'));
            if (cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 4) {
              await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
              await ctx.upgradeCard(ctx.card, 3, true);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
              return true;
            }
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  147: {
    1: [{ // Grand Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Petit Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Forêt Luxuriante
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }]
  },
  148: {
    2: [{ // Muraille
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    3: [{ // Donjon
      description: (t) => parseEffects(t('effect_description_small_dungeon')).effects[0].text, 
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('prisoner'), ctx.t('playArea'));
        if (cards.length > 0) {
          const selected = await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 0, Math.min(4, cards.length), ctx.card);
          if (selected.length > 0) {
            await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
            for (let i = 0; i < selected.length; i++) {
              checkNextBox(ctx.card);
              if (getLastCheckboxChecked(ctx.card)) {
                await ctx.upgradeCard(ctx.card, 4, true);
                break;
              }
            }
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Vaste Donjon
      description: (t) => parseEffects(t('effect_description_large_dungeon')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        const cards = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('prisoner'), ctx.t('playArea'));
        if (cards.length > 0) {
          const selected = await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 0, cards.length, ctx.card);
          if (selected.length > 0) {
            await ctx.dropToDiscard({id: selected.map((c) => c.id), fromZone: ctx.t('playArea')});
            await addResourceMapToCard(ctx.card, {fame: selected.length * 2});
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return false;
          }
        }
        return false;
      }
    }],
  },
  149: {
    1: [{ // Percepteur des Impôts
      description: (t) => parseEffects(t('effect_description_tax_collector')).effects[0].text, 
      timing: "onResourceGain",
      execute: async function (ctx) {
        if (ctx.cardsForTrigger && ctx.cardsForTrigger[0].id === ctx.card.id) {
          checkNextBox(ctx.card);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
        }
        return true;
      }
    }]
  },
  150: {
    1: [
      { // Voleur Aguerri
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const cards = ctx.fetchCardsInZone((c) => ctx.getCardProduction(c, ctx.zone).some((map) => hasEnoughResources(map, {coin: 1})), ctx.zone);
          await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.zone});
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (hasEnoughResources(ctx.resources, {sword: 5})) {
            if (! await applyResourceMapDelta(ctx, { sword: 5 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  151: {
    1: [{ // Concours de Tir à l'Arc
      description: (t) => parseEffects(t('effect_description_archery_contest')).effects[0].text, 
      timing: "onClick",
      execute: async function (ctx) {
        const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        if (enemies.length > 0) {
          const selected = (await ctx.selectCardsFromArray(enemies, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'enemy'))[0];
          if (selected) {
            checkNextBox(ctx.card);
            if (getLastCheckboxChecked(ctx.card)) {
              await ctx.upgradeCard(ctx.card, 3, true);
            }
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Appâter et Piéger
      description: (t) => parseEffects(t('effect_description_bait_and_trap')).effects[0].text, 
      timing: "onClick",
      execute: async function (ctx) {
        const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        const lady = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('lady')), ctx.t('playArea')).length > 0 ? true : false;
        if (enemies.length > 0 && lady) {
          const selected = (await ctx.selectCardsFromArray(enemies, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'enemy'))[0];
          if (selected) {
            await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
            await applyResourceMapDelta(ctx, { sword: 2 });
            return true;
          }
        }
        return false;
      }
    }]
  },
  152: {
    1: [{ // Guarde Incompétent
      description: (t) => parseEffects(t('none')).effects[0].text, 
      timing: "onPlayAreaUpdated",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea')).length === 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Guarde Impatient
      description: (t) => parseEffects(t('none')).effects[0].text, 
      timing: "onPlayAreaUpdated",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea')).length === 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Preux Chevalier
      description: (t) => parseEffects(t('effect_description_brave_knight')).effects[0].text, 
      timing: "played",
      execute: async function (ctx) {
        const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        if (enemies.length > 0) {
          const selected = (await ctx.selectCardsFromArray(enemies, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'enemy'))[0];
          if (selected) {
            await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
          }
        }
        return false;
      }
    }],
  },
  153: {
    1: [
      { // Chariot à Trésors
        description: (t) => parseEffects(t('effect_description_treasure_wagon')).effects[0].text, 
        timing: "played",
        priority: 1,
        execute: async function (ctx) {
          if (ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea')).length === 0) {
            return false;
          }
          let resource: string;
          if (Object.keys(ctx.card.GetResources()[0]).filter(key => key !== 'fame').length > 1) {
            const resources = await ctx.selectResourceChoice(ctx.card.GetResources(), 1);
            if (!resources) {
              return false;
            }
            const choice = await ctx.selectResourceChoice(resources, 1) ?? {};
            if (! choice) {
              return false;
            }
            resource = Object.keys(choice).filter(key => key !== 'fame')[0];
          }
          else {
            resource = Object.keys(ctx.card.GetResources()[0]).filter(key => key !== 'fame')[0];
          }
          if (resource) {
            await removeResourceFromCard(ctx.card, { [resource as keyof ResourceMap]: 1 });
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_treasure_wagon')).effects[1].text, 
        timing: "otherCardPlayed",
        priority: 1,
        execute: async function (ctx) {
          const enemies = ctx.cardsForTrigger?.filter((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea')).length;
          if (enemies === 0 || ctx.cardsForTrigger?.map((c) => c.id).includes(ctx.card.id)) {
            return false;
          }
          let resource: string;
          if (Object.keys(ctx.card.GetResources()[0]).filter(key => key !== 'fame').length > 1) {
            const resources = await ctx.selectResourceChoice(ctx.card.GetResources(), 1);
            if (!resources) {
              return false;
            }
            const choice = await ctx.selectResourceChoice(resources, 1) ?? {};
            if (! choice) {
              return false;
            }
            resource = Object.keys(choice).filter(key => key !== 'fame')[0];
          }
          else {
            resource = Object.keys(ctx.card.GetResources()[0]).filter(key => key !== 'fame')[0];
          }
          if (resource) {
            await removeResourceFromCard(ctx.card, { [resource as keyof ResourceMap]: enemies });
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[2].text, 
        timing: "onPurge",
        execute: async function (ctx) {
          let sum = 0;
          ctx.card.GetResources().forEach(res => sum += getResourcesCount({ ...res, fame: 0 }));
          await addResourceMapToCard(ctx.card, { fame: 5 * sum });
          return false;
        }
      },
    ],
  },
  154: {
    1: [
      { // Prince Puissant
        description: (t) => parseEffects(t('none')).effects[0].text, 
        timing: "onClick",
        execute: async function (ctx) {
          const upgrade = ctx.card.GetUpgrades()[0];
          if (upgrade.cost && ctx.resources.coin >= 3) {
            if (!upgrade.cost.coin) {
              return false;
            }
            if (! await applyResourceMapDelta(ctx, { coin: 3 }, true)) {
              return false;
            }
            upgrade.cost.coin = Math.max(0, (upgrade.cost.coin?? 0) - 1);
            
            if (upgrade.cost.coin === 0) {
              delete upgrade.cost.coin;
            }
            ctx.card.upgrades[0] = [upgrade];
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_powerful_prince')).effects[1].text, 
        timing: "played",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          return false;
        }
      },
    ],
    3: [
      { // Prince _
        description: (t) => parseEffects(t('effect_description_powerful_prince')).effects[0].text, 
        timing: "played",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 3);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_prince__')).effects[1].text,
        timing: 'onClick',
        execute: async function(ctx) {
          if (await ctx.discoverCard((c) => [167].includes(c.id), this.description(ctx.t), 1, ctx.card, 0)) {
            ctx.effectEndTurn();
          }
          return false
        }
      }
    ],
  },
  155: {
    1: [{ // Grand Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Petit Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }]
  },
  156: {
    1: [{ // Grand Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Petit Camp de Voleurs
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onResourcePay",
      execute: async function (ctx) {
        if (ctx.resources.sword === 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Forêt Escarpée
      description: (t) => parseEffects(t('staysInPlay')).effects[0].text,
      timing: "staysInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }]
  },
  157: {
    1: [
      { // Voleur Saboteur
        description: (t) => parseEffects(t('effect_description_robber_saboteur')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const buildings = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea'));
          if (buildings.length < 1) {
            return false;
          }
          const card = (await ctx.selectCardsFromArray(buildings, ctx.zone, this.description(ctx.t), 1, 0, ctx.card, 'building'))[0];
          const resources = await ctx.selectResourceChoice(card.GetResources(), 1);
          if (!resources) {
            return false;
          }
          const resource = await ctx.selectResourceChoice(resources, 1);
          if (! resource) {
            return false;
          }
          removeResourceFromCard(card, resource);
          ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.sword >= 3) {
            if (! await applyResourceMapDelta(ctx, { sword: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  158: {
    1: [
      { // Moine Rebelle
        description: (t) => parseEffects(t('effect_description_rebellious_monk')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          let selectedCards: GameCard[] = [];
          while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, (c) => (!c.negative[c.currentSide - 1])).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone((c) => (!c.negative[c.currentSide - 1]), ctx.t('playArea'), this.description(ctx.t), 3, ctx.card, 0);
          }
          if (selectedCards.length !== 0) {
            await ctx.dropToBlocked({id: selectedCards.map((c) => c.id), fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, selectedCards.map((c) => c.id));
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.tradegood >= 4) {
            if (! await applyResourceMapDelta(ctx, { tradegood: 4 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  159: {
    1: [{ // Barde du Peuple
      description: (t) => parseEffects(t('effect_description_bard_of_the_people')).effects[0].text,
      timing: "played",
      execute: async function(ctx)  {
        const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
        if (enemies.length > 0) {
          const selected = (await ctx.selectCardsFromArray(enemies, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'enemy'))[0];
          if (selected) {
            await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
          }
        }
        return false;
      }
    }],
    3: [{ // Barde Obéissant
      description: (t) => parseEffects(t('effect_description_obedient_bard')).effects[0].text,
        timing: "onClick",
        execute: async function(ctx)  {
          const events = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('event')), ctx.t('discard'));
          if (events.length > 0 && !getLastCheckboxChecked(ctx.card)) {
            const selected = (await ctx.selectCardsFromArray(events, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'event'))[0];
            if (selected) {
              checkNextBox(ctx.card);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
              await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
              return true;
            }
          }
          return false;
        }
    }]
  },
  160: {
    1: [
      { // Sauveur
        description: (t) => parseEffects(t('effect_description_rescuer')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const prisoners = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('prisoner'), ctx.t('discard'));
          if (prisoners.length > 0) {
            const selected = (await ctx.selectCardsFromArray(prisoners, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card))[0];
            if (selected) {
              await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.metal >= 3) {
            if (! await applyResourceMapDelta(ctx, { metal: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  161: {
    1: [
      { // Sauveur
        description: (t) => parseEffects(t('effect_description_rescuer')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const prisoners = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('prisoner'), ctx.t('discard'));
          if (prisoners.length > 0) {
            const selected = (await ctx.selectCardsFromArray(prisoners, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card))[0];
            if (selected) {
              await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.metal >= 3) {
            if (! await applyResourceMapDelta(ctx, { metal: 3 }, true)) {
              return false;
            }
            await ctx.upgradeCard(ctx.card, 3, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            await ctx.handleEnemyDefeated(ctx.card, ctx.zone);
            ctx.effectEndTurn();
          }
          return false;
        }
      }
    ],
    3: [{ // Prisonnier
      description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "otherCardPlayed",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'));
          if (enemies.length >= 2) {
            await ctx.upgradeCard(ctx.card, 1, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
        }
    }]
  },
  162: {
    1: [
      { // Vieux Chêne
        description: (t) => parseEffects(t('effect_description_old_oak_tree')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const enemies = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('discard'));
          if (enemies.length > 0) {
            const selected = (await ctx.selectCardsFromArray(enemies, ctx.t('discard'), this.description(ctx.t), 1, 0, ctx.card, 'enemy'))[0];
            if (selected) {
              await ctx.dropToPlayArea({id: selected.id, fromZone: ctx.t('discard')});
            }
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.metal >= 2) {
            if (! await applyResourceMapDelta(ctx, { metal: 2 }, true)) {
              return false;
            }
            checkNextBox(ctx.card);
            if (getLastCheckboxChecked(ctx.card)) {
              await ctx.upgradeCard(ctx.card, 3, true);
              ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            }
            return true
          }
          return false;
        }
      }
    ],
    3: [{ // Barde Obéissant
      description: (t) => parseEffects(t('effect_description_obedient_bard')).effects[0].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (!getLastCheckboxChecked(ctx.card)) {
           return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, async (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  await applyResourceMapDelta(ctx, getCheckboxResources(box.content) ?? {});
                }
                await checkBoxes(ctx.card, boxes);
                ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
                resolve(true);
              }
              resolve(false);
            });
          });
          }
          return false;
        }
    }]
  },
  163: {
    1: [{ // Camp de Druides
      description: (t) => parseEffects(t('effect_description_druid_camp')).effects[0].text,
      timing: "played",
      execute: async function(ctx)  {
        const stayInPlay = ctx.fetchCardsInZone((c) => c.GetEffect(ctx.t).includes(ctx.t('staysInPlay')), ctx.zone);
        await ctx.dropToDiscard({id: stayInPlay.map((c) => c.id), fromZone: ctx.zone});
        return false;
      }
    }],
    2: [
      { // Sanctuaire Druidique
        description: (t) => parseEffects(t('effect_description_druid_sanctuary')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const stayInPlay = ctx.fetchCardsInZone((c) => c.GetEffect(ctx.t).includes(ctx.t('staysInPlay')), ctx.zone);
          await ctx.dropToDiscard({id: stayInPlay.map((c) => c.id), fromZone: ctx.zone});
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_druid_sanctuary')).effects[1].text,
        timing: "onUpgrade",
        execute: async function(ctx)  {
          const cards = await ctx.selectCardsFromZone((c) => c.id !== ctx.card.id && !c.negative[c.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 2, ctx.card, 0);
          for (const card of cards) {
            addResourceMapToCard(card, { tradegood: 1 });
          }
          return false;
        }
      }
    ],
    4: [{ // Forêt Reculée
      description: (t) => parseEffects(t('effect_description_secluded_forest')).effects[0].text,
        timing: "played",
        execute: async function(ctx)  {
          const stayInPlay = ctx.fetchCardsInZone((c) => c.GetEffect(ctx.t).includes(ctx.t('staysInPlay')), ctx.zone);
          const card = (await ctx.selectCardsFromArray(stayInPlay, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
          if (!card) {
            return false;
          }
          await ctx.dropToDiscard({id: card.id, fromZone: ctx.zone});
          return false;
        }
    }]
  },
  164: {
    3: [{ // Cérémonie
      description: (t) => parseEffects(t('effect_description_ceremony')).effects[0].text,
      timing: "onClick",
      execute: async function(ctx)  {
        if (ctx.fetchCardsInZone((c) => !c.negative[c.currentSide - 1] && c.id !== ctx.card.id, ctx.t('playArea')).length < 5) {
          return false
        }
        const cards = (await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1] && c.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 5, ctx.card, 0));
        if (cards.length < 5) {
          return false;
        }
        const card = (await ctx.selectCardsFromArray(cards, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card))[0];
          if (card) {
            addResourceMapToCard(card, { fame: 5 });
            ctx.replaceCardInZone(ctx.t('playArea'), card.id, card);
            await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
            await ctx.upgradeCard(ctx.card, 4, true);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
          return false;
      }
    }],
    4: [{ // Mégalithe
      description: (t) => parseEffects(t('effect_description_hill_megalith')).effects[0].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.resources.tradegood < 4 || ctx.fetchCardsInZone((c) => c.id === 165, ctx.t('campaign')).length === 0) {
            return false;
          }
          if (! await applyResourceMapDelta(ctx, { tradegood: 4 })) {
            return false;
          }
          await ctx.discoverCard((c) => [165].includes(c.id), this.description(ctx.t), 1, ctx.card, 0);
          ctx.effectEndTurn();
          return false;
        }
    }]
  },
  165: {
    1: [{ // Le Gardien des Secrets
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "played",
      execute: async function(ctx)  {
        await ctx.dropToDiscard({id: ctx.fetchCardsInZone(() => true, ctx.zone).map((c) => c.id), fromZone: ctx.t('playArea')});
        await ctx.upgradeCard(ctx.card, 2, true);
        ctx.replaceCardInZone(ctx.t('discard'), ctx.card.id, ctx.card);
        return false;
      }
    }],
    2: [
      { // Course Poursuite
        description: (t) => parseEffects(t('effect_description_the_chase')).effects[0].text,
        timing: "onClick",
        execute: async function(ctx)  {
          if (ctx.fetchCardsInZone((c) => !c.negative[c.currentSide - 1], ctx.t('playArea')).length < 6) {
            return false
          }
          const cards = (await ctx.selectCardsFromZone((c) => !c.negative[c.currentSide - 1], ctx.t('playArea'), this.description(ctx.t), 6, ctx.card, 0));
          if (cards.length >= 6) {
            await ctx.dropToDiscard({id: cards.map((c) => c.id), fromZone: ctx.t('playArea')});
            const checkboxes = ctx.card.checkboxes[ctx.card.currentSide - 1].filter((c) => !c.checked && c.content.includes('✓'));
            await checkBoxes(ctx.card, [checkboxes[0]]);
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            if (checkboxes[0].content.includes('→')) {
              await ctx.upgradeCard(ctx.card, 4, true);
              await ctx.dropToPermanent({id: ctx.card.id, fromZone: ctx.zone});
              ctx.replaceCardInZone(ctx.t('permanentZone'), ctx.card.id, ctx.card);
              return false;
            }
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_the_chase')).effects[1].text,
        timing: "endOfTurn",
        execute: async function(ctx)  {
          const checkboxes = ctx.card.checkboxes[ctx.card.currentSide - 1].filter((c) => !c.checked && c.content.includes('X'));
          await checkBoxes(ctx.card, [checkboxes[0]]);
          ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          if (checkboxes[0].content.includes('effects/destroy')) {
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }
    ],
    4: [{ // Connecteur d'Ether
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "removed",
      execute: async function () {
        return false;
      }
    }]
  },
  166: {
    1: [
      { // Shérif
        description: (t) => parseEffects(t('none')).effects[0].text, 
        timing: "onClick",
        execute: async function (ctx) {
          const upgrade = ctx.card.GetUpgrades()[0];
          if (upgrade.cost && ctx.resources.tradegood >= 3) {
            if (!upgrade.cost.tradegood) {
              return false;
            }
            if (! await applyResourceMapDelta(ctx, { tradegood: 3 }, true)) {
              return false;
            }
            upgrade.cost.tradegood = Math.max(0, (upgrade.cost.tradegood?? 0) - 1);
            
            if (upgrade.cost.tradegood === 0) {
              delete upgrade.cost.tradegood;
            }
            ctx.card.upgrades[0] = [upgrade];
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('effect_description_sheriff')).effects[1].text, 
        timing: "onClick",
        execute: async function (ctx) {
          const lands = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'));
          if (lands.length === 0) {
            return false;
          }
          const land = (await ctx.selectCardsFromArray(lands, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land'))[0];
          if (!land) {
            return false;
          }
          const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
          if (!choice) {
            return false;
          }
          await applyResourceMapDelta(ctx, choice);
          await ctx.dropToDiscard({id: land.id, fromZone: ctx.t('playArea')});
          return true;
        }
      },
    ],
    3: [{ // Shérif Redouté
      description: (t) => parseEffects(t('effect_description_feared_sheriff')).effects[0].text, 
      timing: "onClick",
      execute: async function (ctx) {
        const lands = ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'));
        if (lands.length === 0) {
          return false;
        }
        const land = (await ctx.selectCardsFromArray(lands, ctx.t('playArea'), this.description(ctx.t), 1, 0, ctx.card, 'land'))[0];
        if (!land) {
          return false;
        }
        const choice = await ctx.selectResourceChoice({ coin: 1, wood: 1, stone: 1, sword: 1, metal: 1, tradegood: 1 }, 2);
        if (!choice) {
          return false;
        }
        await applyResourceMapDelta(ctx, choice);
        await ctx.dropToDiscard({id: land.id, fromZone: ctx.t('playArea')});
        return false;
      }
    }],
  },
  167: {
    1: [{ // Trésor
      description: (t) => parseEffects(t('none')).effects[0].text,
      timing: "onClick",
      execute: async function (ctx) {
        let goldToPay = 1;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          goldToPay += checkbox.checked ? 1 : 0;
        }
        // Checkbox
        if (ctx.resources.coin >= goldToPay) {
          if (! await applyResourceMapDelta(ctx, { coin: goldToPay }, true)) {
            return false;
          }
          await checkNextBox(ctx.card);
          ctx.effectEndTurn();
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
          await ctx.upgradeCard(ctx.card, 3, true);
        }
        return false;
      }
    }],
    3: [{ // Trésor Légendaire
        description: (t) => parseEffects(t('none')).effects[0].text,
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 13;
          const checked = ctx.card.checkboxes[ctx.card.currentSide - 1].filter((c) => c.checked).length;
          if (checked === ctx.card.checkboxes[ctx.card.currentSide - 1].length) {
            return false;
          }
          else if (checked === ctx.card.checkboxes[ctx.card.currentSide - 1].length - 1) {
            goldToPay = 30;
          }
          else if (checked === ctx.card.checkboxes[ctx.card.currentSide - 1].length - 2) {
            goldToPay = 25;
          }
          else {
            goldToPay += checked;
          }
          // Checkbox
          if (ctx.resources.coin >= goldToPay) {
            if (! await applyResourceMapDelta(ctx, { coin: goldToPay }, true)) {
              return false;
            }
            await checkNextBox(ctx.card);
            ctx.effectEndTurn();
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
          if (getLastCheckboxChecked(ctx.card)) {
            await setResourceMapToCard(ctx.card, {fame: 175});
          }
          return false;
        }
      }],
  },
  168: {
    2: [{ // Palissade
      description: (t) => parseEffects(t('effect_description_pallisade')).effects[0].text, 
      timing: "endOfTurn",
      execute: async function (ctx) {
        const lands = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 2, 'land');
        if (lands.length > 0) {
          ctx.setTemporaryCardListImmediate(lands);
          return true;
        }
        return false;
      }
    }],
    3: [
      { // Muraille Avant-Poste
        description: (t) => parseEffects(t('effect_description_walled_outpost')).effects[0].text, 
        timing: "endOfTurn",
        execute: async function (ctx) {
          const choice = await ctx.selectStringChoice(ctx.t('string_choice_discard_to_keep_lands'), [ctx.t('yes'), ctx.t('no')]);
          if (choice === ctx.t('yes')) {
            ctx.setTemporaryCardListImmediate(ctx.fetchCardsInZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea')));
            return true;
          }
          return false;
        }
      },
      {
        description: (t) => parseEffects(t('none')).effects[1].text,
        timing: "onPurge",
        execute: async function (ctx) {
          await addResourceMapToCard(ctx.card, { fame: ctx.cardsForTrigger? 2 * ctx.cardsForTrigger.filter((c) => c.id !== ctx.card.id).length : 0 });
          return false;
        }
      }
    ],
    4: [{ // Avant-Poste Forestier
      description: (t) => parseEffects(t('effect_description_forest_outpost')).effects[0].text, 
      timing: "endOfTurn",
      execute: async function (ctx) {
        const lands = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description(ctx.t), 0, ctx.card, 3, 'land');
        if (lands.length > 0) {
          ctx.setTemporaryCardListImmediate(lands);
          return true;
        }
        return false;
      }
    }],
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
  149: {
    1: { // Percepteur des Impôts
      description: "Vaut -1 par check",
      execute: function(ctx)  {
        return -1 * (ctx.card.checkboxes[0].filter(cb => cb.checked).length);
      }
    },
  },
  159: {
    3: { // Barde Obéissant
      description: "Vaut 2 par check",
      execute: function(ctx)  {
        return 2 * (ctx.card.checkboxes[2].filter(cb => cb.checked).length);
      }
    },
  }
}

export const cardUpgradeAdditionalCostRegistry: Record<number, Record<number, CardUpgradeCost>> = {
  49: {
    1: {
      description: "other_cost_destroy_stone_bridge",
      execute: async function (ctx) {
        const card = ctx.fetchCardsInZone((c) => c.GetName(ctx.t) === ctx.t('stone_bridge'), ctx.t('playArea'))[0];
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
      description: "other_cost_one_person",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 1, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 1) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person_two_lands_two_buildings",
      execute: async function (ctx) {
        if( ctx.fetchCardsInZone(
              (c) => c.GetType(ctx.t).includes(ctx.t('person')),
              ctx.t('playArea')
            ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2 ||
            ctx.fetchCardsInZone(
              (c) => c.GetType(ctx.t).includes(ctx.t('land')),
              ctx.t('playArea')
            ).reduce((sum, c) => sum + getCardSelectionValue(c, 'land'), 0) < 2 ||
            ctx.fetchCardsInZone(
              (c) => c.GetType(ctx.t).includes(ctx.t('building')),
              ctx.t('playArea')
            ).reduce((sum, c) => sum + getCardSelectionValue(c, 'building'), 0) < 2
          )
        {
          return false;
        }
        const people = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if (people.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const lands = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('land')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'land');
        if (lands.reduce((sum, c) => sum + getCardSelectionValue(c, 'land'), 0) < 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const buildings = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('building')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'building');
        if (buildings.reduce((sum, c) => sum + getCardSelectionValue(c, 'building'), 0) < 2) {
          return false;
        }

        for(const card of [...people, ...lands, ...buildings]) {
          await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
        }
        return true;
      }
    },
    2: {
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "other_cost_two_seafarings",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('seafaring')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'seafaring'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('seafaring')) && c.id !== ctx.card.id, ctx.t('playArea'), this.description, 2, ctx.card, 0, ctx.t('seafaring'));
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'seafaring'), 0) >= 2) {
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
      description: "other_cost_one_person",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 1, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 1) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
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
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "other_cost_two_person",
      execute: async function (ctx) {
        if(ctx.fetchCardsInZone(
          (c) => c.GetType(ctx.t).includes(ctx.t('person')),
          ctx.t('playArea')
        ).reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) < 2) {
          return false;
        }
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('person')), ctx.t('playArea'), this.description, 2, ctx.card, 0, 'person');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'person'), 0) >= 2) {
          for(const card of cards) {
            await ctx.dropToDiscard({fromZone: ctx.t('playArea'), id: card.id});
          }
          return true;
        }
        return false;
      }
    },
  },
  152: {
    4: {
      description: "other_cost_one_enemy",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType(ctx.t).includes(ctx.t('enemy')), ctx.t('playArea'), this.description, 1, ctx.card, 0, 'enemy');
        if(cards.reduce((sum, c) => sum + getCardSelectionValue(c, 'enemy'), 0) >= 1) {
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
  73: {
    2: { // Mineurs
      'person': 2
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
