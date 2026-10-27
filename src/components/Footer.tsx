import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark"><span /></span><span>signal<span className="brand-period">.</span></span></Link><p>A clearer view of what’s next.<br />Independent perspective on AI & technology.</p></div>
      <div className="footer-col"><span className="eyebrow">Explore</span><Link to="/latest">Latest stories</Link><Link to="/trending">Trending</Link><Link to="/categories">All topics</Link></div>
      <div className="footer-col"><span className="eyebrow">Signal</span><Link to="/about">About us</Link><Link to="/contact">Get in touch</Link><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12} /></a></div>
      <div className="footer-note"><span className="status-dot" /> Curiosity, delivered weekly.</div>
    </div>
    <div className="footer-bottom"><span>© 2026 Signal Journal</span><span>Thoughtful by design. Independent by nature.</span><Link to="/contact">Contact <ArrowUpRight size={12} /></Link></div>
  </footer>
}
