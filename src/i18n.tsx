import React, { createContext, useContext, useState } from 'react';

// Types
export type Language = 'fr' | 'en';

export type TranslationKeys = 
  // UI Elements
  | 'deck' | 'discard' | 'playArea' | 'blocked' | 'permanentZone' | 'campaign' | 'destroy'
  | 'settings' | 'guide' | 'about' | 'close' | 'save' | 'continue' | 'reset'
  | 'newTurn' | 'pass' | 'advance' | 'endRound' | 'shuffleDeck' | 'noCost' | 'emptyCheckbox'
  | 'emptySide' | 'card' | 'none' | 'cardNames' | 'autoSelected' | 'side' | 'selectUpgradeRemoveCost'
  | 'noUpgradeAvailable' | 'selectAnUpgrade' | 'selectAResource' | 'failedToSave' | 'failedToLoad'
  | 'select' | 'id' | 'preview' | 'endGame' | 'seeDeck'
  
  // Card Elements
  | 'frontUp' | 'frontDown' | 'backUp' | 'backDown'
  | 'upgrades' | 'resources' | 'effect' | 'checkboxes'
  | 'apply' | 'cancel' | 'confirm' | 'front' | 'back'
  | 'up' | 'down'
  
  // Card Types
  | 'land' | 'building' | 'person' | 'knight' | 'lady' | 'seafaring'
  | 'ship' | 'event' | 'enemy' | 'permanent' | 'scroll' | 'choice'
  | 'potion' | 'item' | 'invention' | 'artefact' | 'livestock'
  | 'horse'
  
  // Resources
  | 'gold' | 'wood' | 'stone' | 'military' | 'ingot' | 'export' | 'fame'
  
  // Actions & Messages
  | 'selectCards' | 'chooseResource' | 'discoverCard' | 'destroyCard'
  | 'noCardsAvailable' | 'insufficientResources' | 'cardUpdated'
  | 'endOfRoundEffect' | 'report' | 'resolve' | 'selectBetween'
  | 'noCheckboxAvailable'
  
  // Settings
  | 'kingdomSaveLoad' | 'newKingdom' | 'enterKingdomName' | 'selectKingdom'
  | 'resetWarning' | 'resetConfirm' | 'saveSuccess' | 'loadSuccess' | 'noSaveFound'
  | 'language' | 'resetFullGame'
  
  // Guide
  | 'guideTitle' | 'guideControls' | 'rulesLink'
  
  // About
  | 'originalGame' | 'gameDesign' | 'publisher' | 'digitalAdaptation' | 'disclaimer'
  
  // Link words
  | 'and'

  // Card Names
  | 'welcome' | 'golden_rules'
  | 'wild_grass' | 'plains' | 'food_barns' | 'farmlands'
  | 'distant_mountains' | 'rocky_area' | 'shallow_mines' | 'quarry'
  | 'forest' | 'felled_forest' | 'sacred_well' | 'lumberjack'
  | 'headquarters' | 'town_hall' | 'castle' | 'keep'
  | 'trader' | 'bazaar' | 'festival' | 'market'
  | 'card11_name_1' | 'card11_name_2' | 'card11_name_3' | 'card11_name_4'
  | 'card12_name_1' | 'card12_name_2' | 'card12_name_3' | 'card12_name_4'
  | 'card13_name_1' | 'card13_name_3'
  | 'card14_name_1' | 'card14_name_3'
  | 'card17_name_1' | 'card17_name_2' | 'card17_name_3' | 'card17_name_4'
  | 'card18_name_1' | 'card18_name_2' | 'card18_name_3' | 'card18_name_4'
  | 'card20_name_1' | 'card20_name_2' | 'card20_name_3' | 'card20_name_4'
  | 'card22_name_1' | 'card22_name_2' | 'card22_name_3' | 'card22_name_4'
  | 'card23_name_1'
  | 'card24_name_1'
  | 'card25_name_1' | 'card25_name_3'
  | 'card26_name_1' | 'card26_name_3'
  | 'card27_name_1' | 'card27_name_3'
  | 'card28_name_1' | 'card28_name_3' | 'card28_name_4'
  | 'card29_name_1' | 'card29_name_2' | 'card29_name_3' | 'card29_name_4'
  | 'card30_name_1'
  | 'card31_name_1' | 'card31_name_2' | 'card31_name_3' | 'card31_name_4'
  | 'card32_name_1' | 'card32_name_3' | 'card32_name_4'
  | 'card33_name_1' | 'card33_name_3'
  | 'card34_name_1' | 'card34_name_3'
  | 'card36_name_1' | 'card36_name_3'
  | 'card37_name_1'
  | 'card38_name_1' | 'card38_name_3'
  | 'card39_name_1' | 'card39_name_3'
  | 'card40_name_1' | 'card40_name_3'
  | 'card41_name_1' | 'card41_name_3'
  | 'card42_name_1' | 'card42_name_3'
  | 'card43_name_1' | 'card43_name_3' | 'card43_name_4'
  | 'card44_name_1' | 'card44_name_3'
  | 'card45_name_1' | 'card45_name_3' | 'card45_name_4'
  | 'card46_name_1' | 'card46_name_2' | 'card46_name_4'
  | 'card47_name_1'
  | 'card48_name_1' | 'card48_name_2' | 'card48_name_3' | 'card48_name_4'
  | 'card49_name_1' | 'card49_name_3'
  | 'card50_name_1'
  | 'card51_name_1' | 'card51_name_3'
  | 'card52_name_1' | 'card52_name_2' | 'card52_name_3' | 'card52_name_4'
  | 'card53_name_1' | 'card53_name_3'
  | 'card54_name_1' | 'card54_name_3'
  | 'card55_name_1' | 'card55_name_3'
  | 'card56_name_1' | 'card56_name_3'
  | 'card57_name_1' | 'card57_name_3'
  | 'card58_name_1' | 'card58_name_3' | 'card58_name_4'
  | 'card59_name_1' | 'card59_name_2' | 'card59_name_3' | 'card59_name_4'
  | 'card60_name_1' | 'card60_name_3'
  | 'card61_name_1' | 'card61_name_3' | 'card61_name_4'
  | 'card63_name_1' | 'card63_name_2' | 'card63_name_3' | 'card63_name_4'
  | 'card65_name_1' | 'card65_name_3'
  | 'card66_name_1' | 'card66_name_2' | 'card66_name_3'
  | 'card67_name_1' | 'card67_name_2' | 'card67_name_3'
  | 'card68_name_1'
  | 'card69_name_1' | 'card69_name_3'
  | 'card70_name_1' | 'card70_name_3'
  | 'card73_name_1' | 'card73_name_2' | 'card73_name_3' | 'card73_name_4'
  | 'card74_name_1' | 'card74_name_2' | 'card74_name_3' | 'card74_name_4'
  | 'card76_name_1' | 'card76_name_3'
  | 'card77_name_1' | 'card77_name_2' | 'card77_name_3' | 'card77_name_4'
  | 'card78_name_1' | 'card78_name_2' | 'card78_name_3' | 'card78_name_4'
  | 'card79_name_1' | 'card79_name_2' | 'card79_name_3' | 'card79_name_4'
  | 'card80_name_1' | 'card80_name_3'
  | 'card81_name_1'
  | 'card82_name_1' | 'card82_name_2' | 'card82_name_3' | 'card82_name_4'
  | 'card84_name_1' | 'card84_name_2' | 'card84_name_3' | 'card84_name_4'
  | 'card86_name_1' | 'card86_name_3'
  | 'card87_name_1'
  | 'card88_name_1'
  | 'card89_name_1' | 'card89_name_2' | 'card89_name_3' | 'card89_name_4'
  | 'card90_name_1'
  | 'card91_name_1' | 'card91_name_3'
  | 'card92_name_1'
  | 'card93_name_1' | 'card93_name_2' | 'card93_name_3' | 'card93_name_4'
  | 'card94_name_1' | 'card94_name_3'
  | 'card95_name_1' | 'card95_name_3'
  | 'card96_name_1' | 'card96_name_2' | 'card96_name_3' | 'card96_name_4'
  | 'card97_name_1' | 'card97_name_2' | 'card97_name_3' | 'card97_name_4'
  | 'card98_name_1' | 'card98_name_2' | 'card98_name_3' | 'card98_name_4'
  | 'card99_name_1' | 'card99_name_2' | 'card99_name_3' | 'card99_name_4'
  | 'card100_name_1' | 'card100_name_2' | 'card100_name_3' | 'card100_name_4'
  | 'card101_name_1' | 'card101_name_2' | 'card101_name_3' | 'card101_name_4'
  | 'card102_name_1' | 'card102_name_2' | 'card102_name_3' | 'card102_name_4'
  | 'card103_name_1' | 'card103_name_3'
  | 'card104_name_1' | 'card104_name_3'
  | 'card105_name_1' | 'card105_name_2' | 'card105_name_3' | 'card105_name_4'
  | 'card106_name_1'
  | 'card108_name_1'
  | 'card109_name_1' | 'card109_name_2' | 'card109_name_3' | 'card109_name_4'
  | 'card110_name_1' | 'card110_name_2' | 'card110_name_3' | 'card110_name_4'
  | 'card111_name_1' | 'card111_name_2' | 'card111_name_3' | 'card111_name_4'
  | 'card112_name_1' | 'card112_name_3' | 'card112_name_4'
  | 'card113_name_1'
  | 'card116_name_1' | 'card116_name_3'
  | 'card117_name_1'
  | 'card118_name_1' | 'card118_name_2' | 'card118_name_3' | 'card118_name_4'
  | 'card120_name_1'
  | 'card121_name_1' | 'card121_name_3'
  | 'card122_name_1'
  | 'card123_name_1' | 'card123_name_2' | 'card123_name_3' | 'card123_name_4'
  | 'card124_name_1' | 'card124_name_2' | 'card124_name_3' | 'card124_name_4'
  | 'card125_name_1' | 'card125_name_2' | 'card125_name_3' | 'card125_name_4'
  | 'card126_name_1' | 'card126_name_2' | 'card126_name_3' | 'card126_name_4'
  | 'card127_name_1' | 'card127_name_3'
  | 'card128_name_1' | 'card128_name_2' | 'card128_name_3' | 'card128_name_4'
  | 'card129_name_1' | 'card129_name_2' | 'card129_name_3' | 'card129_name_4'
  | 'card130_name_1' | 'card130_name_2' | 'card130_name_3' | 'card130_name_4'
  | 'card131_name_1' | 'card131_name_2' | 'card131_name_3' | 'card131_name_4'
  | 'card132_name_1' | 'card132_name_2' | 'card132_name_3' | 'card132_name_4'
  | 'card133_name_1' | 'card133_name_2' | 'card133_name_3' | 'card133_name_4'
  | 'card134_name_1' | 'card134_name_3'
  | 'card135_name_1' | 'card135_name_2' | 'card135_name_3' | 'card135_name_4'
  | 'card136_name_1' | 'card136_name_2' | 'card136_name_3' | 'card136_name_4'
  | 'card137_name_1' | 'card137_name_2' | 'card137_name_3' | 'card137_name_4'
  | 'card138_name_1' | 'card138_name_2' | 'card138_name_3' | 'card138_name_4'

    // Card Specific Names interaction
  | 'bandit' | 'wall'

  // Card Effects Descriptions
  | 'staysInPlay' | 'cardEffect_Plains'

  // Card Descriptions
  
  ;

