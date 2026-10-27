import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Bookmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '../data/articles'

type Props = { article: Article; bookmarked: boolean; onBookmark: (id: string) => void; variant?: 'default' | 'compact' }

export default function ArticleCard({ article, bookmarked, onBookmark, variant = 'default' }: Props) {
  const reduceMotion = useReducedMotion()
  return <motion.article className={`article-card ${variant === 'compact' ? 'compact-card' : ''}`} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
    <div className="card-image-wrap"><Link to={`/article/${article.id}`} aria-label={`Read ${article.title}`}><img className="card-image" src={article.image} alt={article.imageAlt} loading="lazy" /></Link><span className="image-label">{article.sourceUrl ? 'LIVE NEWS' : 'EDITORIAL PREVIEW'}</span><button className={`bookmark-button ${bookmarked ? 'is-saved' : ''}`} onClick={() => onBookmark(article.id)} aria-label={bookmarked ? 'Remove bookmark' : 'Save story'} aria-pressed={bookmarked}><Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} /></button></div>
    <div className="card-content"><div className="card-meta"><span>{article.category}</span><span className="meta-dot">·</span><span>{article.readTime}</span></div><Link to={`/article/${article.id}`} className="card-title-link"><h3>{article.title}<ArrowUpRight className="card-arrow" size={16} /></h3></Link><p>{article.excerpt}</p><div className="card-byline"><span className="avatar">{article.author.split(' ').map((word) => word[0]).join('')}</span><span>{article.author}</span><span className="byline-dot">·</span><span>{article.date}</span></div></div>
  </motion.article>
}
