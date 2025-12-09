const SESSION_KEY = 'blind-santa-session-id'
const SUBMISSION_KEY = 'blind-santa-submission'

export interface StoredSubmission {
  name: string
  wishlist: string
  submittedAt: number
}

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY)

  if (!sessionId) {
    sessionId = generateSessionId()
    localStorage.setItem(SESSION_KEY, sessionId)
  }

  return sessionId
}

function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).substring(2, 15)
  const randomPart2 = Math.random().toString(36).substring(2, 15)

  return `${timestamp}-${randomPart}-${randomPart2}`
}

export function getSessionId(): string | null {
  return localStorage.getItem(SESSION_KEY)
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SUBMISSION_KEY)
}

export function saveSubmission(name: string, wishlist: string): void {
  const submission: StoredSubmission = {
    name,
    wishlist,
    submittedAt: Date.now()
  }
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(submission))
}

export function getStoredSubmission(): StoredSubmission | null {
  const stored = localStorage.getItem(SUBMISSION_KEY)
  if (!stored) return null

  try {
    return JSON.parse(stored) as StoredSubmission
  } catch {
    return null
  }
}

export function clearSubmission(): void {
  localStorage.removeItem(SUBMISSION_KEY)
}
