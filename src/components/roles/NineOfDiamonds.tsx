import GameHeader from '../GameHeader';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function NineOfDiamonds() {
  const card = getRoleCard(GAME_ROLES._9D);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-yellow-100 w-full max-w-2xl">
        <GameHeader
          gameName="Witch Hunt"
          gameColor="yellow"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-yellow-600 mb-2">Role:</h3>
            <p>You possess the mystical ability to see into the true nature of others.</p>
          </div>

          <div>
            <h3 className="font-bold text-yellow-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, investigate one player's role</li>
              <li>Learn if they are friend or foe</li>
              <li>Use your knowledge to guide the village</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-yellow-600 mb-2">Objective:</h3>
            <p>Uncover the truth and lead the village to victory through your visions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
