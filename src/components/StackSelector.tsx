import { useState } from 'react';
import { Plus } from 'lucide-react';

const PRESETS = ['React', 'TypeScript', 'Python', 'Rust', 'AI', 'Solidity', 'Design', 'Product'];

function parseStack(stack: string) {
  return stack.split(',').map((s) => s.trim()).filter(Boolean);
}

export default function StackSelector({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const [draft, setDraft] = useState('');
  const chips = parseStack(value);

  const toggle = (chip: string) => {
    const exists = chips.some((c) => c.toLowerCase() === chip.toLowerCase());
    const next = exists ? chips.filter((c) => c.toLowerCase() !== chip.toLowerCase()) : [...chips, chip];
    onChange(next.join(', '));
  };

  const addCustom = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (chips.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...chips, trimmed].join(', '));
    setDraft('');
  };

  return (
    <div className="stack-selector">
      <div className="stack-chips">
        {PRESETS.map((preset) => {
          const active = chips.some((c) => c.toLowerCase() === preset.toLowerCase());
          return (
            <button
              key={preset}
              type="button"
              className={`chip${active ? ' chip-active' : ''}`}
              onClick={() => toggle(preset)}
              aria-pressed={active}
            >
              {preset}
            </button>
          );
        })}
        {chips
          .filter((c) => !PRESETS.some((p) => p.toLowerCase() === c.toLowerCase()))
          .map((custom) => (
            <button key={custom} type="button" className="chip chip-active chip-custom" onClick={() => toggle(custom)}>
              {custom} &times;
            </button>
          ))}
      </div>
      <div className="stack-custom-input">
        <input
          value={draft}
          maxLength={20}
          placeholder="Add your own..."
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addCustom();
            }
          }}
        />
        <button type="button" onClick={addCustom} aria-label="Add stack item">
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
