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
  selectCardsFromZone: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  selectCardsFromArray: (cards: GameCard[], zone: string, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number, zone?: string) => Promise<boolean>;
  boostProductivity: (filter: (card: GameCard) => boolean, zone: string, effectDescription: string, prodBoost: Partial<ResourceMap> | null) => Promise<boolean>;
  registerEndRoundEffect: (description: string, effect: () => Promise<void>, forceResolve?: boolean) => void;
  addCardEffect: (id: number, face: number, zone: string, effect: CardEffect, effectText: string) => void;
  fetchCardsInZone: (filter: (card: GameCard) => boolean, zone: string) => GameCard[];
  selectCardSides: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selectedSides: number[]) => void) => void;
};

export type CardEffect = {
  description: string;
  timing: EffectTiming;
  execute: (context: GameContext) => boolean | Promise<boolean>;
  requiresChoice?: boolean;
  choices?: string[];
  alreadyUsed?: boolean;
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
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice1 && choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, gold: prev.military - 1}));
            return true;
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
          const choice2 = await ctx.selectResourceChoice([
            { gold: 1 },  
            { wood: 1 },
            { stone: 1 },
            { military: 1 },
            { ingot: 1 },
            { export: 1 },
          ]);
          if(choice1 && choice2) {
            applyChoice(ctx, choice1);
            applyChoice(ctx, choice2);
            ctx.setResources(prev => ({ ...prev, gold: prev.military - 1}));
            return true;
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
          if (lastCheckbox?.checked) {
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
          if (lastCheckbox?.checked) {
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
          if(lastCheckbox?.checked) {
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
          if (lastCheckbox?.checked) {
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
        if ((await ctx.discoverCard((c) => c.id === (100 + cardsNames.indexOf(card.GetName())), this.description, 1)).valueOf()) {
          ctx.deleteCardInZone("Play Area", card.id);
          return true;
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
            addResourceMapToCard(ctx.card, { military: 1});
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
            addResourceMapToCard(ctx.card, { military: 1});
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
  38: { //TODO : Fame

  },
  39: { //TODO : Fame

  },
  40: { //TODO : Fame

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

          ctx.setTemporaryCardListImmediate
            ? ctx.setTemporaryCardListImmediate(selected)
            : ctx.setTemporaryCardList(selected);

          ctx.setPlayArea(prev => prev.filter(c => c.id !== ctx.card.id));

          return true;
        }
      },
    ]
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

// Fonction helper pour récupérer les effets d'une carte
export function getCardEffects(cardId: number, side: number, timing?: EffectTiming) {
  const effects = cardEffectsRegistry[cardId]?.[side] ?? [];
  return timing ? effects.filter(e => e.timing === timing) : effects;
}