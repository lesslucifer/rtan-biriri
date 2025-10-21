import Card from './Card';
import type { Card as CardType } from '../types/card';

interface GameHeaderProps {
  gameName: string;
  gameColor: string;
  difficultyCard: CardType;
}

export default function GameHeader({ gameName, gameColor, difficultyCard }: GameHeaderProps) {
  return (
    <div className="text-center mb-6">
      <p className="text-md font-semibold text-gray-700">Trò chơi</p>
      <h2 className={`text-3xl font-bold text-${gameColor}-600 mb-2`}>{gameName}</h2>
      <p className="text-lg font-semibold text-gray-700">Độ khó</p>
      <div className="flex justify-center">
        <Card card={difficultyCard} scale={0.6} />
      </div>
    </div>
  );
}
