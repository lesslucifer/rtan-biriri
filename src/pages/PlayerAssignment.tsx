import { useMemo } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X, UserCircle, Loader2 } from 'lucide-react';
import { useFirebase } from '../hooks/useFirebase';
import { useGameState } from '../hooks/useGameState';
import { Player, Color, PLAYER_NAMES, GAME_ROLES } from '../types/playerAssignment';
import type { PlayerAssignment, GameRole } from '../types/playerAssignment';
import redDoll from '../assets/dolls/red.jpg';
import greenDoll from '../assets/dolls/green.jpg';
import blueDoll from '../assets/dolls/blue.jpg';
import pinkDoll from '../assets/dolls/pink.jpg';
import orangeDoll from '../assets/dolls/orange.jpg';

const colorConfig = [
  {
    color: Color.RED,
    bgClass: 'bg-red-50',
    bgColor: 'bg-red-600',
    headerColor: 'bg-red-400',
    textClass: 'text-red-400',
    borderClass: 'border-red-200',
    shadowClass: 'shadow-red-600/20',
    hoverClass: 'hover:bg-red-600 hover:shadow-red-600/25',
    image: redDoll
  },
  {
    color: Color.GREEN,
    bgClass: 'bg-green-50',
    bgColor: 'bg-green-600',
    headerColor: 'bg-green-500',
    textClass: 'text-green-600',
    borderClass: 'border-green-200',
    shadowClass: 'shadow-green-600/20',
    hoverClass: 'hover:bg-green-600 hover:shadow-green-600/25',
    image: greenDoll
  },
  {
    color: Color.BLUE,
    bgClass: 'bg-blue-50',
    bgColor: 'bg-blue-600',
    headerColor: 'bg-blue-500',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    shadowClass: 'shadow-blue-600/20',
    hoverClass: 'hover:bg-blue-600 hover:shadow-blue-600/25',
    image: blueDoll
  },
  {
    color: Color.PINK,
    bgClass: 'bg-pink-50',
    bgColor: 'bg-pink-600',
    headerColor: 'bg-pink-400',
    textClass: 'text-pink-600',
    borderClass: 'border-pink-200',
    shadowClass: 'shadow-pink-600/20',
    hoverClass: 'hover:bg-pink-600 hover:shadow-pink-600/25',
    image: pinkDoll
  },
  {
    color: Color.ORANGE,
    bgClass: 'bg-orange-50',
    bgColor: 'bg-orange-600',
    headerColor: 'bg-orange-400',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-200',
    shadowClass: 'shadow-orange-600/20',
    hoverClass: 'hover:bg-orange-600 hover:shadow-orange-600/25',
    image: orangeDoll
  }
];

const players = [
  Player.TH,
  Player.GI,
  Player.TY,
  Player.NA,
  Player.L
];

const ROLE_FALLBACK: Record<Player, GameRole[]> = {
  [Player.L]: [GAME_ROLES._4C],
  [Player.GI]: [GAME_ROLES._5H, GAME_ROLES._6S, GAME_ROLES._5C, GAME_ROLES._9D],
  [Player.TH]: [GAME_ROLES._5H, GAME_ROLES._9D, GAME_ROLES._6S, GAME_ROLES._5C],
  [Player.TY]: [GAME_ROLES._5H, GAME_ROLES._5C, GAME_ROLES._9D, GAME_ROLES._6S],
  [Player.NA]: [GAME_ROLES._5H, GAME_ROLES._5C, GAME_ROLES._9D, GAME_ROLES._6S]
};

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

  const { state: gameState, init: initGame } = useGameState();

  const assignments = useMemo(() => {
    return (firebaseAssignments ?? [])?.reduce((playerAssignments, assign) => {
      playerAssignments[assign.player] = assign.color
      return playerAssignments
    }, {} as Record<Player, Color | null>)
  }, [firebaseAssignments]);

  const getAssignedRoles = () => {
    return (firebaseAssignments ?? []).map(a => a.role);
  };

  const determineRole = (player: Player, color: Color): GameRole => {
    const assignedRoles = getAssignedRoles();
    const fallbackList = ROLE_FALLBACK[player];
    return fallbackList.find(role => !assignedRoles.includes(role) && (role !== GAME_ROLES._5H || color === Color.BLUE)) ?? fallbackList[0]
  };

  const handleColorSelect = async (player: Player, color: Color) => {
    const existingAssignment = firebaseAssignments?.find(a => a.player === player);
    const role = determineRole(player, color);

    if (existingAssignment) {
      await update(existingAssignment.id!, { ...existingAssignment, color, role });
    } else {
      await create({
        color,
        player,
        role
      });
    }

    const availableColors = getAvailableColors().filter(c => c !== color);
    const unassignedPlayers = players.filter(p => p !== player && !assignments[p]);

    if (availableColors.length === 1 && unassignedPlayers.length === 1) {
      const lastColor = availableColors[0];
      const lastPlayer = unassignedPlayers[0];
      const lastRole = determineRole(lastPlayer, lastColor);

      await create({
        color: lastColor,
        player: lastPlayer,
        role: lastRole
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-4">
        {players.map((player) => {
          const assignedColor = assignments[player];
          const colorInfo = assignedColor ? colorConfig.find(c => c.color === assignedColor) : null;

          return (
            <div
              key={player}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 ease-in-out"
            >
              <div className={`${colorInfo ? `${colorInfo.headerColor} bg-gradient-to-br from-current to-current/50` : 'bg-gradient-to-br from-purple-600 to-purple-300'} px-[18px] py-[10px] flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                  <UserCircle size={18} strokeWidth={2.5} className="text-white" />
                  <span className="text-white font-bold text-[0.8rem] uppercase tracking-[1.2px]">
                    {PLAYER_NAMES[player]}
                  </span>
                </div>
              </div>

              <div className={`${colorInfo?.bgClass || 'bg-gray-50'} min-h-[80px] p-4 flex items-center justify-center`}>
                {assignedColor ? (
                  <div className="relative">
                    <div className={`bg-white ${colorInfo?.textClass} font-semibold text-sm px-3 py-2 rounded-lg border-2 ${colorInfo?.borderClass} shadow-md flex flex-col items-center gap-2 min-w-[100px]`}>
                      <img src={colorInfo?.image} alt={assignedColor} className="w-16 h-16 object-cover rounded-md" />
                      <span>{assignedColor}</span>
                    </div>
                    <button
                      onClick={() => handleColorRemove(player)}
                      aria-label="Remove assignment"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                    >
                      <X size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {getAvailableColors().length > 0 ? (
                      getAvailableColors().map((color) => {
                        const config = colorConfig.find(c => c.color === color)!;
                        return (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(player, color)}
                            className={`bg-white ${config.textClass} font-semibold text-sm px-3 py-2 rounded-lg border-2 ${config.borderClass} transition-all duration-200 ease-in-out hover:text-white hover:-translate-y-0.5 shadow-md ${config.hoverClass} flex flex-col items-center gap-2 min-w-[100px]`}
                          >
                            <img src={config.image} alt={color} className="w-16 h-16 object-cover rounded-md" />
                            <span>{color}</span>
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

        {!gameState?.id && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={initGame}
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-500 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}