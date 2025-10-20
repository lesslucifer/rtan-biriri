import { useState, useMemo } from 'react';
import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';

const CORRECT_ANSWER = 'SECRET';

export default function FiveOfHearts() {
  const card = getRoleCard(GAME_ROLES._5H);
  const { state, update, isLoading } = useGameState();
  const [answerInput, setAnswerInput] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._5H)?.color;
  }, [playerAssignments]);

  const normalizeAnswer = (text: string): string => {
    return text.toUpperCase().replace(/\s/g, '');
  };

  const handleSubmitAnswer = async () => {
    if (!state) return;

    const normalizedInput = normalizeAnswer(answerInput);
    const normalizedCorrectAnswer = normalizeAnswer(CORRECT_ANSWER);

    if (normalizedInput === normalizedCorrectAnswer) {
      await update({
        _5hStatus: 'COMPLETED'
      });
    } else {
      setWrongAnswer(true);
      setAnswerInput('');

      setTimeout(() => {
        setWrongAnswer(false);
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (state._5hStatus === 'COMPLETED') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-red-100 w-full max-w-2xl">
          <GameHeader
            gameName="Witch Hunt"
            gameColor="red"
            difficultyCard={card}
          />
          <PlayerResult color={assignedColor!} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-red-100 w-full max-w-2xl">
        <GameHeader
          gameName="Witch Hunt"
          gameColor="red"
          difficultyCard={card}
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

          <div className="mt-6 space-y-3">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your answer..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-center text-lg font-semibold uppercase transition-all duration-300 ${
                wrongAnswer
                  ? 'border-red-500 bg-red-50'
                  : 'border-red-200 focus:border-red-500'
              }`}
              autoComplete="off"
            />

            <div className="flex justify-center">
              <button
                onClick={handleSubmitAnswer}
                disabled={!answerInput.trim()}
                className={`font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-200 ${
                  answerInput.trim()
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
