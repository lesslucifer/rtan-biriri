import Card from '../Card';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { Loader2 } from 'lucide-react';


export default function FourOfClubs() {
  const fourOfClubsCard = getRoleCard(GAME_ROLES._4C);
  const { state, update, isLoading } = useGameState()

  const handleCloseSecret = async () => {
    await update({
      closed4C: true,
    });
  };

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (!state.closed4C) {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-red-100 w-full max-w-2xl">
          <div className="text-center mb-6">
            <p className="text-md font-semibold text-gray-700">Game</p>
            <h2 className="text-3xl font-bold text-red-600 mb-2">Witch Hunt</h2>
            <p className="text-lg font-semibold text-gray-700">Difficulty</p>
            <div className="flex justify-center">
              <Card card={{ rank: 5, suit: 'H' }} scale={0.6} />
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold text-red-600 mb-2">Role:</h3>
              <p>You are a benevolent healer who can save lives during the night phase.</p>
            </div>

            <div>
              <h3 className="font-bold text-red-600 mb-2">Abilities:</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Each night, choose one player to protect</li>
                <li>Your protection prevents elimination for that night</li>
                <li>You cannot protect yourself consecutively</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-red-600 mb-2">Objective:</h3>
              <p>Help the village identify and eliminate threats while keeping players alive.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCloseSecret}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100 w-full max-w-2xl">
        <div className="text-center mb-6">
          <p className="text-md font-semibold text-gray-700">Game</p>
          <h2 className="text-3xl font-bold text-purple-600 mb-2">Laga Noasta</h2>
          <p className="text-lg font-semibold text-gray-700">Difficulty</p>
            <div className="flex justify-center">
              <Card card={fourOfClubsCard} scale={0.6} />
            </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-purple-600 mb-2">Role:</h3>
            <p>A cunning infiltrator who operates in the shadows, gathering intelligence.</p>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, track one player's movements</li>
              <li>Discover who they visited or targeted</li>
              <li>Share intel to help identify threats</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Objective:</h3>
            <p>Gather evidence through surveillance and expose the hidden enemies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
