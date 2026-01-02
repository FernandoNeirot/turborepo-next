export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  const protocol = process.env.NEXT_PUBLIC_PROTOCOL || "http";
  const host = process.env.NEXT_PUBLIC_HOST || "localhost";
  const port = process.env.NEXT_PUBLIC_PORT || process.env.PORT || "3000";
  return `${protocol}://${host}:${port}`;
}

export function stripHtml(html: string): string {
  if (typeof window !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
