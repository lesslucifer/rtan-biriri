import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { REFERRAL_CODE_KEY } from '@/utils/constants'

export default function BlindSantaPageRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    const lastChar = pathname.charAt(pathname.length - 1)

    if (lastChar && lastChar !== '/') {
      localStorage.setItem(REFERRAL_CODE_KEY, lastChar)
    }

    navigate('/blind-santa', { replace: true })
  }, [navigate, location])

  return null
}
