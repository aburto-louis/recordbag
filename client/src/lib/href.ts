export function safeInternalHref(value: unknown, fallback: string) {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return fallback
  }

  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return fallback
  }

  const url = new URL(value, "http://recordbag.local")

  if (url.origin !== "http://recordbag.local" || url.pathname === "/") {
    return fallback
  }

  return `${url.pathname}${url.search}${url.hash}`
}
