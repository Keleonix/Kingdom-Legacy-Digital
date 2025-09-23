import { emptyResource, type GameCard, type ResourceMap, type Upgrade } from "./types";

export const allCards: GameCard[] = [
  {
    id: 1,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte pour gagner resources/gold resources/gold .",
      "effects/passif Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: 2,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte pour gagner resources/gold resources/gold .",
      "effects/passif Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 3,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte pour gagner resources/gold resources/gold .",
      "effects/passif Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 4,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte pour gagner resources/gold resources/gold .",
      "effects/passif Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 5,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/gold pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 6,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/gold pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 7,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      "",
      "effects/destroy Découvrez un Autel (82/83).",
      "",
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { gold: 1 }, nextSide: 1 }, { cost: { gold: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 8,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      "",
      "effects/destroy Découvrez un Autel (82/83).",
      "",
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { gold: 2 }, nextSide: 1 }, { cost: { gold: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 9,
    name: ["Quartier Général", "Hôtel de Ville", "Château", "Donjon"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 12 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 7 }
      ],
    ],
    effects: [
      "",
      "effects/activate Jouez un Terrain depuis votre défausse.",
      "effects/activate Jouez une carte depuis votre défausse.",
      "effects/activate Jouez un Terrain ou Bâtiment depuis votre défausse.",
    ],
    upgrades: [
      [{ cost: { stone: 3, wood: 1 }, nextSide: 2 }],
      [{ cost: { stone: 4, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 6, wood: 2, ingot: 1 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 10,
    name: ["Commerçante", "Bazar", "Festival", "Marché"],
    resources: [
      [{ ...emptyResource }],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 4 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold pour gagner resources/wood .",
      "effects/activate Dépensez resources/gold pour gagner resources/wood / resources/stone .",
      "",
      "effects/activate Dépensez resources/gold pour gagner resources/wood / resources/stone / resources/ingot .",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 5 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Bâtiment", "Evénement", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 11,
    name: ["Jungle", "Arbres Géants", "Cabanes dans les Arbres", "Jungle Profonde"],
    resources: [
      [{ ...emptyResource }],
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 }
      ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold pour gagner resources/wood .",
      "effects/activate Dépensez resources/gold pour gagner resources/wood resources/wood .",
      "effects/passif Reste en jeu.",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 12,
    name: ["Rivière", "Pont", "Explorateurs", "Pont de Pierre"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 }
      ],
    ],
    effects: [
      " ",
      "",
      "effects/activate Découvrez un nouveau territoire (71/72/73/74). Puis -> Back Down.",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Personne", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 13,
    name: ["Exploitant", "", "Domestique", ""],
    resources: [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "(Choisissez le côté quand la carte est ajoutée). effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      "",
      "effects/activate Gagnez resources/gold / resources/wood / resources/stone .",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 14,
    name: ["Bandit", "", "Travailleur", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "effects/mandatory Carte Jouée : bloque 1 carte avec production d' resources/gold . effects/activate Dépensez resources/military pour vaincre ( effects/destroy ) et gagner 2 ressources au choix. (Peut être retournée par un Missionaire)",
      "",
      "effects/activate Choisissez un Bâtiment en jeu. Gagnez les ressources qui correspondent à sa production.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 15,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/gold pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 16,
    name: ["Bandit", "", "Exploitant", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "effects/mandatory Carte Jouée : bloque 1 carte avec production d' resources/gold . effects/activate Dépensez resources/military pour vaincre ( effects/destroy ) et gagner 2 ressources au choix. (Peut être retournée par un Missionaire)",
      "",
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 17,
    name: ["Colline", "Chappelle", "Cathédrale", "Eglise"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 7 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "effects/activate Dépensez  resources/gold resources/gold pour découvrir un Missionaire (103).",
      "effects/passif Cette carte produit+1 resources/gold pour chaque Personne en jeu.",
      "effects/activate Dépensez  resources/gold resources/gold pour découvrir un Prêtre (104).",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1, stone: 1 }, nextSide: 2 }],
      [{ cost: { wood: 2, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { ingot: 1, wood: 2, stone: 3 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 18,
    name: ["Falaise de l'Est", "Forge", "Muraille", "Armurerie"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 4 } ],
    ],
    effects: [
      "",
      "effects/activate Réinitialisez pour découvrir des Bijoux (90).",
      "effects/passif Reste en jeu.",
      "effects/activate Gagnez resources/military pour chaque personne en jeu.",
    ],
    upgrades: [
      [{ cost: { stone: 1, wood: 1, ingot: 2 }, nextSide: 2 },
        { cost: { stone: 3 }, nextSide: 4 }
      ],
      [{ cost: { gold: 2, ingot: 2 }, nextSide: 3 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 19,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      "",
      "effects/destroy Découvrez un Autel (82/83).",
      "",
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { gold: 1 }, nextSide: 1 }, { cost: { gold: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 20,
    name: ["Marais", "Marais Aménagés", "Arbres à Fruits Exotiques", "Jardin du Marais"],
    resources: [
      [{ ...emptyResource }],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 4 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 21,
    name: ["Marais", "Marais Aménagés", "Arbres à Fruits Exotiques", "Jardin du Marais"],
    resources: [
      [{ ...emptyResource }],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 4 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 22,
    name: ["Lac", "Chalet du Pêcheur", "Phare", "Bateau de Pêche"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 1 } ],
    ],
    effects: [
      "",
      "",
      "effects/passif Reste en jeu. effects/passif Défaussez la carte du sommet de votre pioche.",
      "effects/activate Découvrez les Rivages (75).",
    ],
    upgrades: [
      [{ cost: { stone: 2, wood: 1 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { wood: 3 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Maritime"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 23,
    name: ["STOP !", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Découvrez les cartes 24 à 27.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 24,
    name: ["Terre Fertile/Efficacité", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Ajoutez 1 resources/gold à la production d'un terrain. Puis choisissez un Bâtiment et rajoutez 1 à une ressource qu'il produit déjà.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 25,
    name: ["Armée", "", "Grande Armée", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 50 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end dépensez les resources/military (1 à 10, incrément de 1) pour cocher la case de gauche à droite. A la dernière carte, Face UP et découvrez l'Etat Vassal (135).",
      "",
      "effects/end dépensez les resources/military (10, 10, 12, 12, 15) pour cocher la case de gauche à droite.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "Parchemin", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x4", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x19", checked: false},
        {content: "fame x25", checked: false},
        {content: "fame x32", checked: false},
        {content: "fame x40", checked: false},
        {content: "(135) ->", checked: false}
      ],
      [],
      [
        {content: "fame x10", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x40", checked: false},
        {content: "fame x50", checked: false}
      ],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 26,
    name: ["Trésor", "", "Immense Trésor", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 50 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end dépensez les resources/gold (1 à 12, incrément de 1) pour cocher la case de gauche à droite. A la dernière carte, Back Up.",
      "",
      "effects/end dépensez les resources/gold (13 à 17, incrément de 1) pour cocher la case de gauche à droite.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "Parchemin", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x2", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x5", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x19", checked: false},
        {content: "fame x25", checked: false},
        {content: "fame x32", checked: false},
        {content: "fame x40", checked: false},
        {content: "->", checked: false},
      ],
      [],
      [
        {content: "fame x10", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x40", checked: false},
        {content: "fame x50", checked: false}
      ],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 27,
    name: ["Exportations", "", "Exportations de Masse", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 25 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif dépensez des resources/export . 10: Ajoutez resources/gold / resources/wood / resources/stone sur un Terrain. 20: Un Personnage gagne \" effects/passif Reste en jeu.\". 30 Découvrez Adoubement (80). 40: Ajoutez resources/ingot / resources/military / resources/export sur 1 Bâtiment. 55: Ajoutez resources/wood / resources/stone / resources/ingot / resources/military sur une carte. 75: Ajoutez resources/fame x5 sur une carte. 100: Face Up.",
      "",
      "effects/passif dépensez des resources/export . 25: Ajoutez resources/fame sur deux Terrains. 50: Ajoutez resources/fame x5 sur une Personne. 75: Découvrez Visite Royale (107). 100: Ajoutez resources/fame x5 sur un Bâtiment. 150: effects/check une autre carte Permanente. 200: effects/check toutes les autres cartes Permanentes au choix. 250: Découvrez Relations Commerciales (117).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "Parchemin", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [
        { content: "10", checked: false },
        { content: "20", checked: false },
        { content: "30", checked: false },
        { content: "40", checked: false },
        { content: "55", checked: false },
        { content: "75", checked: false },
        { content: "100", checked: false }
      ],
      [],
      [
        { content: "25", checked: false },
        { content: "50", checked: false },
        { content: "75", checked: false },
        { content: "100", checked: false },
        { content: "150", checked: false },
        { content: "200", checked: false },
        { content: "250", checked: false }
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 28,
    name: ["Eruption Volcanique", "", "Terres Brulées", "Jeune Forêt"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      "effects/mandatory Tant qu'elle est en jeu, détruisez le prochain Terrain que vous jouez. Lorsque vous le faite, Back Up.",
      "",
      "",
      "effects/end Ajoutez 1 effects/check dans l'ordre. *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {gold: 2}, nextSide: 4} ],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Terrain", "Terrain"],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: "", checked: false},
        {content: "*", checked: false},
        {content: "", checked: false},
        {content: "*", checked: false},
      ],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 29,
    name: ["Opportuniste", "Recrue", "Artisan", "Prétendu Noble"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 } ],
    ],
    effects: [
      "",
      "",
      "",
      "effects/activate Réinitialisez pour ajouter une resource de votre choix à la production de l'une des étapes de cette carte qui ne comporte pas encore de modification.",
    ],
    upgrades: [
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
   {
    id: 30,
    name: ["STOP !", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Découvrez les cartes 31 à 34, choisissez-en 2 à découvrir et détruisez les 2 autres.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 31,
    name: ["Entrepreneur", "Hôtel", "Taverne", "Bar Confortable"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 2 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 4 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 2 } ],
    ],
    effects: [
      "effects/end Découvrez l'Ecole (118).",
      "effects/activate Gagnez resources/gold par Personne en jeu.",
      "effects/activate Défaussez une Personne pour découvrir un Etranger (92).",
      "effects/activate Découvrez les Quêtes (87).",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 3 }],
      [{ cost: { gold: 1, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, export: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 32,
    name: ["Scientifique", "", "Observatoire", "Laboratoire"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 5 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 10 } ],
    ],
    effects: [
      "effects/passif Toutes les Personnes, Scientifique inclus, produisent +1 resources/gold .",
      "",
      "effects/end Découvrez l'Astronome (95).",
      "effects/end Découvrez l'Alchimiste (96).",
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, ingot: 1 }, nextSide: 3 }],
      [],
      [{ cost: { gold: 1, stone: 2, ingot: 2 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 33,
    name: ["Ingénieur", "", "Trébuchet", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 1 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Détruisez l'une des cartes suivantes: Cabane de Bûcheron - découvrez (100). Grange - découvrez (101). Bâteau de pêche - découvrez (102).",
      "",
      "effects/destroy Vainquez un ennemi (défausse, en jeu ou permanent). Puis marquez effects/check la case suivante de la carte Armée.",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, ingot: 1 }, nextSide: 3 }],
      [],
      [{ cost: { gold: 1, stone: 2, ingot: 2 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Bâtiment", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 34,
    name: ["Inventrice", "", "Inventrice Inspirée", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Vaut 5 resources/fame par effects/check .",
      "",
      "effects/activate réinitialisez et ajoutez 1 effects/check . Découvrez une invention (97/98/99) ou gagnez une ressource de votre choix pour chaque effects/check . Vaut 5 resources/fame par effects/check .",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 4 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false}
      ],
      [],
      [],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 35,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/gold pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 36,
    name: ["Mercenaire", "", "Sir __", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour ajouter 1 ou deux effects/check .",
      "",
      "effects/end Dépensez resources/ingot resources/ingot resources/ingot pour ajouter resources/military sur cette carte ( effects/single ). effects/end Dépensez resources/ingot resources/ingot resources/ingot resources/ingot pour ajouter resources/military sur cette carte ( effects/single ). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 3, ingot: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false}
      ],
      [],
      [],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 37,
    name: ["STOP !", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Découvrez les cartes 38 à 42. Choisissez le côté des cartes Objectif.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 38,
    name: ["L'Union fait la Force", "", "Domination Militaire", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Vaut 2 resources/fame par Personne.",
      "",
      "Vaut 2 resources/fame par production de resources/military .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Objectif", "", "Objectif", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 39,
    name: ["Elargir les frontières", "", "Optimisation", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Votre royaume doit comprendre 70 cartes ou plus (hors permanentes). Cette carte vaut -2 resources/fame pour chaque carte manquante.",
      "",
      "Vaut -1 resources/fame par carte valant 0 resources/fame (hors permanentes).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Objectif", "", "Objectif", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 40,
    name: ["Loyauté", "", "Commerce", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Vaut 35 resources/fame s'il n'y a plus d'ennemi dans votre royaume.",
      "",
      "Vaut 25 resources/fame si votre production de resources/export est de 8 ou plus.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Objectif", "", "Objectif", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 41,
    name: ["Bouffon", "", "Marchande", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif Reste en jeu. effects/activate Défaussez la carte au sommet de votre pioche. effects/activate Ajoutez 1 effects/check .",
      "",
      "effects/activate Ajoutez 1 à 2 effects/check .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [
        {content: "gold, gold", checked: false},
        {content: "gold, gold", checked: false},
        {content: "gold, gold", checked: false},
        {content: "gold, wood", checked: false},
        {content: "gold, wood", checked: false},
        {content: "gold, wood", checked: false},
        {content: "export, export", checked: false},
        {content: "export, export", checked: false}
      ],
      [],
      [
        {content: "gold", checked: false},
        {content: "gold", checked: false},
        {content: "gold", checked: false},
        {content: "gold", checked: false},
        {content: "gold", checked: false},
        {content: "gold", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "wood", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "stone", checked: false},
        {content: "ingot", checked: false},
        {content: "ingot", checked: false},
        {content: "ingot", checked: false},
        {content: "ingot", checked: false},
        {content: "ingot", checked: false},
        {content: "ingot", checked: false}
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 42,
    name: ["Exploitant", "", "Grenier", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "(Choisissez le côté quand la carte est ajoutée). effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      "",
      "effects/passif Reste en jeu. effects/may Fin du Tour: Défaussez pour qu'une autre carte reste en jeu.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Bâtiment", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 43,
    name: ["Maçon", "", "Route Pavée", "Rue Pavée"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 7 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour découvrir un projet de bâtiment (88/89).",
      "",
      "effects/end Inspectez les cartes (109) et (110). Détruisez l'une et découvrez l'autre.",
      "effects/end Inspectez les cartes (111) et (112). Détruisez l'une et découvrez l'autre.",
    ],
    upgrades: [
      [{ cost: { gold: 1, stone: 2 }, nextSide: 3 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 44,
    name: ["Orage", "", "Pluie", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Carte jouée: défaussez les 3 premières cartes de votre pioche, puis -> (Back Up).",
      "",
      "effects/passif La production des Terrains est doublée. effects/passif Vous ne pouvez jouer aucune carte. effects/mandatory Fin du Tour: -> (Front Up).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 45,
    name: ["Chevalier Noir", "", "Garçon Admiratif", "Ecuyer"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -3 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "effects/passif Vous ne pouvez ni jouer, ni améliorer, de cartes, ni même utiliser les effets effects/end . effects/activate Dépensez resources/military resources/military resources/military pour vaincre (-> Back Up).",
      "",
      "effects/destroy Gagnez resources/military resources/military .",
      "effects/destroy Gagnez resources/military resources/military resources/military .",
    ],
    upgrades: [
      [],
      [],
      [{ cost: { ingot: 1, military: 1 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 46,
    name: ["Camp", "Camp d'Entrainement", "", "Sir __"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 3 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "",
      "effects/activate Dépensez resources/gold pour gagner resources/military .",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1, ingot: 1 }, nextSide: 2 }],
      [{ cost: { ingot: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "", "Personne - Chevalier"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 47,
    name: ["STOP !", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Découvrez les cartes 48 à 51. Découvrez-en 2 et détruisez les 2 autres.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 48,
    name: ["Envoyé", "Emissaire", "Ambassadeur", "Diplomate"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
    ],
    effects: [
      "effects/end Dépensez resources/gold resources/gold resources/gold pour découvrir une Commerçante (119).",
      "effects/end Dépensez resources/gold resources/gold resources/gold pour découvrir un Investisseur (120).",
      "effects/end Dépensez resources/gold resources/gold resources/gold pour découvrir le Consort (122).",
      "effects/end Dépensez resources/gold resources/gold resources/gold pour découvrir une allié (121).",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 6 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 6 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 49,
    name: ["Architecte Royal", "", "Pont des Merveilles", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "(Améliorer: Détruisez Pont (Back Up) -> Back Up) effects/activate Détruisez l'une des cartes suivantes: Quartier Général (Back Up) - découvrez (123). Mine (Back Up) - découvrez (124). Autel (Back Up) - découvrez (125). ",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Bâtiment", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 50,
    name: ["Voyageur", "Voyageur", "Voyageur", "Voyageur"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end Découvrez un Terrain (126).",
      "effects/end Découvrez un Terrain (127).",
      "effects/end Découvrez un Terrain (129). effects/activate Défaussez un Terrain pour gagner 2 ressources au choix.",
      "effects/end Découvrez un Terrain (128).",
    ],
    upgrades: [
      [{ cost: { export: 3 }, nextSide: 2 }],
      [{ cost: { export: 3 }, nextSide: 4 }],
      [],
      [{ cost: { export: 5 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 51,
    name: ["Magistrat", "Magistrat", "Magistrat", "Stratège"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
    ],
    effects: [
      "effects/end Découvrez une Frontière (130).",
      "effects/end Découvrez une Frontière (131).",
      "effects/activate Jouez une Muraille ou un Chevalier depuis la défausse.",
      "effects/end Découvrez une Frontière (132).",
    ],
    upgrades: [
      [{ cost: { stone: 3 }, nextSide: 2 }],
      [{ cost: { stone: 2, ingot: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 3, ingot: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 52,
    name: ["Grosse Butte", "Hameau sur la Colline", "Village Culminant", "Village"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 6 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
    ],
    effects: [
      "",
      "",
      "effects/activate Réinitialisez pour découvrir un Village (105). (D'autre cartes peuvent découvrir le Village)",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 53,
    name: ["Sorcière", "", "Hutte de la Sorcière", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -3 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ). effects/activate Défaussez 3 Personnes pour -> (Back Up). effects/mandatory Fin du tour: Découvrez les 2 prochaines cartes de la boîte, puis -> (Back Up).",
      "",
      "effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ). Dépensez Détruisez une Personne pour effects/destroy . effects/mandatory Fin du Tour: Découvre les 2 prochaines cartes de la boîte, puis effects/destroy .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Ennemi", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 54,
    name: ["Scribe", "", "Architecte", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Fin du tour: Défaussez pour que 1 ou 2 autres cartes restent en jeu.",
      "",
      "effects/end Réinitialisez pour découvrir un projet de construction (78/79).",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 5 }, nextSide: 2 }],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 55,
    name: ["Lord Aethan", "", "Lord Nimrod", ""],
    resources: [
      [ { gold: 1, wood: 1, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Découvrez la Coopération (80) ou le Domaine (81). effects/passif Ajoutez 1 effects/check .",
      "",
      "effects/end Découvrez un Raid (133) et un Rival (134). effects/activate Ajoutez 1 effects/check .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [
        {content: "gold, gold", checked: false},
        {content: "gold, gold", checked: false},
        {content: "wood, wood", checked: false},
        {content: "wood, wood", checked: false},
        {content: "stone, stone", checked: false},
        {content: "export", checked: false},
        {content: "military", checked: false},
        {content: "ingot", checked: false},
      ],
      [],
      [
        {content: "gold, gold", checked: false},
        {content: "stone, stone", checked: false},
        {content: "ingot, ingot", checked: false},
        {content: "military, military", checked: false},
        {content: "military, military", checked: false},
        {content: "military, military, military", checked: false},
        {content: "wood", checked: false},
        {content: "ingot", checked: false},
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 56,
    name: ["Peste", "", "Soldat Ennemi", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif Reste en jeu. effects/mandatory Fin de Manche: Détruisez 2 Personnes de votre royaume. Puis -> (Back Front).",
      "",
      "effects/mandatory Carte Jouée: bloque 1 Bâtiment/Terrain en jeu. effects/passif: Reste en jeu. effects/mandatory Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Ennemi", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 57,
    name: ["Assassin", "", "Soldat Ennemi", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Détruisez la prochaine Personne que vous jouez. Lorsque vous le faites, -> (Back Front). effects/activate Dépensez resources/military resources/military resources/military pour vaincre (-> Back Up).",
      "",
      "effects/mandatory Carte Jouée: bloque 1 Bâtiment/Terrain en jeu. effects/passif: Reste en jeu. effects/mandatory Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Ennemi", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 58,
    name: ["Ville en Flamme", "", "Terre Brûlée", "Jeune Forêt"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      "effects/passif Reste en jeu. effects/mandatory Fin de Manche: Détruisez 1 Bâtiment de votre royaume. Puis -> (Back Up).",
      "",
      "",
      "effects/end Ajoutez 1 effects/check dans l'ordre. *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {gold: 2}, nextSide: 4} ],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Terrain", "Terrain"],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: "", checked: false},
        {content: "*", checked: false},
        {content: "", checked: false},
        {content: "*", checked: false},
      ],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 59,
    name: ["Grotte Mystérieuse", "Souterrains", "Trésor", "Civilisation Oubliée"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 8 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
    ],
    effects: [
      "Améliorer: Défausser 1 Personne (Front Down).",
      "Améliorer: Défausser 2 Personne (Back Down).",
      "effects/passif Reste en jeu. ",
      "effects/activate Défaussez 6 cartes alliées pour découvrir un Artefact (108).",
    ],
    upgrades: [
      [],
      [],
      [],
      [{ cost: { gold: 1, ingot: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 60,
    name: ["Bandit d'Elite", "", "Travailleur", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -5 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ) et gagner 3 ressources au choix. (Peut être -> (Front Up) par un Missionaire)",
      "",
      "effects/activate Choisissez un Bâtiment en jeu. Gagnez les ressources qui correspondent à sa production. ",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 61,
    name: ["Prince des Ténèbres", "", "Garçon Admiratif", "Ecuyer"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -7 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "effects/passif Vous ne pouvez ni jouer, ni améliorer de cartes, ni utiliser effects/end . effects/activate Dépensez resources/military resources/military resources/military resources/military resources/military pour vaincre (-> Back Up).",
      "",
      "effects/destroy Gagnez resources/military resources/military .",
      "effects/destroy Gagnez resources/military resources/military resources/military .",
    ],
    upgrades: [
      [],
      [],
      [{ cost: { ingot: 1, military: 1 }, nextSide: 4 }],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 62,
    name: ["Camp", "Camp d'entrainement", "Sir __", ""],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 3 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "",
      "effects/activate Dépensez resources/gold pour gagner resources/military .",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1, ingot: 1 }, nextSide: 2 }],
      [{ cost: { ingot: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "", "Personne - Chevalier"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 63,
    name: ["Terres Lointaines", "Auberge", "Muraille", "Aubergiste"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
    ],
    effects: [
      " ",
      "",
      "effects/passif Reste en jeu. ",
      "effects/activate Défaussez une autre Personne pour gagner 2 ressources de votre choix.",
    ],
    upgrades: [
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { gold: 6 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Personne"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 64,
    name: ["Bandit d'Elite", "", "Exploitant", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -5 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ) et gagner 3 ressources au choix. (Peut être -> (Front Up) par un Missionaire)",
      "",
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production. ",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 65,
    name: ["Tornade", "", "Innodations", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif Reste en jeu. effects/mandatory Fin de Manche: Détruisez 3 cartez alliées du royaume. Puis -> (Back Up).",
      "",
      "effects/passif Reste en jeu. effects/mandatory Bloque tous les Bâtiments (max 5). effects/mandatory Fin de Manche: Détruisez cette carte et 1 Bâtiment bloqué ou 2 autres cartes alliées.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 66,
    name: ["Jeune Princesse", "Princesse Pourrie Gâtée", "Princesse Bien Elevée", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 8 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Améliorer: Défaussez 2 Personnes, 2 Terrains et 2 Bâtiments -> (Back Up). effects/mandatory Fin du Tour: Défaussez 2 Personnes ou Front Down.",
      "Améliorer: Défaussez 2 Personnes -> (Front Up). effects/mandatory Carte Jouée: Défaussez 2 cartes alliées en jeu.",
      "effects/activate Gagnez 1 ressource de votre choix.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne - Dame", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 67,
    name: ["Maladie", "Diminué", "Festin", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -8 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Carte Jouée: Défaussez la prochaine carte de votre pioche.",
      "Cette carte est Permanente.",
      "effects/activate Gagnez 1 ressource de votre choix.",
      "",
    ],
    upgrades: [
      [
        {cost: {export: 6}, nextSide: 3},
        {cost: {gold: 1}, nextSide: 2}
      ],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "Personne", "Personne - Dame", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 68,
    name: ["STOP !", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Découvrez les cartes 69 et 70. A la fin de la manche comptez votre resources/fame (Fin du jeu).",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 69,
    name: ["Touche Finale", "", "Banquet", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/destroy Ajoutez resources/export et resources/fame x5 à une carte en jeu.",
      "",
      "effects/destroy Gagnez 4 ressources au choix.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 70,
    name: ["Visite Royale", "", "Inquisitrice", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Barrez 1 icône de ressource dans le coût d'amélioration d'une carte en jeu.",
      "",
      "effects/destroy Détruisez une carte négative en jeu.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 71,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/gold pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 72,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      "",
      "effects/destroy Découvrez un Autel (82/83).",
      "",
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { gold: 1 }, nextSide: 1 }, { cost: { gold: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 73,
    name: ["Canyon de l'Ouest", "Mineurs", "Muraille", "Travaux Forcés"],
    resources: [
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 0 }
      ],
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 2, military: 0, ingot: 2, export: 0, fame: -3 } ],
    ],
    effects: [
      "",
      "Peut compter comme 2 Personnes.",
      "effects/passif Reste en jeu.",
      "",
    ],
    upgrades: [
      [
        { cost: { stone: 3 }, nextSide: 3 },
        { cost: { stone: 1, ingot: 1, gold: 1, wood: 1 }, nextSide: 2 }
      ],
      [{ cost: { military: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Personne", "Bâtiment", "Evénement"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 74,
    name: ["Littoral", "Chantiers Navals", "Route Commerciale", "Navire Marchand"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 13 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 6 }
      ],
    ],
    effects: [
      "",
      "",
      "effects/mandatory Carte Jouée: Découvrez le Pirate (76).",
      "Améliorer: Nécessite 2 Personnes",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood : 2}, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Maritime - Navire", "Maritime - Navire"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 75,
    name: ["Littoral", "Chantiers Navals", "Route Commerciale", "Navire Marchand"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 13 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 6 }
      ],
    ],
    effects: [
      "",
      "",
      "effects/mandatory Carte Jouée: Découvrez le Pirate (76).",
      "Améliorer: Nécessite 2 Personnes",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood : 2}, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Maritime - Navire", "Maritime - Navire"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 76,
    name: ["Pirate", "", "Précieux Allié", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [{ ...emptyResource } ],
    ],
    effects: [
      "effects/passif Reste en jeux. effects/passif Lorsque vous gagnez des resources/gold , gagnez 1 resources/gold de moins. effects/Activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ) puis découvrez le Lagon (77).",
      "",
      "effects/activate Découvrez la Chasse au Trésor (93).",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 4, ingot: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Personne - Maritime", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 77,
    name: ["Lagon", "Canoë", "Île Luxuriante", "Porte Maritime Fortifiée"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
    ],
    effects: [
      "",
      "",
      "effects/activate Jouez une carte Maritime depuis la défausse.",
      "",
    ],
    upgrades: [
      [
        { cost: { stone: 3, export: 1 }, nextSide: 2 },
        { cost: { wood: 3 }, nextSide: 3 }
      ],
      [ {cost: {}, nextSide: 4} ],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Maritime", "Bâtiment", "Terrain - Maritime"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 78,
    name: ["Statue", "Monument", "Colonne Dorée", "Obélisque"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 10 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [ { cost: { stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 6 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 79,
    name: ["Villa", "Monument", "Colonne Dorée", "Obélisque"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 12 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 7 } ],
    ],
    effects: [
      "effects/may Fin du Tour: Défaussez pour que 1 Personne reste en jeu.",
      "effects/may Fin du Tour: Défaussez pour que 2 Personne restent en jeu.",
      "effects/may Fin du Tour: Défaussez pour que 2 cartes restent en jeu.",
      "effects/may Fin du Tour: Défaussez pour que 1 carte reste en jeu.",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 4, stone: 2 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 80,
    name: ["Coopération", "", "Faveur", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Défaussez 2 Personnes pour gagner 3 ressources au choix puis -> Back Up.",
      "",
      "effects/passif Reste en jeu. effects/activate Gagnez une ressource au choix, puis -> Front Up.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 81,
    name: ["Domaine Aethien", "Domaine Aethien", "Domaine Aethien", "Domaine Aethien"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 10 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 6 } ],
    ],
    effects: [
      "",
      "effects/passif Lorsque vous purgez cette carte, vous pouvez annuler la purge d'1 autre carte.",
      "effects/passif Lorsque vous purgez cette carte, vous pouvez annuler la purge d'3 autre carte.",
      "effects/passif Lorsque vous purgez cette carte, vous pouvez annuler la purge d'2 autre carte.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 82,
    name: ["Autel", "Sanctuaire", "Temple", "Oratoire"],
    resources: [
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 9 }
      ],
    ],
    effects: [
      "effects/may Fin du Tour : Défaussez pour que 1 autre carte reste en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 2 autres cartes restent en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 4 autres cartes restent en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 3 autres cartes restent en jeu.",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 83,
    name: ["Autel", "Sanctuaire", "Temple", "Oratoire"],
    resources: [
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 9 }
      ],
    ],
    effects: [
      "effects/may Fin du Tour : Défaussez pour que 1 autre carte reste en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 2 autres cartes restent en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 4 autres cartes restent en jeu.",
      "effects/may Fin du Tour : Défaussez pour que 3 autres cartes restent en jeu.",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 84,
    name: ["Mine", "Mine Profonde", "Mine de Diamant", "Mine de Rubis"],
    resources: [
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 4 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 0, fame: 6 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 2, fame: 13 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 1, fame: 9 }
      ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 85,
    name: ["Mine", "Mine Profonde", "Mine de Diamant", "Mine de Rubis"],
    resources: [
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 1, export: 0, fame: 4 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 0, fame: 6 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 2, fame: 13 }
      ],
      [
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 1, fame: 9 }
      ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 86,
    name: ["Adoubement", "", "Rénovation", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif Reste en jeu. effects/mandatory Fin de Manche: Ajoutez resources/gold resources/military et \"Chevalier\" à 1 Personne. Puis -> Back Up.",
      "",
      "effects/passif Reste en jeu. effects/mandatory Fin de Manche: Ajoutez resources/wood / resources/stone et resources/ingot / resources/export à 1 Bâtiment. Puis détruisez cette carte.",
      "",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 87,
    name: ["Quêtes", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end défaussez des Personnes (1, 2, 2, 3, 3, 4, 5, 6, 7) pour cocher la case de gauche à droite.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x6", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x27", checked: false},
        {content: "fame x35", checked: false},
        {content: "fame x45", checked: false}
      ],
      [],
      [],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 88,
    name: ["Une Tour Idéale", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end dépensez les resources/stone (1 à 10, incrément de 1) pour cocher la case de gauche à droite.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "fame 3", checked: false},
        {content: "fame 6", checked: false},
        {content: "fame 10", checked: false},
        {content: "fame 15", checked: false},
        {content: "fame 22", checked: false},
        {content: "fame 30", checked: false},
        {content: "fame 38", checked: false},
        {content: "fame 48", checked: false},
        {content: "fame 60", checked: false},
        {content: "fame 75", checked: false}
      ],
      [],
      [],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 89,
    name: ["Fosse Insondable", "Puits du Village", "Colonie de la Fosse", "Prison"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 1, stone: 1, military: 0, ingot: 0, export: 0, fame: 1 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 } ],
    ],
    effects: [
      "",
      "effects/passif La production des Bâtiments gagne +1 resources/gold .",
      "effects/activate Marquer 1 effects/check . Une fois complet, Back Down.",
      "effects/passif Reste en jeu. effects/activate Marquez 1 effects/check une des cases au choix pour défausser 1 Ennemi. (Vaut 2 resources/fame par effects/check .)",
    ],
    upgrades: [
      [
        { cost: { wood: 1, stone: 1 }, nextSide: 2 },
        { cost: { wood: 4 }, nextSide: 3 }
      ],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 90,
    name: ["Bijoux", "", "", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end dépensez les resources/ingot (1 à 10, incrément de 1) pour cocher la case de gauche à droite, puis gagnez 5 resources/export .",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "fame x1", checked: false},
        {content: "fame x2", checked: false},
        {content: "fame x3", checked: false},
        {content: "fame x5", checked: false},
        {content: "fame x7", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x14", checked: false},
        {content: "fame x20", checked: false},
        {content: "fame x28", checked: false},
        {content: "fame x40", checked: false}
      ],
      [],
      [],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 91,
    name: ["Construire une Arche", "", "L'Arche", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 24 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/end dépensez les resources/wood (2 à 10, incrément de 2) pour cocher la case de gauche à droite. Une fois complétée, -> Back Up",
      "",
      "effects/activate Inscrivez 1 effects/check pour chaque paire de Personnes que vous avez en jeu. (Vaut +1 resources/fame pour chaque effects/check )",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Parchemin", "", "Maritime", ""],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [ {content: "", checked: false}, 
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false}, 
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
      ],
      [],
      [],
      []
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 92,
    name: ["__", "", "__", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/mandatory Jouée la 1ère fois: Donne-lui un nom ! effects/mandatory Jouée la 2ème fois: Ajoutez resources/military / resources/fame x5. effects/mandatory Jouée la 3ème fois: Ajoutez resources/export / resources/fame x5.",
      "",
      "effects/passif Reste en jeu. effects/mandatory Jouée la 1ère fois: Donne-lui un nom ! effects/mandatory Jouée la 2ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ). effects/mandatory Jouée la 3ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 93,
    name: ["Chasse au Trésor", "Baie des Pirates", "Trésor Pirate", "Carte au Trésor"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
    ],
    effects: [
      "",
      "Améliorer: Défaussez 2 Personnes. effects/mandatory Fin du Tour: Hélas, vous découvrez un Traître (94).",
      "",
      "Améliorer: Défaussez 2 cartes Maritime.",
    ],
    upgrades: [
      [ {cost: {gold: 1, wood: 1, ingot: 1}, nextSide: 2} ],
      [ {cost: {military: 1, ingot: 1}, nextSide: 4} ],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Maritime", "Maritime", "Evénement", "Maritime"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 94,
    name: ["Traître", "", "Précieux Allié", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: -2 } ],
      [ { ...emptyResource } ],
      [
        { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 3 }
      ],
      [{ ...emptyResource } ],
    ],
    effects: [
      "(Choisissez le côté) effects/mandatory Carte Jouée: Défaussez 2 Personnes. effects/activate Dépensez resources/miltary resources/miltary resources/miltary resources/miltary pour vaincre ( effects/).",
      "",
      "effects/passif Lorsque vous Progressez, jouez 2 cartes supplémentaires.",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 4, ingot: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Ennemi", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 95,
    name: ["Astronome", "", "Astrologue", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 5 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 10 } ],
    ],
    effects: [
      "(Choisissez quand rajoutée.) effects/activate Dépensez resources/gold resources/gold pour inscrire 1 effects/check . (Vaut 2 resources/fame par effects/check )",
      "",
      "effects/activate Remettez au-dessus ou en-dessous de votre pioche jusqu'à 3 autres de vos cartes en jeu.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
      [],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 96,
    name: ["Alchimiste", "Potion de Force", "Potion d'Amour", "Potion de Soin"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/military resources/military resources/military ",
      "effects/activate Réinitialisez cette carte pour gagner resources/export resources/export resources/export resources/export resources/export .",
      "effects/may Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "Potion - Objet", "Potion - Objet", "Potion - Objet"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 97,
    name: ["Rouet", "Soie", "Mode", "Exportation d'Etoffe"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 4 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 3, fame: 10 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 6 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/military resources/military resources/military ",
      "effects/activate Réinitialisez cette carte pour gagner resources/export resources/export resources/export resources/export resources/export .",
      "effects/may Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [ { cost: { gold: 2 }, nextSide: 2 } ],
      [ { cost: { gold: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 4 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Invention", "Invention", "Invention", "Invention"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 98,
    name: ["Boussole", "Navigation", "Calendrier", "Astrolabe"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 8 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
    ],
    effects: [
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, Front Down.",
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, Back Down.",
      "effects/activate Inscrivez 1 effects/check pour prendre 15 cartes au hasard de votre défausse et les placer en-dessous de votre pioche..",
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, Back Up.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Maritime", "Maritime", "Invention", "Maritime"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "gold", checked: false }, { content: "gold", checked: false },
        { content: "gold", checked: false }, { content: "gold", checked: false },
      ],
      [
        { content: "gold", checked: false }, { content: "gold", checked: false },
        { content: "gold", checked: false }, { content: "gold", checked: false },
        { content: "export", checked: false }, { content: "export", checked: false },
        { content: "export", checked: false }, { content: "export", checked: false },
      ],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 99,
    name: ["Châtiment Publique", "Instrument de Torture", "Ere Post-Barbare", "Salle de Torture"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: -2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 1, fame: -3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: -6 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/military resources/military resources/military ",
      "effects/activate Réinitialisez cette carte pour gagner resources/export resources/export resources/export resources/export resources/export .",
      "effects/may Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [ { cost: { ingot: 2 }, nextSide: 2 } ],
      [ { cost: { ingot: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 6 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Invention", "Invention - Objet", "Etat", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 100,
    name: ["Scierie Publique", "Industrie du Bois", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { gold: 0, wood: 3, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 4, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 4 } ],
      [
        { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 6 }
      ],
    ],
    effects: [
      "(Choisissez une face)",
      "effects/activate Découvrez Construire une Arche (91).",
      "",
      "effects/passif resources/export et resources/wood peuvent être utilisés de manière interchangeable.",
    ],
    upgrades: [
      [ { cost: { wood: 3 }, nextSide: 2 } ],
      [],
      [ { cost: { gold: 4 }, nextSide: 4 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Maritime"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 101,
    name: ["Scierie Publique", "Industrie du Bois", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { gold: 3, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 } ],
      [ { gold: 4, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 8 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
    ],
    effects: [
      "(Choisissez une face)",
      "effects/passif Reste en jeu.",
      "effects/may Fin du Tour: 2 cartes au choix restent en jeu.",
      "effects/may Fin du Tour: cette carte ou une autre au choix reste en jeu.",
    ],
    upgrades: [
      [ { cost: { wood: 4 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, ingot: 2 }, nextSide: 4 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment - Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 102,
    name: ["Bateaux de Pêche", "Comme un Poisson (dans l'eau)", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { gold: 3, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 4 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 13 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 } ],
    ],
    effects: [
      "(Choisissez une face)",
      "",
      "effects/activate Inscrivez 1 effects/check . Une fois complété, Back Down.",
      "effects/passif La production de chaque carte maritime augmente de +1 resources/gold .",
    ],
    upgrades: [
      [ { cost: { wood: 2, gold: 1, ingot: 1 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, ingot: 2 }, nextSide: 4 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Maritime", "Maritime", "Maritime", "Etat - Permanent"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 103,
    name: ["Missionaire", "", "Apiculteur", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold resources/gold pour convertir (->) un Bandit.",
      "",
      "effects/activate Inscrivez 1 effects/check . Une fois complété, ajoutez resources/gold à cette carte.",
      "",
    ],
    upgrades: [
      [ { cost: { gold: 3 }, nextSide: 3 } ],
      [],
      [ { cost: {}, nextSide: 1 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 104,
    name: ["Prêtre", "", "Cardinal", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour améliorer 1 carte en jeu, en payant son coût. Cela ne met pas FIN au tour.",
      "",
      "effects/activate Améliorez 1 carte en jeu, en payant son coût. Cela ne met pas FIN au tour.",
      "",
    ],
    upgrades: [
      [ { cost: { gold: 6, export: 2 }, nextSide: 3 } ],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 105,
    name: ["Petit Village sur la Colline", "Village sur la Colline", "Ville sur la Colline", "Grande Ville"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 6 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 8 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 12 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 10 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour gagner 1 ressource au choix.",
      "effects/activate Dépensez resources/gold pour gagner 1 ressource au choix.",
      "effects/activate Oubliez cette carte pour découvrir Camelot (106). (Mettez-la de côté hors deck)",
      "effects/activate Dépensez 1 ressource au choix pour gagner 1 ressource au choix.",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 3, stone: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { wood: 6 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 106,
    name: ["Camelot", "Camelot", "Camelot", "Camelot"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 20 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 30 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 40 } ],
    ],
    effects: [
      "",
      "",
      "effects/may Fin du Tour: Si votre pioche est vide, inscrivez 1 effects/check . (Vaut 5 resources/fame par effects/check )",
      "",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 1, stone: 3, ingot: 2 }, nextSide: 4 } ],
      [],
      [ { cost: { stone: 6, ingot: 3 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 107,
    name: ["Visite Royale", "", "Inquisitrice", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/activate Barrez 1 icône de ressource dans le coût d'amélioration d'une carte en jeu.",
      "",
      "effects/destroy Détruisez une carte négative en jeu.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "", "Evénement", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 108,
    name: ["Cristal Ethéré Royale", "", "", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 10 } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Cette carte ne peut pas être détruite.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Artefact - Permanente", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 109,
    name: ["Petite Guilde", "Guilde", "Manoir de la Guilde", "Hotêl de la Guilde"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [ { gold: 1, wood: 1, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
    ],
    effects: [
      "Améliorer: Défaussez 1 Personne.",
      "Améliorer: Défaussez 2 Personnes.",
      "effects/activate Défaussez le nombre de personne de votre choix pour gagner autant de resources/fame . Puis inscrivez 1 effects/check .",
      "",
    ],
    upgrades: [
      [ {cost: { wood: 2 }, nextSide: 2} ],
      [ {cost: { stone: 2 }, nextSide: 4} ],
      [],
      [ {cost: { stone: 4 }, nextSide: 3} ],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false },
        { content: "", checked: false },
        { content: "", checked: false },
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 110,
    name: ["Grange", "Grande Grange", "Campagne", "Campagne Prospère"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 }
      ],
      [ { gold: 2, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 1, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "",
      "effects/activate Choisissez une carte en jeu ou dans la défausse. Placez-la sous la pioche.",
      "effects/activate Remettez une carte en jeu sous la pioche.",
    ],
    upgrades: [
      [ {cost: { wood: 3 }, nextSide: 2} ],
      [ {cost: { wood: 6 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 6 }, nextSide: 3} ],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 111,
    name: ["Manoir", "Grand Manoir", "Imposante Demeur", "Noble Demeur"],
    resources: [
      [ { gold: 6, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 6, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 3, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 6, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
    ],
    effects: [
      "effects/mandatory Lorsqu'elle produit réduisez les resources/gold de 1.",
      "effects/mandatory Lorsqu'elle produit réduisez les resources/gold de 1.",
      "effects/end Découvrez un Noble (116).",
      "effects/mandatory Lorsqu'elle produit réduisez les resources/gold de 1.",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 112,
    name: ["Etable", "Etable", "Palfrenier", "Grande Etable"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/end Dépensez resources/gold resources/gold pour découvrir un cheval (113).",
      "effects/end Dépensez resources/gold resources/gold pour découvrir un cheval (114).",
      "effects/activate Choisissez un Cheval en jeu avec 1 ou 2 ressources et ajoutez-lui resources/gold / resources/wood / resources/stone / resources/ingot / resources/military . effects/activate Jouez un cheval depuis la défausse.",
      "effects/end Dépensez resources/gold resources/gold pour découvrir un cheval (115).",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 4 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Personne", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 113,
    name: ["Cheval", "", "", ""],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Elevage - Cheval", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 114,
    name: ["Cheval", "", "", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Elevage - Cheval", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 115,
    name: ["Cheval", "", "", ""],
    resources: [
      [
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 }
      ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Elevage - Cheval", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 116,
    name: ["Aric Blackwood", "", "Eadric Shadowstrike", ""],
    resources: [
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "(Choisissez une face) effects/passif Reste en jeu. effects/mandatory Carte Jouée: vous devez défausser une carte en jeu.",
      "",
      "effects/passif Reste en jeu. effects/activate Défaussez 2 Personnes pour gagner resources/military resources/military resources/military .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 117,
    name: ["Relations Commerciales", "", "", ""],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passif Dépensez resources/export resources/export resources/export pour gagner une ressource au choix.",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Permanente", "", "", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 118,
    name: ["Petite Ecole", "Ecole", "Ecole Réputée", "Ecole Reconnue"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 6 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 } ],
    ],
    effects: [
      "effects/end Améliorez gratuitement 1 Personne en jeux, puis Front Down.",
      "effects/end Améliorez gratuitement 1 Personne en jeux, puis Back Down.",
      "effects/end Ajoutez 1 ressource à une Personne en jeux, puis effects/single.",
      "effects/end Ajoutez 1 ressource à une Personne en jeux, puis Back Up.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 119,
    name: ["Commerçante", "Bazar", "Festival", "Marché"],
    resources: [
      [{ ...emptyResource }],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 1 }
      ],
      [
        { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 },
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 1, export: 0, fame: 4 }
      ],
      [
        { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold pour gagner resources/wood .",
      "effects/activate Dépensez resources/gold pour gagner resources/wood / resources/stone .",
      "",
      "effects/activate Dépensez resources/gold pour gagner resources/wood / resources/stone / resources/ingot .",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 5 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Personne", "Bâtiment", "Evénement", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 120,
    name: ["Investisseur", "Investisseur", "Investisseur", "Investisseur"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/activate Gagnez 3 ressources au choix, puis Front Down.",
      "effects/end Gagnez 3 ressources au choix, puis Back Down.",
      "effects/end Gagnez 1 ressource au choix.",
      "effects/end Gagnez 3 ressources au choix, puis Back Up.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne - Dame", "Personne - Dame", "Personne - Dame", "Personne - Dame"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 121,
    name: ["Roi Alahar", "", "Reine Jemimah", ""],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: -5 } ],
      [ { ...emptyResource} ],
      [ { gold: 1, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "(Choisissez une face) effects/passif Reste en jeu.",
      "",
      "effects/activate Défaussez 1 Personne comportant 5 resources/fame ou plus pour inscrire 1 effects/check . (Vaut 3 par effects/check )",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne - Dame", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes:  [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false },
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 122,
    name: ["Consort Royal", "", "Consort Royal", ""],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 2, fame: 0 } ],
      [ { ...emptyResource} ],
      [ { gold: 0, wood: 1, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personnage - Dame", "", "Personnage - Chevalier", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 123,
    name: ["Château Majestueux", "Château Monumental", "Forteresse", "Forteresse Imprenable"],
    resources: [
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 20 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 3, ingot: 0, export: 0, fame: 30 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 25 } ],
    ],
    effects: [
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse. effects/may Vous pouvez défausser 2 Murailles à la place de cette carte.",
      "effects/activate Jouez 1 carte depuis la défausse.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 124,
    name: ["Extraction de joyaux", "Taille de Joyau", "Exposition du Joyau", "Polissage du Joyau"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 2, export: 2, fame: 15 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 2, export: 3, fame: 18 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 3, export: 6, fame: 25 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 3, export: 4, fame: 21 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement", "Evénement", "Evénement", "Evénement"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 125,
    name: ["Grand Temple", "Temple Sculpté", "Temple de la Lumière", "Temple Légendaire"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 18 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 22 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 30 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 28 } ],
    ],
    effects: [
      "effects/may Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/may Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/may Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu. effects/end dépensez resources/export resources/export resources/export resources/export resources/export pour inscrire 1 effects/check .(Quand vous la purgez, cette carte vaut +10 resources/fame par effects/check.",
      "effects/may Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    ],
    upgrades: [
      [ { cost: { gold: 3, export: 3 }, nextSide: 2 } ],
      [ { cost: { gold: 3, stone: 3, export: 3 }, nextSide: 4 } ],
      [],
      [{ cost: { export: 8 }, nextSide: 3 }],
    ],
    currentHalf: 0,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 126,
    name: ["Forêt de Pins", "Forêt de Pins", "Mare", "Mare Poissonneuse"],
    resources: [
      [ { gold: 0, wood: 1, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 2, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 2, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
    ],
    effects: [
      "(Choisissez une face)",
      "",
      "",
      "",
    ],
    upgrades: [
      [ { cost: { gold: 2, ingot: 1 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 4 }, nextSide: 4 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 127,
    name: ["Rochers", "Rochers", "Champignons", "Champignons"],
    resources: [
      [ { gold: 0, wood: 0, stone: 1, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 2, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
    ],
    effects: [
      "(Choisissez une face)",
      "",
      "Améliorer: Défaussez 2 Personnes (Back Down).",
      "effects/passif Défaussez 1 Personne pour gagner resources/export resources/export .",
    ],
    upgrades: [
      [ { cost: { ingot: 2 }, nextSide: 2 } ],
      [],
      [ { cost: {}, nextSide: 4 } ],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 128,
    name: ["Ravin", "Gouffre", "Site de Fouilles", "Ruines Antiques"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 1, fame: 0 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "(Choisissez une face)",
      "Améliorer: Défaussez 2 Personnes (Back Down).",
      "Vaut 7 par effects/check . effects/end Défaussez 1 Personne et dépensez resources/stone resources/stone resources/stone pour inscrire effects/check .",
      "Améliorer: Défaussez 2 Personnes (Back Down).",
    ],
    upgrades: [
      [ { cost: { gold: 2, wood: 2 }, nextSide: 2 } ],
      [ { cost: {}, nextSide: 4 } ],
      [],
      [ { cost: {}, nextSide: 3 }  ],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes:  [
      [],
      [],
      [
        { content: "" , checked: false }, { content: "" , checked: false },
        { content: "" , checked: false }, { content: "" , checked: false },
        { content: "" , checked: false }, { content: "" , checked: false },
        { content: "" , checked: false }
      ],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 129,
    name: ["Sources Chaudes", "Fontaine", "Rivière d'Eau Pure", "Canaux"],
    resources: [
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 9 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
    ],
    effects: [
      "effects/may Lorsque vous l'améliorez ajoutez 1 resources/gold à un Terrain en jeu.",
      "effects/may Lorsque vous l'améliorez boostez 1 carte en jeu.",
      "",
      "effects/may Lorsque vous l'améliorez ajoutez 1 Terrain gagne \" effects/passif Reste en jeu. \".",
    ],
    upgrades: [
      [ { cost: { gold: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 2 }, nextSide: 4 } ],
      [],
      [ { cost: {}, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 130,
    name: ["Ville Frontalière", "Tour de Garde", "Mur Intérieur", "Double Muraille"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 4 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 2, ingot: 0, export: 0, fame: 0 } ],
    ],
    effects: [
      "",
      "effects/passif Vous pouvez regardez les 2 cartes du dessus de votre pioche.",
      "effects/passif Reste en jeu.",
      "Vaut 4 resources/fame pour chaque Murailles, celle-ci incluse effects/passif Reste en jeu.",
    ],
    upgrades: [
      [
        { cost: { gold: 1, wood: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [],
      [{ cost: { wood: 2, stone: 4}, nextSide: 3 }],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 131,
    name: ["Plaines du Nord", "Douves", "Muraille", "Pont des Douves"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "effects/activate Défaussez une autre carte pour gagner resources/military resources/military .",
      "effects/passif Reste en jeu.",
      "effects/activate Dépensez resources/gold pour jouer une Personne depuis la défausse.",
    ],
    upgrades: [
      [
        { cost: { gold: 1, stone: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [{ cost: { gold: 2, ingot: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 132,
    name: ["Collines Meridionales", "Terrasses", "Moulin à Vent", "Murailles"],
    resources: [
      [ { gold: 1, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 0 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 2 } ],
      [ { gold: 3, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 4 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 1, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "",
      "",
      "",
      "effects/passif Reste en jeu.",
    ],
    upgrades: [
      [
        { cost: { wood: 3, stone: 2 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 133,
    name: ["Raid", "Razzia", "Saccage", "Pillage"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "effects/activate Gagnez 1 ressource au choix.",
      "effects/activate Gagnez 2 ressource au choix.",
      "effects/activate Gagnez 3 ressource au choix.",
      "effects/activate Gagnez 2 ressource au choix.",
    ],
    upgrades: [
      [ { cost: { military: 2 }, nextSide: 2 } ],
      [ { cost: { military: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { military: 5 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Evénement", "Evénement", "Evénement", "Evénement"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 134,
    name: ["Rival Beau-Gosse", "", "Allié Noble", ""],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 6 } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "effects/passif Ne peut pas être détruit, à moins que Lord Nimrod n'ai été détruit. effects/activate Défaussez Lord Nimroy et dépensez les ressources d'une case pour inscrire effects/check. Une fois complétées, -> (Back Up). Vaut -5 pour chaque case non effects/check .",
      "",
      "effects/activate Choisissez une Personne en jeu et gagnez les ressources qui correspondent à sa production.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Personne", "", "Personne", ""],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes:  [
      [
        { content: "gold, gold, gold, gold, gold", checked: false },
        { content: "military, military", checked: false },
        { content: "military, military, military", checked: false },
        { content: "export, export, export", checked: false },
      ],
      [],
      [],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 135,
    name: ["Terres Frontalières", "Occupation", "Etats Vassaux", "Villages Alliés"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 5 } ],
      [ { gold: 0, wood: 0, stone: 0, military: 0, ingot: 0, export: 0, fame: 3 } ],
    ],
    effects: [
      "effects/passif Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration. Toutes les étapes ont la même valeur que l'étape finale (Back Up).",
      "effects/passif Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration.",
      "effects/activate Réinitialisez cette carte.",
      "effects/passif Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration. Lorsque vous l'améliorez, ajoutez 20 resources/fame à l'étape finale (Back Up).",
    ],
    upgrades: [
      [ { cost: { military: 2 }, nextSide: 2 } ],
      [ { cost: { military: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { military: 5 }, nextSide: 3 } ],
    ],
    currentHalf: 0,
    type: ["Terrain - Ennemi", "Evénement", "Terrain", "Terrain"],
    permanent: false,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 136,
    name: ["Prospérité (extension)", "Engranger des réserves", "Décret Royal", "Soulèvement"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Jouez 1 manche durant laquelle la production de toutes les cartes alliées ont +1 resources/gold , puis -> (Front Down).",
      "Jouez 1 manche durant laquelle une carte de votre choix reste en jeu à chaque tour, puis -> (Back Down).",
      "Jouez 1 manche. Puis, pour chaque effects/check sur Soulèvement, vous devez barrer 1 production sur 1 carte. Après quoi, détruisez cette extension.",
      "Jouez 1 manche durant laquelle vous devez inscrire 1 effects/check à chaque fois qu'une Personne est jouée alors qu'une autre Personne est déjà en jeu. Puis -> (Back Up).",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 137,
    name: ["Le Moulin à Eau (extension)", "Récolte Productive", "Fermes Abandonnées", "Surplus"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Jouez 1 manche durant laquelle vous pouvez gagner resources/gold resources/gold resources/gold une fois par tour. Puis -> (Front Down).",
      "Jouez 1 manche. effects/end Défaussez 2 Bâtiments pour ajouter une resources/gold à un Terrain en jeu. Puis -> (Back Down).",
      "Jouez 1 manche. Puis, détruisez cette extension avec 1 carte avec une production d' resources/gold .",
      "Jouez 1 manche durant laquelle les Terrains produisent de l' resources/gold peuvent produire des resources/export à la place. Puis -> (Back Up).",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: undefined,
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
  {
    id: 138,
    name: ["Frontière Contestée (extension)", "Espionnage", "Résistance", "Attaque"],
    resources: [
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
      [ { ...emptyResource } ],
    ],
    effects: [
      "Jouez 1 manche durant laquelle tous les Terrains restent en jeu. Puis -> (Front Down).",
      "Jouez 1 manche. Puis -> (Back Down). effects/mandatory Lorsqu'une Personne est jouée, inscrivez 1 effects/check ou défaussez 2 cartes alliées. Une fois complétée, défaussez toute votre pioche.",
      "Jouez 1 manche durant laquelle vous pouvez dépenser autant d' resources/military que vous le souhaitez pour les mettre sur cette carte. Après la manche, ajoutez autant de resources/fame (max 100) à un Terrain. Puis détruisez cette extension.",
      "Jouez 1 manche. effects/mandatory Fin du Tour: Si vous n'avez aucune resources/military , enlevez 1 production d'1 carte en jeu. effects/mandator Fin de Manche: Ajoutez une ressource (non- resources/fame ) au choix à une carte alliée, puis -> (Back Up).",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentHalf: 0,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    permanent: true,
    up: false,
    flipped: false,
    checkboxes: [
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false }
      ],
      [],
      [],
    ],
    GetResources: function (): ResourceMap[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    }
  },
];