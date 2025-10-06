// src/services/tokenUtils.js
export function decodeJwtPayload(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch (err) {
    console.error('JWT decode failed:', err);
    return null;
  }
}

export function getUserInfoFromToken(token) {
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  const username =
    payload.userName ||
    payload.username ||
    payload.name ||
    payload.unique_name ||
    payload.sub ||
    null;

  const email = payload.email || payload.user_email || null;
  return { username, email, payload };
}
