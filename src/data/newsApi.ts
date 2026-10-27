import type { Article } from './articles'

type GNewsItem = {
  title: string
  description: string
  content: string
  image: string | null
  publishedAt: string
  url: string
  source: { name: string }
}

type GNewsResponse = { articles?: GNewsItem[]; errors?: string[] }

const apiKey = import.meta.env.VITE_GNEWS_API_KEY?.trim()

export const hasNewsApiKey = Boolean(apiKey)

function mapArticles(items: GNewsItem[]): Article[] {
  return items.map((item, index) => {
    const text = item.content && !item.content.endsWith('[+chars]') ? item.content : item.description
    const paragraphs = text ? text.split(/(?<=[.!?])\s+/).filter(Boolean) : []
    return {
      id: `live-${index}-${encodeURIComponent(item.url)}`,
      title: item.title,
      excerpt: item.description || 'Open the original report for the full story.',
      category: 'Latest news',
      author: item.source.name || 'Original publisher',
      role: 'Original source',
      date: new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(item.publishedAt)),
      readTime: 'Source report',
      image: item.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
      imageAlt: `Image accompanying ${item.title}`,
      sourceName: item.source.name,
      sourceUrl: item.url,
      body: paragraphs.length ? paragraphs : [item.description || 'The publisher has not provided a preview. Visit the original source for the complete article.'],
    }
  })
}

async function request(endpoint: string, signal?: AbortSignal): Promise<Article[]> {
  if (!apiKey) return []
  const response = await fetch(`https://gnews.io/api/v4/${endpoint}${endpoint.includes('?') ? '&' : '?'}lang=en&max=10&apikey=${encodeURIComponent(apiKey)}`, { signal })
  if (!response.ok) throw new Error(response.status === 401 ? 'The GNews API key was rejected. Check VITE_GNEWS_API_KEY.' : `The news service returned ${response.status}. Please try again later.`)
  const payload = await response.json() as GNewsResponse
  if (payload.errors?.length) throw new Error(payload.errors.join(' '))
  return mapArticles(payload.articles ?? [])
}

export const fetchLatestNews = (signal?: AbortSignal) => request('top-headlines?category=technology', signal)
export const searchNews = (query: string, signal?: AbortSignal) => request(`search?q=${encodeURIComponent(query)}`, signal)
