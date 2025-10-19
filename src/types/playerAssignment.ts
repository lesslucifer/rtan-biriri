export const Player = {
  TR: 'TR',
  TH: 'TH',
  GI: 'GI',
  TY: 'TY',
  NA: 'NA',
  L: 'L'
} as const;

export type Player = typeof Player[keyof typeof Player];

export const PLAYER_NAMES: Record<Player, string> = {
  [Player.TR]: 'Trang',
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
  BLACK: 'Black'
} as const;

export type Color = typeof Color[keyof typeof Color];

export interface PlayerAssignment {
  id?: string;
  color: Color;
  player: Player;
  createdAt?: Date;
  updatedAt?: Date;
}