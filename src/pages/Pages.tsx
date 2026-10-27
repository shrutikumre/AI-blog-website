import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, Clock3, ExternalLink, Filter, Mail, Search, Share2, Sparkles } from 'lucide-react'
import type { Article } from '../data/articles'
import { articles as sampleArticles } from '../data/articles'
import { categories, categorySlug } from '../data/articles'
import { hasNewsApiKey, searchNews } from '../data/newsApi'
import { useNews } from '../hooks/newsContext'
import type { usePreferences } from '../hooks/usePreferences'
import ArticleCard from '../components/ArticleCard'
import Newsletter from '../components/Newsletter'
import StoryGrid from '../components/StoryGrid'

type Preferences = ReturnType<typeof usePreferences>
type SharedProps = { preferences: Preferences }

function Label({ live }: { live: boolean }) {
  return <div className={live ? 'news-label live-label' : 'news-label sample-label'}><span className="status-dot" />{live ? 'LIVE NEWS · SOURCES LINKED' : 'EDITORIAL PREVIEW · SAMPLE STORIES'}</div>
}

function usePageArticles() {
  const news = useNews()
  return news
}

export function HomePage({ preferences }: SharedProps) {
  const news = usePageArticles()
  const featured = news.articles[0]
  const rest = news.articles.slice(1)
  return <>
    <section className="hero-section">
      <div className="hero-background" />
      <div className="hero-topline"><span>INDEPENDENT PERSPECTIVE · ISSUE NO. 08</span><span className="hero-date">Ideas worth your attention <span className="status-dot" /></span></div>
      <div className="hero-copy"><span className="eyebrow"><span className="status-dot" /> THE FUTURE, IN FOCUS</span><h1>A clearer view<br />of <span>what’s next.</span></h1><p>Thoughtful perspectives on AI, technology, and the ideas shaping tomorrow.</p><div className="hero-links"><Link to="/latest" className="button-primary">Explore the latest <ArrowUpRight size={16} /></Link><Link to="/about" className="text-link">A little about us <ArrowRight size={15} /></Link></div></div>
      <div className="hero-graphic" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="orbit-core"><span className="orbit-core-dot" /><span className="orbit-line" /></div><div className="orbit-caption">SIGNAL / 001<br /><span>LOOK CLOSER</span></div><div className="orbit-index">01 — 06</div></div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE <ArrowDown size={13} /></span><span>CURATED FOR THE CURIOUS</span></div>
    </section>
    <div className="ticker"><div className="ticker-track"><span>BETTER QUESTIONS, BETTER FUTURES</span><i>✳</i><span>TECHNOLOGY WITH CONTEXT</span><i>✳</i><span>INDEPENDENT BY NATURE</span><i>✳</i><span>BETTER QUESTIONS, BETTER FUTURES</span><i>✳</i><span>TECHNOLOGY WITH CONTEXT</span><i>✳</i></div></div>
    <section className="featured-section section-wrap">
      <div className="feature-heading"><div><span className="eyebrow">THE BIG IDEA <span className="feature-index">01 / 06</span></span><h2>One story.<br />A bigger picture.</h2></div><Label live={news.isLive} /></div>
      {news.loading ? <div className="skeleton-feature" aria-label="Loading latest story" /> : <Link to={`/article/${featured.id}`} className="feature-card"><div className="feature-image"><img src={featured.image} alt={featured.imageAlt} /><span className="feature-image-caption">{featured.category.toUpperCase()} &nbsp; / &nbsp; {featured.readTime.toUpperCase()}</span></div><div className="feature-content"><span className="eyebrow feature-category">{featured.category}</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><div className="feature-bottom"><span>{featured.author} <i>·</i> {featured.date}</span><span className="feature-read">Read the story <ArrowUpRight size={16} /></span></div></div></Link>}
      {news.error && <div className="inline-notice" role="status">{news.error} Showing sample stories instead. <button onClick={news.retry}>Try again</button></div>}
    </section>
    <StoryGrid articles={rest} preferences={preferences} title="Ideas in motion" eyebrow="WHAT WE’RE THINKING ABOUT" limit={3} />
    <section className="manifesto-strip section-wrap"><span className="eyebrow">A NOTE ON OUR APPROACH</span><p>Good technology coverage isn’t about <em>what’s loudest.</em><br />It’s about <span>what matters next.</span></p><Link to="/about" className="text-link">Meet Signal <ArrowRight size={15} /></Link></section>
    <section className="section-wrap topic-section"><div className="section-heading"><div><span className="eyebrow">FOLLOW YOUR CURIOSITY</span><h2>Find your frequency.</h2></div><Link to="/categories" className="text-link">All topics <ArrowRight size={15} /></Link></div><CategoryTiles /></section>
    <Newsletter />
  </>
}

