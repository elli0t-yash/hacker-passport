import type { Format, ResolvedFormat } from '../types';

export function resolveFormat(format: Format, autoDefault: ResolvedFormat): ResolvedFormat {
  return format === 'auto' ? autoDefault : format;
}

export function autoBuilderFormat(): ResolvedFormat {
  return 'portrait';
}

export function autoCrewFormat(memberCount: number): ResolvedFormat {
  return memberCount <= 1 ? 'portrait' : 'landscape';
}

export type CrewLayoutKey = 'portrait-1' | 'portrait-2' | 'portrait-3' | 'landscape-1' | 'landscape-2' | 'landscape-3';

export function getCrewLayout(orientation: ResolvedFormat, memberCount: number): CrewLayoutKey {
  const count = Math.min(3, Math.max(1, memberCount)) as 1 | 2 | 3;
  return `${orientation}-${count}`;
}

export const EXPORT_DIMENSIONS: Record<ResolvedFormat, { width: number; height: number; domWidth: number; domHeight: number }> = {
  portrait: { width: 1080, height: 1350, domWidth: 540, domHeight: 675 },
  landscape: { width: 1600, height: 900, domWidth: 800, domHeight: 450 },
};
