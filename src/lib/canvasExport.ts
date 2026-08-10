import { toBlob, toPng } from 'html-to-image';

async function waitForFonts() {
  try {
    if ('fonts' in document) await document.fonts.ready;
  } catch {
    // best-effort; export still proceeds with whatever is loaded
  }
}

export function sanitizeFilename(input: string) {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'builder';
}

const captureOptions = {
  pixelRatio: 2,
  cacheBust: true,
  backgroundColor: '#09070F',
  style: { transform: 'none', margin: '0' },
};

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('Export timed out.')), ms);
    promise.then((v) => { clearTimeout(id); resolve(v); }, (e) => { clearTimeout(id); reject(e); });
  });
}

export async function downloadNode(node: HTMLElement, filename: string) {
  await waitForFonts();
  const dataUrl = await withTimeout(toPng(node, captureOptions), 15000);
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function shareNode(node: HTMLElement, filename: string, text: string) {
  await waitForFonts();
  const blob = await withTimeout(toBlob(node, captureOptions), 15000);

  if (!blob) throw new Error('Could not render image.');
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], text });
    return 'native';
  }

  try {
    if (navigator.clipboard && 'ClipboardItem' in window) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    }
  } catch {
    // Clipboard image is best-effort; X compose still opens below.
  }

  const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(intent, '_blank', 'noopener,noreferrer');
  return 'x';
}
