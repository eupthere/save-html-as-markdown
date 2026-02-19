import { defineProxy } from 'comctx';

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

class ImageService {
  async embedImages(markdown: string): Promise<string> {
    const matches = [...markdown.matchAll(IMAGE_RE)];
    if (matches.length === 0) return markdown;

    const entries = await Promise.all(
      matches.map(async (m) => {
        const url = m[2];
        if (url.startsWith('data:')) return null;
        try {
          const res = await fetch(url);
          const blob = await res.blob();
          const dataUrl = await blobToDataUrl(blob);
          return [url, dataUrl] as const;
        } catch {
          return null;
        }
      }),
    );

    let result = markdown;
    for (const entry of entries) {
      if (entry) result = result.replace(entry[0], entry[1]);
    }
    return result;
  }
}

export const [provideImageService, injectImageService] = defineProxy(
  () => new ImageService(),
  { namespace: '__lucas-image__' },
);
