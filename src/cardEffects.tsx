import { GameCard, type ResourceMap, type DropPayload, type EffectTiming, type Checkbox, RESOURCE_KEYS, emptyResource } from "./types";

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
  dropToPlayArea: (payload: DropPayload) => void;
  dropToBlocked: (payload: DropPayload) => void;
  dropToDiscard: (payload: DropPayload) => void;
  setDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPlayArea: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setDiscard: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPermanentZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardList: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setTemporaryCardListImmediate: (cards: GameCard[]) => void;
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  mill: (nbCards: number) => void;
  openCheckboxPopup: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) => void ;
  selectResourceChoice: (options: Array<Partial<ResourceMap>>) => Promise<Partial<ResourceMap> | null>;
  selectCardsFromZone: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, requiredCount: number, optionalCount?: number, customCardValue?: (card: GameCard) => number) => Promise<GameCard[]>;
  selectCardsFromArray: (cards: GameCard[], zone: string, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number, optionalCount?: number, zone?: string) => Promise<boolean>;
  boostProductivity: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, prodBoost: Partial<ResourceMap> | null) => Promise<boolean>;
  registerEndRoundEffect: (description: string, effect: () => Promise<void>, forceResolve?: boolean) => void;
  addCardEffect: (id: number, face: number, zone: string, effect: CardEffect, effectText: string) => void;
  fetchCardsInZone: (filter: (card: GameCard) => boolean, zone: string) => GameCard[];
  selectCardSides: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selectedSides: number[]) => void) => void;
  selectUpgradeCost: (card: GameCard, callback: (upgradeIndex: number, resourceKey: keyof ResourceMap) => void) => void;
  updateBlocks: (blocker: number, blocked: number[] | null) => void;
  getBlockedBy: (blocker: number) => GameCard[];
  getCardZone: (id: number) => string;
};

export type CardEffect = {
  description: string;
  timing: EffectTiming;
  execute: (context: GameContext) => boolean | Promise<boolean>;
  requiresChoice?: boolean;
  choices?: string[];
  alreadyUsed?: boolean;
};

export type CardFameValue = {
  description: string;
  execute: (context: GameContext) => number | Promise<number>;
};

export type CardUpgradeCost = {
  description: string;
  execute: (context: GameContext) => boolean | Promise<boolean>;
};

// -------------------
// Effects
// -------------------
const stayInPlayText: string = "effects/passive Reste en jeu.";

const stayInPlayEffect: CardEffect = {
  description: "Reste en jeu",
  timing: "stayInPlay",
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
      // Format: "gold x5"
      const key = match[1] as keyof ResourceMap;
      resourceMap[key] = (resourceMap[key] || 0) + parseInt(match[2]);
    } 
    else if (RESOURCE_KEYS.includes(resource as keyof ResourceMap)) {
      // Format: "gold" - additionne au lieu d'écraser
      const key = resource as keyof ResourceMap;
      resourceMap[key] = (resourceMap[key] || 0) + 1;
    }
  });

  if (Object.keys(resourceMap).length === 0) {
    return;
  }

  return resourceMap;
}

