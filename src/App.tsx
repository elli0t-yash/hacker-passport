import { useRef, useState } from 'react';
import { ArrowRight, Download, Share2, Users } from 'lucide-react';
import type { Builder, Format } from './types';
import { getBuilderDNA } from './lib/builderDNA';
import { getActiveBuilders, getCrewClass } from './lib/crewDNA';
import { downloadNode, sanitizeFilename, shareNode } from './lib/canvasExport';
import { builderShareText, crewShareText } from './lib/share';
import { getTheme, DEFAULT_THEME_ID } from './lib/themes';
import { resolveFormat, autoBuilderFormat, autoCrewFormat, EXPORT_DIMENSIONS } from './lib/layout';
import { readPersisted, writePersisted } from './lib/persist';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuilderForm from './components/BuilderForm';
import DNAReveal from './components/DNAReveal';
import BuilderCard from './components/BuilderCard';
import CrewBuilder from './components/CrewBuilder';
import CrewReveal from './components/CrewReveal';
import CrewPassport from './components/CrewPassport';
import ThemePicker from './components/ThemePicker';
import FormatSelector from './components/FormatSelector';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

type RevealState = 'idle' | 'revealing' | 'revealed';

const emptyBuilder = (id: string): Builder => ({ id, name: '', handle: '', stack: '', buildMode: '', photo: '' });

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const LS_KEYS = {
  builderTheme: 'hhgoa-builder-theme',
  builderFormat: 'hhgoa-builder-format',
  crewTheme: 'hhgoa-crew-theme',
  crewFormat: 'hhgoa-crew-format',
};

