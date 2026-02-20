import { defineProxy } from 'comctx';

class DownloadService {
  async downloadMarkdown(markdown: string, filename: string): Promise<void> {
    // Firefox MV2 background page has DOM access but blocks data: URLs.
    // Chrome MV3 service worker lacks URL.createObjectURL but allows data: URLs.
    const url =
      typeof URL.createObjectURL === 'function'
        ? URL.createObjectURL(
            new Blob([markdown], { type: 'text/markdown;charset=utf-8' }),
          )
        : `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`;

    await browser.downloads.download({
      url,
      filename: `${filename}.md`,
      saveAs: true,
    });
  }
}

export const [provideDownloadService, injectDownloadService] = defineProxy(
  () => new DownloadService(),
  { namespace: '__save-html-as-markdown-download__' },
);