function CategoryTiles() {
  return <div className="category-grid">{categories.map((category) => <Link key={category.slug} to={`/category/${category.slug}`} className={`category-tile tile-${category.tone}`}><span className="category-number">{category.number}</span><span className="category-orbit" /><span className="category-title">{category.name}</span><span className="category-count">{category.count} <ArrowUpRight size={14} /></span></Link>)}</div>
}

function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: React.ReactNode; description: string; children?: React.ReactNode }) {
  return <section className="page-intro section-wrap"><span className="eyebrow"><span className="status-dot" /> {eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</section>
}

function ArticleList({ items, preferences, emptyTitle = 'Nothing here yet', emptyText = 'Try a different filter or explore all the latest stories.' }: { items: Article[]; preferences: Preferences; emptyTitle?: string; emptyText?: string }) {
  if (!items.length) return <div className="empty-state"><span className="empty-orbit"><Search size={22} /></span><h3>{emptyTitle}</h3><p>{emptyText}</p><Link className="button-primary" to="/latest">Explore latest stories <ArrowRight size={15} /></Link></div>
  return <div className="story-grid">{items.map((article) => <ArticleCard key={article.id} article={article} bookmarked={preferences.bookmarks.includes(article.id)} onBookmark={preferences.toggleBookmark} />)}</div>
}

export function LatestPage({ preferences }: SharedProps) {
  const { articles: stories, loading, error, isLive, retry } = usePageArticles()
  const [filter, setFilter] = useState('All topics')
  const [page, setPage] = useState(1)
  const filters = ['All topics', ...new Set(stories.map((story) => story.category))]
  const results = stories.filter((story) => filter === 'All topics' || story.category === filter)
  const pages = Math.max(1, Math.ceil(results.length / 6))
  const visible = results.slice((page - 1) * 6, page * 6)
  return <><PageIntro eyebrow="THE LATEST" title={<>Curiosity,<br /><span>well considered.</span></>} description="Fresh ideas, considered perspectives, and the stories moving technology forward."><Label live={isLive} /></PageIntro><section className="section-wrap listing-section"><div className="filter-row"><span><Filter size={15} /> FILTER BY</span><div className="filter-pills">{filters.map((name) => <button key={name} onClick={() => { setFilter(name); setPage(1) }} className={filter === name ? 'filter-pill selected' : 'filter-pill'}>{name}</button>)}</div></div>{error && <div className="inline-notice" role="status">{error} Sample stories are still available. <button onClick={retry}>Try again</button></div>}{loading ? <div className="skeleton-grid">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item} />)}</div> : <ArticleList items={visible} preferences={preferences} />}{results.length > 6 && <Pagination page={page} pages={pages} onPage={setPage} />}</section><Newsletter /></>
}

function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (page: number) => void }) {
  return <nav className="pagination" aria-label="Pagination"><button disabled={page === 1} onClick={() => onPage(page - 1)} aria-label="Previous page"><ArrowLeft size={16} /></button>{Array.from({ length: pages }, (_, index) => <button key={index} onClick={() => onPage(index + 1)} aria-current={page === index + 1 ? 'page' : undefined} className={page === index + 1 ? 'current' : ''}>{String(index + 1).padStart(2, '0')}</button>)}<button disabled={page === pages} onClick={() => onPage(page + 1)} aria-label="Next page"><ArrowRight size={16} /></button></nav>
}

