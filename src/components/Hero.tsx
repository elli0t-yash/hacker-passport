import { useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero({ onCreate, onCrew }: { onCreate: () => void; onCrew: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.parentElement!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
  };

  const handlePointerLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow-label">HACKER HOUSE GOA 2026 // OPEN TRIAL 01</p>
        <h1 className="hero-title">
          DISCOVER
          <br />
          YOUR
          <br />
          BUILDER <span className="accent-text">DNA.</span>
        </h1>
        <p className="hero-copy-text">
          Your tech stack says more about you than your résumé. Turn it into a Builder Identity,
          assemble your crew, and claim your place on the Goa coast.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={onCreate}>
            CREATE MY BUILDER ID <ArrowRight size={16} className="btn-arrow" />
          </button>
          <button className="btn-ghost" onClick={onCrew}>
            BUILD A CREW
          </button>
        </div>
        <div className="hero-stats">
          <span>247 BUILDERS</span>
          <span>4 DAYS</span>
          <span>1 COAST</span>
          <span>SHIP SOMETHING REAL</span>
        </div>
        <div className="hero-coords">
          <span>15.2993&deg; N</span>
          <span>74.1240&deg; E</span>
          <span>GOA // INDIA</span>
        </div>
      </div>

      <div className="hero-visual" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        <div className="hero-visual-glow" aria-hidden="true" />
        <div className="hero-floating-card" ref={cardRef}>
          <div className="hfc-top">
            <span>HH GOA 2026</span>
            <span>OPEN TRIAL // 01</span>
          </div>
          <div className="hfc-photo" aria-hidden="true" />
          <div className="hfc-body">
            <p className="hfc-label">BUILDER CLASS</p>
            <h3>SIGNAL ARCHITECT</h3>
            <div className="hfc-bars">
              <i style={{ height: '92%' }} />
              <i style={{ height: '87%' }} />
              <i style={{ height: '78%' }} />
              <i style={{ height: '64%' }} />
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#create" aria-label="Scroll to builder creation">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
