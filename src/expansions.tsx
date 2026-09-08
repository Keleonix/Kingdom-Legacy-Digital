import { emptyResource, type ExpansionData, type ResourceMap } from './types';
import { stayInPlayEffect } from './cardEffects';

export const FOCUS_KEYS = ['coin', 'wood', 'stone', 'sword', 'metal', 'tradegood'] as (keyof Omit<ResourceMap, 'fame'>)[];

export const EXPANSIONS: ExpansionData[] = [
  {
    id: 'prosperity_expansion',
    name: 'prosperity_expansion',
    type: 'card',
    iconPath: 'baseGame.png',
    cardId: 136,
  },
  {
    id: 'the_water_mill_expansion',
    name: 'the_water_mill_expansion',
    type: 'card',
    iconPath: 'baseGame.png',
    cardId: 137,
  },
  {
    id: 'border_dispute_expansion',
    name: 'border_dispute_expansion',
    type: 'card',
    iconPath: 'baseGame.png',
    cardId: 138,
  },
  {
    id: 'ridding_the_woods',
    name: 'ridding_the_woods',
    type: 'block',
    iconPath: 'riddingTheWoods.png',
    campaignCardIds: new Array(30).fill(null).map((_, i) => i + 139),
    deckPurgeValue: 8,
    focus: {wood: 2},
    permanentPurgeValue: 2,
    discoverValue: 5,
    tutorialSteps: [
      {
        zone: null,
        title: 'tutorialRiddingTheWoodsWelcomeTitle',
        text: 'tutorialRiddingTheWoodsWelcomeText',
        position: "auto",
      },
    ]
  },
  // {
  //   id: 'merchants',
  //   name: 'merchants',
  //   type: 'block',
  //   iconPath: 'merchants.png',
  //   campaignCardIds: new Array(25).fill(null).map((_, i) => i + 169),
  //   deckPurgeValue: 7,
  //   permanentPurgeValue: 2,
  //   discoverValue: 0,
  //   tutorialSteps: [
  //     {
  //       zone: null,
  //       title: 'tutorialMerchantsWelcomeTitle',
  //       text: 'tutorialMerchantsWelcomeText',
  //       position: "auto",
  //     },
  //   ],
  //   checkExpansionEnd: (ctx) => (ctx.fetchCardsInZone((c) => [170, 179].includes(c.id), ctx.t('campaign')).length === 0)
  // },
  {
    id: 'distant_lands',
    name: 'distant_lands',
    type: 'block',
    iconPath: 'distantLands.png',
    campaignCardIds: new Array(159).fill(null).map((_, i) => i + 214),
    deckPurgeValue: 6,
    focus: emptyResource,
    permanentPurgeValue: 2,
    discoverValue: 2,
    expansionValue: 2, // Counts as 2 expansions
    specificTargets: [
      {
        effect: {
          text: 'staysInPlay',
          count: 2,
          effect: stayInPlayEffect,
          description: 'specific_targets_distant_lands',
          purge: false,
          remove: true
        }
      }
    ],
    tutorialSteps: [
      {
        zone: null,
        title: 'tutorialDistantLandsWelcomeTitle',
        text: 'tutorialDistantLandsWelcomeText',
        position: "auto",
      },
      {
        zone: null,
        title: 'tutorialDistantLandsPreparationTitle',
        text: 'tutorialDistantLandsPreparationText',
        position: "auto",
      },
      {
        zone: null,
        title: 'tutorialDistantLandsExplorationTitle',
        text: 'tutorialDistantLandsExplorationText',
        position: "auto",
      },
    ]
  },
];