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
  | 'coin' | 'wood' | 'stone' | 'sword' | 'metal' | 'tradegood' | 'fame'
  
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
  | 'field_worker' | 'servant'
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
  | 'loyalty' | 'trader_obj'
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
  | 'west_canyon' | 'miners' | 'forced_labour'
  | 'shore' | 'shipyard' | 'trade_route' | 'trade_ship'
  | 'pirate' | 'skilled_ally'
  | 'lagoon' | 'raft' | 'sea_gate_wall' | 'lush_island'
  | 'statue' | 'monument' | 'golden_pillar' | 'obelisk'
  | 'villa' | 'estate' | 'palace' | 'mansion'
  | 'cooperation' | 'favor'
  | 'aethan_estate'
  | 'shrine' | 'sanctuary' | 'temple' | 'oratory'
  | 'mine' | 'deep_mine' | 'diamond_mine' | 'ruby_mine'
  | 'dubbing' | 'renovation'
  | 'quests'
  | 'a_perfect_tower'
  | 'deep_pit' | 'town_well' | 'pit_settlement' | 'prison'
  | 'jewellery'
  | 'build_an_ark' | 'the_ark'
  | '___'
  | 'treasure_hunt' | 'pirate_cove' | 'pirate_treasure' | 'treasure_map'
  | 'backstabber' | 'blood_curse'
  | 'astronomer' | 'astrologist'
  | 'alchemist' | 'potion_of_stregnt' | 'love_potion' | 'healing_potion'
  | 'spinning_wheel' | 'silk' | 'fashion' | 'cloth_export'
  | 'compass' | 'navigation' | 'calendar' | 'astrolabe'
  | 'public_punishment' | 'torture_device' | 'post_barbaric' | 'torture_chamber'
  | 'saw_mill' | 'wood_industry' | 'wood_export' | 'wood_shipment'
  | 'ploughs' | 'farming_machines' | 'larger_barns' | 'royal_storehouse'
  | 'fishing_ships' | 'fish_n_chips' | 'fish_quota' | 'fishing_excellence'
  | 'missionary' | 'beekeeper'
  | 'priest' | 'cardinal'
  | 'small_hill_town' | 'hill_town' | 'city_on_a_hill' | 'large_town'
  | 'camelot'
  | 'ether_crystal'
  | 'small_guild' | 'guild' | 'grand_guild_hall' | 'guild_hall'
  | 'barn' | 'large_barn' | 'thriving_countryside' | 'countryside'
  | 'manor' | 'large_manor' | 'grand_residence' | 'noble_residence'
  | 'stable' | 'groom' | 'large_stable'
  | 'aric_blackwood' | 'eadric_shadowstrike'
  | 'trade_relations'
  | 'small_school' | 'school' | 'renowned_school' | 'prominent_school'
  | 'investor'
  | 'king_alahar' | 'queen_jeminah'
  | 'royal_consort'
  | 'grand_castle' | 'huge_castle' | 'impregnable_fortress' | 'fortress'
  | 'jewel_extraction' | 'jewel_cutting' | 'jewel_exhibit' | 'jewel_polishing'
  | 'large_temple' | 'ornate_temple' | 'temple_of_light' | 'legendary_temple'
  | 'pine_forest' | 'pond' | 'fish_pond'
  | 'boulders' | 'mushrooms'
  | 'ravine' | 'chasm' | 'excavation_site' | 'ancient_ruins'
  | 'hot_springs' | 'fountain' | 'sweet_water_river' | 'canals'
  | 'town_border' | 'watchtower' | 'inner_wall' | 'double_wall'
  | 'north_plains' | 'moat' | 'moat_bridge'
  | 'south_hills' | 'terrace_land' | 'windmill'
  | 'raid' | 'looting' | 'plundering' | 'pillaging'
  | 'handsome_rival' | 'noble_ally'
  | 'bordering_lands' | 'occupation' | 'vassal_states' | 'unruly_towns'
  | 'prosperity_expansion' | 'hoarding' | 'royal_decree' | 'uprising'
  | 'the_water_mill_expansion' | 'efficient_farming' | 'obsolete_farms' | 'surplus'
  | 'border_dispute_expansion' | 'espionage' | 'resistance' | 'attack'

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
    tradegood: 'Exportation',
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
    servant: "Domestique",
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
    trader_obj: "Commerce",
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
    treasures: "Trésors",
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
    west_canyon: "Canyon de l'Ouest",
    miners: "Mineurs",
    forced_labour: "Travaux Forcés",
    shore: "Littoral",
    shipyard: "Chantiers Navals",
    trade_route: "Route Commerciale",
    trade_ship: "Navire Marchand",
    pirate: "Pirate",
    skilled_ally: "Précieux Allié",
    lagoon: "Lagon",
    raft: "Canoë",
    sea_gate_wall: "Porte Maritime Fortifiée",
    lush_island: "Île Luxuriante",
    statue: "Statue",
    monument: "Monument",
    golden_pillar: "Colonne Dorée",
    obelisk: "Obélisque",
    villa: "Villa",
    estate: "Demeure",
    palace: "Palais",
    mansion: "Manoir",
    cooperation: "Coopération",
    favor: "Faveur",
    aethan_estate: "Domaine Aethien",
    shrine: "Autel",
    sanctuary: "Sanctuaire",
    temple: "Temple",
    oratory: "Oratoire",
    mine: "Mine",
    deep_mine: "Mine Profonde",
    diamond_mine: "Mine de Diamant",
    ruby_mine: "Mine de Rubis",
    dubbing: "Adoubement",
    renovation: "Rénovation",
    quests: "Quêtes",
    a_perfect_tower: "Une Tour Idéale",
    deep_pit: "Fosse Insondable",
    town_well: "Puits du Village",
    pit_settlement: "Colonie de la Fosse",
    prison: "Prison",
    jewellery: "Bijoux",
    build_an_ark: "Construire une Arche",
    the_ark: "L'Arche",
    ___: "__",
    treasure_hunt: "Chasse au Trésor",
    pirate_cove: "Baie des Pirates",
    pirate_treasure: "Trésor Pirate",
    treasure_map: "Carte au Trésor",
    backstabber: "Traître",
    blood_curse: "Malédiction",
    astronomer: "Astronome",
    astrologist: "Astrologue",
    alchemist: "Alchimiste",
    potion_of_stregnt: "Potion de Force",
    love_potion: "Potion d'Amour",
    healing_potion: "Potion de Soin",
    spinning_wheel: "Rouet",
    silk: "Soie",
    fashion: "Mode",
    cloth_export: "Exportation d'Etoffe",
    compass: "Boussole",
    navigation: "Navigation",
    calendar: "Calendrier",
    astrolabe: "Astrolabe",
    public_punishment: "Châtiment Publique",
    torture_device: "Instrument de Torture",
    post_barbaric: "Ere Post-Barbare",
    torture_chamber: "Salle de Torture",
    saw_mill: "Scierie Publique",
    wood_industry: "Industrie du Bois",
    wood_export: "Exportation de Bois",
    wood_shipment: "Cargaison de Bois",
    ploughs: "Labours",
    farming_machines: "Machines Agricoles",
    larger_barns: "Grange Agrandie",
    royal_storehouse: "Entrepôt Royal",
    fishing_ships: "Bateaux de Pêche",
    fish_n_chips: "Comme un Poisson (dans l'eau)",
    fish_quota: "Quota de Pêche",
    fishing_excellence: "Pêche d'Excellence",
    missionary: "Missionaire",
    beekeeper: "Apiculteur",
    priest: "Prêtre",
    cardinal: "Cardinal",
    small_hill_town: "Petit Village sur la Colline",
    hill_town: "Village sur la Colline",
    city_on_a_hill: "Ville sur la Colline",
    large_town: "Grande Ville",
    camelot: "Camelot",
    ether_crystal: "Cristal Ethéré Royale",
    small_guild: "Petite Guilde",
    guild: "Guilde",
    grand_guild_hall: "Manoir de la Guilde",
    guild_hall: "Hotêl de la Guilde",
    barn: "Grange",
    large_barn: "Grande Grange",
    thriving_countryside: "Campagne Prospère",
    countryside: "Campagne",
    manor: "Manoir",
    large_manor: "Grand Manoir",
    grand_residence: "Imposante Demeur",
    noble_residence: "Noble Demeur",
    stable: "Etable",
    groom: "Palfrenier",
    large_stable: "Grande Etable",
    aric_blackwood: "Aric Blackwood",
    eadric_shadowstrike: "Eadric Shadowstrike",
    trade_relations: "Relations Commerciales",
    small_school: "Petite Ecole",
    school: "Ecole",
    renowned_school: "Ecole Réputée",
    prominent_school: "Ecole Reconnue",
    investor: "Investisseur",
    king_alahar: "Roi Alahar",
    queen_jeminah: "Reine Jemimah",
    royal_consort: "Consort Royal",
    grand_castle: "Château Majestueux",
    huge_castle: "Château Monumental",
    impregnable_fortress: "Forteresse Imprenable",
    fortress: "Forteresse",
    jewel_extraction: "Extraction de joyaux",
    jewel_cutting: "Taille de Joyau",
    jewel_exhibit: "Exposition du Joyau",
    jewel_polishing: "Polissage du Joyau",
    large_temple: "Grand Temple",
    ornate_temple: "Temple Sculpté",
    temple_of_light: "Temple de la Lumière",
    legendary_temple: "Temple Légendaire",
    pine_forest: "Forêt de Pins",
    pond: "Mare",
    fish_pond: "Mare Poissonneuse",
    boulders: "Rochers",
    mushrooms: "Champignons",
    ravine: "Ravin",
    chasm: "Gouffre",
    excavation_site: "Site de Fouilles",
    ancient_ruins: "Ruines Antiques",
    hot_springs: "Sources Chaudes",
    fountain: "Fontaine",
    sweet_water_river: "Rivière d'Eau Pure",
    canals: "Canaux",
    town_border: "Ville Frontalière",
    watchtower: "Tour de Garde",
    inner_wall: "Mur Intérieur",
    double_wall: "Double Muraille",
    north_plains: "Plaines du Nord",
    moat: "Douves",
    moat_bridge: "Pont des Douves",
    south_hills: "Collines Meridionales",
    terrace_land: "Terrasses",
    windmill: "Moulin à Vent",
    raid: "Raid",
    looting: "Razzia",
    plundering: "Saccage",
    pillaging: "Pillage",
    handsome_rival: "Rival Beau-Gosse",
    noble_ally: "Allié Noble",
    bordering_lands: "Terres Frontalières",
    occupation: "Occupation",
    vassal_states: "Etats Vassaux",
    unruly_towns: "Villages Alliés",
    prosperity_expansion: "Prospérité (extension)",
    hoarding: "Engranger des réserves",
    royal_decree: "Décret Royal",
    uprising: "Soulèvement",
    the_water_mill_expansion: "Le Moulin à Eau (extension)",
    efficient_farming: "Récolte Productive",
    obsolete_farms: "Fermes Abandonnées",
    surplus: "Surplus",
    border_dispute_expansion: "Frontière Contestée (extension)",
    espionage: "Espionnage",
    resistance: "Résistance",
    attack: "Attaque",

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
    tradegood: 'Trade Good',
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
    servant: "Servant",
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
    trader_obj: "Trader",
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
    west_canyon: "West Canyon",
    miners: "Miners",
    forced_labour: "Forced Labour",
    shore: "Shore",
    shipyard: "Shipyard",
    trade_route: "Trade Route",
    trade_ship: "Trade Ship",
    pirate: "Pirate",
    skilled_ally: "Skilled Ally",
    lagoon: "Lagoon",
    raft: "Raft",
    sea_gate_wall: "Sea Gate Wall",
    lush_island: "Lush Island",
    statue: "Statue",
    monument: "Monument",
    golden_pillar: "Golden Pillar",
    obelisk: "Obelisk",
    villa: "Villa",
    estate: "Estate",
    palace: "Palace",
    mansion: "Mansion",
    cooperation: "Cooperation",
    favor: "Favor",
    aethan_estate: "Aethan Estate",
    shrine: "Shrine",
    sanctuary: "Sanctuary",
    temple: "Temple",
    oratory: "Oratory",
    mine: "Mine",
    deep_mine: "Deep Mine",
    diamond_mine: "Diamond Mine",
    ruby_mine: "Ruby Mine",
    dubbing: "Dubbing",
    renovation: "Renovation",
    quests: "Quests",
    a_perfect_tower: "A Perfect Tower",
    deep_pit: "Deep Pit",
    town_well: "Town Well",
    pit_settlement: "Pit Settlement",
    prison: "Prison",
    jewellery: "Jewellery",
    build_an_ark: "Build an Ark",
    the_ark: "The Ark",
    ___: "__",
    treasure_hunt: "Treasure Hunt",
    pirate_cove: "Pirate Cove",
    pirate_treasure: "Pirate Treasure",
    treasure_map: "Treasure Map",
    backstabber: "Backstabber",
    blood_curse: "Blood Curse",
    astronomer: "Astronomer",
    astrologist: "Astrologist",
    alchemist: "Alchemist",
    potion_of_stregnt: "Potion of Strength",
    love_potion: "Love Potion",
    healing_potion: "Healing Potion",
    spinning_wheel: "Spinning Wheel",
    silk: "Silk",
    fashion: "Fashion",
    cloth_export: "Cloth Export",
    compass: "Compass",
    navigation: "Navigation",
    calendar: "Calendar",
    astrolabe: "Astrolabe",
    public_punishment: "Public Punishment",
    torture_device: "Torture Device",
    post_barbaric: "Post-Barbaric",
    torture_chamber: "Torture Chamber",
    saw_mill: "Saw mill",
    wood_industry: "Wood Industry",
    wood_export: "Wood Export",
    wood_shipment: "Wood Shipment",
    ploughs: "ploughs",
    farming_machines: "Farming Machines",
    larger_barns: "Larger Barns",
    royal_storehouse: "Royal Storehouse",
    fishing_ships: "Fishing Ships",
    fish_n_chips: "Fish n' Chips",
    fish_quota: "Fish Quota",
    fishing_excellence: "Fishing Excellence",
    missionary: "Missionary",
    beekeeper: "Beekeeper",
    priest: "Priest",
    cardinal: "Cardinal",
    small_hill_town: "Small Hill Town",
    hill_town: "Hill Town",
    city_on_a_hill: "City on a Hill",
    large_town: "Large City",
    camelot: "Camelot",
    ether_crystal: "Ether Crystal",
    small_guild: "Small Guild",
    guild: "Guild",
    grand_guild_hall: "Grand Guild Hall",
    guild_hall: "Guild Hall",
    barn: "Barn",
    large_barn: "Large Barn",
    thriving_countryside: "Thriving Countryside",
    countryside: "Countryside",
    manor: "Manor",
    large_manor: "Large Manor",
    grand_residence: "Grand Residence",
    noble_residence: "Noble Residence",
    stable: "Stable",
    groom: "Stable Master",
    large_stable: "Large Stable",
    aric_blackwood: "Aric Blackwood",
    eadric_shadowstrike: "Eadric Shadowstrike",
    trade_relations: "Trade Relations",
    small_school: "Small School",
    school: "School",
    renowned_school: "Renowned School",
    prominent_school: "Prominent School",
    investor: "Investor",
    king_alahar: "King Alahar",
    queen_jeminah: "Queen Jemimah",
    royal_consort: "Royal Consort",
    grand_castle: "Grand Castle",
    huge_castle: "Monumental Castle",
    impregnable_fortress: "Impregnable Fortress",
    fortress: "Fortress",
    jewel_extraction: "Jewel Extraction",
    jewel_cutting: "Jewel Cutting",
    jewel_exhibit: "Jewel Exhibition",
    jewel_polishing: "Jewel Polishing",
    large_temple: "Large Temple",
    ornate_temple: "Ornate Temple",
    temple_of_light: "Temple of Light",
    legendary_temple: "Legendary Temple",
    pine_forest: "Pine Forest",
    pond: "Pond",
    fish_pond: "Fish Pond",
    boulders: "Boulders",
    mushrooms: "Mushrooms",
    ravine: "Ravine",
    chasm: "Chasm",
    excavation_site: "Excavation Site",
    ancient_ruins: "Ancient Ruins",
    hot_springs: "Hot Springs",
    fountain: "Fountain",
    sweet_water_river: "Sweet Water River",
    canals: "Canals",
    town_border: "Town Border",
    watchtower: "Watchtower",
    inner_wall: "Inner Wall",
    double_wall: "Double Wall",
    north_plains: "Northern Plains",
    moat: "Moat",
    moat_bridge: "Moat Bridge",
    south_hills: "South Hills",
    terrace_land: "Terrace Land",
    windmill: "Windmill",
    raid: "Raid",
    looting: "Looting",
    plundering: "Plundering",
    pillaging: "Pillaging",
    handsome_rival: "Handsome Rival",
    noble_ally: "Noble Ally",
    bordering_lands: "Bordering Lands",
    occupation: "Occupation",
    vassal_states: "Vassal States",
    unruly_towns: "Unrlued Towns",
    prosperity_expansion: "Prosperity (expansion)",
    hoarding: "Hoarding",
    royal_decree: "Royal Decree",
    uprising: "Uprising",
    the_water_mill_expansion: "The Water Mill (expansion)",
    efficient_farming: "Efficient Farming",
    obsolete_farms: "Obsolete Farms",
    surplus: "Surplus",
    border_dispute_expansion: "Contested Border (expansion)",
    espionage: "Espionage",
    resistance: "Resistance",
    attack: "Attack",

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