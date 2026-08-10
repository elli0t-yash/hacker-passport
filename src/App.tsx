import { useMemo, useRef, useState } from 'react';
import { Download, Share2, Plus, Trash2, Upload, Users, Sparkles } from 'lucide-react';
import { downloadNode, shareNode } from './export';
import { getBuilderDNA, getCrewClass } from './dna';
import type { Builder } from './types';

const emptyBuilder = (id: string): Builder => ({ id, name: '', handle: '', stack: '', photo: '' });

function ImageField({ builder, onChange }: { builder: Builder; onChange: (next: Builder) => void }) {
  const inputId = `photo-${builder.id}`;
  return (
    <label className="photo-field" htmlFor={inputId}>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => onChange({ ...builder, photo: String(reader.result) });
          reader.readAsDataURL(file);
        }}
      />
      <Upload size={16} />
      <span>{builder.photo ? 'Replace photo' : 'Upload photo'}</span>
    </label>
  );
}

function DNAStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-row">
      <span>{label}</span>
      <div className="stat-track"><i style={{ width: `${value}%` }} /></div>
      <b>{value}</b>
    </div>
  );
}

function BuilderCard({ builder }: { builder: Builder }) {
  const dna = getBuilderDNA(builder);
  return (
    <div className="builder-card export-card">
      <div className="noise" />
      <header className="card-topline">
        <span>2:47 PM STUDIO</span><span>OPEN TRIAL // 01</span>
      </header>
      <div className="hero-lockup">
        <div>
          <p className="eyebrow">HACKER HOUSE</p>
          <h2>GOA <span>गोवा</span></h2>
        </div>
        <div className="year">’26</div>
      </div>
      <div className="photo-shell">
        {builder.photo ? <img src={builder.photo} alt="Builder" /> : <div className="photo-placeholder">DROP<br/>A PHOTO</div>}
        <div className="photo-stamp">28—31 OCT · GOA</div>
      </div>
      <section className="identity">
        <div className="identity-main">
          <p className="tiny">BUILDER</p>
          <h3>{builder.name || 'YOUR NAME'}</h3>
          <p>{builder.stack || 'YOUR STACK / ROLE'}</p>
          <span>{builder.handle ? `@${builder.handle.replace(/^@/, '')}` : '@YOURHANDLE'}</span>
        </div>
        <div className="id-code"><small>ID</small><b>{dna.code}</b></div>
      </section>
      <section className="dna-block">
        <div className="dna-heading">
          <div><p className="tiny">BUILDER CLASS</p><h4>{dna.archetype}</h4></div>
          <Sparkles size={20} />
        </div>
        <p className="motto">{dna.motto}</p>
        <DNAStat label="VISION" value={dna.stats.vision} />
        <DNAStat label="VELOCITY" value={dna.stats.velocity} />
        <DNAStat label="SYSTEMS" value={dna.stats.systems} />
        <DNAStat label="CHAOS" value={dna.stats.chaos} />
      </section>
      <footer className="card-footer"><span>#FrameInGoa</span><span>LESS NOISE. MORE SIGNAL.</span></footer>
    </div>
  );
}

function CrewCard({ builders }: { builders: Builder[] }) {
  const active = builders.filter((b) => b.name || b.stack || b.photo);
  const crew = getCrewClass(active);
  return (
    <div className="crew-card export-card">
      <div className="noise" />
      <div className="crew-header">
        <div><p>HACKER HOUSE GOA ’26</p><h2>{crew.name}</h2><span>{crew.motto}</span></div>
        <b>{crew.code}</b>
      </div>
      <div className={`crew-grid count-${Math.max(1, active.length)}`}>
        {(active.length ? active : [emptyBuilder('preview')]).map((builder) => {
          const dna = getBuilderDNA(builder);
          return (
            <div className="crew-member" key={builder.id}>
              <div className="crew-photo">
                {builder.photo ? <img src={builder.photo} alt="Team member" /> : <div className="photo-placeholder small">PHOTO</div>}
                <span>{dna.code}</span>
              </div>
              <h3>{builder.name || 'BUILDER'}</h3>
              <p>{builder.stack || 'STACK / ROLE'}</p>
              <b>{dna.archetype}</b>
            </div>
          );
        })}
      </div>
      <footer className="crew-footer"><span>28—31 OCT 2026 · GOA, INDIA</span><span>#FrameInGoa</span><span>2:47 PM STUDIO</span></footer>
    </div>
  );
}

