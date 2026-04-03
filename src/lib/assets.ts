/**
 * Returns the correct path for assets in the public folder.
 * Uses import.meta.env.BASE_URL so it works both locally and on GitHub Pages.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path since BASE_URL already ends with one
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
