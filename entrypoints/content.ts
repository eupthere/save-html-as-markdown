import { extractPage } from '@/lib/extractor';
import { toMarkdown } from '@/lib/converter';
import { buildFrontmatter } from '@/lib/frontmatter';
import { sanitizeFilename } from '@/lib/filename';
import type { ContentMessage, PageMetadata, DownloadMarkdownRequest } from '@/lib/messages';

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    browser.runtime.onMessage.addListener(
      (msg: ContentMessage, _sender, sendResponse) => {
        if (msg.type === 'GET_METADATA') {
          const extracted = extractPage(document);
          const response: PageMetadata = {
            type: 'PAGE_METADATA',
            title: extracted.title,
            author: extracted.author,
            description: extracted.description,
            domain: extracted.domain,
            site: extracted.site,
            wordCount: extracted.wordCount,
            url: extracted.url,
          };
          sendResponse(response);
          return true;
        }

        if (msg.type === 'EXTRACT_PAGE') {
          const extracted = extractPage(document);
          const frontmatter = buildFrontmatter({
            title: extracted.title,
            author: extracted.author,
            published: extracted.published,
            description: extracted.description,
            url: extracted.url,
            domain: extracted.domain,
          });
          const markdown = frontmatter + toMarkdown(extracted.html);
          const filename = sanitizeFilename(extracted.title);

          const downloadMsg: DownloadMarkdownRequest = {
            type: 'DOWNLOAD_MD',
            markdown,
            filename,
          };
          browser.runtime.sendMessage(downloadMsg);
          sendResponse({ success: true });
          return true;
        }
      },
    );
  },
});
