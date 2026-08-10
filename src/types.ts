export type Builder = {
  id: string;
  name: string;
  handle: string;
  stack: string;
  photo: string;
};

export type BuilderDNA = {
  archetype: string;
  code: string;
  motto: string;
  stats: {
    vision: number;
    velocity: number;
    systems: number;
    chaos: number;
  };
};
