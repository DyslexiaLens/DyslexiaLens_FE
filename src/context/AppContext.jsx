import React, { createContext, useEffect, useMemo, useState } from 'react'
import { getMe } from '../services/authService'

export const AppContext = createContext(null)

const defaultAccessibilitySettings = {
  highContrast: false,
  dyslexiaFont: false,
  textSize: 100,
  reduceMotion: false,
}

function loadAccessibilitySettings() {
  if (typeof window === 'undefined') {
    return defaultAccessibilitySettings
  }

  try {
    const stored = window.localStorage.getItem('dyslexialens-accessibility')

    if (!stored) {
      return defaultAccessibilitySettings
    }

    const parsed = JSON.parse(stored)

    return {
      highContrast: Boolean(parsed?.highContrast),
      dyslexiaFont: Boolean(parsed?.dyslexiaFont),
      textSize: Number(parsed?.textSize) || defaultAccessibilitySettings.textSize,
      reduceMotion: Boolean(parsed?.reduceMotion),
    }
  } catch {
    return defaultAccessibilitySettings
  }
}

function loadStoredUser() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawUser = window.localStorage.getItem('user') || window.localStorage.getItem('dyslexialens-user')
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

function normalizeUser(user) {
  if (!user) {
    return null
  }

  const fullName = user.fullName || user.full_name || user.name || ''

  return {
    ...user,
    fullName,
    name: user.name || fullName,
    email: user.email || '',
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const storedTheme = window.localStorage.getItem('dyslexialens-theme')
    if (storedTheme) {
      return storedTheme
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return Boolean(
      window.localStorage.getItem('accessToken') ||
      window.sessionStorage.getItem('accessToken')
    )
  })

  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }
    return normalizeUser(loadStoredUser())
  })

  const [authReady, setAuthReady] = useState(false)
  const [accessibility, setAccessibility] = useState(loadAccessibilitySettings)

  const clearSession = () => {
    window.localStorage.removeItem('accessToken')
    window.sessionStorage.removeItem('accessToken')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('dyslexialens-user')
    window.localStorage.setItem('dyslexialens-logged-in', 'false')
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    let cancelled = false

    const hydrateUser = async () => {
      const token =
        window.localStorage.getItem('accessToken') ||
        window.sessionStorage.getItem('accessToken')

      if (!token) {
        if (!cancelled) {
          setIsLoggedIn(false)
          setUser(null)
          setAuthReady(true)
        }
        return
      }

      const cachedUser = normalizeUser(loadStoredUser())
      if (cachedUser && !cancelled) {
        setUser(cachedUser)
        setIsLoggedIn(true)
      }

      try {
        const res = await getMe()
        const profile = normalizeUser(res.data)

        if (!cancelled && profile) {
          setUser(profile)
          setIsLoggedIn(true)
          window.localStorage.setItem('user', JSON.stringify(profile))
          window.localStorage.setItem('dyslexialens-user', JSON.stringify(profile))
          window.localStorage.setItem('dyslexialens-logged-in', 'true')
        }
      } catch {
        if (!cancelled) {
          clearSession()
          setIsLoggedIn(false)
          setUser(null)
        }
      } finally {
        if (!cancelled) {
          setAuthReady(true)
        }
      }
    }

    hydrateUser()

    return () => {
      cancelled = true
    }
  }, [])

  const login = ({ accessToken, user: userData, remember = true, ...legacyUserData } = {}) => {
    setIsLoggedIn(true)
    if (accessToken) {
      const storage = remember ? window.localStorage : window.sessionStorage
      storage.setItem('accessToken', accessToken)
    }

    const normalizedUser = normalizeUser(userData || legacyUserData)
    setUser(normalizedUser)
    window.localStorage.setItem('dyslexialens-logged-in', 'true')
    window.localStorage.setItem('dyslexialens-user', JSON.stringify(normalizedUser))
    window.localStorage.setItem('user', JSON.stringify(normalizedUser))
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    window.localStorage.removeItem('accessToken')
    window.sessionStorage.removeItem('accessToken')
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('dyslexialens-user')
    window.localStorage.setItem('dyslexialens-logged-in', 'false')
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('dyslexialens-theme', theme)
  }, [theme])

  useEffect(() => {
    const clampedTextSize = Math.min(120, Math.max(80, accessibility.textSize || 100))

    document.documentElement.dataset.accessibilityContrast = accessibility.highContrast ? 'high' : 'normal'
    document.documentElement.dataset.accessibilityFont = accessibility.dyslexiaFont ? 'dyslexia' : 'default'
    document.documentElement.dataset.reduceMotion = accessibility.reduceMotion ? 'true' : 'false'
    document.documentElement.style.fontSize = `${clampedTextSize}%`

    window.localStorage.setItem(
      'dyslexialens-accessibility',
      JSON.stringify({
        highContrast: accessibility.highContrast,
        dyslexiaFont: accessibility.dyslexiaFont,
        textSize: clampedTextSize,
        reduceMotion: accessibility.reduceMotion,
      }),
    )
  }, [accessibility])

  const updateAccessibility = (updates) => {
    setAccessibility((current) => ({ ...current, ...updates }))
  }

  const resetAccessibility = () => {
    setAccessibility(defaultAccessibilitySettings)
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark')),
      isLoggedIn,
      authReady,
      user,
      login,
      logout,
      accessibility,
      updateAccessibility,
      resetAccessibility,
    }),
    [theme, isLoggedIn, authReady, user, accessibility],
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

