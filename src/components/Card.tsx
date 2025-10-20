import { useState, useEffect } from 'react';
import type { CardProps, Suit, CardRank } from '../types/card';

const SUIT_SYMBOLS: Record<Suit, string> = {
  H: '\uF040',
  D: '\uF14A',
  C: '\uF0C7',
  S: '\uF04B',
};

const SUIT_COLORS: Record<Suit, string> = {
  H: '#db3131',
  D: '#db3131',
  C: '#2c2c2c',
  S: '#2c2c2c',
};

function getRankDisplay(rank: CardRank): string {
  if (rank === 11) return 'J';
  if (rank === 12) return 'Q';
  if (rank === 13) return 'K';
  if (rank === 14) return 'A';
  return rank.toString();
}

export default function Card({ card, mode = 'normal', scale = 1, style }: CardProps) {
  const [animate, setAnimate] = useState(false);
  const { rank, suit } = card ?? { rank: 0, suit: 'H' as Suit };

  useEffect(() => {
    if (rank > 1) {
      setAnimate(true);
    }
  }, [rank]);

  const width = 100 * scale;
  const height = 120 * scale;
  const borderRadius = 10 * scale;
  const rankFontSize = 2.2 * scale;
  const suitFontSize = 2.7 * scale;

  const baseClasses = 'relative border shadow-md transition-all duration-300';

  let modeClasses = 'bg-gray-50 border-gray-400';
  let modeStyles = {};

  if (mode === 'highlight') {
    modeClasses = 'bg-gray-100 border-gray-700 shadow-xl border-2';
    modeStyles = { transform: 'translateY(-1rem)' };
  } else if (mode === 'down') {
    modeClasses = 'bg-gray-300 border-gray-600 shadow-sm';
  } else if (mode === 'offline') {
    modeClasses = 'bg-gray-400 border-gray-600 shadow-sm grayscale';
  }

  const animationClass = animate ? 'animate-[flip_0.3s_ease-in-out]' : '';

  if (rank <= 1) {
    return (
      <div
        className={`${baseClasses} ${modeClasses} bg-[url('/src/assets/card-back.png')] bg-contain ${mode === 'offline' ? 'grayscale' : ''}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${borderRadius}px`,
          ...style,
        }}
      />
    );
  }

  if (!card) return null;

  const color = SUIT_COLORS[suit];
  const suitSymbol = SUIT_SYMBOLS[suit];
  const rankDisplay = getRankDisplay(rank);

  return (
    <div
      className={`${baseClasses} ${modeClasses} ${animationClass}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        color,
        ...modeStyles,
        ...style,
      }}
    >
      <div className="absolute inset-0" style={{ width: `${width}px`, height: `${height}px` }}>
        <span
          className="absolute font-['Abril_Fatface'] font-bold"
          style={{
            top: '5%',
            left: '18%',
            fontSize: `${rankFontSize}rem`,
          }}
        >
          {rankDisplay}
        </span>
        <span
          className="absolute font-['Suits']"
          style={{
            top: '40%',
            left: '38%',
            fontSize: `${suitFontSize}rem`,
          }}
        >
          {suitSymbol}
        </span>
      </div>
    </div>
  );
}
