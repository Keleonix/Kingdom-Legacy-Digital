// achievements.ts
import { type Achievement } from './AchievementsModal';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_round',
    iconPath: 'achievements/first_round.png',
    titleKey: 'ach_name_first_round',
    descKey: 'ach_desc_first_round',
    value: 1
  },
  {
    id: 'first_game',
    iconPath: 'achievements/first_game.png',
    titleKey: 'ach_name_first_game',
    descKey: 'ach_desc_first_game',
    value: 100
  },
  {
    id: 'town_hall_gambit',
    iconPath: 'achievements/town_hall_gambit.png',
    titleKey: 'ach_name_town_hall_gambit',
    descKey: 'ach_desc_town_hall_gambit',
    value: 50
  },
  {
    id: 'know_your_basics',
    iconPath: 'achievements/know_your_basics.png',
    titleKey: 'ach_name_know_your_basics',
    descKey: 'ach_desc_know_your_basics',
    value: 200
  },
];