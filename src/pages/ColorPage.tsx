import { useParams, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useFirebase } from '../hooks/useFirebase';
import { Color } from '../types/playerAssignment';
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

  if (isLoading || !playerAssignment) {
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
    <div className={`min-h-screen flex justify-center bg-gradient-to-br ${config.gradientClass} px-4 py-4`}>
      <div className="w-full h-full mt-8">
        {(() => {
          const RoleComponent = getRoleComponent(playerAssignment.role);
          return <RoleComponent />;
        })()}
      </div>
    </div>
  );
}
