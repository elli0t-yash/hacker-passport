import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced || !dotRef.current) return;

    const el = dotRef.current;
    el.style.opacity = '1';

    const move = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const grow = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, label, [role="button"]')) el.classList.add('is-active');
    };
    const shrink = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, label, [role="button"]')) el.classList.remove('is-active');
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', grow);
    window.addEventListener('pointerout', shrink);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', grow);
      window.removeEventListener('pointerout', shrink);
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor" aria-hidden="true" />;
}
