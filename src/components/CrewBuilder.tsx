import type { Builder } from '../types';
import { getBuilderDNA } from '../lib/builderDNA';
import { getActiveBuilders } from '../lib/crewDNA';

export default function CrewBuilder({ builders, onGenerate }: { builders: Builder[]; onGenerate: () => void }) {
  const active = getActiveBuilders(builders);

  return (
    <section className="crew-section" id="crew">
      <p className="section-kicker">02 // ASSEMBLE YOUR CREW</p>
      <h2 className="section-title">
        EVERY LEGEND
        <br />
        NEEDS A CREW.
      </h2>
      <p className="crew-hint">Add up to two teammates above, then fuse your signals into one Crew Passport.</p>

      <div className="crew-signal-label">CREW SIGNAL</div>
      <div className="crew-member-row">
        {active.map((builder, i) => {
          const dna = getBuilderDNA(builder);
          return (
            <div className="crew-member-chip" key={builder.id}>
              {i > 0 && <span className="crew-connector" aria-hidden="true" />}
              <div className="crew-member-photo">
                {builder.photo ? <img src={builder.photo} alt={builder.name || 'Crew member'} /> : <div className="card-photo-empty small">PHOTO</div>}
              </div>
              <b>{builder.name || 'BUILDER'}</b>
              <span>{dna.archetype}</span>
            </div>
          );
        })}
        {active.length === 0 && <p className="crew-empty">No builders yet &mdash; fill in the loadout above.</p>}
      </div>

      <button type="button" className="btn-primary" onClick={onGenerate} disabled={active.length === 0}>
        GENERATE CREW PASSPORT
      </button>
    </section>
  );
}
