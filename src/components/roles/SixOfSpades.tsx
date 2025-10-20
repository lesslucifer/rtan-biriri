import { useMemo, useEffect } from 'react';
import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';

interface TreasureInstruction {
  code: string;
  showDesc: boolean;
  instruction: string;
}

const TREASURE_INSTRUCTIONS: TreasureInstruction[] = [
  {
    code: 'A1B',
    showDesc: true,
    instruction: 'Look beneath the oldest tree in the garden, where shadows dance at noon.'
  },
  {
    code: 'C2D',
    showDesc: false,
    instruction: 'Follow the path where the river bends. Count seven stones from the willow, and dig where the eighth should be.'
  },
  {
    code: 'E3F',
    showDesc: false,
    instruction: 'The treasure lies not in gold, but in wisdom. Seek the ancient library where knowledge is kept.'
  },
  {
    code: 'G4H',
    showDesc: false,
    instruction: 'Behind the painting of the setting sun, you will find the key to unlock the final door.'
  },
  {
    code: 'I5J',
    showDesc: false,
    instruction: 'COMPLETED'
  }
];

const GAME_DESCRIPTION = 'A deadly operative who eliminates targets under the cover of darkness.';

const GAME_ABILITIES = [
  'Each night, choose one player to eliminate',
  'Strike silently and leave no trace',
  'Work to reduce opposition numbers'
];

const GAME_OBJECTIVE = 'Eliminate all opposing players to secure victory.';

export default function SixOfSpades() {
  const card = getRoleCard(GAME_ROLES._6S);
  const { state, update, isLoading } = useGameState();

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._6S)?.color;
  }, [playerAssignments]);

  const urlParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('c');
  }, []);

  const currentInstruction = useMemo(() => {
    if (!urlParams) return TREASURE_INSTRUCTIONS[0];
    return TREASURE_INSTRUCTIONS.find(inst => inst.code === urlParams);
  }, [urlParams]);

  useEffect(() => {
    if (currentInstruction?.instruction === 'COMPLETED' && state?._6sStatus === 'NEW') {
      update({ _6sStatus: 'COMPLETED' });
    }
  }, [currentInstruction, state?._6sStatus, update]);

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (state._6sStatus === 'COMPLETED') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-gray-800 w-full max-w-2xl">
          <GameHeader
            gameName="Treasure Hunt"
            gameColor="gray"
            difficultyCard={card}
          />
          <PlayerResult color={assignedColor!} />
        </div>
      </div>
    );
  }

  if (!currentInstruction) {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-gray-800 w-full max-w-2xl">
          <GameHeader
            gameName="Treasure Hunt"
            gameColor="gray"
            difficultyCard={card}
          />

          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <h3 className="font-bold text-red-600 mb-2 text-xl">Invalid Code</h3>
              <p className="text-gray-700">
                The code you entered is not recognized. Please check your treasure map and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentInstruction) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-gray-800 w-full max-w-2xl">
        <GameHeader
          gameName="Treasure Hunt"
          gameColor="gray"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          {currentInstruction.showDesc && (
            <>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Role:</h3>
                <p>{GAME_DESCRIPTION}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Abilities:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {GAME_ABILITIES.map((ability, index) => (
                    <li key={index}>{ability}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-800 mb-2">Objective:</h3>
                <p className="text-red-600 font-semibold">{GAME_OBJECTIVE}</p>
              </div>

              <div className="border-t-2 border-gray-200 my-4"></div>
            </>
          )}

          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Your Clue:</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {currentInstruction.instruction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
