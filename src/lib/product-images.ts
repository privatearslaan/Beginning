export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .map(normalizeProductImageUrl);
  }
  return [];
}

export function normalizeProductImageUrl(url: string): string {
  if (!url) return "/placeholder-product.svg";

  const decoded = url
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  if (decoded.startsWith("/")) return decoded;

  try {
    const parsed = new URL(decoded);
    return parsed.href;
  } catch {
    return decoded;
  }
}
