import React, { createContext, useContext, useState } from 'react';

// Types
export type Language = 'fr' | 'en';

export type TranslationKeys = 
  // UI Elements
  | 'deck' | 'discard' | 'playArea' | 'blocked' | 'permanentZone' | 'campaign' | 'destroy' | 'purged'
  | 'settings' | 'guide' | 'about' | 'close' | 'save' | 'continue' | 'reset'
  | 'newTurn' | 'pass' | 'advance' | 'endRound' | 'shuffleDeck' | 'noCost' | 'emptyCheckbox'
  | 'emptySide' | 'card' | 'none' | 'cardNames' | 'autoSelected' | 'side' | 'selectUpgradeRemoveCost'
  | 'noUpgradeAvailable' | 'selectAnUpgrade' | 'selectAResource' | 'failedToSave' | 'failedToLoad'
  | 'select' | 'id' | 'preview' | 'endGame' | 'seeDeck' | 'seeDiscard' | 'cardsList' | 'triggeredCard'
  | 'selectCardToPurge' | 'chooseExpansion' | 'expansionCard' | 'expansionBlock' | 'scores' | 'baseGame'
  | 'totalScore' | 'endExpansion' | 'seePurged' | 'add' | 'top' | 'bottom'
  
  // Cards Elements
  | 'frontUp' | 'frontDown' | 'backUp' | 'backDown'
  | 'upgrades' | 'resources' | 'effect' | 'checkboxes'
  | 'apply' | 'cancel' | 'confirm' | 'front' | 'back'
  | 'up' | 'down'
  
  // Cards Types
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
  | 'and' | 'yes' | 'no'

  // Expansions
  | 'ridding_the_woods'

  // Cards Names
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

  // Cards Effects Descriptions
  | 'staysInPlay'
  | 'effect_description_plains'
  | 'effect_description_rocky_area'
  | 'effect_description_shallow_mines'
  | 'effect_description_forest'
  | 'effect_description_sacred_well'
  | 'effect_description_town_hall'
  | 'effect_description_castle'
  | 'effect_description_keep'
  | 'effect_description_trader'
  | 'effect_description_bazaar'
  | 'effect_description_market'
  | 'effect_description_jungle'
  | 'effect_description_huge_trees'
  | 'effect_description_explorers'
  | 'effect_description_field_worker'
  | 'effect_description_servant'
  | 'effect_description_bandit'
  | 'effect_description_worker'
  | 'effect_description_chapel'
  | 'effect_description_cathedral'
  | 'effect_description_church'
  | 'effect_description_smithy'
  | 'effect_description_arsenal'
  | 'effect_description_lighthouse'
  | 'effect_description_fishing_boat'
  | 'effect_description_stop_1'
  | 'effect_description_fertile_soil_efficiency'
  | 'effect_description_army'
  | 'effect_description_grand_army'
  | 'effect_description_treasure'
  | 'effect_description_extended_treasure'
  | 'effect_description_export'
  | 'effect_description_mass_export'
  | 'effect_description_volcanic_eruption'
  | 'effect_description_young_forest'
  | 'effect_description_pretend_noble'
  | 'effect_description_stop_2'
  | 'effect_description_etrepeneur'
  | 'effect_description_hotel'
  | 'effect_description_tavern'
  | 'effect_description_cozy_pub'
  | 'effect_description_scientist'
  | 'effect_description_observatory'
  | 'effect_description_lab'
  | 'effect_description_engineer'
  | 'effect_description_trebuchet'
  | 'effect_description_inventor'
  | 'effect_description_inspired_inventor'
  | 'effect_description_mercenary'
  | 'effect_description_sir__'
  | 'effect_description_stop_3'
  | 'effect_description_strength_in_number'
  | 'effect_description_military_domination'
  | 'effect_description_expanding_borders'
  | 'effect_description_maximizer'
  | 'effect_description_loyalty'
  | 'effect_description_trader_obj'
  | 'effect_description_jester'
  | 'effect_description_merchant'
  | 'effect_description_storage'
  | 'effect_description_mason'
  | 'effect_description_brick_road'
  | 'effect_description_stone_street'
  | 'effect_description_thunderstorm'
  | 'effect_description_rain'
  | 'effect_description_dark_knight'
  | 'effect_description_impressed_boy'
  | 'effect_description_squire'
  | 'effect_description_training_grounds'
  | 'effect_description_stop_4'
  | 'effect_description_envoy'
  | 'effect_description_emissary'
  | 'effect_description_ambassador'
  | 'effect_description_diplomat'
  | 'effect_description_royal_architect'
  | 'effect_description_traveller_1'
  | 'effect_description_traveller_2'
  | 'effect_description_traveller_3'
  | 'effect_description_traveller_4'
  | 'effect_description_magistrate_1'
  | 'effect_description_magistrate_2'
  | 'effect_description_magistrate_3'
  | 'effect_description_strategist'
  | 'effect_description_peak_village'
  | 'effect_description_witch'
  | 'effect_description_witch_cabin'
  | 'effect_description_scribe'
  | 'effect_description_architect'
  | 'effect_description_lord_aethan'
  | 'effect_description_lord_nimrod'
  | 'effect_description_plague'
  | 'effect_description_enemy_soldier'
  | 'effect_description_assassin'
  | 'effect_description_city_fire'
  | 'effect_description_lost_civilization'
  | 'effect_description_skilled_bandit'
  | 'effect_description_dark_prince'
  | 'effect_description_innkeeper'
  | 'effect_description_tornado'
  | 'effect_description_flooding'
  | 'effect_description_young_princess'
  | 'effect_description_spoiled_princess'
  | 'effect_description_educated_princess'
  | 'effect_description_sickness'
  | 'thisCardIsPermanent'
  | 'effect_description_feast'
  | 'effect_description_stop_5'
  | 'effect_description_finishing_touch'
  | 'effect_description_banquet'
  | 'effect_description_royal_visit'
  | 'effect_description_inquisitor'
  | 'effect_description_miners'
  | 'effect_description_trade_route'
  | 'effect_description_pirate'
  | 'effect_description_skilled_ally'
  | 'effect_description_sea_gate_wall'
  | 'effect_description_villa'
  | 'effect_description_estate'
  | 'effect_description_palace'
  | 'effect_description_mansion'
  | 'effect_description_cooperation'
  | 'effect_description_favor'
  | 'effect_description_aethan_estate_1'
  | 'effect_description_aethan_estate_2'
  | 'effect_description_aethan_estate_3'
  | 'effect_description_shrine'
  | 'effect_description_sanctuary'
  | 'effect_description_temple'
  | 'effect_description_oratory'
  | 'effect_description_dubbing'
  | 'effect_description_renovation'
  | 'effect_description_quests'
  | 'effect_description_a_perfect_tower'
  | 'effect_description_town_well'
  | 'effect_description_pit_settlement'
  | 'effect_description_prison'
  | 'effect_description_jewellery'
  | 'effect_description_build_an_ark'
  | 'effect_description_the_ark'
  | 'effect_description____1'
  | 'effect_description____2'
  | 'effect_description_pirate_cove'
  | 'effect_description_backstabber'
  | 'effect_description_blood_curse'
  | 'effect_description_astronomer'
  | 'effect_description_astrologist'
  | 'effect_description_alchemist'
  | 'effect_description_potion_of_strength'
  | 'effect_description_love_potion'
  | 'effect_description_healing_potion'
  | 'effect_description_compass'
  | 'effect_description_navigation'
  | 'effect_description_calendar'
  | 'effect_description_astrolabe'
  | 'effect_description_saw_mill'
  | 'effect_description_wood_shipment'
  | 'effect_description_larger_barns'
  | 'effect_description_royal_storehouse'
  | 'effect_description_fish_quota'
  | 'effect_description_fishing_excellence'
  | 'effect_description_missionary'
  | 'effect_description_beekeeper'
  | 'effect_description_priest'
  | 'effect_description_cardinal'
  | 'effect_description_small_hill_town'
  | 'effect_description_hill_town'
  | 'effect_description_city_on_a_hill'
  | 'effect_description_large_town'
  | 'effect_description_camelot'
  | 'thisCardIsIndestructible'
  | 'effect_description_grand_guild_hall'
  | 'effect_description_thriving_countryside'
  | 'effect_description_countryside'
  | 'effect_description_manor'
  | 'effect_description_large_manor'
  | 'effect_description_grand_residence'
  | 'effect_description_noble_residence'
  | 'effect_description_stable_1'
  | 'effect_description_stable_2'
  | 'effect_description_large_stable'
  | 'effect_description_groom'
  | 'effect_description_aric_blackwood'
  | 'effect_description_eadric_shadowstrike'
  | 'effect_description_trade_relations'
  | 'effect_description_small_school'
  | 'effect_description_school'
  | 'effect_description_renowned_school'
  | 'effect_description_prominent_school'
  | 'effect_description_investor_1'
  | 'effect_description_investor_2'
  | 'effect_description_investor_3'
  | 'effect_description_investor_4'
  | 'effect_description_queen_jeminah'
  | 'effect_description_grand_castle'
  | 'effect_description_huge_castle'
  | 'effect_description_impregnable_fortress'
  | 'effect_description_fortress'
  | 'effect_description_large_temple'
  | 'effect_description_ornate_temple'
  | 'effect_description_temple_of_light'
  | 'effect_description_legendary_temple'
  | 'effect_description_mushrooms'
  | 'effect_description_excavation_site'
  | 'effect_description_hot_springs'
  | 'effect_description_fountain'
  | 'effect_description_canals'
  | 'effect_description_watchtower'
  | 'effect_description_double_wall'
  | 'effect_description_moat'
  | 'effect_description_moat_bridge'
  | 'effect_description_raid'
  | 'effect_description_looting'
  | 'effect_description_plundering'
  | 'effect_description_pillaging'
  | 'effect_description_handsome_rival'
  | 'effect_description_noble_ally'
  | 'effect_description_bordering_lands'
  | 'effect_description_occupation'
  | 'effect_description_vassal_states'
  | 'effect_description_unruly_towns'
  | 'effect_description_prosperity_expansion'
  | 'effect_description_hoarding'
  | 'effect_description_royal_decree'
  | 'effect_description_uprising'
  | 'effect_description_the_water_mill_expansion'
  | 'effect_description_efficient_farming'
  | 'effect_description_obsolete_farms'
  | 'effect_description_surplus'
  | 'effect_description_border_dispute_expansion'
  | 'effect_description_espionage'
  | 'effect_description_resistance'
  | 'effect_description_attack'

  // EoR Effects
  | 'eor_export_10'
  | 'eor_export_20'
  | 'eor_export_30'
  | 'eor_export_40'
  | 'eor_export_55'
  | 'eor_export_75'
  | 'eor_export_100'
  | 'eor_mass_export_25'
  | 'eor_mass_export_50'
  | 'eor_mass_export_75'
  | 'eor_mass_export_100'
  | 'eor_mass_export_150'
  | 'eor_mass_export_200'
  | 'eor_mass_export_250'

  // String Choice
  | 'string_choice_top_or_bottom'
  | 'string_choice_health_potion'
  | 'string_choice_thriving_countryside'
  | 'string_choice_discard_two_other_cards'
  | 'string_choice_add_one_check'
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
    purged: 'Purgées',
    settings: 'Paramètres',
    guide: 'Guide',
    about: 'À Propos',
    close: 'Fermer',
    save: 'Sauvegarder',
    continue: 'Continuer',
    reset: 'Réinitialiser',
    newTurn: 'Nouveau Tour',
    pass: 'Passer',
    advance: 'Progresser',
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
    seeDiscard: 'Voir la Défausse',
    cardsList: 'Liste des Cartes',
    triggeredCard: 'Carte Déclenchée',
    selectCardToPurge: 'Sélectionnez la Carte à Purger',
    chooseExpansion: 'Choisissez une Extension',
    expansionCard: 'Extension Carte',
    expansionBlock: 'Extension Block',
    scores: 'Scores',
    baseGame: 'Jeu de Base',
    totalScore: 'Score Total',
    endExpansion: 'Fin d\'Extension',
    seePurged: 'Voir les Purgées',
    add: 'Ajouter',
    top: 'Dessus',
    bottom: 'Dessous',
    
    // Cards Elements
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
    
    // Cards Types
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
    resetConfirm: 'Êtes-vous vraiment sûr.e?',
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
    yes: 'Oui',
    no: 'Non',

    // Expansions
    ridding_the_woods: 'La Forêt des Brigands',

    // Cards Names
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

    // Cards Effects Descriptions
    staysInPlay: "effects/passive Reste en jeu.",
    effect_description_plains: "effects/activate Défaussez une carte alliée pour gagner resources/coin resources/coin .",
    effect_description_rocky_area: "effects/activate Dépensez resources/coin pour gagner resources/stone resources/stone .",
    effect_description_shallow_mines: "effects/destroy Découvrez une Mine (84/85).",
    effect_description_forest: "effects/activate Gagnez resources/wood resources/wood resources/wood , puis -> Recto Bas.",
    effect_description_sacred_well: "effects/destroy Découvrez un Autel (82/83).",
    effect_description_town_hall: "effects/activate Jouez un Terrain depuis votre défausse.",
    effect_description_castle: "effects/activate Jouez une carte depuis votre défausse.",
    effect_description_keep: "effects/activate Jouez un Terrain ou Bâtiment depuis votre défausse.",
    effect_description_trader: "effects/activate Dépensez resources/coin pour gagner resources/wood .",
    effect_description_bazaar: "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone .",
    effect_description_market: "effects/activate Dépensez resources/coin pour gagner resources/wood / resources/stone / resources/metal .",
    effect_description_jungle: "effects/activate Dépensez resources/coin pour gagner resources/wood .",
    effect_description_huge_trees: "effects/activate Dépensez resources/coin pour gagner resources/wood resources/wood .",
    effect_description_explorers: "effects/activate Découvrez un nouveau territoire (71/72/73/74), puis -> Verso Bas.",
    effect_description_field_worker: "effects/activate Choisissez un Terrain en jeu, gagnez les ressources qui correspondent à sa production.",
    effect_description_servant: "effects/activate Gagnez resources/coin / resources/wood / resources/stone .",
    effect_description_bandit: "Peut être -> par un Missionaire. effects/forced Carte Jouée : Bloque 1 carte avec production d' resources/coin . effects/activate Dépensez resources/sword pour vaincre ( effects/destroy ) et gagner 2 ressources au choix.",
    effect_description_worker: "effects/activate Choisissez un Bâtiment en jeu, gagnez les ressources qui correspondent à sa production.",
    effect_description_chapel: "effects/activate Dépensez  resources/coin resources/coin resources/coin pour découvrir un Missionaire (103).",
    effect_description_cathedral: "effects/passive Cette carte produit +1 resources/coin pour chaque Personne en jeu.",
    effect_description_church: "effects/activate Dépensez resources/coin resources/coin resources/coin resources/coin pour découvrir un Prêtre (104).",
    effect_description_smithy: "effects/activate Réinitialisez pour découvrir des Bijoux (90).",
    effect_description_arsenal: "effects/activate Gagnez resources/sword pour chaque personne en jeu.",
    effect_description_lighthouse:"effects/passive Reste en jeu. effects/passive Défaussez la carte du sommet de votre pioche.",
    effect_description_fishing_boat: "effects/activate Découvrez les Rivages (75).",
    effect_description_stop_1: "effects/activate Découvrez également les cartes 24 à 27 pour cette manche.",
    effect_description_fertile_soil_efficiency: "effects/destroy Ajoutez 1 resources/coin à la production d'un terrain, puis choisissez un Bâtiment et rajoutez 1 à une ressource qu'il produit déjà.",
    effect_description_army: "effects/time Dépensez les resources/sword (1 à 10, incrément de 1) pour cocher la case de gauche à droite, à la dernière carte, Verso Haut et découvrez l'Etat Vassal (135).",
    effect_description_grand_army: "effects/time Dépensez les resources/sword (10, 10, 12, 12, 15) pour cocher la case de gauche à droite.",
    effect_description_treasure: "effects/time dépensez les resources/coin (1 à 12, incrément de 1) pour cocher la case de gauche à droite, à la dernière carte, -> Verso Haut.",
    effect_description_extended_treasure: "effects/time dépensez les resources/coin (13 à 17, incrément de 1) pour cocher la case de gauche à droite.",
    effect_description_export: "Dépensez des resources/tradegood pour atteindre des paliers, 10: Ajoutez resources/coin / resources/wood / resources/stone sur un Terrain, 20: Un Personnage gagne \" effects/passive Reste en jeu\", 30: Découvrez Adoubement (80), 40: Ajoutez resources/metal / resources/sword / resources/tradegood sur 1 Bâtiment, 55: Ajoutez resources/wood / resources/stone / resources/metal / resources/sword sur une carte, 75: Ajoutez resources/fame x5 sur une carte, 100: -> Verso Haut. effects/passive Dépensez des resources/tradegood .",
    effect_description_mass_export: "Dépensez des resources/tradegood pour atteindre des paliers, 25: Ajoutez resources/fame sur deux Terrains, 50: Ajoutez resources/fame x5 sur une Personne, 75: Découvrez Visite Royale (107), 100: Ajoutez resources/fame x5 sur un Bâtiment, 150: effects/check une autre carte Permanente, 200: effects/check toutes les autres cartes Permanentes au choix, 250: Découvrez Relations Commerciales (117). effects/passive Dépensez des resources/tradegood .",
    effect_description_volcanic_eruption: "effects/forced Tant qu'elle est en jeu, détruisez le prochain Terrain que vous jouez; lorsque vous le faite, -> Verso Haut.",
    effect_description_young_forest: "effects/time Ajoutez 1 effects/check dans l'ordre et à *: Ajoutez resources/wood à la production de cette carte.",
    effect_description_pretend_noble: "effects/activate Réinitialisez pour ajouter une resource de votre choix à la production de l'une des étapes de cette carte qui ne comporte pas encore de modification.",
    effect_description_stop_2: "effects/destroy Découvrez les cartes 31 à 34, choisissez-en 2 à découvrir et détruisez les 2 autres.",
    effect_description_etrepeneur: "effects/time Découvrez l'Ecole (118).",
    effect_description_hotel: "effects/activate Gagnez resources/coin par Personne en jeu.",
    effect_description_tavern: "effects/activate Découvrez les Quêtes (87).",
    effect_description_cozy_pub: "effects/activate Défaussez une Personne pour découvrir un Etranger (92).",
    effect_description_scientist: "effects/passive Toutes les Personnes, Scientifique inclus, produisent +1 resources/coin .",
    effect_description_observatory: "effects/time Découvrez l'Astronome (95).",
    effect_description_lab: "effects/time Découvrez l'Alchimiste (96).",
    effect_description_engineer: "effects/activate Détruisez l'une des cartes suivantes: Cabane de Bûcheron - découvrez (100); Grange - découvrez (101); Bâteau de pêche - découvrez (102).",
    effect_description_trebuchet: "effects/destroy Vainquez un ennemi (défausse, en jeu ou permanent), puis marquez effects/check la case suivante de la carte Armée.",
    effect_description_inventor: "Vaut 5 resources/fame par effects/check .",
    effect_description_inspired_inventor: "Vaut la fame de l'Inventrice. effects/activate Réinitialisez et ajoutez 1 effects/check pour découvrir une invention (97/98/99) ou gagnez une ressource de votre choix pour chaque effects/check . Vaut 5 resources/fame par effects/check .",
    effect_description_mercenary: "effects/activate Dépensez resources/coin resources/coin pour ajouter 1 ou deux effects/check .",
    effect_description_sir__: "effects/time Dépensez resources/metal resources/metal resources/metal pour ajouter resources/sword sur cette carte ( effects/oneTime ). effects/time Dépensez resources/metal resources/metal resources/metal resources/metal pour ajouter resources/sword sur cette carte ( effects/oneTime ). ",
    effect_description_stop_3: "effects/activate Découvrez les cartes 38 à 42. Choisissez le côté des cartes Objectif.",
    effect_description_strength_in_number: "Vaut 2 resources/fame par Personne.",
    effect_description_military_domination: "Vaut 2 resources/fame par production de resources/sword .",
    effect_description_expanding_borders: "Votre royaume doit comprendre 70 cartes ou plus (hors permanentes). Cette carte vaut -2 resources/fame pour chaque carte manquante.",
    effect_description_maximizer: "Vaut -1 resources/fame par carte valant 0 resources/fame (hors permanentes).",
    effect_description_loyalty: "Vaut 35 resources/fame s'il n'y a plus d'ennemi dans votre royaume.",
    effect_description_trader_obj: "Vaut 25 resources/fame si votre production de resources/tradegood est de 8 ou plus.",
    effect_description_jester: "effects/passive Reste en jeu. effects/activate Défaussez la carte au sommet de votre pioche. effects/activate Ajoutez 1 effects/check .",
    effect_description_merchant: "effects/activate Ajoutez 1 à 2 effects/check .",
    effect_description_storage: "effects/passive Reste en jeu. effects/optional Fin du Tour: Défaussez pour qu'une autre carte reste en jeu.",
    effect_description_mason: "effects/activate Dépensez resources/coin resources/coin pour découvrir un projet de bâtiment (88/89).",
    effect_description_brick_road: "effects/time Inspectez les cartes (109) et (110), détruisez l'une et découvrez l'autre.",
    effect_description_stone_street: "effects/time Inspectez les cartes (111) et (112), détruisez l'une et découvrez l'autre.",
    effect_description_thunderstorm: "effects/forced Carte jouée: défaussez les 3 premières cartes de votre pioche, puis -> (Verso Haut).",
    effect_description_rain: "effects/passive La production des Terrains est doublée. effects/passive Vous ne pouvez jouer aucune carte. effects/forced Fin du Tour: -> (Front Up).",
    effect_description_dark_knight: "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni même utiliser les effets effects/time . effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre (-> Verso Up).",
    effect_description_impressed_boy: "effects/destroy Gagnez resources/sword resources/sword .",
    effect_description_squire: "effects/destroy Gagnez resources/sword resources/sword resources/sword .",
    effect_description_training_grounds: "effects/activate Dépensez resources/coin pour gagner resources/sword .",
    effect_description_stop_4: "effects/destroy Découvrez les cartes 48 à 51. Découvrez-en 2 et détruisez les 2 autres.",
    effect_description_envoy: "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir une Commerçante (119).",
    effect_description_emissary: "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir un Investisseur (120).",
    effect_description_ambassador: "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir le Consort (122).",
    effect_description_diplomat: "effects/time Dépensez resources/coin resources/coin resources/coin pour découvrir une allié (121).",
    effect_description_royal_architect: "effects/activate Détruisez l'une des cartes suivantes: Château (10) - découvrez (123), Mine de Diamant (84/85) - découvrez (124), Temple (82/83) - découvrez (125). ",
    effect_description_traveller_1: "effects/time Découvrez un Terrain (126).",
    effect_description_traveller_2: "effects/time Découvrez un Terrain (127).",
    effect_description_traveller_3: "effects/time Découvrez un Terrain (129). effects/activate Défaussez un Terrain pour gagner 2 ressources au choix.",
    effect_description_traveller_4: "effects/time Découvrez un Terrain (128).",
    effect_description_magistrate_1: "effects/time Découvrez une Frontière (130).",
    effect_description_magistrate_2: "effects/time Découvrez une Frontière (131).",
    effect_description_magistrate_3: "effects/time Découvrez une Frontière (132).",
    effect_description_strategist: "effects/activate Jouez une Muraille ou un Chevalier depuis la défausse.",
    effect_description_peak_village: "effects/activate Réinitialisez pour découvrir un Village (105). (D'autre cartes peuvent découvrir le Village)",
    effect_description_witch: "effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ). effects/activate Défaussez 3 Personnes pour -> (Verso Haut). effects/forced Fin du tour: Découvrez les 2 prochaines cartes de la boîte, puis -> (Verso Up).",
    effect_description_witch_cabin: "effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ). effects/activate Détruisez une Personne pour effects/destroy . effects/forced Fin du Tour: Découvre les 2 prochaines cartes de la boîte, puis effects/destroy .",
    effect_description_scribe: "effects/optional Fin du tour: Défaussez pour que 1 ou 2 autres cartes restent en jeu.",
    effect_description_architect: "effects/time Réinitialisez pour découvrir un projet de construction (78/79).",
    effect_description_lord_aethan: "effects/activate Découvrez la Coopération (80) ou le Domaine (81). effects/passive Ajoutez 1 effects/check .",
    effect_description_lord_nimrod: "effects/time Découvrez un Raid (133) et un Rival (134). effects/activate Ajoutez 1 effects/check .",
    effect_description_plague: "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 2 Personnes de votre royaume, puis -> (Verso Haut).",
    effect_description_enemy_soldier: "effects/forced Carte Jouée: Bloque 1 Bâtiment/Terrain en jeu. effects/passive : Reste en jeu. effects/forced Fin de Manche: Détruisez la carte bloquée. effects/activate Dépensez resources/sword resources/sword pour vaincre ( effects/destroy ).",
    effect_description_assassin: "effects/forced Détruisez la prochaine Personne que vous jouez, lorsque vous le faites, ->. effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre (->).",
    effect_description_city_fire: "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 1 Bâtiment de votre royaume, puis -> (Verso Haut).",
    effect_description_lost_civilization: "effects/activate Défaussez 6 cartes alliées pour découvrir un Artefact (108).",
    effect_description_skilled_bandit: "Peut être -> par un Missionaire. effects/forced Carte jouée: Bloque 3 cartes avec une production. effects/activate Dépensez resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ) et gagner 3 ressources au choix.",
    effect_description_dark_prince: "effects/passive Vous ne pouvez ni jouer, ni améliorer de cartes, ni utiliser effects/time . effects/activate Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour vaincre (->).",
    effect_description_innkeeper: "effects/activate Défaussez une autre Personne pour gagner 2 ressources de votre choix.",
    effect_description_tornado: "effects/passive Reste en jeu. effects/forced Fin de Manche: Détruisez 3 cartez alliées du royaume, puis -> (Verso Haut).",
    effect_description_flooding: "effects/passive Reste en jeu. effects/forced Bloque tous les Bâtiments (max 5). effects/forced Fin de Manche: Détruisez cette carte et 1 Bâtiment bloqué ou 2 autres cartes alliées.",
    effect_description_young_princess: "effects/forced Fin du Tour: Défaussez 2 Personnes ou Verso Bas.",
    effect_description_spoiled_princess: "effects/forced Carte Jouée: Défaussez 2 cartes alliées en jeu.",
    effect_description_educated_princess: "effects/activate Gagnez 1 ressource de votre choix.",
    effect_description_sickness: "effects/forced Carte Jouée: Défaussez la prochaine carte de votre pioche.",
    thisCardIsPermanent: "Cette carte est Permanente.",
    effect_description_feast: "effects/activate Gagnez 1 ressource de votre choix.",
    effect_description_stop_5: "effects/activate Découvrez les cartes 69 et 70. A la fin de la manche comptez votre resources/fame (Fin du jeu).",
    effect_description_finishing_touch: "effects/destroy Ajoutez resources/tradegood et resources/fame x5 à une carte en jeu.",
    effect_description_banquet: "effects/destroy Gagnez 4 ressources au choix.",
    effect_description_royal_visit: "effects/activate Barrez 1 icône de ressource dans le coût d'amélioration d'une carte en jeu.",
    effect_description_inquisitor: "effects/destroy Détruisez une carte négative en jeu.",
    effect_description_miners: "Peut compter comme 2 Personnes.",
    effect_description_trade_route: "effects/forced Carte Jouée: Découvrez le Pirate (76).",
    effect_description_pirate: "effects/passive Reste en jeux. effects/passive Lorsque vous gagnez des resources/coin , gagnez 1 resources/coin de moins. effects/activate Dépensez resources/sword resources/sword pour vaincre ( effects/destroy ) puis découvrez le Lagon (77).",
    effect_description_skilled_ally: "effects/activate Découvrez la Chasse au Trésor (93).",
    effect_description_sea_gate_wall: "effects/activate Jouez une carte Maritime depuis la défausse.",
    effect_description_villa: "effects/optional Fin du Tour: Défaussez pour que 1 Personne reste en jeu.",
    effect_description_estate: "effects/optional Fin du Tour: Défaussez pour que 2 Personnes restent en jeu.",
    effect_description_palace: "effects/optional Fin du Tour: Défaussez pour que 2 cartes restent en jeu.",
    effect_description_mansion: "effects/optional Fin du Tour: Défaussez pour que 1 carte reste en jeu.",
    effect_description_cooperation: "effects/activate Défaussez 2 Personnes pour gagner 3 ressources au choix puis ->.",
    effect_description_favor: "effects/passive Reste en jeu. effects/activate Gagnez 1 ressource au choix, puis ->.",
    effect_description_aethan_estate_1: "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 1 autre carte.",
    effect_description_aethan_estate_2: "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 3 autres cartes.",
    effect_description_aethan_estate_3: "effects/passive Lorsque vous purgez cette carte, vous pouvez annuler la purge de 2 autres cartes.",
    effect_description_shrine: "effects/optional Fin du Tour : Défaussez pour que 1 autre carte reste en jeu.",
    effect_description_sanctuary: "effects/optional Fin du Tour : Défaussez pour que 2 autres cartes restent en jeu.",
    effect_description_temple: "effects/optional Fin du Tour : Défaussez pour que 4 autres cartes restent en jeu.",
    effect_description_oratory: "effects/optional Fin du Tour : Défaussez pour que 3 autres cartes restent en jeu.",
    effect_description_dubbing: "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/coin resources/sword et \"Chevalier\" à 1 Personne, puis ->.",
    effect_description_renovation: "effects/passive Reste en jeu. effects/forced Fin de Manche: Ajoutez resources/wood / resources/stone et resources/metal / resources/tradegood à 1 Bâtiment, puis effects/destroy .",
    effect_description_quests: "effects/time défaussez des Personnes (1, 2, 2, 3, 3, 4, 5, 6, 7) pour cocher la case de gauche à droite.",
    effect_description_a_perfect_tower: "effects/time dépensez les resources/stone (1 à 10, incrément de 1) pour cocher la case de gauche à droite.",
    effect_description_town_well: "effects/passive La production des Bâtiments gagne +1 resources/coin .",
    effect_description_pit_settlement: "effects/activate Marquer 1 effects/check , une fois complet ->.",
    effect_description_prison: "effects/passive Reste en jeu. effects/activate Marquez 1 effects/check une des cases au choix pour défausser 1 Ennemi. (Vaut 2 resources/fame par effects/check .)",
    effect_description_jewellery: "effects/time dépensez les resources/metal (1 à 10, incrément de 1) pour cocher la case de gauche à droite, puis gagnez 5 resources/tradegood .",
    effect_description_build_an_ark: "effects/time dépensez les resources/wood (2 à 10, incrément de 2) pour cocher la case de gauche à droite, une fois complétée, ->",
    effect_description_the_ark: "effects/activate Inscrivez 1 effects/check pour chaque paire de Personnes que vous avez en jeu. (Vaut +1 resources/fame pour chaque effects/check )",
    effect_description____1: "effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez resources/sword / resources/fame x5. effects/forced Jouée la 3ème fois: Ajoutez resources/tradegood / resources/fame x5.",
    effect_description____2: "effects/passive Reste en jeu. effects/forced Jouée la 1ère fois: Donne-lui un nom ! effects/forced Jouée la 2ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ). effects/forced Jouée la 3ème fois: Ajoutez une ressource de votre choix à cette carte (hors resources/fame ).",
    effect_description_pirate_cove: "effects/forced Fin du Tour: Hélas, vous découvrez un Traître (94).",
    effect_description_backstabber: "effects/forced Carte Jouée: Défaussez 2 Personnes. effects/activate Dépensez resources/sword resources/sword resources/sword resources/sword pour vaincre ( effects/destroy ).",
    effect_description_blood_curse: "effects/passive Lorsque vous Progressez, jouez 2 cartes supplémentaires.",
    effect_description_astronomer: "effects/activate Dépensez resources/coin resources/coin pour inscrire 1 effects/check . (Vaut 2 resources/fame par effects/check )",
    effect_description_astrologist: "effects/activate Remettez au-dessus ou en-dessous de votre pioche jusqu'à 3 autres de vos cartes en jeu.",
    effect_description_alchemist: "effects/activate Dépensez resources/coin resources/coin pour orienter cette carte selon votre choix.",
    effect_description_potion_of_strength: "effects/activate Réinitialisez cette carte pour gagner resources/sword resources/sword resources/sword .",
    effect_description_love_potion: "effects/activate Réinitialisez cette carte pour gagner resources/tradegood resources/tradegood resources/tradegood resources/tradegood resources/tradegood .",
    effect_description_healing_potion: "effects/optional Lorsque vous défaussez une Personne, vous pouvez réinitialiser cette carte à la place.",
    effect_description_compass: "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
    effect_description_navigation: "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
    effect_description_calendar: "effects/activate Inscrivez 1 effects/check pour prendre 15 cartes au hasard de votre défausse et les placer en-dessous de votre pioche.",
    effect_description_astrolabe: "effects/activate Inscrivez 1 effects/check pour chaque carte Maritime en jeu, celle-ci incluse. Une fois complète, ->.",
    effect_description_saw_mill: "effects/activate Découvrez Construire une Arche (91).",
    effect_description_wood_shipment: "effects/passive resources/tradegood et resources/wood peuvent être utilisés de manière interchangeable.",
    effect_description_larger_barns: "effects/optional Fin du Tour: cette carte ou une autre au choix reste en jeu.",
    effect_description_royal_storehouse: "effects/optional Fin du Tour: 2 cartes au choix restent en jeu.",
    effect_description_fish_quota: "effects/activate Inscrivez 1 effects/check , une fois complété, ->.",
    effect_description_fishing_excellence: "effects/passive La production de chaque carte maritime augmente de +1 resources/coin .",
    effect_description_missionary: "effects/activate Dépensez resources/coin resources/coin resources/coin pour convertir (->) un Bandit.",
    effect_description_beekeeper: "effects/activate Inscrivez 1 effects/check . Une fois complété, ajoutez resources/coin à cette carte.",
    effect_description_priest: "effects/activate Dépensez resources/coin resources/coin pour améliorer 1 carte en jeu, en payant son coût. (Cela ne met pas FIN au tour.)",
    effect_description_cardinal: "effects/activate Améliorez 1 carte en jeu, en payant son coût. (Cela ne met pas FIN au tour.)",
    effect_description_small_hill_town: "effects/activate Dépensez resources/coin resources/coin pour gagner 1 ressource au choix.",
    effect_description_hill_town: "effects/activate Dépensez resources/coin pour gagner 1 ressource au choix.",
    effect_description_city_on_a_hill: "effects/activate Oubliez cette carte pour découvrir Camelot (106).",
    effect_description_large_town: "effects/activate Dépensez 1 ressource au choix pour gagner 1 ressource au choix.",
    effect_description_camelot: "effects/optional Fin du Tour: Si votre pioche est vide, inscrivez 1 effects/check . (Vaut 5 resources/fame par effects/check )",
    thisCardIsIndestructible: "Cette carte ne peut pas être détruite.",
    effect_description_grand_guild_hall: "effects/activate Défaussez le nombre de personne de votre choix pour gagner autant de resources/fame , puis inscrivez 1 effects/check .",
    effect_description_thriving_countryside: "effects/activate Choisissez une carte en jeu ou dans la défausse, placez-la sous la pioche.",
    effect_description_countryside: "effects/activate Remettez une carte en jeu sous la pioche.",
    effect_description_manor: "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
    effect_description_large_manor: "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
    effect_description_grand_residence: "effects/time Découvrez un Noble (116).",
    effect_description_noble_residence: "effects/forced Lorsqu'elle produit réduisez les resources/coin de 1.",
    effect_description_stable_1: "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (113).",
    effect_description_stable_2: "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (114).",
    effect_description_large_stable: "effects/time Dépensez resources/coin resources/coin pour découvrir un cheval (115).",
    effect_description_groom: "effects/activate Choisissez un Cheval en jeu avec 1 ou 2 ressources et ajoutez-lui resources/coin / resources/wood / resources/stone / resources/metal / resources/sword . effects/activate Jouez un cheval depuis la défausse.",
    effect_description_aric_blackwood: "effects/passive Reste en jeu. effects/forced Carte Jouée: vous devez défausser une carte en jeu.",
    effect_description_eadric_shadowstrike: "effects/passive Reste en jeu. effects/activate Défaussez 2 Personnes pour gagner resources/sword resources/sword resources/sword .",
    effect_description_trade_relations: "effects/passive Dépensez resources/tradegood resources/tradegood resources/tradegood pour gagner une ressource au choix.",
    effect_description_small_school: "effects/time Améliorez gratuitement 1 Personne en jeux, puis ->.",
    effect_description_school: "effects/time Améliorez gratuitement 1 Personne en jeux, puis ->.",
    effect_description_renowned_school: "effects/time Ajoutez 1 ressource à une Personne en jeux, puis effects/oneTime .",
    effect_description_prominent_school: "effects/time Ajoutez 1 ressource à une Personne en jeux, puis ->.",
    effect_description_investor_1: "effects/activate Gagnez 3 ressources au choix, puis Verso Bas.",
    effect_description_investor_2: "effects/activate Gagnez 3 ressources au choix, puis Verso Bas.",
    effect_description_investor_3: "effects/activate Gagnez 1 ressource au choix.",
    effect_description_investor_4: "effects/activate Gagnez 3 ressources au choix, puis Verso Haut.",
    effect_description_queen_jeminah: "effects/activate Défaussez 1 Personne comportant 5 resources/fame ou plus pour inscrire 1 effects/check . (Vaut 3 par effects/check )",
    effect_description_grand_castle: "effects/activate Jouez 1 carte depuis la défausse.",
    effect_description_huge_castle: "effects/activate Jouez 1 carte depuis la défausse.",
    effect_description_impregnable_fortress: "effects/activate Jouez 1 carte depuis la défausse. effects/optional Vous pouvez défausser 2 Murailles à la place de cette carte.",
    effect_description_fortress: "effects/activate Jouez 1 carte depuis la défausse.",
    effect_description_large_temple: "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    effect_description_ornate_temple: "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    effect_description_temple_of_light: "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu. effects/time dépensez resources/tradegood resources/tradegood resources/tradegood resources/tradegood pour inscrire 1 effects/check .(Quand vous la purgez, cette carte vaut +10 resources/fame par effects/check .)",
    effect_description_legendary_temple: "effects/optional Fin du Tour: Défaussez pour que 5 autre cartes restent en jeu.",
    effect_description_mushrooms: "effects/passive Défaussez 1 Personne pour gagner resources/tradegood resources/tradegood .",
    effect_description_excavation_site: "Vaut 7 resources/fame par effects/check . effects/time Défaussez 1 Personne et dépensez resources/stone resources/stone resources/stone pour inscrire effects/check .",
    effect_description_hot_springs: "effects/optional Lorsque vous l'améliorez ajoutez 1 resources/coin à un Terrain en jeu.",
    effect_description_fountain: "effects/optional Lorsque vous l'améliorez boostez 1 carte en jeu.",
    effect_description_canals: "effects/optional Lorsque vous l'améliorez 1 Terrain gagne \" effects/passive Reste en jeu. \".",
    effect_description_watchtower: "effects/passive Vous pouvez regardez les 2 cartes du dessus de votre pioche.",
    effect_description_double_wall: "Vaut 4 resources/fame pour chaque Murailles, celle-ci incluse. effects/passive Reste en jeu.",
    effect_description_moat: "effects/activate Défaussez une autre carte pour gagner resources/sword resources/sword .",
    effect_description_moat_bridge: "effects/activate Dépensez resources/coin pour jouer une Personne depuis la défausse.",
    effect_description_raid: "effects/activate Gagnez 1 ressource au choix.",
    effect_description_looting: "effects/activate Gagnez 2 ressource au choix.",
    effect_description_plundering: "effects/activate Gagnez 3 ressource au choix.",
    effect_description_pillaging: "effects/activate Gagnez 2 ressource au choix.",
    effect_description_handsome_rival: "Vaut -5 pour chaque case non effects/check . effects/passive Ne peut pas être détruit, à moins que Lord Nimrod n'ai été détruit. effects/activate Défaussez Lord Nimrod et dépensez les ressources d'une case pour inscrire effects/check , une fois complétées, ->.",
    effect_description_noble_ally: "effects/activate Choisissez une Personne en jeu et gagnez les ressources qui correspondent à sa production.",
    effect_description_bordering_lands: "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration. Toutes les étapes ont la même valeur que l'étape finale.",
    effect_description_occupation: "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration.",
    effect_description_vassal_states: "effects/activate Réinitialisez cette carte.",
    effect_description_unruly_towns: "Vaut la fame de l'étape Etats Vassaux. effects/passive Dépensez resources/sword resources/sword resources/sword resources/sword resources/sword pour enlever 1 resources/sword du coup d'amélioration. effects/passive Lorsque vous l'améliorez, ajoutez 20 resources/fame à l'étape finale (max 9x).",
    effect_description_prosperity_expansion: "effects/passive Toutes les cartes alliées ont +1 resources/coin . effects/forced Fin de manche : Change pour Engranger des réserves.",
    effect_description_hoarding: "effects/passive Une carte de votre choix reste en jeux chaque tour. effects/forced Fin de manche : Change pour Soulèvement.",
    effect_description_royal_decree: "effects/passive À la fin de cette manche, pour chaque effects/check sur Soulèvement, retirez 1 production sur 1 carte. effects/forced Fin de manche : effects/destroy cette carte.",
    effect_description_uprising: "effects/passive Mettez 1 effects/check sur cette carte à chaque fois qu'une Personne est jouée alors qu'une autre est déjà en jeu. effects/forced Fin de manche :  Change pour Décret Royal.",
    effect_description_the_water_mill_expansion: "effects/passive Gagnez resources/coin resources/coin resources/coin une fois par tour. effects/forced Fin de manche : Change pour Récoltes Productives.",
    effect_description_efficient_farming: "effects/time Défaussez 2 Bâtiments pour ajouter une resources/coin à un Terrain en jeu. effects/forced Fin de manche : Change pour Surplus.",
    effect_description_obsolete_farms: "effects/forced Fin de manche : effects/destroy cette carte et effects/destroy 1 carte avec une production de resources/coin .",
    effect_description_surplus: "effects/passive Les Terrains qui produisent resources/coin peuvent produire des resources/tradegood à la place. effects/forced Fin de manche : Change pour Fermes Abandonnées.",
    effect_description_border_dispute_expansion: "Jouez 1 manche durant laquelle tous les Terrains restent en jeu, puis ->.",
    effect_description_espionage: "Jouez 1 manche, puis ->. effects/forced Lorsqu'une Personne est jouée, inscrivez 1 effects/check ou défaussez 2 cartes alliées. Une fois complétée, défaussez toute votre pioche.",
    effect_description_resistance: "Jouez 1 manche. effects/optional Dépenser vos resources/sword et mettez-les sur cette carte. effects/forced Après la manche, ajoutez autant de resources/sword de cette carte en resources/fame (max 100) à un Terrain, puis détruisez cette extension.",
    effect_description_attack: "Jouez 1 manche. effects/forced Fin du Tour: Si vous n'avez aucune resources/sword , enlevez 1 production d'1 carte en jeu. effects/forced Fin de Manche: Ajoutez une ressource (non- resources/fame ) au choix à une carte alliée, puis ->.",

    // EoR Effects
    eor_export_10: " (seuil 10): Ajoutez coin/wood/stone à 1 Terrain",
    eor_export_20: " (seuil 20): Ajoute \"Reste en Jeu\" à une personne",
    eor_export_30: " (seuil 30): Découvre Adoubement (80)",
    eor_export_40: " (seuil 40): Ajoutez metal/sword/tradegood à 1 Bâtiment",
    eor_export_55: " (seuil 55): Ajoutez wood/stone/metal/sword à 1 carte",
    eor_export_75: " (seuil 75): Ajoutez fame x5 à 1 carte",
    eor_export_100: " (seuil 100): Retournez la carte",
    eor_mass_export_25: " (seuil 25): Ajoute 1 fame à 2 Terrains",
    eor_mass_export_50: " (seuil 50): Ajoute 5 fame à 1 Personne",
    eor_mass_export_75: " (seuil 75): Décrouvrez la Visite Royale (107)",
    eor_mass_export_100: " (seuil 100): Ajoute 5 fame à 1 Bâtiment",
    eor_mass_export_150: " (seuil 150): Check une carte Permanente",
    eor_mass_export_200: " (seuil 200): Check toutes les cartes Permanentes souhaitées",
    eor_mass_export_250: " (seuil 250): Découvrez les Relation Commerciales (117)",

    // String Choice
    string_choice_top_or_bottom: "Dessus ou dessous?",
    string_choice_health_potion: "Défausser la Potion de Soin pour garder une Personne en jeu ?",
    string_choice_thriving_countryside: "Depuis la Zone de Jeu ou la Défausse?",
    string_choice_discard_two_other_cards: "Défaussez 2 cartes?",
    string_choice_add_one_check: "Ajoutez 1 check?"
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
    purged: 'Purged',
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
    seeDiscard: 'See Discard',
    cardsList: 'Cards List',
    triggeredCard: 'Triggered Card',
    selectCardToPurge: 'Select Card to Purge',
    chooseExpansion: 'Choose Expansion',
    expansionCard: 'Expansion Card',
    expansionBlock: 'Expansion Block',
    scores: 'Scores',
    baseGame: 'Base Game',
    totalScore: 'Total Score',
    endExpansion: 'Expansion End',
    seePurged: 'See Purged',
    add: 'Add',
    top: 'Top',
    bottom: 'Bottom',

    // Cards Elements
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

    // Cards Types
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
    resetConfirm: 'Are you really sure?',
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
    yes: 'Yes',
    no: 'No',

    // Expansions
    ridding_the_woods: 'Ridding the Woods',

    // Cards Names
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

    // Cards Effects Descriptions
    staysInPlay: "effects/passive Stays in play.",
    effect_description_plains: "effects/activate Discard a friendly card to gain resources/coin resources/coin .",
    effect_description_rocky_area: "effects/activate Spend resources/coin to gain resources/stone resources/stone .",
    effect_description_shallow_mines: "effects/destroy Discover a Mine (84/85). ",
    effect_description_forest: "effects/activate Gain resources/wood resources/wood resources/wood , then Front Down.",
    effect_description_sacred_well: "effects/destroy Discover an Altar (82/83).",
    effect_description_town_hall: "effects/activate Play a Land from your discard.",
    effect_description_castle: "effects/activate Play a card from your discard.",
    effect_description_keep: "effects/activate Play a Land or Building from your discard.",
    effect_description_trader: "effects/activate Spend resources/coin to gain resources/wood .",
    effect_description_bazaar: "effects/activate Spend resources/coin to gain resources/wood / resources/stone .",
    effect_description_market: "effects/activate Spend resources/coin to gain resources/wood / resources/stone / resources/metal .",
    effect_description_jungle: "effects/activate Spend resources/coin to gain resources/wood .",
    effect_description_huge_trees: "effects/activate Spend resources/coin to gain resources/wood resources/wood .",
    effect_description_explorers: "effects/activate Discover a new territory (71/72/73/74), then -> Back Down.",
    effect_description_field_worker: "effects/activate Choose a Land in play. Gain the resources corresponding to its production.",
    effect_description_servant: "effects/activate Gain resources/coin / resources/wood / resources/stone .",
    effect_description_bandit: "Can be -> by a Missionary. effects/forced Card Played: Block 1 card with resources/coin production. effects/activate Spend resources/sword to defeat ( effects/destroy ) and gain 2 resources of your choice.",
    effect_description_worker: "effects/activate Choose a Building in play. Gain the resources corresponding to its production.",
    effect_description_chapel: "effects/activate Spend resources/coin resources/coin resources/coin to discover a Missionary (103).",
    effect_description_cathedral: "effects/passive This card produces +1 resources/coin for each Person in play.",
    effect_description_church: "effects/activate Spend resources/coin resources/coin resources/coin resources/coin to discover a Priest (104).",
    effect_description_smithy: "effects/activate Reset to discover Jewellery (90).",
    effect_description_arsenal: "effects/activate Gain resources/sword for each person in play.",
    effect_description_lighthouse: "effects/passive Stays in play. effects/passive Discard the top card of your deck.",
    effect_description_fishing_boat: "effects/activate Discover the Shores (75).",
    effect_description_stop_1: "effects/activate Also discover cards 24 to 27 for this round.",
    effect_description_fertile_soil_efficiency: "effects/destroy Add 1 resources/coin to a Land's production, then choose a Building and add 1 to a resource it already produces.",
    effect_description_army: "effects/time Spend resources/sword (1 to 10, increment of 1) to check the box from left to right. At the last card, Back Up and discover the Vassal State (135).",
    effect_description_grand_army: "effects/time Spend resources/sword (10, 10, 12, 12, 15) to check the box from left to right.",
    effect_description_treasure: "effects/time Spend resources/coin (1 to 12, increment of 1) to check the box from left to right, at the last card, -> Back Up.",
    effect_description_extended_treasure: "effects/time Spend resources/coin (13 to 17, increment of 1) to check the box from left to right.",
    effect_description_export: "Spend resources/tradegood to reach tiers: 10: Add resources/coin / resources/wood / resources/stone to a Land, 20: A Person gains \"effects/passive Stays in play.\", 30: Discover Dubbing (80), 40: Add resources/metal / resources/sword / resources/tradegood to 1 Building, 55: Add resources/wood / resources/stone / resources/metal / resources/sword to a card, 75: Add resources/fame x5 to a card, 100: -> Back Up. effects/passive Spend resources/tradegood .",
    effect_description_mass_export: "Spend resources/tradegood to reach tiers: 25: Add resources/fame to two Lands, 50: Add resources/fame x5 to a Person, 75: Discover Royal Visit (107), 100: Add resources/fame x5 to a Building, 150: effects/check another Permanent card, 200: effects/check all other Permanent cards of your choice, 250: Discover Trade Relations (117). effects/passive Spend resources/tradegood .",
    effect_description_volcanic_eruption: "effects/forced While in play, destroy the next Land you play; when you do, -> Back Up.",
    effect_description_young_forest: "effects/time Add 1 effects/check in order and at *: Add resources/wood to this card's production.",
    effect_description_pretend_noble: "effects/activate Reset to add a resource of your choice to the production of one of this card's stages that has not yet been modified.",
    effect_description_stop_2: "effects/destroy Discover cards 31 to 34, choose 2 to discover and destroy the other 2.",
    effect_description_etrepeneur: "effects/time Discover the School (118).",
    effect_description_hotel: "effects/activate Gain resources/coin per Person in play.",
    effect_description_tavern: "effects/activate Discover the Quests (87).",
    effect_description_cozy_pub: "effects/activate Discard a Person to discover a Stranger (92).",
    effect_description_scientist: "effects/passive All People, Scientist included, produce +1 resources/coin .",
    effect_description_observatory: "effects/time Discover the Astronomer (95).",
    effect_description_lab: "effects/time Discover the Alchemist (96).",
    effect_description_engineer: "effects/activate Destroy one of the following cards: Lumberjack - discover (100); Barn - discover (101); Fishing Boat - discover (102).",
    effect_description_trebuchet: "effects/destroy Defeat an enemy (discard, in play, or permanent), then mark effects/check the next box on the Army card.",
    effect_description_inventor: "Worth 5 resources/fame per effects/check .",
    effect_description_inspired_inventor: "Worth the Inventor's fame. effects/activate Reset and add 1 effects/check to discover an invention (97/98/99) or gain a resource of your choice for each effects/check . Worth 5 resources/fame per effects/check .",
    effect_description_mercenary: "effects/activate Spend resources/coin resources/coin to add 1 or two effects/check .",
    effect_description_sir__: "effects/time Spend resources/metal resources/metal resources/metal to add resources/sword to this card ( effects/oneTime ). effects/time Spend resources/metal resources/metal resources/metal resources/metal to add resources/sword to this card ( effects/oneTime ). ",
    effect_description_stop_3: "effects/activate Discover cards 38 to 42. Choose the side of the Goal cards.",
    effect_description_strength_in_number: "Worth 2 resources/fame per Person.",
    effect_description_military_domination: "Worth 2 resources/fame per resources/sword production.",
    effect_description_expanding_borders: "Your kingdom must comprise 70 cards or more (excluding permanents), this card is worth -2 resources/fame for each missing card.",
    effect_description_maximizer: "Worth -1 resources/fame per card worth 0 resources/fame (excluding permanents).",
    effect_description_loyalty: "Worth 35 resources/fame if there are no more enemies in your kingdom.",
    effect_description_trader_obj: "Worth 25 resources/fame if your resources/tradegood production is 8 or more.",
    effect_description_jester: "effects/passive Stays in play. effects/activate Discard the top card of your deck. effects/activate Add 1 effects/check .",
    effect_description_merchant: "effects/activate Add 1 to 2 effects/check .",
    effect_description_storage: "effects/passive Stays in play. effects/optional End of Turn: Discard so that another card of your choice stays in play.",
    effect_description_mason: "effects/activate Spend resources/coin resources/coin to discover a building project (88/89).",
    effect_description_brick_road: "effects/time Inspect cards (109) and (110), destroy one and discover the other.",
    effect_description_stone_street: "effects/time Inspect cards (111) and (112), destroy one and discover the other.",
    effect_description_thunderstorm: "effects/forced Card played: discard the top 3 cards of your deck, then -> (Back Up).",
    effect_description_rain: "effects/passive Land production is doubled. effects/passive You cannot play any card. effects/forced End of Turn: -> (Front Up).",
    effect_description_dark_knight: "effects/passive You cannot play, upgrade cards, or use effects/time effects. effects/activate Spend resources/sword resources/sword resources/sword to defeat (-> Back Up).",
    effect_description_impressed_boy: "effects/destroy Gain resources/sword resources/sword .",
    effect_description_squire: "effects/destroy Gain resources/sword resources/sword resources/sword .",
    effect_description_training_grounds: "effects/activate Spend resources/coin to gain resources/sword .",
    effect_description_stop_4: "effects/destroy Discover cards 48 to 51. Discover 2 and destroy the other 2.",
    effect_description_envoy: "effects/time Spend resources/coin resources/coin resources/coin to discover a Trader (119).",
    effect_description_emissary: "effects/time Spend resources/coin resources/coin resources/coin to discover an Investor (120).",
    effect_description_ambassador: "effects/time Spend resources/coin resources/coin resources/coin to discover the Consort (122).",
    effect_description_diplomat: "effects/time Spend resources/coin resources/coin resources/coin to discover an ally (121).",
    effect_description_royal_architect: "effects/activate Destroy one of the following cards: Castle (10) - discover (123), Diamond Mine (84/85) - discover (124), Temple (82/83) - discover (125). ",
    effect_description_traveller_1: "effects/time Discover a Land (126).",
    effect_description_traveller_2: "effects/time Discover a Land (127).",
    effect_description_traveller_3: "effects/time Discover a Land (129). effects/activate Discard a Land to gain 2 resources of your choice.",
    effect_description_traveller_4: "effects/time Discover a Land (128).",
    effect_description_magistrate_1: "effects/time Discover a Border (130).",
    effect_description_magistrate_2: "effects/time Discover a Border (131).",
    effect_description_magistrate_3: "effects/time Discover a Border (132).",
    effect_description_strategist: "effects/activate Play a Wall or Knight from the discard.",
    effect_description_peak_village: "effects/activate Reset to discover a Village (105). (Other cards can discover the Village)",
    effect_description_witch: "effects/activate Spend resources/sword resources/sword resources/sword to defeat ( effects/destroy ). effects/activate Discard 3 People to -> (Back Up). effects/forced End of turn: Discover the next 2 cards from the box, then -> (Back Up).",
    effect_description_witch_cabin: "effects/activate Spend resources/sword resources/sword resources/sword to defeat ( effects/destroy ). effects/activate Destroy a Person to effects/destroy . effects/forced End of Turn: Discover the next 2 cards from the box, then effects/destroy .",
    effect_description_scribe: "effects/optional End of turn: Discard so that 1 or 2 other cards stay in play.",
    effect_description_architect: "effects/time Reset to discover a construction project (78/79).",
    effect_description_lord_aethan: "effects/activate Discover Cooperation (80) or Domain (81). effects/passive Add 1 effects/check .",
    effect_description_lord_nimrod: "effects/time Discover a Raid (133) and a Rival (134). effects/activate Add 1 effects/check .",
    effect_description_plague: "effects/passive Stays in play. effects/forced End of Round: Destroy 2 People from your kingdom, then -> (Back Front).",
    effect_description_enemy_soldier: "effects/forced Card Played: Block 1 Building/Land in play. effects/passive : Stays in play. effects/forced End of Round: Destroy the blocked card. effects/activate Spend resources/sword resources/sword to defeat ( effects/destroy ).",
    effect_description_assassin: "effects/forced Destroy the next Person you play, when you do, ->. effects/activate Spend resources/sword resources/sword resources/sword to defeat (->).",
    effect_description_city_fire: "effects/passive Stays in play. effects/forced End of Round: Destroy 1 Building from your kingdom, then -> (Back Up).",
    effect_description_lost_civilization: "effects/activate Discard 6 friendly cards to discover an Artifact (108).",
    effect_description_skilled_bandit: "Can be -> by a Missionary. effects/forced Card played: Block 3 cards with production. effects/activate Spend resources/sword resources/sword resources/sword to defeat ( effects/destroy ) and gain 3 resources of your choice.",
    effect_description_dark_prince: "effects/passive You cannot play, upgrade cards, or use effects/time . effects/activate Spend resources/sword resources/sword resources/sword resources/sword resources/sword to defeat (->).",
    effect_description_innkeeper: "effects/activate Discard another Person to gain 2 resources of your choice.",
    effect_description_tornado: "effects/passive Stays in play. effects/forced End of Round: Destroy 3 friendly cards from the kingdom, then -> (Back Up).",
    effect_description_flooding: "effects/passive Stays in play. effects/forced Block all Buildings (max 5). effects/forced End of Round: Destroy this card and 1 blocked Building or 2 other friendly cards.",
    effect_description_young_princess: "effects/forced End of Turn: Discard 2 People or Front Down.",
    effect_description_spoiled_princess: "effects/forced Card Played: Discard 2 friendly cards in play.",
    effect_description_educated_princess: "effects/activate Gain 1 resource of your choice.",
    effect_description_sickness: "effects/forced Card Played: Discard the next card from your deck.",
    thisCardIsPermanent: "This card is Permanent.",
    effect_description_feast: "effects/activate Gain 1 resource of your choice.",
    effect_description_stop_5: "effects/activate Discover cards 69 and 70. At the end of the round count your resources/fame (End of game).",
    effect_description_finishing_touch: "effects/destroy Add resources/tradegood and resources/fame x5 to a card in play.",
    effect_description_banquet: "effects/destroy Gain 4 resources of your choice.",
    effect_description_royal_visit: "effects/activate Cross out 1 resource icon in the upgrade cost of a card in play.",
    effect_description_inquisitor: "effects/destroy Destroy a negative card in play.",
    effect_description_miners: "Can count as 2 People.",
    effect_description_trade_route: "effects/forced Card Played: Discover the Pirate (76).",
    effect_description_pirate: "effects/passive Stays in play. effects/passive When you gain resources/coin , gain 1 resources/coin less. effects/activate Spend resources/sword resources/sword to defeat ( effects/destroy ) then discover the Lagoon (77).",
    effect_description_skilled_ally: "effects/activate Discover Treasure Hunt (93).",
    effect_description_sea_gate_wall: "effects/activate Play a Seafaring card from the discard.",
    effect_description_villa: "effects/optional End of Turn: Discard so that 1 Person stays in play.",
    effect_description_estate: "effects/optional End of Turn: Discard so that 2 People stay in play.",
    effect_description_palace: "effects/optional End of Turn: Discard so that 2 cards stay in play.",
    effect_description_mansion: "effects/optional End of Turn: Discard so that 1 card stays in play.",
    effect_description_cooperation: "effects/activate Discard 2 People to gain 3 resources of your choice then ->.",
    effect_description_favor: "effects/passive Stays in play. effects/activate Gain a resource of your choice, then ->.",
    effect_description_aethan_estate_1: "effects/passive When you purge this card, you can cancel the purge of 1 other card.",
    effect_description_aethan_estate_2: "effects/passive When you purge this card, you can cancel the purge of 3 other cards.",
    effect_description_aethan_estate_3: "effects/passive When you purge this card, you can cancel the purge of 2 other cards.",
    effect_description_shrine: "effects/optional End of Turn : Discard so that 1 other card stays in play.",
    effect_description_sanctuary: "effects/optional End of Turn : Discard so that 2 other cards stay in play.",
    effect_description_temple: "effects/optional End of Turn : Discard so that 4 other cards stay in play.",
    effect_description_oratory: "effects/optional End of Turn : Discard so that 3 other cards stay in play.",
    effect_description_dubbing: "effects/passive Stays in play. effects/forced End of Round: Add resources/coin resources/sword and \"Knight\" to 1 Person, then ->.",
    effect_description_renovation: "effects/passive Stays in play. effects/forced End of Round: Add resources/wood / resources/stone and resources/metal / resources/tradegood to 1 Building, then effects/destroy .",
    effect_description_quests: "effects/time Discard People (1, 2, 2, 3, 3, 4, 5, 6, 7) to check the box from left to right.",
    effect_description_a_perfect_tower: "effects/time Spend resources/stone (1 to 10, increment of 1) to check the box from left to right.",
    effect_description_town_well: "effects/passive Building production gains +1 resources/coin .",
    effect_description_pit_settlement: "effects/activate Mark 1 effects/check , once complete ->.",
    effect_description_prison: "effects/passive Stays in play. effects/activate Mark 1 effects/check one of the boxes of your choice to discard 1 Enemy. (Worth 2 resources/fame per effects/check .)",
    effect_description_jewellery: "effects/time Spend resources/metal (1 to 10, increment of 1) to check the box from left to right, then gain 5 resources/tradegood .",
    effect_description_build_an_ark: "effects/time Spend resources/wood (2 to 10, increment of 2) to check the box from left to right, once completed, ->",
    effect_description_the_ark: "effects/activate Mark 1 effects/check for each pair of People you have in play. (Worth +1 resources/fame for each effects/check )",
    effect_description____1: "effects/forced Played 1st time: Give it a name! effects/forced Played 2nd time: Add resources/sword / resources/fame x5. effects/forced Played 3rd time: Add resources/tradegood / resources/fame x5.",
    effect_description____2: "effects/passive Stays in play. effects/forced Played 1st time: Give it a name! effects/forced Played 2nd time: Add a resource of your choice to this card (except resources/fame ). effects/forced Played 3rd time: Add a resource of your choice to this card (except resources/fame ).",
    effect_description_pirate_cove: "effects/forced End of Turn: Alas, you discover a Traitor (94).",
    effect_description_backstabber: "effects/forced Card Played: Discard 2 People. effects/activate Spend resources/sword resources/sword resources/sword resources/sword to defeat ( effects/destroy ).",
    effect_description_blood_curse: "effects/passive When you Advance, play 2 additional cards.",
    effect_description_astronomer: "effects/activate Spend resources/coin resources/coin to mark 1 effects/check . (Worth 2 resources/fame per effects/check )",
    effect_description_astrologist: "effects/activate Put on top or bottom of your deck up to 3 other cards in play.",
    effect_description_alchemist: "effects/activate Spend resources/coin resources/coin to orient this card according to your choice.",
    effect_description_potion_of_strength: "effects/activate Reset this card to gain resources/sword resources/sword resources/sword .",
    effect_description_love_potion: "effects/activate Reset this card to gain resources/tradegood resources/tradegood resources/tradegood resources/tradegood resources/tradegood .",
    effect_description_healing_potion: "effects/optional When you discard a Person, you can reset this card instead.",
    effect_description_compass: "effects/activate Mark 1 effects/check for each Seafaring card in play, including this one. Once complete, ->.",
    effect_description_navigation: "effects/activate Mark 1 effects/check for each Seafaring card in play, including this one. Once complete, ->.",
    effect_description_calendar: "effects/activate Mark 1 effects/check to take 15 random cards from your discard and place them at the bottom of your deck.",
    effect_description_astrolabe: "effects/activate Mark 1 effects/check for each Seafaring card in play, including this one. Once complete, ->.",
    effect_description_saw_mill: "effects/activate Discover Build an Ark (91).",
    effect_description_wood_shipment: "effects/passive resources/tradegood and resources/wood can be used interchangeably.",
    effect_description_larger_barns: "effects/optional End of Turn: This card or another of your choice stays in play.",
    effect_description_royal_storehouse: "effects/optional End of Turn: 2 cards of your choice stay in play.",
    effect_description_fish_quota: "effects/activate Mark 1 effects/check , once completed, ->.",
    effect_description_fishing_excellence: "effects/passive The production of each Seafaring card increases by +1 resources/coin .",
    effect_description_missionary: "effects/activate Spend resources/coin resources/coin resources/coin to convert (->) a Bandit.",
    effect_description_beekeeper: "effects/activate Mark 1 effects/check . Once completed, add resources/coin to this card.",
    effect_description_priest: "effects/activate Spend resources/coin resources/coin to upgrade 1 card in play, paying its cost. (This does not END the turn.)",
    effect_description_cardinal: "effects/activate Upgrade 1 card in play, paying its cost. (This does not END the turn.)",
    effect_description_small_hill_town: "effects/activate Spend resources/coin resources/coin to gain 1 resource of your choice.",
    effect_description_hill_town: "effects/activate Spend resources/coin to gain 1 resource of your choice.",
    effect_description_city_on_a_hill: "effects/activate Forget this card to discover Camelot (106).",
    effect_description_large_town: "effects/activate Spend 1 resource of your choice to gain 1 resource of your choice.",
    effect_description_camelot: "effects/optional End of Turn: If your deck is empty, mark 1 effects/check . (Worth 5 resources/fame per effects/check )",
    thisCardIsIndestructible: "This card cannot be destroyed.",
    effect_description_grand_guild_hall: "effects/activate Discard any number of People to gain as many resources/fame , then mark 1 effects/check .",
    effect_description_thriving_countryside: "effects/activate Choose a card in play or in the discard, place it under the deck.",
    effect_description_countryside: "effects/activate Put a card in play under the deck.",
    effect_description_manor: "effects/forced When it produces reduce resources/coin by 1.",
    effect_description_large_manor: "effects/forced When it produces reduce resources/coin by 1.",
    effect_description_grand_residence: "effects/time Discover a Noble (116).",
    effect_description_noble_residence: "effects/forced When it produces reduce resources/coin by 1.",
    effect_description_stable_1: "effects/time Spend resources/coin resources/coin to discover a horse (113).",
    effect_description_stable_2: "effects/time Spend resources/coin resources/coin to discover a horse (114).",
    effect_description_large_stable: "effects/time Spend resources/coin resources/coin to discover a horse (115).",
    effect_description_groom: "effects/activate Choose a Horse in play with 1 or 2 resources and add resources/coin / resources/wood / resources/stone / resources/metal / resources/sword to it. effects/activate Play a horse from the discard.",
    effect_description_aric_blackwood: "effects/passive Stays in play. effects/forced Card Played: you must discard a card in play.",
    effect_description_eadric_shadowstrike: "effects/passive Stays in play. effects/activate Discard 2 People to gain resources/sword resources/sword resources/sword .",
    effect_description_trade_relations: "effects/passive Spend resources/tradegood resources/tradegood resources/tradegood to gain a resource of your choice.",
    effect_description_small_school: "effects/time Upgrade 1 Person in play for free, then ->.",
    effect_description_school: "effects/time Upgrade 1 Person in play for free, then ->.",
    effect_description_renowned_school: "effects/time Add 1 resource to a Person in play, then effects/oneTime .",
    effect_description_prominent_school: "effects/time Add 1 resource to a Person in play, then ->.",
    effect_description_investor_1: "effects/activate Gain 3 resources of your choice, then Front Down.",
    effect_description_investor_2: "effects/activate Gain 3 resources of your choice, then Back Down.",
    effect_description_investor_3: "effects/activate Gain 1 resource of your choice.",
    effect_description_investor_4: "effects/activate Gain 3 resources of your choice, then Back Up.",
    effect_description_queen_jeminah: "effects/activate Discard 1 Person with 5 resources/fame or more to mark 1 effects/check . (Worth 3 per effects/check )",
    effect_description_grand_castle: "effects/activate Play 1 card from the discard.",
    effect_description_huge_castle: "effects/activate Play 1 card from the discard.",
    effect_description_impregnable_fortress: "effects/activate Play 1 card from the discard. effects/optional You can discard 2 Walls instead of this card.",
    effect_description_fortress: "effects/activate Play 1 card from the discard.",
    effect_description_large_temple: "effects/optional End of Turn : Discard so that 5 other cards stay in play.",
    effect_description_ornate_temple: "effects/optional End of Turn : Discard so that 5 other cards stay in play.",
    effect_description_temple_of_light: "effects/optional End of Turn : Discard so that 5 other cards stay in play. effects/time Spend resources/tradegood resources/tradegood resources/tradegood resources/tradegood to add 1 effects/check .(When purging this card, this card is wirth +10 resources/fame per effects/check .)",
    effect_description_legendary_temple: "effects/optional End of Turn : Discard so that 5 other cards stay in play.",
    effect_description_mushrooms: "effects/passive Discard 1 Person to gain resources/tradegood resources/tradegood .",
    effect_description_excavation_site: "Worth 7 resources/fame per effects/check . effects/time Discard 1 Person and spend resources/stone resources/stone resources/stone to mark effects/check .",
    effect_description_hot_springs: "effects/optional When you upgrade it add 1 resources/coin to a Land in play.",
    effect_description_fountain: "effects/optional When you upgrade it boost 1 card in play.",
    effect_description_canals: "effects/optional When you upgrade it 1 Land gains \"effects/passive Stays in play. \".",
    effect_description_watchtower: "effects/passive You can look at the top 2 cards of your deck.",
    effect_description_double_wall: "Worth 4 resources/fame for each Wall, including this one. effects/passive Stays in play.",
    effect_description_moat: "effects/activate Discard another card to gain resources/sword resources/sword .",
    effect_description_moat_bridge: "effects/activate Spend resources/coin to play a Person from the discard.",
    effect_description_raid: "effects/activate Gain 1 resource of your choice.",
    effect_description_looting: "effects/activate Gain 2 resources of your choice.",
    effect_description_plundering: "effects/activate Gain 3 resources of your choice.",
    effect_description_pillaging: "effects/activate Gain 2 resources of your choice.",
    effect_description_handsome_rival: "Worth -5 for each unchecked box. effects/passive Cannot be destroyed, unless Lord Nimrod has been destroyed. effects/activate Discard Lord Nimrod and spend the resources of a box to mark effects/check , once completed, ->.",
    effect_description_noble_ally: "effects/activate Choose a Person in play and gain the resources corresponding to its production.",
    effect_description_bordering_lands: "Worth the fame of the Vassal States stage. effects/passive Spend resources/sword resources/sword resources/sword resources/sword resources/sword to remove 1 resources/sword from the upgrade cost. All stages have the same value as the final stage.",
    effect_description_occupation: "Worth the fame of the Vassal States stage. effects/passive Spend resources/sword resources/sword resources/sword resources/sword resources/sword to remove 1 resources/sword from the upgrade cost.",
    effect_description_vassal_states: "effects/activate Reset this card.",
    effect_description_unruly_towns: "Worth the fame of the Vassal States stage. effects/passive Spend resources/sword resources/sword resources/sword resources/sword resources/sword to remove 1 resources/sword from the upgrade cost. effects/passive When you upgrade it, add 20 resources/fame to the final stage (max 9x).",
    effect_description_prosperity_expansion: "effects/passive All friendly card production has +1 resources/coin . effects/forced End of Round : Changes to Hoarding.",
    effect_description_hoarding: "effects/passive A card of your choice stays in play each turn. effects/forced End of Round : Changes to Uprising.",
    effect_description_royal_decree: "effects/passive At the end of this round, for each effects/check on Uprising, remove 1 production on 1 card. effects/forced End of Round : effects/destroy this card.",
    effect_description_uprising: "effects/passive Put 1 effects/check on this, each time a Person is played while another Person is already in play. effects/forced End of Round : Changes to Royal Decree.",
    effect_description_the_water_mill_expansion: "effects/passive Gain resources/coin resources/coin resources/coin once per turn. effects/forced End of Round : Changes to Efficient Farming.",
    effect_description_efficient_farming: "effects/time Discard 2 Buildings to add resources/coin to a Land in play. effects/forced End of Round : Changes to Surplus.",
    effect_description_obsolete_farms: "effects/forced End of Round : effects/destroy this card and effects/destroy 1 card with resources/coin production.",
    effect_description_surplus: "effects/passive Lands that produce resources/coin can instead produce resources/tradegood . effects/forced End of Round : Changes to Obsolete Farms.",
    effect_description_border_dispute_expansion: "Play 1 round during which all Lands stay in play, then ->.",
    effect_description_espionage: "Play 1 round, then ->. effects/forced When a Person is played, mark 1 effects/check or discard 2 friendly cards. Once completed, discard your entire deck.",
    effect_description_resistance: "Play 1 round. effects/optional Spend your resources/sword to put them on this card. effects/forced After the round, add as many resources/sword from this card as resources/fame (max 100) to a Land, then destroy this extension.",
    effect_description_attack: "Play 1 round. effects/forced End of Turn: If you have no resources/sword , remove 1 production from 1 card in play. effects/forced End of Round: Add a resource (non- resources/fame ) of your choice to a friendly card, then ->.",

    // EoR Effects
    eor_export_10: " (seuil 10): Add coin/wood/stone to 1 Land",
    eor_export_20: " (seuil 20): Add \"Stays in Play.\" to 1 Person.",
    eor_export_30: " (seuil 30): Discover  (80)",
    eor_export_40: " (seuil 40): Add metal/sword/tradegood to 1 Building",
    eor_export_55: " (seuil 55): Add wood/stone/metal/sword to 1 card",
    eor_export_75: " (seuil 75): Add fame x5 to 1 card",
    eor_export_100: " (seuil 100): Flip this carte",
    eor_mass_export_25: " (seuil 25): Add 1 fame to 2 Lands",
    eor_mass_export_50: " (seuil 50): Add 5 fame to 1 Person",
    eor_mass_export_75: " (seuil 75): Discover Royal Visit (107)",
    eor_mass_export_100: " (seuil 100): Add 5 fame to 1 Building",
    eor_mass_export_150: " (seuil 150): Add a check to another Permanent card",
    eor_mass_export_200: " (seuil 200): Add a check to all selected Permanent cards",
    eor_mass_export_250: " (seuil 250): Discover Trade Relations (117)",

    // String Choice
    string_choice_top_or_bottom: "Top or Bottom?",
    string_choice_health_potion: "Discard the Health Potion to keep a Person in play ?",
    string_choice_thriving_countryside: "From Play Area or Discard?",
    string_choice_discard_two_other_cards: "Discard 2 cards?",
    string_choice_add_one_check: "Add 1 check?"
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
    if (key.includes('[+]')) {
      const keys = key.split('[+]').map(k => k.trim());
      const translatedParts = keys.map(k => translations[language][k as TranslationKeys] || k);
      return translatedParts.join('. ');
    }
    
    return translations[language][key] || key;
  };
  
  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook personnalisé
// eslint-disable-next-line react-refresh/only-export-components
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