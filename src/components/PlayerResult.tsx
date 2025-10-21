import { useMemo, useState, type ReactNode } from 'react';
import { useFirebase } from '../hooks/useFirebase';
import { Color, Player } from '../types/playerAssignment';
import type { PlayerAssignment } from '../types/playerAssignment';
import { Loader2 } from 'lucide-react';
import TYHint from '../assets/hints/TY.jpg';
import NAHint from '../assets/hints/NA.jpg';

interface PlayerResultProps {
  color: Color;
}

const PLAYER_RESULT_MESSAGES: Record<Player, ReactNode> = {
  [Player.TH]: 'Mini-Hotpot',
  [Player.GI]: 'Người có giới tính linh hoạt',
  [Player.TY]: (<div className='mt-4'>
    <img className='rounded-lg' src={TYHint}></img>
    <p className='mt-2'>Khu vui chơi ăn uống</p>
  </div>),
  [Player.NA]: (<div className='mt-4'>
    <img className='rounded-lg' src={NAHint}></img>
    <p className='mt-2'>Màn hình quen thuộc nhất</p>
  </div>),
  [Player.L]: 'Hãy hỏi Thợ Săn'
};

function FiveOfHResultMessage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className='mt-2 text-md'>
      <p><b className="text-purple-700">Phù Thủy</b> sẽ cho bạn biết về <b>Phần Thưởng</b> của mình</p>
      <p>Đổi lại, hãy cho <b className="text-purple-700">Phù Thủy</b> xem gợi ý sau:</p>
      <div className="mt-3 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-4 shadow-md">
        <p
          onClick={() => setRevealed(true)}
          className={`font-semibold text-lg cursor-pointer transition-all duration-300 ${
            revealed
              ? 'blur-none select-text text-purple-900'
              : 'blur-md select-none hover:blur-sm text-purple-700'
          }`}
        >
          2701 - Hãy hỏi người không được liên kết
        </p>
        {!revealed && (
          <p className="text-sm text-purple-600 italic mt-2 text-center">
            👆 Chạm vào để xem
          </p>
        )}
      </div>
    </div>
  );
}

export default function PlayerResult({ color }: PlayerResultProps) {
  const {
    data: firebaseAssignments,
    isLoading,
  } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const playerAssignment = useMemo(() => {
    return firebaseAssignments?.find(a => a.color === color);
  }, [firebaseAssignments, color]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-2">
        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (!playerAssignment) {
    return (
      <div className="text-center p-2">
        <p className="text-gray-500">No player assigned to {color}</p>
      </div>
    );
  }

  const resultMessage = playerAssignment.role === '5H' ? <FiveOfHResultMessage /> : PLAYER_RESULT_MESSAGES[playerAssignment.player];

  return (
    <div className="text-center space-y-4">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Chúc mừng!</h3>
        <p className="text-lg">Bạn đã hoàn thành trò chơi!</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md border-2 border-gray-200">
        Chỉ dẫn đến Phần Thưởng
        {typeof resultMessage === 'string' ? (<p className="text-gray-700 font-semibold text-lg">
          {resultMessage}
        </p>) : resultMessage}
      </div>
    </div>
  );
}
