import type { Format, ResolvedFormat } from '../types';

const OPTIONS: { value: Format; label: string }[] = [
  { value: 'auto', label: 'AUTO' },
  { value: 'portrait', label: 'PORTRAIT' },
  { value: 'landscape', label: 'LANDSCAPE' },
];

type Props = { value: Format; onChange: (next: Format) => void; autoResolved: ResolvedFormat; helperLabel?: string };

export default function FormatSelector({ value, onChange, autoResolved, helperLabel = 'BEST FOR YOU' }: Props) {
  return (
    <div className="format-selector">
      <span className="field-label">FORMAT</span>
      <div className="format-options">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`format-option${value === opt.value ? ' format-option--active' : ''}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
          >
            <i />
            {opt.label}
          </button>
        ))}
      </div>
      {value === 'auto' && (
        <span className="format-helper">{helperLabel} &middot; AUTO &middot; {autoResolved.toUpperCase()}</span>
      )}
    </div>
  );
}
