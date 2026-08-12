import type { CSSProperties } from 'react';
import type { CardTheme } from './themes';

export function themeVars(theme: CardTheme): CSSProperties {
  return {
    '--card-bg': theme.palette.background,
    '--card-surface': theme.palette.surface,
    '--card-primary': theme.palette.primary,
    '--card-secondary': theme.palette.secondary,
    '--card-accent': theme.palette.accent,
    '--card-text': theme.palette.text,
    '--card-muted': theme.palette.muted,
  } as CSSProperties;
}

export function themeClassName(theme: CardTheme) {
  return `theme-frame-${theme.frame} theme-font-${theme.font}`;
}

export function statLabel(theme: CardTheme, key: 'vision' | 'velocity' | 'systems' | 'chaos', fallback: string) {
  return theme.statLabels?.[key] ?? fallback;
}
