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
  | 'coin' | 'wood' | 'stone' | 'sword' | 'metal' | 'tradeGood' | 'fame'
  
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
  | 'distant_mountain' | 'rocky_area' | 'shallow_mines' | 'quarry'
  | 'forest' | 'felled_forest' | 'sacred_well' | 'lumberjack'
  | 'headquarters' | 'town_hall' | 'castle' | 'keep'
  | 'trader' | 'bazaar' | 'festival' | 'market'
  | 'jungle' | 'huge_trees' | 'treehouses' | 'deep_jungle'
  | 'river' | 'bridge' | 'explorers' | 'stone_bridge'
  | 'field_worker' | 'Servant'
  | 'bandit' | 'worker'
  | 'hill' | 'chapel' | 'cathedral' | 'church'
  | 'east_cliffs' | 'smithy' | 'wall' | 'arsenal'
  | 'swamp' | 'accessible_swamp' | 'exotic_fruit_trees' | 'swamp_garden'
  | 'lake' | 'fishermans_cabin' | 'lighthouse' | 'fishing_boat'
  | 'stop'
  | 'fertile_soil_efficiency'
  | 'army' | 'grand_army'
  | 'treasure' | 'extended_treseaure'
  | 'export' | 'mass_export'
  | 'volcanic_eruption' | 'ashlands' | 'young_forest'
  | 'opportunist' | 'recruit' | 'labourer' | 'pretend_noble'
  | 'etrepeneur' | 'hotel' | 'tavern' | 'cozy_pub'
  | 'scientist' | 'observatory' | 'lab'
  | 'engineer' | 'trebuchet'
  | 'inventor' | 'inspired_inventor'
  | 'mercenary' | 'sir__'
  | 'strength_in_number' | 'military_domination'
  | 'expanding_borders' | 'maximizer'
  | 'loyalty'
  | 'jester' | 'merchant'
  | 'storage'
  | 'mason' | 'brick_road' | 'stone_street'
  | 'thunderstorm' | 'rain'
  | 'dark_knight' | 'impressed_boy' | 'squire'
  | 'camp' | 'training_grounds'
  | 'envoy' | 'emissary' | 'ambassador' | 'diplomat'
  | 'royal_architect' | 'bridge_of_marvel'
  | 'traveller'
  | 'magistrate' | 'strategist'
  | 'mighty_mound' | 'hill_settlement' | 'peak_village' | 'hill_village'
  | 'witch' | 'witch_cabin'
  | 'scribe' | 'architect'
  | 'lord_aethan' | 'lord_nimrod'
  | 'plague' | 'enemy_soldier'
  | 'assassin'
  | 'city_fire'
  | 'mysterious_cave' | 'dungeon' | 'treasures' | 'lost_civilization'
  | 'skilled_bandit'
  | 'dark_prince'
  | 'far_fields' | 'inn' | 'innkeeper'
  | 'tornado' | 'flooding'
  | 'young_princess' | 'spoiled_princess' | 'educated_princess'
  | 'sickness' | 'crippled' | 'feast'
  | 'finishing_touch' | 'banquet'
  | 'royal_visit' | 'inquisitor'
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
    coin: 'Or',
    wood: 'Bois',
    stone: 'Pierre',
    sword: 'Militaire',
    metal: 'Lingot',
    tradeGood: 'Exportation',
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
    distant_mountain: "Montagnes Lointaines",
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
    jungle: "Jungle",
    huge_trees: "Arbres Géants",
    treehouses: "Cabanes dans les Arbres",
    deep_jungle: "Jungle Profonde",
    river: "Rivière",
    bridge: "Pont",
    explorers: "Explorateurs",
    stone_bridge: "Pont de Pierre",
    field_worker: "Exploitant",
    Servant: "Domestique",
    bandit: "Bandit",
    worker: "Travailleur",
    hill: "Colline",
    chapel: "Chappelle",
    cathedral: "Cathédrale",
    church: "Eglise",
    east_cliffs: "Falaise de l'Est",
    smithy: "Forge",
    wall: "Muraille",
    arsenal: "Armurerie",
    swamp: "Marais",
    accessible_swamp: "Marais Aménagés",
    exotic_fruit_trees: "Arbres à Fruits Exotiques",
    swamp_garden: "Jardin du Marais",
    lake: "Lac",
    fishermans_cabin: "Chalet du Pêcheur",
    lighthouse: "Phare",
    fishing_boat: "Bateau de Pêche",
    stop: "STOP !",
    fertile_soil_efficiency: "Terre Fertile/Efficacité",
    army: "Armée",
    grand_army: "Grande Armée",
    treasure: "Trésor",
    extended_treseaure: "Immense Trésor",
    export: "Exportations",
    mass_export: "Exportations de Masse",
    volcanic_eruption: "Eruption Volcanique",
    ashlands: "Terres Brulées",
    young_forest: "Jeune Forêt",
    opportunist: "Opportuniste",
    recruit: "Recrue",
    labourer: "Artisan",
    pretend_noble: "Prétendu Noble",
    etrepeneur: "Entrepreneur",
    hotel: "Hôtel",
    tavern: "Taverne",
    cozy_pub: "Bar Confortable",
    scientist: "Scientifique",
    observatory: "Observatoire",
    lab: "Laboratoire",
    engineer: "Ingénieur",
    trebuchet: "Trébuchet",
    inventor: "Inventrice",
    inspired_inventor: "Inventrice Inspirée",
    mercenary: "Mercenaire",
    sir__: "Sir __",
    strength_in_number: "L'Union fait la Force",
    military_domination: "Domination Militaire",
    expanding_borders: "Elargir les frontières",
    maximizer: "Optimisation",
    loyalty: "Loyauté",
    jester: "Bouffon",
    merchant: "Marchande",
    storage: "Grenier",
    mason: "Maçon",
    brick_road: "Route Pavée",
    stone_street: "Rue Pavée",
    thunderstorm: "Orage",
    rain: "Pluie",
    dark_knight: "Chevalier Noir",
    impressed_boy: "Garçon Admiratif",
    squire: "Ecuyer",
    camp: "Camp",
    training_grounds: "Camp d'Entrainement",
    envoy: "Envoyé",
    emissary: "Emissaire",
    ambassador: "Ambassadeur",
    diplomat: "Diplomate",
    royal_architect: "Architecte Royal",
    bridge_of_marvel: "Pont des Merveilles",
    traveller: "Voyageur",
    magistrate: "Magistrat",
    strategist: "Stratège",
    mighty_mound: "Grosse Butte",
    hill_settlement: "Hameau sur la Colline",
    peak_village: "Village Culminant",
    hill_village: "Village",
    witch: "Sorcière",
    witch_cabin: "Hutte de la Sorcière",
    scribe: "Scribe",
    architect: "Architecte",
    lord_aethan: "Lord Aethan",
    lord_nimrod: "Lord Nimrod",
    plague: "Peste",
    enemy_soldier: "Soldat Ennemi",
    assassin: "Assassin",
    city_fire: "Ville en Flamme",
    mysterious_cave: "Grotte Mystérieuse",
    dungeon: "Souterrains",
    treasures: "Trésor",
    lost_civilization: "Civilisation Oubliée",
    skilled_bandit: "Bandit d'Elite",
    dark_prince: "Prince des Ténèbres",
    far_fields: "Terres Lointaines",
    inn: "Auberge",
    innkeeper: "Aubergiste",
    tornado: "Tornade",
    flooding: "Innodations",
    young_princess: "Jeune Princesse",
    spoiled_princess: "Princesse Pourrie Gâtée",
    educated_princess: "Princesse Bien Elevée",
    sickness: "Maladie",
    crippled: "Diminué",
    feast: "Festin",
    finishing_touch: "Touche Finale",
    banquet: "Banquet",
    royal_visit: "Visite Royale",
    inquisitor: "Inquisitrice",
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

    // Card Effects Descriptions
    staysInPlay: "Reste en jeu.",
    cardEffect_Plains: "Défaussez une carte alliée pour gagner coin x2.",

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
    coin: 'Gold',
    wood: 'Wood',
    stone: 'Stone',
    sword: 'Military',
    metal: 'Ingot',
    tradeGood: 'Trade Good',
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
    distant_mountain: "Distant Mountain",
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
    jungle: "Jungle",
    huge_trees: "Huge Trees",
    treehouses: "Treehouses",
    deep_jungle: "Deep Jungle",
    river: "River",
    bridge: "Bridge",
    explorers: "Explorers",
    stone_bridge: "Stone Bridge",
    field_worker: "Field Worker",
    Servant: "Servant",
    bandit: "Bandit",
    worker: "Worker",
    hill: "Hill",
    chapel: "Chapel",
    cathedral: "Cathedral",
    church: "Church",
    east_cliffs: "East Cliffs",
    smithy: "Smithy",
    wall: "Wall",
    arsenal: "Arsenal",
    swamp: "Swamp",
    accessible_swamp: "Accessible Swamp",
    exotic_fruit_trees: "Exotic Fruit Trees",
    swamp_garden: "Swamp Garden",
    lake: "Lake",
    fishermans_cabin: "Fisherman's Cabin",
    lighthouse: "Lighthouse",
    fishing_boat: "Fishing Boat",
    stop: "STOP!",
    fertile_soil_efficiency: "Fertile Soil/Efficiency",
    army: "Army",
    grand_army: "Grand Army",
    treasure: "Treasure",
    extended_treseaure: "Immense Treasure",
    export: "Exports",
    mass_export: "Mass Exports",
    volcanic_eruption: "Volcanic Eruption",
    ashlands: "Ashlands",
    young_forest: "Young Forest",
    opportunist: "Opportunist",
    recruit: "Recruit",
    labourer: "Labourer",
    pretend_noble: "Pretend Noble",
    etrepeneur: "Entrepreneur",
    hotel: "Hotel",
    tavern: "Tavern",
    cozy_pub: "Cozy Pub",
    scientist: "Scientist",
    observatory: "Observatory",
    lab: "Lab",
    engineer: "Engineer",
    trebuchet: "Trebuchet",
    inventor: "Inventor",
    inspired_inventor: "Inspired Inventor",
    mercenary: "Mercenary",
    sir__: "Sir __",
    strength_in_number: "Strength in Numbers",
    military_domination: "Military Domination",
    expanding_borders: "Expanding Borders",
    maximizer: "Maximizer",
    loyalty: "Loyalty",
    jester: "Jester",
    merchant: "Merchant",
    storage: "Storage",
    mason: "Mason",
    brick_road: "Brick Road",
    stone_street: "Paved Street",
    thunderstorm: "Thunderstorm",
    rain: "Rain",
    dark_knight: "Dark Knight",
    impressed_boy: "Admiring Boy",
    squire: "Squire",
    camp: "Camp",
    training_grounds: "Training Grounds",
    envoy: "Envoy",
    emissary: "Emissary",
    ambassador: "Ambassador",
    diplomat: "Diplomat",
    royal_architect: "Royal Architect",
    bridge_of_marvel: "Bridge of Marvel",
    traveller: "Traveller",
    magistrate: "Magistrate",
    strategist: "Strategist",
    mighty_mound: "Mighty Mound",
    hill_settlement: "Hill Settlement",
    peak_village: "Summit Village",
    hill_village: "Village",
    witch: "Witch",
    witch_cabin: "Witch Cabin",
    scribe: "Scribe",
    architect: "Architect",
    lord_aethan: "Lord Aethan",
    lord_nimrod: "Lord Nimrod",
    plague: "Plague",
    enemy_soldier: "Enemy Soldier",
    assassin: "Assassin",
    city_fire: "City Fire",
    mysterious_cave: "Mysterious Cave",
    dungeon: "Dungeon",
    treasures: "Treasures",
    lost_civilization: "Lost Civilization",
    skilled_bandit: "Skilled Bandit",
    dark_prince: "Dark Prince",
    far_fields: "Distant Lands",
    inn: "Inn",
    innkeeper: "Innkeeper",
    tornado: "Tornado",
    flooding: "Flooding",
    young_princess: "Young Princess",
    spoiled_princess: "Spoiled Princess",
    educated_princess: "Educated Princess",
    sickness: "Sickness",
    crippled: "Crippled",
    feast: "Feast",
    finishing_touch: "Finishing Touch",
    banquet: "Banquet",
    royal_visit: "Royal Visit",
    inquisitor: "Inquisitor",
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

    // Card Effects Descriptions
    staysInPlay: "Stays in play.",
    cardEffect_Plains: "Discard a friendly card to gain coin x2.",

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