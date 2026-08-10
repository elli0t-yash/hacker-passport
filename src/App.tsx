import { useRef, useState } from 'react';
import { ArrowRight, Download, Share2, Users } from 'lucide-react';
import type { Builder } from './types';
import { getBuilderDNA } from './lib/builderDNA';
import { getActiveBuilders, getCrewClass } from './lib/crewDNA';
import { downloadNode, sanitizeFilename, shareNode } from './lib/canvasExport';
import { builderShareText, crewShareText } from './lib/share';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuilderForm from './components/BuilderForm';
import DNAReveal from './components/DNAReveal';
import BuilderCard from './components/BuilderCard';
import CrewBuilder from './components/CrewBuilder';
import CrewReveal from './components/CrewReveal';
import CrewPassport from './components/CrewPassport';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

type RevealState = 'idle' | 'revealing' | 'revealed';

const emptyBuilder = (id: string): Builder => ({ id, name: '', handle: '', stack: '', buildMode: '', photo: '' });

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function App() {
  const [builders, setBuilders] = useState<Builder[]>([emptyBuilder(crypto.randomUUID())]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [builderReveal, setBuilderReveal] = useState<RevealState>('idle');
  const [crewReveal, setCrewReveal] = useState<RevealState>('idle');
  const [builderStatus, setBuilderStatus] = useState('');
  const [crewStatus, setCrewStatus] = useState('');

  const builderExportRef = useRef<HTMLDivElement>(null);
  const crewExportRef = useRef<HTMLDivElement>(null);

  const active = builders[activeIndex] ?? builders[0];
  const activeDNA = getBuilderDNA(active);
  const crewDNA = getCrewClass(builders);
  const activeCrew = getActiveBuilders(builders);

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
      await downloadNode(builderExportRef.current, filename);
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
      const text = builderShareText(activeDNA.archetype, active.stack);
      const result = await shareNode(builderExportRef.current, filename, text);
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
      await downloadNode(crewExportRef.current, filename);
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
      const result = await shareNode(crewExportRef.current, filename, text);
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
        <section className="result-section">
          <p className="section-kicker">YOUR BUILDER ID</p>
          <div className="result-grid">
            <div className="preview-stage">
              <div className="preview-label">
                <span>LIVE OUTPUT</span>
                <span>1080&times;1350</span>
              </div>
              <div ref={builderExportRef} className="export-wrap builder-export">
                <BuilderCard builder={active} />
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

      <CrewBuilder builders={builders} onGenerate={() => setCrewReveal('revealing')} />

      {crewReveal === 'revealing' && (
        <CrewReveal crewClass={crewDNA.name} onComplete={() => setCrewReveal('revealed')} />
      )}

      {crewReveal === 'revealed' && (
        <section className="result-section">
          <p className="section-kicker">YOUR CREW PASSPORT</p>
          <div className="result-grid">
            <div className="preview-stage">
              <div className="preview-label">
                <span>LIVE OUTPUT</span>
                <span>1200&times;630</span>
              </div>
              <div ref={crewExportRef} className="export-wrap crew-export">
                <CrewPassport builders={builders} />
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
