import Card from '../Card';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function NineOfDiamonds() {
  const card = getRoleCard(GAME_ROLES._9D);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-yellow-100 w-full max-w-2xl">
        <div className="text-center mb-6">
          <p className="text-md font-semibold text-gray-700">Trò chơi</p>
          <h2 className="text-3xl font-bold text-yellow-600 mb-2">Săn phù thủy</h2>
          <p className="text-lg font-semibold text-gray-700">Độ khó</p>
            <div className="flex justify-center">
              <Card card={card} scale={0.6} />
            </div>
        </div>

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
