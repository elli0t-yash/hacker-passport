import { Users } from 'lucide-react';
import Clock from './Clock';

export default function Navbar({ onCreate, onCrew }: { onCreate: () => void; onCrew: () => void }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-eyebrow">HH GOA 2026</span>
          <span className="navbar-word">BUILDER DNA</span>
        </div>
        <nav className="navbar-links">
          <button onClick={onCreate}>CREATE ID</button>
          <button onClick={onCrew}><Users size={13} /> CREW MODE</button>
          <span className="navbar-tag">#FRAMEINGOA</span>
        </nav>
        <div className="navbar-status">
          <span className="navbar-dot" aria-hidden="true" />
          GOA // OCT 28—31
          <Clock />
        </div>
      </div>
    </header>
  );
}
