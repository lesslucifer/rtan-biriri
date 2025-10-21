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

const HINT_COST_MINUTES = 100;

const HINTS = {
  D: [
    "Đất nước trong tấm gương",
    "Cắt đôi nỗi sầu",
    "Google: Hieroglyphics"
  ],
  H: [
    "Tại sao là 5 cơ mà không phải 10 cơ ?",
    "Làm thế nào Phù Thủy có thể Tiên Tri ?",
    "Phù thủy không phải là đồng đội"
  ],
  S: [
    "Mật mã ngoài trời",
    "Đừng chơi một mình: đông người, bớt việc",
    "Mật mã dưới lòng đất"
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

  const otherGamescompletion = {
    D: state?._9dStatus === 'COMPLETED',
    H: state?._5hStatus === 'COMPLETED',
    S: state?._6sStatus === 'COMPLETED'
  };
  const allGamesCompleted = Object.values(otherGamescompletion).every(v => !!v);
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

  const handleCompleteGame = async () => {
    await update({
      _5cStatus: 'COMPLETED',
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
    if (allGamesCompleted) return 'NO_MORE';
    if (!selectedSuit || !state?.createdAt || !state?._5cHintIndices) return 'NO_MORE';
    const currentIndex = state._5cHintIndices[selectedSuit];
    const hintsForSuit = HINTS[selectedSuit];

    if (currentIndex >= hintsForSuit.length) return 'NO_MORE';

    return timeBank >= HINT_COST_MINUTES * 60 * 1000 ? undefined : 'TIME' ;
  }, [allGamesCompleted, state?.createdAt, state?._5cHintIndices, selectedSuit, timeBank]);

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
            gameName="Đồng Đội"
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
          gameName="Đồng Đội"
          gameColor="green"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="leading-relaxed text-center">
              Hãy dùng năng lực của mình hỗ trợ <b>đồng đội</b>
            </p>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Khả Năng:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Bạn có thể sử dụng <b>thời gian</b> để lấy <b>gợi ý</b> cho các trò chơi khác</li>
              <li>Thời gian sẽ tự động được <b>tích lũy</b>, kể từ khi trò chơi bắt đầu</li>
              <li>Mỗi <b>gợi ý</b> sẽ tiêu tốn <b>{HINT_COST_MINUTES} phút</b> từ thời gian tích lũy</li>
              <li>Càng về sau, gợi ý càng <b>giá trị</b></li>
              <li>Hãy ghi chép lại các gợi ý cũ, chỉ <b>gợi ý mới nhất</b> được hiển thị</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Bạn chiến thắng khi</h3>
            <b className="text-amber-600">Cả ba trò chơi khác hoàn thành</b>
          </div>
        </div>

        {revealHintError !== 'NO_MORE' && <div className="mt-6">
          <h3 className="font-bold text-green-600 mb-2">Thời gian tích lũy</h3>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
            <p className="text-center text-green-700 font-semibold text-xl">
              {formatTime(timeBank)}
            </p>
            <p className="text-center text-sm text-gray-600 mt-1">
              Mỗi gợi ý sẽ tiêu hao {HINT_COST_MINUTES} phút
            </p>
          </div>
        </div>}

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
            <h3 className="font-bold text-green-600 mb-2 text-center">Gợi Ý Mới Nhất:</h3>
            <p className="text-gray-700 text-center">
              {HINTS[state._5cCurrentHint.suit][state._5cCurrentHint.index]}
            </p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t-2 border-green-100">
          <h3 className="font-bold text-green-600 mb-4 text-center">Chọn Trò Chơi Để Hỗ Trợ</h3>

          <div className="flex justify-center gap-6 mb-6">
            {(['D', 'H', 'S'] as const).map((suit) => {
              const currentIndex = state._5cHintIndices?.[suit] ?? 0;
              const hintsForSuit = HINTS[suit];
              const remaining = hintsForSuit.length - currentIndex;
              const isCompleted = otherGamescompletion[suit];
              const isDisabled = isCompleted || remaining <= 0;

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
                  <div className="flex items-center gap-1">
                    <span
                      className="text-2xl font-['Suits']"
                      style={{ color: SUIT_COLORS[suit] }}
                    >
                      {SUIT_SYMBOLS[suit]}
                      {isCompleted && <span className="text-green-600 font-bold">✓</span>}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          <div className="flex justify-center">
            {allGamesCompleted ? (
              <button
                onClick={handleCompleteGame}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
              >
                Hoàn Thành
              </button>
            ) : (
              <button
                onClick={() => handleRevealHint(selectedSuit)}
                disabled={!canRevealHint}
                className={`font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 ${
                  canRevealHint
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {revealHintError === 'NO_MORE' ? 'Hết gợi ý'
                  : revealHintError === 'TIME' ? `Chờ ${formatTime(HINT_COST_MINUTES * 60 * 1000 - timeBank)}`
                  : 'Tiết Lộ'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