export function TrendingPage({ preferences }: SharedProps) {
  const { articles: stories, isLive } = usePageArticles()
  const trending = stories.filter((story) => story.trending || stories.indexOf(story) < 4)
  return <><PageIntro eyebrow="THE CONVERSATION" title={<>Worth a closer<br /><span>look.</span></>} description="A considered selection of stories that deserve attention, chosen by Signal’s editors."><Label live={isLive} /></PageIntro><section className="section-wrap listing-section"><div className="ranking-note"><Sparkles size={16} /><span>Editorial selection, not a live popularity ranking.</span></div><ArticleList items={trending} preferences={preferences} /></section><Newsletter /></>
}

export function CategoriesPage() {
  return <><PageIntro eyebrow="EXPLORE THE SIGNAL" title={<>A world of ideas.<br /><span>Find your angle.</span></>} description="From the building blocks of AI to the bigger questions technology raises." /><section className="section-wrap listing-section"><CategoryTiles /></section><div className="section-wrap category-note"><Sparkles size={18} /><p>Curiosity doesn’t follow categories. Think of these as a starting point, not a boundary.</p></div><Newsletter /></>
}

export function CategoryPage({ preferences }: SharedProps) {
  const { slug = '' } = useParams()
  const category = categories.find((item) => item.slug === slug)
  const categoryArticles = sampleArticles.filter((story) => categorySlug(story.category) === slug)
  if (!category) return <PageIntro eyebrow="TOPIC NOT FOUND" title={<>Let’s find<br /><span>another thread.</span></>} description="That topic isn’t in our index. Explore all categories instead."><Link className="button-primary" to="/categories">Explore categories <ArrowRight size={15} /></Link></PageIntro>
  return <><PageIntro eyebrow={`TOPIC ${category.number} / 06`} title={<>{category.name}.<br /><span>Through a new lens.</span></>} description={`Thoughtful perspectives and the latest thinking on ${category.name.toLowerCase()}.`}><Label live={false} /></PageIntro><section className="section-wrap listing-section"><ArticleList items={categoryArticles} preferences={preferences} /></section><Newsletter /></>
}

export function SearchPage({ preferences }: SharedProps) {
  const [params] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const { articles: stories, isLive } = usePageArticles()
  const localResults = query ? stories.filter((story) => `${story.title} ${story.excerpt} ${story.category}`.toLowerCase().includes(query.toLowerCase())) : []
  const [remoteResults, setRemoteResults] = useState<{ query: string; articles: Article[] } | null>(null)
  const [requestError, setRequestError] = useState<{ query: string; message: string } | null>(null)

  useEffect(() => {
    if (!hasNewsApiKey || !query) return
    const controller = new AbortController()
    searchNews(query, controller.signal).then((articles) => setRemoteResults({ query, articles })).catch((reason: unknown) => {
      if (reason instanceof Error && reason.name !== 'AbortError') setRequestError({ query, message: reason.message })
    })
    return () => controller.abort()
  }, [query])

  const loading = Boolean(hasNewsApiKey && query && remoteResults?.query !== query && requestError?.query !== query)
  const error = requestError?.query === query ? requestError.message : ''
  const results = remoteResults?.query === query ? remoteResults.articles : localResults
  return <><PageIntro eyebrow="A GOOD QUESTION" title={<>Search the<br /><span>signal.</span></>} description={query ? `Showing thoughtful stories for “${query}”.` : 'Find an idea, a topic, or a new point of view.'}><form className="page-search-form" action="/search"><Search size={17} /><input type="search" name="q" defaultValue={query} placeholder="What are you curious about?" aria-label="Search stories" /><button type="submit">Search <ArrowRight size={15} /></button></form></PageIntro><section className="section-wrap listing-section">{hasNewsApiKey && <Label live={isLive} />}{error && <div className="inline-notice" role="status">{error} Showing available sample results.</div>}{loading ? <div className="skeleton-grid">{[1, 2, 3].map((item) => <div className="skeleton-card" key={item} />)}</div> : <ArticleList items={results} preferences={preferences} emptyTitle={query ? 'No stories found' : 'Start with a question'} emptyText={query ? 'We couldn’t find a match. Try a broader search or explore our topics.' : 'Enter a keyword above to find the stories you’re looking for.'} />}</section></>
}

