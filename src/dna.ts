import type { Builder, BuilderDNA } from './types';

const archetypes = [
  ['Signal Architect', 'Turns noise into systems.'],
  ['Protocol Pirate', 'Breaks maps. Ships routes.'],
  ['Zero-to-One Nomad', 'Finds the product before the crowd.'],
  ['Chain Alchemist', 'Composes primitives into leverage.'],
  ['Model Whisperer', 'Coaxes useful behavior from probability.'],
  ['Interface Shaman', 'Makes complexity feel obvious.'],
  ['Systems Surfer', 'Rides distributed chaos without wiping out.'],
  ['Growth Cartographer', 'Maps attention into adoption.'],
  ['Latency Hunter', 'Finds milliseconds hiding in the walls.'],
  ['Agent Wrangler', 'Gives autonomous loops useful boundaries.'],
  ['Proof Mechanic', 'Trusts evidence more than vibes.'],
  ['Full-Stack Buccaneer', 'Owns the path from click to commit.'],
] as const;

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const bounded = (seed: number, shift: number) => 55 + ((seed >>> shift) % 43);

export function getBuilderDNA(builder: Builder): BuilderDNA {
  const seed = hash(`${builder.name}|${builder.stack}|${builder.handle}`.toLowerCase());
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

export function getCrewClass(builders: Builder[]) {
  const active = builders.filter((b) => b.name.trim() || b.stack.trim());
  const seed = hash(active.map((b) => `${b.name}:${b.stack}`).join('|'));
  const classes = [
    ['THE SIGNAL CARTEL', 'Different frequencies. One transmission.'],
    ['THE SHIPWRIGHTS', 'Ideas are cheap. Launches leave wakes.'],
    ['THE CHAOS ENGINE', 'Unreasonable speed, surprisingly stable.'],
    ['THE PROTOCOL CLUB', 'Interfaces change. Coordination compounds.'],
    ['THE COASTAL LAB', 'Build hard. Debug barefoot.'],
    ['THE ZERO-DAY CREW', 'Find the gap. Ship before sunrise.'],
  ] as const;
  const [name, motto] = classes[seed % classes.length];
  return { name, motto, code: `CREW-${(seed % 9999).toString().padStart(4, '0')}` };
}
