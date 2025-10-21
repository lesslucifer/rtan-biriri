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
    instruction: 'Phía sau màn hình'
  },
  {
    code: 'C2D',
    showDesc: true,
    instruction: 'Phía sau cánh cửa'
  },
  {
    code: 'E3F',
    showDesc: true,
    instruction: 'Bên dưới ghế'
  },
  {
    code: 'G4H',
    showDesc: true,
    instruction: 'Một tầng nào đó trong cầu thang thoát hiểm'
  },
  {
    code: 'I5J',
    showDesc: false,
    instruction: 'COMPLETED'
  }
];


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
            gameName="Truy Tìm Kho Báu"
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
            gameName="Truy Tìm Kho Báu"
            gameColor="gray"
            difficultyCard={card}
          />

          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 text-center">
              <h3 className="font-bold text-red-600 mb-2 text-xl">Mã không hợp lệ</h3>
              <p className="text-gray-700">
                Mã bạn nhập không được nhận diện. Vui lòng kiểm tra lại bản đồ kho báu và thử lại.
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

        <div className="space-y-4">
          {currentInstruction.showDesc && (
            <>
              <div className="text-center space-y-2">
                <p className="text-md text-blue-600 font-medium">
                  Đi theo từng chỉ dẫn để tìm đến <b className="text-lg">Kho Báu</b> của bạn
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Hãy sẵn sàng đổ mồ hôi
                </p>
              </div>
            </>
          )}

          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-4">
            <p className="text-center text-indigo-700 font-semibold">
              <p className="text-lg font-bold text-gray-700">Chỉ dẫn</p>
              {currentInstruction.instruction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
