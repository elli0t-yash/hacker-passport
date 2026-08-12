import { useEffect, useState } from 'react';
import type { BuilderDNA } from '../types';
import DNAStats from './DNAStats';

const MESSAGES = ['READING STACK...', 'CALIBRATING CHAOS...', 'MEASURING SHIP VELOCITY...', 'BUILD PATTERN DETECTED', 'SIGNAL FOUND.', 'IDENTITY LOCKED.'];
const STEP_MS = 340;
const STATS_STEP = 3;
const FINAL_STEP = MESSAGES.length - 1;

export default function DNAReveal({ stackChips, archetype, stats, onComplete }: { stackChips: string[]; archetype: string; stats: BuilderDNA['stats']; onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onComplete();
      return;
    }
    if (step >= FINAL_STEP) {
      const done = setTimeout(onComplete, 650);
      return () => clearTimeout(done);
    }
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const finalStep = step >= FINAL_STEP;
  const showStats = step >= STATS_STEP;

  return (
    <div className="dna-reveal" role="status" aria-live="polite">
      <div className="dna-reveal-scanline" aria-hidden="true" />
      {!showStats && (
        <div className="dna-reveal-chips" aria-hidden="true">
          {stackChips.length ? stackChips.map((chip, i) => (
            <span key={chip} style={{ animationDelay: `${i * 90}ms` }}>{chip}</span>
          )) : <span>MULTI-STACK</span>}
        </div>
      )}
      {showStats && !finalStep && <DNAStats stats={stats} animate />}
      <p className="dna-reveal-message" key={step}>{MESSAGES[step]}</p>
      {finalStep && (
        <div className="dna-reveal-class">
          <span>YOUR BUILDER CLASS</span>
          <h3>{archetype}</h3>
        </div>
      )}
      <button type="button" className="dna-reveal-skip" onClick={onComplete}>
        SKIP ANIMATION
      </button>
    </div>
  );
}
