import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useFirebase } from '@/hooks/useFirebase'
import { getOrCreateSessionId, getStoredSubmission, saveSubmission } from '@/utils/session'
import { getBrowserFingerprint, type BrowserFingerprint } from '@/utils/fingerprint'
import { REFERRAL_CODE_KEY } from '@/utils/constants'

interface WishlistEntry {
  id?: string
  sessionId: string
  name: string
  wishlist: string
  fingerprint: BrowserFingerprint
  createdAt: number
  submittedAt: number
  referralCode?: string
  target?: string
}

export default function BlindSantaPage() {
  const [name, setName] = useState('')
  const [wishlist, setWishlist] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [fingerprint, setFingerprint] = useState<BrowserFingerprint | null>(null)
  const [isCheckingExisting, setIsCheckingExisting] = useState(true)
  const [targetUser, setTargetUser] = useState<WishlistEntry | null>(null)

  const { createWithId, data, isLoading } = useFirebase<WishlistEntry>({
    collectionName: 'blind-santa-wishlists'
  })

  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)

    const fp = getBrowserFingerprint()
    setFingerprint(fp)

    const storedSubmission = getStoredSubmission()
    if (storedSubmission) {
      setName(storedSubmission.name)
      setWishlist(storedSubmission.wishlist)
      setSubmitted(true)
      setIsCheckingExisting(false)
    }
  }, [])

  useEffect(() => {
    if (sessionId && !isLoading && !submitted) {
      const existingEntry = data.find(entry => entry.id === sessionId)
      if (existingEntry) {
        setName(existingEntry.name)
        setWishlist(existingEntry.wishlist)
        setSubmitted(true)
        saveSubmission(existingEntry.name, existingEntry.wishlist)
      }
      setIsCheckingExisting(false)
    } else if (sessionId && !isLoading && submitted) {
      setIsCheckingExisting(false)
    }
  }, [sessionId, data, isLoading, submitted])

  useEffect(() => {
    if (submitted && sessionId && !isLoading && data.length > 0) {
      const currentUser = data.find(entry => entry.id === sessionId)
      if (currentUser?.target) {
        const target = data.find(entry => entry.id === currentUser.target)
        setTargetUser(target || null)
      }
    }
  }, [submitted, sessionId, data, isLoading])

  const handleSubmit = async () => {
    if (name.trim() && wishlist.trim() && sessionId && fingerprint) {
      setIsSubmitting(true)
      try {
        const trimmedName = name.trim()
        const trimmedWishlist = wishlist.trim()
        const referralCode = localStorage.getItem(REFERRAL_CODE_KEY) || undefined

        await createWithId(sessionId, {
          sessionId,
          name: trimmedName,
          wishlist: trimmedWishlist,
          fingerprint,
          createdAt: Date.now(),
          submittedAt: Date.now(),
          ...(referralCode && { referralCode })
        })

        saveSubmission(trimmedName, trimmedWishlist)
        setSubmitted(true)
      } catch (error) {
        console.error('Failed to submit wishlist:', error)
        alert('Failed to submit wishlist. Please try again.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#f5f3ed]">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🎅</span>
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="text-[#c17a4a]">Blind</span>{' '}
              <span className="text-[#5a9f5a]">Santa</span>
            </h1>
            <span className="text-5xl">🎄</span>
          </div>
          <p className="text-xl text-gray-600">
            Share your Christmas wishes!
          </p>
        </div>

        {isCheckingExisting ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border-4 border-blue-200 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <p className="text-xl text-gray-700">
              Checking for your wish...
            </p>
          </div>
        ) : !submitted ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border-4 border-pink-200">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  Your Name 🎁
                </h2>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border-2 border-pink-200 focus-visible:ring-pink-300 h-14 text-lg rounded-xl"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  Your Wishlist ✨
                </h2>
                <Textarea
                  value={wishlist}
                  onChange={(e) => setWishlist(e.target.value)}
                  placeholder="What would you like for Christmas?"
                  rows={8}
                  className="border-2 border-green-300 focus-visible:ring-green-400 text-lg rounded-xl resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={!name.trim() || !wishlist.trim() || isSubmitting}
                className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-pink-300 via-yellow-200 to-green-300 hover:from-pink-400 hover:via-yellow-300 hover:to-green-400 text-gray-700 font-semibold shadow-md"
              >
                {isSubmitting ? 'Sending...' : 'Send to Santa 🎅'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 border-4 border-green-200 text-center">
            <div className="text-6xl mb-4">🎄</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Wish Received!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Thank you, <span className="font-semibold">{name}</span>!<br />
              Santa has received your wishlist. 🎁
            </p>

            {targetUser ? (
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-3 font-semibold">
                  🎅 Your Secret Santa Assignment:
                </p>
                <p className="text-lg font-bold text-purple-700 mb-4">
                  {targetUser.name}
                </p>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Their Wishlist:</p>
                  <p className="text-gray-800 whitespace-pre-wrap text-left">{targetUser.wishlist}</p>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                <p className="text-lg text-gray-700">
                  ⏳ Awaiting your Secret Santa assignment...<br />
                  <span className="text-sm text-gray-600">Check back soon!</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
