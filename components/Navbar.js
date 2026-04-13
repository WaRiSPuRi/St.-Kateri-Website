import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Teams', 'Sponsors', 'Events']

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: scrolled ? 'rgba(20,19,56,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,179,179,0.15)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        <div style={{
          maxWidth: '1160px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: '#00b3b3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 800,
              fontSize: '18px',
              color: '#141338',
              letterSpacing: '-0.02em',
            }}>ST</div>
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#f5f6f0',
            }}>Thunder Robotics</span>
          </Link>

          {/* Desktop links */}
          <ul style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
            alignItems: 'center',
          }} className="nav-desktop">
            {links.map(l => (
              <li key={l}>
                <Link href={`#${l.toLowerCase()}`} style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#a8a8c0',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => e.target.style.color = '#00b3b3'}
                onMouseLeave={e => e.target.style.color = '#a8a8c0'}
                >{l}</Link>
              </li>
            ))}
            <li>
              <Link href="#contact" className="btn btn-solid" style={{
                padding: '10px 24px',
                fontSize: '14px',
              }}>
                <span>Get Started</span>
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#f5f6f0',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px, -5px)'
                  : 'none'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: '70px',
        left: 0,
        right: 0,
        background: 'rgba(20,19,56,0.98)',
        zIndex: 99,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        borderBottom: '1px solid rgba(0,179,179,0.2)',
      }} className="nav-mobile-menu">
        <div style={{ padding: '24px' }}>
          {links.map((l, i) => (
            <Link
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#f5f6f0',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s ease, transform 0.2s ease',
                transitionDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => { e.target.style.color = '#00b3b3'; e.target.style.transform = 'translateX(8px)'; }}
              onMouseLeave={e => { e.target.style.color = '#f5f6f0'; e.target.style.transform = 'translateX(0)'; }}
            >{l}</Link>
          ))}
          <Link href="#contact" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-block',
            marginTop: '20px',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: '#00b3b3',
            color: '#141338',
            padding: '12px 28px',
          }}>Get Started</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
