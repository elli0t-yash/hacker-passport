import { Plus, Trash2 } from 'lucide-react';
import type { Builder } from '../types';
import PhotoUploader from './PhotoUploader';
import StackSelector from './StackSelector';

const BUILD_MODES = ['SOLO RUN', 'PAIR HACK', 'SQUAD BUILD', 'NIGHT SHIFT', 'SPRINT MODE'];

type Props = {
  builders: Builder[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onUpdate: (index: number, next: Builder) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onGenerate: () => void;
};

export default function BuilderForm({ builders, activeIndex, onSelectIndex, onUpdate, onAdd, onRemove, onGenerate }: Props) {
  const active = builders[activeIndex] ?? builders[0];

  return (
    <section className="create-section" id="create">
      <p className="section-kicker">01 // CREATE YOUR BUILDER</p>
      <h2 className="section-title">EVERY BUILDER STARTS WITH A LOADOUT.</h2>

      {builders.length > 1 && (
        <div className="member-tabs">
          {builders.map((builder, index) => (
            <button
              key={builder.id}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => onSelectIndex(index)}
              type="button"
            >
              {builder.name || `BUILDER ${index + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="loadout-grid">
        <div className="loadout-field">
          <span className="field-label">PHOTO</span>
          <PhotoUploader photo={active.photo} onChange={(photo) => onUpdate(activeIndex, { ...active, photo })} />
        </div>

        <div className="loadout-inputs">
          <label className="field-label" htmlFor="builder-name">NAME</label>
          <input
            id="builder-name"
            maxLength={26}
            value={active.name}
            placeholder="Yash Mishra"
            onChange={(e) => onUpdate(activeIndex, { ...active, name: e.target.value })}
          />

          <label className="field-label" htmlFor="builder-handle">@HANDLE</label>
          <input
            id="builder-handle"
            maxLength={24}
            value={active.handle}
            placeholder="@yourhandle"
            onChange={(e) => onUpdate(activeIndex, { ...active, handle: e.target.value })}
          />

          <span className="field-label">STACK &mdash; SELECT YOUR LOADOUT</span>
          <StackSelector value={active.stack} onChange={(stack) => onUpdate(activeIndex, { ...active, stack })} />

          <span className="field-label">BUILD MODE</span>
          <div className="stack-chips">
            {BUILD_MODES.map((modeOption) => (
              <button
                key={modeOption}
                type="button"
                className={`chip${active.buildMode === modeOption ? ' chip-active' : ''}`}
                aria-pressed={active.buildMode === modeOption}
                onClick={() => onUpdate(activeIndex, { ...active, buildMode: active.buildMode === modeOption ? '' : modeOption })}
              >
                {modeOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="create-actions">
        {builders.length < 3 && (
          <button type="button" className="btn-ghost btn-small" onClick={onAdd}>
            <Plus size={15} /> RECRUIT BUILDER
          </button>
        )}
        {builders.length > 1 && (
          <button type="button" className="btn-ghost btn-small btn-danger" onClick={() => onRemove(activeIndex)}>
            <Trash2 size={15} /> REMOVE
          </button>
        )}
        <button type="button" className="btn-primary" onClick={onGenerate}>
          GENERATE MY DNA
        </button>
      </div>
    </section>
  );
}
