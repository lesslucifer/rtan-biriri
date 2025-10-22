import { useMemo } from 'react';
import GameHeader from '../GameHeader';
import PlayerResult from '../PlayerResult';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';
import type { PlayerAssignment } from '../../types/playerAssignment';
import { useGameState } from '@/hooks/useGameState';
import { useFirebase } from '../../hooks/useFirebase';
import { Loader2 } from 'lucide-react';

export default function FiveOfHearts() {
  const card = getRoleCard(GAME_ROLES._5H);
  const { state, isLoading } = useGameState();

  const { data: playerAssignments } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignedColor = useMemo(() => {
    return playerAssignments?.find(a => a.role === GAME_ROLES._5H)?.color;
  }, [playerAssignments]);

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
        <div className="bg-gradient-to-br from-purple-50 via-white to-red-50 rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-200 w-full max-w-2xl">
          <GameHeader
            gameName="Săn Phù Thủy"
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
      <div className="bg-gradient-to-br from-purple-50 via-white to-red-50 rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-200 w-full max-w-2xl">
        <GameHeader
          gameName="Săn Phù Thủy"
          gameColor="red"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <p className="leading-relaxed text-center">
              Có một <span className="font-bold text-purple-700 text-lg">Phù Thủy</span> đang ẩn thân trong các người chơi.<br />
              Mục tiêu của ả chỉ có một: <b>Phá Hoại</b> mọi thứ.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Hãy săn tìm <span className="font-bold text-purple-700 text-lg">Phù Thủy</span><br />
              Thanh tẩy ả bằng cách <b>trao đổi búp bê</b><br/>
              (đây là điều kiện <b>hoàn thành trò chơi</b>)<br />
              Bằng năng lực <b>tiên tri</b> bí ẩn, ả sẽ tìm ra vị trí <span className="font-bold text-amber-600 text-lg">Phần Thưởng</span> của bạn.
            </p>
          </div>

          <div>
            <p className="leading-relaxed text-center">
              Phải tìm ra <span className="font-bold text-purple-700 text-lg">Phù Thủy</span> càng sớm càng tốt.<br />
              Mỗi giây trôi qua là một cơ hội cho sự <b>phá hoại</b>
            </p>
            <p className="leading-relaxed text-center font-semibold text-red-500 text-lg mt-2">
              Nhanh chân lên, trước khi quá muộn!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