export default function App() {
  const [builders, setBuilders] = useState<Builder[]>([
    { id: crypto.randomUUID(), name: '', handle: '', stack: '', photo: '' },
  ]);
  const [mode, setMode] = useState<'builder' | 'crew'>('builder');
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState('');
  const exportRef = useRef<HTMLDivElement>(null);

  const active = builders[activeIndex] ?? builders[0];
  const crew = useMemo(() => getCrewClass(builders), [builders]);

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

  const doDownload = async () => {
    if (!exportRef.current) return;
    setStatus('Rendering…');
    try {
      await downloadNode(exportRef.current, mode === 'crew' ? 'hhgoa-crew-passport.png' : 'hhgoa-builder-dna.png');
      setStatus('Downloaded ✓');
    } catch (error) {
      console.error(error);
      setStatus('Export failed');
    }
  };

  const doShare = async () => {
    if (!exportRef.current) return;
    setStatus('Preparing share…');
    const names = builders.filter((b) => b.name).map((b) => b.name).join(' × ');
    const generatorUrl = window.location.origin;
    const howTo = `Try it: ${generatorUrl}\n1. Upload photo\n2. Add your stack\n3. Generate + share`;
    const text = mode === 'crew'
      ? `${crew.name} is heading coast-side. ${names ? `${names}. ` : ''}Built with our HH Goa Crew Passport generator. 🌴\n\n${howTo}\n\n#FrameInGoa #HHGOA2026`
      : `My HH Goa 2026 Builder DNA just dropped: ${getBuilderDNA(active).archetype}. 🌴\n\n${howTo}\n\n#FrameInGoa #HHGOA2026`;
    try {
      const result = await shareNode(exportRef.current, mode === 'crew' ? 'hhgoa-crew-passport.png' : 'hhgoa-builder-dna.png', text);
      setStatus(result === 'native' ? 'Share sheet opened ✓' : 'Image copied when supported — X opened ✓');
    } catch (error) {
      console.error(error);
      setStatus('Share failed');
    }
  };

  return (
    <main className="app-shell">
      <nav className="nav">
        <div className="brand-mark"><span>HH</span><b>GOA ’26</b></div>
        <div className="nav-meta">TASK 01 · BUILDER DNA / CREW PASSPORT</div>
      </nav>

      <section className="intro">
        <div>
          <p className="kicker">#FRAMEINGOA // OPEN TRIAL</p>
          <h1>Not another ID card.<br/><em>Your builder fingerprint.</em></h1>
        </div>
        <p className="intro-copy">Upload a photo, enter your stack, and get a deterministic Builder Class. Add up to two teammates to fuse your identities into one Crew Passport.</p>
      </section>

      <section className="workspace">
        <aside className="control-panel">
          <div className="mode-toggle">
            <button className={mode === 'builder' ? 'active' : ''} onClick={() => setMode('builder')}>BUILDER DNA</button>
            <button className={mode === 'crew' ? 'active' : ''} onClick={() => setMode('crew')}><Users size={15}/> CREW</button>
          </div>

          <div className="member-tabs">
            {builders.map((builder, index) => (
              <button key={builder.id} className={activeIndex === index ? 'active' : ''} onClick={() => setActiveIndex(index)}>
                {builder.name || `Builder ${index + 1}`}
              </button>
            ))}
            {builders.length < 3 && <button className="add-tab" onClick={addBuilder}><Plus size={15}/></button>}
          </div>

          <div className="form-card">
            <div className="form-heading"><div><span>0{activeIndex + 1}</span><h2>Builder input</h2></div>{builders.length > 1 && <button className="icon-danger" onClick={() => removeBuilder(activeIndex)}><Trash2 size={16}/></button>}</div>
            <ImageField builder={active} onChange={(next) => updateBuilder(activeIndex, next)} />
            <label>Name<input maxLength={26} value={active.name} placeholder="Yash Mishra" onChange={(e) => updateBuilder(activeIndex, { ...active, name: e.target.value })} /></label>
            <label>Stack / role<input maxLength={34} value={active.stack} placeholder="AI + Systems + Product" onChange={(e) => updateBuilder(activeIndex, { ...active, stack: e.target.value })} /></label>
            <label>X handle<input maxLength={24} value={active.handle} placeholder="@yourhandle" onChange={(e) => updateBuilder(activeIndex, { ...active, handle: e.target.value })} /></label>
            <div className="class-preview">
              <span>GENERATED CLASS</span>
              <b>{getBuilderDNA(active).archetype}</b>
              <p>Changes deterministically with your identity + stack.</p>
            </div>
          </div>

          <div className="actions">
            <button className="primary" onClick={doDownload}><Download size={17}/> Download PNG</button>
            <button className="secondary" onClick={doShare}><Share2 size={17}/> Share to X</button>
          </div>
          {status && <p className="status">{status}</p>}
        </aside>

        <section className="preview-stage">
          <div className="preview-label"><span>LIVE OUTPUT</span><span>{mode === 'crew' ? '1200×630' : '1080×1350'}</span></div>
          <div ref={exportRef} className={mode === 'crew' ? 'export-wrap crew-export' : 'export-wrap builder-export'}>
            {mode === 'crew' ? <CrewCard builders={builders} /> : <BuilderCard builder={active} />}
          </div>
        </section>
      </section>

      <section className="why-section">
        <p>THE HOOK</p>
        <h2>Individual identity is nice.<br/>Crew chemistry is memorable.</h2>
        <div className="why-grid">
          <div><b>01</b><h3>Zero manual crop</h3><p>Any portrait or landscape photo auto-fills the frame with object-fit cover.</p></div>
          <div><b>02</b><h3>Builder DNA</h3><p>A deterministic archetype and stat profile makes every card feel personal.</p></div>
          <div><b>03</b><h3>Crew fusion</h3><p>Up to three builders become one named crew with a shared code and identity.</p></div>
          <div><b>04</b><h3>Fast share loop</h3><p>Export a high-resolution PNG or use native file sharing / X intent in one action.</p></div>
        </div>
      </section>

      <footer className="site-footer"><span>BUILT FOR HH GOA 2026 · TASK 01</span><span>28—31 OCT · GOA</span><span>#FrameInGoa</span></footer>
    </main>
  );
}
