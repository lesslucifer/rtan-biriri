import { useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Loader2, UserCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFirebase } from '../hooks/useFirebase';
import { Color, PLAYER_NAMES } from '../types/playerAssignment';
import type { PlayerAssignment } from '../types/playerAssignment';
import { getRoleComponent } from '../components/roles';

const colorConfig: Record<Color, {
  bgClass: string;
  bgColor: string;
  textClass: string;
  shadowClass: string;
  gradientClass: string;
}> = {
  [Color.RED]: {
    bgClass: 'bg-red-50',
    bgColor: 'bg-red-600',
    textClass: 'text-red-600',
    shadowClass: 'shadow-red-600/30',
    gradientClass: 'from-red-600 to-red-300'
  },
  [Color.GREEN]: {
    bgClass: 'bg-green-50',
    bgColor: 'bg-green-600',
    textClass: 'text-green-600',
    shadowClass: 'shadow-green-600/30',
    gradientClass: 'from-green-600 to-green-300'
  },
  [Color.BLUE]: {
    bgClass: 'bg-blue-50',
    bgColor: 'bg-blue-600',
    textClass: 'text-blue-600',
    shadowClass: 'shadow-blue-600/30',
    gradientClass: 'from-blue-600 to-blue-300'
  },
  [Color.PINK]: {
    bgClass: 'bg-pink-50',
    bgColor: 'bg-pink-600',
    textClass: 'text-pink-600',
    shadowClass: 'shadow-pink-600/30',
    gradientClass: 'from-pink-600 to-pink-300'
  },
  [Color.ORANGE]: {
    bgClass: 'bg-orange-50',
    bgColor: 'bg-orange-600',
    textClass: 'text-orange-600',
    shadowClass: 'shadow-orange-600/30',
    gradientClass: 'from-orange-600 to-orange-300'
  }
};

export default function ColorPage() {
  const { color } = useParams<{ color: string }>();
  const {
    data: firebaseAssignments,
    isLoading,
    error,
  } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const normalizedColor = color ? color.charAt(0).toUpperCase() + color.slice(1).toLowerCase() : '';
  const isValidColor = normalizedColor && Object.values(Color).includes(normalizedColor as Color);

  const playerAssignment = useMemo(() => {
    if (!isValidColor) return null;
    return firebaseAssignments?.find(a => a.color === normalizedColor);
  }, [firebaseAssignments, isValidColor, normalizedColor]);

  if (!isValidColor) {
    return <Navigate to="/ad24r7" replace />;
  }

  const config = colorConfig[normalizedColor as Color];

  if (isLoading) {
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

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.gradientClass} px-4`}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
          <div className={`${config.bgColor} px-8 py-6 text-center`}>
            <div className="w-20 h-20 rounded-full bg-white/30 border-4 border-white mx-auto mb-4 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white" />
            </div>
            <h1 className="text-white font-bold text-4xl tracking-wider uppercase">
              {normalizedColor}
            </h1>
          </div>

          <div className={`${config.bgClass} px-8 py-12`}>
            {playerAssignment ? (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <UserCircle className={`w-24 h-24 ${config.textClass} mx-auto`} strokeWidth={1.5} />
                  <div className="bg-white rounded-2xl shadow-lg px-8 py-6 border-2 border-gray-100">
                    <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
                      Player
                    </p>
                    <p className={`${config.textClass} text-5xl font-bold tracking-wide`}>
                      {PLAYER_NAMES[playerAssignment.player]}
                    </p>
                  </div>
                </div>

                {(() => {
                  const RoleComponent = getRoleComponent(playerAssignment.role);
                  return <RoleComponent />;
                })()}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
                </div>
                <div className="bg-white rounded-2xl shadow-lg px-8 py-6 border-2 border-gray-100">
                  <p className="text-gray-400 text-2xl font-semibold italic">
                    No player assigned
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
