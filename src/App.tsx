import { useEffect, useRef, useState } from 'react'
import './App.css'

const TECH_STACK = [
  { name: 'React 19', desc: 'UI 라이브러리', color: '#61dafb' },
  { name: 'TypeScript', desc: '타입 안전성', color: '#3178c6' },
  { name: 'Vite 6', desc: '초고속 빌드', color: '#bd34fe' },
  { name: 'GitHub Actions', desc: '자동 배포', color: '#7c6fef' },
]

const FEATURES = [
  { icon: '⚡', title: 'Lightning Fast', desc: 'Vite HMR로 즉각적인 개발 피드백' },
  { icon: '🔒', title: 'Type Safe', desc: 'TypeScript로 컴파일 타임 오류 감지' },
  { icon: '🚀', title: 'Auto Deploy', desc: 'main 브랜치 push시 자동 GitHub Pages 배포' },
  { icon: '🎨', title: 'Modern UI', desc: '현대적인 디자인 시스템과 반응형 레이아웃' },
]

function GlowOrb({ x, y, color }: { x: string; y: string; color: string }) {
  return (
    <div
      className="glow-orb"
      style={{ left: x, top: y, background: color }}
    />
  )
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 30)
    return () => clearInterval(timer)
  }, [target])
  return <span>{count}</span>
}

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20

  return (
    <div className={`app ${mounted ? 'mounted' : ''}`}>
      {/* Background orbs */}
      <GlowOrb x="10%" y="20%" color="rgba(124,111,239,0.15)" />
      <GlowOrb x="80%" y="10%" color="rgba(239,111,158,0.12)" />
      <GlowOrb x="60%" y="70%" color="rgba(111,239,205,0.10)" />

      {/* Cursor follower */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">
          <span className="logo-bracket">[</span>
          ACTFAGIPLF
          <span className="logo-bracket">]</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#stack">Stack</a>
          <a href="https://github.com/a71143055/ACTFAGIPLF" target="_blank" rel="noopener noreferrer" className="nav-cta">
            GitHub →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <div
          className="hero-inner"
          style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)` }}
        >
          <div className="hero-badge">React + TypeScript + Vite</div>
          <h1 className="hero-title">
            <span className="line line-1">빠르게 만들고</span>
            <span className="line line-2">
              자동으로 <em>배포</em>
            </span>
          </h1>
          <p className="hero-desc">
            GitHub Actions CI/CD 파이프라인이 내장된<br />
            모던 React 웹 플랫폼 스타터
          </p>
          <div className="hero-actions">
            <a
              href="https://github.com/a71143055/ACTFAGIPLF"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              저장소 보기
            </a>
            <a href="#stack" className="btn btn-ghost">스택 살펴보기</a>
          </div>
        </div>

        {/* Floating code snippet */}
        <div
          className="code-card"
          style={{ transform: `translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px)` }}
        >
          <div className="code-header">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <span className="code-filename">deploy.yml</span>
          </div>
          <pre className="code-body">{`on:
  push:
    branches: [main]

jobs:
  deploy:
    uses: actions/
      deploy-pages@v4`}</pre>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line" />
          <span>scroll</span>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat">
          <div className="stat-num"><Counter target={0} />ms</div>
          <div className="stat-label">HMR 반응 시간</div>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <div className="stat-num"><Counter target={100} />%</div>
          <div className="stat-label">자동화 배포</div>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <div className="stat-num"><Counter target={4} />개</div>
          <div className="stat-label">핵심 기술 스택</div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-label">/ 특징</span>
          <h2>왜 이 스택인가?</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="stack" id="stack">
        <div className="section-header">
          <span className="section-label">/ 기술 스택</span>
          <h2>구성 요소</h2>
        </div>
        <div className="stack-grid">
          {TECH_STACK.map((t, i) => (
            <div className="stack-card" key={i}>
              <div className="stack-dot" style={{ background: t.color }} />
              <div className="stack-info">
                <div className="stack-name">{t.name}</div>
                <div className="stack-desc">{t.desc}</div>
              </div>
              <div className="stack-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* Deploy Guide */}
      <section className="guide">
        <div className="section-header">
          <span className="section-label">/ 시작하기</span>
          <h2>3단계 배포</h2>
        </div>
        <div className="steps">
          {[
            { num: '01', title: '저장소 클론', code: 'git clone https://github.com/a71143055/ACTFAGIPLF' },
            { num: '02', title: '의존성 설치', code: 'npm install' },
            { num: '03', title: 'main 브랜치에 push', code: 'git push origin main  # 자동 배포!' },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.num}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <code>{s.code}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">[ACTFAGIPLF]</span>
          <span className="footer-copy">Built with React + Vite · Deployed on GitHub Pages</span>
          <a href="https://github.com/a71143055/ACTFAGIPLF" target="_blank" rel="noopener noreferrer">
            a71143055 ↗
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
