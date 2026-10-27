import { useEffect, useState } from 'react'

function readStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) as T : fallback
  } catch {
    return fallback
  }
}

export function usePreferences() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => readStorage('signal-bookmarks', []))
  const [theme, setTheme] = useState<'dark' | 'light'>(() => readStorage('signal-theme', 'dark'))

  useEffect(() => {
    localStorage.setItem('signal-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem('signal-theme', JSON.stringify(theme))
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleBookmark = (id: string) => {
    setBookmarks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return { bookmarks, toggleBookmark, theme, toggleTheme: () => setTheme((value) => value === 'dark' ? 'light' : 'dark') }
}
