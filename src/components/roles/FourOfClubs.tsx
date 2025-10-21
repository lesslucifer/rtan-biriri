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
  D: "TRAIN",
  H: "Cung Thiên Bình",
  S: "Tầng B1"
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

  const otherGamescompletion = {
    D: state?._9dStatus === 'COMPLETED',
    H: state?._5hStatus === 'COMPLETED',
    S: state?._6sStatus === 'COMPLETED'
  };

  const otherGameSuits = ['D', 'H', 'S'] as const;
  const completeGameConditionSuits = otherGameSuits.filter(s => s !== state?._4cHintSuit)
  const canCompleteGame = completeGameConditionSuits.every(s => otherGamescompletion[s])

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

  const handleCompleteGame = async () => {
    await update({
      _4cStatus: 'COMPLETED',
    });
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
            gameName="Phù Thủy"
            gameColor="purple"
            difficultyCard={{ rank: 12, suit: 'H' }}
          />

          <div className="space-y-4 text-gray-700">
            <div>
              <p className="leading-relaxed text-center">
                <span className="font-bold text-purple-600 text-lg">Bạn chính là <b className='text-purple-700'>Phù Thủy</b>.</span>
              </p>
              <p className="leading-relaxed text-center mt-2">
                Bạn trà trộn và thể hiện như một người chơi bình thường.
              </p>
              <p className="leading-relaxed text-center">
                <b className="text-purple-700 text-lg">Phù Thủy</b> sẽ bị săn tìm bởi những người chơi khác.
              </p>
              <p className="leading-relaxed text-center">
                Mục đích của bạn là <b>ẩn thân</b> và <b>phá hoại</b>.
              </p>
              <p className="leading-relaxed text-center font-semibold text-red-600">
                Hãy <b>ngăn cản</b> những người chơi khác hoàn thành trò chơi của họ!
              </p>
            </div>

            <div className="border-t-2 border-red-100 pt-4">
              <p className="leading-relaxed text-center">
                Mọi thứ sẽ <b>kết thúc</b> khi bạn bị phát hiện!
              </p>
              <p className="leading-relaxed text-center">
                Thợ săn sẽ thanh tẩy bạn bằng <b>búp bê</b> của họ!
              </p>
              <p className="leading-relaxed text-center">
                Hãy nói cho thợ săn biết <span className="font-bold text-amber-600">Phần Thưởng</span> của họ ở đâu.
              </p>
              <p className="leading-relaxed text-center">
                Đổi lại, thợ săn sẽ cho bạn biết thông tin về <span className="font-bold text-amber-600">Phần Thưởng</span> của bạn!
              </p>
            </div>

            <div className="border-t-2 border-red-100 pt-4">
              <p className="leading-relaxed text-center">
                Nếu có ít nhất một người chơi khác, <b>không thể hoàn thành</b> trò chơi của họ trong vòng <b>40 phút</b>, bạn sẽ <b>chiến thắng</b>!
              </p>
              <p className="leading-relaxed text-center font-semibold text-purple-500">
                Bên cạnh phần thưởng gốc, bạn sẽ nhận thêm một <b className='text-purple-700'>PHẦN THƯỞNG ĐẶC BIỆT</b> bên ngoài trò chơi.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mt-4">
              <p className="leading-relaxed text-center">
                Bạn sẽ trà trộn bằng cách hóa thân vào một nhân vật khác.
              </p>
              <p className="leading-relaxed text-center font-semibold text-red-500">
                Cố gắng đọc và ghi nhớ mọi thứ trước khi hóa thân, các thông tin trên đây sẽ <b>không bao giờ</b> xuất hiện trở lại!
              </p>
              <p className="leading-relaxed text-center mt-2">
                Nhấn vào nút dưới đây để biến hình.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleCloseSecret}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
            >
              Biến Hình
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
          gameName="Sự Hỗ Trợ Của Thần"
          gameColor="purple"
          difficultyCard={fourOfClubsCard}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="leading-relaxed text-center">
              Bạn có thể lấy <b className="text-purple-700">gợi ý quan trọng</b> cho một trò chơi.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Bạn chỉ có thể dùng <b>một lần duy nhất</b>.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Gợi ý của bạn là <b className="text-amber-600">cực kì giá trị</b>, chỉ dẫn trực tiếp đến <b className="text-amber-600">đáp án cuối cùng</b> của trò chơi được chọn.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Bạn sẽ chiến thắng khi <b>hai trò chơi còn lại</b> (không được lấy gợi ý) hoàn thành.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Bạn có thể dùng (hoặc <b>không dùng</b>) năng lực này, vào bất kì lúc nào.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center font-semibold text-purple-600">
              Hãy lựa chọn khôn ngoan!
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-purple-100">
          <h3 className="font-bold text-purple-600 mb-4 text-center">Khả Năng Hỗ Trợ</h3>

          {canCompleteGame ? (
            <div className="flex justify-center">
              <button
                onClick={handleCompleteGame}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
              >
                Hoàn Thành Trò Chơi
              </button>
            </div>
          ) : state._4cStatus !== 'REVEALED_HINT' ? (
            <>
              <p className="text-gray-700 text-center mb-4 leading-relaxed">Chọn một trò chơi để nhận gợi ý quan trọng:</p>

              <div className="flex justify-center gap-4 mb-6">
                {(['D', 'H', 'S'] as const).map((suit) => {
                  const isCompleted = otherGamescompletion[suit];

                  return (
                    <label key={suit} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="suit"
                        value={suit}
                        checked={selectedSuit === suit}
                        disabled={isCompleted}
                        onChange={(e) => setSelectedSuit(e.target.value as 'D' | 'H' | 'S')}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <span
                        className="ml-2 text-2xl font-['Suits']"
                        style={{ color: SUIT_COLORS[suit] }}
                      >
                        {SUIT_SYMBOLS[suit]}
                        {isCompleted && <span className="text-green-600 font-bold">✓</span>}
                      </span>
                    </label>
                  );
                })}
              </div>

              {!showConfirmation ? (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowConfirmation(true)}
                    disabled={otherGamescompletion[selectedSuit]}
                    className={`font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200 ${
                      otherGamescompletion[selectedSuit]
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    Hiển Thị Gợi Ý
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                  <p className="text-center text-gray-700 mb-4 font-semibold">
                    Bạn có chắc chắn không? Hành động này không thể hoàn tác!
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleRevealHint}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
                    >
                      Có, Hiển Thị
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="font-bold text-purple-600 mb-2 text-center">Trò Chơi Đã Chọn:</h3>
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
                <h3 className="font-bold text-purple-600 mb-2">Gợi Ý Của Bạn:</h3>
                <p className="text-gray-700 leading-relaxed text-center">
                  {state._4cHintSuit && HINTS[state._4cHintSuit]}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
