export function getImagePath(path: string): string {
  if (path.startsWith('/')) {
    return path;
  }
  return `/${path}`;
}