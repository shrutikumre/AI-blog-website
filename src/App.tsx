import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import { NewsProvider } from './hooks/useNews'
import { useNews } from './hooks/newsContext'
import { usePreferences } from './hooks/usePreferences'
import { categories } from './data/articles'
import {
  AboutPage,
  ArticlePage,
  BookmarksPage,
  CategoriesPage,
  CategoryPage,
  ContactPage,
  HomePage,
  LatestPage,
  SearchPage,
  TrendingPage,
} from './pages/Pages'

function PageMotion({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { id, slug } = useParams()
  const { articles } = useNews()
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Signal — A clearer view of what’s next',
      '/latest': 'Latest stories — Signal',
      '/trending': 'Trending — Signal',
      '/categories': 'Explore topics — Signal',
      '/about': 'About Signal',
      '/contact': 'Contact Signal',
      '/bookmarks': 'Saved stories — Signal',
    }
    const article = articles.find((item) => item.id === id)
    const category = categories.find((item) => item.slug === slug)
    const query = new URLSearchParams(location.search).get('q')?.trim()
    const title = article ? `${article.title} — Signal`
      : category ? `${category.name} — Signal`
        : location.pathname === '/search' && query ? `Search: ${query} — Signal`
          : titles[location.pathname] ?? (location.pathname.startsWith('/article/') ? 'Story — Signal' : location.pathname.startsWith('/category/') ? 'Topic not found — Signal' : location.pathname === '/search' ? 'Search — Signal' : 'Page not found — Signal')
    const descriptionText = article?.excerpt
      ?? (category ? `Thoughtful perspectives and sample stories about ${category.name.toLowerCase()}.` : undefined)
      ?? (query ? `Search Signal stories for ${query}.` : 'Independent perspective on AI, technology, and the ideas shaping tomorrow.')
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', descriptionText)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', descriptionText)
  }, [location.pathname, location.search, articles, id, slug])
  return <AnimatePresence mode="wait" initial={false}><motion.div key={location.pathname + location.search} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.22 }}>{children}</motion.div></AnimatePresence>
}

function RoutedApp() {
  const preferences = usePreferences()
  return <Routes><Route element={<Layout preferences={preferences} />}><Route index element={<PageMotion><HomePage preferences={preferences} /></PageMotion>} /><Route path="latest" element={<PageMotion><LatestPage preferences={preferences} /></PageMotion>} /><Route path="trending" element={<PageMotion><TrendingPage preferences={preferences} /></PageMotion>} /><Route path="categories" element={<PageMotion><CategoriesPage /></PageMotion>} /><Route path="category/:slug" element={<PageMotion><CategoryPage preferences={preferences} /></PageMotion>} /><Route path="article/:id" element={<PageMotion><ArticlePage preferences={preferences} /></PageMotion>} /><Route path="search" element={<PageMotion><SearchPage preferences={preferences} /></PageMotion>} /><Route path="bookmarks" element={<PageMotion><BookmarksPage preferences={preferences} /></PageMotion>} /><Route path="about" element={<PageMotion><AboutPage /></PageMotion>} /><Route path="contact" element={<PageMotion><ContactPage /></PageMotion>} /><Route path="*" element={<PageMotion><section className="section-wrap article-missing"><span className="eyebrow">404 · LOST IN THE FEED</span><h1>This page isn’t<br /><span>in our signal.</span></h1><Link className="button-primary" to="/">Back to the beginning</Link></section></PageMotion>} /></Route></Routes>
}

export default function App() {
  return <NewsProvider><RoutedApp /></NewsProvider>
}
