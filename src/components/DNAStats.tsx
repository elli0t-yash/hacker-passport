import { useEffect, useState } from 'react';
import { STAT_META } from '../types';
import type { BuilderDNA, BuilderStatKey } from '../types';

const ORDER: BuilderStatKey[] = ['vision', 'velocity', 'systems', 'chaos'];

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

type MeterProps = { label: string; value: number; animate: boolean; showBlurb: boolean; blurb: string };

function VerticalMeter({ label, value, animate, showBlurb, blurb }: MeterProps) {
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
      <span className="dna-meter-label">{label}</span>
      {showBlurb && <p className="dna-meter-blurb">{blurb}</p>}
    </div>
  );
}

function RowMeter({ label, value, animate }: MeterProps) {
  const displayValue = useCountUp(value, animate);
  const [filled, setFilled] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <div className="dna-row">
      <span>{label}</span>
      <div className="dna-row-track"><i style={{ width: filled ? `${value}%` : '0%' }} /></div>
      <b>{displayValue}</b>
    </div>
  );
}

type Props = {
  stats: BuilderDNA['stats'];
  animate?: boolean;
  showBlurb?: boolean;
  layout?: 'vertical' | 'rows';
  labels?: Partial<Record<BuilderStatKey, string>>;
};

export default function DNAStats({ stats, animate = false, showBlurb = false, layout = 'vertical', labels }: Props) {
  const Meter = layout === 'rows' ? RowMeter : VerticalMeter;
  return (
    <div className={layout === 'rows' ? 'dna-rows' : 'dna-meters'}>
      {ORDER.map((key) => (
        <Meter
          key={key}
          label={labels?.[key] ?? STAT_META[key].label}
          value={stats[key]}
          animate={animate}
          showBlurb={showBlurb}
          blurb={STAT_META[key].blurb}
        />
      ))}
    </div>
  );
}
