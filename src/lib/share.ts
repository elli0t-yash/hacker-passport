export function builderShareText(archetype: string, stack: string) {
  const url = window.location.origin;
  return `Built my Builder DNA for Hacker House Goa '26 🌴\n\nClass: ${archetype}\nStack: ${stack || 'Multi-stack'}\n\nNow assembling the crew.\n\nDiscover yours ↓\n${url}\n\n#FrameInGoa #HHGOA2026`;
}

export function crewShareText(crewClass: string, memberNames: string[]) {
  const url = window.location.origin;
  const names = memberNames.filter(Boolean).join(' / ') || 'Unnamed builders';
  return `Crew signal locked. 🌴\n\n${crewClass}\n\n${names}\n\n${memberNames.length} builders.\n1 signal.\nGoa 2026.\n\nBuild your crew ↓\n${url}\n\n#FrameInGoa #HHGOA2026`;
}