export function BookmarksPage({ preferences }: SharedProps) {
  const { articles: stories } = usePageArticles()
  const saved = stories.filter((story) => preferences.bookmarks.includes(story.id))
  return <><PageIntro eyebrow="YOUR READING LIST" title={<>Keep the good<br /><span>ideas close.</span></>} description="Stories you’ve saved for a little more time, whenever you’re ready." /><section className="section-wrap listing-section"><ArticleList items={saved} preferences={preferences} emptyTitle="A space for later" emptyText="Save a story with the bookmark icon and it’ll be waiting right here." /></section></>
}

export function ArticlePage({ preferences }: SharedProps) {
  const { id = '' } = useParams()
  const news = usePageArticles()
  const article = news.articles.find((item) => item.id === id)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [shareError, setShareError] = useState('')
  const bookmarked = preferences.bookmarks.includes(id)

  async function share() {
    const shareData = { title: article?.title ?? 'Signal', text: article?.excerpt, url: window.location.href }
    setShareError('')
    try {
      if (navigator.share) await navigator.share(shareData)
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 2000) }
      setShared(true)
      window.setTimeout(() => setShared(false), 2000)
    } catch (reason) {
      if (reason instanceof Error && reason.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setCopied(true)
          window.setTimeout(() => setCopied(false), 2000)
        } catch {
          setShareError('Sharing is unavailable here. Copy the page URL from your address bar.')
        }
      }
    }
  }

  if (!article) return <div className="section-wrap article-missing"><span className="eyebrow">STORY NOT FOUND</span><h1>That page has moved.<br /><span>Good stories travel.</span></h1><Link to="/latest" className="button-primary"><ArrowLeft size={15} /> Back to stories</Link></div>
  const related = news.articles.filter((item) => item.id !== article.id && item.category === article.category).slice(0, 3)
  return <><article className="article-page">
    <div className="article-top section-wrap"><Link to="/latest" className="text-link"><ArrowLeft size={15} /> Back to all stories</Link><span className="eyebrow">{article.sourceUrl ? 'ORIGINAL REPORT · ' + article.sourceName : 'SIGNAL JOURNAL · EDITORIAL PREVIEW'}</span></div>
    <header className="article-header section-wrap"><div className="article-category">{article.category}</div><h1>{article.title}</h1><p className="article-dek">{article.excerpt}</p><div className="article-byline"><span className="avatar">{article.author.split(' ').map((word) => word[0]).join('')}</span><div><strong>{article.author}</strong><span>{article.role}</span></div><span className="byline-separator" /><span>{article.date}</span><span className="byline-separator" /><span><Clock3 size={14} /> {article.readTime}</span></div></header>
    <div className="article-cover section-wrap"><img src={article.image} alt={article.imageAlt} /><span className="cover-caption">{article.sourceUrl ? `Image via ${article.sourceName}` : 'A Signal editorial preview'}</span></div>
    <div className="article-body-wrap"><aside className="article-actions"><span className="eyebrow">SHARE THIS IDEA</span><button onClick={share} aria-label="Share this story"><Share2 size={17} /></button><button onClick={() => preferences.toggleBookmark(id)} aria-label={bookmarked ? 'Remove bookmark' : 'Save story'} aria-pressed={bookmarked}><Bookmark size={17} fill={bookmarked ? 'currentColor' : 'none'} /></button>{(copied || shared) && <span className="share-feedback"><Check size={13} />{copied ? 'Copied' : 'Shared'}</span>}{shareError && <span className="share-feedback" role="status">{shareError}</span>}</aside><div className="article-body"><div className="article-disclaimer"><Sparkles size={15} /><span>{article.sourceUrl ? 'This story is from an independent publisher. Read the original report below.' : 'This is an illustrative editorial preview, not a real-time news report.'}</span></div>{article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{article.sourceUrl && <a className="source-link" href={article.sourceUrl} target="_blank" rel="noreferrer">Read the original at {article.sourceName} <ExternalLink size={15} /></a>}<div className="article-endmark">✳</div></div></div>
    <div className="section-wrap article-tags"><span className="eyebrow">FILED UNDER</span><Link to={`/category/${categorySlug(article.category)}`}>{article.category} <ArrowUpRight size={13} /></Link></div>
  </article>
  {related.length > 0 && <StoryGrid articles={related} preferences={preferences} title="Keep following the thread" eyebrow="MORE TO EXPLORE" limit={3} link="/latest" />}
  {!related.length && <StoryGrid articles={news.articles.filter((item) => item.id !== article.id)} preferences={preferences} title="Keep following the thread" eyebrow="MORE TO EXPLORE" limit={3} link="/latest" />}
  </>
}

