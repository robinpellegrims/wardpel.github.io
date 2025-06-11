export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // For static exports, convert absolute paths to relative paths
  if (path.startsWith('/') && basePath) {
    return `${basePath}${path}`;
  }
  return path;
}