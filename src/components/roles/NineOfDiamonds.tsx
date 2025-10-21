import { useState, useMemo } from 'react';
import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';
import Q1 from '../../assets/9D/Q1.png';
import Q2 from '../../assets/9D/Q2.png';
import Q3 from '../../assets/9D/Q3.png';

interface PuzzleLevel {
  image: string;
  instruction: string;
  answer: string;
}

const LEVELS: PuzzleLevel[] = [
  {
    image: Q1,
    instruction: 'Capital',
    answer: 'KABUL'
  },
  {
    image: Q2,
    instruction: 'Genya Shinazugawa',
    answer: 'PENTIUM'
  },
  {
    image: Q3,
    instruction: 'Alphabet',
    answer: 'TRAIN'
  }
];

export default function NineOfDiamonds() {
  const card = getRoleCard(GAME_ROLES._9D);
  const { state, update, isLoading } = useGameState();
  const [answerInput, setAnswerInput] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._9D)?.color;
  }, [playerAssignments]);

  const currentLevel = state?._9dCurrentLevel ?? 0;
  const currentPuzzle = LEVELS[currentLevel];

  const normalizeAnswer = (text: string): string => {
    return text.toUpperCase().replace(/\s/g, '');
  };

  const handleSubmitAnswer = async () => {
    if (!state || !currentPuzzle) return;

    const normalizedInput = normalizeAnswer(answerInput);
    const normalizedCorrectAnswer = normalizeAnswer(currentPuzzle.answer);

    if (normalizedInput === normalizedCorrectAnswer) {
      const nextLevel = currentLevel + 1;
      setAnswerInput('');

      if (nextLevel >= LEVELS.length) {
        await update({
          _9dStatus: 'COMPLETED',
          _9dCurrentLevel: nextLevel
        });
      } else {
        setShowCongrats(true);
        setTimeout(async () => {
          await update({
            _9dCurrentLevel: nextLevel
          });
          setShowCongrats(false);
        }, 1000);
      }
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

  if (state._9dStatus === 'COMPLETED') {
    return (
      <div className="w-full flex items-center justify-center p-2">
        <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-yellow-100 w-full max-w-2xl">
          <GameHeader
            gameName="God Tower"
            gameColor="yellow"
            difficultyCard={card}
          />
          <PlayerResult color={assignedColor!} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-yellow-100 w-full max-w-2xl relative">
        <GameHeader
          gameName="God Tower"
          gameColor="yellow"
          difficultyCard={card}
        />

        {showCongrats && (
          <div className="absolute inset-0 bg-yellow-500/90 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="text-center space-y-4 animate-bounce">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold text-white">Chính xác!</h2>
              <p className="text-xl text-white">Chuyển sang câu hỏi tiếp theo...</p>
            </div>
          </div>
        )}

        <div className="space-y-6 text-gray-700">
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-600">
              Trả lời các câu hỏi, vượt qua mọi trở ngại
            </p>
            <p className="text-sm font-semibold text-yellow-600">
              Phần thưởng lớn dành cho trí tuệ vĩ đại
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={currentPuzzle.image}
              alt="Câu hỏi"
              className="rounded-lg shadow-md max-w-full h-auto max-h-64 object-contain"
            />
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <p className="text-center text-gray-700 font-semibold">
              {currentPuzzle.instruction}
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu trả lời..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none text-center text-lg font-semibold uppercase transition-all duration-300 ${
                wrongAnswer
                  ? 'border-red-500 bg-red-50 animate-shake'
                  : 'border-yellow-200 focus:border-yellow-500'
              }`}
              autoComplete="off"
              disabled={showCongrats}
            />

            <div className="flex justify-center">
              <button
                onClick={handleSubmitAnswer}
                disabled={!answerInput.trim() || showCongrats}
                className={`font-semibold px-8 py-3 rounded-lg shadow-md transition-colors duration-200 ${
                  answerInput.trim() && !showCongrats
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Gửi câu trả lời
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
