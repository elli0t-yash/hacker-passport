import type { Builder, Format, ResolvedFormat } from '../types';
import { getBuilderDNA } from '../lib/builderDNA';
import { getActiveBuilders } from '../lib/crewDNA';
import { getTheme } from '../lib/themes';
import ThemePicker from './ThemePicker';
import FormatSelector from './FormatSelector';

type Props = {
  builders: Builder[];
  onGenerate: () => void;
  builderThemeId: string;
  crewThemeId: string | null;
  onCrewThemeChange: (id: string | null) => void;
  crewFormat: Format;
  onCrewFormatChange: (format: Format) => void;
  autoCrewFormat: ResolvedFormat;
};

export default function CrewBuilder({
  builders,
  onGenerate,
  builderThemeId,
  crewThemeId,
  onCrewThemeChange,
  crewFormat,
  onCrewFormatChange,
  autoCrewFormat,
}: Props) {
  const active = getActiveBuilders(builders);
  const usingSame = crewThemeId === null;
  const effectiveThemeId = crewThemeId ?? builderThemeId;

  return (
    <section className="crew-section" id="crew">
      <p className="section-kicker">03 // ASSEMBLE YOUR CREW</p>
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

      <div className="crew-universe">
        <span className="field-label">CREW UNIVERSE</span>
        <div className="crew-universe-toggle">
          <button
            type="button"
            className={`chip${usingSame ? ' chip-active' : ''}`}
            aria-pressed={usingSame}
            onClick={() => onCrewThemeChange(null)}
          >
            SAME AS MY CARD &middot; {getTheme(builderThemeId).name}
          </button>
          <button
            type="button"
            className={`chip${!usingSame ? ' chip-active' : ''}`}
            aria-pressed={!usingSame}
            onClick={() => onCrewThemeChange(usingSame ? builderThemeId : crewThemeId)}
          >
            CHOOSE ANOTHER
          </button>
        </div>
        {!usingSame && (
          <ThemePicker selectedId={effectiveThemeId} onSelect={(id) => onCrewThemeChange(id)} />
        )}
        <FormatSelector
          value={crewFormat}
          onChange={onCrewFormatChange}
          autoResolved={autoCrewFormat}
          helperLabel="BEST FOR YOUR CREW"
        />
      </div>

      <button type="button" className="btn-primary" onClick={onGenerate} disabled={active.length === 0}>
        GENERATE CREW PASSPORT
      </button>
    </section>
  );
}
