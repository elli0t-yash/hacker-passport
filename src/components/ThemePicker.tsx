import { Shuffle } from 'lucide-react';
import { CATEGORY_LABELS, randomThemeId, themeList, type ThemeCategory } from '../lib/themes';

const CATEGORY_ORDER: ThemeCategory[] = ['original', 'tv', 'movies', 'games', 'books'];

export default function ThemePicker({ selectedId, onSelect }: { selectedId: string; onSelect: (id: string) => void }) {
  return (
    <div className="theme-picker">
      {CATEGORY_ORDER.map((category) => {
        const themes = themeList.filter((t) => t.category === category);
        if (!themes.length) return null;
        return (
          <div className="theme-picker-row" key={category}>
            <span className="theme-picker-category">{CATEGORY_LABELS[category]}</span>
            <div className="theme-picker-scroll">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-card${selectedId === theme.id ? ' theme-card--active' : ''}`}
                  onClick={() => onSelect(theme.id)}
                  aria-pressed={selectedId === theme.id}
                >
                  <span
                    className="theme-card-swatch"
                    style={{
                      background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.secondary} 55%, ${theme.palette.background})`,
                    }}
                  >
                    <i style={{ background: theme.palette.accent }} />
                  </span>
                  <b>{theme.name}</b>
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="theme-surprise"
        onClick={() => onSelect(randomThemeId(selectedId))}
      >
        <Shuffle size={14} /> SURPRISE ME
      </button>
    </div>
  );
}
