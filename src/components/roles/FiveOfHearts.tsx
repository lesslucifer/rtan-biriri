import Card from '../Card';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function FiveOfHearts() {
  const card = getRoleCard(GAME_ROLES._5H);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-red-100">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <Card card={card} scale={0.8} />
          </div>
          <h2 className="text-3xl font-bold text-red-600 mb-2">5 of Hearts ♥</h2>
          <p className="text-lg font-semibold text-gray-700">The Healer</p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-red-600 mb-2">Role:</h3>
            <p>You are a benevolent healer who can save lives during the night phase.</p>
          </div>

          <div>
            <h3 className="font-bold text-red-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, choose one player to protect</li>
              <li>Your protection prevents elimination for that night</li>
              <li>You cannot protect yourself consecutively</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-red-600 mb-2">Objective:</h3>
            <p>Help the village identify and eliminate threats while keeping players alive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
