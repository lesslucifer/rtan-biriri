export type Suit = 'H' | 'D' | 'C' | 'S';

export type CardRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 100;

export type CardMode = 'normal' | 'highlight' | 'down' | 'offline';

export interface Card {
  rank: CardRank;
  suit: Suit;
}

export interface CardProps {
  card?: Card;
  mode?: CardMode;
  scale?: number;
  style?: React.CSSProperties;
}
