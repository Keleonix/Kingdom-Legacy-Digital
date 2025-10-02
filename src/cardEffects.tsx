import { GameCard, type ResourceMap, type DropPayload } from "./types";

export type GameContext = {
  card: GameCard;
  zone: string;
  resources: ResourceMap;
  setResources: React.Dispatch<React.SetStateAction<ResourceMap>>;
  draw: (n: number) => void;
  dropToDiscard: (payload: DropPayload) => void;
  setDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPlayArea: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setDiscard: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPermanentZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  selectResourceChoice: (options: Array<Partial<ResourceMap>>) => Promise<Partial<ResourceMap> | null>;
  selectCardsFromPlay: (filter: (card: GameCard) => boolean, requiredCount: number) => Promise<GameCard[]>;
  discoverCard: (filter: (card: GameCard) => boolean, requiredCount: number) => Promise<Boolean>;
};

export type CardEffect = {
  description: string;
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

// Registry des effets par ID de carte et par side
export const cardEffectsRegistry: Record<number, Record<number, CardEffect[]>> = {
  1: {
    2: [{ // Plaines
      description: "Défaussez une autre carte alliée pour gagner 2 gold",
      execute: async (ctx) => {
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
      execute: async (ctx) => {
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
      execute: async (ctx) => {
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
          1
        );
        if (selectedCards.length > 0) {
          selectedCards.forEach(card => {
            ctx.dropToDiscard({id: card.id, fromZone: ctx.zone});
          });
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
      execute: async (ctx) => {
        const selectedCards = await ctx.selectCardsFromPlay(
          (card) => (!(card.enemy[card.currentSide - 1]) && card.id != ctx.card.id),
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
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
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
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
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
      execute: async(ctx) => {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
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
      execute: async(ctx) => {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
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
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Château
      description: "Jouez une carte depuis votre Défausse",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
    4: [{ // Donjon
      description: "Jouez un Terrain ou un Bâtiment depuis votre Défausse",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  19: {
    1: [{ // Forêt
      description: "Gagnez 3 wood, puis Front Down",
      execute: async(ctx) => {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  10: {
    1: [{ // Commerçante
      description: "Dépensez 1 gold pour obtenir 1 wood",
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: "Dépensez 1 gold pour obtenir 1 wood ou 1 stone",
      execute: async(ctx) => {
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
      execute: async(ctx) => {
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
  15: {
    2: [{ // Zone Rocheuse
      description: "Dépensez 1 gold pour obtenir 2 stone",
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  35: {
    2: [{ // Zone Rocheuse
      description: "Dépensez 1 gold pour obtenir 2 stone",
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
          1
        )) {
          ctx.deleteCardInZone(ctx.zone, ctx.card.id);
        }
        return false;
      }
    }],
  },
  71: {
    2: [{ // Zone Rocheuse
      description: "Dépensez 1 gold pour obtenir 2 stone",
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, stone: prev.stone + 2 }));
          return true;
        }
        return false;
      }
    }],
    3: [{ // Mine Profonde
      description: "Détruisez pour découvrir 84/85",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([84, 85].includes(card.id)),
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
      execute: async(ctx) => {
        ctx.setResources(prev => ({ ...prev, wood: prev.wood + 3 }));
        ctx.card.currentSide = 2;
        return true;
      }
    }],
    3: [{ // Puit Sacré
      description: "Détruisez pour découvrir 82/83",
      execute: async(ctx) => {
        if (await ctx.discoverCard(
          (card) => ([82, 83].includes(card.id)),
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
      execute: async(ctx) => {
        if (ctx.resources.gold >= 1) {
          ctx.setResources(prev => ({ ...prev, gold: prev.gold - 1, wood: prev.wood + 1 }));
          return true;
        }
        return false;
      }
    }],
    2: [{ // Bazar
      description: "Dépensez 1 gold pour obtenir 1 wood ou 1 stone",
      execute: async(ctx) => {
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
      execute: async(ctx) => {
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
export function getCardEffects(cardId: number, side: number): CardEffect[] {
  return cardEffectsRegistry[cardId]?.[side] || [];
}