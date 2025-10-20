import GameHeader from '../GameHeader';
import { getRoleCard } from '../../utils/roleCardMapping';
import { GAME_ROLES } from '../../types/playerAssignment';

export default function FiveOfClubs() {
  const card = getRoleCard(GAME_ROLES._5C);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-green-100 w-full max-w-2xl">
        <GameHeader
          gameName="Witch Hunt"
          gameColor="green"
          difficultyCard={card}
        />

        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-green-600 mb-2">Role:</h3>
            <p>A stalwart defender who watches over the village with unwavering vigilance.</p>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Abilities:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Each night, guard one player from harm</li>
              <li>Your presence deters malicious actions</li>
              <li>Can protect the same player multiple times</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-green-600 mb-2">Objective:</h3>
            <p>Protect key players and ensure the safety of the innocent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
