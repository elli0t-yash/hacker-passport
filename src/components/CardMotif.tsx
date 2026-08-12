import type { CSSProperties } from 'react';
import type { CardTheme } from '../lib/themes';

export default function CardMotif({ theme }: { theme: CardTheme }) {
  return (
    <div className="card-motif-layer" aria-hidden="true">
      {theme.motifs.map((motif) => (
        <div
          key={motif}
          className={`motif motif-${motif}`}
          style={theme.motifAngle !== undefined ? ({ '--motif-angle': `${theme.motifAngle}deg` } as CSSProperties) : undefined}
        />
      ))}
    </div>
  );
}
