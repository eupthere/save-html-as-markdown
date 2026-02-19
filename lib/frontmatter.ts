interface FrontmatterData {
  title: string;
  author: string;
  published: string;
  description: string;
  url: string;
  domain: string;
}

function escapeYaml(value: string): string {
  if (/[:#\[\]{}&*!|>'"`,@]/.test(value) || value.includes('\n')) {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return value;
}

export function buildFrontmatter(meta: FrontmatterData): string {
  const lines: string[] = ['---'];

  if (meta.title) lines.push(`title: ${escapeYaml(meta.title)}`);
  if (meta.author) lines.push(`author: ${escapeYaml(meta.author)}`);
  if (meta.published) lines.push(`published: ${escapeYaml(meta.published)}`);
  if (meta.description) lines.push(`description: ${escapeYaml(meta.description)}`);
  if (meta.url) lines.push(`source: ${escapeYaml(meta.url)}`);
  if (meta.domain) lines.push(`site: ${escapeYaml(meta.domain)}`);
  lines.push(`saved: ${escapeYaml(new Date().toISOString())}`);

  lines.push('---', '');
  return lines.join('\n');
}
