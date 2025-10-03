import { GameCard, type ResourceMap, type DropPayload, type EffectTiming, type Checkbox, RESOURCE_KEYS } from "./types";

export type GameContext = {
  card: GameCard;
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
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  mill: (nbCards: number) => void;
  openCheckboxPopup: (card: GameCard, requiredCount: number, optionalCount: number, callback: (selected: Checkbox[]) => void) => void ;
  selectResourceChoice: (options: Array<Partial<ResourceMap>>) => Promise<Partial<ResourceMap> | null>;
  selectCardsFromPlay: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  selectCardsFromDiscard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, effectDescription: string, requiredCount: number) => Promise<Boolean>;
  boostProductivity: (filter: (card: GameCard) => boolean, effectDescription: string, prodBoost: Partial<ResourceMap> | null) => Promise<Boolean>;
};

export type CardEffect = {
  description: string;
  timing: EffectTiming;
  execute: (context: GameContext) => boolean | Promise<boolean>;
  requiresChoice?: boolean;
  choices?: string[];
};


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

// Registry des effets par ID de carte et par side
export const cardEffectsRegistry: Record<number, Record<number, CardEffect[]>> = {
  1: {
    2: [{ // Plaines
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      timing: "onClick",
      execute: async function(ctx)  {
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
        const selectedCards = await ctx.selectCardsFromDiscard(
          (card) => (card.GetType().includes("Terrain")),
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
        const selectedCards = await ctx.selectCardsFromDiscard(
          () => (true),
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
        const selectedCards = await ctx.selectCardsFromDiscard(
          (card) => (card.GetType().includes("Terrain") || card.GetType().includes("Bâtiment")),
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (card.GetType().includes("Terrain")),
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
          selectedCards = await ctx.selectCardsFromPlay(filter, this.description, 1);
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (card.GetType().includes("Bâtiment")),
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
          selectedCards = await ctx.selectCardsFromPlay(filter, this.description, 1);
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
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (card.GetType().includes("Terrain")),
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
      timing: "onResourceGain",
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
      {
        description: "Défaussez la carte du dessus du deck",
        timing: "doesNothing",
        execute: async function (ctx) {
          if(ctx) {
            return false;
          }
          return true;
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
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), this.description, { gold: 1 }));
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), this.description, null));
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
            checkbox.checked ? militaryToPay+= 1 : militaryToPay += 0;
          }
          let allChecked = true;
          if (ctx.resources.military >= militaryToPay) {
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if (!checkbox.checked) {
                checkbox.checked = true;
                break;
              }
            }
            for (const checkbox of ctx.card.checkboxes[ctx.card.currentSide - 1]) {
              if(!checkbox.checked) {
                allChecked = false;
                break;
              }
            }
            if (allChecked) {
              ctx.card.currentSide = 3;
              await ctx.discoverCard(
                (card) => ([135].includes(card.id)),
                this.description,
                1
              )
            }
            ctx.effectEndTurn();
          }
          return false;
        }
      }],
    3: [{ // Grande Armée
        description: "End pour payer des military",
        timing: "onClick",
        execute: async function (ctx) {
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), this.description, { gold: 1 }));
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), this.description, null));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
  },
  26: {
    1: [{ // Terre Fertile/Efficacité
        description: "Ajoute 1 gold à 1 Terrain et boost 1 Bâtiment",
        timing: "onClick",
        execute: async function (ctx) {
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), this.description, { gold: 1 }));
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), this.description, null));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
          return false;
        }
      }],
  },
  27: {
    1: [{ // Terre Fertile/Efficacité
        description: "Ajoute 1 gold à 1 Terrain et boost 1 Bâtiment",
        timing: "onClick",
        execute: async function (ctx) {
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Terrain"), this.description, { gold: 1 }));
          while(!await ctx.boostProductivity((card: GameCard) => (card.GetType() === "Bâtiment"), this.description, null));
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
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