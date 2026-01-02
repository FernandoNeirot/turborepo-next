export function generateProductSlug(
  title: string,
  price: number,
  id?: string
): string {
  const normalizedTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);

  const priceStr = Math.round(price).toString();

  let hash = "";
  if (id) {
    hash = simpleHash(id).substring(0, 8);
  } else {
    hash = Date.now().toString(36).substring(0, 8);
  }

  return `${normalizedTitle}-${priceStr}-${hash}`;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
