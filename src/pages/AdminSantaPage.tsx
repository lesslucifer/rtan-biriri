import { useState, useEffect } from 'react'
import { useFirebase } from '@/hooks/useFirebase'
import type { BrowserFingerprint } from '@/utils/fingerprint'

interface WishlistEntry {
  id?: string
  sessionId: string
  name: string
  wishlist: string
  fingerprint: BrowserFingerprint
  createdAt: number
  submittedAt: number
  target?: string
  referralCode?: string
}

export default function AdminSantaPage() {
  const { data: players, isLoading, update } = useFirebase<WishlistEntry>({
    collectionName: 'blind-santa-wishlists'
  })

  const [assignments, setAssignments] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const initialAssignments: Record<string, string> = {}
    players.forEach(player => {
      if (player.id && player.target) {
        initialAssignments[player.id] = player.target
      }
    })
    setAssignments(initialAssignments)
  }, [players])

  const handleAssignmentChange = async (playerId: string, targetId: string) => {
    setAssignments(prev => ({
      ...prev,
      [playerId]: targetId
    }))

    setIsSaving(prev => ({ ...prev, [playerId]: true }))
    try {
      await update(playerId, { target: targetId })
    } catch (error) {
      console.error('Failed to update assignment:', error)
      alert('Failed to save assignment. Please try again.')
    } finally {
      setIsSaving(prev => ({ ...prev, [playerId]: false }))
    }
  }

  const formatFingerprint = (fp: BrowserFingerprint) => {
    return `${fp.platform} | ${fp.userAgent.slice(0, 30)}... | Screen: ${fp.screenResolution}`
  }

  const getFullFingerprint = (fp: BrowserFingerprint) => {
    return JSON.stringify(fp, null, 2)
  }

  const handleCopyFingerprint = async (playerId: string, fp: BrowserFingerprint) => {
    try {
      await navigator.clipboard.writeText(getFullFingerprint(fp))
      setCopiedId(playerId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy fingerprint:', error)
      alert('Failed to copy to clipboard')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f5f3ed]">
        <div className="text-center">
          <div className="text-6xl mb-4">🎅</div>
          <p className="text-xl text-gray-700">Loading players...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full p-4 bg-[#f5f3ed]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🎅</span>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-[#c17a4a]">Blind Santa</span>{' '}
              <span className="text-[#5a9f5a]">Admin</span>
            </h1>
            <span className="text-4xl">🎄</span>
          </div>
          <p className="text-lg text-gray-600">
            Assign Secret Santas to each player
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total Players: {players.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-4 border-red-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-red-100 to-green-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Wishlist</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fingerprint</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Referral</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Assigned To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {players.map((player, index) => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{player.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700 max-w-md truncate" title={player.wishlist}>
                        {player.wishlist}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-600 font-mono max-w-xs truncate" title={formatFingerprint(player.fingerprint)}>
                          {formatFingerprint(player.fingerprint)}
                        </div>
                        <button
                          onClick={() => player.id && handleCopyFingerprint(player.id, player.fingerprint)}
                          className="flex-shrink-0 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
                          title="Copy full fingerprint"
                        >
                          {copiedId === player.id ? '✓' : '📋'}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-700">
                        {player.referralCode ? (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md font-mono text-xs">
                            {player.referralCode}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <select
                          value={assignments[player.id || ''] || ''}
                          onChange={(e) => player.id && handleAssignmentChange(player.id, e.target.value)}
                          disabled={isSaving[player.id || '']}
                          className="flex-1 px-3 py-2 text-sm border-2 border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="">Select player...</option>
                          {players
                            .filter(p => p.id !== player.id)
                            .map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name}
                              </option>
                            ))
                          }
                        </select>
                        {isSaving[player.id || ''] && (
                          <span className="text-xs text-gray-500">Saving...</span>
                        )}
                        {!isSaving[player.id || ''] && assignments[player.id || ''] && (
                          <span className="text-green-600 text-xl">✓</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {players.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎁</div>
              <p className="text-gray-600">No players yet. Waiting for wishlists...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
