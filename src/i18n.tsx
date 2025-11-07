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
  | 'terrain' | 'building' | 'person' | 'knight' | 'dame' | 'maritime'
  | 'ship' | 'event' | 'enemy' | 'permanent' | 'scroll' | 'choice'
  
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
    terrain: 'Terrain',
    building: 'Bâtiment',
    person: 'Personne',
    knight: 'Chevalier',
    dame: 'Dame',
    maritime: 'Maritime',
    ship: 'Navire',
    event: 'Événement',
    enemy: 'Ennemi',
    permanent: 'Permanente',
    scroll: 'Parchemin',
    choice: 'Choix',
    
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
    terrain: 'Land',
    building: 'Building',
    person: 'Person',
    knight: 'Knight',
    dame: 'Lady',
    maritime: 'Maritime',
    ship: 'Ship',
    event: 'Event',
    enemy: 'Enemy',
    permanent: 'Permanent',
    scroll: 'Scroll',
    choice: 'Choice',
    
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