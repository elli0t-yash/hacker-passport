import type { Builder, BuilderDNA } from '../types';

const archetypes = [
  ['SIGNAL ARCHITECT', 'Turns noise into systems.'],
  ['PROTOCOL PIRATE', 'Breaks maps. Ships routes.'],
  ['SYSTEMS SURFER', 'Rides distributed chaos without wiping out.'],
  ['MODEL WHISPERER', 'Coaxes useful behavior from probability.'],
  ['INTERFACE OUTLAW', 'Makes complexity feel obvious.'],
  ['SHIP ENGINEER', 'Owns the path from click to commit.'],
  ['CHAOS OPERATOR', 'Unreasonable speed, surprisingly stable.'],
  ['PRODUCT NOMAD', 'Finds the product before the crowd.'],
  ['STACK ALCHEMIST', 'Composes primitives into leverage.'],
  ['PIXEL MECHANIC', 'Fixes what the eye notices first.'],
  ['NETWORK RUNNER', 'Finds milliseconds hiding in the walls.'],
  ['DATA CARTOGRAPHER', 'Maps attention into adoption.'],
] as const;

export function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const bounded = (seed: number, shift: number) => 55 + ((seed >>> shift) % 43);

export function getBuilderSeed(builder: Builder) {
  return hash(`${builder.name}|${builder.stack}|${builder.handle}|${builder.buildMode}`.toLowerCase());
}

export function getBuilderDNA(builder: Builder): BuilderDNA {
  const seed = getBuilderSeed(builder);
  const [archetype, motto] = archetypes[seed % archetypes.length];
  return {
    archetype,
    motto,
    code: `HH26-${(seed % 99999).toString().padStart(5, '0')}`,
    stats: {
      vision: bounded(seed, 0),
      velocity: bounded(seed, 5),
      systems: bounded(seed, 10),
      chaos: bounded(seed, 15),
    },
  };
}
