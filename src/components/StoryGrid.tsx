import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Article } from '../data/articles'
import ArticleCard from './ArticleCard'
import type { usePreferences } from '../hooks/usePreferences'

type Props = { articles: Article[]; preferences: ReturnType<typeof usePreferences>; title?: string; eyebrow?: string; limit?: number; link?: string }

export default function StoryGrid({ articles, preferences, title = 'The latest thinking', eyebrow = 'FRESH PERSPECTIVES', limit = 3, link = '/latest' }: Props) {
  const reduceMotion = useReducedMotion()
  return <section className="section-wrap story-section">
    <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><Link className="text-link" to={link}>View all stories <ArrowRight size={15} /></Link></div>
    <div className="story-grid">{articles.slice(0, limit).map((article, index) => <motion.div key={article.id} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-35px' }} transition={{ delay: reduceMotion ? 0 : index * 0.08 }}><ArticleCard article={article} bookmarked={preferences.bookmarks.includes(article.id)} onBookmark={preferences.toggleBookmark} /></motion.div>)}</div>
  </section>
}
