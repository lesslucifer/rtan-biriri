import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Loader2 } from 'lucide-react';

export default function AdminPanel() {
  const { state, update, isLoading } = useGameState();
  const [updating, setUpdating] = useState<'5h' | '100h' | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!state || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-2">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  const handleComplete5H = async () => {
    if (!confirm('Are you sure you want to complete 5 of Hearts?')) {
      return;
    }
    setUpdating('5h');
    setSuccessMessage(null);
    try {
      await update({ _5hStatus: 'COMPLETED' });
      setSuccessMessage('5 of Hearts completed successfully!');
    } catch (error) {
      console.error('Error completing 5H:', error);
    } finally {
      setUpdating(null);
    }
  };

  const handleComplete100H = async () => {
    if (!confirm('Are you sure you want to complete 100 Hearts?')) {
      return;
    }
    setUpdating('100h');
    setSuccessMessage(null);
    try {
      await update({ _100hStatus: 'COMPLETED' });
      setSuccessMessage('100 Hearts completed successfully!');
    } catch (error) {
      console.error('Error completing 100H:', error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="bg-white rounded-2xl shadow-lg px-6 py-8 border-2 border-purple-100 w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-purple-600 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage game completion status</p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-800">5 of Hearts</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                state._5hStatus === 'COMPLETED'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {state._5hStatus}
              </span>
            </div>
            <button
              onClick={handleComplete5H}
              disabled={updating !== null || state._5hStatus === 'COMPLETED'}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                state._5hStatus === 'COMPLETED'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:opacity-50'
              }`}
            >
              {updating === '5h' ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Completing...
                </span>
              ) : state._5hStatus === 'COMPLETED' ? (
                'Already Completed'
              ) : (
                'Complete 5 of Hearts'
              )}
            </button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-800">100 Hearts</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                state._100hStatus === 'COMPLETED'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {state._100hStatus}
              </span>
            </div>
            <button
              onClick={handleComplete100H}
              disabled={updating !== null || state._100hStatus === 'COMPLETED'}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                state._100hStatus === 'COMPLETED'
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 disabled:opacity-50'
              }`}
            >
              {updating === '100h' ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Completing...
                </span>
              ) : state._100hStatus === 'COMPLETED' ? (
                'Already Completed'
              ) : (
                'Complete 100 Hearts'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
