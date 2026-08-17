const WISHLIST_KEY = "pawfect-pets-wishlist";
export const WISHLIST_CHANGE_EVENT = "pawfect-wishlist-change";

function readIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(WISHLIST_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
}

export function getWishlistIds(): string[] {
  return readIds();
}

export function isInWishlist(productId: string): boolean {
  return readIds().includes(productId);
}

export function toggleWishlist(productId: string): boolean {
  const ids = readIds();
  const exists = ids.includes(productId);
  const next = exists ? ids.filter((id) => id !== productId) : [...ids, productId];
  writeIds(next);
  return !exists;
}

export function removeFromWishlist(productId: string) {
  writeIds(readIds().filter((id) => id !== productId));
}
