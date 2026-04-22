import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import useScrollReveal from '../components/useScrollReveal'

/* ── animated counter ───────────────────────────────────── */
function useCounter(target, duration = 1800, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    const num = parseInt(target)
    if (num === 0) { setVal(0); return }
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setVal(Math.floor(progress * num))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return val
}

/* ── stat item ──────────────────────────────────────────── */
function StatItem({ num, label, suffix = '+', delay = 0 }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const count = useCounter(num, 1500, inView)
  const isZero = parseInt(num) === 0

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      background: '#080818', padding: '52px 20px', textAlign: 'center',
      borderBottom: '2px solid transparent',
      transition: 'border-color 0.3s ease, background 0.3s ease',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `border-color 0.3s ease, background 0.3s ease, opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderBottomColor = '#00b3b3'; e.currentTarget.style.background = '#0b0b1e'; }}
    onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; e.currentTarget.style.background = '#080818'; }}
    >
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: 'clamp(52px, 7vw, 88px)',
        fontWeight: 800, color: '#00b3b3', lineHeight: 1, letterSpacing: '-0.02em',
      }}>
        {isZero ? '0' : `${count}${suffix}`}
      </div>
      <div style={{
        fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px',
        letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3a3a60', marginTop: '14px',
      }}>{label}</div>
    </div>
  )
}

/* ── floating particles ─────────────────────────────────── */
function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 4 === 0 ? '3px' : '2px', height: i % 4 === 0 ? '3px' : '2px',
          borderRadius: '50%', background: '#00b3b3',
          left: `${(i * 41 + 7) % 100}%`, top: `${(i * 57 + 13) % 100}%`,
          opacity: 0.08 + (i % 6) * 0.04,
          animation: `float ${4 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.35) % 3.5}s`,
        }} />
      ))}
    </div>
  )
}

export default function Home() {
  useScrollReveal()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  const toggleVideo = () => {
    if (!videoRef.current) return
    if (videoPlaying) { videoRef.current.pause(); setVideoPlaying(false) }
    else { videoRef.current.play(); setVideoPlaying(true) }
  }

  return (
    <>
      <Head>
        <title>St. Kateri Thunder Robotics</title>
        <meta name="description" content="St. Kateri Thunder Robotics Team — Where Innovation Meets Competition." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #05050f 55%, #08081a 100%)',
      }}>
        {/* Animated grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,179,179,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,179,179,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 8s linear infinite',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)',
        }} />
        <div className="glow-orb" style={{ width: '600px', height: '600px', top: '-15%', left: '-10%', background: 'rgba(0,179,179,0.07)', animationDelay: '0s' }} />
        <div className="glow-orb" style={{ width: '400px', height: '400px', bottom: '0', right: '0', background: 'rgba(0,179,179,0.04)', animationDelay: '2s' }} />
        <Particles />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '110px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'center' }} className="hero-grid">
            <div style={{ maxWidth: '780px' }}>
              <div className="animate-fade-in delay-1" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                border: '1px solid rgba(0,179,179,0.3)', padding: '6px 16px', marginBottom: '28px',
                background: 'rgba(0,179,179,0.06)',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00b3b3', animation: 'pulse-teal 2s infinite' }} />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00b3b3' }}>
                  St. Kateri Thunder Robotics
                </span>
              </div>

              <h1 className="animate-fade-up delay-2" style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: 'clamp(52px, 9vw, 112px)', fontWeight: 800,
                lineHeight: 0.93, textTransform: 'uppercase', letterSpacing: '0.01em', color: '#e8f0f0',
              }}>
                Where<br />
                <span style={{
                  background: 'linear-gradient(90deg, #00b3b3, #00e5e5, #00b3b3)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>Innovation</span><br />
                Meets<br />
                Competition.
              </h1>

              <p className="animate-fade-up delay-3" style={{ marginTop: '36px', fontSize: '18px', color: '#4a4a78', maxWidth: '460px', lineHeight: 1.8 }}>
                A team driven by curiosity, built on collaboration, and defined by results.
              </p>

              <div className="animate-fade-up delay-4" style={{ marginTop: '44px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#about" className="btn"><span>Learn More</span><span>↓</span></a>
                <a href="mailto:skthunderrobotics@gmail.com" className="btn" style={{ borderColor: 'rgba(232,240,240,0.15)', color: '#e8f0f0' }}>
                  <span>Contact Us</span>
                </a>
              </div>
            </div>

            {/* Hero logo */}
            <div className="animate-fade-in delay-3" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} >
              <img
                src="/team-logo.png"
                alt="Thunder Robotics Logo"
                style={{
                  width: 'clamp(180px, 22vw, 320px)',
                  filter: 'drop-shadow(0 0 40px rgba(0,179,179,0.35))',
                  animation: 'float 5s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="animate-fade-in delay-6" style={{
          position: 'absolute', bottom: '44px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#2e2e55', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '52px', background: 'linear-gradient(to bottom, #00b3b3, transparent)' }} />
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" className="section" style={{ background: '#080818', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: '500px', height: '500px', top: '50%', right: '-15%', transform: 'translateY(-50%)', background: 'rgba(0,179,179,0.05)', animationDelay: '1s' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="about-grid">
            <div>
              <p className="section-label reveal-left">Why We Are Such a Strong Team</p>
              <h2 className="section-title reveal-left delay-1">Built<br />Different.</h2>
              <div className="section-line reveal-left delay-2" />
              <p className="reveal-left delay-2" style={{ color: '#4a4a78', lineHeight: 1.85, marginBottom: '20px' }}>
                Our robotics team stands out because of our collaboration, dedication, and shared passion for learning. We support one another through challenges, communicate effectively, and stay committed to improving both our robot and ourselves.
              </p>
              <p className="reveal-left delay-3" style={{ color: '#4a4a78', lineHeight: 1.85 }}>
                By combining technical skills with creativity and teamwork, we consistently work toward excellence and represent our school with pride.
              </p>
              <a href="#video" className="btn reveal-left delay-4" style={{ marginTop: '36px', display: 'inline-flex' }}>
                <span>Watch Our Video</span><span>▶</span>
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { icon: '⚡', title: 'Strong Teamwork', desc: 'We communicate clearly, respect different ideas, and solve problems together efficiently.' },
                { icon: '🔧', title: 'Diverse Skills', desc: 'Programming, building, design, and strategy — we bring it all together.' },
                { icon: '💪', title: 'Dedication', desc: 'We put in the time and effort to practice, improve, and meet every deadline.' },
                { icon: '🎯', title: 'Positive Mindset', desc: 'We learn from mistakes, stay motivated, and always look for ways to grow.' },
              ].map((card, i) => (
                <div key={card.title} className={`reveal-scale delay-${i+1}`} style={{
                  background: '#0b0b1e', border: '1px solid rgba(0,179,179,0.1)',
                  padding: '26px 22px',
                  transition: 'border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,179,179,0.5)'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,179,179,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0,179,179,0.1)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '14px' }}>{card.icon}</div>
                  <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '17px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#e8f0f0', marginBottom: '8px' }}>{card.title}</h3>
                  <p style={{ fontSize: '13px', color: '#3a3a60', lineHeight: 1.75 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CREATIVITY BAND ══════════════ */}
      <section style={{ background: '#00b3b3', padding: '110px 0', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'Barlow Condensed, sans-serif', fontSize: '220px', fontWeight: 800,
          color: 'rgba(0,0,0,0.07)', lineHeight: 1, userSelect: 'none', letterSpacing: '-0.05em',
        }}>BUILD</div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '16px' }} className="reveal">Problem-Solving Through Design</p>
            <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.02, textTransform: 'uppercase', color: '#05050f', marginBottom: '24px' }} className="reveal delay-1">
              Creativity Is At The Heart of Everything We Do.
            </h2>
            <div style={{ width: '60px', height: '3px', background: '#05050f', marginBottom: '28px' }} className="reveal delay-2" />
            <p style={{ color: 'rgba(0,0,0,0.68)', lineHeight: 1.85, marginBottom: '36px' }} className="reveal delay-2">
              From brainstorming unique design solutions to developing efficient code and strategic game plans, our members are encouraged to think outside the box. Robotics challenges us to combine imagination with logic, turning ideas into real, working machines.
            </p>
            <a href="#video" className="reveal delay-3" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: '16px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: '#05050f',
              border: '2px solid #05050f', padding: '14px 32px',
              transition: 'background 0.35s ease, color 0.35s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#05050f'; e.currentTarget.style.color='#00b3b3'; }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#05050f'; }}
            >Watch Our Story →</a>
          </div>
        </div>
      </section>

      {/* ══════════════ VIDEO ══════════════ */}
      <section id="video" style={{ background: '#05050f', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: '700px', height: '700px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(0,179,179,0.04)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p className="section-label reveal">See Us In Action</p>
            <h2 className="section-title reveal delay-1">Fueling Future<br /><span style={{ color: '#00b3b3' }}>Innovators.</span></h2>
            <div className="section-line centered reveal delay-2" />
          </div>
          <div className="reveal-scale delay-2" style={{ position: 'relative', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{
              position: 'absolute', inset: '-2px',
              background: 'linear-gradient(135deg, #00b3b3, transparent 50%, #00b3b3)',
              borderRadius: '4px', animation: 'borderPulse 3s ease-in-out infinite', zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1, background: '#05050f' }}>
              <video ref={videoRef} style={{ width: '100%', display: 'block', maxHeight: '520px', objectFit: 'cover' }}
                onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)}
                controls playsInline
              >
                <source src="/team-video.mp4" type="video/mp4" />
              </video>
              {!videoPlaying && (
                <div onClick={toggleVideo} style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', background: 'rgba(5,5,15,0.55)',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(5,5,15,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(5,5,15,0.55)'}
                >
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    border: '2px solid #00b3b3', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,179,179,0.15)', animation: 'pulse-teal 2.5s ease-in-out infinite',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
                  >
                    <div style={{ width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: '30px solid #00b3b3', marginLeft: '6px' }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section style={{ background: '#080818', padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
        <Particles />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label reveal">We Take Pride in Our Numbers</p>
            <h2 className="section-title reveal delay-1">The Results<br />Speak for Themselves.</h2>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2px', background: 'rgba(0,179,179,0.08)',
          }}>
            <StatItem num="25" label="Members" suffix="+" delay={0} />
            <StatItem num="4" label="Teams" suffix="+" delay={0.1} />
            {/* Skills Ontario achievement spans full width on its own */}
            <div style={{
              background: '#080818', padding: '52px 32px', textAlign: 'center',
              borderBottom: '2px solid transparent',
              transition: 'border-color 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderBottomColor='#00b3b3'; e.currentTarget.style.background='#0b0b1e'; }}
            onMouseLeave={e => { e.currentTarget.style.borderBottomColor='transparent'; e.currentTarget.style.background='#080818'; }}
            className="reveal"
            >
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800, color: '#00b3b3', lineHeight: 1.1, letterSpacing: '-0.01em',
              }}>
                Skills Ontario
              </div>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px',
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a60', marginTop: '10px',
              }}>Qualified — Year One</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ SPONSORS ══════════════ */}
      <section id="sponsors" className="section" style={{ background: '#05050f', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb" style={{ width: '600px', height: '600px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(0,179,179,0.05)', animationDelay: '0.5s' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <p className="section-label reveal">Our Partners</p>
            <h2 className="section-title reveal delay-1">Backed By<br /><span style={{ color: '#00b3b3' }}>The Best.</span></h2>
            <div className="section-line centered reveal delay-2" />
          </div>

          {/* Diamond sponsor badge */}
          <div className="reveal delay-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: 'linear-gradient(135deg, rgba(0,179,179,0.15), rgba(0,179,179,0.05))',
              border: '1px solid rgba(0,179,179,0.4)',
              padding: '10px 24px',
            }}>
              {/* Diamond icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,9 18,22 6,22 2,9" stroke="#00b3b3" strokeWidth="1.5" fill="rgba(0,179,179,0.2)" />
              </svg>
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px',
                fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00b3b3',
              }}>Diamond Sponsor</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,9 18,22 6,22 2,9" stroke="#00b3b3" strokeWidth="1.5" fill="rgba(0,179,179,0.2)" />
              </svg>
            </div>
          </div>

          {/* TotalEnergies card */}
          <div className="reveal-scale delay-2" style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{
              border: '1px solid rgba(0,179,179,0.25)',
              background: '#0b0b1e', padding: '56px 48px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(0,179,179,0.15)'; e.currentTarget.style.borderColor='rgba(0,179,179,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(0,179,179,0.25)'; }}
            >
              {/* Corner accents */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '44px', height: '44px', borderTop: '2px solid #00b3b3', borderLeft: '2px solid #00b3b3' }} />
              <div style={{ position: 'absolute', top: 0, right: 0, width: '44px', height: '44px', borderTop: '2px solid #00b3b3', borderRight: '2px solid #00b3b3' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '44px', height: '44px', borderBottom: '2px solid #00b3b3', borderLeft: '2px solid #00b3b3' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '44px', height: '44px', borderBottom: '2px solid #00b3b3', borderRight: '2px solid #00b3b3' }} />

              {/* Logo */}
              <div style={{
                width: '200px', height: '160px', background: '#ffffff',
                borderRadius: '10px', padding: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 50px rgba(0,179,179,0.2)',
              }}>
                <img src="/totalenergies-logo.jpg" alt="TotalEnergies" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: '34px', fontWeight: 800,
                  textTransform: 'uppercase', letterSpacing: '0.06em', color: '#e8f0f0', marginBottom: '14px',
                }}>TotalEnergies</h3>
                <p style={{ color: '#3a3a60', lineHeight: 1.85, maxWidth: '420px', fontSize: '15px' }}>
                  A global multi-energy company and proud Diamond Sponsor of St. Kateri Thunder Robotics — helping us fuel the next generation of innovators and engineers.
                </p>
              </div>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                border: '1px solid rgba(0,179,179,0.3)', padding: '8px 22px',
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px',
                letterSpacing: '0.2em', textTransform: 'uppercase', color: '#00b3b3',
                background: 'rgba(0,179,179,0.06)',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00b3b3', animation: 'pulse-teal 2s infinite' }} />
                Official Diamond Partner
              </div>
            </div>
          </div>

          <p className="reveal delay-4" style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px', color: '#2e2e55', fontStyle: 'italic' }}>
            Interested in sponsoring?{' '}
            <a href="mailto:skthunderrobotics@gmail.com" style={{ color: '#00b3b3', textDecoration: 'underline' }}>Get in touch →</a>
          </p>
        </div>
      </section>

      {/* ══════════════ CONTACT / CTA ══════════════ */}
      <section id="contact" style={{
        background: '#080818',
        borderTop: '1px solid rgba(0,179,179,0.12)',
        padding: '110px 0', position: 'relative', overflow: 'hidden',
      }}>
        <div className="glow-orb" style={{ width: '800px', height: '800px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(0,179,179,0.04)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="contact-grid">
            {/* Left: text */}
            <div>
              <p className="section-label reveal-left">Get In Touch</p>
              <h2 className="section-title reveal-left delay-1">Partner With<br /><span style={{ color: '#00b3b3' }}>Thunder Robotics.</span></h2>
              <div className="section-line reveal-left delay-2" />
              <p className="reveal-left delay-2" style={{ color: '#4a4a78', lineHeight: 1.85, marginBottom: '32px' }}>
                Our experiences have shaped us into a reliable and professional team. Through robotics, we've learned how to work with others, manage resources, and represent partners with pride and respect.
              </p>
              <div className="reveal-left delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: '✉', label: 'Email', value: 'skthunderrobotics@gmail.com', href: 'mailto:skthunderrobotics@gmail.com' },
                  { icon: '📞', label: 'Phone', value: '905-634-1835', href: 'tel:9056341835' },
                  { icon: '📍', label: 'Address', value: '1125 Kennedy Circle East, Milton ON L9E 1B4', href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px', height: '40px', minWidth: '40px',
                      border: '1px solid rgba(0,179,179,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', background: 'rgba(0,179,179,0.06)',
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#3a3a60', marginBottom: '2px' }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: '15px', color: '#e8f0f0', transition: 'color 0.2s ease' }}
                            onMouseEnter={e => e.target.style.color='#00b3b3'}
                            onMouseLeave={e => e.target.style.color='#e8f0f0'}
                          >{item.value}</a>
                        : <span style={{ fontSize: '15px', color: '#4a4a78' }}>{item.value}</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: email form */}
            <div className="reveal-right delay-1">
              <div style={{
                background: '#0b0b1e', border: '1px solid rgba(0,179,179,0.15)',
                padding: '40px 36px',
              }}>
                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8f0f0', marginBottom: '28px' }}>
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '56px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                <img src="/team-logo.png" alt="Thunder Robotics" style={{ height: '52px', width: '52px', objectFit: 'contain' }} />
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '16px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Thunder Robotics</span>
              </div>
              <p style={{ fontSize: '14px', color: '#3a3a60', lineHeight: 1.75, marginBottom: '16px' }}>
                St. Kateri Thunder Robotics Team<br />Where Innovation Meets Competition.
              </p>
              <p style={{ fontSize: '14px', color: '#2e2e55' }}>905-634-1835</p>
              <p style={{ fontSize: '14px', color: '#2e2e55' }}>1125 Kennedy Circle East</p>
              <p style={{ fontSize: '14px', color: '#2e2e55' }}>Milton ON L9E 1B4</p>
            </div>

            {/* Links */}
            <div>
              <h4 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00b3b3', marginBottom: '20px' }}>Navigation</h4>
              {['About', 'Sponsors', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{
                  display: 'block', fontSize: '14px', color: '#2e2e55', marginBottom: '10px',
                  transition: 'color 0.2s ease, padding-left 0.2s ease',
                }}
                onMouseEnter={e => { e.target.style.color='#e8f0f0'; e.target.style.paddingLeft='6px'; }}
                onMouseLeave={e => { e.target.style.color='#2e2e55'; e.target.style.paddingLeft='0'; }}
                >{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#00b3b3', marginBottom: '20px' }}>Contact</h4>
              <a href="mailto:skthunderrobotics@gmail.com" style={{
                display: 'block', fontSize: '14px', color: '#2e2e55', marginBottom: '10px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.target.style.color='#00b3b3'}
              onMouseLeave={e => e.target.style.color='#2e2e55'}
              >skthunderrobotics@gmail.com</a>
              <a href="tel:9056341835" style={{ display: 'block', fontSize: '14px', color: '#2e2e55', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.target.style.color='#00b3b3'}
              onMouseLeave={e => e.target.style.color='#2e2e55'}
              >905-634-1835</a>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '32px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
          }}>
            <p style={{ fontSize: '13px', color: '#1e1e3a' }}>© 2025 St. Kateri Thunder Robotics Team. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Twitter/X', 'Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{ fontSize: '13px', color: '#1e1e3a', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.target.style.color='#00b3b3'}
                onMouseLeave={e => e.target.style.color='#1e1e3a'}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .about-grid, .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </>
  )
}

/* ── Contact form component ─────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields before sending.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Message from ${form.name} — Thunder Robotics Website`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    const mailto = `mailto:skthunderrobotics@gmail.com?subject=${subject}&body=${body}`

    // Create a hidden anchor and click it — most reliable cross-browser method
    const a = document.createElement('a')
    a.href = mailto
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setSent(true)
  }

  const inputStyle = {
    width: '100%', background: '#080818',
    border: '1px solid rgba(255,255,255,0.07)',
    padding: '13px 16px', color: '#e8f0f0',
    fontFamily: 'Barlow, sans-serif', fontSize: '14px', outline: 'none',
    transition: 'border-color 0.2s ease', marginBottom: '14px',
    display: 'block', boxSizing: 'border-box',
  }

  if (sent) return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <div style={{ fontSize: '44px', marginBottom: '16px', color: '#00b3b3' }}>✓</div>
      <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '22px', color: '#00b3b3', fontWeight: 700, marginBottom: '8px' }}>
        Your email app should be open!
      </p>
      <p style={{ fontSize: '14px', color: '#3a3a60', lineHeight: 1.7 }}>
        Your message is pre-filled. Just hit send<br />in your email client to reach us.
      </p>
      <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
        style={{
          marginTop: '24px', background: 'transparent', border: '1px solid rgba(0,179,179,0.4)',
          color: '#00b3b3', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '14px',
          fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '10px 24px', cursor: 'pointer', transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => e.target.style.background='rgba(0,179,179,0.1)'}
        onMouseLeave={e => e.target.style.background='transparent'}
      >Send Another</button>
    </div>
  )

  return (
    <div>
      <input
        type="text" placeholder="Your name" value={form.name}
        onChange={e => setForm(f => ({...f, name: e.target.value}))}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor='rgba(0,179,179,0.5)'}
        onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.07)'}
      />
      <input
        type="email" placeholder="Your email" value={form.email}
        onChange={e => setForm(f => ({...f, email: e.target.value}))}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor='rgba(0,179,179,0.5)'}
        onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.07)'}
      />
      <textarea
        placeholder="Your message..." value={form.message} rows={5}
        onChange={e => setForm(f => ({...f, message: e.target.value}))}
        style={{...inputStyle, resize: 'vertical', marginBottom: '8px'}}
        onFocus={e => e.target.style.borderColor='rgba(0,179,179,0.5)'}
        onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.07)'}
      />
      {error && (
        <p style={{ fontSize: '13px', color: '#ff6b6b', marginBottom: '12px' }}>{error}</p>
      )}
      <button onClick={handleSubmit} style={{
        width: '100%', background: '#00b3b3', border: 'none', color: '#05050f',
        fontFamily: 'Barlow Condensed, sans-serif', fontSize: '16px', fontWeight: 700,
        letterSpacing: '0.1em', textTransform: 'uppercase', padding: '15px',
        cursor: 'pointer', transition: 'background 0.2s ease', marginTop: '8px',
      }}
      onMouseEnter={e => e.target.style.background='#008a8a'}
      onMouseLeave={e => e.target.style.background='#00b3b3'}
      >Send Message →</button>
      <p style={{ fontSize: '12px', color: '#2e2e55', marginTop: '12px', textAlign: 'center', lineHeight: 1.6 }}>
        Clicking Send will open your email app with your message pre-filled.
      </p>
    </div>
  )
}
