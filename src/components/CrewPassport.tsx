import type { Builder } from '../types';
import { CREW_STAT_META } from '../types';
import { getActiveBuilders, getCombinedStack, getCrewClass } from '../lib/crewDNA';

const ORDER = ['buildSpeed', 'techRange', 'productInstinct', 'chaosEnergy'] as const;

export default function CrewPassport({ builders }: { builders: Builder[] }) {
  const active = getActiveBuilders(builders);
  const crew = getCrewClass(builders);
  const stack = getCombinedStack(builders);

  return (
    <div className="crew-passport export-card">
      <div className="card-noise" aria-hidden="true" />
      <div className="card-sunset" aria-hidden="true" />
      <div className="card-topo" aria-hidden="true" />

      <div className="passport-left">
        <div className="passport-photos">
          {(active.length ? active : [{ id: 'placeholder', photo: '', name: '' } as Builder]).map((b) => (
            <div className="passport-photo" key={b.id}>
              {b.photo ? <img src={b.photo} alt={b.name || 'Crew member'} /> : <div className="card-photo-empty small">CREW</div>}
            </div>
          ))}
        </div>
        <div className="passport-names">
          {(active.length ? active : []).map((b) => (
            <span key={b.id}>{b.name || 'BUILDER'}</span>
          ))}
        </div>
      </div>

      <div className="passport-right">
        <header className="card-topline">
          <div className="card-brand">
            <span>HH GOA 2026</span>
            <b>CREW PASSPORT</b>
          </div>
          <span className="card-reg">{crew.code}</span>
        </header>

        <h2 className="passport-crew-name">{crew.name}</h2>

        <p className="card-microlabel">COMBINED STACK</p>
        <p className="card-stack">{stack.length ? stack.join(' / ').toUpperCase() : 'MULTI-STACK'}</p>

        <p className="card-microlabel">CREW DNA</p>
        <div className="passport-stats">
          {ORDER.map((key) => (
            <div className="passport-stat-row" key={key}>
              <span>{CREW_STAT_META[key].label}</span>
              <div className="passport-stat-track"><i style={{ width: `${crew.stats[key]}%` }} /></div>
              <b>{crew.stats[key]}</b>
            </div>
          ))}
        </div>

        <footer className="card-footer">
          <div>
            <span>{active.length || 0} BUILDERS.</span>
            <span>1 SIGNAL.</span>
            <span>GOA 2026.</span>
          </div>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </footer>
      </div>
    </div>
  );
}
