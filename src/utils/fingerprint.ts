export interface BrowserFingerprint {
  userAgent: string
  language: string
  languages: readonly string[]
  platform: string
  screenResolution: string
  screenColorDepth: number
  timezone: string
  timezoneOffset: number
  cookieEnabled: boolean
  doNotTrack: string | null
  hardwareConcurrency: number
  deviceMemory?: number
  maxTouchPoints: number
  vendor: string
  rendererInfo?: {
    vendor: string
    renderer: string
  }
  plugins: string[]
}

export function getBrowserFingerprint(): BrowserFingerprint {
  const nav = navigator as Navigator & {
    deviceMemory?: number
    hardwareConcurrency: number
    maxTouchPoints: number
  }

  const fingerprint: BrowserFingerprint = {
    userAgent: nav.userAgent,
    language: nav.language,
    languages: nav.languages || [nav.language],
    platform: nav.platform,
    screenResolution: `${screen.width}x${screen.height}`,
    screenColorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    cookieEnabled: nav.cookieEnabled,
    doNotTrack: nav.doNotTrack || null,
    hardwareConcurrency: nav.hardwareConcurrency || 0,
    deviceMemory: nav.deviceMemory,
    maxTouchPoints: nav.maxTouchPoints || 0,
    vendor: nav.vendor,
    plugins: getPluginsList(),
  }

  const rendererInfo = getWebGLRendererInfo()
  if (rendererInfo) {
    fingerprint.rendererInfo = rendererInfo
  }

  return fingerprint
}

function getPluginsList(): string[] {
  if (!navigator.plugins) return []

  return Array.from(navigator.plugins).map(plugin => plugin.name)
}

function getWebGLRendererInfo(): { vendor: string; renderer: string } | null {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

    if (!gl) return null

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return null

    return {
      vendor: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
      renderer: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
    }
  } catch {
    return null
  }
}

export function generateFingerprintHash(fingerprint: BrowserFingerprint): string {
  const fingerprintString = JSON.stringify(fingerprint)
  return simpleHash(fingerprintString)
}

function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}
