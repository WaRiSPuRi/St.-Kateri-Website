import Head from 'next/head'
import Navbar from '../components/Navbar'
import useScrollReveal from '../components/useScrollReveal'
import { useState } from 'react'

export default function Home() {
  useScrollReveal()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <>
      <Head>
        <title>St. Kateri Thunder Robotics</title>
        <meta name="description" content="St. Kateri Thunder Robotics Team — Where Innovation Meets Competition." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0c0f 60%, #111418 100%)',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245,200,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,200,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245,200,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '100px' }}>
          <div style={{ maxWidth: '800px' }}>
            <p className="section-label animate-fade-up delay-1" style={{ marginBottom: '20px' }}>
              St. Kateri Thunder Robotics Team
            </p>
            <h1 className="animate-fade-up delay-2" style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(52px, 9vw, 110px)',
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
              color: '#f5f6f0',
            }}>
              Where<br />
              <span style={{ color: '#f5c800' }}>Innovation</span><br />
              Meets<br />
              Competition.
            </h1>
            <p className="animate-fade-up delay-3" style={{
              marginTop: '32px',
              fontSize: '18px',
              color: '#8a8f9e',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}>
              A team driven by curiosity, built on collaboration, and defined by results.
            </p>
            <div className="animate-fade-up delay-4" style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#about" className="btn">
                <span>Learn More</span>
                <span>↓</span>
              </a>
              <a href="#contact" className="btn" style={{ borderColor: 'rgba(245,246,240,0.2)', color: '#f5f6f0' }}>
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeIn 1s 1.2s both',
        }}>
          <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#5a5f6e', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, rgba(245,200,0,0.6), transparent)',
            animation: 'fadeIn 1s 1.5s both',
          }} />
        </div>
      </section>

      {/* ═══════════════════════════════════ ABOUT ═══════════════════════════════════ */}
      <section id="about" className="section" style={{ background: '#0d0f13' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <p className="section-label reveal">Why We Are Such a Strong Team</p>
              <h2 className="section-title reveal delay-1">Built Different.</h2>
              <div className="section-line reveal delay-2" />
              <p className="reveal delay-2" style={{ color: '#8a8f9e', lineHeight: 1.8, marginBottom: '24px' }}>
                Our robotics team stands out because of our collaboration, dedication, and shared passion for learning. We support one another through challenges, communicate effectively, and stay committed to improving both our robot and ourselves.
              </p>
              <p className="reveal delay-3" style={{ color: '#8a8f9e', lineHeight: 1.8 }}>
                By combining technical skills with creativity and teamwork, we consistently work toward excellence and represent our club with pride.
              </p>
              <a href="#teams" className="btn reveal delay-4" style={{ marginTop: '32px', display: 'inline-flex' }}>
                <span>Meet The Teams</span>
                <span>→</span>
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { icon: '⚡', title: 'Strong Teamwork', desc: 'We communicate clearly, respect different ideas, and work together to solve problems efficiently.' },
                { icon: '🔧', title: 'Diverse Skills', desc: 'Our team brings together strengths in programming, building, design, and strategy.' },
                { icon: '💪', title: 'Dedication', desc: 'We put in the time and effort needed to practice, improve, and meet deadlines.' },
                { icon: '🎯', title: 'Positive Mindset', desc: 'We learn from mistakes, stay motivated, and always look for ways to improve.' },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={`reveal delay-${i + 1}`}
                  style={{
                    background: '#1a1d22',
                    border: '1px solid rgba(245,200,0,0.1)',
                    padding: '24px 20px',
                    transition: 'border-color 0.3s ease, transform 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,200,0,0.4)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,200,0,0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>{card.icon}</div>
                  <h3 style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#f5f6f0',
                    marginBottom: '8px',
                  }}>{card.title}</h3>
                  <p style={{ fontSize: '14px', color: '#5a5f6e', lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ DESIGN SECTION ═══════════════════════════════════ */}
      <section style={{
        background: '#f5c800',
        padding: '100px 0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          right: '-100px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Barlow Condensed, sans-serif',
          fontSize: '240px',
          fontWeight: 800,
          color: 'rgba(0,0,0,0.06)',
          lineHeight: 1,
          userSelect: 'none',
          letterSpacing: '-0.05em',
        }}>BUILD</div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '600px' }}>
            <p style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.5)',
              marginBottom: '16px',
            }} className="reveal">Problem-Solving Through Design</p>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              color: '#0a0c0f',
              marginBottom: '24px',
            }} className="reveal delay-1">Creativity Is At The Heart of Everything We Do.</h2>
            <div style={{ width: '60px', height: '3px', background: '#0a0c0f', marginBottom: '28px' }} className="reveal delay-2" />
            <p style={{ color: 'rgba(0,0,0,0.7)', lineHeight: 1.8, marginBottom: '32px' }} className="reveal delay-2">
              From brainstorming unique design solutions to developing efficient code and strategic game plans, our members are encouraged to think outside the box. Robotics challenges us to combine imagination with logic, turning ideas into real, working machines through innovation and experimentation.
            </p>
            <a href="#teams" className="reveal delay-3" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0a0c0f',
              border: '2px solid #0a0c0f',
              padding: '14px 32px',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0a0c0f'; e.currentTarget.style.color = '#f5c800'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0c0f'; }}
            >
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ STATS ═══════════════════════════════════ */}
      <section style={{ background: '#0a0c0f', padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label reveal">We Take Pride in Our Numbers</p>
            <h2 className="section-title reveal delay-1">The Results<br />Speak for Themselves.</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2px',
            background: 'rgba(245,200,0,0.1)',
          }}>
            {[
              { num: '28', label: 'Members' },
              { num: '5', label: 'Business Partners' },
              { num: '4', label: 'Teams' },
              { num: '1', label: 'Championship' },
              { num: '0', label: 'Losses' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`reveal delay-${i + 1}`}
                style={{
                  background: '#0a0c0f',
                  padding: '48px 24px',
                  textAlign: 'center',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderBottomColor = '#f5c800'
                  e.currentTarget.style.background = '#111418'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderBottomColor = 'transparent'
                  e.currentTarget.style.background = '#0a0c0f'
                }}
              >
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: 'clamp(56px, 8vw, 88px)',
                  fontWeight: 800,
                  color: '#f5c800',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>{stat.num}</div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#5a5f6e',
                  marginTop: '12px',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ TEAMS ═══════════════════════════════════ */}
      <section id="teams" className="section" style={{ background: '#0d0f13' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label reveal">St. Kateri Thunder Robotics</p>
            <h2 className="section-title reveal delay-1">Our Teams</h2>
            <div className="section-line reveal delay-2" style={{ margin: '20px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { num: '01', name: 'Team Alpha', role: 'Design & Engineering' },
              { num: '02', name: 'Team Beta', role: 'Programming & Strategy' },
              { num: '03', name: 'Team Gamma', role: 'Build & Fabrication' },
              { num: '04', name: 'Team Delta', role: 'Research & Innovation' },
            ].map((team, i) => (
              <div
                key={team.name}
                className={`reveal delay-${i + 1}`}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '36px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(245,200,0,0.5)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '64px',
                  fontWeight: 800,
                  color: 'rgba(245,200,0,0.06)',
                  lineHeight: 1,
                }}>{team.num}</div>
                <div style={{
                  width: '40px',
                  height: '3px',
                  background: '#f5c800',
                  marginBottom: '20px',
                }} />
                <h3 style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#f5f6f0',
                  marginBottom: '8px',
                }}>{team.name}</h3>
                <p style={{
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#5a5f6e',
                }}>{team.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ SPONSORS ═══════════════════════════════════ */}
      <section id="sponsors" className="section" style={{ background: '#0a0c0f' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p className="section-label reveal">Our Partners</p>
            <h2 className="section-title reveal delay-1">Those Who<br />Back Us.</h2>
            <div className="section-line reveal delay-2" style={{ margin: '20px auto 0' }} />
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px',
            background: 'rgba(255,255,255,0.04)',
          }}>
            {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'].map((p, i) => (
              <div
                key={p}
                className={`reveal delay-${i + 1}`}
                style={{
                  flex: '1 1 180px',
                  background: '#0a0c0f',
                  padding: '48px 24px',
                  textAlign: 'center',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#111418'}
                onMouseLeave={e => e.currentTarget.style.background = '#0a0c0f'}
              >
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#373b45',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.color = '#f5c800'}
                onMouseLeave={e => e.target.style.color = '#373b45'}
                >{p}</div>
              </div>
            ))}
          </div>
          <p className="reveal delay-3" style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '14px',
            color: '#5a5f6e',
            fontStyle: 'italic',
          }}>Sponsor logos will appear here once partnerships are confirmed.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════ CTA BANNER ═══════════════════════════════════ */}
      <section id="contact" style={{
        background: '#111418',
        borderTop: '1px solid rgba(245,200,0,0.15)',
        borderBottom: '1px solid rgba(245,200,0,0.15)',
        padding: '100px 0',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label reveal">Ready to Accelerate Your Business?</p>
          <h2 className="section-title reveal delay-1" style={{ maxWidth: '700px', margin: '0 auto' }}>
            Partner With<br />
            <span style={{ color: '#f5c800' }}>Thunder Robotics.</span>
          </h2>
          <div className="section-line reveal delay-2" style={{ margin: '20px auto' }} />
          <p className="reveal delay-2" style={{
            color: '#5a5f6e',
            maxWidth: '560px',
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}>
            Our experiences have shaped us into a reliable and professional team that understands the importance of responsibility, communication, and commitment. Through robotics, we have learned how to work with others, manage resources, and represent partners with pride and respect.
          </p>
          <a href="mailto:info@thunderrobotics.ca" className="btn btn-solid reveal delay-3" style={{ display: 'inline-flex', fontSize: '16px', padding: '16px 40px' }}>
            <span>Get Started Today</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════ FOOTER ═══════════════════════════════════ */}
      <footer>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: '#f5c800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#0a0c0f',
                }}>ST</div>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>Thunder Robotics</span>
              </div>
              <p style={{ fontSize: '14px', color: '#5a5f6e', lineHeight: 1.7, marginBottom: '16px' }}>
                St. Kateri Thunder Robotics Team<br />
                Where Innovation Meets Competition.
              </p>
              <p style={{ fontSize: '14px', color: '#5a5f6e' }}>905-634-1835</p>
              <p style={{ fontSize: '14px', color: '#5a5f6e' }}>1125 Kennedy Circle East</p>
              <p style={{ fontSize: '14px', color: '#5a5f6e' }}>Milton ON L9E 1B4</p>
            </div>

            {/* Links */}
            <div>
              <h4 style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f5c800',
                marginBottom: '20px',
              }}>Solutions</h4>
              {['Vision', 'Programs', 'Blog', 'Get Started'].map(l => (
                <a key={l} href="#" style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#5a5f6e',
                  marginBottom: '10px',
                  transition: 'color 0.2s ease, padding-left 0.2s ease',
                }}
                onMouseEnter={e => { e.target.style.color = '#f5f6f0'; e.target.style.paddingLeft = '6px'; }}
                onMouseLeave={e => { e.target.style.color = '#5a5f6e'; e.target.style.paddingLeft = '0'; }}
                >{l}</a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f5c800',
                marginBottom: '20px',
              }}>Newsletter</h4>
              <p style={{ fontSize: '14px', color: '#5a5f6e', marginBottom: '16px', lineHeight: 1.7 }}>
                Subscribe to stay updated on our latest competitions and news.
              </p>
              {!subscribed ? (
                <div onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      background: '#252830',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      color: '#f5f6f0',
                      fontFamily: 'Barlow, sans-serif',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(245,200,0,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                  <button
                    onClick={handleSubscribe}
                    style={{
                      background: '#f5c800',
                      border: 'none',
                      color: '#0a0c0f',
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={e => e.target.style.background = '#c9a200'}
                    onMouseLeave={e => e.target.style.background = '#f5c800'}
                  >Subscribe</button>
                </div>
              ) : (
                <p style={{ color: '#f5c800', fontSize: '14px' }}>✓ You're subscribed!</p>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <p style={{ fontSize: '13px', color: '#373b45' }}>
              © 2025 St. Kateri Thunder Robotics Team. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Twitter/X', 'Instagram', 'LinkedIn'].map(s => (
                <a key={s} href="#" style={{
                  fontSize: '13px',
                  color: '#373b45',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.color = '#f5c800'}
                onMouseLeave={e => e.target.style.color = '#373b45'}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  )
}
