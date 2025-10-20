import { useMemo } from 'react';
import { useFirebase } from '../hooks/useFirebase';
import { Color, Player } from '../types/playerAssignment';
import type { PlayerAssignment } from '../types/playerAssignment';
import { Loader2 } from 'lucide-react';

interface PlayerResultProps {
  color: Color;
}

const PLAYER_RESULT_MESSAGES: Record<Player, string> = {
  [Player.TH]: 'Your strategic thinking and careful observation led you to victory!',
  [Player.GI]: 'Your analytical skills and attention to detail were key to solving the mystery!',
  [Player.TY]: 'Your intuition and quick decision-making proved invaluable!',
  [Player.NA]: 'Your teamwork and coordination helped everyone succeed!',
  [Player.L]: 'Your perseverance and problem-solving abilities shone through!'
};

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

  const resultMessage = PLAYER_RESULT_MESSAGES[playerAssignment.player];

  return (
    <div className="text-center space-y-4">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg p-4 shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-lg">You have completed the game!</p>
      </div>
      <div className="bg-white rounded-lg p-4 shadow-md border-2 border-gray-200">
        <p className="text-gray-700 font-semibold text-lg">
          {resultMessage}
        </p>
      </div>
    </div>
  );
}
