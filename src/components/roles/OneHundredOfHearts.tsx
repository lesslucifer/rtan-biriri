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
          gameName="100 Hearts"
          gameColor="purple"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-purple-600 mb-2">Role:</h3>
            <p>You are a mysterious guardian of ancient wisdom, holding secrets that span a hundred lifetimes.</p>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access to profound knowledge from past generations</li>
              <li>Ability to see patterns others cannot perceive</li>
              <li>Connection to the hearts of all players</li>
              <li>Insight into the true nature of challenges</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Objective:</h3>
            <p>Use your ancient wisdom to guide others through their trials. Your knowledge is a gift meant to be shared when the time is right.</p>
          </div>

          <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <p className="text-center text-purple-700 italic">
              "In the realm of a hundred hearts, patience and wisdom reign supreme."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
