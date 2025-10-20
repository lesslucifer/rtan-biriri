import type { GameRole } from '../types/playerAssignment';
import type { Card } from '../types/card';
import { GAME_ROLES } from '../types/playerAssignment';

export function getRoleCard(role: GameRole): Card {
  const cardMap: Record<GameRole, Card> = {
    [GAME_ROLES._5H]: { rank: 5, suit: 'H' },
    [GAME_ROLES._9D]: { rank: 9, suit: 'D' },
    [GAME_ROLES._5C]: { rank: 5, suit: 'C' },
    [GAME_ROLES._4C]: { rank: 4, suit: 'C' },
    [GAME_ROLES._6S]: { rank: 6, suit: 'S' },
    [GAME_ROLES._100H]: { rank: 100, suit: 'H' },
  };

  return cardMap[role];
}
