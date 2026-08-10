import { useEffect, useState } from 'react';
import { STAT_META } from '../types';
import type { BuilderDNA } from '../types';

const ORDER: (keyof BuilderDNA['stats'])[] = ['vision', 'velocity', 'systems', 'chaos'];

function useCountUp(target: number, animate: boolean) {
  const [value, setValue] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf: number;
    const start = performance.now();
    const duration = 700;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, animate]);

  return value;
}

function Meter({ statKey, value, animate, showBlurb }: { statKey: keyof BuilderDNA['stats']; value: number; animate: boolean; showBlurb: boolean }) {
  const meta = STAT_META[statKey];
  const displayValue = useCountUp(value, animate);
  const [filled, setFilled] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <div className="dna-meter">
      <div className="dna-meter-track">
        <div className="dna-meter-fill" style={{ height: filled ? `${value}%` : '0%' }} />
      </div>
      <b>{displayValue}</b>
      <span className="dna-meter-label">{meta.label}</span>
      {showBlurb && <p className="dna-meter-blurb">{meta.blurb}</p>}
    </div>
  );
}

export default function DNAStats({ stats, animate = false, showBlurb = false, theme = 'light' }: { stats: BuilderDNA['stats']; animate?: boolean; showBlurb?: boolean; theme?: 'light' | 'dark' }) {
  return (
    <div className={`dna-meters${theme === 'dark' ? ' dna-meters-dark' : ''}`}>
      {ORDER.map((key) => (
        <Meter key={key} statKey={key} value={stats[key]} animate={animate} showBlurb={showBlurb} />
      ))}
    </div>
  );
}
