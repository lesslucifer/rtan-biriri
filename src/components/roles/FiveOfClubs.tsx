import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { SUIT_SYMBOLS, SUIT_COLORS } from '../../constants/suits';

const HINT_COST_MINUTES = 0.5;

const HINTS = {
  D: [
    "Diamond Hint 1: Pay attention to the resource distribution patterns.",
    "Diamond Hint 2: The key player holds more resources than they claim.",
    "Diamond Hint 3: The final resource exchange will reveal the truth."
  ],
  H: [
    "Heart Hint 1: Trust is earned through consistent actions, not words.",
    "Heart Hint 2: One player's motivations are not what they seem.",
    "Heart Hint 3: The most empathetic response may hide deception."
  ],
  S: [
    "Spade Hint 1: Look for patterns in the timing of actions.",
    "Spade Hint 2: The logical inconsistency lies in the third statement.",
    "Spade Hint 3: Cross-reference the alibis with known facts."
  ]
};

export default function FiveOfClubs() {
  const card = getRoleCard(GAME_ROLES._5C);
  const { state, update, isLoading } = useGameState();
  const [selectedSuit, setSelectedSuit] = useState<'D' | 'H' | 'S'>('D');
  const [now, setNow] = useState(Date.now())

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._5C)?.color;
  }, [playerAssignments]);

  const totalHints = useMemo(() => {
    return HINTS.D.length + HINTS.H.length + HINTS.S.length;
  }, []);

  const gameStartTime = state?.createdAt?.toMillis() ?? Date.now();
  const timeBank = now - gameStartTime - (state?._5cUsedTime ?? 0);

  const handleRevealHint = async (suit: 'D' | 'H' | 'S') => {
    if (!state?._5cHintIndices || !state?.createdAt) return;

    const currentIndex = state._5cHintIndices[suit];
    const hintsForSuit = HINTS[suit];

    if (currentIndex >= hintsForSuit.length) return;
    if (timeBank < HINT_COST_MINUTES * 60 * 1000) return;

    await update({
      _5cHintIndices: {
        ...state._5cHintIndices,
        [suit]: currentIndex + 1
      },
      _5cCurrentHint: { suit, index: currentIndex },
      _5cUsedTime: (state._5cUsedTime ?? 0) + HINT_COST_MINUTES * 60 * 1000
    });
  };

  useEffect(() => {
    if (state._5cStatus !== 'NEW') return

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [state._5cStatus]);

  const revealHintError = useMemo(() => {
    if (!state?.createdAt || !state?._5cHintIndices) return 'NO_MORE';

    const currentIndex = state._5cHintIndices[selectedSuit];
    const hintsForSuit = HINTS[selectedSuit];

    if (currentIndex >= hintsForSuit.length) return 'NO_MORE';

    return timeBank >= HINT_COST_MINUTES * 60 * 1000 ? undefined : 'TIME' ;
  }, [state?.createdAt, state?._5cHintIndices, selectedSuit, timeBank]);

  const canRevealHint = !revealHintError

  const formatTime = (msec: number) => {
    const sec = Math.floor(msec / 1000)
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (state._5cStatus === 'COMPLETED') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-green-100 w-full max-w-2xl">
          <GameHeader
            gameName="Chrono Sleuth"
            gameColor="green"
            difficultyCard={card}
          />
          <PlayerResult color={assignedColor!} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-green-100 w-full max-w-2xl">
        <GameHeader
          gameName="Chrono Sleuth"
          gameColor="green"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-green-600 mb-2">Role:</h3>
            <p>A time-aware investigator who reveals crucial information at strategic moments.</p>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access to {totalHints} hints across all games</li>
              <li>Each hint requires {HINT_COST_MINUTES} minutes of time bank</li>
              <li>Time bank accumulates from when the game starts</li>
              <li>Choose wisely which game needs insight most</li>
              <li>Only the latest hint is visible at any time</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Objective:</h3>
            <p>Manage your time wisely and provide timely intelligence to support your team's investigation.</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-green-600 mb-2">Role:</h3>
            <p>A time-aware investigator who reveals crucial information at strategic moments.</p>
          </div>

          {revealHintError !== 'NO_MORE' && <div>
            <h3 className="font-bold text-green-600 mb-2">Time Bank:</h3>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
              <p className="text-center text-green-700 font-semibold text-xl">
                {formatTime(timeBank)}
              </p>
              <p className="text-center text-sm text-gray-600 mt-1">
                {HINT_COST_MINUTES} minutes needed per hint
              </p>
            </div>
          </div>}
        </div>

        {state._5cCurrentHint && (
          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="mb-2 text-center">
              <span
                className="text-4xl font-['Suits']"
                style={{ color: SUIT_COLORS[state._5cCurrentHint.suit] }}
              >
                {SUIT_SYMBOLS[state._5cCurrentHint.suit]}
              </span>
            </div>
            <h3 className="font-bold text-green-600 mb-2 text-center">Latest Hint:</h3>
            <p className="text-gray-700 text-center">
              {HINTS[state._5cCurrentHint.suit][state._5cCurrentHint.index]}
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t-2 border-green-100">
          <h3 className="font-bold text-green-600 mb-4 text-center">Select Game to Investigate</h3>

          <div className="flex justify-center gap-6 mb-6">
            {(['D', 'H', 'S'] as const).map((suit) => {
              const currentIndex = state._5cHintIndices?.[suit] ?? 0;
              const hintsForSuit = HINTS[suit];
              const remaining = hintsForSuit.length - currentIndex;
              const isDisabled = remaining <= 0;

              return (
                <label
                  key={suit}
                  className={`flex flex-col items-center ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <input
                    type="radio"
                    name="suit"
                    value={suit}
                    checked={selectedSuit === suit}
                    onChange={(e) => setSelectedSuit(e.target.value as 'D' | 'H' | 'S')}
                    disabled={isDisabled}
                    className="w-5 h-5 text-green-600 focus:ring-green-500 mb-2"
                  />
                  <span
                    className="text-2xl font-['Suits'] mb-1"
                    style={{ color: SUIT_COLORS[suit] }}
                  >
                    {SUIT_SYMBOLS[suit]}
                  </span>
                  <span className="text-sm text-gray-600">
                    {remaining} hint{remaining !== 1 ? 's' : ''} left
                  </span>
                </label>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => handleRevealHint(selectedSuit)}
              disabled={!canRevealHint}
              className={`font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 ${
                canRevealHint
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {revealHintError === 'NO_MORE' ? 'No more hint'
                : revealHintError === 'TIME' ? `Wait for ${formatTime(HINT_COST_MINUTES * 60 * 1000 - timeBank)}`
                : 'Reveal'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