function applyResourceMapDelta(
  setResources: (fn: (prev: ResourceMap) => ResourceMap) => void,
  delta: Partial<ResourceMap> | undefined
) {
  setResources(prev => {
    if(!delta) {
      return { ...prev };
    }
    const updated = { ...prev };
    for (const key in delta) {
      const resourceKey = key as keyof ResourceMap;
      const amount = delta[resourceKey] ?? 0;
      updated[resourceKey] = (updated[resourceKey] ?? 0) + amount;
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
  if (!added) {
    return;
  }
  for (const key in added) {
    const resourceKey = key as keyof ResourceMap;
    const amount = added[resourceKey] ?? 0;
    card.resources[card.currentSide - 1] = [ emptyResource ];
    for (const resourceMap of card.GetResources()) {
      resourceMap[resourceKey] = amount;
    }
  }
}

function checkBoxes(
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

function checkNextBox(
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

// -------------------
// Get Effects
// -------------------
export const cardEffectsRegistry: Record<number, Record<number, CardEffect[]>> = {
  1: {
    2: [{ // Plaines
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
          "Play Area",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, gold: prev.gold + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: "Reste en jeu",
        timing: "stayInPlay",
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
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
          "Play Area",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, gold: prev.gold + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: "Reste en jeu",
        timing: "stayInPlay",
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
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
          "Play Area",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, gold: prev.gold + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: "Reste en jeu",
        timing: "stayInPlay",
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
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
          "Play Area",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToDiscard({id: card.id, fromZone: ctx.zone})));
          ctx.setResources(prev => ({ ...prev, gold: prev.gold + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Grange
        description: "Reste en jeu",
        timing: "stayInPlay",
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
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description,
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
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description,
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
      description: "Gagnez 3 wood, puis Front Down",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description,
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
      description: "Gagnez 3 wood, puis Front Down",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description,
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
      description: "Jouez un Terrain depuis votre Défausse",
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain")),
          "Discard",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToPlayArea({id: card.id, fromZone: "Discard"})));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Château
      description: "Jouez une carte depuis votre Défausse",
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          () => (true),
          "Discard",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToPlayArea({id: card.id, fromZone: "Discard"})));
          return true;
        }
        return false;
      }
    }],
    4: [{ // Donjon
      description: "Jouez un Terrain ou un Bâtiment depuis votre Défausse",
      timing: "onClick",
      execute: async function(ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain") || card.GetType().includes("Bâtiment")),
          "Discard",
          this.description,
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.map(card => (ctx.dropToPlayArea({id: card.id, fromZone: "Discard"})));
          return true;
        }
        return false;
      }
    }],
  },
  10: {
    1: [{ // Commerçante
      description: "Dépensez 1 gold pour obtenir 1 wood",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: "Dépensez 1 gold pour obtenir 1 wood ou 1 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: "Dépensez 1 gold pour obtenir 1 wood, 1 stone ou 1 ingot",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 },
            { ingot: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1 }));
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
      description: "Dépensez 1 gold pour obtenir 1 wood",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Arbres Géants
      description: "Dépensez 1 gold pour obtenir 2 wood",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 2 }));
          return true;
        }
        return false;
      }
    }],
  },
  12: {
    3: [{ // Explorateurs
      description: "Découvrez un nouveau territoire (71/72/73/74)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([71, 72, 73, 74].includes(card.id)),
          this.description,
          1
        )) {
          ctx.card.currentSide = 4;
          return true;
        }
        return false;
      }
    }],
  },
  13: {
    1: [{ // Exploitant
      description: "Gagnez les ressources produitent par un Terrain",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain")),
          "Play Area",
          this.description,
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
      description: "Gagnez gold/wood/stone",
      timing: "onClick",
      execute: async function (ctx) {
        const choice = await ctx.selectResourceChoice([
            { gold: 1 },  
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
      description: "Bloque 1 carte avec une production de gold",
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (card.GetResources().some((res) => (res.gold ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 1);
        }
        if (selectedCards.length !== 0) {
          ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: "Dépensez 1 military pour vaincre et gagner 2 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.military >= 1) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, military: prev.military - 1}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: "Gagnez les ressources produitent par un Bâtiment",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Bâtiment")),
          "Play Area",
          this.description,
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
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description,
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
      description: "Bloque 1 carte avec une production de gold",
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) => (card.GetResources().some((res) => (res.gold ?? 0) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 1);
        }
        if (selectedCards.length !== 0) {
          ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
          ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
        }
        return false;
      }
    },
    { // Bandit
      description: "Dépensez 1 military pour vaincre et gagner 2 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.military >= 1) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, military: prev.military - 1}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: "Gagnez les ressources produitent par un Terrain",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain")),
          "Play Area",
          this.description,
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
      description: "Dépensez 3 gold pour découvrir 103",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 3) {
          if (await ctx.discoverCard(
            (card) => ([103].includes(card.id)),
            this.description,
            1
          )) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 3 }));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Cathédrale
      description: "Gagnez 1 gold/personne",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, gold: prev.gold + ctx.filterZone("Play Area", (card: GameCard) => (card.GetType() == "Personne")).length }));
        return true;
      }
    }],
    4: [{ // Eglise
      description: "Dépensez 4 gold pour découvrir 104",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 4) {
          if (await ctx.discoverCard(
            (card) => ([104].includes(card.id)),
            this.description,
            1
          )) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 4 }));
            return true;
          }
        }
        return false;
      }
    }],
  },
  18: {
    2: [{ // Forge
      description: "Réinitialisez pour découvrir 90",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([90].includes(card.id)),
          this.description,
          1
          )) {
          ctx.card.currentSide = 1;
          return true;
        }
        return false;
      }
    }],
    3: [{ // Muraille
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
    4: [{ // Armurerie
      description: "Gagnez 1 military/personne",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, military: prev.military + ctx.filterZone("Play Area", (card: GameCard) => (card.GetType() == "Personne")).length }));
        return true;
      }
    }],
  },
  19: {
    1: [{ // Forêt
      description: "Gagnez 3 wood, puis Front Down",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description,
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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Phare
        description: "Défaussez la carte du dessus du deck",
        timing: "onClick",
        execute: async function (ctx) {
          ctx.mill(1);
          return false;
        }
      },
    ],
    4: [{ // Bateau de Pêche
      description: "Découvrez 75",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([75].includes(card.id)),
          this.description,
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
        description: "Rien",
        timing: "doesNothing",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
    }],
  },
  24: {
    1: [{ // Terre Fertile/Efficacité
        description: "Ajoute 1 gold à 1 Terrain et boost 1 Bâtiment",
        timing: "onClick",
        execute: async function (ctx) {
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), "Deck", this.description, { gold: 1 }));
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), "Deck", this.description, null));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
  },
  25: {
    1: [{ // Armée
        description: "End pour payer des military",
        timing: "onClick",
        execute: async function (ctx) {
          let militaryToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            militaryToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.military >= militaryToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, military: prev.military - militaryToPay }));
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
              this.description,
              1
            )
          }
          return false;
        }
      }],
    3: [{ // Grande Armée
        description: "End pour payer des military",
        timing: "onClick",
        execute: async function (ctx) {
          let checkedBoxes = 0;
          const militaryToPay = [10, 10, 12, 12, 15];
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            checkedBoxes += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.military >= militaryToPay[checkedBoxes]) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, military: prev.military - militaryToPay[checkedBoxes] }));
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
        description: "End pour payer des gold",
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 1;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.gold >= goldToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, gold: prev.gold - goldToPay }));
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
        description: "End pour payer des gold",
        timing: "onClick",
        execute: async function (ctx) {
          let goldToPay = 12;
          for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
            goldToPay += checkbox.checked ? 1 : 0;
          }
          // Checkbox
          if (ctx.resources.gold >= goldToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                ctx.setResources(prev => ({ ...prev, gold: prev.gold - goldToPay }));
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
        description: "Dépensez des export, recevez des récompenses",
        timing: "onClick",
        execute: async function (ctx) {
          const oldExportValue = ctx.card.GetResources()[0].export ?? 0;
          const thresholdValues = [10, 20, 30, 40, 55, 75, 100];

          if (ctx.resources.export > 0) {
            await addResourceMapToCard(ctx.card, { export: ctx.resources.export });
            ctx.setResources(prev => ({ ...prev, export: 0 }));
          }

          const newExport = ctx.card.GetResources()[0].export ?? 0;
          for (const threshold of thresholdValues) {
            if (oldExportValue < threshold && newExport >= threshold) {
              switch(threshold) {
                case 10:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 10): Ajoutez gold/wood/stone à 1 Terrain",
                    async () => {
                      const choice = await ctx.selectResourceChoice([
                        { gold: 1 },  
                        { wood: 1 },
                        { stone: 1 }
                      ]);
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), "Deck", this.description, choice);
                      }
                    },
                    false
                  );
                  break;
                case 20:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 20): Ajoute \"Reste en Jeu\" à une personne",
                    async () => {
                      const card = (await ctx.selectCardsFromZone((card) => (card.GetType().includes("Personne")), "Deck", "Récompense export (seuil 20): Ajoute \"Reste en Jeu\" à une personne", 1)).slice(0)[0];
                      ctx.addCardEffect(card.id, card.currentSide, "Deck", stayInPlayEffect, stayInPlayText);
                    },
                    false
                  );
                  break;
                case 30:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 30): Découvre Adoubement (80)",
                    async () => {
                      await ctx.discoverCard(
                        (card) => [80].includes(card.id),
                        this.description,
                        1,
                        0,
                        "Deck"
                      );
                    },
                    false
                  );
                  break;
                case 40:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 40): Ajoutez ingot/military/export à 1 Bâtiment",
                    async () => {
                      const choice = await ctx.selectResourceChoice([
                        { ingot: 1 },  
                        { military: 1 },
                        { export: 1 }
                      ]);
                      if(choice) {
                        await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), "Deck", this.description, choice);
                      }
                    },
                    false
                  );
                  break;
                case 55:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 55): Ajoutez wood/stone/ingot/military à 1 carte",
                    async () => {
                      const choice = await ctx.selectResourceChoice([
                        { wood: 1 },  
                        { stone: 1 },  
                        { ingot: 1 },  
                        { military: 1 },
                      ]);
                      if(choice) {
                        await ctx.boostProductivity(() => (true), "Deck", this.description, choice);
                      }
                    },
                    false
                  );
                  break;
                case 75:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 75): Ajoutez fame x5 à 1 carte",
                    async () => {
                      await ctx.boostProductivity(() => (true), "Deck", this.description, { fame: 5 });
                    },
                    false
                  );
                  break;
                case 100:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 100): Retournez la carte",
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
        description: "Dépensez des export, recevez des récompenses",
        timing: "onClick",
        execute: async function (ctx) {
          const oldExportValue = ctx.card.GetResources()[0].export ?? 0;
          const thresholdValues = [25, 50, 75, 100, 150, 200, 250];

          if (ctx.resources.export > 0) {
            await addResourceMapToCard(ctx.card, { export: ctx.resources.export });
            ctx.setResources(prev => ({ ...prev, export: 0 }));
          }

          const newExport = ctx.card.GetResources()[0].export ?? 0;
          for (const threshold of thresholdValues) {
            if (oldExportValue < threshold && newExport >= threshold) {
              switch(threshold) {
                case 25:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 25): Ajoute 1 fame à 2 Terrains",
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType().includes("Terrain")), "Deck", this.description, { fame: 1 });
                      await ctx.boostProductivity((card) => (card.GetType().includes("Terrain")), "Deck", this.description, { fame: 1 });
                    },
                    false
                  );
                  break;
                case 50:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 50): Ajoute 5 fame à 1 Personne",
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType().includes("Personne")), "Deck", this.description, { fame: 5 });
                    },
                    false
                  );
                  break;
                case 75:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 75): Décrouvrez la Visite Royale (107)",
                    async () => {
                      await ctx.discoverCard(
                        (card) => [107].includes(card.id),
                        this.description,
                        1,
                        0,
                        "Deck"
                      );
                    },
                    false
                  );
                  break;
                case 100:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 100): Ajoute 5 fame à 1 Bâtiment",
                    async () => {
                      await ctx.boostProductivity((card) => (card.GetType().includes("Bâtiment")), "Deck", this.description, { fame: 5 });
                    },
                    false
                  );
                  break;
                case 150:
                  ctx.registerEndRoundEffect(
                    "Récompense export (seuil 150): Check une carte Permanente",
                    async () => {
                      const card = (await ctx.selectCardsFromZone(
                          (card) => (card.id !== ctx.card.id && card.checkboxes.length !== 0),
                          "Permanent",
                          "Récompense export (seuil 150): Check une carte Permanente",
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
                    "Récompense export (seuil 200): Check toutes les cartes Permanentes souhaitées",
                    async () => {
                      const cards = ctx.fetchCardsInZone(
                        (card) => (card.id !== ctx.card.id && card.checkboxes.length !== 0),
                        "Permanent"
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
                    "Récompense export (seuil 250): Découvrez les Relation Commerciales (117)",
                    async () => {
                      await ctx.discoverCard(
                        (card) => [117].includes(card.id),
                        this.description,
                        1,
                        0,
                        "Deck"
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
      description: "Détruit le prochain terrain joué",
      timing: "otherCardPlayed",
      execute: async function (ctx) {
        const selectableCards = [];
        for (const card of (ctx.cardsForTrigger?? [])) {
          if (card.GetType().includes("Terrain")) selectableCards.push(card);
        }
        if(selectableCards.length !== 0) {
          ctx.deleteCardInZone("Play Area", (await ctx.selectCardsFromArray(selectableCards, "Play Area", this.description, 1))[0].id);
          ctx.card.currentSide = 3;
          return true;
        }
        return false;
      }
    }],
    4: [{ // Jeune Forêt
      description: "Checkez puis gagne 1 wood sur *",
      timing: "onClick",
      execute: async function (ctx) {
        let i = 0;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          if(!checkbox.checked){
            checkbox.checked = true;
            if (i % 2 === 0) {
              await addResourceMapToCard(ctx.card, { wood: 1 });
            }
            break;
          }
          i++;
        }
        ctx.effectEndTurn();
        return false;
      }
    }],
  },
  29: {
    4: [{ // Prétendu Noble
      description: "Réinitialise cette carte et ajoute une ressource à une étape de cette carte sans modification",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.selectCardSides(ctx.card, 1, 0, async (selectedSides) => {
          const resourcesCount = getResourcesCount(ctx.card.resources[selectedSides[0] - 1][0]);
          if (selectedSides.length > 0 && ((selectedSides[0] !== 4 && resourcesCount <= 1) || (selectedSides[0] === 4 && resourcesCount <= 4))) {
            const targetSide = selectedSides[0];
            
            const resourceChoice = await ctx.selectResourceChoice([
              { gold: 1 }, { wood: 1 }, { stone: 1 }, { ingot: 1 }, {military: 1} 
            ]);
            
            if (resourceChoice) {
              ctx.card.resources[targetSide - 1].forEach(option => {
                Object.entries(resourceChoice).forEach(([key, value]) => {
                  option[key as keyof ResourceMap] = 
                    (option[key as keyof ResourceMap] || 0) + value;
                });
              });
            }
            
            ctx.card.currentSide = 1;
            ctx.replaceCardInZone(ctx.zone, ctx.card.id, ctx.card);
            return true;
          }
        });
        return false;
      }
    }],
  },
  30: {
    1: [{ // STOP !
      description: "Découvrez 31 à 34 et choisissez en 2 (détruisez 2)",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 31 && card.id <= 34), "Campaign", this.description, 2)).splice(0);
        const ids = [31, 32, 33, 34];

        ctx.setDeck((d) => [...d, ...cards]);
        
        for (const id of ids) {
          ctx.deleteCardInZone("Campaign", id);
        }

        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }],
  },
  31: {
    1: [{ // Entrepreneur
      description: "Découvrez l'Ecole (118)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard((card) => card.id === 118, this.description, 1)) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Hôtel
      description: "Gagnez 1 gold par personne en jeu",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => (
          { ...prev, gold: prev.gold + ctx.fetchCardsInZone((card) => card.GetType().includes("Personne"), "Play Area").length }
        ));
        ;
        return true;
      }
    }],
    3: [{ // Taverne
      description: "Découvrez des Quêtes (87)",
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => card.id === 87, this.description, 1)).valueOf();
      }
    }],
    4: [{ // Bar Confortable
      description: "Défaussez une Personne pour découvrir un Etranger (92)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.fetchCardsInZone((card) => card.id === 92, "Campaign").length !== 1) return false;
        const card = (await ctx.selectCardsFromZone((card) => card.GetType().includes("Personne"), "Play Area", this.description, 1)).splice(0)[0];
        if(card && (await ctx.discoverCard((card) => card.id === 92, this.description, 1)).valueOf()) {
          ctx.dropToDiscard({id: card.id, fromZone: "Play Area"});
          return true;
        }
        return false;
      }
    }],
  },
  32: {
    1: [{ // TODO: Scientifique
      description: "Les Personnes produisent 1 gold de plus",
      timing: "onResourceGain",
      execute: async function (ctx) {
        for(const card of ctx.cardsForTrigger?? []) {
          if (card.GetType().includes("Personne")) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold + 1 }));
          }
        }
        return false;
      }
    }],
    3: [{ // Observatoire
      description: "Découvrez l'Astronome (95)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.discoverCard((card) => card.id === 95, this.description, 1).valueOf()) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
    4: [{ // Laboratoire
      description: "Découvrez l'Alchimiste (96)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.discoverCard((card) => card.id === 96, this.description, 1).valueOf()) {
          ctx.effectEndTurn();
        }
        return false
      }
    }],
  },
  33: {
    1: [{ // Ingénieur
      description: "Détruisez Cabane de Bûcheron/Grange/Bâteau de pêche pour découvrir (100)/(101)/(102)",
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = ["Cabane de Bûcheron", "Grange", "Bâteau de pêche"];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName()), "Play Area", this.description, 1)).slice(0)[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (100 + cardsNames.indexOf(card.GetName())), this.description, 1);
          if (discovered) {
            ctx.deleteCardInZone("Play Area", card.id);
            await new Promise(resolve => setTimeout(resolve, 100));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Trébuchet
      description: "Détruisez pour vaincre un ennemi et marquer la prochaine case de l'Armée (27)",
      timing: "onClick",
      execute: async function (ctx) {
        const playAreaCards = ctx.fetchCardsInZone((card) => card.GetType().includes("Ennemi"), "Play Area");
        const discardCards = ctx.fetchCardsInZone((card) => card.GetType().includes("Ennemi"), "Discard");
        const permanentCards = ctx.fetchCardsInZone((card) => card.GetType().includes("Ennemi"), "Permanent");
        const card = (await ctx.selectCardsFromArray([...playAreaCards, ...discardCards, ...permanentCards], "Play Area", this.description, 1)).splice(0)[0];
        if (card) {
          let zone = "Play Area"

          if (discardCards.includes(card)) {
            zone = "Discard";
          }
          else if (permanentCards.includes(card)) {
            zone = "Permanent";
          }

          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          ctx.deleteCardInZone(zone, card.id);

          const subCtx = ctx;
          subCtx.card = ctx.fetchCardsInZone((c) => c.id === 25, "Permanent")[0];
          subCtx.zone = "Permanent";
          
          await checkNextBoxApplyEffect(subCtx);
        }
        return false;
      }
    }],
  },
  34: {
    3: [{ // Inventrice Inspirée
      description: "Réinitialisez et check Inventrice, puis découvrez une invention (97/98/99) ou 1 ressource par check",
      timing: "onClick",
      execute: async function (ctx) {
        let checkedBoxes = 1;
        for (const checkbox of ctx.card.checkboxes[0]) {
          if (checkbox.checked) checkedBoxes++;
        }
        if(checkedBoxes > 3) checkedBoxes = 3;
        
        const resourcesChoice = [
          {gold: checkedBoxes},
          {wood: checkedBoxes},
          {stone: checkedBoxes},
          {ingot: checkedBoxes},
          {military: checkedBoxes},
          {export: checkedBoxes}
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
          ctx.card.currentSide = 1;
          checkNextBox(ctx.card);
          return true;
        }
        else {
          if((await ctx.discoverCard(
            (card) => card.id >= 97 && card.id <= 99, 
            this.description, 
            1
          )).valueOf()) {
            ctx.card.currentSide = 1;
            checkNextBox(ctx.card);
            return true;
          }
        }
        return false;
      }
    }],
  },
  35: {
    2: [{ // Zone Rocheuse
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description,
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
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if(ctx.resources.gold >= 2) {
          ctx.openCheckboxPopup(ctx.card, 1, 1, (boxes) => {
            if(boxes.length !== 0) {
              for(const box of boxes) {
                applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
              }
              checkBoxes(ctx.card, boxes);
              ctx.setResources(prev => ({ ...prev, gold: prev.gold - 2 }));
              return true;
            }
          });
        }
        return false;
      }
    }],
    3: [
        { // Sir ___
        description: "Dépensez 3 ingot pour gagner 1 military",
        timing: "onClick",
        alreadyUsed: false,
        execute: async function (ctx) {
          if(ctx.resources.ingot >= 3 && !this.alreadyUsed) {
            await addResourceMapToCard(ctx.card, { military: 1});
            ctx.setResources(prev => ({ ...prev, ingot: prev.ingot - 3 }));
            ctx.effectEndTurn();
            this.alreadyUsed = true;
            return false;
          }
          return false;
        }
      },
      { // Sir ___
        description: "Dépensez 4 ingot pour gagner 1 military",
        timing: "onClick",
        alreadyUsed: false,
        execute: async function (ctx) {
          if(ctx.resources.ingot >= 4 && !this.alreadyUsed) {
            await addResourceMapToCard(ctx.card, { military: 1});
            ctx.setResources(prev => ({ ...prev, ingot: prev.ingot - 4 }));
            ctx.effectEndTurn();
            this.alreadyUsed = true;
            return false;
          }
          return false;
        }
      }
    ],
  },
  37: {

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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Défaussez la carte du sommet du deck",
        timing: "onClick",
        execute: async function (ctx) {
          ctx.mill(1);
          return true;
        }
      },
      {
        description: "Ajoutez 1 check",
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                checkBoxes(ctx.card, boxes);
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
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 1, (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                checkBoxes(ctx.card, boxes);
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
      description: "Gagnez les ressources produitent par un Terrain",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain")),
          "Play Area",
          this.description,
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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      { // Grenier
        description: "Défaussez pour qu'une autre carte reste en jeu",
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone(
            (card) => card.id !== ctx.card.id, "Play Area", this.description, 1
          );
          if (!selected || selected.length === 0) return false;

          if(ctx.setTemporaryCardListImmediate) {
            ctx.setTemporaryCardListImmediate(selected);
          }
          else {
            ctx.setTemporaryCardList(selected);
          }

          ctx.setPlayArea(prev => prev.filter(c => c.id !== ctx.card.id));

          return true;
        }
      },
    ]
  },
  43: {
    1: [{ // Maçon
      description: "Dépensez 2 golds pour découvrir 88/89",
      timing: "onClick",
      execute: async function (ctx) {
        if(ctx.resources.gold >= 2) {
          if (await ctx.discoverCard(
            (card) => ([88, 89].includes(card.id)),
            this.description,
            1
          )) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 2 }));
            return true;
          }
        }
        return false;
      }
    }],
    3: [{ // Route Pavée
        description: "Inspectez 109 et 110, découvrez une, détruisez l'autre",
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([109, 110].includes(card.id)),
            "Campaign",
            this.description,
            1
          );
          const card = cards[0];
          if (card) {
            ctx.dropToDiscard({id: card.id, fromZone: "Campaign"});
            const id = (card.id === 109) ? 110 : 109;
            ctx.deleteCardInZone("Campaign", id);
            ctx.effectEndTurn();
            return false;
          }
          return false;
        }
      }],
      4: [{ // Rue Pavée
        description: "Inspectez 111 et 112, découvrez une, détruisez l'autre",
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone(
            (card) => ([111, 112].includes(card.id)),
            "Campaign",
            this.description,
            1
          );
          const card = cards[0];
          if (card) {
            ctx.dropToDiscard({id: card.id, fromZone: "Campaign"});
            const id = (card.id === 111) ? 112 : 111;
            ctx.deleteCardInZone("Campaign", id);
            ctx.effectEndTurn();
            return false;
          }
          return false;
        }
      }],
  },
  44: {
    1: [{ // Orage
      description: "Défaussez les 3 premières cartes de votre pioche",
      timing: "played",
      execute: async function (ctx) {
        ctx.mill(3);
        ctx.card.currentSide = 3;
        return true;
      }
    }],
    3: [
      { // Pluie
        description: "Doublez la production des terrains",
        timing: "onResourceGain",
        execute: async function (ctx) {
          const card = (ctx.cardsForTrigger?ctx.cardsForTrigger:[])[0];
          if(card.GetType().includes("Terrain")) {
            applyResourceMapDelta(ctx.setResources, ctx.resources);
          }
          return false;
        }
      },
      {
        description: "Vous ne pouvez pas jouer de cartes",
        timing: "restrictPlay",
        execute: async function () {
          return false;
        }
      },
      {
        description: "Retournez à la fin du tour",
        timing: "endOfTurn",
        execute: async function (ctx) {
          ctx.card.currentSide = 1;
          return false;
        }
      }
    ]
  },
  45: {
    1: [
      { // Chevalier Noir
        description: "Vous ne pouvez ni jouer, ni améliorer de cartes, ni même utiliser les effets time",
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
      description: "Dépensez 3 military pour vaincre et retourner",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.military >= 3) {
          ctx.setResources(prev => ({ ...prev, military: prev.military - 3}));
          ctx.card.currentSide = 3;
          return true;
        }
        return false;
      }
    },
    ],
    3: [{ // Garçon Admiratif
        description: "Détruisez et gagnez military x2",
        timing: "onClick",
        execute: async function (ctx) {
          ctx.setResources(prev => ({ ...prev, military: prev.military + 2 }));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
    4: [{ // Ecuyer
      description: "Détruisez et gagnez military x3",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, military: prev.military + 3 }));
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  46: {
    2: [{ // Camp d'Entrainement
        description: "Dépensez gold pour gagner military",
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.gold >= 1) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, military: prev.military + 1 }));
            return true;
          }
          return false;
        }
      }]
  },
  47: {
    1: [{ // STOP !
      description: "Découvrez 48 à 51 et choisissez en 2 (détruisez 2)",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = (await ctx.selectCardsFromZone((card) => (card.id >= 48 && card.id <= 51), "Campaign", this.description, 2)).splice(0);
        const ids = [48, 49, 50, 51];

        ctx.setDeck((d) => [...d, ...cards]);
        
        for (const id of ids) {
          ctx.deleteCardInZone("Campaign", id);
        }

        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }],
  },
  48: {
    1: [{ // Envoyé
      description: "Dépensez gold x3 pour découvrir (119)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 3) {
          if (await ctx.discoverCard(
            (card) => ([119].includes(card.id)),
            this.description,
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    2: [{ // Emissaire
      description: "Dépensez gold x3 pour découvrir (120)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 3) {
          if (await ctx.discoverCard(
            (card) => ([120].includes(card.id)),
            this.description,
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    3: [{ // Ambassadeur
      description: "Dépensez gold x3 pour découvrir (122)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 3) {
          if (await ctx.discoverCard(
            (card) => ([121].includes(card.id)),
            this.description,
            1
          )) {
            ctx.effectEndTurn();
          }
        }
        return false;
      }
    }],
    4: [{ // Diplomate
      description: "Dépensez gold x3 pour découvrir (121)",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 3) {
          if (await ctx.discoverCard(
            (card) => ([122].includes(card.id)),
            this.description,
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
      description: "Détruisez Château/Mine de Diamant/Temple pour découvrir (123)/(124)/(125)",
      timing: "onClick",
      execute: async function (ctx) {
        const cardsNames = ["Château", "Mine de Diamant", "Temple"];
        const card = (await ctx.selectCardsFromZone((card) => cardsNames.includes(card.GetName()), "Play Area", this.description, 1)).slice(0)[0];
        await new Promise(resolve => setTimeout(resolve, 100));
        if (card) {
          const discovered = await ctx.discoverCard((c) => c.id === (123 + cardsNames.indexOf(card.GetName())), this.description, 1);
          if (discovered) {
            ctx.deleteCardInZone("Play Area", card.id);
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
      description: "Découvrez (126)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([126].includes(card.id)),
          this.description,
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Voyageur
      description: "Découvrez (127)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([127].includes(card.id)),
          this.description,
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [
      { // Voyageur
        description: "Découvrez (129)",
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([129].includes(card.id)),
            this.description,
            1
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: "Défaussez un terrain pour gagner 2 ressources",
        timing: "onClick",
        execute: async function (ctx) {
          const cards = await ctx.selectCardsFromZone((card) => card.GetType().includes("Terrain"), "Play Area", this.description, 1);
          const card = cards[0];
          if (card) {
            const choice1 = await ctx.selectResourceChoice([
              { gold: 1 },  
              { wood: 1 },
              { stone: 1 },
              { military: 1 },
              { ingot: 1 },
              { export: 1 },
            ]);
            if (!choice1) {
              return false;
            }
            const choice2 = await ctx.selectResourceChoice([
              { gold: 1 },  
              { wood: 1 },
              { stone: 1 },
              { military: 1 },
              { ingot: 1 },
              { export: 1 },
            ]);
            if(choice2) {
              applyChoice(ctx, choice1);
              applyChoice(ctx, choice2);
              ctx.dropToDiscard({id: card.id, fromZone: "Play Area"});
              return true;
            }
          }
          return false;
        }
      },
    ],
    4: [{ // Voyageur
      description: "Découvrez (128)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([128].includes(card.id)),
          this.description,
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
      description: "Découvrez (130)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([130].includes(card.id)),
          this.description,
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    2: [{ // Magistrat
      description: "Découvrez (131)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([131].includes(card.id)),
          this.description,
          1
        )) {
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
    3: [{ // Stratège
      description: "Jouez une Muraille ou un Chevalier de la défausse",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.GetName().includes("Muraille") || card.GetType().includes("Chevalier"),
          "Discard",
          this.description,
          1
        );
        const card = cards[0];
        if (card) {
          ctx.dropToPlayArea({id: card.id, fromZone: "Discard"});
          return true;
        }
        return false;
      }
    }],
    4: [{ // Magistrat
      description: "Découvrez (132)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([132].includes(card.id)),
          this.description,
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
      description: "Réinitialisez pour découvrir (105)",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([105].includes(card.id)),
          this.description,
          1
        )) {
          ctx.card.currentSide = 1;
          return true;
        }
        return false;
      }
    }],
  },
  53: {
    1: [
      { // Sorcière
        description: "Payez military x3 pour détruire",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 3) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 3 }));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: "Défaussez 3 personnes pour retourner",
        timing: "onClick",
        execute: async function (ctx) {
          const cards = ctx.fetchCardsInZone((card) => card.GetType().includes("Personne"), "Play Area");
          if (cards.length !== 0) {
            const selected = await ctx.selectCardsFromArray(cards, "Play Area", this.description, 3);
            if(selected.length !== 0) {
              for (const card of selected) {
                ctx.dropToDiscard({id: card.id, fromZone: "Play Area"})
              }
              ctx.card.currentSide = 3;
              return true;
            }
          }
          return false;
        }
      },
      {
        description: "Découvrez les 2 prochaines cartes",
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, "Campaign")
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description, 2);
          ctx.card.currentSide = 3;
          return false;
        }
      }
    ],
    3: [
      { // Hutte de la Sorcière
        description: "Payez military x3 pour détruire",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 3) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 3 }));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      },
      {
        description: "Détruisez 1 Personnes pour détruire",
        timing: "onClick",
        execute: async function (ctx) {
          const cards = ctx.fetchCardsInZone((card) => card.GetType().includes("Personne"), "Play Area");
          if (cards.length > 0) {
            const selected = await ctx.selectCardsFromArray(cards, "Play Area", this.description, 1);
            ctx.deleteCardInZone("Play Area", selected[0].id);
            ctx.deleteCardInZone("Play Area", ctx.card.id);
          }
          return false;
        }
      },
      {
        description: "Découvrez les 2 prochaines cartes",
        timing: "endOfTurn",
        execute: async function (ctx) {
          const result: number[] = ctx.fetchCardsInZone((card) => card.discoverable, "Campaign")
            .sort((a, b) => a.id - b.id)
            .slice(0, 2)
            .map(item => item.id);
          await ctx.discoverCard((card) => result.includes(card.id), this.description, 2);
          ctx.deleteCardInZone("Play Area", ctx.card.id);
          return false;
        }
      }
    ]
  },
  54: {
    1: [{ // Scribe
      description: "Défaussez pour faire rester 1 ou 2 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 1, 1);
        ctx.setTemporaryCardListImmediate(selected);
        return false;
      }
    }],
    3: [{ // Architecte
      description: "Découvrez 78/79",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([78, 79].includes(card.id)),
          this.description,
          1
        )) {
          ctx.card.currentSide = 1;
          ctx.effectEndTurn();
        }
        return false;
      }
    }],
  },
  55: {
    1: [
      { // Lord Aethan
        description: "Découvrez la Coopération (80) ou le Domaine (81)",
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([80, 81].includes(card.id)),
            this.description,
            1
          )) {
            return true;
          }
          return false;
        }
      },
      {
        description: "Ajoutez 1 check",
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                checkBoxes(ctx.card, boxes);
              }
              resolve(false);
            });
          });
        }
      }
    ],
    3: [
      { // Lord Nimrod
        description: "Découvrez un Raid (133) ou un Rival (134)",
        timing: "onClick",
        execute: async function (ctx) {
          if (await ctx.discoverCard(
            (card) => ([133, 134].includes(card.id)),
            this.description,
            1
          )) {
            ctx.effectEndTurn();
          }
          return false;
        }
      },
      {
        description: "Ajoutez 1 check",
        timing: "onClick",
        execute: async function (ctx) {
          return new Promise<boolean>((resolve) => {
            ctx.openCheckboxPopup(ctx.card, 1, 0, (boxes) => {
              if(boxes.length !== 0) {
                for(const box of boxes) {
                  applyResourceMapDelta(ctx.setResources, getCheckboxResources(box.content));
                }
                checkBoxes(ctx.card, boxes);
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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez 2 Personnes",
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Personne"), "Deck", this.description, 2);
          for (const card of selected) {
            ctx.deleteCardInZone("Deck", card.id);
          }
          ctx.card.currentSide = 3;
          return false;
        }
      },
    ],
    3: [
      { // Soldat Ennemi
        description: "Bloque un Bâtiment/Terrain",
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType().includes("Terrain") || card.GetType().includes("Bâtiment"));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 1);
          }
          if (selectedCards.length !== 0) {
            ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
          }
          return false;
        }
      },
      {
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez la carte bloquée",
        timing: "endOfRound",
        execute: async function (ctx) {
          const blocked = ctx.getBlockedBy(ctx.card.id)[0];
          if (blocked) {
            ctx.deleteCardInZone("Deck", blocked.id);
            ctx.updateBlocks(ctx.card.id, null);
          }
          return false;
        }
      },
      {
        description: "Dépensez military x2 pour détruire",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 2) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 2 }));
            ctx.deleteCardInZone("Play Area", ctx.card.id);
          }
          return false;
        }
      },
    ]
  },
  57: {
    1: [
      { // Assassin
        description: "Détruit la prochainne Personne jouée",
        timing: "otherCardPlayed",
        execute: async function (ctx) {
          const selectableCards = [];
          for (const card of (ctx.cardsForTrigger?? [])) {
            if (card.GetType().includes("Personne")) selectableCards.push(card);
          }
          if(selectableCards.length !== 0) {
            ctx.deleteCardInZone("Play Area", (await ctx.selectCardsFromArray(selectableCards, "Play Area", this.description, 1))[0].id);
            ctx.card.currentSide = 3;
            return true;
          }
          return false;
        }
      },
      {
        description: "Dépensez military x3 pour vaincre",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 3) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 3 }));
            ctx.card.currentSide = 3;
            return true;
          }
          return false;
        }
      }
    ],
    3: [
      { // Soldat Ennemi
        description: "Bloque un Bâtiment/Terrain",
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType().includes("Terrain") || card.GetType().includes("Bâtiment"));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 1);
          }
          if (selectedCards.length !== 0) {
            ctx.dropToBlocked({id: selectedCards[0].id, fromZone: ctx.zone});
            ctx.updateBlocks(ctx.card.id, [selectedCards[0].id]);
          }
          return false;
        }
      },
      {
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez la carte bloquée",
        timing: "endOfRound",
        execute: async function (ctx) {
          const blocked = ctx.getBlockedBy(ctx.card.id)[0];
          if (blocked) {
            ctx.deleteCardInZone("Deck", blocked.id);
            ctx.updateBlocks(ctx.card.id, null);
          }
          return false;
        }
      },
      {
        description: "Dépensez military x2 pour détruire",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 2) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 2 }));
            ctx.deleteCardInZone("Play Area", ctx.card.id);
          }
          return false;
        }
      }
    ],
  },
  58: {
    1: [
      { // Ville en Flamme
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez 1 Bâtiment",
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Bâtiment"), "Deck", this.description, 1);
          for (const card of selected) {
            ctx.deleteCardInZone("Deck", card.id);
          }
          ctx.card.currentSide = 3;
          return false;
        }
      },
    ],
    4: [{ // Jeune Forêt
      description: "Checkez puis gagne 1 wood sur *",
      timing: "onClick",
      execute: async function (ctx) {
        let i = 0;
        for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
          if(!checkbox.checked){
            checkbox.checked = true;
            if (i % 2 === 0) {
              await addResourceMapToCard(ctx.card, { wood: 1 });
            }
            break;
          }
          i++;
        }
        ctx.effectEndTurn();
        return false;
      }
    }],
  },
  59: {
    3: [{ // Trésor
      description: "Reste en jeu",
      timing: "stayInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Civilisation Oubliée
      description: "Défaussez 6 cartes alliées pour découvrir un Artefact (108)",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((card) => !card.enemy[card.currentSide - 1], "Play Area", this.description, 6);
        if (cards.length === 6) {
          if (await ctx.discoverCard((card) => [108].includes(card.id), this.description, 1)) {
            for(const card of cards) {
              ctx.dropToDiscard({id: card.id, fromZone: "Play Area"});
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
      description: "Bloque 3 cartes avec une production",
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (card.GetResources().some(
            (res) => ((res.gold ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.ingot ?? 0) + (res.military ?? 0) + (res.export ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 3);
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
      description: "Dépensez 3 military pour vaincre et gagner 3 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.military >= 3) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            ctx.setResources(prev => ({ ...prev, military: prev.military - 3}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
            return false;
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Travailleur
      description: "Gagnez les ressources produitent par un Bâtiment",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Bâtiment")),
          "Play Area",
          this.description,
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
        description: "Vous ne pouvez ni jouer, ni améliorer de cartes, ni même utiliser les effets time",
        timing: "restrictAll",
        execute: async function () {
          return false;
        }
      },
      {
        description: "Dépensez 5 military pour vaincre ->",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 5) {
            ctx.setResources(prev => ({ ...prev, military: prev.military - 5}));
            ctx.card.currentSide = 3;
            return true;
          }
          return false;
        }
      },
    ],
    3: [{ // Garçon Admiratif
        description: "Détruisez et gagnez military x2",
        timing: "onClick",
        execute: async function (ctx) {
          ctx.setResources(prev => ({ ...prev, military: prev.military + 2 }));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
    }],
    4: [{ // Ecuyer
      description: "Détruisez et gagnez military x3",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, military: prev.military + 3 }));
        ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        return false;
      }
    }]
  },
  62: {
    2: [{ // Camp d'Entrainement
        description: "Dépensez gold pour gagner military",
        timing: "onClick",
        execute: async function (ctx) {
          if(ctx.resources.gold >= 1) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, military: prev.military + 1 }));
            return true;
          }
          return false;
        }
      }]
  },
  63: {
    3: [{ // Muraille
      description: "Reste en jeu",
      timing: "stayInPlay",
      execute: async function (ctx) {
        if(ctx) {
          return false;
        }
        return true;
      }
    }],
    4: [{ // Aubergiste
      description: "Défaussez 1 Personne pour gagner 2 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne") && c.id !== ctx.card.id, "Play Area", this.description, 1);
        if (selected.length === 1) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.dropToDiscard({id: selected[0].id, fromZone: "Play Area"});
            return true;
          }
        }
        return false;
      }
    }],
  },
  64: {
    1: [{ // Bandit d'Elite
      description: "Bloque 3 cartes avec une production",
      timing: "played",
      execute: async function (ctx) {
        let selectedCards: GameCard[] = [];
        const filter = (card: GameCard) =>
          (card.GetResources().some(
            (res) => ((res.gold ?? 0) + (res.wood ?? 0) + (res.stone ?? 0) + (res.ingot ?? 0) + (res.military ?? 0) + (res.export ?? 0)) >= 1));
        while (selectedCards.length == 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
          selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 3);
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
      description: "Dépensez 3 military pour vaincre et gagner 3 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.military >= 3) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            ctx.setResources(prev => ({ ...prev, military: prev.military - 3}));
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
            return false;
          }
        }
        return false;
      }
    },
    ],
    3: [{ // Exploitant
      description: "Gagnez les ressources produitent par un Terrain",
      timing: "onClick",
      execute: async function (ctx) {
        const selectedCards = await ctx.selectCardsFromZone(
          (card) => (card.GetType().includes("Terrain")),
          "Play Area",
          this.description,
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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez 3 cartes alliées",
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone(
            (card) => (!(card.enemy[card.currentSide - 1])),
            "Deck",
            this.description,
            3
          );
          for (const card of selected) {
            ctx.deleteCardInZone("Deck", card.id);
          }
          ctx.card.currentSide = 3;
          return false;
        }
      }
    ],
    3: [
      { // Innodations
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Bloque 5 Bâtiments",
        timing: "played",
        execute: async function (ctx) {
          let selectedCards: GameCard[] = [];
          const filter = (card: GameCard) => (card.GetType().includes("Bâtiment"));
          while (selectedCards.length === 0 && ctx.filterZone(ctx.zone, filter).length !== 0) {
            selectedCards = await ctx.selectCardsFromZone(filter, "Play Area", this.description, 5);
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
        description: "Détruisez une carte bloquée ou 2 cartes alliées, puis cette carte",
        timing: "endOfRound",
        execute: async function (ctx) {
          const blockedCards = ctx.getBlockedBy(ctx.card.id);
          let selected: GameCard[] = [];
          if (!blockedCards || blockedCards.length === 0) {
            selected = await ctx.selectCardsFromZone((card) => !card.enemy[card.currentSide - 1], "Deck", this.description, 2);
          }
          else {
            const blockedIds = blockedCards.map((card) => card.id);
            selected = await ctx.selectCardsFromZone((card) => !card.enemy[card.currentSide - 1] && !blockedIds.includes(card.id), "Deck", this.description, 0, 2);
            if (selected.length !== 2) {
              while (selected.length !== 1) {
                selected = await ctx.selectCardsFromArray(ctx.getBlockedBy(ctx.card.id), "Deck", this.description, 1);
              }
              ctx.deleteCardInZone("Deck", selected[0].id);
              ctx.deleteCardInZone("Deck", ctx.card.id);
              return false;
            }
          }
          for (const card of selected) {
            ctx.deleteCardInZone("Deck", card.id);
          }
          ctx.deleteCardInZone("Deck", ctx.card.id);
          return false;
        }
      }
    ]
  },
  66: {
    1: [{ // Jeune Princesse
        description: "Défaussez 2 Personnes, SINON :(",
        timing: "endOfTurn",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Personne") && card.id !== ctx.card.id, "Play Area", this.description, 0, 2);
          if (selected.length !== 2) {
            ctx.card.currentSide = 2;
          }
          return false;
        }
      }],
      2: [{ // Princesse Pourrie Gâtée
        description: "Défaussez 2 cartes alliées",
        timing: "played",
        execute: async function (ctx) {
          const selected = await ctx.selectCardsFromZone((card) => !card.enemy[card.currentSide - 1], "Play Area", this.description, 2);
          for (const card of selected) {
            ctx.dropToDiscard({id: card.id, fromZone: "Play Area"});
          }
          return false;
        }
      }],
      3: [{ // Princesse Bien Elevée
        description: "Gagnez 1 ressource au choix",
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
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
        description: "Défaussez la carte du dessus de la pioche",
        timing: "played",
        execute: async function (ctx) {
          ctx.mill(1);
          return false;
        }
      }],
      3: [{ // Festin
        description: "Gagnez 1 ressource au choix",
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
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

  },
  69: {
    1: [{ // Touche Finale
        description: "Ajoutez 1 export et 5 fame à 1 carte en jeu",
        timing: "onClick",
        execute: async function (ctx) {
          const card = (await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 1))[0];
          if (card) {
            ctx.boostProductivity((c) => c.id === card.id, "Play Area", this.description, {export: 1, fame: 5});
            ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          }
          return false;
        }
      }],
      3: [{ // Festin
        description: "Gagnez 4 ressources au choix",
        timing: "onClick",
        execute: async function (ctx) {
          const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice3) {
            return false;
          }
          const choice4 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
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
      description: "Retirez 1 au coût d'amélioration d'une carte",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          "Play Area", 
          this.description, 
          1
        );
        
        if (cards.length === 0) {
          return false;
        }
        
        const selectedCard = cards[0];
        
        await new Promise<void>((resolve) => {
          ctx.selectUpgradeCost(selectedCard, (upgradeIndex, resourceKey) => {
            const upgrade = selectedCard.upgrades[selectedCard.currentSide - 1][upgradeIndex];
            if (upgrade.cost && upgrade.cost[resourceKey]) {
              upgrade.cost[resourceKey] = Math.max(0, upgrade.cost[resourceKey] - 1);
              
              if (upgrade.cost[resourceKey] === 0) {
                delete upgrade.cost[resourceKey];
              }
            }
            
            ctx.replaceCardInZone("Play Area", selectedCard.id, selectedCard);
            resolve();
          });
        });
        return true;
      }
    }],
    3: [{ // Inquisitrice
      description: "Détruisez une carte négative en jeu",
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.enemy[card.currentSide - 1], "Play Area", this.description, 0, 1);
        if (selected.length === 1) {
          ctx.deleteCardInZone("Play Area", selected[0].id);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
        return false;
      }
    }]
  },
  71: {
    2: [{ // Zone Rocheuse
      description: "Dépensez 1 gold pour obtenir 2 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          this.description,
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
      description: "Gagnez 3 wood, puis Front Down",
      timing: "onClick",
      execute: async function (ctx) {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      timing: "onClick",
      execute: async function (ctx) {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          this.description,
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
      description: "Reste en jeu",
      timing: "stayInPlay",
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
      description: "Découvriez un Pirate (76)",
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description,
          1
        );
        return false;
      }
    }],
  },
  75: {
    3: [{ // Route Commerciale
      description: "Découvriez un Pirate (76)",
      timing: "played",
      execute: async function (ctx) {
        await ctx.discoverCard(
          (card) => ([76].includes(card.id)),
          this.description,
          1
        );
        return false;
      }
    }],
  },
  76: {
    1: [
      { // Pirate
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function () {return false;}
      },
      {
        description: "Gagnez à chaque fois 1 gold de moins",
        timing: "onResourceGain",
        execute: async function (ctx) {
          if (ctx.resources.gold > 0) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1 }));
          }
        return false;
        }
      },
      {
        description: "Dépensez 2 military pour vaincre et découvrir un Lagon (77)",
        timing: "onClick",
        execute: async function (ctx) {
          if (ctx.resources.military >= 2) {
            if ((await ctx.discoverCard((card) => [77].includes(card.id), this.description, 1))) {
              ctx.setResources(prev => ({ ...prev, military: prev.military - 2}));
              ctx.deleteCardInZone("Play Area", ctx.card.id);
            }
          }
          return false;
        }
      },
    ],
    3: [{ // Précieux Allié
      description: "Découvrez la Chasse au Trésor (93)",
      timing: "onClick",
      execute: async function (ctx) {
        return (await ctx.discoverCard((card) => [93].includes(card.id), this.description, 1));
      }
    }],
  },
  77: {
    3: [{ // Précieux Allié
      description: "Jouez une carte Maritime depuis la défausse",
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Maritime"), "Discard", this.description, 1);
        if (selected.length !== 0) {
          ctx.dropToPlayArea({id: selected[0].id, fromZone: "Discard"});
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
      description: "Défaussez pour faire rester 1 Personne",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType().includes("Personne"), "Play Area", this.description, 0, 1);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Demeure
      description: "Défaussez pour faire rester 2 Personnes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id && card.GetType().includes("Personne"), "Play Area", this.description, 0, 2);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Palais
      description: "Défaussez pour faire rester 2 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 2);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    4: [{ // Manoir
      description: "Défaussez pour faire rester 1 carte",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 1);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
  },
  80: {
    1: [{ // Coopération
      description: "Défaussez 2 Personnes pour gagner 3 ressources",
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Personne"), "Play Area", this.description, 2);
        if (selected.length !== 2) {
          return false
        }
        const choice1 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice1) {
            return false;
          }
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if (!choice2) {
            return false;
          }
          const choice3 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice3) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            applyChoice(ctx, choice3);
            for (const card of selected) {
              ctx.dropToDiscard({id: card.id, fromZone: "Play Area"});
            }
            ctx.card.currentSide = 3;
            return true;
          }
        return false;
      }
    }],
    3: [
      { // Faveur
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Détruisez une carte négative en jeu",
        timing: "onClick",
        execute: async function (ctx) {
          const choice = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice) {
            applyChoice(ctx, choice);
            ctx.card.currentSide = 1;
            return true;
          }
        return false;
        }
      }
    ]
  },
  81: { // TODO : onPurge

  },
  82: {
    1: [{ // Autel
      description: "Défaussez pour faire rester 1 carte",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 1);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: "Défaussez pour faire rester 2 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 2);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: "Défaussez pour faire rester 4 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 4);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: "Défaussez pour faire rester 3 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 3);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
  },
  83: {
    1: [{ // Autel
      description: "Défaussez pour faire rester 1 carte",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 1);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    2: [{ // Sanctuaire
      description: "Défaussez pour faire rester 2 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 2);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    3: [{ // Temple
      description: "Défaussez pour faire rester 4 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 4);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
          return true;
        }
        return false;
      }
    }],
    4: [{ // Oratoir
      description: "Défaussez pour faire rester 3 cartes",
      timing: "endOfTurn",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.id !== ctx.card.id, "Play Area", this.description, 0, 3);
        ctx.setTemporaryCardListImmediate(selected);
        if (selected.length > 0) {
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
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Ajoutez 1 gold, 1 military et Chevalier à 1 Personne",
        timing: "endOfRound",
        execute: async function (ctx) {
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Personne"), "Deck", this.description, 1);
          const card = selected[0];
          await addResourceMapToCard(card, {gold: 1, military: 1});
          card.type[card.currentSide - 1] += " - Chevalier";
          ctx.card.currentSide = 3;
          return false;
        }
      }
    ],
    3: [
      { // Faveur
        description: "Reste en jeu",
        timing: "stayInPlay",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
        }
      },
      {
        description: "Ajoutez resources/wood / resources/stone et resources/ingot / resources/export à 1 Bâtiment",
        timing: "endOfRound",
        execute: async function (ctx) {
          let choice1;
          let choice2;
          let selected: GameCard[] = [];
          selected = await ctx.selectCardsFromZone((card) => card.GetType().includes("Bâtiment"), "Deck", this.description, 1);
          while (!choice1) {
            choice1 = await ctx.selectResourceChoice([  
              { wood: 1 },
              { stone: 1 },
            ]);
          }
          while (!choice2) {
            choice2 = await ctx.selectResourceChoice([  
              { ingot: 1 },
              { export: 1 },
            ]);
          }
          const card = selected[0];
          await addResourceMapToCard(card, choice1);
          await addResourceMapToCard(card, choice2);
          ctx.deleteCardInZone("Deck", ctx.card.id);
          return false;
        }
      }
    ]
  },
  107: {
    1: [{ // Visite Royale
      description: "Retirez 1 au coût d'amélioration d'une carte",
      timing: "onClick",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone(
          (card) => card.id !== ctx.card.id && card.GetUpgrades().length !== 0, 
          "Play Area", 
          this.description, 
          1
        );
        
        if (cards.length === 0) {
          return false;
        }
        
        const selectedCard = cards[0];
        
        await new Promise<void>((resolve) => {
          ctx.selectUpgradeCost(selectedCard, (upgradeIndex, resourceKey) => {
            const upgrade = selectedCard.upgrades[selectedCard.currentSide - 1][upgradeIndex];
            if (upgrade.cost && upgrade.cost[resourceKey]) {
              upgrade.cost[resourceKey] = Math.max(0, upgrade.cost[resourceKey] - 1);
              
              if (upgrade.cost[resourceKey] === 0) {
                delete upgrade.cost[resourceKey];
              }
            }
            
            ctx.replaceCardInZone("Play Area", selectedCard.id, selectedCard);
            resolve();
          });
        });
        return true;
      }
    }],
    3: [{ // Inquisitrice
      description: "Détruisez une carte négative en jeu",
      timing: "onClick",
      execute: async function (ctx) {
        const selected = await ctx.selectCardsFromZone((card) => card.enemy[card.currentSide - 1], "Play Area", this.description, 0, 1);
        if (selected.length === 1) {
          ctx.deleteCardInZone("Play Area", selected[0].id);
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
        return false;
      }
    }]
  },
  119: {
    1: [{ // Commerçante
      description: "Dépensez 1 gold pour obtenir 1 wood",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: "Dépensez 1 gold pour obtenir 1 wood ou 1 stone",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
        }
        return false;
      }
    }],
    4: [{ // Marché
      description: "Dépensez 1 gold pour obtenir 1 wood, 1 stone ou 1 ingot",
      timing: "onClick",
      execute: async function (ctx) {
        if (ctx.resources.gold >= 1) {
          const choice = await ctx.selectResourceChoice([
            { wood: 1 },
            { stone: 1 },
            { ingot: 1 }
          ]);
          if(choice) {
            ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1 }));
            applyChoice(ctx, choice);
            return true;
          }
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
      execute: async function(ctx)  {
        return 5 * (ctx.card.checkboxes[1].filter(cb => cb.checked).length);
      }
    },
    3: { // Inventrice Inspirée
      description: "Vaut 5 par check",
      execute: async function(ctx)  {
        return 5 * (ctx.card.checkboxes[1].filter(cb => cb.checked).length);
      }
    }
  },
  38: {
    1: { // L'Union fait la Force
      description: "Vaut 2 par Personne",
      execute: async function(ctx)  {
        return 2 * (ctx.fetchCardsInZone((c) => c.GetType().includes("Personne"), "Deck").length);
      }
    },
    3: { // Domination Militaire
      description: "Vaut 2 par production de military",
      execute: async function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, "Deck");

        const totalMilitary = cards.reduce((sum, card) => {
          const resourceMaps = card.GetResources() || [];

          const maxMilitary = resourceMaps.reduce(
            (max, res) => Math.max(max, res.military || 0),
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
      execute: async function(ctx)  {
        return Math.min(-2 * (70 - (ctx.fetchCardsInZone(() => (true), "Deck").length)), 0);
      }
    },
    3: { // Optimisation
      description: "Vaut -1 par carte sans fame",
      execute: async function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, "Deck");

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
      execute: async function(ctx)  {
        return (ctx.fetchCardsInZone((c) => c.GetType().includes("Ennemi"), "Deck").length === 0) ? 35 : 0;
      }
    },
    3: { // Commerce
      description: "Vaut 25 si vous produisez 8+ export",
      execute: async function(ctx)  {
        const cards = ctx.fetchCardsInZone(() => true, "Deck");

        const totalExport = cards.reduce((sum, card) => {
          const resourceMaps = card.GetResources() || [];

          const exportProduced = resourceMaps.reduce(
            (max, res) => Math.max(max, res.export || 0),
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
      execute: async function(ctx)  {
        return 2 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  91: {
    3: { // L'Arche
      description: "Vaut 1 par check",
      execute: async function(ctx)  {
        return (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  95: {
    1: { // Astronome
      description: "Vaut 2 par check",
      execute: async function(ctx)  {
        return 2 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  106: {
    3: { // Camelot
      description: "Vaut 5 par check",
      execute: async function(ctx)  {
        return 5 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  121: {
    3: { // Reine Jemimah
      description: "Vaut 3 par check",
      execute: async function(ctx)  {
        return 3 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  125: {
    3: { // Temple de la Lumière
      description: "Vaut 10 par check",
      execute: async function(ctx)  {
        return 3 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  128: {
    3: { // Site de Fouilles
      description: "Vaut 7 par check",
      execute: async function(ctx)  {
        return 7 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => cb.checked).length);
      }
    }
  },
  130: {
    3: { // Double Muraille
      description: "Vaut 4 par Muraille",
      execute: async function(ctx)  {
        return 4 * (ctx.fetchCardsInZone((c) => c.GetName().includes("Muraille"), "Deck").length);
      }
    }
  },
  134: {
    3: { // Rival Beau-Gosse
      description: "Vaut -5 par non-check",
      execute: async function(ctx)  {
        return -5 * (ctx.card.checkboxes[ctx.card.currentSide - 1].filter(cb => !cb.checked).length);
      }
    }
  },
  135: {
   1: { // Terres Frontalières
      description: "Vaut side 3",
      execute: async function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[3] || [];

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
      execute: async function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[3] || [];

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
      execute: async function(ctx)  {
        return [ctx.card].reduce((sum, card) => {
          const resourceMaps = card.resources[3] || [];

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
        const card = ctx.fetchCardsInZone((c) => c.GetName() === "Pont de Pierre", "Play Area")[0];
        if(card) {
          ctx.deleteCardInZone("Play Area", card.id);
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 1);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const people = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne") && c.id !== ctx.card.id, "Play Area", this.description, 2);
        if (people.length !== 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const lands = await ctx.selectCardsFromZone((c) => c.GetType().includes("Terrain"), "Play Area", this.description, 2);
        if (lands.length !== 2) {
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, 1));
        const buildings = await ctx.selectCardsFromZone((c) => c.GetType().includes("Bâtiment"), "Play Area", this.description, 2);
        const cards = [...people, ...lands, ...buildings];
        if(cards.length === 6) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne") && c.id !== ctx.card.id, "Play Area", this.description, 2);
        if(cards.length === 2) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "Défaussez 2 Maritimes",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Maritime") && c.id !== ctx.card.id, "Play Area", this.description, 2);
        if(cards.length === 2) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 1);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    2: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
          }
          return true;
        }
        return false;
      }
    },
    4: {
      description: "Défaussez 2 Personnes",
      execute: async function (ctx) {
        const cards = await ctx.selectCardsFromZone((c) => c.GetType().includes("Personne"), "Play Area", this.description, 2);
        if(cards.length !== 0) {
          for(const card of cards) {
            ctx.dropToDiscard({fromZone: "Play Area", id: card.id});
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
  const cardValues = cardSelectionValues[card.id]?.[card.currentSide];
  if (!cardValues) return 1;
  
  for (const [registeredType, value] of Object.entries(cardValues)) {
    if (searchType.includes(registeredType)) {
      return value;
    }
  }
  
  return 1;
}
