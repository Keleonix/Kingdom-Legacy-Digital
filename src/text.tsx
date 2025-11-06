import { useState } from "react";

// -------------------
// Language System
// -------------------
export type Language = 'fr' | 'en';

const translations = {
  fr: {
    // Zones
    deck: "Deck",
    discard: "Défausse",
    playArea: "Zone de jeu",
    campaign: "Campagne",
    blocked: "Bloquées",
    permanent: "Permanentes",
    destroy: "Détruire",
    empty: "Vide",
    
    // Buttons
    newTurn: "Nouveau tour",
    pass: "Passer",
    advance: "Progresser",
    endRound: "Fin de round",
    shuffleDeck: "Mélanger le deck",
    topDiscardToBottom: "Défausse vers Deck",
    shuffle15Rand: "Mélanger 15 aléatoires",
    endBaseGame: "Fin du jeu de base",
    seeDiscard: "Voir la défausse",
    seeDeck: "Voir le deck",
    close: "Fermer",
    settings: "Paramètres",
    cancel: "Annuler",
    confirm: "Confirmer",
    apply: "Appliquer",
    save: "Sauvegarder",
    continue: "Continuer",
    reset: "Réinitialiser",
    guide: "Guide",
    about: "À propos",
    preview: "Aperçu",
    select: "Sélectionner...",
    addOption: "Ajouter option",
    remove: "Retirer",
    free: "Gratuit",
    
    // Card sides
    frontUp: "Face avant",
    frontDown: "Face arrière",
    backUp: "Dos avant",
    backDown: "Dos arrière",
    front: "Avant",
    back: "Arrière",
    up: "Haut",
    down: "Bas",
    
    // Popups
    cardNames: "Noms des cartes",
    effect: "Effet",
    effectFor: "Effet (pour",
    resources: "Ressources",
    resourcesFor: "Ressources (options pour",
    option: "Option",
    checkboxes: "Cases à cocher",
    checkboxesFor: "Cases à cocher (pour",
    noCheckboxes: "Pas de cases à cocher",
    upgrades: "Améliorations",
    upgradesTo: "Améliore vers",
    noUpgrades: "Pas d'améliorations",
    resourceCost: "Coût en ressources :",
    otherCost: "Autre coût :",
    selected: "-> Sélectionné",
    clickToSelect: "Cliquer pour sélectionner",
    
    // Selection popups
    selectBetween: "Sélectionner entre",
    and: "et",
    boxes: "case(s)",
    sides: "face(s)",
    value: "valeur",
    autoSelected: "Auto-sélectionné",
    noCheckboxAvailable: "Aucune case disponible.",
    
    // Effect descriptions
    endRoundEffect: "Effet de fin de round",
    postponeNextRound: "Reporter au prochain round",
    resolveNow: "Résoudre maintenant",
    
    // Settings
    resetFullGame: "Réinitialiser (jeu complet)",
    kingdomSaveLoad: "Sauvegarder / Charger le royaume",
    newKingdom: "Nouveau royaume",
    enterNewKingdomName: "Entrer le nom du nouveau royaume",
    language: "Langue",
    
    // Guide
    guideControls: "Guide & Contrôles",
    beforeReadingControls: "Avant de lire les contrôles, veuillez lire les règles complètes.",
    tapCardToOpenEditor: "Appuyez sur une carte pour ouvrir l'éditeur où vous pouvez :",
    editResources: "Modifier les ressources/options par face",
    addRemoveCheckboxes: "Ajouter/retirer des cases à cocher pour chaque face",
    tapCheckboxToUse: "Appuyez sur une case à cocher pour la cocher.",
    tapUpgradeToUpgrade: "Appuyez sur une amélioration pour améliorer.",
    dragCardsBetweenZones: "Faites glisser les cartes entre les zones.",
    useSettings: "Utilisez les Paramètres :",
    resetToFullyReset: "Réinitialiser pour réinitialiser complètement le jeu.",
    saveYourKingdom: "Sauvegarder la progression de votre royaume.",
    continueKingdom: "Continuer la partie d'un royaume sauvegardé.",
    
    // About
    originalBoardGame: "Jeu de plateau original :",
    gameDesign: "Conception du jeu :",
    assistantDesign: "Conception assistée :",
    artDirector: "Directeur artistique :",
    designerThanks: "Remerciements du concepteur :",
    specialThanks: "Remerciements spéciaux au Roi ultime ; que votre Royaume vienne !",
    publisher: "Éditeur :",
    officialDistributor: "(Distributeur officiel de Kingdom Legacy et d'autres titres en Europe.)",
    digitalFanAdaptation: "Adaptation numérique par un fan :",
    digitalDescription: "Cette version numérique de Kingdom Legacy est un projet de fan non commercial, créé avec admiration pour la conception originale. Il a été créé pour faciliter l'apprentissage, le partage et le jeu en ligne.",
    digitalizationTeam: "Équipe de numérisation :",
    projectLead: "Chef de projet / Développeur :",
    digitalArt: "Art numérique / Adaptation des assets :",
    playtesters: "Testeurs / Retours :",
    disclaimer: "Avertissement :",
    disclaimerText: "Il s'agit d'un projet de fan non officiel qui n'est pas affilié, approuvé ou sponsorisé par FryxGames, Intrafin ou Jonathan Fryxelius. Tous les droits sur le jeu original, les règles et les illustrations restent la propriété de leurs détenteurs respectifs.",
    
    // Alerts
    saveSuccessful: "Royaume sauvegardé avec succès",
    loadSuccessful: "Royaume chargé avec succès",
    noSaveFound: "Aucune sauvegarde trouvée nommée",
    provideSaveName: "Veuillez fournir un nom pour cette sauvegarde.",
    provideLoadName: "Veuillez fournir le nom d'une sauvegarde à charger.",
    confirmReset: "Êtes-vous sûr de vouloir réinitialiser le jeu entier ? Cela ne peut pas être annulé sans recharger. Tapez OUI pour confirmer.",
    typeYesToConfirm: "Tapez OUI pour confirmer la réinitialisation complète :",
    
    // Campaign card
    campaignCard: "Carte de campagne",
    
    // Upgrade selection
    selectUpgradeAndResource: "Sélectionnez un upgrade et une ressource à retirer",
    chooseUpgrade: "1. Choisissez un upgrade :",
    upgrade: "Amélioration",
    chooseResourceToRemove: "2. Choisissez une ressource à retirer :",
    noCost: "Pas de coût",
    
    // Text input
    enterYourText: "Entrez votre texte...",
    
    // Resource choice
    chooseResources: "Choisir les ressources",

    // Card Types
    enemy: "Ennemi",
    
    // Misc
    namePlaceholder: "Nom pour la face",
    enterEffectText: "Entrer le texte d'effet (utilisez 'resources/gold' ou 'effects/fire' pour les icônes)",
    none: "Aucun",
    emptySide: "Face vide",
    upgradeCost: "Coût d'amélioration",
    otherCostPlaceholder: "ex. 'Défausser 2 cartes' ou 'Payer 1 renommée'",
  },
  en: {
    // Zones
    deck: "Deck",
    discard: "Discard",
    playArea: "Play Area",
    campaign: "Campaign",
    blocked: "Blocked",
    permanent: "Permanent",
    destroy: "Destroy",
    empty: "Empty",
    
    // Buttons
    newTurn: "New Turn",
    pass: "Pass",
    advance: "Advance",
    endRound: "End Round",
    shuffleDeck: "Shuffle Deck",
    topDiscardToBottom: "Top Discard to Bottom Deck",
    shuffle15Rand: "Shuffle 15 Random",
    endBaseGame: "End Base Game",
    seeDiscard: "See discard",
    seeDeck: "See deck",
    close: "Close",
    settings: "Settings",
    cancel: "Cancel",
    confirm: "Confirm",
    apply: "Apply",
    save: "Save",
    continue: "Continue",
    reset: "Reset",
    guide: "Guide",
    about: "About",
    preview: "Preview",
    select: "Select...",
    addOption: "Add Option",
    remove: "Remove",
    free: "Free",
    
    // Card sides
    frontUp: "Front Up",
    frontDown: "Front Down",
    backUp: "Back Up",
    backDown: "Back Down",
    front: "Front",
    back: "Back",
    up: "Up",
    down: "Down",
    
    // Popups
    cardNames: "Card Names",
    effect: "Effect",
    effectFor: "Effect (for",
    resources: "Resources",
    resourcesFor: "Resources (options for",
    option: "Option",
    checkboxes: "Checkboxes",
    checkboxesFor: "Checkboxes (for",
    noCheckboxes: "No checkboxes",
    upgrades: "Upgrades",
    upgradesTo: "Upgrades to",
    noUpgrades: "No upgrades",
    resourceCost: "Resource Cost:",
    otherCost: "Other Cost:",
    selected: "-> Selected",
    clickToSelect: "Click to select",
    
    // Selection popups
    selectBetween: "Select between",
    and: "and",
    boxes: "box(es)",
    sides: "side(s)",
    value: "value",
    autoSelected: "Auto-selected",
    noCheckboxAvailable: "No checkbox available.",
    
    // Effect descriptions
    endRoundEffect: "End of round effect",
    postponeNextRound: "Postpone to next round",
    resolveNow: "Resolve now",
    
    // Settings
    resetFullGame: "Reset (full game)",
    kingdomSaveLoad: "Kingdom Save / Load",
    newKingdom: "New Kingdom",
    enterNewKingdomName: "Enter new kingdom name",
    language: "Language",
    
    // Guide
    guideControls: "Guide & Controls",
    beforeReadingControls: "Before reading the controls, please read the full rules.",
    tapCardToOpenEditor: "Tap a card to open the editor where you can:",
    editResources: "Edit resources/options per side",
    addRemoveCheckboxes: "Add / remove checkboxes for each side",
    tapCheckboxToUse: "Tap a card's checkbox to check it.",
    tapUpgradeToUpgrade: "Tap a card's upgrade to upgrade it.",
    dragCardsBetweenZones: "Drag cards between zones.",
    useSettings: "Use Settings:",
    resetToFullyReset: "Reset to fully reset the game (extra confirmation required).",
    saveYourKingdom: "Save your current Kingdom's progress.",
    continueKingdom: "Continue a saved Kingdom's game.",
    
    // About
    originalBoardGame: "Original Board Game:",
    gameDesign: "Game Design:",
    assistantDesign: "Assistant Design:",
    artDirector: "Art Director:",
    designerThanks: "Designer Thanks:",
    specialThanks: "Special thanks to the ultimate King; may your Kingdom come!",
    publisher: "Publisher:",
    officialDistributor: "(Official distributor of Kingdom Legacy and other titles across Europe.)",
    digitalFanAdaptation: "Digital Fan Adaptation:",
    digitalDescription: "This digital version of Kingdom Legacy is a non-commercial fan project, created with admiration for the original design. It was made to make the game easier to learn, share, and play online.",
    digitalizationTeam: "Digitalization Team:",
    projectLead: "Project Lead / Developer:",
    digitalArt: "Digital Art / Assets Adaptation:",
    playtesters: "Playtesters / Feedback:",
    disclaimer: "Disclaimer:",
    disclaimerText: "This is an unofficial fan project and is not affiliated with, endorsed by, or sponsored by FryxGames, Intrafin, or Jonathan Fryxelius. All rights to the original game, rules, and artwork remain with their respective copyright holders.",
    
    // Alerts
    saveSuccessful: "Kingdom saved successfully",
    loadSuccessful: "Kingdom loaded successfully",
    noSaveFound: "No save found named",
    provideSaveName: "Please give a name for this save.",
    provideLoadName: "Please provide the name of a save to load.",
    confirmReset: "Are you sure you want to reset the entire game? This cannot be undone without reloading. Type YES to confirm.",
    typeYesToConfirm: "Type YES to confirm full reset:",
    
    // Campaign card
    campaignCard: "Campaign Card",
    
    // Upgrade selection
    selectUpgradeAndResource: "Select an upgrade and a resource to remove",
    chooseUpgrade: "1. Choose an upgrade:",
    upgrade: "Upgrade",
    chooseResourceToRemove: "2. Choose a resource to remove:",
    noCost: "No cost",
    
    // Text input
    enterYourText: "Enter your text...",
    
    // Resource choice
    chooseResources: "Choose Resources",
    
    // Card Types
    enemy: "Enemy",

    // Misc
    namePlaceholder: "Name for side",
    enterEffectText: "Enter effect text (use 'resources/gold' or 'effects/fire' for icons)",
    none: "None",
    emptySide: "Empty Side",
    upgradeCost: "Upgrade Cost",
    otherCostPlaceholder: "e.g., 'Discard 2 cards' or 'Pay 1 fame'",
  }
};

export function useTranslation() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('kingdom-language');
    return (saved === 'en' || saved === 'fr') ? saved : 'fr';
  });

  const t = (key: keyof typeof translations.fr): string => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('kingdom-language', lang);
  };

  return { t, language, changeLanguage };
}
