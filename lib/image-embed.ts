function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function embedImages(html: string): Promise<string> {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const images = doc.querySelectorAll('img[src]');

  await Promise.all(
    Array.from(images).map(async (img) => {
      const src = img.getAttribute('src');
      if (!src || src.startsWith('data:')) return;

      try {
        const res = await fetch(src);
        const blob = await res.blob();
        img.setAttribute('src', await blobToDataUrl(blob));
      } catch {
        // keep original src if fetch fails
      }
    }),
  );

  return doc.body.innerHTML;
}
