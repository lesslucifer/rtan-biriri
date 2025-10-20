import FiveOfHearts from './FiveOfHearts';
import NineOfDiamonds from './NineOfDiamonds';
import FiveOfClubs from './FiveOfClubs';
import FourOfClubs from './FourOfClubs';
import SixOfSpades from './SixOfSpades';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { GameRole } from '../../types/playerAssignment';

export const roleComponents: Record<GameRole, React.ComponentType> = {
  [GAME_ROLES._5H]: FiveOfHearts,
  [GAME_ROLES._9D]: NineOfDiamonds,
  [GAME_ROLES._5C]: FiveOfClubs,
  [GAME_ROLES._4C]: FourOfClubs,
  [GAME_ROLES._6S]: SixOfSpades,
};

export function getRoleComponent(role: GameRole): React.ComponentType {
  return roleComponents[role];
}
