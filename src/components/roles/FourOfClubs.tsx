import Card from '../Card';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function FourOfClubs() {
  const card = getRoleCard(GAME_ROLES._4C);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100">
        <div className="text-center mb-4">
          <div className="flex justify-center mb-4">
            <Card card={card} scale={0.8} />
          </div>
          <h2 className="text-3xl font-bold text-purple-600 mb-2">4 of Clubs ♣</h2>
          <p className="text-lg font-semibold text-gray-700">The Spy</p>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-purple-600 mb-2">Role:</h3>
            <p>A cunning infiltrator who operates in the shadows, gathering intelligence.</p>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, track one player's movements</li>
              <li>Discover who they visited or targeted</li>
              <li>Share intel to help identify threats</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-purple-600 mb-2">Objective:</h3>
            <p>Gather evidence through surveillance and expose the hidden enemies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
