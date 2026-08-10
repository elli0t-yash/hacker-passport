import { useEffect, useState } from 'react';

const MESSAGES = ['COMBINING BUILDER SIGNALS...', 'CREW SIGNATURE FOUND.'];
const STEP_MS = 850;

export default function CrewReveal({ crewClass, onComplete }: { crewClass: string; onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }
    if (step >= MESSAGES.length - 1) {
      const done = setTimeout(onComplete, 700);
      return () => clearTimeout(done);
    }
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const finalStep = step >= MESSAGES.length - 1;

  return (
    <div className="dna-reveal crew-reveal" role="status" aria-live="polite">
      <div className="dna-reveal-scanline" aria-hidden="true" />
      <p className="dna-reveal-message" key={step}>{MESSAGES[step]}</p>
      {finalStep && (
        <div className="dna-reveal-class">
          <span>CREW CLASS</span>
          <h3>{crewClass}</h3>
        </div>
      )}
      <button type="button" className="dna-reveal-skip" onClick={onComplete}>
        SKIP ANIMATION
      </button>
    </div>
  );
}
