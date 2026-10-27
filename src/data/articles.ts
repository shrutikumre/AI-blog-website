export type Article = {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  role: string
  date: string
  readTime: string
  image: string
  imageAlt: string
  featured?: boolean
  trending?: boolean
  sourceName?: string
  sourceUrl?: string
  body: string[]
}

const image = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const articles: Article[] = [
  {
    id: 'small-models-big-ideas',
    title: 'The next AI breakthrough might be a lot smaller than you think',
    excerpt: 'A new generation of compact models is quietly changing where intelligence can live — and who gets to use it.',
    category: 'Artificial Intelligence',
    author: 'Maya Chen',
    role: 'Senior Editor',
    date: 'Oct 24, 2026',
    readTime: '8 min read',
    image: image('photo-1635070041078-e363dbe005cb'),
    imageAlt: 'Glowing abstract geometric light installation',
    featured: true,
    trending: true,
    body: [
      'For years, the story of artificial intelligence has been told in ever-larger numbers: more parameters, more compute, more data. But a quieter shift is underway. Researchers and builders are finding that capable systems do not always need a data center behind them.',
      'Smaller models are becoming useful in places where their larger cousins cannot go: on a laptop during a flight, inside a camera, or in a clinic with unreliable connectivity. That changes the design question from “How big can we make it?” to “Where should intelligence live?”',
      'The answer depends on the work. A personal assistant that remembers your preferences has different needs than a scientific model searching for a new material. In many everyday tasks, a compact, purpose-built model can be faster, cheaper, and easier to adapt.',
      'This is not the end of frontier-scale research. It is a broader map of what AI can be. The next wave will likely be defined not by one model that does everything, but by a constellation of systems that each do a few things remarkably well.',
    ],
  },
  {
    id: 'designing-with-machines',
    title: 'What happens when AI becomes your creative collaborator?',
    excerpt: 'The most interesting creative tools are not replacing the blank page. They are giving us new ways to get past it.',
    category: 'Creative AI',
    author: 'Theo Williams',
    role: 'Culture Editor',
    date: 'Oct 22, 2026',
    readTime: '6 min read',
    image: image('photo-1513364776144-60967b0f800f'),
    imageAlt: 'Colorful paint palette and creative studio materials',
    trending: true,
    body: [
      'A creative brief used to end with a familiar ritual: a long pause, a blank document, and the hope that the first idea would be a good one. Generative tools are changing that opening moment, but not necessarily in the way the headlines suggest.',
      'The strongest creative workflows treat a model as a collaborator with a very particular skill set. It can produce variations quickly, surface unexpected references, or help a team explore a direction before committing to it.',
      'Human taste still does the essential work. Someone needs to recognize the surprising idea, understand what the project is trying to say, and decide what to leave out. The machine can widen the search; it cannot tell us why a result matters.',
    ],
  },
  {
    id: 'the-new-shape-of-the-web',
    title: 'The internet is being rebuilt around answers, not links',
    excerpt: 'Search is evolving from a list of destinations into a conversation. Here is what we gain — and what we stand to lose.',
    category: 'The Future',
    author: 'Priya Kapoor',
    role: 'Technology Editor',
    date: 'Oct 20, 2026',
    readTime: '7 min read',
    image: image('photo-1451187580459-43490279c0fa'),
    imageAlt: 'Earth at night with connected lights seen from orbit',
    trending: true,
    body: [
      'For three decades, the web has asked us to choose our own adventure. A query returns a page of links; we open a few, compare them, and assemble an answer from the pieces. That bargain is beginning to change.',
      'Answer engines promise a shortcut: one response, synthesized from sources, with a conversation ready when the first question leads to another. It can feel like a more natural way to find information, especially when a question is hard to phrase.',
      'But links are more than a navigation pattern. They are an attribution system and a path to the original context. The new interface will need to make sources visible, make uncertainty legible, and preserve the ability to explore beyond a summary.',
    ],
  },
  {
    id: 'inside-the-energy-question',
    title: 'AI’s energy problem is also an opportunity to rethink the grid',
    excerpt: 'Rising demand from data centers is putting new pressure on energy systems — and making flexibility more valuable.',
    category: 'Climate & Tech',
    author: 'Jordan Lee',
    role: 'Contributing Writer',
    date: 'Oct 18, 2026',
    readTime: '9 min read',
    image: image('photo-1473341304170-971dccb5ac1e'),
    imageAlt: 'Wind turbines generating renewable energy at sunset',
    body: [
      'Every new generation of AI raises a practical question that rarely fits in a model demo: where does the electricity come from? Data centers are growing, and their demand is becoming a visible part of conversations about infrastructure.',
      'The challenge is real, but it is not one-dimensional. Flexible computing loads can respond to the grid, and long-term investment in clean power can improve the economics of new capacity. Neither solution removes the need to measure energy use honestly.',
      'A useful debate starts with transparent numbers and ends with better choices: efficient hardware, smarter scheduling, cleaner energy, and a clearer account of what these systems make possible in return.',
    ],
  },
  {
    id: 'a-more-human-interface',
    title: 'The best AI interface might be one you barely notice',
    excerpt: 'A look at the small, thoughtful design decisions making intelligent products feel more human.',
    category: 'Product & Design',
    author: 'Sam Rivera',
    role: 'Design Editor',
    date: 'Oct 16, 2026',
    readTime: '5 min read',
    image: image('photo-1498050108023-c5249f4df085'),
    imageAlt: 'A thoughtfully arranged laptop workspace',
    body: [
      'We have spent a lot of time designing interfaces for systems that wait for an instruction. Intelligent products introduce a different possibility: software that can anticipate, suggest, and occasionally take action.',
      'The hard part is deciding when not to. People need a clear sense of what a system knows, what it is doing, and how to change its mind. A quiet interface can still be transparent; calm does not have to mean hidden.',
      'The best experiences make the complex feel simple without pretending the complexity is gone. That takes careful defaults, useful explanations, and an easy way to say “not now.”',
    ],
  },
  {
    id: 'the-open-model-moment',
    title: 'Why open models are finding their moment',
    excerpt: 'More control, more experimentation, and a different kind of competition are reshaping the AI ecosystem.',
    category: 'Artificial Intelligence',
    author: 'Maya Chen',
    role: 'Senior Editor',
    date: 'Oct 14, 2026',
    readTime: '6 min read',
    image: image('photo-1518770660439-4636190af475'),
    imageAlt: 'Close-up of a detailed electronic circuit board',
    body: [
      'Open models are changing who gets to experiment. Developers can inspect, adapt, and run a growing range of systems on infrastructure they control, which creates opportunities for research and specialized products.',
      'Openness is not a single switch. The model weights, training data, code, and documentation may each be shared under different terms. Understanding those distinctions matters for organizations making long-term decisions.',
      'The healthiest ecosystem will give people meaningful choices while taking safety and accountability seriously. Open development can help with both when it is paired with careful evaluation and responsible deployment.',
    ],
  },
  {
    id: 'the-next-computing-shift',
    title: 'Spatial computing is growing up, one useful app at a time',
    excerpt: 'After years of big promises, practical applications are starting to make immersive computing feel less like a demo.',
    category: 'The Future',
    author: 'Theo Williams',
    role: 'Culture Editor',
    date: 'Oct 12, 2026',
    readTime: '7 min read',
    image: image('photo-1519389950473-47ba0277781c'),
    imageAlt: 'A team collaborating around technology in a bright studio',
    body: [
      'The future of computing rarely arrives as one dramatic replacement. More often it slips into existing routines: a visualization that makes a hard problem clearer, a training environment that is safer to practice in, or a spatial workspace that helps a team see the same thing.',
      'That is why the most promising applications are often specific. They solve a real problem that was awkward on a flat screen, rather than asking people to change their lives just to try new hardware.',
      'Comfort, cost, and thoughtful software still matter more than novelty. As those pieces improve, immersive tools have a chance to become simply another useful way to work.',
    ],
  },
  {
    id: 'trust-by-design',
    title: 'Can we design AI products that earn trust instead of asking for it?',
    excerpt: 'Product teams are rethinking confidence, disclosure, and control as essential parts of the interface.',
    category: 'Ethics & Society',
    author: 'Priya Kapoor',
    role: 'Technology Editor',
    date: 'Oct 10, 2026',
    readTime: '8 min read',
    image: image('photo-1455390582262-044cdead277a'),
    imageAlt: 'Notebook and pen on a sunlit writing desk',
    body: [
      'Trust is often treated like a message a product team can write. In practice, it is a pattern people notice over time: whether a system behaves as expected, explains its limits, and gives them a way to recover when it gets something wrong.',
      'Design can make those qualities easier to see. Clear sources, calibrated language, and useful controls help people decide when an answer deserves their confidence.',
      'There is no badge that can substitute for this work. Trust is a relationship, and the interface is one of the places where that relationship is built.',
    ],
  },
]

export const categories = [
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence', count: '02 stories', number: '01', tone: 'lime' },
  { name: 'Creative AI', slug: 'creative-ai', count: '01 story', number: '02', tone: 'lavender' },
  { name: 'Product & Design', slug: 'product-design', count: '01 story', number: '03', tone: 'peach' },
  { name: 'Climate & Tech', slug: 'climate-tech', count: '01 story', number: '04', tone: 'blue' },
  { name: 'The Future', slug: 'the-future', count: '02 stories', number: '05', tone: 'pink' },
  { name: 'Ethics & Society', slug: 'ethics-society', count: '01 story', number: '06', tone: 'yellow' },
]

export const categorySlug = (name: string) => name.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')
