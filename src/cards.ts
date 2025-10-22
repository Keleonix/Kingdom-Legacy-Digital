import { emptyResource, type GameCard, type ResourceMap, type Upgrade } from "./types";

export const allCards: GameCard[] = [
  { id: 0,
    name: ["Bienvenue", "", "Règles d'Or", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Assurez-vous d'avoir bien lu les règles avant de commencer à jouer (Settings -> Guide)! Retenez bien les Règles d'Or (voir -> Back Up). Après les avoirs lues, effects/destroy .",
      "",
      "1. Ne jamais changer le côté d'une carte sans qu'un effet ne vous le permette. 2. Vous pouvez regarder vos cartes mais pas celles du deck de campagne avant d'y avoir été invité. 3. Au début de chaque manche (sauf 1ère), découvrez 2 cartes suivantes depuis le deck de campagne. 4. Une carte dont le côté change est toujours immédiatement défaussée. 5. Améliorer une carte met fin à votre tour.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Parchemin", "", "Parchemin", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 1,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 1 }
      ],
      [
        { gold: 2, fame: 3 }
      ],
      [
        { gold: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/gold resources/gold .",
      "effects/passive Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 2,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 1 }
      ],
      [
        { gold: 2, fame: 3 }
      ],
      [
        { gold: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/gold resources/gold .",
      "effects/passive Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 3,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 1 }
      ],
      [
        { gold: 2, fame: 3 }
      ],
      [
        { gold: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/gold resources/gold .",
      "effects/passive Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 4,
    name: ["Herbes Sauvages", "Plaines", "Grange", "Terres Cultivées"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 1 }
      ],
      [
        { gold: 2, fame: 3 }
      ],
      [
        { gold: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/gold resources/gold .",
      "effects/passive Reste en jeu. ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 2 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 5,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, ingot: 1, fame: 3 }
      ],
      [
        { stone: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 6,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, ingot: 1, fame: 3 }
      ],
      [
        { stone: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 7,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 8,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 9,
    name: ["Quartier Général", "Hôtel de Ville", "Château", "Donjon"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { military: 1, fame: 3 }
      ],
      [
        { military: 1, fame: 12 }
      ],
      [
        { military: 1, fame: 7 }
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
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 10,
    name: ["Commerçante", "Bazar", "Festival", "Marché"],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { stone: 1 },
        { ingot: 1, fame: 4 }
      ],
      [
        { fame: 3 }
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
    currentSide: 1,
    type: ["Personne", "Bâtiment", "Evénement", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 11,
    name: ["Jungle", "Arbres Géants", "Cabanes dans les Arbres", "Jungle Profonde"],
    resources: [
      [{ ...emptyResource }],
      [
        { wood: 1 }
      ],
      [
        { gold: 1, wood: 2, fame: 4 }
      ],
      [
        { wood: 2 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold pour gagner resources/wood .",
      "effects/activate Dépensez resources/gold pour gagner resources/wood resources/wood .",
      "effects/passive Reste en jeu.",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 12,
    name: ["Rivière", "Pont", "Explorateurs", "Pont de Pierre"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 1, fame: 2 }
      ],
      [
        { gold: 1, fame: 4 }
      ],
      [
        { gold: 1, fame: 4 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Personne", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 13,
    name: ["Exploitant", "", "Domestique", ""],
    resources: [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 14,
    name: ["Bandit", "", "Travailleur", ""],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte Jouée : Bloque 1 carte avec production d' resources/gold . effects/activate Dépensez resources/military pour vaincre ( effects/destroy ) et gagner 2 ressources au choix.",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 15,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, ingot: 1, fame: 3 }
      ],
      [
        { stone: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 16,
    name: ["Bandit", "", "Exploitant", ""],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte Jouée : Bloque 1 carte avec production d' resources/gold . effects/activate Dépensez resources/military pour vaincre ( effects/destroy ) et gagner 2 ressources au choix.",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 17,
    name: ["Colline", "Chappelle", "Cathédrale", "Eglise"],
    resources: [
      [ { gold: 1 } ],
      [ { gold: 1, fame: 1 } ],
      [ { gold: 1, fame: 7 } ],
      [ { gold: 1, fame: 3 } ],
    ],
    effects: [
      "",
      "effects/activate Dépensez  resources/gold resources/gold pour découvrir un Missionaire (103).",
      "effects/passive Cette carte produit+1 resources/gold pour chaque Personne en jeu.",
      "effects/activate Dépensez  resources/gold resources/gold pour découvrir un Prêtre (104).",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 1, stone: 1 }, nextSide: 2 }],
      [{ cost: { wood: 2, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { ingot: 1, wood: 2, stone: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 18,
    name: ["Falaise de l'Est", "Forge", "Muraille", "Armurerie"],
    resources: [
      [ { stone: 1 } ],
      [ { ingot: 1, fame: 1 } ],
      [ { military: 1, fame: 3 } ],
      [ { ingot: 1, fame: 4 } ],
    ],
    effects: [
      "",
      "effects/activate Réinitialisez pour découvrir des Bijoux (90).",
      "effects/passive Reste en jeu.",
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
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 19,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 20,
    name: ["Marais", "Marais Aménagés", "Arbres à Fruits Exotiques", "Jardin du Marais"],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { export: 2, fame: 4 } ],
      [ { gold: 1, fame: 3 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 21,
    name: ["Marais", "Marais Aménagés", "Arbres à Fruits Exotiques", "Jardin du Marais"],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { export: 2, fame: 4 } ],
      [ { gold: 1, fame: 3 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 22,
    name: ["Lac", "Chalet du Pêcheur", "Phare", "Bateau de Pêche"],
    resources: [
      [ { gold: 1, fame: 1 } ],
      [ { gold: 1, fame: 1 } ],
      [ { fame: 5 } ],
      [ { gold: 2, export: 2, fame: 1 } ],
    ],
    effects: [
      "",
      "",
      "effects/passive Reste en jeu. effects/passive Défaussez la carte du sommet de votre pioche.",
      "effects/activate Découvrez les Rivages (75).",
    ],
    upgrades: [
      [{ cost: { stone: 2, wood: 1 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { wood: 3 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Maritime"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 23,
    name: ["STOP !", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 24,
    name: ["Terre Fertile/Efficacité", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Ajoutez 1 resources/gold à la production d'un terrain, puis choisissez un Bâtiment et rajoutez 1 à une ressource qu'il produit déjà.",
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 25,
    name: ["Armée", "", "Grande Armée", ""],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 50 } ],
      [],
    ],
    effects: [
      "effects/time Dépensez les resources/military (1 à 10, incrément de 1) pour cocher la case de gauche à droite, à la dernière carte, Back Up et découvrez l'Etat Vassal (135).",
      "",
      "effects/time Dépensez les resources/military (10, 10, 12, 12, 15) pour cocher la case de gauche à droite.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "Parchemin - Permanente", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 26,
    name: ["Trésor", "", "Immense Trésor", ""],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 50 } ],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/gold (1 à 12, incrément de 1) pour cocher la case de gauche à droite. A la dernière carte, Back Up.",
      "",
      "effects/time dépensez les resources/gold (13 à 17, incrément de 1) pour cocher la case de gauche à droite.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "Parchemin - Permanente", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 27,
    name: ["Exportations", "", "Exportations de Masse", ""],
    resources: [
      [ {...emptyResource}],
      [],
      [ { fame: 25 } ],
      [],
    ],
    effects: [
      "10: Ajoutez resources/gold / resources/wood / resources/stone sur un Terrain, 20: Un Personnage gagne \" effects/passive Reste en jeu.\", 30: Découvrez Adoubement (80), 40: Ajoutez resources/ingot / resources/military / resources/export sur 1 Bâtiment, 55: Ajoutez resources/wood / resources/stone / resources/ingot / resources/military sur une carte, 75: Ajoutez resources/fame x5 sur une carte, 100: -> Back Up. effects/passive Dépensez des resources/export .",
      "",
      "25: Ajoutez resources/fame sur deux Terrains, 50: Ajoutez resources/fame x5 sur une Personne, 75: Découvrez Visite Royale (107), 100: Ajoutez resources/fame x5 sur un Bâtiment, 150: effects/check une autre carte Permanente, 200: effects/check toutes les autres cartes Permanentes au choix, 250: Découvrez Relations Commerciales (117). effects/passive Dépensez des resources/export .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "Parchemin - Permanente", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 28,
    name: ["Eruption Volcanique", "", "Terres Brulées", "Jeune Forêt"],
    resources: [
      [],
      [],
      [ { fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      "effects/forced Tant qu'elle est en jeu, détruisez le prochain Terrain que vous jouez. Lorsque vous le faite, Back Up.",
      "",
      "",
      "effects/time Ajoutez 1 effects/check dans l'ordre et à *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {gold: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ["Evénement", "", "Terrain", "Terrain"],
    choice: false,
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
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 29,
    name: ["Opportuniste", "Recrue", "Artisan", "Prétendu Noble"],
    resources: [
      [ { gold: 1 } ],
      [ { military: 1 } ],
      [ { stone: 1 } ],
      [ { fame: 4 } ],
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
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Personne", "Personne", "Personne", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 30,
    name: ["STOP !", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Découvrez les cartes 31 à 34, choisissez-en 2 à découvrir et détruisez les 2 autres.",
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 31,
    name: ["Entrepreneur", "Hôtel", "Taverne", "Bar Confortable"],
    resources: [
      [ { export: 1 } ],
      [ { gold: 1, export: 1, fame: 2 } ],
      [ { gold: 2, export: 2, fame: 4 } ],
      [ { export: 2, fame: 2 } ],
    ],
    effects: [
      "effects/time Découvrez l'Ecole (118).",
      "effects/activate Gagnez resources/gold par Personne en jeu.",
      "effects/activate Découvrez les Quêtes (87).",
      "effects/activate Défaussez une Personne pour découvrir un Etranger (92).",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 1, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, export: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Personne", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 32,
    name: ["Scientifique", "", "Observatoire", "Laboratoire"],
    resources: [
      [],
      [],
      [ { gold: 1, export: 1, fame: 5 } ],
      [ { gold: 1, export: 2, fame: 10 } ],
    ],
    effects: [
      "effects/passive Toutes les Personnes, Scientifique inclus, produisent +1 resources/gold .",
      "",
      "effects/time Découvrez l'Astronome (95).",
      "effects/time Découvrez l'Alchimiste (96).",
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, ingot: 1 }, nextSide: 3 }],
      [],
      [{ cost: { gold: 1, stone: 2, ingot: 2 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 33,
    name: ["Ingénieur", "", "Trébuchet", ""],
    resources: [
      [],
      [],
      [ { military: 1, fame: 1 } ],
      [],
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
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Bâtiment", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 34,
    name: ["Inventrice", "", "Inventrice Inspirée", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
    checkboxes: [
      [ {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false}
      ],
      [],
      [],
      [],
    ],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 35,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, ingot: 1, fame: 3 }
      ],
      [
        { stone: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 36,
    name: ["Mercenaire", "", "Sir __", ""],
    resources: [
      [],
      [],
      [ { military: 1, fame: 3 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour ajouter 1 ou deux effects/check .",
      "",
      "effects/time Dépensez resources/ingot resources/ingot resources/ingot pour ajouter resources/military sur cette carte ( effects/oneTime ). effects/time Dépensez resources/ingot resources/ingot resources/ingot resources/ingot pour ajouter resources/military sur cette carte ( effects/oneTime ). ",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 3, ingot: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 37,
    name: ["STOP !", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 38,
    name: ["L'Union fait la Force", "", "Domination Militaire", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Objectif - Permanente", "", "Objectif - Permanente", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 39,
    name: ["Elargir les frontières", "", "Optimisation", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Objectif - Permanente", "", "Objectif - Permanente", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 40,
    name: ["Loyauté", "", "Commerce", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Objectif - Permanente", "", "Objectif - Permanente", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 41,
    name: ["Bouffon", "", "Marchande", ""],
    resources: [
      [],
      [],
      [ { fame: 15 } ],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/activate Défaussez la carte au sommet de votre pioche. effects/activate Ajoutez 1 effects/check .",
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
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
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 42,
    name: ["Exploitant", "", "Grenier", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      "",
      "effects/passive Reste en jeu. effects/optional Fin du Tour: Défaussez pour qu'une autre carte reste en jeu.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Bâtiment", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 43,
    name: ["Maçon", "", "Route Pavée", "Rue Pavée"],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { gold: 1, fame: 3 } ],
      [ { gold: 1, fame: 7 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour découvrir un projet de bâtiment (88/89).",
      "",
      "effects/time Inspectez les cartes (109) et (110), détruisez l'une et découvrez l'autre.",
      "effects/time Inspectez les cartes (111) et (112), détruisez l'une et découvrez l'autre.",
    ],
    upgrades: [
      [{ cost: { gold: 1, stone: 2 }, nextSide: 3 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 44,
    name: ["Orage", "", "Pluie", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/forced Carte jouée: défaussez les 3 premières cartes de votre pioche, puis -> (Back Up).",
      "",
      "effects/passive La production des Terrains est doublée. effects/passive Vous ne pouvez jouer aucune carte. effects/forced Fin du Tour: -> (Front Up).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Catastrophe", "", "Catastrophe", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 45,
    name: ["Chevalier Noir", "", "Garçon Admiratif", "Ecuyer"],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { gold: 0 } ],
      [ { military: 1, fame: 3 } ],
    ],
    effects: [
      "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni même utiliser les effets effects/time . effects/activate Dépensez resources/military resources/military resources/military pour vaincre (-> Back Up).",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 46,
    name: ["Camp", "Camp d'Entrainement", "", "Sir __"],
    resources: [
      [ { gold: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { military: 2, fame: 3 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "", "Personne - Chevalier"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 47,
    name: ["STOP !", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Découvrez les cartes 48 à 51. Découvrez-en 2 et détruisez les 2 autres.",
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 48,
    name: ["Envoyé", "Emissaire", "Ambassadeur", "Diplomate"],
    resources: [
      [],
      [ { fame: 1 } ],
      [ { fame: 5 } ],
      [ { fame: 2 } ],
    ],
    effects: [
      "effects/time Dépensez resources/gold resources/gold resources/gold pour découvrir une Commerçante (119).",
      "effects/time Dépensez resources/gold resources/gold resources/gold pour découvrir un Investisseur (120).",
      "effects/time Dépensez resources/gold resources/gold resources/gold pour découvrir le Consort (122).",
      "effects/time Dépensez resources/gold resources/gold resources/gold pour découvrir une allié (121).",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 6 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 6 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Personne", "Personne", "Personne", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 49,
    name: ["Architecte Royal", "", "Pont des Merveilles", ""],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { fame: 15 } ],
      [],
    ],
    effects: [
      "effects/activate Détruisez l'une des cartes suivantes: Château (10) - découvrez (123), Mine de Diamant (84/85) - découvrez (124), Temple (82/83) - découvrez (125). ",
      "",
      "",
      "",
    ],
    upgrades: [
      [ {cost: {}, nextSide: 3, otherCost: "Détruisez le Pont de Pierre (12)" } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Bâtiment", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 50,
    name: ["Voyageur", "Voyageur", "Voyageur", "Voyageur"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time Découvrez un Terrain (126).",
      "effects/time Découvrez un Terrain (127).",
      "effects/time Découvrez un Terrain (129). effects/activate Défaussez un Terrain pour gagner 2 ressources au choix.",
      "effects/time Découvrez un Terrain (128).",
    ],
    upgrades: [
      [{ cost: { export: 3 }, nextSide: 2 }],
      [{ cost: { export: 3 }, nextSide: 4 }],
      [],
      [{ cost: { export: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Personne", "Personne", "Personne", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 51,
    name: ["Magistrat", "Magistrat", "Stratège", "Magistrat"],
    resources: [
      [],
      [],
      [ { fame: 5 } ],
      [ { fame: 2 } ],
    ],
    effects: [
      "effects/time Découvrez une Frontière (130).",
      "effects/time Découvrez une Frontière (131).",
      "effects/activate Jouez une Muraille ou un Chevalier depuis la défausse.",
      "effects/time Découvrez une Frontière (132).",
    ],
    upgrades: [
      [{ cost: { stone: 3 }, nextSide: 2 }],
      [{ cost: { stone: 2, ingot: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 3, ingot: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Personne", "Personne", "Personne", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 52,
    name: ["Grosse Butte", "Hameau sur la Colline", "Village Culminant", "Village"],
    resources: [
      [],
      [ { gold: 1, fame: 1 } ],
      [ { gold: 2, export: 1, fame: 6 } ],
      [ { gold: 1, fame: 2 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 53,
    name: ["Sorcière", "", "Hutte de la Sorcière", ""],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ). effects/activate Défaussez 3 Personnes pour -> (Back Up). effects/forced Fin du tour: Découvrez les 2 prochaines cartes de la boîte, puis -> (Back Up).",
      "",
      "effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ). effects/activate Détruisez une Personne pour effects/destroy . effects/forced Fin du Tour: Découvre les 2 prochaines cartes de la boîte, puis effects/destroy .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Ennemi", "", "Ennemi", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, true],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 54,
    name: ["Scribe", "", "Architecte", ""],
    resources: [
      [],
      [],
      [ { stone: 1 } ],
      [],
    ],
    effects: [
      "effects/optional Fin du tour: Défaussez pour que 1 ou 2 autres cartes restent en jeu.",
      "",
      "effects/time Réinitialisez pour découvrir un projet de construction (78/79).",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 5 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 55,
    name: ["Lord Aethan", "", "Lord Nimrod", ""],
    resources: [
      [ { gold: 1, wood: 1, stone: 1 } ],
      [],
      [ { military: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Découvrez la Coopération (80) ou le Domaine (81). effects/passive Ajoutez 1 effects/check .",
      "",
      "effects/time Découvrez un Raid (133) et un Rival (134). effects/activate Ajoutez 1 effects/check .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
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
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 56,
    name: ["Peste", "", "Soldat Ennemi", ""],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 2 Personnes de votre royaume. Puis -> (Back Front).",
      "",
      "effects/forced Carte Jouée: Bloque 1 Bâtiment/Terrain en jeu. effects/passive : Reste en jeu. effects/forced Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Evénement", "", "Ennemi", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 57,
    name: ["Assassin", "", "Soldat Ennemi", ""],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/forced Détruisez la prochaine Personne que vous jouez. Lorsque vous le faites, ->. effects/activate Dépensez resources/military resources/military resources/military pour vaincre (->).",
      "",
      "effects/forced Carte Jouée: Bloque 1 Bâtiment/Terrain en jeu. effects/passive : Reste en jeu. effects/forced Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Ennemi", "", "Ennemi", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 58,
    name: ["Ville en Flamme", "", "Terre Brûlée", "Jeune Forêt"],
    resources: [
      [],
      [],
      [ { fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 1 Bâtiment de votre royaume, puis -> (Back Up).",
      "",
      "",
      "effects/time Ajoutez 1 effects/check dans l'ordre. *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {gold: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ["Catastrophe", "", "Terrain", "Terrain"],
    choice: false,
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
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 59,
    name: ["Grotte Mystérieuse", "Souterrains", "Trésor", "Civilisation Oubliée"],
    resources: [
      [],
      [ { fame: 2 } ],
      [ { gold: 2, fame: 8 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      "",
      "",
      "effects/passive Reste en jeu. ",
      "effects/activate Défaussez 6 cartes alliées pour découvrir un Artefact (108).",
    ],
    upgrades: [
      [{ cost: {}, nextSide: 2, otherCost: "1 Personne" }],
      [{ cost: {}, nextSide: 4, otherCost: "2 Personnes" }],
      [],
      [{ cost: { gold: 1, ingot: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 60,
    name: ["Bandit d'Elite", "", "Travailleur", ""],
    resources: [
      [ { fame: -5 } ],
      [],
      [],
      [],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ) et gagner 3 ressources au choix.",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 61,
    name: ["Prince des Ténèbres", "", "Garçon Admiratif", "Ecuyer"],
    resources: [
      [ { fame: -7 } ],
      [],
      [],
      [ { fame: 3 } ],
    ],
    effects: [
      "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni utiliser effects/time . effects/activate Dépensez resources/military resources/military resources/military resources/military resources/military pour vaincre (->).",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 62,
    name: ["Camp", "Camp d'entrainement", "Sir __", ""],
    resources: [
      [ { gold: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { military: 2, fame: 3 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "", "Personne - Chevalier"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 63,
    name: ["Terres Lointaines", "Auberge", "Muraille", "Aubergiste"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { gold: 2, fame: 2 }
      ],
      [
        { military: 1, fame: 3 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      " ",
      "",
      "effects/passive Reste en jeu. ",
      "effects/activate Défaussez une autre Personne pour gagner 2 ressources de votre choix.",
    ],
    upgrades: [
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { gold: 6 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Personne"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 64,
    name: ["Bandit d'Elite", "", "Exploitant", ""],
    resources: [
      [ { fame: -5 } ],
      [],
      [],
      [],
    ],
    effects: [
      "effects/forced Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/military resources/military resources/military pour vaincre ( effects/destroy ) et gagner 3 ressources au choix. (Peut être -> (Front Up) par un Missionaire)",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 65,
    name: ["Tornade", "", "Innodations", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 3 cartez alliées du royaume. Puis -> (Back Up).",
      "",
      "effects/passive Reste en jeu. effects/forced Bloque tous les Bâtiments (max 5). effects/forced Fin de Manche: Détruisez cette carte et 1 Bâtiment bloqué ou 2 autres cartes alliées.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Catastrophe", "", "Catastrophe", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, true, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 66,
    name: ["Jeune Princesse", "Princesse Pourrie Gâtée", "Princesse Bien Elevée", ""],
    resources: [
      [ { fame: 2 } ],
      [],
      [ { fame: 8 } ],
      [],
    ],
    effects: [
      "effects/forced Fin du Tour: Défaussez 2 Personnes ou Front Down.",
      "effects/forced Carte Jouée: Défaussez 2 cartes alliées en jeu.",
      "effects/activate Gagnez 1 ressource de votre choix.",
      "",
    ],
    upgrades: [
      [{ cost: {}, nextSide: 3, otherCost: "2 Personnes, 2 Terrains, 2 Bâtiments" }],
      [{ cost: {}, nextSide: 1, otherCost: "2 Personnes" }],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "Personne", "Personne - Dame", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 67,
    name: ["Maladie", "Diminué", "Festin", ""],
    resources: [
      [ { fame: -8 } ],
      [ { fame: -2 } ],
      [],
      [],
    ],
    effects: [
      "effects/forced Carte Jouée: Défaussez la prochaine carte de votre pioche.",
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
    currentSide: 1,
    type: ["Evénement", "Etat - Permanente", "Evénement", ""],
    choice: false,
    checkboxes: [],
    enemy: [true, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 68,
    name: ["STOP !", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Parchemin", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 69,
    name: ["Touche Finale", "", "Banquet", ""],
    resources: [
      [],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Evénement", "", "Evénement", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 70,
    name: ["Visite Royale", "", "Inquisitrice", ""],
    resources: [
      [],
      [],
      [ { gold: 1 } ],
      [],
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
    currentSide: 1,
    type: ["Evénement", "", "Personne", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: true,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 71,
    name: ["Montagnes Lointaines", "Zone Rocheuse", "Mine Profonde", "Carrière"],
    resources: [
      [
        { gold: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, ingot: 1, fame: 3 }
      ],
      [
        { stone: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 72,
    name: ["Forêt", "Coupe Rase", "Puit Sacré", "Cabane de Bûcheron"],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { gold: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 73,
    name: ["Canyon de l'Ouest", "Mineurs", "Muraille", "Travaux Forcés"],
    resources: [
      [
        { stone: 1 },
        { ingot: 1 }
      ],
      [ { stone: 1, ingot: 1, fame: 2 } ],
      [ { military: 1, fame: 3 } ],
      [ { stone: 2, ingot: 2, fame: -3 } ],
    ],
    effects: [
      "",
      "Peut compter comme 2 Personnes.",
      "effects/passive Reste en jeu.",
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
    currentSide: 1,
    type: ["Terrain", "Personne", "Bâtiment", "Evénement"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 74,
    name: ["Littoral", "Chantiers Navals", "Route Commerciale", "Navire Marchand"],
    resources: [
      [ { gold: 1 } ],
      [
        { gold: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { ingot: 1 },
        { export: 1, fame: 13 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { export: 1, fame: 6 }
      ],
    ],
    effects: [
      "",
      "",
      "effects/forced Carte Jouée: Découvrez le Pirate (76).",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood : 2}, nextSide: 3, otherCost: "2 Personnes" }],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Maritime - Navire", "Maritime - Navire"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 75,
    name: ["Littoral", "Chantiers Navals", "Route Commerciale", "Navire Marchand"],
    resources: [
      [ { gold: 1 } ],
      [
        { gold: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { ingot: 1 },
        { export: 1, fame: 13 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { export: 1, fame: 6 }
      ],
    ],
    effects: [
      "",
      "",
      "effects/forced Carte Jouée: Découvrez le Pirate (76).",
      "",
    ],
    upgrades: [
      [{ cost: { gold: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { gold: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 1, wood : 2}, nextSide: 3, otherCost: "2 Personnes" }],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Maritime - Navire", "Maritime - Navire"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 76,
    name: ["Pirate", "", "Précieux Allié", ""],
    resources: [
      [ { fame: -2 } ],
      [],
      [
        { military: 1 },
        { ingot: 1, fame: 3 }
      ],
      [{ ...emptyResource } ],
    ],
    effects: [
      "effects/passive Reste en jeux. effects/passive Lorsque vous gagnez des resources/gold , gagnez 1 resources/gold de moins. effects/activate Dépensez resources/military resources/military pour vaincre ( effects/destroy ) puis découvrez le Lagon (77).",
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
    currentSide: 1,
    type: ["Ennemi", "", "Personne - Maritime", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 77,
    name: ["Lagon", "Canoë", "Île Luxuriante", "Porte Maritime Fortifiée"],
    resources: [
      [ { gold: 1 } ],
      [],
      [ { military: 1, fame: 3 } ],
      [ { gold: 2, export: 1 } ],
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
    currentSide: 1,
    type: ["Terrain", "Maritime", "Bâtiment", "Terrain - Maritime"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 78,
    name: ["Statue", "Monument", "Colonne Dorée", "Obélisque"],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 5 } ],
      [ { fame: 15 } ],
      [ { fame: 10 } ],
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
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 79,
    name: ["Villa", "Demeure", "Palais", "Manoir"],
    resources: [
      [],
      [ { fame: 3 } ],
      [ { fame: 12 } ],
      [ { fame: 7 } ],
    ],
    effects: [
      "effects/optional Fin du Tour: Défaussez pour que 1 Personne reste en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 2 Personne restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 2 cartes restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 1 carte reste en jeu.",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 4, stone: 2 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 80,
    name: ["Coopération", "", "Faveur", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Défaussez 2 Personnes pour gagner 3 ressources au choix puis ->.",
      "",
      "effects/passive Reste en jeu. effects/activate Gagnez une ressource au choix, puis ->.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Evénement", "", "Evénement", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 81,
    name: ["Domaine Aethien", "Domaine Aethien", "Domaine Aethien", "Domaine Aethien"],
    resources: [
      [],
      [ { fame: 3 } ],
      [ { fame: 10 } ],
      [ { fame: 6 } ],
    ],
    effects: [
      "",
      "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 1 autre carte.",
      "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 3 autres cartes.",
      "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 2 autres cartes.",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { wood: 3, stone: 3 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 82,
    name: ["Autel", "Sanctuaire", "Temple", "Oratoire"],
    resources: [
      [
        { fame: 3 }
      ],
      [
        { fame: 5 }
      ],
      [
        { fame: 15 }
      ],
      [
        { fame: 9 }
      ],
    ],
    effects: [
      "effects/optional Fin du Tour : Défaussez pour que 1 autre carte reste en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 2 autres cartes restent en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 4 autres cartes restent en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 3 autres cartes restent en jeu.",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 83,
    name: ["Autel", "Sanctuaire", "Temple", "Oratoire"],
    resources: [
      [
        { fame: 3 }
      ],
      [
        { fame: 5 }
      ],
      [
        { fame: 15 }
      ],
      [
        { fame: 9 }
      ],
    ],
    effects: [
      "effects/optional Fin du Tour : Défaussez pour que 1 autre carte reste en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 2 autres cartes restent en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 4 autres cartes restent en jeu.",
      "effects/optional Fin du Tour : Défaussez pour que 3 autres cartes restent en jeu.",
    ],
    upgrades: [
      [{ cost: { gold: 3 }, nextSide: 2 }],
      [{ cost: { gold: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 84,
    name: ["Mine", "Mine Profonde", "Mine de Diamant", "Mine de Rubis"],
    resources: [
      [
        { stone: 1, ingot: 1, fame: 4 }
      ],
      [
        { stone: 1, ingot: 2, fame: 6 }
      ],
      [
        { stone: 1, ingot: 2, export: 2, fame: 13 }
      ],
      [
        { stone: 1, ingot: 2, export: 1, fame: 9 }
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
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 85,
    name: ["Mine", "Mine Profonde", "Mine de Diamant", "Mine de Rubis"],
    resources: [
      [
        { stone: 1, ingot: 1, fame: 4 }
      ],
      [
        { stone: 1, ingot: 2, fame: 6 }
      ],
      [
        { stone: 1, ingot: 2, export: 2, fame: 13 }
      ],
      [
        { stone: 1, ingot: 2, export: 1, fame: 9 }
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
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 86,
    name: ["Adoubement", "", "Rénovation", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/gold resources/military et \"Chevalier\" à 1 Personne, puis ->.",
      "",
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/wood / resources/stone et resources/ingot / resources/export à 1 Bâtiment, puis effects/destroy .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Evénement", "", "Evénement", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 87,
    name: ["Quêtes", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time défaussez des Personnes (1, 2, 2, 3, 3, 4, 5, 6, 7) pour cocher la case de gauche à droite.",
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
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 88,
    name: ["Une Tour Idéale", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/stone (1 à 10, incrément de 1) pour cocher la case de gauche à droite.",
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
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "", ""],
    choice: false,
    checkboxes: [
      [ {content: "fame x3", checked: false},
        {content: "fame x6", checked: false},
        {content: "fame x10", checked: false},
        {content: "fame x15", checked: false},
        {content: "fame x22", checked: false},
        {content: "fame x30", checked: false},
        {content: "fame x38", checked: false},
        {content: "fame x48", checked: false},
        {content: "fame x60", checked: false},
        {content: "fame x75", checked: false}
      ],
      [],
      [],
      []
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 89,
    name: ["Fosse Insondable", "Puits du Village", "Colonie de la Fosse", "Prison"],
    resources: [
      [ { stone: 1 } ],
      [ { fame: 3 } ],
      [ { wood: 1, stone: 1, fame: 1 } ],
      [ { military: 1 } ],
    ],
    effects: [
      "",
      "effects/passive La production des Bâtiments gagne +1 resources/gold .",
      "effects/activate Marquer 1 effects/check , une fois complet ->.",
      "effects/passive Reste en jeu. effects/activate Marquez 1 effects/check une des cases au choix pour défausser 1 Ennemi. (Vaut 2 resources/fame par effects/check .)",
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false}
      ],
      [
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "military", checked: false},
        {content: "military", checked: false},
        {content: "gold", checked: false},
        {content: "gold x2", checked: false},
        {content: "gold x3", checked: false}
      ],
      [],
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 90,
    name: ["Bijoux", "", "", ""],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/ingot (1 à 10, incrément de 1) pour cocher la case de gauche à droite, puis gagnez 5 resources/export .",
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
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 91,
    name: ["Construire une Arche", "", "L'Arche", ""],
    resources: [
      [],
      [],
      [ { fame: 24 } ],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/wood (2 à 10, incrément de 2) pour cocher la case de gauche à droite, une fois complétée, ->",
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
    currentSide: 1,
    type: ["Parchemin - Permanente", "", "Maritime", ""],
    choice: false,
    checkboxes: [
      [
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false},
        {content: "", checked: false}
      ],
      [],
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
        {content: "", checked: false}
      ],
      []
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 92,
    name: ["__", "", "__", ""],
    resources: [
      [ { } ],
      [],
      [ { } ],
      [],
    ],
    effects: [
      "effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez resources/military / resources/fame x5. effects/forced Jouée la 3ème fois: Ajoutez resources/export / resources/fame x5.",
      "",
      "effects/passive Reste en jeu. effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ). effects/forced Jouée la 3ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ).",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 93,
    name: ["Chasse au Trésor", "Baie des Pirates", "Trésor Pirate", "Carte au Trésor"],
    resources: [
      [],
      [],
      [ { gold: 2, fame: 15 } ],
      [ { gold: 1, fame: 5 } ],
    ],
    effects: [
      "",
      "effects/forced Fin du Tour: Hélas, vous découvrez un Traître (94).",
      "",
      "",
    ],
    upgrades: [
      [ {cost: {gold: 1, wood: 1, ingot: 1}, nextSide: 2} ],
      [ {cost: {military: 1, ingot: 1}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ {cost: {}, nextSide: 3, otherCost: "2 Maritimes" } ],
    ],
    currentSide: 1,
    type: ["Maritime", "Maritime", "Evénement", "Maritime"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 94,
    name: ["Traître", "", "Malédiction", ""],
    resources: [
      [ { fame: -2 } ],
      [],
      [],
      [],
    ],
    effects: [
      "effects/forced Carte Jouée: Défaussez 2 Personnes. effects/activate Dépensez resources/military resources/military resources/military resources/military pour vaincre ( effects/destroy ).",
      "",
      "effects/passive Lorsque vous Progressez, jouez 2 cartes supplémentaires.",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Ennemi", "", "Evénement", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 95,
    name: ["Astronome", "", "Astrologue", ""],
    resources: [
      [],
      [],
      [ { military: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour inscrire 1 effects/check . (Vaut 2 resources/fame par effects/check )",
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 96,
    name: ["Alchimiste", "Potion de Force", "Potion d'Amour", "Potion de Soin"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/military resources/military resources/military .",
      "effects/activate Réinitialisez cette carte pour gagner resources/export resources/export resources/export resources/export resources/export .",
      "effects/optional Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "Potion - Objet", "Potion - Objet", "Potion - Objet"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 97,
    name: ["Rouet", "Soie", "Mode", "Exportation d'Etoffe"],
    resources: [
      [ { fame: 2 } ],
      [ { export: 1, fame: 4 } ],
      [ { export: 3, fame: 10 } ],
      [ { export: 2, fame: 6 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/gold resources/gold pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/military resources/military resources/military ",
      "effects/activate Réinitialisez cette carte pour gagner resources/export resources/export resources/export resources/export resources/export .",
      "effects/optional Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [ { cost: { gold: 2 }, nextSide: 2 } ],
      [ { cost: { gold: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Invention", "Invention", "Invention", "Invention"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 98,
    name: ["Boussole", "Navigation", "Calendrier", "Astrolabe"],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 8 } ],
      [ { fame: 15 } ],
      [ { fame: 15 } ],
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
    currentSide: 1,
    type: ["Maritime", "Maritime", "Invention", "Maritime"],
    choice: false,
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
      ],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 99,
    name: ["Châtiment Publique", "Instrument de Torture", "Ere Post-Barbare", "Salle de Torture"],
    resources: [
      [ { military: 1, fame: -2 } ],
      [ { military: 1, export: 1, fame: -3 } ],
      [ { fame: 15 } ],
      [ { military: 2, fame: -6 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [ { cost: { ingot: 2 }, nextSide: 2 } ],
      [ { cost: { ingot: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { gold: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Invention", "Invention - Objet", "Etat", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 100,
    name: ["Scierie Publique", "Industrie du Bois", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { wood: 3, fame: 3 } ],
      [ { wood: 4, fame: 3 } ],
      [ { export: 2, fame: 4 } ],
      [
        { wood: 2 },
        { export: 2, fame: 6 }
      ],
    ],
    effects: [
      "",
      "effects/activate Découvrez Construire une Arche (91).",
      "",
      "effects/passive resources/export et resources/wood peuvent être utilisés de manière interchangeable.",
    ],
    upgrades: [
      [ { cost: { wood: 3 }, nextSide: 2 } ],
      [],
      [ { cost: { gold: 4 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Maritime"],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 101,
    name: ["Scierie Publique", "Industrie du Bois", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { gold: 3, fame: 4 } ],
      [ { gold: 4, fame: 8 } ],
      [ { gold: 2, fame: 3 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      "",
      "effects/passive Reste en jeu.",
      "effects/optional Fin du Tour: 2 cartes au choix restent en jeu.",
      "effects/optional Fin du Tour: cette carte ou une autre au choix reste en jeu.",
    ],
    upgrades: [
      [ { cost: { wood: 4 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, ingot: 2 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment - Terrain", "Bâtiment", "Bâtiment"],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 102,
    name: ["Bateaux de Pêche", "Comme un Poisson (dans l'eau)", "Exportation de Bois", "Cargaison de Bois"],
    resources: [
      [ { gold: 3, fame: 2 } ],
      [ { gold: 2, export: 2, fame: 4 } ],
      [ { fame: 13 } ],
      [ { gold: 2, fame: 4 } ],
    ],
    effects: [
      "",
      "",
      "effects/activate Inscrivez 1 effects/check . Une fois complété, Back Down.",
      "effects/passive La production de chaque carte maritime augmente de +1 resources/gold .",
    ],
    upgrades: [
      [ { cost: { wood: 2, gold: 1, ingot: 1 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, ingot: 2 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ["Maritime", "Maritime", "Maritime", "Etat - Permanente"],
    choice: true,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 103,
    name: ["Missionaire", "", "Apiculteur", ""],
    resources: [
      [],
      [],
      [ { gold: 1, fame: 2 } ],
      [],
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: "", checked: false }, { content: "", checked: false },
        { content: "", checked: false }, { content: "", checked: false },
      ],
      [],
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 104,
    name: ["Prêtre", "", "Cardinal", ""],
    resources: [
      [],
      [],
      [ { fame: 5 } ],
      [],
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 105,
    name: ["Petit Village sur la Colline", "Village sur la Colline", "Ville sur la Colline", "Grande Ville"],
    resources: [
      [ { fame: 6 } ],
      [ { fame: 8 } ],
      [ { fame: 12 } ],
      [ { fame: 10 } ],
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 106,
    name: ["Camelot", "Camelot", "Camelot", "Camelot"],
    resources: [
      [ { fame: 15 } ],
      [ { fame: 20 } ],
      [ { fame: 30 } ],
      [ { fame: 40 } ],
    ],
    effects: [
      "",
      "",
      "effects/optional Fin du Tour: Si votre pioche est vide, inscrivez 1 effects/check . (Vaut 5 resources/fame par effects/check )",
      "",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 1, stone: 3, ingot: 2 }, nextSide: 4 } ],
      [],
      [ { cost: { stone: 6, ingot: 3 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 107,
    name: ["Visite Royale", "", "Inquisitrice", ""],
    resources: [
      [],
      [],
      [ { gold: 1 } ],
      [],
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
    currentSide: 1,
    type: ["Evénement", "", "Personne", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 108,
    name: ["Cristal Ethéré Royale", "", "", ""],
    resources: [
      [ { fame: 10 } ],
      [],
      [],
      [],
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
    currentSide: 1,
    type: ["Artefact - Permanente", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 109,
    name: ["Petite Guilde", "Guilde", "Manoir de la Guilde", "Hotêl de la Guilde"],
    resources: [
      [ { gold: 1 } ],
      [
        { gold: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { gold: 1, wood: 1, stone: 1 } ],
      [
        { gold: 1 },
        { wood: 1 },
        { stone: 1, fame: 3 }
      ],
    ],
    effects: [
      "",
      "",
      "effects/activate Défaussez le nombre de personne de votre choix pour gagner autant de resources/fame . Puis inscrivez 1 effects/check .",
      "",
    ],
    upgrades: [
      [ { cost: { wood: 2 }, nextSide: 2, otherCost: "1 Personne" } ],
      [ { cost: { stone: 2 }, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ { cost: { stone: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 110,
    name: ["Grange", "Grande Grange", "Campagne", "Campagne Prospère"],
    resources: [
      [ { gold: 1 } ],
      [
        { gold: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { gold: 2, wood: 1, fame: 5 } ],
      [ { gold: 1, wood: 1, fame: 3 } ],
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
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 111,
    name: ["Manoir", "Grand Manoir", "Imposante Demeur", "Noble Demeur"],
    resources: [
      [ { gold: 6 } ],
      [ { gold: 6 } ],
      [ { gold: 3, fame: 5 } ],
      [ { gold: 6 } ],
    ],
    effects: [
      "effects/forced Lorsqu'elle produit réduisez les resources/gold de 1.",
      "effects/forced Lorsqu'elle produit réduisez les resources/gold de 1.",
      "effects/time Découvrez un Noble (116).",
      "effects/forced Lorsqu'elle produit réduisez les resources/gold de 1.",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 112,
    name: ["Etable", "Etable", "Palfrenier", "Grande Etable"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/time Dépensez resources/gold resources/gold pour découvrir un cheval (113).",
      "effects/time Dépensez resources/gold resources/gold pour découvrir un cheval (114).",
      "effects/activate Choisissez un Cheval en jeu avec 1 ou 2 ressources et ajoutez-lui resources/gold / resources/wood / resources/stone / resources/ingot / resources/military . effects/activate Jouez un cheval depuis la défausse.",
      "effects/time Dépensez resources/gold resources/gold pour découvrir un cheval (115).",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { gold: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Personne", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 113,
    name: ["Cheval", "", "", ""],
    resources: [
      [ { gold: 1 } ],
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
    currentSide: 1,
    type: ["Elevage - Cheval", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 114,
    name: ["Cheval", "", "", ""],
    resources: [
      [ { military: 1 } ],
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
    currentSide: 1,
    type: ["Elevage - Cheval", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 115,
    name: ["Cheval", "", "", ""],
    resources: [
      [
        { wood: 1 },
        { stone: 1 }
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
    currentSide: 1,
    type: ["Elevage - Cheval", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 116,
    name: ["Aric Blackwood", "", "Eadric Shadowstrike", ""],
    resources: [
      [ { gold: 2 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Carte Jouée: vous devez défausser une carte en jeu.",
      "",
      "effects/passive Reste en jeu. effects/activate Défaussez 2 Personnes pour gagner resources/military resources/military resources/military .",
      "",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 117,
    name: ["Relations Commerciales", "", "", ""],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Dépensez resources/export resources/export resources/export pour gagner une ressource au choix.",
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
    currentSide: 1,
    type: ["Permanente", "", "", ""],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 118,
    name: ["Petite Ecole", "Ecole", "Ecole Réputée", "Ecole Reconnue"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { fame: 6 } ],
      [ { fame: 4 } ],
    ],
    effects: [
      "effects/time Améliorez gratuitement 1 Personne en jeux, puis Front Down.",
      "effects/time Améliorez gratuitement 1 Personne en jeux, puis Back Down.",
      "effects/time Ajoutez 1 ressource à une Personne en jeux, puis effects/oneTime.",
      "effects/time Ajoutez 1 ressource à une Personne en jeux, puis Back Up.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 119,
    name: ["Commerçante", "Bazar", "Festival", "Marché"],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { gold: 1 },
        { wood: 1 },
        { stone: 1 },
        { ingot: 1, fame: 4 }
      ],
      [
        { fame: 3 }
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
    currentSide: 1,
    type: ["Personne", "Bâtiment", "Evénement", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 120,
    name: ["Investisseur", "Investisseur", "Investisseur", "Investisseur"],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/activate Gagnez 3 ressources au choix, puis Front Down.",
      "effects/activate Gagnez 3 ressources au choix, puis Back Down.",
      "effects/activate Gagnez 1 ressource au choix.",
      "effects/activate Gagnez 3 ressources au choix, puis Back Up.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ["Personne - Dame", "Personne - Dame", "Personne - Dame", "Personne - Dame"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 121,
    name: ["Roi Alahar", "", "Reine Jemimah", ""],
    resources: [
      [ { military: 2, fame: -5 } ],
      [ { ...emptyResource} ],
      [ { gold: 1 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Reste en jeu.",
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
    currentSide: 1,
    type: ["Personne", "", "Personne - Dame", ""],
    choice: true,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 122,
    name: ["Consort Royal", "", "Consort Royal", ""],
    resources: [
      [ { gold: 1, export: 2 } ],
      [ { ...emptyResource} ],
      [ { wood: 1, stone: 1 } ],
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
    currentSide: 1,
    type: ["Personne - Dame", "", "Personne - Chevalier", ""],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 123,
    name: ["Château Majestueux", "Château Monumental", "Forteresse", "Forteresse Imprenable"],
    resources: [
      [ { military: 1, fame: 15 } ],
      [ { military: 2, fame: 20 } ],
      [ { military: 3, fame: 30 } ],
      [ { military: 2, fame: 25 } ],
    ],
    effects: [
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse. effects/optional Vous pouvez défausser 2 Murailles à la place de cette carte.",
      "effects/activate Jouez 1 carte depuis la défausse.",
    ],
    upgrades: [
      [ {cost: { wood: 2, stone: 2, ingot: 2 }, nextSide: 2} ],
      [ {cost: { stone: 3, ingot: 3 }, nextSide: 4} ],
      [],
      [ {cost: { stone: 4, ingot: 4 }, nextSide: 2} ],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 124,
    name: ["Extraction de joyaux", "Taille de Joyau", "Exposition du Joyau", "Polissage du Joyau"],
    resources: [
      [ { stone: 1, ingot: 2, export: 2, fame: 15 } ],
      [ { ingot: 2, export: 3, fame: 18 } ],
      [ { ingot: 3, export: 6, fame: 25 } ],
      [ { ingot: 3, export: 4, fame: 21 } ],
    ],
    effects: [
      "",
      "",
      "",
      "",
    ],
    upgrades: [
      [ {cost: { wood: 2, ingot: 2 }, nextSide: 2} ],
      [ {cost: { wood: 2, ingot: 3 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 2, ingot: 4 }, nextSide: 2} ],
    ],
    currentSide: 1,
    type: ["Evénement", "Evénement", "Evénement", "Evénement"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 125,
    name: ["Grand Temple", "Temple Sculpté", "Temple de la Lumière", "Temple Légendaire"],
    resources: [
      [ { stone: 1, fame: 18 } ],
      [ { fame: 22 } ],
      [ { fame: 30 } ],
      [ { fame: 28 } ],
    ],
    effects: [
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu. effects/time dépensez resources/export resources/export resources/export resources/export resources/export pour inscrire 1 effects/check .(Quand vous la purgez, cette carte vaut +10 resources/fame par effects/check .",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    ],
    upgrades: [
      [ { cost: { gold: 3, export: 3 }, nextSide: 2 } ],
      [ { cost: { gold: 3, stone: 3, export: 3 }, nextSide: 4 } ],
      [],
      [{ cost: { export: 8 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ["Bâtiment", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: "", checked: false}, {content: "", checked: false},
        {content: "", checked: false}, {content: "", checked: false},
      ],
      []
    ],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 126,
    name: ["Forêt de Pins", "Forêt de Pins", "Mare", "Mare Poissonneuse"],
    resources: [
      [ { wood: 1 } ],
      [ { wood: 2 } ],
      [ { gold: 1 } ],
      [ { gold: 2, export: 1 } ],
    ],
    effects: [
      "",
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 127,
    name: ["Rochers", "Rochers", "Champignons", "Champignons"],
    resources: [
      [ { stone: 1 } ],
      [ { stone: 2 } ],
      [ { export: 1 } ],
      [ { export: 1 } ],
    ],
    effects: [
      "",
      "",
      "",
      "effects/passive Défaussez 1 Personne pour gagner resources/export resources/export .",
    ],
    upgrades: [
      [ { cost: { ingot: 2 }, nextSide: 2 } ],
      [],
      [ { cost: {}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: true,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 128,
    name: ["Ravin", "Gouffre", "Site de Fouilles", "Ruines Antiques"],
    resources: [
      [],
      [],
      [ { gold: 1, export: 1 } ],
      [],
    ],
    effects: [
      "",
      "",
      "Vaut 7 par effects/check . effects/time Défaussez 1 Personne et dépensez resources/stone resources/stone resources/stone pour inscrire effects/check .",
      "",
    ],
    upgrades: [
      [ { cost: { gold: 2, wood: 2 }, nextSide: 2 } ],
      [ { cost: {}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ { cost: {}, nextSide: 3, otherCost: "2 Personnes" } ],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 129,
    name: ["Sources Chaudes", "Fontaine", "Rivière d'Eau Pure", "Canaux"],
    resources: [
      [],
      [ { fame: 2 } ],
      [ { fame: 9 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      "effects/optional Lorsque vous l'améliorez ajoutez 1 resources/gold à un Terrain en jeu.",
      "effects/optional Lorsque vous l'améliorez boostez 1 carte en jeu.",
      "",
      "effects/optional Lorsque vous l'améliorez 1 Terrain gagne \" effects/passive Reste en jeu. \".",
    ],
    upgrades: [
      [ { cost: { gold: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 2 }, nextSide: 4 } ],
      [],
      [ { cost: {}, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Terrain", "Terrain", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 130,
    name: ["Ville Frontalière", "Tour de Garde", "Mur Intérieur", "Double Muraille"],
    resources: [
      [ { gold: 1 } ],
      [ { military: 1, fame: 4 } ],
      [ { military: 1, fame: 3 } ],
      [ { military: 2 } ],
    ],
    effects: [
      "",
      "effects/passive Vous pouvez regardez les 2 cartes du dessus de votre pioche.",
      "effects/passive Reste en jeu.",
      "Vaut 4 resources/fame pour chaque Murailles, celle-ci incluse effects/passive Reste en jeu.",
    ],
    upgrades: [
      [
        { cost: { gold: 1, wood: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [],
      [{ cost: { wood: 2, stone: 4}, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ["Terrain", "Bâtiment", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 131,
    name: ["Plaines du Nord", "Douves", "Muraille", "Pont des Douves"],
    resources: [
      [ { gold: 1 } ],
      [ { military: 1, fame: 2 } ],
      [ { military: 1, fame: 3 } ],
      [ { military: 1, fame: 3 } ],
    ],
    effects: [
      "",
      "effects/activate Défaussez une autre carte pour gagner resources/military resources/military .",
      "effects/passive Reste en jeu.",
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 132,
    name: ["Collines Meridionales", "Terrasses", "Moulin à Vent", "Murailles"],
    resources: [
      [ { gold: 1 } ],
      [ { military: 1, fame: 2 } ],
      [ { gold: 3, fame: 4 } ],
      [ { military: 1, fame: 3 } ],
    ],
    effects: [
      "",
      "",
      "",
      "effects/passive Reste en jeu.",
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
    currentSide: 1,
    type: ["Terrain", "Terrain", "Bâtiment", "Bâtiment"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 133,
    name: ["Raid", "Razzia", "Saccage", "Pillage"],
    resources: [
      [],
      [],
      [ { fame: 5 } ],
      [ { fame: 3 } ],
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
    currentSide: 1,
    type: ["Evénement", "Evénement", "Evénement", "Evénement"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 134,
    name: ["Rival Beau-Gosse", "", "Allié Noble", ""],
    resources: [
      [],
      [],
      [ { fame: 6 } ],
      [],
    ],
    effects: [
      "effects/passive Ne peut pas être détruit, à moins que Lord Nimrod n'ai été détruit. effects/activate Défaussez Lord Nimroy et dépensez les ressources d'une case pour inscrire effects/check . Une fois complétées, -> (Back Up). Vaut -5 pour chaque case non effects/check .",
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
    currentSide: 1,
    type: ["Personne", "", "Personne", ""],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 135,
    name: ["Terres Frontalières", "Occupation", "Etats Vassaux", "Villages Alliés"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/passive Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration. Toutes les étapes ont la même valeur que l'étape finale.",
      "effects/passive Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration.",
      "effects/activate Réinitialisez cette carte.",
      "effects/passive Dépensez resources/military resources/military resources/military resources/military resources/military  pour ignorer 1 resources/military du coup d'amélioration. Lorsque vous l'améliorez, ajoutez 20 resources/fame à l'étape finale (Back Up).",
    ],
    upgrades: [
      [ { cost: { military: 12 }, nextSide: 2 } ],
      [ { cost: { military: 9 }, nextSide: 4 } ],
      [],
      [ { cost: { military: 8 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ["Terrain - Ennemi", "Evénement", "Terrain", "Terrain"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 136,
    name: ["Prospérité (extension)", "Engranger des réserves", "Décret Royal", "Soulèvement"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle la production de toutes les cartes alliées ont +1 resources/gold , puis ->.",
      "Jouez 1 manche durant laquelle une carte de votre choix reste en jeu à chaque tour, puis ->.",
      "Jouez 1 manche. Puis, pour chaque effects/check sur Soulèvement, vous devez barrer 1 production sur 1 carte. Après quoi, détruisez cette extension.",
      "Jouez 1 manche durant laquelle vous devez inscrire 1 effects/check à chaque fois qu'une Personne est jouée alors qu'une autre Personne est déjà en jeu, puis ->.",
    ],
    upgrades: [
      [ {cost: { }, nextSide: 2} ],
      [ {cost: { }, nextSide: 3} ],
      [],
      [ {cost: { }, nextSide: 4} ],
    ],
    currentSide: 1,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 137,
    name: ["Le Moulin à Eau (extension)", "Récolte Productive", "Fermes Abandonnées", "Surplus"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle vous pouvez gagner resources/gold resources/gold resources/gold une fois par tour, puis ->.",
      "Jouez 1 manche. effects/time Défaussez 2 Bâtiments pour ajouter une resources/gold à un Terrain en jeu, puis ->.",
      "Jouez 1 manche. Puis, détruisez cette extension avec 1 carte avec une production d' resources/gold .",
      "Jouez 1 manche durant laquelle les Terrains produisent de l' resources/gold peuvent produire des resources/export à la place, puis ->.",
    ],
    upgrades: [
      [ {cost: { }, nextSide: 2} ],
      [ {cost: { }, nextSide: 3} ],
      [],
      [ {cost: { }, nextSide: 4} ],
    ],
    currentSide: 1,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    choice: false,
    checkboxes: [],
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
  { id: 138,
    name: ["Frontière Contestée (extension)", "Espionnage", "Résistance", "Attaque"],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle tous les Terrains restent en jeu, puis ->.",
      "Jouez 1 manche, puis ->. effects/forced Lorsqu'une Personne est jouée, inscrivez 1 effects/check ou défaussez 2 cartes alliées. Une fois complétée, défaussez toute votre pioche.",
      "Jouez 1 manche durant laquelle vous pouvez dépenser autant d' resources/military que vous le souhaitez pour les mettre sur cette carte. Après la manche, ajoutez autant de resources/fame (max 100) à un Terrain. Puis détruisez cette extension.",
      "Jouez 1 manche. effects/forced Fin du Tour: Si vous n'avez aucune resources/military , enlevez 1 production d'1 carte en jeu. effects/forced Fin de Manche: Ajoutez une ressource (non- resources/fame ) au choix à une carte alliée, puis ->.",
    ],
    upgrades: [
      [ {cost: { }, nextSide: 2} ],
      [ {cost: { }, nextSide: 3} ],
      [],
      [ {cost: { }, nextSide: 4} ],
    ],
    currentSide: 1,
    type: ["Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente", "Evénement - Permanente"],
    choice: false,
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
    enemy: [false, false, false, false],
    discoverable: false,
    GetResources: function (): Partial<ResourceMap>[] {
      throw new Error("Function not implemented.");
    },
    GetEffect: function (): string {
      throw new Error("Function not implemented.");
    },
    GetName: function (): string {
      throw new Error("Function not implemented.");
    },
    GetType: function (): string {
      throw new Error("Function not implemented.");
    },
    GetUpgrades: function (): Upgrade[] {
      throw new Error("Function not implemented.");
    }
  },
];