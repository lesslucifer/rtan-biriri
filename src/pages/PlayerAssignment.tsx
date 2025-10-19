import { useMemo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, UserCircle, Loader2 } from 'lucide-react';
import { useFirebase } from '../hooks/useFirebase';
import { Player, Color, PLAYER_NAMES } from '../types/playerAssignment';
import type { PlayerAssignment } from '../types/playerAssignment';

const colorConfig = [
  {
    color: Color.RED,
    bgClass: 'bg-red-50',
    bgColor: 'bg-red-600',
    textClass: 'text-red-600',
    borderClass: 'border-red-200',
    shadowClass: 'shadow-red-600/20',
    hoverClass: 'hover:bg-red-600 hover:shadow-red-600/25'
  },
  {
    color: Color.GREEN,
    bgClass: 'bg-green-50',
    bgColor: 'bg-green-600',
    textClass: 'text-green-600',
    borderClass: 'border-green-200',
    shadowClass: 'shadow-green-600/20',
    hoverClass: 'hover:bg-green-600 hover:shadow-green-600/25'
  },
  {
    color: Color.BLUE,
    bgClass: 'bg-blue-50',
    bgColor: 'bg-blue-600',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    shadowClass: 'shadow-blue-600/20',
    hoverClass: 'hover:bg-blue-600 hover:shadow-blue-600/25'
  },
  {
    color: Color.PINK,
    bgClass: 'bg-pink-50',
    bgColor: 'bg-pink-600',
    textClass: 'text-pink-600',
    borderClass: 'border-pink-200',
    shadowClass: 'shadow-pink-600/20',
    hoverClass: 'hover:bg-pink-600 hover:shadow-pink-600/25'
  },
  {
    color: Color.ORANGE,
    bgClass: 'bg-orange-50',
    bgColor: 'bg-orange-600',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-200',
    shadowClass: 'shadow-orange-600/20',
    hoverClass: 'hover:bg-orange-600 hover:shadow-orange-600/25'
  },
  {
    color: Color.BLACK,
    bgClass: 'bg-gray-50',
    bgColor: 'bg-gray-800',
    textClass: 'text-gray-800',
    borderClass: 'border-gray-200',
    shadowClass: 'shadow-gray-800/20',
    hoverClass: 'hover:bg-gray-800 hover:shadow-gray-800/25'
  }
];

const players = [
  Player.TR,
  Player.TH,
  Player.GI,
  Player.TY,
  Player.NA,
  Player.L
];

export default function PlayerAssignment() {
  const {
    data: firebaseAssignments,
    create,
    update,
    delete: deleteAssignment,
    isLoading,
    error,
  } = useFirebase<PlayerAssignment>({
    collectionName: 'playerAssignments'
  });

  const assignments = useMemo(() => {
    return (firebaseAssignments ?? [])?.reduce((playerAssignments, assign) => {
      playerAssignments[assign.player] = assign.color
      return playerAssignments
    }, {} as Record<Player, Color | null>)
  }, [firebaseAssignments]);

  const handleColorSelect = async (player: Player, color: Color) => {
    const existingAssignment = firebaseAssignments?.find(a => a.player === player);

    if (existingAssignment) {
      await update(existingAssignment.id!, { ...existingAssignment, color });
    } else {
      await create({
        color,
        player,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    const availableColors = getAvailableColors().filter(c => c !== color);
    const unassignedPlayers = players.filter(p => p !== player && !assignments[p]);

    if (availableColors.length === 1 && unassignedPlayers.length === 1) {
      const lastColor = availableColors[0];
      const lastPlayer = unassignedPlayers[0];

      await create({
        color: lastColor,
        player: lastPlayer,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  };

  const handleColorRemove = async (player: Player) => {
    const existingAssignment = firebaseAssignments?.find(a => a.player === player);
    if (existingAssignment) {
      await deleteAssignment(existingAssignment.id!);
    }
  };

  const getAssignedColors = () => {
    return Object.values(assignments).filter(color => color !== null);
  };

  const getAvailableColors = () => {
    const assignedColors = getAssignedColors();
    return colorConfig.map(c => c.color).filter(color => !assignedColors.includes(color));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-md py-12 px-4">
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-md py-12 px-4">
        <Alert variant="destructive">
          <AlertDescription>
            Error loading assignments: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4">
        {players.map((player) => {
          const assignedColor = assignments[player];
          const colorInfo = assignedColor ? colorConfig.find(c => c.color === assignedColor) : null;

          return (
            <div
              key={player}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ease-in-out"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-300 px-[18px] py-[10px] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <UserCircle size={18} strokeWidth={2.5} className="text-white" />
                  <span className="text-white font-bold text-[0.8rem] uppercase tracking-[1.2px]">
                    {PLAYER_NAMES[player]}
                  </span>
                </div>
                {assignedColor && (
                  <button
                    onClick={() => handleColorRemove(player)}
                    aria-label="Remove assignment"
                    className="text-white bg-white/20 rounded-full p-1 hover:bg-white/30 transition-colors"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              <div className={`${colorInfo?.bgClass || 'bg-gray-50'} min-h-[80px] p-4 flex items-center justify-center`}>
                {assignedColor ? (
                  <div className={`${colorInfo?.bgColor} text-white px-7 py-3.5 rounded-xl inline-flex items-center gap-2.5 shadow-lg ${colorInfo?.shadowClass} border-2 border-white`}>
                    <div className="w-5 h-5 rounded-full bg-white/30 border-2 border-white" />
                    <span className="font-bold text-lg tracking-wide">
                      {assignedColor}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {getAvailableColors().length > 0 ? (
                      getAvailableColors().map((color) => {
                        const config = colorConfig.find(c => c.color === color)!;
                        return (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(player, color)}
                            className={`bg-white ${config.textClass} font-semibold text-[0.85rem] px-[18px] py-2 rounded-lg border-2 ${config.borderClass} transition-all duration-200 ease-in-out hover:text-white hover:-translate-y-0.5 shadow-md ${config.hoverClass}`}
                          >
                            {color}
                          </button>
                        );
                      })
                    ) : (
                      <span className="text-sm text-gray-500 italic">
                        All colors assigned
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="mt-4 mb-12 text-center">
          <p className="text-xs text-white/70">
            Tap a color to assign it to the player
          </p>
        </div>
      </div>
    </div>
  );
}