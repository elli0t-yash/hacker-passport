export type Builder = {
  id: string;
  name: string;
  handle: string;
  stack: string;
  buildMode: string;
  photo: string;
};

export type BuilderDNA = {
  archetype: string;
  motto: string;
  code: string;
  stats: {
    vision: number;
    velocity: number;
    systems: number;
    chaos: number;
  };
};

export type CrewDNA = {
  name: string;
  motto: string;
  code: string;
  stats: {
    buildSpeed: number;
    techRange: number;
    productInstinct: number;
    chaosEnergy: number;
  };
};

export const STAT_META = {
  vision: { label: 'VISION', blurb: "sees what isn't built yet" },
  velocity: { label: 'VELOCITY', blurb: 'ships before doubt wins' },
  systems: { label: 'SYSTEMS', blurb: 'turns chaos into architecture' },
  chaos: { label: 'CHAOS', blurb: 'breaks rules strategically' },
} as const;

export const CREW_STAT_META = {
  buildSpeed: { label: 'BUILD SPEED' },
  techRange: { label: 'TECH RANGE' },
  productInstinct: { label: 'PRODUCT INSTINCT' },
  chaosEnergy: { label: 'CHAOS ENERGY' },
} as const;
