import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

export function toMarkdown(html: string): string {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });

  turndown.use(gfm);

  return turndown.turndown(html);
}
