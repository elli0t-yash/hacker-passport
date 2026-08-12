import type { BuilderStatKey } from '../types';

export type ThemeCategory = 'original' | 'tv' | 'movies' | 'games' | 'books';
export type MotifType = 'sun' | 'stars' | 'halftone' | 'scanlines' | 'topo' | 'paper' | 'grid';
export type FrameStyle = 'soft' | 'sharp' | 'stamped' | 'engraved' | 'archive';
export type FontTreatment = 'display' | 'serif' | 'mono';

export type CardTheme = {
  id: string;
  name: string;
  category: ThemeCategory;
  inspiration: string;
  tagline: string;
  palette: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
  };
  motifs: MotifType[];
  motifAngle?: number;
  frame: FrameStyle;
  font: FontTreatment;
  statLabels?: Partial<Record<BuilderStatKey, string>>;
  statPanel?: 'inverted' | 'surface';
};

export const CATEGORY_LABELS: Record<ThemeCategory, string> = {
  original: 'ORIGINAL',
  tv: 'TV',
  movies: 'MOVIES',
  games: 'GAMES',
  books: 'BOOKS',
};

export const cardThemes: Record<string, CardTheme> = {
  builderCity: {
    id: 'builderCity',
    name: 'BUILDER CITY',
    category: 'original',
    inspiration: 'The official HH Goa look',
    tagline: 'Sunset coast. Neon nights. Shipping energy.',
    palette: {
      background: '#09070F',
      surface: '#171022',
      primary: '#FF4FA3',
      secondary: '#FF6B4A',
      accent: '#FFD166',
      text: '#FFF3DE',
      muted: 'rgba(255,243,222,0.6)',
    },
    motifs: ['sun', 'topo'],
    frame: 'soft',
    font: 'display',
    statPanel: 'inverted',
  },
  upsideDown: {
    id: 'upsideDown',
    name: 'UPSIDE DOWN',
    category: 'tv',
    inspiration: 'Retro supernatural signal detection',
    tagline: 'Fog. Static. Something is transmitting.',
    palette: {
      background: '#0A0505',
      surface: '#1A0808',
      primary: '#E8352F',
      secondary: '#7A1414',
      accent: '#FF6B5C',
      text: '#F5E6E0',
      muted: 'rgba(245,230,224,0.55)',
    },
    motifs: ['scanlines', 'grid'],
    frame: 'sharp',
    font: 'mono',
  },
  desertLab: {
    id: 'desertLab',
    name: 'DESERT LAB',
    category: 'tv',
    inspiration: 'Chemistry-lab modular editorial',
    tagline: 'Precise. Volatile. Purity above all.',
    palette: {
      background: '#1C1B16',
      surface: '#2A2820',
      primary: '#A8E63D',
      secondary: '#C9B896',
      accent: '#3A3A3A',
      text: '#F0EDE0',
      muted: 'rgba(240,237,224,0.55)',
    },
    motifs: ['grid', 'paper'],
    frame: 'sharp',
    font: 'mono',
    statLabels: { vision: 'FORMULA' },
  },
  industrialNoir: {
    id: 'industrialNoir',
    name: 'INDUSTRIAL NOIR',
    category: 'tv',
    inspiration: 'Birmingham-era editorial restraint',
    tagline: 'Restrained. Dramatic. Old money, new war.',
    palette: {
      background: '#14110F',
      surface: '#221E1A',
      primary: '#B08D57',
      secondary: '#4A443C',
      accent: '#8A6C42',
      text: '#E8DFD0',
      muted: 'rgba(232,223,208,0.55)',
    },
    motifs: ['paper'],
    frame: 'archive',
    font: 'serif',
  },
  cosmicSignal: {
    id: 'cosmicSignal',
    name: 'COSMIC SIGNAL',
    category: 'movies',
    inspiration: 'Orbital telemetry minimalism',
    tagline: 'Time is relative. The signal is not.',
    palette: {
      background: '#060608',
      surface: '#101014',
      primary: '#F5F3EE',
      secondary: '#8FA3B0',
      accent: '#4FC3E8',
      text: '#F5F3EE',
      muted: 'rgba(245,243,238,0.5)',
    },
    motifs: ['topo', 'stars'],
    frame: 'sharp',
    font: 'mono',
  },
  desertEmpire: {
    id: 'desertEmpire',
    name: 'DESERT EMPIRE',
    category: 'movies',
    inspiration: 'Monumental sand and sun',
    tagline: 'The spice of the stack must flow.',
    palette: {
      background: '#120D08',
      surface: '#1E1610',
      primary: '#E08A3C',
      secondary: '#C9A876',
      accent: '#0B0705',
      text: '#F2E4CE',
      muted: 'rgba(242,228,206,0.55)',
    },
    motifs: ['sun'],
    frame: 'sharp',
    font: 'display',
  },
  multiverse: {
    id: 'multiverse',
    name: 'MULTIVERSE',
    category: 'movies',
    inspiration: 'Offset-print comic energy',
    tagline: 'Every stack is someone else’s origin story.',
    palette: {
      background: '#0D0D12',
      surface: '#17171F',
      primary: '#FF2E9A',
      secondary: '#2EE6FF',
      accent: '#FFE94A',
      text: '#FFFFFF',
      muted: 'rgba(255,255,255,0.55)',
    },
    motifs: ['halftone'],
    frame: 'sharp',
    font: 'display',
  },
  gothamNoir: {
    id: 'gothamNoir',
    name: 'GOTHAM NOIR',
    category: 'movies',
    inspiration: 'Classified dossier surveillance',
    tagline: 'Every builder has a file.',
    palette: {
      background: '#0A0B0D',
      surface: '#16181B',
      primary: '#C9CDD1',
      secondary: '#2B2F33',
      accent: '#E8A33D',
      text: '#E8EAEC',
      muted: 'rgba(232,234,236,0.5)',
    },
    motifs: ['grid', 'scanlines'],
    frame: 'archive',
    font: 'mono',
  },
  viceCoast: {
    id: 'viceCoast',
    name: 'VICE COAST',
    category: 'games',
    inspiration: 'Neon coastal open-world energy',
    tagline: 'Louder sunset. Faster ship.',
    palette: {
      background: '#0D0417',
      surface: '#1A0B2E',
      primary: '#FF2FB0',
      secondary: '#FF8C3D',
      accent: '#2FE8D9',
      text: '#FFF3DE',
      muted: 'rgba(255,243,222,0.55)',
    },
    motifs: ['sun', 'scanlines'],
    frame: 'soft',
    font: 'display',
    statPanel: 'inverted',
  },
  nightProtocol: {
    id: 'nightProtocol',
    name: 'NIGHT PROTOCOL',
    category: 'games',
    inspiration: 'Industrial data-overlay UI',
    tagline: 'Wake up, builder. The stack has you.',
    palette: {
      background: '#08090A',
      surface: '#121316',
      primary: '#E8FF3D',
      secondary: '#2FE0E8',
      accent: '#FF3D3D',
      text: '#EAEAEA',
      muted: 'rgba(234,234,234,0.5)',
    },
    motifs: ['grid', 'scanlines'],
    frame: 'sharp',
    font: 'mono',
  },
  frontier: {
    id: 'frontier',
    name: 'FRONTIER',
    category: 'games',
    inspiration: 'Wanted-poster frontier registry',
    tagline: 'Dead or alive: ship it.',
    palette: {
      background: '#1A1410',
      surface: '#2A211A',
      primary: '#8B2E2E',
      secondary: '#D9C9A3',
      accent: '#14100D',
      text: '#F0E6D2',
      muted: 'rgba(240,230,210,0.55)',
    },
    motifs: ['paper', 'scanlines'],
    motifAngle: 45,
    frame: 'stamped',
    font: 'serif',
  },
  blockWorld: {
    id: 'blockWorld',
    name: 'BLOCK WORLD',
    category: 'games',
    inspiration: 'Clean procedural block geometry',
    tagline: 'Everything is made of something smaller.',
    palette: {
      background: '#14201A',
      surface: '#1C2B22',
      primary: '#4FA85C',
      secondary: '#5FA8D9',
      accent: '#8C8C86',
      text: '#EDF2ED',
      muted: 'rgba(237,242,237,0.55)',
    },
    motifs: ['grid'],
    frame: 'sharp',
    font: 'mono',
  },
  wizardArchive: {
    id: 'wizardArchive',
    name: 'WIZARD ARCHIVE',
    category: 'books',
    inspiration: 'Magical-school library catalog',
    tagline: 'Filed under: builders of unusual talent.',
    palette: {
      background: '#1C130E',
      surface: '#2A1D14',
      primary: '#6E1F2B',
      secondary: '#1F4A34',
      accent: '#C9A227',
      text: '#EFE0C2',
      muted: 'rgba(239,224,194,0.55)',
    },
    motifs: ['paper', 'stars'],
    frame: 'stamped',
    font: 'serif',
  },
  middleEarthArchive: {
    id: 'middleEarthArchive',
    name: 'MIDDLE EARTH ARCHIVE',
    category: 'books',
    inspiration: 'Aged map linework and bronze',
    tagline: 'Not all who wander lack a roadmap.',
    palette: {
      background: '#14140D',
      surface: '#201E14',
      primary: '#2F4A2E',
      secondary: '#8A6A3A',
      accent: '#C9A876',
      text: '#E8DEC4',
      muted: 'rgba(232,222,196,0.55)',
    },
    motifs: ['paper', 'topo'],
    frame: 'engraved',
    font: 'serif',
  },
  ministryFile: {
    id: 'ministryFile',
    name: 'MINISTRY FILE',
    category: 'books',
    inspiration: 'Bureaucratic personnel dossier',
    tagline: 'Builder status: under observation.',
    palette: {
      background: '#0F0E0C',
      surface: '#1A1917',
      primary: '#C9241B',
      secondary: '#17140F',
      accent: '#D9CDB0',
      text: '#E8E0C8',
      muted: 'rgba(232,224,200,0.55)',
    },
    motifs: ['grid', 'paper'],
    frame: 'stamped',
    font: 'mono',
  },
  galacticGuide: {
    id: 'galacticGuide',
    name: 'GALACTIC GUIDE',
    category: 'books',
    inspiration: 'Cosmic infographic technical diagrams',
    tagline: 'Mostly harmless. Extremely deterministic.',
    palette: {
      background: '#06070F',
      surface: '#0E1020',
      primary: '#2FE0E8',
      secondary: '#B6FF3D',
      accent: '#1A1D33',
      text: '#E8ECFF',
      muted: 'rgba(232,236,255,0.55)',
    },
    motifs: ['stars', 'grid'],
    frame: 'sharp',
    font: 'mono',
  },
};

export const themeList = Object.values(cardThemes);

export const DEFAULT_THEME_ID = 'builderCity';

export function getTheme(id: string | undefined | null): CardTheme {
  if (id && cardThemes[id]) return cardThemes[id];
  return cardThemes[DEFAULT_THEME_ID];
}

export function randomThemeId(excludeId?: string): string {
  const candidates = themeList.filter((t) => t.id !== excludeId);
  const pool = candidates.length ? candidates : themeList;
  return pool[Math.floor(Math.random() * pool.length)].id;
}
