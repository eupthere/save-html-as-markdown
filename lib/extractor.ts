import Defuddle from 'defuddle';

export interface ExtractedPage {
  html: string;
  title: string;
  author: string;
  published: string;
  description: string;
  domain: string;
  site: string;
  image: string;
  wordCount: number;
  url: string;
}

export function extractPage(doc: Document): ExtractedPage {
  const result = new Defuddle(doc).parse();

  return {
    html: result.content,
    title: result.title ?? '',
    author: result.author ?? '',
    published: result.published ?? '',
    description: result.description ?? '',
    domain: result.domain ?? '',
    site: result.site ?? '',
    image: result.image ?? '',
    wordCount: result.wordCount ?? 0,
    url: window.location.href,
  };
}