// Dictionnaire de traductions
const translations: Record<Language, Record<TranslationKeys, string>> = {
  fr: {
    // UI Elements
    deck: 'Pioche',
    discard: 'Défausse',
    playArea: 'Zone de Jeu',
    blocked: 'Bloqué',
    permanentZone: 'Permanent',
    campaign: 'Campagne',
    destroy: 'Détruire',
    settings: 'Paramètres',
    guide: 'Guide',
    about: 'À Propos',
    close: 'Fermer',
    save: 'Sauvegarder',
    continue: 'Continuer',
    reset: 'Réinitialiser',
    newTurn: 'Nouveau Tour',
    pass: 'Passer',
    advance: 'Avancer',
    endRound: 'Fin de Round',
    shuffleDeck: 'Mélanger la Pioche',
    noCost: "Pas de coût",
    emptyCheckbox: "Boîte vide",
    emptySide: "Côté vide",
    card: "Carte",
    none: 'Rien',
    cardNames: "Noms de la carte",
    autoSelected: " - Pré-sélectionné",
    side: "Side",
    selectUpgradeRemoveCost: 'Sélectionnez une amélioration et une ressource à lui retirer',
    noUpgradeAvailable: 'Aucun upgrade disponible.',
    selectAnUpgrade: 'Choisissez une amélioration',
    selectAResource: 'Choisissez une ressource',
    failedToSave: 'Impossible de sauvegarder: ',
    failedToLoad: 'Impossible de charger: ',
    select: 'Sélectionnez',
    id: 'ID',
    preview: 'Prévisualiser',
    endGame: "Fin du Jeu",
    seeDeck: 'Voir le Deck',
    
    // Card Elements
    frontUp: 'Recto Haut',
    frontDown: 'Recto Bas',
    backUp: 'Verso Haut',
    backDown: 'Verso Bas',
    upgrades: 'Améliorations',
    resources: 'Ressources',
    effect: 'Effet',
    checkboxes: 'Cases à cocher',
    apply: 'Appliquer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    front: 'Recto',
    down: 'Bas',
    up: 'Haut',
    back: 'Verso',
    
    // Card Types
    land: 'Terrain',
    building: 'Bâtiment',
    person: 'Personne',
    knight: 'Chevalier',
    lady: 'Dame',
    seafaring: 'Maritime',
    ship: 'Navire',
    event: 'Événement',
    enemy: 'Ennemi',
    permanent: 'Permanente',
    scroll: 'Parchemin',
    choice: 'Choix',
    potion: 'Potion',
    item: 'Objet',
    invention: 'Invention',
    artefact: 'Artefact',
    livestock: 'Elevage',
    horse: 'Cheval',
    
    // Resources
    gold: 'Or',
    wood: 'Bois',
    stone: 'Pierre',
    military: 'Militaire',
    ingot: 'Lingot',
    export: 'Export',
    fame: 'Renommée',
    
    // Actions & Messages
    selectCards: 'Sélectionner des cartes',
    chooseResource: 'Choisir une ressource',
    discoverCard: 'Découvrir une carte',
    destroyCard: 'Détruire une carte',
    noCardsAvailable: 'Aucune carte disponible',
    insufficientResources: 'Ressources insuffisantes',
    cardUpdated: 'Carte mise à jour',
    endOfRoundEffect: 'Effet de fin de round',
    report: 'Reporter',
    resolve: 'Résoudre',
    selectBetween: 'Sélectionner entre',
    noCheckboxAvailable: 'Pas deboîte à sélectionner.',
    
    // Settings
    kingdomSaveLoad: 'Sauvegarder / Charger Royaume',
    newKingdom: 'Nouveau Royaume',
    enterKingdomName: 'Entrez le nom du royaume',
    selectKingdom: 'Sélectionner un royaume',
    resetWarning: 'Êtes-vous sûr de vouloir réinitialiser ?',
    resetConfirm: 'Tapez OUI pour confirmer',
    saveSuccess: 'Royaume sauvegardé avec succès',
    loadSuccess: 'Royaume chargé avec succès',
    noSaveFound: 'Aucune sauvegarde trouvée nommée',
    language: 'Langage',
    resetFullGame: 'Réinitialiser (partie en cours)',
    
    // Guide
    guideTitle: 'Guide & Contrôles',
    guideControls: 'Contrôles du jeu',
    rulesLink: 'Lire les règles complètes',
    
    // About
    originalGame: 'Jeu de plateau original',
    gameDesign: 'Conception du jeu',
    publisher: 'Éditeur',
    digitalAdaptation: 'Adaptation numérique par des fans',
    disclaimer: 'Avertissement',

    // Link Words
    and: 'et',

    // Card Names
    welcome: "Bienvenue",
    golden_rules: "Règles d'or",
    wild_grass: "Herbes Sauvages",
    plains: "Plaines",
    food_barns: "Grange",
    farmlands: "Terres Cultivées",
    distant_mountains: "Montagnes Lointaines",
    rocky_area: "Zone Rocheuse",
    shallow_mines: "Mine Profonde",
    quarry: "Carrière",
    forest: "Forêt",
    felled_forest: "Coupe Rase",
    sacred_well: "Puit Sacré",
    lumberjack: "Cabane de Bûcheron",
    headquarters: "Quartier Général",
    town_hall: "Hôtel de Ville",
    castle: "Château",
    keep: "Donjon",
    trader: "Commerçante",
    bazaar: "Bazar",
    festival: "Festival",
    market: "Marché",
    card11_name_1: "Jungle",
    card11_name_2: "Arbres Géants",
    card11_name_3: "Cabanes dans les Arbres",
    card11_name_4: "Jungle Profonde",
    card12_name_1: "Rivière",
    card12_name_2: "Pont",
    card12_name_3: "Explorateurs",
    card12_name_4: "Pont de Pierre",
    card13_name_1: "Exploitant",
    card13_name_3: "Domestique",
    card14_name_1: "Bandit",
    card14_name_3: "Travailleur",
    card17_name_1: "Colline",
    card17_name_2: "Chappelle",
    card17_name_3: "Cathédrale",
    card17_name_4: "Eglise",
    card18_name_1: "Falaise de l'Est",
    card18_name_2: "Forge",
    card18_name_3: "Muraille",
    card18_name_4: "Armurerie",
    card20_name_1: "Marais",
    card20_name_2: "Marais Aménagés",
    card20_name_3: "Arbres à Fruits Exotiques",
    card20_name_4: "Jardin du Marais",
    card22_name_1: "Lac",
    card22_name_2: "Chalet du Pêcheur",
    card22_name_3: "Phare",
    card22_name_4: "Bateau de Pêche",
    card23_name_1: "STOP !",
    card24_name_1: "Terre Fertile/Efficacité",
    card25_name_1: "Armée",
    card25_name_3: "Grande Armée",
    card26_name_1: "Trésor",
    card26_name_3: "Immense Trésor",
    card27_name_1: "Exportations",
    card27_name_3: "Exportations de Masse",
    card28_name_1: "Eruption Volcanique",
    card28_name_3: "Terres Brulées",
    card28_name_4: "Jeune Forêt",
    card29_name_1: "Opportuniste",
    card29_name_2: "Recrue",
    card29_name_3: "Artisan",
    card29_name_4: "Prétendu Noble",
    card30_name_1: "STOP !",
    card31_name_1: "Entrepreneur",
    card31_name_2: "Hôtel",
    card31_name_3: "Taverne",
    card31_name_4: "Bar Confortable",
    card32_name_1: "Scientifique",
    card32_name_3: "Observatoire",
    card32_name_4: "Laboratoire",
    card33_name_1: "Ingénieur",
    card33_name_3: "Trébuchet",
    card34_name_1: "Inventrice",
    card34_name_3: "Inventrice Inspirée",
    card36_name_1: "Mercenaire",
    card36_name_3: "Sir __",
    card37_name_1: "STOP !",
    card38_name_1: "L'Union fait la Force",
    card38_name_3: "Domination Militaire",
    card39_name_1: "Elargir les frontières",
    card39_name_3: "Optimisation",
    card40_name_1: "Loyauté",
    card40_name_3: "Commerce",
    card41_name_1: "Bouffon",
    card41_name_3: "Marchande",
    card42_name_1: "Exploitant",
    card42_name_3: "Grenier",
    card43_name_1: "Maçon",
    card43_name_3: "Route Pavée",
    card43_name_4: "Rue Pavée",
    card44_name_1: "Orage",
    card44_name_3: "Pluie",
    card45_name_1: "Chevalier Noir",
    card45_name_3: "Garçon Admiratif",
    card45_name_4: "Ecuyer",
    card46_name_1: "Camp",
    card46_name_2: "Camp d'Entrainement",
    card46_name_4: "Sir __",
    card47_name_1: "STOP !",
    card48_name_1: "Envoyé",
    card48_name_2: "Emissaire",
    card48_name_3: "Ambassadeur",
    card48_name_4: "Diplomate",
    card49_name_1: "Architecte Royal",
    card49_name_3: "Pont des Merveilles",
    card50_name_1: "Voyageur",
    card51_name_1: "Magistrat",
    card51_name_3: "Stratège",
    card52_name_1: "Grosse Butte",
    card52_name_2: "Hameau sur la Colline",
    card52_name_3: "Village Culminant",
    card52_name_4: "Village",
    card53_name_1: "Sorcière",
    card53_name_3: "Hutte de la Sorcière",
    card54_name_1: "Scribe",
    card54_name_3: "Architecte",
    card55_name_1: "Lord Aethan",
    card55_name_3: "Lord Nimrod",
    card56_name_1: "Peste",
    card56_name_3: "Soldat Ennemi",
    card57_name_1: "Assassin",
    card57_name_3: "Soldat Ennemi",
    card58_name_1: "Ville en Flamme",
    card58_name_3: "Terre Brûlée",
    card58_name_4: "Jeune Forêt",
    card59_name_1: "Grotte Mystérieuse",
    card59_name_2: "Souterrains",
    card59_name_3: "Trésor",
    card59_name_4: "Civilisation Oubliée",
    card60_name_1: "Bandit d'Elite",
    card60_name_3: "Travailleur",
    card61_name_1: "Prince des Ténèbres",
    card61_name_3: "Garçon Admiratif",
    card61_name_4: "Ecuyer",
    card63_name_1: "Terres Lointaines",
    card63_name_2: "Auberge",
    card63_name_3: "Muraille",
    card63_name_4: "Aubergiste",
    card65_name_1: "Tornade",
    card65_name_3: "Innodations",
    card66_name_1: "Jeune Princesse",
    card66_name_2: "Princesse Pourrie Gâtée",
    card66_name_3: "Princesse Bien Elevée",
    card67_name_1: "Maladie",
    card67_name_2: "Diminué",
    card67_name_3: "Festin",
    card68_name_1: "STOP !",
    card69_name_1: "Touche Finale",
    card69_name_3: "Banquet",
    card70_name_1: "Visite Royale",
    card70_name_3: "Inquisitrice",
    card73_name_1: "Canyon de l'Ouest",
    card73_name_2: "Mineurs",
    card73_name_3: "Muraille",
    card73_name_4: "Travaux Forcés",
    card74_name_1: "Littoral",
    card74_name_2: "Chantiers Navals",
    card74_name_3: "Route Commerciale",
    card74_name_4: "Navire Marchand",
    card76_name_1: "Pirate",
    card76_name_3: "Précieux Allié",
    card77_name_1: "Lagon",
    card77_name_2: "Canoë",
    card77_name_3: "Île Luxuriante",
    card77_name_4: "Porte Maritime Fortifiée",
    card78_name_1: "Statue",
    card78_name_2: "Monument",
    card78_name_3: "Colonne Dorée",
    card78_name_4: "Obélisque",
    card79_name_1: "Villa",
    card79_name_2: "Demeure",
    card79_name_3: "Palais",
    card79_name_4: "Manoir",
    card80_name_1: "Coopération",
    card80_name_3: "Faveur",
    card81_name_1: "Domaine Aethien",
    card82_name_1: "Autel",
    card82_name_2: "Sanctuaire",
    card82_name_3: "Temple",
    card82_name_4: "Oratoire",
    card84_name_1: "Mine",
    card84_name_2: "Mine Profonde",
    card84_name_3: "Mine de Diamant",
    card84_name_4: "Mine de Rubis",
    card86_name_1: "Adoubement",
    card86_name_3: "Rénovation",
    card87_name_1: "Quêtes",
    card88_name_1: "Une Tour Idéale",
    card89_name_1: "Fosse Insondable",
    card89_name_2: "Puits du Village",
    card89_name_3: "Colonie de la Fosse",
    card89_name_4: "Prison",
    card90_name_1: "Bijoux",
    card91_name_1: "Construire une Arche",
    card91_name_3: "L'Arche",
    card92_name_1: "__",
    card93_name_1: "Chasse au Trésor",
    card93_name_2: "Baie des Pirates",
    card93_name_3: "Trésor Pirate",
    card93_name_4: "Carte au Trésor",
    card94_name_1: "Traître",
    card94_name_3: "Malédiction",
    card95_name_1: "Astronome",
    card95_name_3: "Astrologue",
    card96_name_1: "Alchimiste",
    card96_name_2: "Potion de Force",
    card96_name_3: "Potion d'Amour",
    card96_name_4: "Potion de Soin",
    card97_name_1: "Rouet",
    card97_name_2: "Soie",
    card97_name_3: "Mode",
    card97_name_4: "Exportation d'Etoffe",
    card98_name_1: "Boussole",
    card98_name_2: "Navigation",
    card98_name_3: "Calendrier",
    card98_name_4: "Astrolabe",
    card99_name_1: "Châtiment Publique",
    card99_name_2: "Instrument de Torture",
    card99_name_3: "Ere Post-Barbare",
    card99_name_4: "Salle de Torture",
    card100_name_1: "Scierie Publique",
    card100_name_2: "Industrie du Bois",
    card100_name_3: "Exportation de Bois",
    card100_name_4: "Cargaison de Bois",
    card101_name_1: "Labours",
    card101_name_2: "Machines Agricoles",
    card101_name_3: "Grange Agrandie",
    card101_name_4: "Entrepôt Royal",
    card102_name_1: "Bateaux de Pêche",
    card102_name_2: "Comme un Poisson (dans l'eau)",
    card102_name_3: "Exportation de Bois",
    card102_name_4: "Cargaison de Bois",
    card103_name_1: "Missionaire",
    card103_name_3: "Apiculteur",
    card104_name_1: "Prêtre",
    card104_name_3: "Cardinal",
    card105_name_1: "Petit Village sur la Colline",
    card105_name_2: "Village sur la Colline",
    card105_name_3: "Ville sur la Colline",
    card105_name_4: "Grande Ville",
    card106_name_1: "Camelot",
    card108_name_1: "Cristal Ethéré Royale",
    card109_name_1: "Petite Guilde",
    card109_name_2: "Guilde",
    card109_name_3: "Manoir de la Guilde",
    card109_name_4: "Hotêl de la Guilde",
    card110_name_1: "Grange",
    card110_name_2: "Grande Grange",
    card110_name_3: "Campagne",
    card110_name_4: "Campagne Prospère",
    card111_name_1: "Manoir",
    card111_name_2: "Grand Manoir",
    card111_name_3: "Imposante Demeur",
    card111_name_4: "Noble Demeur",
    card112_name_1: "Etable",
    card112_name_3: "Palfrenier",
    card112_name_4: "Grande Etable",
    card113_name_1: "Cheval",
    card116_name_1: "Aric Blackwood",
    card116_name_3: "Eadric Shadowstrike",
    card117_name_1: "Relations Commerciales",
    card118_name_1: "Petite Ecole",
    card118_name_2: "Ecole",
    card118_name_3: "Ecole Réputée",
    card118_name_4: "Ecole Reconnue",
    card120_name_1: "Investisseur",
    card121_name_1: "Roi Alahar",
    card121_name_3: "Reine Jemimah",
    card122_name_1: "Consort Royal",
    card123_name_1: "Château Majestueux",
    card123_name_2: "Château Monumental",
    card123_name_3: "Forteresse Imprenable",
    card123_name_4: "Forteresse",
    card124_name_1: "Extraction de joyaux",
    card124_name_2: "Taille de Joyau",
    card124_name_3: "Exposition du Joyau",
    card124_name_4: "Polissage du Joyau",
    card125_name_1: "Grand Temple",
    card125_name_2: "Temple Sculpté",
    card125_name_3: "Temple de la Lumière",
    card125_name_4: "Temple Légendaire",
    card126_name_1: "Forêt de Pins",
    card126_name_2: "Forêt de Pins",
    card126_name_3: "Mare",
    card126_name_4: "Mare Poissonneuse",
    card127_name_1: "Rochers",
    card127_name_3: "Champignons",
    card128_name_1: "Ravin",
    card128_name_2: "Gouffre",
    card128_name_3: "Site de Fouilles",
    card128_name_4: "Ruines Antiques",
    card129_name_1: "Sources Chaudes",
    card129_name_2: "Fontaine",
    card129_name_3: "Rivière d'Eau Pure",
    card129_name_4: "Canaux",
    card130_name_1: "Ville Frontalière",
    card130_name_2: "Tour de Garde",
    card130_name_3: "Mur Intérieur",
    card130_name_4: "Double Muraille",
    card131_name_1: "Plaines du Nord",
    card131_name_2: "Douves",
    card131_name_3: "Muraille",
    card131_name_4: "Pont des Douves",
    card132_name_1: "Collines Meridionales",
    card132_name_2: "Terrasses",
    card132_name_3: "Moulin à Vent",
    card132_name_4: "Murailles",
    card133_name_1: "Raid",
    card133_name_2: "Razzia",
    card133_name_3: "Saccage",
    card133_name_4: "Pillage",
    card134_name_1: "Rival Beau-Gosse",
    card134_name_3: "Allié Noble",
    card135_name_1: "Terres Frontalières",
    card135_name_2: "Occupation",
    card135_name_3: "Etats Vassaux",
    card135_name_4: "Villages Alliés",
    card136_name_1: "Prospérité (extension)",
    card136_name_2: "Engranger des réserves",
    card136_name_3: "Décret Royal",
    card136_name_4: "Soulèvement",
    card137_name_1: "Le Moulin à Eau (extension)",
    card137_name_2: "Récolte Productive",
    card137_name_3: "Fermes Abandonnées",
    card137_name_4: "Surplus",
    card138_name_1: "Frontière Contestée (extension)",
    card138_name_2: "Espionnage",
    card138_name_3: "Résistance",
    card138_name_4: "Attaque",

    // Card Specific Names interaction
    bandit: "Bandit",
    wall: "Muraille",

    // Card Effects Descriptions
    staysInPlay: "Reste en jeu.",
    cardEffect_Plains: "Défaussez une carte alliée pour gagner gold x2.",

  // Card Descriptions

  },
  en: {
    // UI Elements
    deck: 'Deck',
    discard: 'Discard',
    playArea: 'Play Area',
    blocked: 'Blocked',
    permanentZone: 'Permanent',
    campaign: 'Campaign',
    destroy: 'Destroy',
    settings: 'Settings',
    guide: 'Guide',
    about: 'About',
    close: 'Close',
    save: 'Save',
    continue: 'Continue',
    reset: 'Reset',
    newTurn: 'New Turn',
    pass: 'Pass',
    advance: 'Advance',
    endRound: 'End Round',
    shuffleDeck: 'Shuffle Deck',
    noCost: "No Cost",
    emptyCheckbox: "Empty Checkbox",
    emptySide: "Empty Side",
    card: "Card",
    none: 'None',
    cardNames: "Card Names",
    autoSelected: " - Auto-selected",
    side: "Côté",
    selectUpgradeRemoveCost: 'Select an upgrade and a resource to remove from it',
    noUpgradeAvailable: 'No upgrade available.',
    selectAnUpgrade: 'Select an upgrade',
    selectAResource: 'Select a resource',
    failedToSave: 'Failed to save: ',
    failedToLoad: 'Failed to load: ',
    select: 'Select',
    id: 'ID',
    preview: 'Preview',
    endGame: "End Game",
    seeDeck: 'See Deck',
    
    // Card Elements
    frontUp: 'Front Up',
    frontDown: 'Front Down',
    backUp: 'Back Up',
    backDown: 'Back Down',
    upgrades: 'Upgrades',
    resources: 'Resources',
    effect: 'Effect',
    checkboxes: 'Checkboxes',
    apply: 'Apply',
    cancel: 'Cancel',
    confirm: 'Confirm',
    front: 'Front',
    down: 'Down',
    up: 'Up',
    back: 'Back',
    
    // Card Types
    land: 'Land',
    building: 'Building',
    person: 'Person',
    knight: 'Knight',
    lady: 'Lady',
    seafaring: 'Seafaring',
    ship: 'Ship',
    event: 'Event',
    enemy: 'Enemy',
    permanent: 'Permanent',
    scroll: 'Scroll',
    choice: 'Choice',
    potion: 'Potion',
    item: 'Item',
    invention: 'Invention',
    artefact: 'Artefact',
    livestock: 'Livestock',
    horse: 'Horse',
    
    // Resources
    gold: 'Gold',
    wood: 'Wood',
    stone: 'Stone',
    military: 'Military',
    ingot: 'Ingot',
    export: 'Export',
    fame: 'Fame',
    
    // Actions & Messages
    selectCards: 'Select cards',
    chooseResource: 'Choose a resource',
    discoverCard: 'Discover a card',
    destroyCard: 'Destroy a card',
    noCardsAvailable: 'No cards available',
    insufficientResources: 'Insufficient resources',
    cardUpdated: 'Card updated',
    endOfRoundEffect: 'End of Round Effect',
    report: 'Report',
    resolve: 'Resolve',
    selectBetween: 'Select between',
    noCheckboxAvailable: 'No checkbox available.',
    
    // Settings
    kingdomSaveLoad: 'Save / Load Kingdom',
    newKingdom: 'New Kingdom',
    enterKingdomName: 'Enter kingdom name',
    selectKingdom: 'Select a kingdom',
    resetWarning: 'Are you sure you want to reset?',
    resetConfirm: 'Type YES to confirm',
    saveSuccess: 'Kingdom saved successfully',
    loadSuccess: 'Kingdom loaded successfully',
    noSaveFound: 'No save found named',
    language: 'Language',
    resetFullGame: 'Reset (current game)',
    
    // Guide
    guideTitle: 'Guide & Controls',
    guideControls: 'Game controls',
    rulesLink: 'Read full rules',
    
    // About
    originalGame: 'Original board game',
    gameDesign: 'Game design',
    publisher: 'Publisher',
    digitalAdaptation: 'Fan-made digital adaptation',
    disclaimer: 'Disclaimer',

    // Link Words
    and: 'and',

    // Card Names
    welcome: "Welcome",
    golden_rules: "Golden Rules",
    wild_grass: "Wild Grass",
    plains: "Plains",
    food_barns: "Food Barns",
    farmlands: "Farmlands",
    distant_mountains: "Distant Mountains",
    rocky_area: "Rocky Area",
    shallow_mines: "Shallow Mine",
    quarry: "Quarry",
    forest: "Forest",
    felled_forest: "Felled Forest",
    sacred_well: "Sacred Well",
    lumberjack: "Lumberjack",
    headquarters: "Headquarters",
    town_hall: "Town Hall",
    castle: "Castle",
    keep: "Keep",
    trader: "Trader",
    bazaar: "Bazaar",
    festival: "Festival",
    market: "Market",
    card11_name_1: "Jungle",
    card11_name_2: "Giant Trees",
    card11_name_3: "Tree Houses",
    card11_name_4: "Deep Jungle",
    card12_name_1: "River",
    card12_name_2: "Bridge",
    card12_name_3: "Explorers",
    card12_name_4: "Stone Bridge",
    card13_name_1: "Exploiter",
    card13_name_3: "Servant",
    card14_name_1: "Bandit",
    card14_name_3: "Worker",
    card17_name_1: "Hill",
    card17_name_2: "Chapel",
    card17_name_3: "Cathedral",
    card17_name_4: "Church",
    card18_name_1: "Eastern Cliff",
    card18_name_2: "Forge",
    card18_name_3: "Wall",
    card18_name_4: "Armory",
    card20_name_1: "Swamp",
    card20_name_2: "Developed Swamp",
    card20_name_3: "Exotic Fruit Trees",
    card20_name_4: "Swamp Garden",
    card22_name_1: "Lake",
    card22_name_2: "Fisherman's Cottage",
    card22_name_3: "Lighthouse",
    card22_name_4: "Fishing Boat",
    card23_name_1: "STOP!",
    card24_name_1: "Fertile Land/Efficiency",
    card25_name_1: "Army",
    card25_name_3: "Great Army",
    card26_name_1: "Treasure",
    card26_name_3: "Immense Treasure",
    card27_name_1: "Exports",
    card27_name_3: "Mass Exports",
    card28_name_1: "Volcanic Eruption",
    card28_name_3: "Scorched Earth",
    card28_name_4: "Young Forest",
    card29_name_1: "Opportunist",
    card29_name_2: "Recruit",
    card29_name_3: "Artisan",
    card29_name_4: "Pretender Noble",
    card30_name_1: "STOP!",
    card31_name_1: "Entrepreneur",
    card31_name_2: "Hotel",
    card31_name_3: "Tavern",
    card31_name_4: "Cozy Bar",
    card32_name_1: "Scientist",
    card32_name_3: "Observatory",
    card32_name_4: "Laboratory",
    card33_name_1: "Engineer",
    card33_name_3: "Trebuchet",
    card34_name_1: "Inventor",
    card34_name_3: "Inspired Inventor",
    card36_name_1: "Mercenary",
    card36_name_3: "Sir __",
    card37_name_1: "STOP!",
    card38_name_1: "Strength in Unity",
    card38_name_3: "Military Domination",
    card39_name_1: "Expanding Borders",
    card39_name_3: "Optimization",
    card40_name_1: "Loyalty",
    card40_name_3: "Trade",
    card41_name_1: "Jester",
    card41_name_3: "Merchant Woman",
    card42_name_1: "Exploiter",
    card42_name_3: "Granary",
    card43_name_1: "Mason",
    card43_name_3: "Paved Road",
    card43_name_4: "Paved Street",
    card44_name_1: "Storm",
    card44_name_3: "Rain",
    card45_name_1: "Black Knight",
    card45_name_3: "Admiring Boy",
    card45_name_4: "Squire",
    card46_name_1: "Camp",
    card46_name_2: "Training Camp",
    card46_name_4: "Sir __",
    card47_name_1: "STOP!",
    card48_name_1: "Envoy",
    card48_name_2: "Emissary",
    card48_name_3: "Ambassador",
    card48_name_4: "Diplomat",
    card49_name_1: "Royal Architect",
    card49_name_3: "Bridge of Wonders",
    card50_name_1: "Traveler",
    card51_name_1: "Magistrate",
    card51_name_3: "Strategist",
    card52_name_1: "Big Mound",
    card52_name_2: "Hillside Hamlet",
    card52_name_3: "Summit Village",
    card52_name_4: "Village",
    card53_name_1: "Witch",
    card53_name_3: "Witch's Hut",
    card54_name_1: "Scribe",
    card54_name_3: "Architect",
    card55_name_1: "Lord Aethan",
    card55_name_3: "Lord Nimrod",
    card56_name_1: "Plague",
    card56_name_3: "Enemy Soldier",
    card57_name_1: "Assassin",
    card57_name_3: "Enemy Soldier",
    card58_name_1: "Burning City",
    card58_name_3: "Scorched Earth",
    card58_name_4: "Young Forest",
    card59_name_1: "Mysterious Cave",
    card59_name_2: "Underground",
    card59_name_3: "Treasure",
    card59_name_4: "Forgotten Civilization",
    card60_name_1: "Elite Bandit",
    card60_name_3: "Worker",
    card61_name_1: "Prince of Darkness",
    card61_name_3: "Admiring Boy",
    card61_name_4: "Squire",
    card63_name_1: "Distant Lands",
    card63_name_2: "Inn",
    card63_name_3: "Wall",
    card63_name_4: "Innkeeper",
    card65_name_1: "Tornado",
    card65_name_3: "Floods",
    card66_name_1: "Young Princess",
    card66_name_2: "Spoiled Princess",
    card66_name_3: "Well-Mannered Princess",
    card67_name_1: "Illness",
    card67_name_2: "Diminished",
    card67_name_3: "Feast",
    card68_name_1: "STOP!",
    card69_name_1: "Finishing Touch",
    card69_name_3: "Banquet",
    card70_name_1: "Royal Visit",
    card70_name_3: "Inquisitor",
    card73_name_1: "Western Canyon",
    card73_name_2: "Miners",
    card73_name_3: "Wall",
    card73_name_4: "Forced Labor",
    card74_name_1: "Coast",
    card74_name_2: "Shipyards",
    card74_name_3: "Trade Route",
    card74_name_4: "Merchant Ship",
    card76_name_1: "Pirate",
    card76_name_3: "Precious Ally",
    card77_name_1: "Lagoon",
    card77_name_2: "Canoe",
    card77_name_3: "Lush Island",
    card77_name_4: "Fortified Maritime Gate",
    card78_name_1: "Statue",
    card78_name_2: "Monument",
    card78_name_3: "Golden Column",
    card78_name_4: "Obelisk",
    card79_name_1: "Villa",
    card79_name_2: "Manor House",
    card79_name_3: "Palace",
    card79_name_4: "Estate",
    card80_name_1: "Cooperation",
    card80_name_3: "Favor",
    card81_name_1: "Aethien Domain",
    card82_name_1: "Altar",
    card82_name_2: "Sanctuary",
    card82_name_3: "Temple",
    card82_name_4: "Oratory",
    card84_name_1: "Mine",
    card84_name_2: "Deep Mine",
    card84_name_3: "Diamond Mine",
    card84_name_4: "Ruby Mine",
    card86_name_1: "Knighting",
    card86_name_3: "Renovation",
    card87_name_1: "Quests",
    card88_name_1: "An Ideal Tower",
    card89_name_1: "Bottomless Pit",
    card89_name_2: "Village Well",
    card89_name_3: "Pit Colony",
    card89_name_4: "Prison",
    card90_name_1: "Jewels",
    card91_name_1: "Build an Ark",
    card91_name_3: "The Ark",
    card92_name_1: "__",
    card93_name_1: "Treasure Hunt",
    card93_name_2: "Pirate Bay",
    card93_name_3: "Pirate Treasure",
    card93_name_4: "Treasure Map",
    card94_name_1: "Traitor",
    card94_name_3: "Curse",
    card95_name_1: "Astronomer",
    card95_name_3: "Astrologer",
    card96_name_1: "Alchemist",
    card96_name_2: "Strength Potion",
    card96_name_3: "Love Potion",
    card96_name_4: "Healing Potion",
    card97_name_1: "Spinning Wheel",
    card97_name_2: "Silk",
    card97_name_3: "Fashion",
    card97_name_4: "Cloth Export",
    card98_name_1: "Compass",
    card98_name_2: "Navigation",
    card98_name_3: "Calendar",
    card98_name_4: "Astrolabe",
    card99_name_1: "Public Punishment",
    card99_name_2: "Torture Instrument",
    card99_name_3: "Post-Barbarian Era",
    card99_name_4: "Torture Chamber",
    card100_name_1: "Public Sawmill",
    card100_name_2: "Wood Industry",
    card100_name_3: "Wood Export",
    card100_name_4: "Wood Cargo",
    card101_name_1: "Plowing",
    card101_name_2: "Agricultural Machines",
    card101_name_3: "Expanded Barn",
    card101_name_4: "Royal Warehouse",
    card102_name_1: "Fishing Boats",
    card102_name_2: "Like a Fish (in water)",
    card102_name_3: "Wood Export",
    card102_name_4: "Wood Cargo",
    card103_name_1: "Missionary",
    card103_name_3: "Beekeeper",
    card104_name_1: "Priest",
    card104_name_3: "Cardinal",
    card105_name_1: "Small Hillside Village",
    card105_name_2: "Hillside Village",
    card105_name_3: "City on the Hill",
    card105_name_4: "Great City",
    card106_name_1: "Camelot",
    card108_name_1: "Royal Ethereal Crystal",
    card109_name_1: "Small Guild",
    card109_name_2: "Guild",
    card109_name_3: "Guild Manor",
    card109_name_4: "Guild Hotel",
    card110_name_1: "Barn",
    card110_name_2: "Large Barn",
    card110_name_3: "Countryside",
    card110_name_4: "Prosperous Countryside",
    card111_name_1: "Manor",
    card111_name_2: "Grand Manor",
    card111_name_3: "Imposing Residence",
    card111_name_4: "Noble Residence",
    card112_name_1: "Stable",
    card112_name_3: "Stable Master",
    card112_name_4: "Large Stable",
    card113_name_1: "Horse",
    card116_name_1: "Aric Blackwood",
    card116_name_3: "Eadric Shadowstrike",
    card117_name_1: "Trade Relations",
    card118_name_1: "Small School",
    card118_name_2: "School",
    card118_name_3: "Renowned School",
    card118_name_4: "Recognized School",
    card120_name_1: "Investor",
    card121_name_1: "King Alahar",
    card121_name_3: "Queen Jemimah",
    card122_name_1: "Royal Consort",
    card123_name_1: "Majestic Castle",
    card123_name_2: "Monumental Castle",
    card123_name_3: "Impregnable Fortress",
    card123_name_4: "Fortress",
    card124_name_1: "Gem Extraction",
    card124_name_2: "Gem Cutting",
    card124_name_3: "Gem Exhibition",
    card124_name_4: "Gem Polishing",
    card125_name_1: "Great Temple",
    card125_name_2: "Sculpted Temple",
    card125_name_3: "Temple of Light",
    card125_name_4: "Legendary Temple",
    card126_name_1: "Pine Forest",
    card126_name_2: "Pine Forest",
    card126_name_3: "Pond",
    card126_name_4: "Fishing Pond",
    card127_name_1: "Rocks",
    card127_name_3: "Mushrooms",
    card128_name_1: "Ravine",
    card128_name_2: "Chasm",
    card128_name_3: "Excavation Site",
    card128_name_4: "Ancient Ruins",
    card129_name_1: "Hot Springs",
    card129_name_2: "Fountain",
    card129_name_3: "Pure Water River",
    card129_name_4: "Canals",
    card130_name_1: "Border Town",
    card130_name_2: "Watchtower",
    card130_name_3: "Inner Wall",
    card130_name_4: "Double Wall",
    card131_name_1: "Northern Plains",
    card131_name_2: "Moat",
    card131_name_3: "Wall",
    card131_name_4: "Moat Bridge",
    card132_name_1: "Southern Hills",
    card132_name_2: "Terraces",
    card132_name_3: "Windmill",
    card132_name_4: "Walls",
    card133_name_1: "Raid",
    card133_name_2: "Razzia",
    card133_name_3: "Sacking",
    card133_name_4: "Plunder",
    card134_name_1: "Handsome Rival",
    card134_name_3: "Noble Ally",
    card135_name_1: "Border Lands",
    card135_name_2: "Occupation",
    card135_name_3: "Vassal States",
    card135_name_4: "Allied Villages",
    card136_name_1: "Prosperity (expansion)",
    card136_name_2: "Stocking Reserves",
    card136_name_3: "Royal Decree",
    card136_name_4: "Uprising",
    card137_name_1: "The Water Mill (expansion)",
    card137_name_2: "Productive Harvest",
    card137_name_3: "Abandoned Farms",
    card137_name_4: "Surplus",
    card138_name_1: "Contested Border (expansion)",
    card138_name_2: "Espionage",
    card138_name_3: "Resistance",
    card138_name_4: "Attack",

    // Card Specific Names interaction
    bandit: "Bandit",
    wall: "Wall",

    // Card Effects Descriptions
    staysInPlay: "Stays in play.",
    cardEffect_Plains: "Discard a friendly card to gain gold x2.",

    // Card Descriptions
    
  }
};

// Context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider
export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };
  
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook personnalisé
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};

// Composant de sélection de langue
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { value: "fr", label: "Français", image: "/languages/french.png" },
    { value: "en", label: "English", image: "/languages/english.png" },
  ];

  const currentLang = languages.find((l) => l.value === language);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border rounded px-3 py-1"
      >
        <img src={currentLang?.image} alt="" className="w-5 h-5" />
        {currentLang?.label}
      </button>

      {open && (
        <div className="absolute bg-white border rounded mt-1 shadow-md w-full">
          {languages.map((lang) => (
            <div
              key={lang.value}
              onClick={() => {
                setLanguage(lang.value as Language);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={lang.image} alt={lang.label} className="w-5 h-5" />
              <span>{lang.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};