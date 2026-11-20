import { useState, type FormEvent } from 'react'

const projects = [
  {
    number: '01',
    type: 'RESEARCH · SOFTWARE RELIABILITY',
    title: 'Predictive Software Reliability',
    description: 'Research into machine-learning approaches for predicting software reliability in public ICT systems, with a focus on practical relevance to Sierra Leone.',
    stack: ['Python', 'Machine Learning', 'Scikit-learn'],
    status: 'RESEARCH PROJECT'
  },
  {
    number: '02',
    type: 'BACKEND · RECRUITMENT',
    title: 'HR Recruitment Platform',
    description: 'A backend-focused recruitment system concept covering secure authentication and applicant screening workflows.',
    stack: ['Java', 'Spring Boot', 'REST API'],
    status: 'IN DEVELOPMENT'
  },
  {
    number: '03',
    type: 'WEB PLATFORM · COMMUNITY',
    title: 'Salone Connect',
    description: 'A community platform prototype exploring user accounts, media uploads, and API-driven interactions.',
    stack: ['Node.js', 'PostgreSQL', 'JWT', 'Cloudinary'],
    status: 'PROTOTYPE'
  }
]

const skills = [
  { group: 'BACKEND ENGINEERING', items: ['Java', 'Spring Boot', 'REST API design', 'Node.js', 'Python'] },
  { group: 'DATA & STORAGE', items: ['PostgreSQL', 'MySQL', 'SQL', 'Data modelling'] },
  { group: 'FRONTEND', items: ['React', 'TypeScript', 'Angular', 'HTML & CSS'] },
  { group: 'ENGINEERING PRACTICE', items: ['Secure authentication', 'Software testing', 'Machine learning', 'System support'] }
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const email = import.meta.env.VITE_CONTACT_EMAIL as string | undefined
  const apiBase = import.meta.env.VITE_API_BASE_URL as string | undefined

  const copyEmail = async () => {
    if (!email) return
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:' + email
    }
  }

  const closeMenu = () => setMenuOpen(false)

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!apiBase) {
      setFormState('error')
      return
    }
    setFormState('sending')
    try {
      const response = await fetch(apiBase + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!response.ok) throw new Error('Message could not be sent')
      setForm({ name: '', email: '', message: '' })
      setFormState('success')
    } catch {
      setFormState('error')
    }
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">KJ</span><span>JUSU<span className="brand-dot">.</span></span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          {['About', 'Expertise', 'Projects', 'Research', 'Contact'].map(item => <a key={item} href={'#' + item.toLowerCase()} onClick={closeMenu}>{item}</a>)}
          <a className="nav-cta" href="https://github.com/karimjusu" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-pulse" /> SOFTWARE ENGINEER · F​​REETOWN, SIERRA LEONE</div>
            <h1>Building software<br />with <span className="gradient-text">purpose.</span></h1>
            <p className="hero-lede">I’m Abdul-Karim Jusu — a software engineer interested in dependable backend systems, thoughtful product development, and technology that solves real problems.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span>↘</span></a>
              <a className="button button-quiet" href="#contact">Let’s connect <span>↗</span></a>
              <a className="button button-quiet" href="/Abdul-Karim-Jusu-Resume.pdf" download="Abdul-Karim-Jusu-Resume.pdf">Download My CV <span>↓</span></a>
            </div>
            <div className="hero-meta"><span><i className="meta-line" /> OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES</span><span>01 / 04</span></div>
          </div>
          <div className="hero-art hero-photo-wrap">
            <div className="photo-orbit photo-orbit-a" />
            <div className="photo-orbit photo-orbit-b" />
            <div className="profile-photo-frame">
              <img
                className="profile-photo"
                src={`${import.meta.env.BASE_URL}jusu-profile.jpg?v=20261120-1`}
                alt="Professional portrait of Abdul-Karim Jusu"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="float-chip chip-top">⌘ <span>Software Engineer</span></div>
            <div className="float-chip chip-bottom"><span className="chip-icon">↗</span><span>Ideas into systems</span></div>
          </div>
          <div className="hero-index"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div>
        </section>

        <section className="intro-strip">
          <div className="section-wrap strip-inner"><span className="strip-label">MY APPROACH</span><p>Curiosity in the details. <em>Clarity in the architecture.</em> Care in the outcome.</p><span className="strip-symbol">✳</span></div>
        </section>

        <section className="content-section section-wrap" id="about">
          <div className="section-heading"><span className="eyebrow">01 — A LITTLE ABOUT ME</span><h2>Engineering for<br /><span className="muted-heading">what matters.</span></h2></div>
          <div className="about-grid">
            <div className="about-main"><p className="large-copy">I enjoy turning complex requirements into software that is understandable, maintainable, and useful.</p><p>My background combines computer science, software engineering, and hands-on ICT experience. I’m especially drawn to backend development: designing APIs, working with data, and building the foundations that make digital products dependable.</p><p>I’m based in Freetown, Sierra Leone, and interested in contributing to teams building meaningful technology across the region and beyond.</p></div>
            <div className="about-facts">
              <div className="fact"><span className="fact-label">CURRENT BASE</span><strong>Freetown, SL</strong><span>West Africa · GMT</span></div>
              <div className="fact"><span className="fact-label">EDUCATION</span><strong>MEng, Software Engineering</strong><span>Nankai University · 2026</span></div>
              <div className="fact"><span className="fact-label">FOUNDATION</span><strong>BSc, Computer Science</strong><span>University of Makeni · 2022</span></div>
              <div className="fact"><span className="fact-label">INTERESTS</span><strong>Backend · Reliability · AI</strong><span>Secure and useful systems</span></div>
            </div>
          </div>
        </section>

        <section className="content-section expertise-section" id="expertise">
          <div className="section-wrap">
            <div className="section-heading heading-row"><div><span className="eyebrow">02 — TECHNICAL TOOLKIT</span><h2>Tools for the <span className="muted-heading">work.</span></h2></div><p className="heading-note">A growing toolkit shaped by study, projects, and practical problem-solving.</p></div>
            <div className="skills-grid">{skills.map((group, index) => <article className="skill-card" key={group.group}><div className="skill-card-top"><span>0{index + 1}</span><span>↗</span></div><h3>{group.group}</h3><div className="skill-tags">{group.items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <div className="section-heading heading-row"><div><span className="eyebrow">03 — SELECTED WORK</span><h2>Projects & <span className="muted-heading">experiments.</span></h2></div><span className="section-count">A FEW THINGS I’VE WORKED ON</span></div>
          <div className="project-list">{projects.map(project => <article className="project-card" key={project.number}><div className="project-number">{project.number}</div><div className="project-body"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="project-side"><span className="project-status">{project.status}</span><span className="project-arrow">↗</span></div></article>)}</div>
          <p className="project-note">Project descriptions reflect work and prototypes at different stages. More details and source links will be added as each project is prepared for public release.</p>
        </section>

        <section className="research-section" id="research"><div className="section-wrap research-inner"><div><span className="eyebrow">04 — RESEARCH INTEREST</span><h2>Making software<br /><span className="gradient-text">more predictable.</span></h2></div><div className="research-copy"><span className="research-kicker">MASTER’S RESEARCH · 2026</span><h3>Predictive Software Reliability for Public ICT Systems in Sierra Leone</h3><p>My master’s research explored how machine-learning techniques can support software reliability prediction. The work brought together software quality, empirical evaluation, and the practical need for dependable public digital systems.</p><div className="research-methods"><span>SOFTWARE METRICS</span><span>SUPERVISED LEARNING</span><span>RELIABILITY ENGINEERING</span></div></div></div></section>

        <section className="content-section section-wrap contact-section" id="contact">
          <span className="eyebrow">05 — START A CONVERSATION</span>
          <div className="contact-layout"><div><h2>Have a problem<br />worth <span className="gradient-text">solving?</span></h2><p className="contact-lede">I’m open to discussing software engineering roles, collaborations, and ideas where thoughtful technology can make a difference.</p></div><div className="contact-panel"><span className="contact-panel-label">SEND A MESSAGE</span><form className="contact-form" onSubmit={submitContact}><label>Your name<input required maxLength={100} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Jane Doe" /></label><label>Email address<input required type="email" maxLength={180} value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="jane@example.com" /></label><label>What would you like to discuss?<textarea required minLength={10} maxLength={2000} rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell me a little about your idea..." /></label><button className="send-button" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : 'Send message ↗'}</button>{formState === 'success' && <p className="form-feedback success">Thanks — your message has been received.</p>}{formState === 'error' && <p className="form-feedback error">Unable to send right now. Please try again later.</p>}</form>{email && <><div className="contact-rule" /><a className="contact-email" href={'mailto:' + email}>{email} ↗</a><button className="copy-button" onClick={copyEmail}>{copied ? 'Copied to clipboard ✓' : 'Copy email address +'}</button></>}<a className="social-link" href="https://github.com/karimjusu" target="_blank" rel="noreferrer">GitHub profile <span>↗</span></a><div className="contact-rule" /><span className="contact-location">FREETOWN, SIERRA LEONE · GMT</span></div></div>
        </section>
      </main>

      <footer className="footer"><div className="section-wrap footer-inner"><a className="brand" href="#home"><span className="brand-mark">KJ</span><span>JUSU<span className="brand-dot">.</span></span></a><span>Designed with intention. Built to keep improving.</span><span>© {new Date().getFullYear()} ABDUL-KARIM JUSU</span></div></footer>
    </div>
  )
}

export default App