import type { Builder, ResolvedFormat } from '../types';
import { CREW_STAT_META } from '../types';
import { getActiveBuilders, getCombinedStack, getCrewClass } from '../lib/crewDNA';
import { getBuilderDNA } from '../lib/builderDNA';
import type { CardTheme } from '../lib/themes';
import { themeClassName, themeVars } from '../lib/themeStyle';
import { getCrewLayout } from '../lib/layout';
import CardMotif from './CardMotif';
import BuilderCard from './BuilderCard';

const STAT_ORDER = ['buildSpeed', 'techRange', 'productInstinct', 'chaosEnergy'] as const;

function CrewHeader({ crewCode, label }: { crewCode: string; label: string }) {
  return (
    <header className="card-topline">
      <div className="card-brand">
        <span>HH GOA 2026</span>
        <b>{label}</b>
      </div>
      <span className="card-reg">{crewCode}</span>
    </header>
  );
}

function MemberPhoto({ builder, alt }: { builder: Builder; alt: string }) {
  return (
    <div className="crew-band-photo">
      {builder.photo ? <img src={builder.photo} alt={alt} /> : <div className="card-photo-empty small">CREW</div>}
    </div>
  );
}

function StatRows({ stats }: { stats: Record<(typeof STAT_ORDER)[number], number> }) {
  return (
    <div className="passport-stats">
      {STAT_ORDER.map((key) => (
        <div className="passport-stat-row" key={key}>
          <span>{CREW_STAT_META[key].label}</span>
          <div className="passport-stat-track"><i style={{ width: `${stats[key]}%` }} /></div>
          <b>{stats[key]}</b>
        </div>
      ))}
    </div>
  );
}

function StatStrip({ stats }: { stats: Record<(typeof STAT_ORDER)[number], number> }) {
  return (
    <div className="crew-stat-strip">
      {STAT_ORDER.map((key) => (
        <span key={key}>
          {CREW_STAT_META[key].label} <b>{stats[key]}</b>
        </span>
      ))}
    </div>
  );
}

function StatGrid({ stats }: { stats: Record<(typeof STAT_ORDER)[number], number> }) {
  return (
    <div className="crew-stat-grid">
      {STAT_ORDER.map((key) => (
        <div className="crew-stat-cell" key={key}>
          <span>{CREW_STAT_META[key].label}</span>
          <b>{stats[key]}</b>
        </div>
      ))}
    </div>
  );
}

type Props = { builders: Builder[]; theme: CardTheme; format: ResolvedFormat };

export default function CrewPassport({ builders, theme, format }: Props) {
  const active = getActiveBuilders(builders);
  const crew = getCrewClass(builders);
  const stack = getCombinedStack(builders);
  const stackLine = stack.length ? stack.join(' / ').toUpperCase() : 'MULTI-STACK';
  const layoutKey = getCrewLayout(format, active.length);
  const rootClass = `crew-passport export-card format-${format} ${themeClassName(theme)}`;

  if (active.length <= 1) {
    const solo = active[0] ?? builders[0];
    return <BuilderCard builder={solo} theme={theme} format={format} />;
  }

  const dnas = active.map((b) => ({ builder: b, dna: getBuilderDNA(b) }));

  if (layoutKey === 'landscape-2') {
    const [a, b] = dnas;
    return (
      <div className={rootClass} style={themeVars(theme)}>
        <CardMotif theme={theme} />
        <div className="card-noise" aria-hidden="true" />
        <CrewHeader crewCode={crew.code} label="CREW PASSPORT" />
        <div className="crew-duo">
          <div className="crew-duo-side">
            <MemberPhoto builder={a.builder} alt={a.builder.name || 'Builder one'} />
            <h3>{a.builder.name || 'BUILDER'}</h3>
            <span>{a.dna.archetype}</span>
          </div>
          <div className="crew-duo-center">
            <h2 className="crew-class-name">{crew.name}</h2>
            <p className="card-stack">{stackLine}</p>
          </div>
          <div className="crew-duo-side">
            <MemberPhoto builder={b.builder} alt={b.builder.name || 'Builder two'} />
            <h3>{b.builder.name || 'BUILDER'}</h3>
            <span>{b.dna.archetype}</span>
          </div>
        </div>
        <StatGrid stats={crew.stats} />
        <footer className="card-footer">
          <div><span>2 BUILDERS.</span><span>1 SIGNAL.</span></div>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </footer>
      </div>
    );
  }

  if (layoutKey === 'landscape-3') {
    return (
      <div className={rootClass} style={themeVars(theme)}>
        <CardMotif theme={theme} />
        <div className="card-noise" aria-hidden="true" />
        <div className="card-topline">
          <div className="card-brand">
            <span>HH GOA 2026</span>
            <b>CREW PASSPORT</b>
          </div>
          <h2 className="crew-class-name crew-class-name--compact">{crew.name}</h2>
        </div>
        <div className="crew-trio">
          {dnas.map(({ builder, dna }) => (
            <div className="crew-trio-member" key={builder.id}>
              <MemberPhoto builder={builder} alt={builder.name || 'Crew member'} />
              <h3>{builder.name || 'BUILDER'}</h3>
              <span>{dna.archetype}</span>
            </div>
          ))}
        </div>
        <div className="crew-trio-divider" />
        <StatStrip stats={crew.stats} />
        <footer className="card-footer">
          <div><span>3 BUILDERS.</span><span>1 SIGNAL.</span><span>GOA 2026.</span></div>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </footer>
      </div>
    );
  }

  if (layoutKey === 'portrait-2') {
    return (
      <div className={rootClass} style={themeVars(theme)}>
        <CardMotif theme={theme} />
        <div className="card-noise" aria-hidden="true" />
        <CrewHeader crewCode={crew.code} label="CREW PASSPORT" />
        <h2 className="crew-class-name">{crew.name}</h2>
        <div className="crew-bands">
          {dnas.map(({ builder, dna }, i) => (
            <div className={`crew-band${i % 2 === 1 ? ' crew-band--reverse' : ''}`} key={builder.id}>
              <MemberPhoto builder={builder} alt={builder.name || 'Crew member'} />
              <div className="crew-band-text">
                <h3>{builder.name || 'BUILDER'}</h3>
                <span>{dna.archetype}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="card-microlabel">CREW DNA</p>
        <StatRows stats={crew.stats} />
        <footer className="card-footer">
          <div><span>2 BUILDERS.</span><span>1 SIGNAL.</span><span>GOA 2026.</span></div>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </footer>
      </div>
    );
  }

  return (
    <div className={rootClass} style={themeVars(theme)}>
      <CardMotif theme={theme} />
      <div className="card-noise" aria-hidden="true" />
      <CrewHeader crewCode={crew.code} label="CREW PASSPORT" />
      <h2 className="crew-class-name">{crew.name}</h2>
      <div className="crew-bands crew-bands--trio">
        {dnas.map(({ builder, dna }, i) => (
          <div className={`crew-band${i % 2 === 1 ? ' crew-band--reverse' : ''}`} key={builder.id}>
            <MemberPhoto builder={builder} alt={builder.name || 'Crew member'} />
            <div className="crew-band-text">
              <h3>{builder.name || 'BUILDER'}</h3>
              <span>{dna.archetype}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="card-microlabel">CREW DNA</p>
      <StatRows stats={crew.stats} />
      <footer className="card-footer">
        <div><span>3 BUILDERS.</span><span>1 SIGNAL.</span><span>GOA 2026.</span></div>
        <span className="card-hashtag">#FRAMEINGOA</span>
      </footer>
    </div>
  );
}
