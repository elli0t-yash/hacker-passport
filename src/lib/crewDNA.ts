import type { Builder, CrewDNA } from '../types';
import { getBuilderDNA, hash } from './builderDNA';

const crewClasses = [
  ['THE SIGNAL CARTEL', 'Different frequencies. One transmission.'],
  ['THE SHIPWRIGHTS', 'Ideas are cheap. Launches leave wakes.'],
  ['THE COASTAL LAB', 'Build hard. Debug barefoot.'],
  ['THE NIGHT SHIFT', 'Sunrise is a deadline, not a schedule.'],
  ['THE ZERO DAY CLUB', 'Find the gap. Ship before sunrise.'],
  ['THE PROTOCOL', 'Interfaces change. Coordination compounds.'],
  ['THE BUILD SYNDICATE', 'Three stacks, one heist.'],
  ['THE OUTLIERS', 'Nobody asked. We shipped anyway.'],
  ['THE SHIPPING DEPARTMENT', 'If it does not ship, it does not count.'],
  ['THE CHAOS ENGINE', 'Unreasonable speed, surprisingly stable.'],
] as const;

export function getActiveBuilders(builders: Builder[]) {
  return builders.filter((b) => b.name.trim() || b.stack.trim() || b.photo);
}

export function getCrewClass(builders: Builder[]): CrewDNA {
  const active = getActiveBuilders(builders);
  const seed = hash(active.map((b) => `${b.name}:${b.stack}:${b.buildMode}`).join('|'));
  const [name, motto] = crewClasses[seed % crewClasses.length];

  if (active.length === 0) {
    return {
      name,
      motto,
      code: `CREW-${(seed % 9999).toString().padStart(4, '0')}`,
      stats: { buildSpeed: 55, techRange: 55, productInstinct: 55, chaosEnergy: 55 },
    };
  }

  const dnas = active.map(getBuilderDNA);
  const avg = (fn: (d: ReturnType<typeof getBuilderDNA>) => number) =>
    Math.round(dnas.reduce((sum, d) => sum + fn(d), 0) / dnas.length);
  const stackWords = new Set(
    active.flatMap((b) => b.stack.split(/[,\/|]/).map((s) => s.trim().toLowerCase()).filter(Boolean)),
  );
  const techRange = Math.min(98, 50 + stackWords.size * 7);

  return {
    name,
    motto,
    code: `CREW-${(seed % 9999).toString().padStart(4, '0')}`,
    stats: {
      buildSpeed: avg((d) => d.stats.velocity),
      techRange,
      productInstinct: avg((d) => Math.round((d.stats.vision + d.stats.systems) / 2)),
      chaosEnergy: avg((d) => d.stats.chaos),
    },
  };
}

export function getCombinedStack(builders: Builder[], limit = 6) {
  const active = getActiveBuilders(builders);
  const words = active.flatMap((b) => b.stack.split(/[,\/|]/).map((s) => s.trim()).filter(Boolean));
  return Array.from(new Set(words)).slice(0, limit);
}
