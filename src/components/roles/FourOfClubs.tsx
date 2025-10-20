import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { SUIT_SYMBOLS, SUIT_COLORS } from '../../constants/suits';

const HINTS = {
  D: "The Diamond game involves strategic resource management and careful observation of player actions.",
  H: "The Heart game requires empathy and understanding of player motivations - trust is key.",
  S: "The Spade game is about deduction and logical reasoning - analyze patterns carefully."
};

export default function FourOfClubs() {
  const fourOfClubsCard = getRoleCard(GAME_ROLES._4C);
  const { state, update, isLoading } = useGameState();
  const [selectedSuit, setSelectedSuit] = useState<'D' | 'H' | 'S'>('D');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._4C)?.color;
  }, [playerAssignments]);

  const handleCloseSecret = async () => {
    await update({
      _4cStatus: 'OPENED_4C',
    });
  };

  const handleRevealHint = async () => {
    await update({
      _4cStatus: 'REVEALED_HINT',
      _4cHintSuit: selectedSuit,
    });
    setShowConfirmation(false);
  };

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (state._4cStatus === 'NEW') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-red-100 w-full max-w-2xl">
          <GameHeader
            gameName="Witch Hunt"
            gameColor="red"
            difficultyCard={{ rank: 5, suit: 'H' }}
          />

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

  if (state._4cStatus === 'COMPLETED') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100 w-full max-w-2xl">
          <GameHeader
            gameName="Laga Noasta"
            gameColor="purple"
            difficultyCard={fourOfClubsCard}
          />

          <PlayerResult color={assignedColor!} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100 w-full max-w-2xl">
        <GameHeader
          gameName="Laga Noasta"
          gameColor="purple"
          difficultyCard={fourOfClubsCard}
        />

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

        <div className="mt-8 pt-6 border-t-2 border-purple-100">
          <h3 className="font-bold text-purple-600 mb-4 text-center">Support Ability</h3>

          {state._4cStatus !== 'REVEALED_HINT' ? (
            <>
              <p className="text-gray-700 text-center mb-4">Select a game to receive a significant hint:</p>

              <div className="flex justify-center gap-4 mb-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="suit"
                    value="D"
                    checked={selectedSuit === 'D'}
                    onChange={(e) => setSelectedSuit(e.target.value as 'D' | 'H' | 'S')}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className="ml-2 text-2xl font-['Suits']"
                    style={{ color: SUIT_COLORS.D }}
                  >
                    {SUIT_SYMBOLS.D}
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="suit"
                    value="H"
                    checked={selectedSuit === 'H'}
                    onChange={(e) => setSelectedSuit(e.target.value as 'D' | 'H' | 'S')}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className="ml-2 text-2xl font-['Suits']"
                    style={{ color: SUIT_COLORS.H }}
                  >
                    {SUIT_SYMBOLS.H}
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="suit"
                    value="S"
                    checked={selectedSuit === 'S'}
                    onChange={(e) => setSelectedSuit(e.target.value as 'D' | 'H' | 'S')}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className="ml-2 text-2xl font-['Suits']"
                    style={{ color: SUIT_COLORS.S }}
                  >
                    {SUIT_SYMBOLS.S}
                  </span>
                </label>
              </div>

              {!showConfirmation ? (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowConfirmation(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
                  >
                    Reveal Hint
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <p className="text-center text-gray-700 mb-4 font-semibold">
                    Are you sure? This action cannot be undone!
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleRevealHint}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
                    >
                      Yes, Reveal
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="font-bold text-purple-600 mb-2 text-center">Selected Game:</h3>
                <p className="text-center">
                  <span
                    className="text-4xl font-['Suits']"
                    style={{ color: state._4cHintSuit ? SUIT_COLORS[state._4cHintSuit] : undefined }}
                  >
                    {state._4cHintSuit && SUIT_SYMBOLS[state._4cHintSuit]}
                  </span>
                </p>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-purple-600 mb-2">Your Hint:</h3>
                <p className="text-gray-700">
                  {state._4cHintSuit && HINTS[state._4cHintSuit]}
                </p>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                Use this information wisely to support your team!
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
