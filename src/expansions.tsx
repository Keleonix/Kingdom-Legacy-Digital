import { type ExpansionData } from './types';

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
    discoverValue: 5
  },
];