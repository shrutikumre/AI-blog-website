import { createContext, useContext } from 'react'
import type { Article } from '../data/articles'

export type NewsState = {
  articles: Article[]
  loading: boolean
  error: string | null
  isLive: boolean
  retry: () => void
}

export const NewsContext = createContext<NewsState | null>(null)

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) throw new Error('useNews must be used within NewsProvider')
  return context
}
