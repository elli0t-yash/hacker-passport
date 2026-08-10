import { Sparkles } from 'lucide-react';
import type { Builder } from '../types';
import { getBuilderDNA } from '../lib/builderDNA';
import DNAStats from './DNAStats';

function Barcode({ seed }: { seed: string }) {
  const bars = Array.from(seed).map((ch, i) => 1 + ((ch.charCodeAt(0) + i * 7) % 4));
  return (
    <div className="barcode" aria-hidden="true">
      {bars.map((w, i) => (
        <i key={i} style={{ width: `${w}px` }} />
      ))}
    </div>
  );
}

export default function BuilderCard({ builder }: { builder: Builder }) {
  const dna = getBuilderDNA(builder);
  const stackList = builder.stack
    ? builder.stack.split(',').map((s) => s.trim()).filter(Boolean).join(' / ').toUpperCase()
    : 'MULTI-STACK';

  return (
    <div className="builder-card export-card">
      <div className="card-noise" aria-hidden="true" />
      <div className="card-sunset" aria-hidden="true" />
      <div className="card-palm" aria-hidden="true" />
      <div className="card-topo" aria-hidden="true" />

      <header className="card-topline">
        <div className="card-brand">
          <span>HH GOA 2026</span>
          <b>BUILDER DNA</b>
        </div>
        <div className="card-reg">
          <span>COAST NODE // 2026</span>
          <span>{dna.code}</span>
        </div>
      </header>

      <div className="card-photo-shell">
        {builder.photo ? (
          <img src={builder.photo} alt={builder.name || 'Builder portrait'} />
        ) : (
          <div className="card-photo-empty">DROP<br />A PHOTO</div>
        )}
        <span className="card-photo-stamp">28&mdash;31 OCT &middot; GOA</span>
      </div>

      <section className="card-identity">
        <p className="card-microlabel">BUILDER</p>
        <h3>{builder.name || 'YOUR NAME'}</h3>
        <p className="card-handle">{builder.handle ? `@${builder.handle.replace(/^@/, '')}` : '@YOURHANDLE'}</p>
        <p className="card-microlabel">CLASS</p>
        <div className="card-class-row">
          <h4>{dna.archetype}</h4>
          <Sparkles size={16} />
        </div>
        <p className="card-microlabel">STACK</p>
        <p className="card-stack">{stackList}</p>
      </section>

      <section className="card-dna">
        <p className="card-microlabel">DNA</p>
        <DNAStats stats={dna.stats} />
      </section>

      <footer className="card-footer">
        <div>
          <span>LESS NOISE.</span>
          <span>MORE SIGNAL.</span>
        </div>
        <div className="card-footer-right">
          <Barcode seed={dna.code} />
          <span>VALID FOR 4 DAYS OF CHAOS</span>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </div>
      </footer>
    </div>
  );
}
