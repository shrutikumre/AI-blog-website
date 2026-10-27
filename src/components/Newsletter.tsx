import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function subscribe(event: React.FormEvent) {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address to join.')
      return
    }
    const subscribers = JSON.parse(localStorage.getItem('signal-subscribers') || '[]') as string[]
    if (!subscribers.includes(email.toLowerCase())) localStorage.setItem('signal-subscribers', JSON.stringify([...subscribers, email.toLowerCase()]))
    setError('')
    setSubmitted(true)
  }

  return <section className="newsletter-section"><div className="newsletter-glow" /><div className="newsletter-copy"><span className="eyebrow"><span className="status-dot" /> THE SIGNAL LETTER</span><h2>A little more signal.<br /><span>A lot less noise.</span></h2><p>One thoughtful email on the ideas shaping tomorrow. No hype, just perspective.</p></div><div className="newsletter-form-wrap">{submitted ? <div className="newsletter-success"><span className="success-icon"><Check size={19} /></span><div><strong>You’re on the list.</strong><span>Look out for a little more signal soon.</span></div></div> : <form onSubmit={subscribe} className="newsletter-form"><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" placeholder="Your email address" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} aria-describedby={error ? 'newsletter-error' : undefined} /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>{error && <span className="form-error" id="newsletter-error">{error}</span>}</form>}<span className="privacy-note">Your email is saved only in this browser demo. Unsubscribe anytime.</span></div></section>
}
