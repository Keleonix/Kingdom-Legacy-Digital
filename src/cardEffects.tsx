import { GameCard, type ResourceMap } from "./types";

export type GameContext = {
  card: GameCard;
  zone: string;
  setResources: React.Dispatch<React.SetStateAction<ResourceMap>>;
  draw: (n: number) => void;
  setDeck: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPlayArea: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setDiscard: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setPermanentZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  setBlockedZone: React.Dispatch<React.SetStateAction<GameCard[]>>;
  deleteCardInZone: (zone: string, id: number) => void;
  replaceCardInZone: (zone: string, id: number, newCard: GameCard) => void;
  // Ajoutez d'autres fonctions nécessaires
};

export type CardEffect = {
  name: string;
  description: string;
  execute: (context: GameContext) => void | Promise<void>;
  requiresChoice?: boolean;
  choices?: string[];
};

// Registry des effets par ID de carte et par side
export const cardEffectsRegistry: Record<number, Record<number, CardEffect[]>> = {
  // Carte 131 - Plaines du Nord
  131: {
    2: [{ // Side 2 - Douves
      name: "Défausser pour gagner militaire",
      description: "Défaussez une autre carte pour gagner 2 militaire",
      execute: async (ctx) => {
        // Ici vous pourriez ouvrir un modal pour choisir la carte
        // Pour l'instant, simulation simple
        if (confirm("Défausser une carte pour gagner 2 militaire?")) {
          ctx.setResources(prev => ({ ...prev, military: prev.military + 2 }));
          // Logique pour défausser une carte au choix
        }
      }
    }],
    4: [{ // Side 4 - Pont des Douves
      name: "Jouer Personne depuis défausse",
      description: "Dépensez 1 or pour jouer une Personne depuis la défausse",
      execute: async (ctx) => {
        if (ctx.setResources) {
          ctx.setResources(prev => {
            if (prev.gold < 1) {
              alert("Pas assez d'or!");
              return prev;
            }
            // Ouvrir modal pour choisir une Personne dans la défausse
            return { ...prev, gold: prev.gold - 1 };
          });
        }
      }
    }]
  },

  // Carte 133 - Raid
  133: {
    1: [{ // Raid
      name: "Gagner 1 ressource",
      description: "Gagnez 1 ressource au choix",
      requiresChoice: true,
      choices: ["gold", "wood", "stone", "military", "ingot", "export"],
      execute: (ctx) => {
        // Cette fonction sera appelée avec le choix
        // Vous devrez gérer le choix dans l'UI
        if (ctx) return;
      }
    }],
    2: [{ // Razzia
      name: "Gagner 2 ressources",
      description: "Gagnez 2 ressources au choix",
      requiresChoice: true,
      choices: ["gold", "wood", "stone", "military", "ingot", "export"],
      execute: (ctx) => {
        // Choisir 2 ressources
        if (ctx) return;
      }
    }],
    3: [{ // Saccage
      name: "Gagner 3 ressources",
      description: "Gagnez 3 ressources au choix",
      requiresChoice: true,
      choices: ["gold", "wood", "stone", "military", "ingot", "export"],
      execute: (ctx) => {
        // Choisir 3 ressources
        if (ctx) return;
      }
    }],
    4: [{ // Pillage
      name: "Gagner 2 ressources",
      description: "Gagnez 2 ressources au choix",
      requiresChoice: true,
      choices: ["gold", "wood", "stone", "military", "ingot", "export"],
      execute: (ctx) => {
        // Choisir 2 ressources
        if (ctx) return;
      }
    }]
  },

  // Carte 134 - Rival Beau-Gosse
  134: {
    3: [{ // Allié Noble
      name: "Copier production",
      description: "Choisissez une Personne en jeu et gagnez ses ressources",
      execute: async (ctx) => {
        // Ouvrir modal pour sélectionner une Personne en jeu
        // Copier ses ressources de production
        alert("Choisissez une Personne en jeu dans le modal qui s'ouvrira");
        if (ctx) return;
      }
    }]
  },

  // Carte 135 - Terres Frontalières
  135: {
    3: [{ // Etats Vassaux
      name: "Réinitialiser",
      description: "Réinitialisez cette carte (retour à Side 1)",
      execute: (ctx) => {
        ctx.card.currentSide = 1;
        if (ctx) return;
      }
    }]
  }
};

// Fonction helper pour récupérer les effets d'une carte
export function getCardEffects(cardId: number, side: number): CardEffect[] {
  return cardEffectsRegistry[cardId]?.[side] || [];
}