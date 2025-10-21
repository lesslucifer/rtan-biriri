import GameHeader from '../GameHeader';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { Loader2 } from 'lucide-react';

export default function OneHundredOfHearts() {
  const card = getRoleCard(GAME_ROLES._100H);
  const { state, isLoading } = useGameState();

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100 w-full max-w-2xl">
        <GameHeader
          gameName="100 Tim"
          gameColor="red"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700 mb-3 mt-10">
          <div className='border-2 border-purple-300 rounded-lg p-4 shadow-md'>
            <h3 className="font-bold text-purple-600 mb-2 text-xl">Thử Thách</h3>
            <p>Có một video trên <b className='text-amber-900 text-lg'>Tiktok</b> đạt <b className='text-red-600'>100 lượt tim</b> trở lên</p>
          </div>
        </div>
      </div>
    </div>
  );
}
