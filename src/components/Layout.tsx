import { motion, useScroll, useSpring } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import type { usePreferences } from '../hooks/usePreferences'

type PreferenceState = ReturnType<typeof usePreferences>

export default function Layout({ preferences }: { preferences: PreferenceState }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const location = useLocation()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname, location.search])

  return <><motion.div className="reading-progress" style={{ scaleX }} /><Header theme={preferences.theme} toggleTheme={preferences.toggleTheme} savedCount={preferences.bookmarks.length} /><main><Outlet /></main><Footer /></>
}
