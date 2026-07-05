/**
 * API base URL for backend. When hosted, set REACT_APP_API_URL in the build env.
 * In dev, proxy in package.json sends /api to backend, or use full URL.
 */
export const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:4000";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