export default function App() {
  const [builders, setBuilders] = useState<Builder[]>([emptyBuilder(crypto.randomUUID())]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [builderReveal, setBuilderReveal] = useState<RevealState>('idle');
  const [crewReveal, setCrewReveal] = useState<RevealState>('idle');
  const [builderStatus, setBuilderStatus] = useState('');
  const [crewStatus, setCrewStatus] = useState('');
  const [styleStatus, setStyleStatus] = useState('');

  const [builderThemeId, setBuilderThemeId] = useState(() => readPersisted(LS_KEYS.builderTheme, DEFAULT_THEME_ID));
  const [builderFormat, setBuilderFormat] = useState<Format>(() => readPersisted(LS_KEYS.builderFormat, 'auto') as Format);
  const [crewThemeId, setCrewThemeId] = useState<string | null>(() => {
    const stored = readPersisted(LS_KEYS.crewTheme, '');
    return stored || null;
  });
  const [crewFormat, setCrewFormat] = useState<Format>(() => readPersisted(LS_KEYS.crewFormat, 'auto') as Format);

  const styleStatusTimer = useRef<number | undefined>(undefined);
  const flashStyleStatus = (message: string) => {
    setStyleStatus(message);
    window.clearTimeout(styleStatusTimer.current);
    styleStatusTimer.current = window.setTimeout(() => setStyleStatus(''), 1800);
  };

  const changeBuilderTheme = (id: string) => {
    setBuilderThemeId(id);
    writePersisted(LS_KEYS.builderTheme, id);
    flashStyleStatus('UNIVERSE SWITCHED.');
  };
  const changeBuilderFormat = (format: Format) => {
    setBuilderFormat(format);
    writePersisted(LS_KEYS.builderFormat, format);
    flashStyleStatus('VISUAL SIGNAL UPDATED.');
  };
  const changeCrewTheme = (id: string | null) => {
    setCrewThemeId(id);
    writePersisted(LS_KEYS.crewTheme, id ?? '');
  };
  const changeCrewFormat = (format: Format) => {
    setCrewFormat(format);
    writePersisted(LS_KEYS.crewFormat, format);
  };

  const builderExportRef = useRef<HTMLDivElement>(null);
  const crewExportRef = useRef<HTMLDivElement>(null);

  const active = builders[activeIndex] ?? builders[0];
  const activeDNA = getBuilderDNA(active);
  const crewDNA = getCrewClass(builders);
  const activeCrew = getActiveBuilders(builders);

  const builderTheme = getTheme(builderThemeId);
  const builderResolvedFormat = resolveFormat(builderFormat, autoBuilderFormat());
  const builderDims = EXPORT_DIMENSIONS[builderResolvedFormat];

  const crewTheme = getTheme(crewThemeId ?? builderThemeId);
  const crewAutoFormat = autoCrewFormat(activeCrew.length);
  const crewResolvedFormat = resolveFormat(crewFormat, crewAutoFormat);
  const crewDims = EXPORT_DIMENSIONS[crewResolvedFormat];

  const updateBuilder = (index: number, next: Builder) => {
    setBuilders((prev) => prev.map((b, i) => (i === index ? next : b)));
  };

  const addBuilder = () => {
    if (builders.length >= 3) return;
    setBuilders((prev) => [...prev, emptyBuilder(crypto.randomUUID())]);
    setActiveIndex(builders.length);
  };

  const removeBuilder = (index: number) => {
    if (builders.length === 1) return;
    setBuilders((prev) => prev.filter((_, i) => i !== index));
    setActiveIndex(0);
  };

  const doDownloadBuilder = async () => {
    if (!builderExportRef.current) return;
    setBuilderStatus('CALIBRATING...');
    try {
      const filename = `hhgoa-${sanitizeFilename(active.name || 'builder')}-builder-dna.png`;
      await downloadNode(builderExportRef.current, filename, builderTheme.palette.background);
      setBuilderStatus('IDENTITY CLAIMED ✓');
    } catch (error) {
      console.error(error);
      setBuilderStatus('SIGNAL LOST. TRY AGAIN.');
    }
  };

  const doShareBuilder = async () => {
    if (!builderExportRef.current) return;
    setBuilderStatus('CALIBRATING...');
    try {
      const filename = `hhgoa-${sanitizeFilename(active.name || 'builder')}-builder-dna.png`;
      const text = builderShareText(activeDNA.archetype, active.stack, builderTheme.name);
      const result = await shareNode(builderExportRef.current, filename, text, builderTheme.palette.background);
      setBuilderStatus(result === 'native' ? 'SHARE SHEET OPENED ✓' : 'X OPENED ✓');
    } catch (error) {
      console.error(error);
      setBuilderStatus('SIGNAL LOST. TRY AGAIN.');
    }
  };

  const doDownloadCrew = async () => {
    if (!crewExportRef.current) return;
    setCrewStatus('CALIBRATING...');
    try {
      const filename = `hhgoa-${sanitizeFilename(crewDNA.name)}-crew-passport.png`;
      await downloadNode(crewExportRef.current, filename, crewTheme.palette.background);
      setCrewStatus('PASSPORT CLAIMED ✓');
    } catch (error) {
      console.error(error);
      setCrewStatus('SIGNAL LOST. TRY AGAIN.');
    }
  };

  const doShareCrew = async () => {
    if (!crewExportRef.current) return;
    setCrewStatus('CALIBRATING...');
    try {
      const filename = `hhgoa-${sanitizeFilename(crewDNA.name)}-crew-passport.png`;
      const text = crewShareText(crewDNA.name, activeCrew.map((b) => b.name));
      const result = await shareNode(crewExportRef.current, filename, text, crewTheme.palette.background);
      setCrewStatus(result === 'native' ? 'SHARE SHEET OPENED ✓' : 'X OPENED ✓');
    } catch (error) {
      console.error(error);
      setCrewStatus('SIGNAL LOST. TRY AGAIN.');
    }
  };

  return (
    <main className="app-shell">
      <CustomCursor />
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-horizon" aria-hidden="true" />

      <Navbar onCreate={() => scrollTo('create')} onCrew={() => scrollTo('crew')} />
      <Hero onCreate={() => scrollTo('create')} onCrew={() => scrollTo('crew')} />

      <BuilderForm
        builders={builders}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
        onUpdate={updateBuilder}
        onAdd={addBuilder}
        onRemove={removeBuilder}
        onGenerate={() => setBuilderReveal('revealing')}
      />

      {builderReveal === 'revealing' && (
        <DNAReveal
          stackChips={active.stack.split(',').map((s) => s.trim()).filter(Boolean)}
          archetype={activeDNA.archetype}
          stats={activeDNA.stats}
          onComplete={() => setBuilderReveal('revealed')}
        />
      )}

      {builderReveal === 'revealed' && (
        <section className="result-section" id="style">
          <p className="section-kicker">02 // CHOOSE YOUR UNIVERSE</p>
          <h2 className="section-title">
            WHAT WORLD
            <br />
            DO YOU BUILD IN?
          </h2>
          <p className="crew-hint">Your DNA stays the same. Only the universe changes.</p>

          <ThemePicker selectedId={builderThemeId} onSelect={changeBuilderTheme} />
          <FormatSelector value={builderFormat} onChange={changeBuilderFormat} autoResolved={autoBuilderFormat()} />
          {styleStatus && <p className="status-line status-line--style">{styleStatus}</p>}

          <div className="result-grid">
            <div className="preview-stage">
              <div className="preview-label">
                <span>LIVE OUTPUT &middot; {builderTheme.name}</span>
                <span>{builderDims.width}&times;{builderDims.height}</span>
              </div>
              <div className={`preview-frame format-${builderResolvedFormat}`}>
                <div ref={builderExportRef} className={`export-wrap format-${builderResolvedFormat}`}>
                  <BuilderCard builder={active} theme={builderTheme} format={builderResolvedFormat} />
                </div>
              </div>
            </div>
            <div className="result-actions">
              <button type="button" className="btn-primary" onClick={doDownloadBuilder}>
                <Download size={16} /> DOWNLOAD BUILDER ID
              </button>
              <button type="button" className="btn-ghost" onClick={doShareBuilder}>
                <Share2 size={16} /> SHARE ON X
              </button>
              <button type="button" className="btn-ghost" onClick={() => scrollTo('crew')}>
                ADD YOUR CREW <ArrowRight size={16} />
              </button>
              <button type="button" className="btn-text" onClick={() => setBuilderReveal('revealing')}>
                REGENERATE
              </button>
              {builderStatus && <p className="status-line">{builderStatus}</p>}
            </div>
          </div>
        </section>
      )}

      <CrewBuilder
        builders={builders}
        onGenerate={() => setCrewReveal('revealing')}
        builderThemeId={builderThemeId}
        crewThemeId={crewThemeId}
        onCrewThemeChange={changeCrewTheme}
        crewFormat={crewFormat}
        onCrewFormatChange={changeCrewFormat}
        autoCrewFormat={crewAutoFormat}
      />

      {crewReveal === 'revealing' && (
        <CrewReveal crewClass={crewDNA.name} onComplete={() => setCrewReveal('revealed')} />
      )}

      {crewReveal === 'revealed' && (
        <section className="result-section">
          <p className="section-kicker">YOUR CREW PASSPORT</p>
          <div className="result-grid">
            <div className="preview-stage">
              <div className="preview-label">
                <span>LIVE OUTPUT &middot; {crewTheme.name}</span>
                <span>{crewDims.width}&times;{crewDims.height}</span>
              </div>
              <div className={`preview-frame format-${crewResolvedFormat}`}>
                <div ref={crewExportRef} className={`export-wrap format-${crewResolvedFormat}`}>
                  <CrewPassport builders={builders} theme={crewTheme} format={crewResolvedFormat} />
                </div>
              </div>
            </div>
            <div className="result-actions">
              <button type="button" className="btn-primary" onClick={doDownloadCrew}>
                <Download size={16} /> DOWNLOAD CREW PASSPORT
              </button>
              <button type="button" className="btn-ghost" onClick={doShareCrew}>
                <Share2 size={16} /> SHARE ON X
              </button>
              <button type="button" className="btn-text" onClick={() => setCrewReveal('revealing')}>
                REGENERATE
              </button>
              {crewStatus && <p className="status-line">{crewStatus}</p>}
            </div>
          </div>
        </section>
      )}

      <HowItWorks />

      <section className="final-cta">
        <p className="section-kicker">GOA IS CALLING.</p>
        <h2 className="section-title">CLAIM YOUR BUILDER ID.</h2>
        <button type="button" className="btn-primary" onClick={() => scrollTo('create')}>
          <Users size={16} /> CREATE MY DNA
        </button>
      </section>

      <Footer />
    </main>
  );
}
