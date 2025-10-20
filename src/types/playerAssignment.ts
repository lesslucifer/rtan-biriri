export const Player = {
  // TR: 'TR',
  TH: 'TH',
  GI: 'GI',
  TY: 'TY',
  NA: 'NA',
  L: 'L'
} as const;

export type Player = typeof Player[keyof typeof Player];

export const PLAYER_NAMES: Record<Player, string> = {
  // [Player.TR]: 'Trang',
  [Player.TH]: 'Thao',
  [Player.GI]: 'Giang',
  [Player.TY]: 'Thuy',
  [Player.NA]: 'NAnh',
  [Player.L]: 'Linh'
};

export const Color = {
  RED: 'Red',
  GREEN: 'Green',
  BLUE: 'Blue',
  PINK: 'Pink',
  ORANGE: 'Orange',
  // BLACK: 'Black'
} as const;

export const GAME_ROLES = {
  _5H: '5H',
  _9D: '9D',
  _5C: '5C',
  _4C: '4C',
  _6S: '6S',
} as const;

export type GameRole = typeof GAME_ROLES[keyof typeof GAME_ROLES];

export type Color = typeof Color[keyof typeof Color];

export interface PlayerAssignment {
  id?: string;
  color: Color;
  player: Player;
  role: GameRole;
  createdAt?: Date;
  updatedAt?: Date;
}