export function AboutPage() {
  return <><section className="about-hero section-wrap"><span className="eyebrow"><span className="status-dot" /> WHY SIGNAL EXISTS</span><h1>The future deserves<br />a <span>better conversation.</span></h1><p>Technology moves quickly. Understanding what it means takes a little more time.</p><div className="about-hero-art"><div className="about-art-ring ring-a" /><div className="about-art-ring ring-b" /><div className="about-art-ring ring-c" /><div className="about-art-center">S<span>.</span></div><span className="about-art-note note-a">CURIOUS, NOT CYNICAL</span><span className="about-art-note note-b">ALWAYS ASK WHY</span></div></section><section className="about-copy section-wrap"><div><span className="eyebrow">OUR POINT OF VIEW</span><h2>Less noise.<br /><span>More meaning.</span></h2></div><div className="about-copy-text"><p>Signal is an independent journal for people who want to understand the ideas behind the headlines. We cover artificial intelligence and emerging technology with care, context, and an open mind.</p><p>We believe the best stories make complicated things feel clear without making them feel simple. That means asking better questions, listening to different perspectives, and being honest about what we don’t know yet.</p><p>Our sample stories are editorial previews, created to show the kind of thoughtful coverage we value. When a live news source is configured, we link directly to the original publisher.</p><Link to="/latest" className="button-primary">Explore Signal <ArrowUpRight size={15} /></Link></div></section><section className="about-values section-wrap"><span className="eyebrow">THE SIGNAL STANDARD</span><div className="values-grid"><div><span>01</span><h3>Context over clicks.</h3><p>We look for the human question behind the technical one.</p></div><div><span>02</span><h3>Curiosity over certainty.</h3><p>Good questions leave room for nuance, discovery, and change.</p></div><div><span>03</span><h3>Clarity over hype.</h3><p>We make ideas accessible without losing the important details.</p></div></div></section><Newsletter /></>
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const message = String(form.get('message') ?? '').trim()
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setError('Please add your name, a valid email, and a message of at least 10 characters.')
      return
    }
    const inbox = JSON.parse(localStorage.getItem('signal-messages') || '[]') as { name: string; email: string; message: string; receivedAt: string }[]
    localStorage.setItem('signal-messages', JSON.stringify([...inbox, { name, email, message, receivedAt: new Date().toISOString() }]))
    setError('')
    setSubmitted(true)
  }
  return <><PageIntro eyebrow="START A CONVERSATION" title={<>We’re listening.<br /><span>What’s on your mind?</span></>} description="A story idea, a thoughtful question, or just a hello — our inbox is open." /><section className="section-wrap contact-section"><div className="contact-aside"><span className="eyebrow">THE RIGHT THREAD</span><p>We’d love to hear what you’re thinking about. For editorial ideas, partnerships, or general notes, send us a message.</p><a className="contact-email" href="mailto:hello@signaljournal.example"><Mail size={17} /> hello@signaljournal.example <ArrowUpRight size={14} /></a><div className="response-note"><span className="status-dot" /> Usually replying within two working days.</div></div><div className="contact-form-wrap">{submitted ? <div className="contact-success"><span className="success-icon"><Check size={20} /></span><h2>Message received.</h2><p>Thanks for reaching out. We’ll be in touch soon.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another message <ArrowRight size={15} /></button></div> : <form className="contact-form" onSubmit={submit}><label>Your name<input name="name" autoComplete="name" placeholder="How should we address you?" required /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label><label>Your message<textarea name="message" rows={5} minLength={10} placeholder="Tell us what’s on your mind…" required /></label>{error && <div className="form-error" role="alert">{error}</div>}<button type="submit" className="button-primary">Send your note <ArrowUpRight size={15} /></button><span className="privacy-note">Your message is saved in this browser demo only.</span></form>}</div></section><Newsletter /></>
}
