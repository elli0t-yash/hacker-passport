import { toBlob, toPng } from 'html-to-image';

export async function downloadNode(node: HTMLElement, filename: string) {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#07130d',
    style: { transform: 'none', margin: '0' },
  });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function shareNode(node: HTMLElement, filename: string, text: string) {
  const blob = await toBlob(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#07130d',
    style: { transform: 'none', margin: '0' },
  });

  if (!blob) throw new Error('Could not render image.');
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], text });
    return 'native';
  }

  try {
    if (navigator.clipboard && 'ClipboardItem' in window) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
    }
  } catch {
    // Clipboard image is best-effort; X compose still opens below.
  }

  const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(intent, '_blank', 'noopener,noreferrer');
  return 'x';
}
