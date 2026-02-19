import type { DownloadMarkdownRequest } from '@/lib/messages';

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((msg: DownloadMarkdownRequest) => {
    if (msg.type === 'DOWNLOAD_MD') {
      const dataUrl = `data:text/markdown;charset=utf-8,${encodeURIComponent(msg.markdown)}`;

      browser.downloads.download({
        url: dataUrl,
        filename: `${msg.filename}.md`,
        saveAs: true,
      });
    }
  });
});
