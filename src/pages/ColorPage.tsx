import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFirebase } from '../hooks/useFirebase';
import { Color } from '../types/playerAssignment';
import type { PlayerAssignment, GameRole } from '../types/playerAssignment';
import { getRoleComponent } from '../components/roles';
import { useGameState } from '@/hooks/useGameState';

const roleThemeConfig: Record<GameRole, {
  gradientClass: string;
}> = {
  '5H': {
    gradientClass: 'from-red-600 to-red-300'
  },
  '9D': {
    gradientClass: 'from-yellow-600 to-yellow-300'
  },
  '5C': {
    gradientClass: 'from-green-600 to-green-300'
  },
  '4C': {
    gradientClass: 'from-purple-600 to-purple-300'
  },
  '6S': {
    gradientClass: 'from-slate-800 to-slate-500'
  },
  '100H': {
    gradientClass: 'from-purple-600 to-purple-300'
  }
};

export default function ColorPage({ color }: { color: Color }) {
  const {
    data: firebaseAssignments,
    isLoading: paLoading,
    error,
  } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const { state: gameState, isLoading: gsLoading } = useGameState()

  const normalizedColor = color ? color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() : '';
  const isValidColor = normalizedColor && Object.values(Color).includes(normalizedColor as Color);

  const playerAssignment = useMemo(() => {
    if (!isValidColor) return null;
    return firebaseAssignments?.find(a => a.color === normalizedColor);
  }, [firebaseAssignments, isValidColor, normalizedColor]);

  if (!isValidColor) {
    return null;
  }

  if (!playerAssignment || paLoading || !gameState || gsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-300">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-300 px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Error loading assignment: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const roleTheme = roleThemeConfig[playerAssignment.role];

  return (
    <div className={`min-h-screen flex justify-center bg-gradient-to-br ${roleTheme.gradientClass} px-4 py-4`}>
      <div className="w-full h-full mt-8">
        {(() => {
          const RoleComponent = getRoleComponent(playerAssignment.role);
          return <RoleComponent />;
        })()}
      </div>
    </div>
  );
}
