import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Bookmark, Menu, Moon, Search, Sun, X } from 'lucide-react'

type Props = { theme: 'dark' | 'light'; toggleTheme: () => void; savedCount: number }

export default function Header({ theme, toggleTheme, savedCount }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const search = (event: React.FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`)
    setSearchOpen(false)
    setMenuOpen(false)
  }

  const links = [
    { label: 'Latest', to: '/latest' },
    { label: 'Trending', to: '/trending' },
    { label: 'Explore', to: '/categories' },
    { label: 'About', to: '/about' },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Signal home">
          <span className="brand-mark"><span /></span>
          <span>signal<span className="brand-period">.</span></span>
        </Link>
        <nav id="primary-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} onClick={() => setMenuOpen(false)} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{link.label}</NavLink>)}
          <Link className="nav-mobile-bookmarks" to="/bookmarks" onClick={() => setMenuOpen(false)}>Saved stories <Bookmark size={15} /></Link>
        </nav>
        <div className="header-actions">
          <Link className="icon-button saved-link" to="/bookmarks" aria-label={`Saved stories, ${savedCount} saved`} title="Saved stories"><Bookmark size={17} /><span className="saved-count">{savedCount}</span></Link>
          <button className="icon-button" onClick={() => setSearchOpen((open) => !open)} aria-label={searchOpen ? 'Close search' : 'Search'} aria-expanded={searchOpen} aria-controls="header-search">{searchOpen ? <X size={18} /> : <Search size={18} />}</button>
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <Link to="/latest" className="header-cta">Read the latest <ArrowUpRight size={14} /></Link>
          <button className="icon-button menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {searchOpen && <form id="header-search" className="search-popover" onSubmit={search}><Search size={17} /><input autoFocus aria-label="Search stories" placeholder="Search ideas, stories, topics…" value={query} onChange={(event) => setQuery(event.target.value)} /><button type="submit">Search <ArrowUpRight size={14} /></button></form>}
    </header>
  )
}
