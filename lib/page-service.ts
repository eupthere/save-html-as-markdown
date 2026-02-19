import { defineProxy } from 'comctx';
import { extractPage } from './extractor';
import { toMarkdown } from './converter';
import { buildFrontmatter } from './frontmatter';
import { sanitizeFilename } from './filename';

export interface PageMetadata {
  title: string;
  author: string;
  description: string;
  domain: string;
  site: string;
  wordCount: number;
  url: string;
}

class PageService {
  async getMetadata(): Promise<PageMetadata> {
    const extracted = extractPage(document);
    return {
      title: extracted.title,
      author: extracted.author,
      description: extracted.description,
      domain: extracted.domain,
      site: extracted.site,
      wordCount: extracted.wordCount,
      url: extracted.url,
    };
  }

  async extractPage(): Promise<{ markdown: string; filename: string }> {
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
    return { markdown, filename };
  }
}

export const [providePageService, injectPageService] = defineProxy(
  () => new PageService(),
  { namespace: '__save-html-as-markdown-page__' },
);
