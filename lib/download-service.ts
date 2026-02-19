import { defineProxy } from 'comctx';

class DownloadService {
  async downloadMarkdown(markdown: string, filename: string): Promise<void> {
    const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`;
    await browser.downloads.download({
      url: dataUrl,
      filename: `${filename}.md`,
      saveAs: true,
    });
  }
}

export const [provideDownloadService, injectDownloadService] = defineProxy(
  () => new DownloadService(),
  { namespace: '__lucas-download__' },
);
