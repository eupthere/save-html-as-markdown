const UNSAFE_CHARS = /[<>:"/\\|?*\x00-\x1f]/g;
const TRAILING_DOTS_SPACES = /[. ]+$/;
const MAX_LENGTH = 200;

export function sanitizeFilename(title: string): string {
  let name = title.trim();

  if (!name) {
    return 'untitled';
  }

  name = name.replace(UNSAFE_CHARS, '-');
  name = name.replace(TRAILING_DOTS_SPACES, '');
  name = name.replace(/-{2,}/g, '-');

  if (name.length > MAX_LENGTH) {
    name = name.slice(0, MAX_LENGTH).replace(/-$/, '');
  }

  return name || 'untitled';
}
