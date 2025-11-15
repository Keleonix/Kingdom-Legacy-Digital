import { emptyResource, type GameCard, type ResourceMap, type Upgrade } from "./types";

export const allCards: GameCard[] = [
  { id: 0,
    name: ['welcome', '', 'golden_rules', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Assurez-vous d'avoir bien lu les règles avant de commencer à jouer (Settings -> Guide)! Retenez bien les Règles d'Or (voir -> Back Up). Après les avoirs lues, effects/destroy .",
      '',
      "1. Ne jamais changer le côté d'une carte sans qu'un effet ne vous le permette. 2. Vous pouvez regarder vos cartes mais pas celles du deck de campagne avant d'y avoir été invité. 3. Au début de chaque manche (sauf 1ère), découvrez 2 cartes suivantes depuis le deck de campagne. 4. Une carte dont le côté change est toujours immédiatement défaussée. 5. Améliorer une carte met fin à votre tour.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', 'scroll', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/coin resources/coin .",
      "effects/passive Reste en jeu. ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/coin resources/coin .",
      "effects/passive Reste en jeu. ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/coin resources/coin .",
      "effects/passive Reste en jeu. ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['wild_grass', 'plains', 'food_barns', 'farmlands'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 3 }
      ],
      [
        { coin: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Défaussez une carte alliée pour gagner resources/coin resources/coin .",
      "effects/passive Reste en jeu. ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      '',
      "effects/destroy Découvrez un Autel (82/83).",
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      '',
      "effects/destroy Découvrez un Autel (82/83).",
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['headquarters', 'town_hall', 'castle', 'keep'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { sword: 1, fame: 3 }
      ],
      [
        { sword: 1, fame: 12 }
      ],
      [
        { sword: 1, fame: 7 }
      ],
    ],
    effects: [
      '',
      "effects/activate Jouez un Terrain depuis votre défausse.",
      "effects/activate Jouez une carte depuis votre défausse.",
      "effects/activate Jouez un Terrain ou Bâtiment depuis votre défausse.",
    ],
    upgrades: [
      [{ cost: { stone: 3, wood: 1 }, nextSide: 2 }],
      [{ cost: { stone: 4, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 6, wood: 2, metal: 1 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['trader', 'bazaar', 'festival', 'market'],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1 },
        { metal: 1, fame: 4 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin pour gagner resources/wood .",
      "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone .",
      '',
      "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone / resources/metal .",
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'event', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['jungle', 'huge_trees', 'treehouses', 'deep_jungle'],
    resources: [
      [{ ...emptyResource }],
      [
        { wood: 1 }
      ],
      [
        { coin: 1, wood: 2, fame: 4 }
      ],
      [
        { wood: 2 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin pour gagner resources/wood .",
      "effects/activate Dépensez resources/coin pour gagner resources/wood resources/wood .",
      "effects/passive Reste en jeu.",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['river', 'bridge', 'explorers', 'stone_bridge'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { coin: 1, fame: 4 }
      ],
      [
        { coin: 1, fame: 4 }
      ],
    ],
    effects: [
      " ",
      '',
      "effects/activate Découvrez un nouveau territoire (71/72/73/74). Puis -> Back Down.",
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'person', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['field_worker', '', 'servant', ''],
    resources: [
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      '',
      "effects/activate Gagnez resources/coin / resources/wood / resources/stone .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['bandit', '', 'worker', ''],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte Jouée : Bloque 1 carte avec production d' resources/coin . effects/activate Dépensez resources/sword pour vaincre ( effects/destroy ) et gagner 2 ressources au choix.",
      '',
      "effects/activate Choisissez un Bâtiment en jeu. Gagnez les ressources qui correspondent à sa production.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['bandit', '', 'field_worker', ''],
    resources: [
      [ { fame: -2 } ],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
      [{ ...emptyResource }],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte Jouée : Bloque 1 carte avec production d' resources/coin . effects/activate Dépensez resources/sword pour vaincre ( effects/destroy ) et gagner 2 ressources au choix.",
      '',
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['hill', 'chapel', 'cathedral', 'church'],
    resources: [
      [ { coin: 1 } ],
      [ { coin: 1, fame: 1 } ],
      [ { coin: 1, fame: 7 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      "effects/activate Dépensez  resources/coin resources/coin resources/coin pour découvrir un Missionaire (103).",
      "effects/passive Cette carte produit+1 resources/coin pour chaque Personne en jeu.",
      "effects/activate Dépensez resources/coin resources/coin resources/coin resources/coin pour découvrir un Prêtre (104).",
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, stone: 1 }, nextSide: 2 }],
      [{ cost: { wood: 2, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { metal: 1, wood: 2, stone: 3 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['east_cliffs', 'smithy', 'wall', 'arsenal'],
    resources: [
      [ { stone: 1 } ],
      [ { metal: 1, fame: 1 } ],
      [ { sword: 1, fame: 3 } ],
      [ { metal: 1, fame: 4 } ],
    ],
    effects: [
      '',
      "effects/activate Réinitialisez pour découvrir des Bijoux (90).",
      "effects/passive Reste en jeu.",
      "effects/activate Gagnez resources/sword pour chaque personne en jeu.",
    ],
    upgrades: [
      [{ cost: { stone: 1, wood: 1, metal: 2 }, nextSide: 2 },
        { cost: { stone: 3 }, nextSide: 4 }
      ],
      [{ cost: { coin: 2, metal: 2 }, nextSide: 3 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      '',
      "effects/destroy Découvrez un Autel (82/83).",
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['swamp', 'accessible_swamp', 'exotic_fruit_trees', 'swamp_garden'],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { tradegood: 2, fame: 4 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['swamp', 'accessible_swamp', 'exotic_fruit_trees', 'swamp_garden'],
    resources: [
      [{ ...emptyResource }],
      [ { fame: 1 } ],
      [ { tradegood: 2, fame: 4 } ],
      [ { coin: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['lake', 'fishermans_cabin', 'lighthouse', 'fishing_boat'],
    resources: [
      [ { coin: 1, fame: 1 } ],
      [ { coin: 1, fame: 1 } ],
      [ { fame: 5 } ],
      [ { coin: 2, tradegood: 2, fame: 1 } ],
    ],
    effects: [
      '',
      '',
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
    type: ['land', 'building', 'building', 'seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Découvrez également les cartes 24 à 27 pour cette manche.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['fertile_soil_efficiency', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Ajoutez 1 resources/coin à la production d'un terrain, puis choisissez un Bâtiment et rajoutez 1 à une ressource qu'il produit déjà.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['army', '', 'grand_army', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 50 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/time Dépensez les resources/sword (1 à 10, incrément de 1) pour cocher la case de gauche à droite, à la dernière carte, Back Up et découvrez l'Etat Vassal (135).",
      '',
      "effects/time Dépensez les resources/sword (10, 10, 12, 12, 15) pour cocher la case de gauche à droite.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
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
    negative: [false, false, false, false],
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
    name: ['treasure', '', 'extended_treseaure', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 50 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/time dépensez les resources/coin (1 à 12, incrément de 1) pour cocher la case de gauche à droite. A la dernière carte, Back Up.",
      '',
      "effects/time dépensez les resources/coin (13 à 17, incrément de 1) pour cocher la case de gauche à droite.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
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
    negative: [false, false, false, false],
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
    name: ['export', '', 'mass_export', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 25 } ],
      [ emptyResource ],
    ],
    effects: [
      "Dépensez des resources/tradegood pour atteindre des paliers, 10: Ajoutez resources/coin / resources/wood / resources/stone sur un Terrain, 20: Un Personnage gagne \" effects/passive Reste en jeu.\", 30: Découvrez Adoubement (80), 40: Ajoutez resources/metal / resources/sword / resources/tradegood sur 1 Bâtiment, 55: Ajoutez resources/wood / resources/stone / resources/metal / resources/sword sur une carte, 75: Ajoutez resources/fame x5 sur une carte, 100: -> Back Up. effects/passive Dépensez des resources/tradegood .",
      '',
      "Dépensez des resources/tradegood pour atteindre des paliers, 25: Ajoutez resources/fame sur deux Terrains, 50: Ajoutez resources/fame x5 sur une Personne, 75: Découvrez Visite Royale (107), 100: Ajoutez resources/fame x5 sur un Bâtiment, 150: effects/check une autre carte Permanente, 200: effects/check toutes les autres cartes Permanentes au choix, 250: Découvrez Relations Commerciales (117). effects/passive Dépensez des resources/tradegood .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'permanent', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['volcanic_eruption', '', 'ashlands', 'young_forest'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: -2 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/forced Tant qu'elle est en jeu, détruisez le prochain Terrain que vous jouez. Lorsque vous le faite, Back Up.",
      '',
      '',
      "effects/time Ajoutez 1 effects/check dans l'ordre et à *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {coin: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'land', 'land'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
      ],
    ],
    negative: [true, false, false, false],
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
    name: ['opportunist', 'recruit', 'labourer', 'pretend_noble'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1 } ],
      [ { stone: 1 } ],
      [ { fame: 4 } ],
    ],
    effects: [
      '',
      '',
      '',
      "effects/activate Réinitialisez pour ajouter une resource de votre choix à la production de l'une des étapes de cette carte qui ne comporte pas encore de modification.",
    ],
    upgrades: [
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 1 }, { cost: {  }, nextSide: 4 }],
      [{ cost: {  }, nextSide: 2 }, { cost: {  }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Découvrez les cartes 31 à 34, choisissez-en 2 à découvrir et détruisez les 2 autres.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['etrepeneur', 'hotel', 'tavern', 'cozy_pub'],
    resources: [
      [ { tradegood: 1 } ],
      [ { coin: 1, tradegood: 1, fame: 2 } ],
      [ { coin: 2, tradegood: 2, fame: 4 } ],
      [ { tradegood: 2, fame: 2 } ],
    ],
    effects: [
      "effects/time Découvrez l'Ecole (118).",
      "effects/activate Gagnez resources/coin par Personne en jeu.",
      "effects/activate Découvrez les Quêtes (87).",
      "effects/activate Défaussez une Personne pour découvrir un Etranger (92).",
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, tradegood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['scientist', '', 'observatory', 'lab'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 1, tradegood: 1, fame: 5 } ],
      [ { coin: 1, tradegood: 2, fame: 10 } ],
    ],
    effects: [
      "effects/passive Toutes les Personnes, Scientifique inclus, produisent +1 resources/coin .",
      '',
      "effects/time Découvrez l'Astronome (95).",
      "effects/time Découvrez l'Alchimiste (96).",
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, metal: 1 }, nextSide: 3 }],
      [],
      [{ cost: { coin: 1, stone: 2, metal: 2 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['engineer', '', 'trebuchet', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { sword: 1, fame: 1 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/activate Détruisez l'une des cartes suivantes: Cabane de Bûcheron - découvrez (100). Grange - découvrez (101). Bâteau de pêche - découvrez (102).",
      '',
      "effects/destroy Vainquez un ennemi (défausse, en jeu ou permanent). Puis marquez effects/check la case suivante de la carte Armée.",
      '',
    ],
    upgrades: [
      [{ cost: { wood: 1, stone: 2, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['inventor', '', 'inspired_inventor', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      "Vaut 5 resources/fame par effects/check .",
      '',
      "Vaut la fame de l'Inventrice. effects/activate réinitialisez et ajoutez 1 effects/check . Découvrez une invention (97/98/99) ou gagnez une ressource de votre choix pour chaque effects/check . Vaut 5 resources/fame par effects/check .",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 4 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [ {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['mercenary', '', 'sir__', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { sword: 1, fame: 3 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour ajouter 1 ou deux effects/check .",
      '',
      "effects/time Dépensez resources/metal resources/metal resources/metal pour ajouter resources/sword sur cette carte ( effects/oneTime ). effects/time Dépensez resources/metal resources/metal resources/metal resources/metal pour ajouter resources/sword sur cette carte ( effects/oneTime ). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 3, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false}
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Découvrez les cartes 38 à 42. Choisissez le côté des cartes Objectif.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['strength_in_number', '', 'military_domination', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Vaut 2 resources/fame par Personne.",
      '',
      "Vaut 2 resources/fame par production de resources/sword .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['expanding_borders', '', 'maximizer', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Votre royaume doit comprendre 70 cartes ou plus (hors permanentes). Cette carte vaut -2 resources/fame pour chaque carte manquante.",
      '',
      "Vaut -1 resources/fame par carte valant 0 resources/fame (hors permanentes).",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['loyalty', '', 'trader_obj', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Vaut 35 resources/fame s'il n'y a plus d'ennemi dans votre royaume.",
      '',
      "Vaut 25 resources/fame si votre production de resources/tradegood est de 8 ou plus.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['goal - permanent', '', 'goal - permanent', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['jester', '', 'merchant', ''],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { fame: 15 } ],
      [ emptyResource ],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/activate Défaussez la carte au sommet de votre pioche. effects/activate Ajoutez 1 effects/check .",
      '',
      "effects/activate Ajoutez 1 à 2 effects/check .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "coin, wood", checked: false},
        {content: "coin, wood", checked: false},
        {content: "coin, wood", checked: false},
        {content: "tradegood, tradegood", checked: false},
        {content: "tradegood, tradegood", checked: false}
      ],
      [],
      [
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
        {content: "coin", checked: false},
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
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false},
        {content: "metal", checked: false}
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['field_worker', '', 'storage', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production.",
      '',
      "effects/passive Reste en jeu. effects/optional Fin du Tour: Défaussez pour qu'une autre carte reste en jeu.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['mason', '', 'brick_road', 'stone_street'],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { coin: 1, fame: 3 } ],
      [ { coin: 1, fame: 7 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour découvrir un projet de bâtiment (88/89).",
      '',
      "effects/time Inspectez les cartes (109) et (110), détruisez l'une et découvrez l'autre.",
      "effects/time Inspectez les cartes (111) et (112), détruisez l'une et découvrez l'autre.",
    ],
    upgrades: [
      [{ cost: { coin: 1, stone: 2 }, nextSide: 3 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['thunderstorm', '', 'rain', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/forced Carte jouée: défaussez les 3 premières cartes de votre pioche, puis -> (Back Up).",
      '',
      "effects/passive La production des Terrains est doublée. effects/passive Vous ne pouvez jouer aucune carte. effects/forced Fin du Tour: -> (Front Up).",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['dark_knight', '', 'impressed_boy', 'squire'],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { coin: 0 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni même utiliser les effets effects/time . effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre (-> Back Up).",
      '',
      "effects/destroy Gagnez resources/sword resources/sword .",
      "effects/destroy Gagnez resources/sword resources/sword resources/sword .",
    ],
    upgrades: [
      [],
      [],
      [{ cost: { metal: 1, sword: 1 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['camp', 'training_grounds', '', 'sir__'],
    resources: [
      [ { coin: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { sword: 2, fame: 3 } ],
    ],
    effects: [
      '',
      "effects/activate Dépensez resources/coin pour gagner resources/sword .",
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, metal: 1 }, nextSide: 2 }],
      [{ cost: { metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', '', 'person - knight'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/destroy Découvrez les cartes 48 à 51. Découvrez-en 2 et détruisez les 2 autres.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['envoy', 'emissary', 'ambassador', 'diplomat'],
    resources: [
      [ emptyResource ],
      [ { fame: 1 } ],
      [ { fame: 5 } ],
      [ { fame: 2 } ],
    ],
    effects: [
      "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir une Commerçante (119).",
      "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir un Investisseur (120).",
      "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir le Consort (122).",
      "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir une allié (121).",
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 6 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 6 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['royal_architect', '', 'bridge_of_marvel', ''],
    resources: [
      [ { stone: 1 } ],
      [],
      [ { fame: 15 } ],
      [],
    ],
    effects: [
      "effects/activate Détruisez l'une des cartes suivantes: Château (10) - découvrez (123), Mine de Diamant (84/85) - découvrez (124), Temple (82/83) - découvrez (125). ",
      '',
      '',
      '',
    ],
    upgrades: [
      [ {cost: {}, nextSide: 3, otherCost: "Détruisez le Pont de Pierre (12)" } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'building', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['traveller', 'traveller', 'traveller', 'traveller'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      "effects/time Découvrez un Terrain (126).",
      "effects/time Découvrez un Terrain (127).",
      "effects/time Découvrez un Terrain (129). effects/activate Défaussez un Terrain pour gagner 2 ressources au choix.",
      "effects/time Découvrez un Terrain (128).",
    ],
    upgrades: [
      [{ cost: { tradegood: 3 }, nextSide: 2 }],
      [{ cost: { tradegood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { tradegood: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['magistrate', 'magistrate', 'strategist', 'magistrate'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
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
      [{ cost: { stone: 2, metal: 2 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 3, metal: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['mighty_mound', 'hill_settlement', 'peak_village', 'hill_village'],
    resources: [
      [ emptyResource ],
      [ { coin: 1, fame: 1 } ],
      [ { coin: 2, tradegood: 1, fame: 6 } ],
      [ { coin: 1, fame: 2 } ],
    ],
    effects: [
      '',
      '',
      "effects/activate Réinitialisez pour découvrir un Village (105). (D'autre cartes peuvent découvrir le Village)",
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { wood: 4, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['witch', '', 'witch_cabin', ''],
    resources: [
      [ { fame: -3 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ). effects/activate Défaussez 3 Personnes pour -> (Back Up). effects/forced Fin du tour: Découvrez les 2 prochaines cartes de la boîte, puis -> (Back Up).",
      '',
      "effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ). effects/activate Détruisez une Personne pour effects/destroy . effects/forced Fin du Tour: Découvre les 2 prochaines cartes de la boîte, puis effects/destroy .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['scribe', '', 'architect', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { stone: 1 } ],
      [],
    ],
    effects: [
      "effects/optional Fin du tour: Défaussez pour que 1 ou 2 autres cartes restent en jeu.",
      '',
      "effects/time Réinitialisez pour découvrir un projet de construction (78/79).",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 5 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['lord_aethan', '', 'lord_nimrod', ''],
    resources: [
      [ { coin: 1, wood: 1, stone: 1 } ],
      [],
      [ { sword: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Découvrez la Coopération (80) ou le Domaine (81). effects/passive Ajoutez 1 effects/check .",
      '',
      "effects/time Découvrez un Raid (133) et un Rival (134). effects/activate Ajoutez 1 effects/check .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        {content: "coin, coin", checked: false},
        {content: "coin, coin", checked: false},
        {content: "wood, wood", checked: false},
        {content: "wood, wood", checked: false},
        {content: "stone, stone", checked: false},
        {content: "tradegood", checked: false},
        {content: "sword", checked: false},
        {content: "metal", checked: false},
      ],
      [],
      [
        {content: "coin, coin", checked: false},
        {content: "stone, stone", checked: false},
        {content: "metal, metal", checked: false},
        {content: "sword, sword", checked: false},
        {content: "sword, sword", checked: false},
        {content: "sword, sword, sword", checked: false},
        {content: "wood", checked: false},
        {content: "metal", checked: false},
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['plague', '', 'enemy_soldier', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 2 Personnes de votre royaume. Puis -> (Back Front).",
      '',
      "effects/forced Carte Jouée: Bloque 1 Bâtiment/Terrain en jeu. effects/passive : Reste en jeu. effects/forced Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/sword resources/sword pour vaincre ( effects/destroy ).",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['assassin', '', 'enemy_soldier', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ { fame: -2 } ],
      [],
    ],
    effects: [
      "effects/forced Détruisez la prochaine Personne que vous jouez. Lorsque vous le faites, ->. effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre (->).",
      '',
      "effects/forced Carte Jouée: Bloque 1 Bâtiment/Terrain en jeu. effects/passive : Reste en jeu. effects/forced Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/sword resources/sword pour vaincre ( effects/destroy ).",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'enemy', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['city_fire', '', 'ashlands', 'young_forest'],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: -2 } ],
      [ { ...emptyResource }  ],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 1 Bâtiment de votre royaume, puis -> (Back Up).",
      '',
      '',
      "effects/time Ajoutez 1 effects/check dans l'ordre. *: Ajoutez resources/wood à la production de cette carte.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {coin: 2}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'land', 'land'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [ {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
        {content: '', checked: false},
        {content: "*", checked: false},
      ],
    ],
    negative: [true, false, false, false],
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
    name: ['mysterious_cave', 'dungeon', 'treasures', 'lost_civilization'],
    resources: [
      [ emptyResource ],
      [ { fame: 2 } ],
      [ { coin: 2, fame: 8 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      '',
      '',
      "effects/passive Reste en jeu. ",
      "effects/activate Défaussez 6 cartes alliées pour découvrir un Artefact (108).",
    ],
    upgrades: [
      [{ cost: {}, nextSide: 2, otherCost: "1 Personne" }],
      [{ cost: {}, nextSide: 4, otherCost: "2 Personnes" }],
      [],
      [{ cost: { coin: 1, metal: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['skilled_bandit', '', 'worker', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "Peut être -> par un Missionaire. effects/forced Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ) et gagner 3 ressources au choix.",
      '',
      "effects/activate Choisissez un Bâtiment en jeu. Gagnez les ressources qui correspondent à sa production. ",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['dark_prince', '', 'impressed_boy', 'squire'],
    resources: [
      [ { fame: -7 } ],
      [],
      [ emptyResource ],
      [ { fame: 3 } ],
    ],
    effects: [
      "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni utiliser effects/time . effects/activate Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour vaincre (->).",
      '',
      "effects/destroy Gagnez resources/sword resources/sword .",
      "effects/destroy Gagnez resources/sword resources/sword resources/sword .",
    ],
    upgrades: [
      [],
      [],
      [{ cost: { metal: 1, sword: 1 }, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['camp', 'training_grounds', '', 'sir__'],
    resources: [
      [ { coin: 1 } ],
      [ { fame: 1 } ],
      [],
      [ { sword: 2, fame: 3 } ],
    ],
    effects: [
      '',
      "effects/activate Dépensez resources/coin pour gagner resources/sword .",
      '',
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 1, metal: 1 }, nextSide: 2 }],
      [{ cost: { metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', '', 'person - knight'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['far_fields', 'inn', 'wall', 'innkeeper'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { coin: 2, fame: 2 }
      ],
      [
        { sword: 1, fame: 3 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      " ",
      '',
      "effects/passive Reste en jeu. ",
      "effects/activate Défaussez une autre Personne pour gagner 2 ressources de votre choix.",
    ],
    upgrades: [
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 2 }, { cost: { stone: 4 }, nextSide: 3 }],
      [{ cost: { coin: 6 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'person'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['skilled_bandit', '', 'field_worker', ''],
    resources: [
      [ { fame: -5 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/forced Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ) et gagner 3 ressources au choix. (Peut être -> (Front Up) par un Missionaire)",
      '',
      "effects/activate Choisissez un Terrain en jeu. Gagnez les ressources qui correspondent à sa production. ",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['tornado', '', 'flooding', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 3 cartez alliées du royaume. Puis -> (Back Up).",
      '',
      "effects/passive Reste en jeu. effects/forced Bloque tous les Bâtiments (max 5). effects/forced Fin de Manche: Détruisez cette carte et 1 Bâtiment bloqué ou 2 autres cartes alliées.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['young_princess', 'spoiled_princess', 'educated_princess', ''],
    resources: [
      [ { fame: 2 } ],
      [ emptyResource ],
      [ { fame: 8 } ],
      [],
    ],
    effects: [
      "effects/forced Fin du Tour: Défaussez 2 Personnes ou Front Down.",
      "effects/forced Carte Jouée: Défaussez 2 cartes alliées en jeu.",
      "effects/activate Gagnez 1 ressource de votre choix.",
      '',
    ],
    upgrades: [
      [{ cost: {}, nextSide: 3, otherCost: "2 Personnes, 2 Terrains, 2 Bâtiments" }],
      [{ cost: {}, nextSide: 1, otherCost: "2 Personnes" }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', 'person', 'person - lady', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['sickness', 'crippled', 'feast', ''],
    resources: [
      [ { fame: -8 } ],
      [ { fame: -2 } ],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/forced Carte Jouée: Défaussez la prochaine carte de votre pioche.",
      "Cette carte est Permanente.",
      "effects/activate Gagnez 1 ressource de votre choix.",
      '',
    ],
    upgrades: [
      [
        {cost: {tradegood: 6}, nextSide: 3},
        {cost: {coin: 1}, nextSide: 2}
      ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', 'state - permanent', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['stop', '', '', ''],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "effects/activate Découvrez les cartes 69 et 70. A la fin de la manche comptez votre resources/fame (Fin du jeu).",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['scroll', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['finishing_touch', '', 'banquet', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/destroy Ajoutez resources/tradegood et resources/fame x5 à une carte en jeu.",
      '',
      "effects/destroy Gagnez 4 ressources au choix.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['royal_visit', '', 'inquisitor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Barrez 1 icône de ressource dans le coût d'amélioration d'une carte en jeu.",
      '',
      "effects/destroy Détruisez une carte négative en jeu.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['distant_mountain', 'rocky_area', 'shallow_mines', 'quarry'],
    resources: [
      [
        { coin: 1 }
      ],
      [
        { stone: 1 }
      ],
      [
        { stone: 1, metal: 1, fame: 3 }
      ],
      [
        { stone: 2 }
      ],
    ],
    effects: [
      " ",
      "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
      "effects/destroy Découvrez une Mine (84/85). ",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 2 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['forest', 'felled_forest', 'sacred_well', 'lumberjack'],
    resources: [
      [
        { wood: 1 }
      ],
      [{ ...emptyResource }],
      [
        { coin: 1, fame: 2 }
      ],
      [
        { wood: 2, fame: 2 }
      ],
    ],
    effects: [
      "effects/activate Gagnez resources/wood resources/wood resources/wood , puis Front Down.",
      '',
      "effects/destroy Découvrez un Autel (82/83).",
      '',
    ],
    upgrades: [
      [{ cost: { stone: 2 }, nextSide: 3 }],
      [{ cost: { coin: 1 }, nextSide: 1 }, { cost: { coin: 2, wood: 1, stone: 1 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['west_canyon', 'miners', 'wall', 'forced_labour'],
    resources: [
      [
        { stone: 1 },
        { metal: 1 }
      ],
      [ { stone: 1, metal: 1, fame: 2 } ],
      [ { sword: 1, fame: 3 } ],
      [ { stone: 2, metal: 2, fame: -3 } ],
    ],
    effects: [
      '',
      "Peut compter comme 2 Personnes.",
      "effects/passive Reste en jeu.",
      '',
    ],
    upgrades: [
      [
        { cost: { stone: 3 }, nextSide: 3 },
        { cost: { stone: 1, metal: 1, coin: 1, wood: 1 }, nextSide: 2 }
      ],
      [{ cost: { sword: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'person', 'building', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['shore', 'shipyard', 'trade_route', 'trade_ship'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { metal: 1 },
        { tradegood: 1, fame: 13 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { tradegood: 1, fame: 6 }
      ],
    ],
    effects: [
      '',
      '',
      "effects/forced Carte Jouée: Découvrez le Pirate (76).",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood : 2}, nextSide: 3, otherCost: "2 Personnes" }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'seafaring - ship', 'seafaring - ship'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['shore', 'shipyard', 'trade_route', 'trade_ship'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 3 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { metal: 1 },
        { tradegood: 1, fame: 13 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { tradegood: 1, fame: 6 }
      ],
    ],
    effects: [
      '',
      '',
      "effects/forced Carte Jouée: Découvrez le Pirate (76).",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 1, wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 1, wood: 4 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 1, wood : 2}, nextSide: 3, otherCost: "2 Personnes" }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'seafaring - ship', 'seafaring - ship'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['pirate', '', 'skilled_ally', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [
        { sword: 1 },
        { metal: 1, fame: 3 }
      ],
      [ emptyResource ],
    ],
    effects: [
      "effects/passive Reste en jeux. effects/passive Lorsque vous gagnez des resources/coin , gagnez 1 resources/coin de moins. effects/activate Dépensez resources/sword resources/sword pour vaincre ( effects/destroy ) puis découvrez le Lagon (77).",
      '',
      "effects/activate Découvrez la Chasse au Trésor (93).",
      '',
    ],
    upgrades: [
      [{ cost: { coin: 4, metal: 1 }, nextSide: 3 }],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'person - seafaring', ''],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['laggon', 'raft', 'sea_gate_wall', 'lush_island'],
    resources: [
      [ { coin: 1 } ],
      [ emptyResource ],
      [ { sword: 1, fame: 3 } ],
      [ { coin: 2, tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      "effects/activate Jouez une carte Maritime depuis la défausse.",
      '',
    ],
    upgrades: [
      [
        { cost: { stone: 3, tradegood: 1 }, nextSide: 2 },
        { cost: { wood: 3 }, nextSide: 3 }
      ],
      [ {cost: {}, nextSide: 4} ],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'seafaring', 'building', 'land - seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['statue', 'monument', 'golden_pillar', 'obelisk'],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 5 } ],
      [ { fame: 15 } ],
      [ { fame: 10 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['villa', 'estate', 'palace', 'mansion'],
    resources: [
      [ emptyResource ],
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
      [ { cost: { coin: 4, stone: 2 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['cooperation', '', 'favor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/activate Défaussez 2 Personnes pour gagner 3 ressources au choix puis ->.",
      '',
      "effects/passive Reste en jeu. effects/activate Gagnez une ressource au choix, puis ->.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['aethan_estate', 'aethan_estate', 'aethan_estate', 'aethan_estate'],
    resources: [
      [ emptyResource ],
      [ { fame: 3 } ],
      [ { fame: 10 } ],
      [ { fame: 6 } ],
    ],
    effects: [
      '',
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
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['shrine', 'sanctuary', 'temple', 'oratory'],
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
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['shrine', 'sanctuary', 'temple', 'oratory'],
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
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3, stone: 2 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['mine', 'deep_mine', 'diamond_mine', 'ruby_mine'],
    resources: [
      [
        { stone: 1, metal: 1, fame: 4 }
      ],
      [
        { stone: 1, metal: 2, fame: 6 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 2, fame: 13 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 1, fame: 9 }
      ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['mine', 'deep_mine', 'diamond_mine', 'ruby_mine'],
    resources: [
      [
        { stone: 1, metal: 1, fame: 4 }
      ],
      [
        { stone: 1, metal: 2, fame: 6 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 2, fame: 13 }
      ],
      [
        { stone: 1, metal: 2, tradegood: 1, fame: 9 }
      ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { coin: 2, wood: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 2, wood: 2, stone: 2 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['dubbing', '', 'renovation', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/coin resources/sword et \"Chevalier\" à 1 Personne, puis ->.",
      '',
      "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/wood / resources/stone et resources/metal / resources/tradegood à 1 Bâtiment, puis effects/destroy .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'event', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['quests', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time défaussez des Personnes (1, 2, 2, 3, 3, 4, 5, 6, 7) pour cocher la case de gauche à droite.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
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
    negative: [false, false, false, false],
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
    name: ['a_perfect_tower', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/stone (1 à 10, incrément de 1) pour cocher la case de gauche à droite.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
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
    negative: [false, false, false, false],
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
    name: ['deep_pit', 'town_well', 'pit_settlement', 'prison'],
    resources: [
      [ { stone: 1 } ],
      [ { fame: 3 } ],
      [ { wood: 1, stone: 1, fame: 1 } ],
      [ { sword: 1 } ],
    ],
    effects: [
      '',
      "effects/passive La production des Bâtiments gagne +1 resources/coin .",
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
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: "sword", checked: false},
        {content: "sword", checked: false},
        {content: "coin", checked: false},
        {content: "coin x2", checked: false},
        {content: "coin x3", checked: false}
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['jewellery', '', '', ''],
    resources: [
      [ emptyResource ],
      [],
      [],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/metal (1 à 10, incrément de 1) pour cocher la case de gauche à droite, puis gagnez 5 resources/tradegood .",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
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
    negative: [false, false, false, false],
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
    name: ['build_an_ark', '', 'the_ark', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 24 } ],
      [],
    ],
    effects: [
      "effects/time dépensez les resources/wood (2 à 10, incrément de 2) pour cocher la case de gauche à droite, une fois complétée, ->",
      '',
      "effects/activate Inscrivez 1 effects/check pour chaque paire de Personnes que vous avez en jeu. (Vaut +1 resources/fame pour chaque effects/check )",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', 'seafaring', ''],
    choice: false,
    checkboxes: [
      [
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      [],
      [ {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}, 
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false},
        {content: '', checked: false}
      ],
      []
    ],
    negative: [false, false, false, false],
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
    name: ['___', '', '___', ''],
    resources: [
      [ emptyResource ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez resources/sword / resources/fame x5. effects/forced Jouée la 3ème fois: Ajoutez resources/tradegood / resources/fame x5.",
      '',
      "effects/passive Reste en jeu. effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ). effects/forced Jouée la 3ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ).",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['treasure_hunt', 'pirate_cove', 'pirate_treasure', 'treasure_map'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 2, fame: 15 } ],
      [ { coin: 1, fame: 5 } ],
    ],
    effects: [
      '',
      "effects/forced Fin du Tour: Hélas, vous découvrez un Traître (94).",
      '',
      '',
    ],
    upgrades: [
      [ {cost: {coin: 1, wood: 1, metal: 1}, nextSide: 2} ],
      [ {cost: {sword: 1, metal: 1}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ {cost: {}, nextSide: 3, otherCost: "2 Maritimes" } ],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'event', 'seafaring'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['backstabber', '', 'blood_curse', ''],
    resources: [
      [ { fame: -2 } ],
      [],
      [ emptyResource ],
      [],
    ],
    effects: [
      "effects/forced Carte Jouée: Défaussez 2 Personnes. effects/activate Dépensez resources/sword resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ).",
      '',
      "effects/passive Lorsque vous Progressez, jouez 2 cartes supplémentaires.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['enemy', '', 'event', ''],
    choice: true,
    checkboxes: [],
    negative: [true, false, true, false],
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
    name: ['astronomer', '', 'astrologist', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { sword: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour inscrire 1 effects/check . (Vaut 2 resources/fame par effects/check )",
      '',
      "effects/activate Remettez au-dessus ou en-dessous de votre pioche jusqu'à 3 autres de vos cartes en jeu.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['alchemist', 'potion_of_stregnt', 'love_potion', 'healing_potion'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour orienter cette carte selon votre choix.",
      "effects/activate Réinitialisez cette carte pour gagner resources/sword resources/sword resources/sword .",
      "effects/activate Réinitialisez cette carte pour gagner resources/tradegood resources/tradegood resources/tradegood resources/tradegood resources/tradegood .",
      "effects/optional Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', 'potion - item', 'potion - item', 'potion - item'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['spinning_wheel', 'silk', 'fashion', 'cloth_export'],
    resources: [
      [ { fame: 2 } ],
      [ { tradegood: 1, fame: 4 } ],
      [ { tradegood: 3, fame: 10 } ],
      [ { tradegood: 2, fame: 6 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2 }, nextSide: 2 } ],
      [ { cost: { coin: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['invention', 'invention', 'invention', 'invention'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['compass', 'navigation', 'calendar', 'astrolabe'],
    resources: [
      [ { fame: 2 } ],
      [ { fame: 8 } ],
      [ { fame: 15 } ],
      [ { fame: 15 } ],
    ],
    effects: [
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
      "effects/activate Inscrivez 1 effects/check pour prendre 15 cartes au hasard de votre défausse et les placer en-dessous de votre pioche.",
      "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
    ],
    upgrades: [
      [],
      [],
      [ {cost: {}, nextSide: 4} ],
      [],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'invention', 'seafaring'],
    choice: false,
    checkboxes: [
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
      ],
      [
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "coin", checked: false }, { content: "coin", checked: false },
        { content: "tradegood", checked: false }, { content: "tradegood", checked: false },
        { content: "tradegood", checked: false }, { content: "tradegood", checked: false },
      ],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
    ],
    negative: [false, false, false, false],
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
    name: ['public_punishment', 'torture_device', 'post_barbaric', 'torture_chamber'],
    resources: [
      [ { sword: 1, fame: -2 } ],
      [ { sword: 1, tradegood: 1, fame: -3 } ],
      [ { fame: 15 } ],
      [ { sword: 2, fame: -6 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { metal: 2 }, nextSide: 2 } ],
      [ { cost: { metal: 4 }, nextSide: 4 } ],
      [],
      [ { cost: { coin: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['invention', 'invention - item', 'state', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['saw_mill', 'wood_industry', 'wood_export', 'wood_shipment'],
    resources: [
      [ { wood: 3, fame: 3 } ],
      [ { wood: 4, fame: 3 } ],
      [ { tradegood: 2, fame: 4 } ],
      [
        { wood: 2 },
        { tradegood: 2, fame: 6 }
      ],
    ],
    effects: [
      '',
      "effects/activate Découvrez Construire une Arche (91).",
      '',
      "effects/passive resources/tradegood et resources/wood peuvent être utilisés de manière interchangeable.",
    ],
    upgrades: [
      [ { cost: { wood: 3 }, nextSide: 2 } ],
      [],
      [ { cost: { coin: 4 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'seafaring'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['ploughs', 'farming_machines', 'larger_barns', 'royal_storehouse'],
    resources: [
      [ { coin: 3, fame: 4 } ],
      [ { coin: 4, fame: 8 } ],
      [ { coin: 2, fame: 3 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      '',
      "effects/passive Reste en jeu.",
      "effects/optional Fin du Tour: cette carte ou une autre au choix reste en jeu.",
      "effects/optional Fin du Tour: 2 cartes au choix restent en jeu.",
    ],
    upgrades: [
      [ { cost: { wood: 4 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 2, stone: 2, metal: 2 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['land - invention', 'land - invention', 'building', 'building'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['fishing_ships', 'fish_n_chips', 'fish_quota', 'fishing_excellence'],
    resources: [
      [ { coin: 3, fame: 2 } ],
      [ { coin: 2, tradegood: 2, fame: 4 } ],
      [ { coin: 2, fame: 4 } ],
      [ { fame: 13 } ],
    ],
    effects: [
      '',
      '',
      "effects/activate Inscrivez 1 effects/check , une fois complété, ->.",
      "effects/passive La production de chaque carte maritime augmente de +1 resources/coin .",
    ],
    upgrades: [
      [ { cost: { wood: 2, coin: 1, metal: 1 }, nextSide: 2 } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['seafaring', 'seafaring', 'seafaring', 'state - permanent'],
    choice: true,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['missionary', '', 'beekeeper', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1, fame: 2 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin resources/coin pour convertir (->) un Bandit.",
      '',
      "effects/activate Inscrivez 1 effects/check . Une fois complété, ajoutez resources/coin à cette carte.",
      '',
    ],
    upgrades: [
      [ { cost: { coin: 3 }, nextSide: 3 } ],
      [],
      [ { cost: {}, nextSide: 1 } ],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['priest', '', 'cardinal', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 5 } ],
      [],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour améliorer 1 carte en jeu, en payant son coût. (Cela ne met pas FIN au tour.)",
      '',
      "effects/activate Améliorez 1 carte en jeu, en payant son coût. (Cela ne met pas FIN au tour.)",
      '',
    ],
    upgrades: [
      [ { cost: { coin: 6, tradegood: 2 }, nextSide: 3 } ],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['small_hill_town', 'hill_town', 'city_on_a_hill', 'large_town'],
    resources: [
      [ { fame: 6 } ],
      [ { fame: 8 } ],
      [ { fame: 12 } ],
      [ { fame: 10 } ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin resources/coin pour gagner 1 ressource au choix.",
      "effects/activate Dépensez resources/coin pour gagner 1 ressource au choix.",
      "effects/activate Oubliez cette carte pour découvrir Camelot (106).",
      "effects/activate Dépensez 1 ressource au choix pour gagner 1 ressource au choix.",
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 3, stone: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { wood: 6 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['camelot', 'camelot', 'camelot', 'camelot'],
    resources: [
      [ { fame: 15 } ],
      [ { fame: 20 } ],
      [ { fame: 30 } ],
      [ { fame: 40 } ],
    ],
    effects: [
      '',
      '',
      "effects/optional Fin du Tour: Si votre pioche est vide, inscrivez 1 effects/check . (Vaut 5 resources/fame par effects/check )",
      '',
    ],
    upgrades: [
      [ { cost: { wood: 2, stone: 4 }, nextSide: 2 } ],
      [ { cost: { wood: 1, stone: 3, metal: 2 }, nextSide: 4 } ],
      [],
      [ { cost: { stone: 6, metal: 3 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['royal_visit', '', 'inquisitor', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { coin: 1 } ],
      [],
    ],
    effects: [
      "effects/activate Barrez 1 icône de ressource dans le coût d'amélioration d'une carte en jeu.",
      '',
      "effects/destroy Détruisez une carte négative en jeu.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['event', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['ether_crystal', '', '', ''],
    resources: [
      [ { fame: 10 } ],
      [],
      [],
      [],
    ],
    effects: [
      "Cette carte ne peut pas être détruite.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['artefact - permanent', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['small_guild', 'guild', 'grand_guild_hall', 'guild_hall'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { coin: 1, wood: 1, stone: 1 } ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1, fame: 3 }
      ],
    ],
    effects: [
      '',
      '',
      "effects/activate Défaussez le nombre de personne de votre choix pour gagner autant de resources/fame . Puis inscrivez 1 effects/check .",
      '',
    ],
    upgrades: [
      [ { cost: { wood: 2 }, nextSide: 2, otherCost: "1 Personne" } ],
      [ { cost: { stone: 2 }, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ { cost: { stone: 4 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        { content: '', checked: false },
        { content: '', checked: false },
        { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['barn', 'large_barn', 'thriving_countryside', 'countryside'],
    resources: [
      [ { coin: 1 } ],
      [
        { coin: 1 },
        { wood: 1, fame: 2 }
      ],
      [ { coin: 2, wood: 1, fame: 5 } ],
      [ { coin: 1, wood: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      "effects/activate Choisissez une carte en jeu ou dans la défausse, placez-la sous la pioche.",
      "effects/activate Remettez une carte en jeu sous la pioche.",
    ],
    upgrades: [
      [ {cost: { wood: 3 }, nextSide: 2} ],
      [ {cost: { wood: 6 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 6 }, nextSide: 3} ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['manor', 'large_manor', 'grand_residence', 'noble_residence'],
    resources: [
      [ { coin: 6 } ],
      [ { coin: 6 } ],
      [ { coin: 3, fame: 5 } ],
      [ { coin: 6 } ],
    ],
    effects: [
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
      "effects/time Découvrez un Noble (116).",
      "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { stone: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['stable', 'stable', 'groom', 'large_stable'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (113).",
      "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (114).",
      "effects/activate Choisissez un Cheval en jeu avec 1 ou 2 ressources et ajoutez-lui resources/coin / resources/wood / resources/stone / resources/metal / resources/sword . effects/activate Jouez un cheval depuis la défausse.",
      "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (115).",
    ],
    upgrades: [
      [{ cost: { wood: 3 }, nextSide: 2 }],
      [{ cost: { stone: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 4 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'person', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['horse', '', '', ''],
    resources: [
      [ { coin: 1 } ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['horse', '', '', ''],
    resources: [
      [ { sword: 1 } ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['horse', '', '', ''],
    resources: [
      [
        { wood: 1 },
        { stone: 1 }
      ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['livestock - horse', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['aric_blackwood', '', 'eadric_shadowstrike', ''],
    resources: [
      [ { coin: 2 } ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Reste en jeu. effects/forced Carte Jouée: vous devez défausser une carte en jeu.",
      '',
      "effects/passive Reste en jeu. effects/activate Défaussez 2 Personnes pour gagner resources/sword resources/sword resources/sword .",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['trade_relations', '', '', ''],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Dépensez resources/tradegood resources/tradegood resources/tradegood pour gagner une ressource au choix.",
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['permanent', '', '', ''],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['small_school', 'school', 'renowned_school', 'prominent_school'],
    resources: [
      [ { ...emptyResource} ],
      [ { ...emptyResource} ],
      [ { fame: 6 } ],
      [ { fame: 4 } ],
    ],
    effects: [
      "effects/time Améliorez gratuitement 1 Personne en jeux, puis ->.",
      "effects/time Améliorez gratuitement 1 Personne en jeux, puis ->.",
      "effects/time Ajoutez 1 ressource à une Personne en jeux, puis effects/oneTime .",
      "effects/time Ajoutez 1 ressource à une Personne en jeux, puis ->.",
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['trader', 'bazaar', 'festival', 'market'],
    resources: [
      [{ ...emptyResource }],
      [
        { fame: 1 }
      ],
      [
        { coin: 1 },
        { wood: 1 },
        { stone: 1 },
        { metal: 1, fame: 4 }
      ],
      [
        { fame: 3 }
      ],
    ],
    effects: [
      "effects/activate Dépensez resources/coin pour gagner resources/wood .",
      "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone .",
      '',
      "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone / resources/metal .",
    ],
    upgrades: [
      [{ cost: { coin: 3 }, nextSide: 2 }],
      [{ cost: { coin: 3 }, nextSide: 4 }],
      [],
      [{ cost: { coin: 5 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['person', 'building', 'event', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['investor', 'investor', 'investor', 'investor'],
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
    type: ['person - lady', 'person - lady', 'person - lady', 'person - lady'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['king_alahar', '', 'queen_jeminah', ''],
    resources: [
      [ { sword: 2, fame: -5 } ],
      [ { ...emptyResource} ],
      [ { coin: 1 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      "effects/passive Reste en jeu.",
      '',
      "effects/activate Défaussez 1 Personne comportant 5 resources/fame ou plus pour inscrire 1 effects/check . (Vaut 3 par effects/check )",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person - lady', ''],
    choice: true,
    checkboxes:  [
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false },
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['royal_consort', '', 'royal_consort', ''],
    resources: [
      [ { coin: 1, tradegood: 2 } ],
      [ { ...emptyResource} ],
      [ { wood: 1, stone: 1 } ],
      [ { ...emptyResource} ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person - lady', '', 'person - knight', ''],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['grand_castle', 'huge_castle', 'impregnable_fortress', 'fortress'],
    resources: [
      [ { sword: 1, fame: 15 } ],
      [ { sword: 2, fame: 20 } ],
      [ { sword: 3, fame: 30 } ],
      [ { sword: 2, fame: 25 } ],
    ],
    effects: [
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse.",
      "effects/activate Jouez 1 carte depuis la défausse. effects/optional Vous pouvez défausser 2 Murailles à la place de cette carte.",
      "effects/activate Jouez 1 carte depuis la défausse.",
    ],
    upgrades: [
      [ {cost: { wood: 2, stone: 2, metal: 2 }, nextSide: 2} ],
      [ {cost: { stone: 3, metal: 3 }, nextSide: 4} ],
      [],
      [ {cost: { stone: 4, metal: 4 }, nextSide: 2} ],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['jewel_extraction', 'jewel_cutting', 'jewel_exhibit', 'jewel_polishing'],
    resources: [
      [ { stone: 1, metal: 2, tradegood: 2, fame: 15 } ],
      [ { metal: 2, tradegood: 3, fame: 18 } ],
      [ { metal: 3, tradegood: 6, fame: 25 } ],
      [ { metal: 3, tradegood: 4, fame: 21 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ {cost: { wood: 2, metal: 2 }, nextSide: 2} ],
      [ {cost: { wood: 2, metal: 3 }, nextSide: 4} ],
      [],
      [ {cost: { wood: 2, metal: 4 }, nextSide: 2} ],
    ],
    currentSide: 1,
    type: ['event', 'event', 'event', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['large_temple', 'ornate_temple', 'temple_of_light', 'legendary_temple'],
    resources: [
      [ { stone: 1, fame: 18 } ],
      [ { fame: 22 } ],
      [ { fame: 30 } ],
      [ { fame: 28 } ],
    ],
    effects: [
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu. effects/time dépensez resources/tradegood resources/tradegood resources/tradegood resources/tradegood pour inscrire 1 effects/check .(Quand vous la purgez, cette carte vaut +10 resources/fame par effects/check .",
      "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    ],
    upgrades: [
      [ { cost: { coin: 3, tradegood: 3 }, nextSide: 2 } ],
      [ { cost: { coin: 3, stone: 3, tradegood: 3 }, nextSide: 4 } ],
      [],
      [{ cost: { tradegood: 8 }, nextSide: 3 }],
    ],
    currentSide: 1,
    type: ['building', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [
      [],
      [],
      [
        {content: '', checked: false}, {content: '', checked: false},
        {content: '', checked: false}, {content: '', checked: false},
      ],
      []
    ],
    negative: [false, false, false, false],
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
    name: ['pine_forest', 'pine_forest', 'pond', 'fish_pond'],
    resources: [
      [ { wood: 1 } ],
      [ { wood: 2 } ],
      [ { coin: 1 } ],
      [ { coin: 2, tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      '',
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2, metal: 1 }, nextSide: 2 } ],
      [],
      [ { cost: { wood: 4 }, nextSide: 4 } ],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['boulders', 'boulders', 'mushrooms', 'mushrooms'],
    resources: [
      [ { stone: 1 } ],
      [ { stone: 2 } ],
      [ { tradegood: 1 } ],
      [ { tradegood: 1 } ],
    ],
    effects: [
      '',
      '',
      '',
      "effects/passive Défaussez 1 Personne pour gagner resources/tradegood resources/tradegood .",
    ],
    upgrades: [
      [ { cost: { metal: 2 }, nextSide: 2 } ],
      [],
      [ { cost: {}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: true,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['ravine', 'chasm', 'excavation_site', 'ancient_ruins'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ { coin: 1, tradegood: 1 } ],
      [ emptyResource ],
    ],
    effects: [
      '',
      '',
      "Vaut 7 par effects/check . effects/time Défaussez 1 Personne et dépensez resources/stone resources/stone resources/stone pour inscrire effects/check .",
      '',
    ],
    upgrades: [
      [ { cost: { coin: 2, wood: 2 }, nextSide: 2 } ],
      [ { cost: {}, nextSide: 4, otherCost: "2 Personnes" } ],
      [],
      [ { cost: {}, nextSide: 3, otherCost: "2 Personnes" } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes:  [
      [],
      [],
      [
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }, { content: '' , checked: false },
        { content: '' , checked: false }
      ],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['hot_springs', 'fountain', 'sweet_water_river', 'canals'],
    resources: [
      [ emptyResource ],
      [ { fame: 2 } ],
      [ { fame: 9 } ],
      [ { fame: 5 } ],
    ],
    effects: [
      "effects/optional Lorsque vous l'améliorez ajoutez 1 resources/coin à un Terrain en jeu.",
      "effects/optional Lorsque vous l'améliorez boostez 1 carte en jeu.",
      '',
      "effects/optional Lorsque vous l'améliorez 1 Terrain gagne \" effects/passive Reste en jeu. \".",
    ],
    upgrades: [
      [ { cost: { coin: 2, stone: 2 }, nextSide: 2 } ],
      [ { cost: { wood: 2, stone: 2 }, nextSide: 4 } ],
      [],
      [ { cost: {}, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land', 'land', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['town_border', 'watchtower', 'inner_wall', 'double_wall'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 4 } ],
      [ { sword: 1, fame: 3 } ],
      [ { sword: 2 } ],
    ],
    effects: [
      '',
      "effects/passive Vous pouvez regardez les 2 cartes du dessus de votre pioche.",
      "effects/passive Reste en jeu.",
      "Vaut 4 resources/fame pour chaque Murailles, celle-ci incluse. effects/passive Reste en jeu.",
    ],
    upgrades: [
      [
        { cost: { coin: 1, wood: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [],
      [{ cost: { wood: 2, stone: 4}, nextSide: 4 }],
      [],
    ],
    currentSide: 1,
    type: ['land', 'building', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['north_plains', 'moat', 'wall', 'moat_bridge'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 2 } ],
      [ { sword: 1, fame: 3 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      '',
      "effects/activate Défaussez une autre carte pour gagner resources/sword resources/sword .",
      "effects/passive Reste en jeu.",
      "effects/activate Dépensez resources/coin pour jouer une Personne depuis la défausse.",
    ],
    upgrades: [
      [
        { cost: { coin: 1, stone: 3 }, nextSide: 2 },
        { cost: { stone: 4 }, nextSide: 3 }
      ],
      [{ cost: { coin: 2, metal: 2 }, nextSide: 4 }],
      [],
      [],
    ],
    currentSide: 1,
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['south_hills', 'terrace_land', 'windmill', 'wall'],
    resources: [
      [ { coin: 1 } ],
      [ { sword: 1, fame: 2 } ],
      [ { coin: 3, fame: 4 } ],
      [ { sword: 1, fame: 3 } ],
    ],
    effects: [
      '',
      '',
      '',
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
    type: ['land', 'land', 'building', 'building'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['raid', 'looting', 'plundering', 'pillaging'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
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
      [ { cost: { sword: 2 }, nextSide: 2 } ],
      [ { cost: { sword: 3 }, nextSide: 4 } ],
      [],
      [ { cost: { sword: 5 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['event', 'event', 'event', 'event'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['handsome_rival', '', 'noble_ally', ''],
    resources: [
      [ emptyResource ],
      [],
      [ { fame: 6 } ],
      [],
    ],
    effects: [
      "Vaut -5 pour chaque case non effects/check . effects/passive Ne peut pas être détruit, à moins que Lord Nimrod n'ai été détruit. effects/activate Défaussez Lord Nimrod et dépensez les ressources d'une case pour inscrire effects/check , une fois complétées, ->.",
      '',
      "effects/activate Choisissez une Personne en jeu et gagnez les ressources qui correspondent à sa production.",
      '',
    ],
    upgrades: [
      [],
      [],
      [],
      [],
    ],
    currentSide: 1,
    type: ['person', '', 'person', ''],
    choice: false,
    checkboxes:  [
      [
        { content: "coin x5", checked: false },
        { content: "sword x2", checked: false },
        { content: "sword x3", checked: false },
        { content: "tradegood x3", checked: false },
      ],
      [],
      [],
      [],
    ],
    negative: [false, false, false, false],
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
    name: ['bordering_lands', 'occupation', 'vassal_states', 'unruly_towns'],
    resources: [
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
      [ emptyResource ],
    ],
    effects: [
      "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration. Toutes les étapes ont la même valeur que l'étape finale.",
      "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration.",
      "effects/activate Réinitialisez cette carte.",
      "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration. effects/passive Lorsque vous l'améliorez, ajoutez 20 resources/fame à l'étape finale (max 9x).",
    ],
    upgrades: [
      [ { cost: { sword: 12 }, nextSide: 2 } ],
      [ { cost: { sword: 9 }, nextSide: 4 } ],
      [],
      [ { cost: { sword: 8 }, nextSide: 3 } ],
    ],
    currentSide: 1,
    type: ['land - enemy', 'event', 'land', 'land'],
    choice: false,
    checkboxes: [],
    negative: [true, false, false, false],
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
    name: ['prosperity_expansion', 'hoarding', 'royal_decree', 'uprising'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle la production de toutes les cartes alliées ont +1 resources/coin , puis ->.",
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
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [
      [],
      [],
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
      ],
    ],
    negative: [false, false, false, false],
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
    name: ['the_water_mill_expansion', 'efficient_farming', 'obsolete_farms', 'surplus'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle vous pouvez gagner resources/coin resources/coin resources/coin une fois par tour, puis ->.",
      "Jouez 1 manche. effects/time Défaussez 2 Bâtiments pour ajouter une resources/coin à un Terrain en jeu, puis ->.",
      "Jouez 1 manche. Puis, détruisez cette extension avec 1 carte avec une production d' resources/coin .",
      "Jouez 1 manche durant laquelle les Terrains produisent de l' resources/coin peuvent produire des resources/tradegood à la place, puis ->.",
    ],
    upgrades: [
      [ {cost: { }, nextSide: 2} ],
      [ {cost: { }, nextSide: 3} ],
      [],
      [ {cost: { }, nextSide: 4} ],
    ],
    currentSide: 1,
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [],
    negative: [false, false, false, false],
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
    name: ['border_dispute_expansion', 'espionage', 'resistance', 'attack'],
    resources: [
      [],
      [],
      [],
      [],
    ],
    effects: [
      "Jouez 1 manche durant laquelle tous les Terrains restent en jeu, puis ->.",
      "Jouez 1 manche, puis ->. effects/forced Lorsqu'une Personne est jouée, inscrivez 1 effects/check ou défaussez 2 cartes alliées. Une fois complétée, défaussez toute votre pioche.",
      "Jouez 1 manche durant laquelle vous pouvez dépenser autant d' resources/sword que vous le souhaitez pour les mettre sur cette carte. Après la manche, ajoutez autant de resources/fame (max 100) à un Terrain. Puis détruisez cette extension.",
      "Jouez 1 manche. effects/forced Fin du Tour: Si vous n'avez aucune resources/sword , enlevez 1 production d'1 carte en jeu. effects/forced Fin de Manche: Ajoutez une ressource (non- resources/fame ) au choix à une carte alliée, puis ->.",
    ],
    upgrades: [
      [ {cost: { }, nextSide: 2} ],
      [ {cost: { }, nextSide: 3} ],
      [],
      [ {cost: { }, nextSide: 4} ],
    ],
    currentSide: 1,
    type: ['event - permanent', 'event - permanent', 'event - permanent', 'event - permanent'],
    choice: false,
    checkboxes: [
      [],
      [
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false },
        { content: '', checked: false }, { content: '', checked: false }
      ],
      [],
      [],
    ],
    negative: [false, false, false, false],
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