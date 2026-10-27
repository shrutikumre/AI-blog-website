import { useEffect, useMemo, useState } from 'react'
import { articles as sampleArticles, type Article } from '../data/articles'
import { fetchLatestNews, hasNewsApiKey } from '../data/newsApi'
import { NewsContext } from './newsContext'

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [liveArticles, setLiveArticles] = useState<Article[] | null>(null)
  const [loading, setLoading] = useState(hasNewsApiKey)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!hasNewsApiKey) return
    const controller = new AbortController()
    fetchLatestNews(controller.signal)
      .then((result) => {
        if (!result.length) throw new Error('The news service returned no stories. Try again later.')
        setLiveArticles(result)
      })
      .catch((reason: unknown) => {
        if (reason instanceof Error && reason.name !== 'AbortError') setError(reason.message)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [attempt])

  const value = useMemo(() => ({
    articles: liveArticles ?? sampleArticles,
    loading,
    error,
    isLive: Boolean(liveArticles),
    retry: () => {
      if (!hasNewsApiKey) return
      setLoading(true)
      setError(null)
      setAttempt((value) => value + 1)
    },
  }), [liveArticles, loading, error])

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}
