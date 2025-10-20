import Card from '../Card';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function SixOfSpades() {
  const card = getRoleCard(GAME_ROLES._6S);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-gray-800 w-full max-w-2xl">
        <div className="text-center mb-6">
          <p className="text-md font-semibold text-gray-700">Game</p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Witch Hunt</h2>
          <p className="text-lg font-semibold text-gray-700">Difficulty</p>
            <div className="flex justify-center">
              <Card card={card} scale={0.6} />
            </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Role:</h3>
            <p>A deadly operative who eliminates targets under the cover of darkness.</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, choose one player to eliminate</li>
              <li>Strike silently and leave no trace</li>
              <li>Work to reduce opposition numbers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Objective:</h3>
            <p className="text-red-600 font-semibold">Eliminate all opposing players to secure victory.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">Role:</h3>
            <p>A deadly operative who eliminates targets under the cover of darkness.</p>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, choose one player to eliminate</li>
              <li>Strike silently and leave no trace</li>
              <li>Work to reduce opposition numbers</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-2">Objective:</h3>
            <p className="text-red-600 font-semibold">Eliminate all opposing players to secure victory.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
