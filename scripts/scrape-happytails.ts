/**
 * Scrapes product catalog from thehappytails.co.in and writes prisma/happytails-products.json
 * Run: npx tsx scripts/scrape-happytails.ts
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE = "https://thehappytails.co.in";
const SHOP_URL = `${BASE}/shop.php`;
const OUTPUT = resolve(process.cwd(), "prisma/happytails-products.json");

type ScrapedVariant = {
  variant: string;
  price: number;
  mrp: number;
  sku: string;
  stock: number;
  image: string;
};

type ScrapedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: "FOOD" | "TOYS" | "ACCESSORIES" | "HEALTH" | "GROOMING";
  petType: "DOG" | "CAT" | "BIRD" | "FISH" | "SMALL_PET" | "ALL";
  images: string[];
  featured: boolean;
  variants: ScrapedVariant[];
};

const BEST_SELLER_SLUGS = new Set([
  "me-o-creamy-crab-cat-treats",
  "drools-cat-treat-biscuits-real-chicken-flavor-400g-jar",
  "pedigree-puppy-wet-dog-food-chicken-in-gravy-with-vegetables-15-pouches-15-x-70g",
  "me-o-kitten-persian-dry-cat-food-1-2-kg-chicken-flavour-pack-of-1",
  "me-o-kitten-persian-dry-cat-food-6-8-kg-chicken-flavour-pack-of-1",
  "me-o-pouch-kitten-wet-food-tuna-in-jelly-80-g-pack-of-12",
]);

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}

function absImage(path: string) {
  if (path.startsWith("http")) return path;
  return `${BASE}/${path.replace(/^\//, "")}`;
}

function parseStock(specs: string | undefined) {
  const match = specs?.match(/(\d+)\s+in stock/i);
  return match ? Number(match[1]) : 10;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function inferCategory(
  name: string,
  slug: string,
  image: string,
): ScrapedProduct["category"] {
  const haystack = `${name} ${slug} ${image}`.toLowerCase();

  if (
    /(food|treat|snack|kibble|gravy|pedigree|drools|me-o|whiskas|royal canin|purepet|smartheart|friskies|farmina|jerky|biscuit|peanut butter|litter(?! scoop)|catnip)/.test(
      haystack,
    )
  ) {
    return "FOOD";
  }
  if (
    /(shampoo|groom|brush|comb|clipper|trimmer|bath|dryer|nail|ear cleaner|deodor)/.test(
      haystack,
    )
  ) {
    return "GROOMING";
  }
  if (/(toy|ball|chew|squeak|plush|fetch|rope toy|catnip toy|scratcher|ferret toy)/.test(haystack)) {
    return "TOYS";
  }
  if (
    /(vitamin|supplement|tonic|probiotic|medicine|health|wellness|pharmazyme|calcium tablet|vet spray|vet powder|aimil)/.test(
      haystack,
    )
  ) {
    return "HEALTH";
  }
  if (
    /(collar|leash|harness|carrier|backpack|litter scoop|bowl|feeder|bed|mat|crate|cage|aquarium|filter|accessories)/.test(
      haystack,
    )
  ) {
    return "ACCESSORIES";
  }
  if (image.includes("DOG PRODUCTS") || image.includes("CAT PRODUCTS")) {
    return "FOOD";
  }
  if (image.includes("ACCESSORIES")) return "ACCESSORIES";
  return "ACCESSORIES";
}

function inferPetType(
  name: string,
  slug: string,
  image: string,
): ScrapedProduct["petType"] {
  const haystack = `${name} ${slug} ${image}`.toLowerCase();

  if (/(bird|parrot|budgie|cockatiel)/.test(haystack)) return "BIRD";
  if (/(fish|aquarium|goldfish|betta)/.test(haystack)) return "FISH";
  if (/(hamster|rabbit|guinea|small pet|rodent)/.test(haystack)) {
    return "SMALL_PET";
  }

  const isDog = /(dog|puppy|canine|pedigree|drools)/.test(haystack);
  const isCat = /(cat|kitten|feline|me-o|whiskas|persian cat)/.test(haystack);

  if (isDog && isCat) return "ALL";
  if (isDog || image.includes("DOG PRODUCTS")) return "DOG";
  if (isCat || image.includes("CAT PRODUCTS")) return "CAT";
  return "ALL";
}

function parseShopCards(html: string) {
  const cards = [...html.matchAll(/<article class="product-card"[\s\S]*?<\/article>/g)].map(
    (match) => match[0],
  );

  const products = new Map<string, ScrapedProduct>();

  for (const card of cards) {
    const slugMatch = card.match(/product\.php\?slug=([^"&]+)/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];

    const payloadMatch = card.match(/data-wishlist='([^']+)'/);
    if (!payloadMatch) continue;

    const payload = JSON.parse(decodeHtmlEntities(payloadMatch[1])) as {
      name: string;
      price: number;
      mrp: number;
      image: string;
      variant: string;
      sku: string;
      specs?: string;
      variants?: Array<{
        variant: string;
        price: number;
        mrp: number;
        image: string;
        sku: string;
        specs?: string;
      }>;
    };

    const variants: ScrapedVariant[] = (payload.variants ?? [payload]).map((v) => ({
      variant: v.variant,
      price: v.price,
      mrp: v.mrp,
      sku: v.sku,
      stock: parseStock(v.specs),
      image: absImage(v.image),
    }));

    const primary = variants[0];
    if (!primary) continue;

    products.set(slug, {
      name: payload.name,
      slug,
      description: payload.name,
      price: primary.price,
      stock: primary.stock,
      category: inferCategory(payload.name, slug, primary.image),
      petType: inferPetType(payload.name, slug, primary.image),
      images: [primary.image],
      featured: BEST_SELLER_SLUGS.has(slug),
      variants,
    });
  }

  return [...products.values()];
}

async function fetchProductDetails(slug: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`${BASE}/product.php?slug=${encodeURIComponent(slug)}`, {
        headers: { "User-Agent": "HappyTailsImport/1.0" },
      });
      if (!res.ok) continue;
      const html = await res.text();

      const descMatch = html.match(
        /<div class="product-info-grid">[\s\S]*?<h2>Description<\/h2>\s*<p>([\s\S]*?)<\/p>/,
      );
      const description = descMatch
        ? descMatch[1].replace(/\s+/g, " ").trim()
        : null;

      const categoryMatch = html.match(/<li>Category:\s*([^<]+)<\/li>/i);
      const siteCategory = categoryMatch?.[1]?.trim().toLowerCase() ?? null;

      return { description, siteCategory };
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }
  return { description: null, siteCategory: null };
}

function mapSiteCategory(siteCategory: string | null): ScrapedProduct["category"] | null {
  if (!siteCategory) return null;
  if (siteCategory.includes("dog food") || siteCategory.includes("cat food") || siteCategory.includes("treat")) {
    return "FOOD";
  }
  if (siteCategory.includes("toy")) return "TOYS";
  if (siteCategory.includes("accessories")) return "ACCESSORIES";
  if (siteCategory.includes("groom")) return "GROOMING";
  if (siteCategory.includes("health")) return "HEALTH";
  return null;
}

async function main() {
  console.log("Fetching shop catalog...");
  const shopRes = await fetch(SHOP_URL);
  if (!shopRes.ok) {
    throw new Error(`Failed to fetch shop page: ${shopRes.status}`);
  }

  const shopHtml = await shopRes.text();
  const products = parseShopCards(shopHtml);
  console.log(`Found ${products.length} products. Fetching descriptions...`);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const details = await fetchProductDetails(product.slug);
    if (details.description) {
      product.description = details.description;
    }

    const mappedCategory = mapSiteCategory(details.siteCategory);
    if (mappedCategory) {
      product.category = mappedCategory;
    }

    if (product.variants.length > 1) {
      const variantLines = product.variants
        .map((v) => `${v.variant}: Rs. ${v.price} (SKU: ${v.sku}, ${v.stock} in stock)`)
        .join("; ");
      product.description = `${product.description}\n\nAvailable options: ${variantLines}`;
    }

    if ((i + 1) % 25 === 0 || i + 1 === products.length) {
      console.log(`  ${i + 1}/${products.length} descriptions fetched`);
    }

    await new Promise((resolve) => setTimeout(resolve, 75));
  }

  products.sort((a, b) => a.name.localeCompare(b.name));

  writeFileSync(OUTPUT, JSON.stringify(products, null, 2));
  console.log(`Wrote ${products.length} products to ${OUTPUT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
