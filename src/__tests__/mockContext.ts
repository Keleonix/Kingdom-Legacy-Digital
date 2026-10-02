import type { GameCard, ResourceMap} from "../types";
import type { TimingEntry } from "../cardEffects";
import { emptyResource } from "../types";
import type { GameContext } from "../cardEffects";

export interface MockState {
  purgedCards: GameCard[];
  effectsList: TimingEntry[];
}

export function createMockContext(
  overrides: Partial<GameContext> = {},
  options: { initialEffectsList?: TimingEntry[]; initialPurgedCards?: GameCard[] } = {}
): { context: GameContext; state: MockState } {
  const resources: ResourceMap = { ...emptyResource };
  const purgedCards: GameCard[] = [...(options.initialPurgedCards ?? [])];
  let effectsList: TimingEntry[] = [...(options.initialEffectsList ?? [])];

  const context: GameContext = {
    card: { id: 0, currentSide: 1 } as GameCard,
    zone: "playArea",
    resources,
    cardsForTrigger: [],
    otherEffects: [],
    setResources: (updater) => {
      Object.assign(resources, typeof updater === "function" ? updater(resources) : updater);
    },
    handleGainResources: async () => {},
    handlePayResources: async () => true,
    draw: () => {},
    effectEndTurn: () => {},
    dropToPlayArea: async () => {},
    dropToBlocked: async () => {},
    dropToDeck: async () => {},
    dropToSideDeck: async () => {},
    dropToDiscard: async () => {},
    dropToCampaign: async () => {},
    dropToPermanent: async () => {},
    setDeck: () => {},
    setSideDeck: () => {},
    setPlayArea: () => {},
    setDiscard: () => {},
    setPermanentZone: () => {},
    setCampaignDeck: () => {},
    setTemporaryCardList: () => {},
    setTemporaryCardListImmediate: () => {},
    setBlockedZone: () => {},
    setPurgedCards: (updater) => {
      const result = typeof updater === "function" ? updater(purgedCards) : updater;
      purgedCards.length = 0;
      purgedCards.push(...result);
    },
    setEffectsListImmediate: (updater) => {
      effectsList = typeof updater === "function" ? updater(effectsList) : updater;
    },
    deleteCardInZone: () => {},
    replaceCardInZone: () => {},
    mill: async () => {},
    openCheckboxPopup: () => {},
    selectResourceChoice: async () => null,
    selectCardsFromZone: async () => [],
    selectCardsFromArray: async () => [],
    discoverCard: async () => false,
    boostProductivity: async () => false,
    registerEndRoundEffect: () => {},
    addCardEffect: () => {},
    fetchCardsInZone: () => [],
    selectCardSides: () => {},
    selectUpgradeCost: () => {},
    selectTextInput: async () => null,
    selectStringChoice: async () => "",
    updateBlocks: () => {},
    getBlockedBy: () => [],
    getCardZone: () => "",
    upgradeCard: async () => true,
    handleCardUpdate: () => {},
    handleEnemyDefeated: async () => {},
    addDiscoverableCard: () => {},
    getCardProduction: () => [],
    hasBeenUsedThisTurn: () => 0,
    markAsUsedThisTurn: () => {},
    t: ((key: string) => key) as any,
    setUpgradeNotEndingTurn: () => {},
    getCardAtIndex: () => undefined,
    filterZone: () => [],
    ...overrides,
  } as GameContext;

  return {
    context,
    state: {
      purgedCards,
      get effectsList() { return effectsList; },
    },
  };
}
