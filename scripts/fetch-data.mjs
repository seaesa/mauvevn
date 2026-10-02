// Builds data/products.json and data/collections.json from the store's public JSON endpoints.
// Only factual catalogue data is kept (names, prices, images, variants, short spec lines).
// Long-form marketing copy (collection descriptions, blog posts) is intentionally not copied.
import { writeFile, mkdir } from "node:fs/promises";

const BASE = "https://mauvevn.com";
const UA = { headers: { "User-Agent": "Mozilla/5.0" } };

const SWATCHES = {
  "Đen hoạ tiết": "color_code_new_38.png", "Xám hoạ tiết": "color_code_new_39.png",
  "Ren vàng": "color_code_new_29.png", "Ren xanh navy": "color_code_new_30.png",
  "Tím / Plum": "color_code_new_5.png", "Xanh rêu / Olive": "color_code_new_6.png",
  "Hồng / Pastel Pink": "color_code_new_40.png", "Xanh / Mint Aqua": "color_code_new_41.png",
  "Kem / Vani": "color_code_new_85.png", "Nâu / Caramel": "color_code_new_86.png",
  "Trắng / Snow White": "color_code_new_23.png", "Đen / Charcoal": "color_code_new_10.png",
  "Xám": "color_code_new_15.png", "Hồng": "color_code_new_18.png",
  "Nâu vân": "color_code_new_2.png", "Đỏ rượu": "color_code_new_4.png",
  "Xanh hoạ tiết": "color_code_new_12.png", "Vàng hoạ tiết": "color_code_new_13.png"
};

async function getJSON(path) {
  const res = await fetch(BASE + path, UA);
  if (!res.ok) throw new Error(path + " -> " + res.status);
  return res.json();
}

async function allProducts(collection) {
  const out = [];
  for (let page = 1; page < 20; page++) {
    const { products } = await getJSON(`/collections/${collection}/products.json?limit=50&page=${page}`);
    out.push(...products);
    if (products.length < 50) break;
  }
  return out;
}

// short factual lines only: "- Chất liệu: ...", "- Size: ...", headings, model info
function specLines(html) {
  const text = (html || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
  return text.split("\n").map(s => s.replace(/\s+/g, " ").trim())
    .filter(s => s && s.length <= 120);
}

function slim(p) {
  const imgById = Object.fromEntries((p.images || []).map(i => [i.id, i.src]));
  const colorIdx = (p.options || []).findIndex(o => /màu/i.test(o.name));
  const colors = colorIdx >= 0 ? p.options[colorIdx].values : [];
  return {
    handle: p.handle,
    title: p.title,
    type: p.product_type,
    available: p.available,
    images: (p.images || []).map(i => i.src.replace(/^http:/, "https:")),
    options: (p.options || []).map(o => ({ name: o.name, values: o.values })),
    colorIndex: colorIdx,
    swatches: colors.map(c => ({ name: c, chip: SWATCHES[c] || null })),
    variants: (p.variants || []).map(v => ({
      id: v.id,
      title: v.title,
      options: [v.option1, v.option2, v.option3].filter(Boolean),
      sku: v.sku,
      price: Number(v.price),
      compare: Number(v.compare_at_price) || 0,
      available: v.available,
      image: imgById[v.image_id] || null
    })),
    specs: specLines(p.body_html)
  };
}

async function sitemapCollections() {
  const xml = await (await fetch(BASE + "/sitemap_collections_1.xml", UA)).text();
  return [...xml.matchAll(/collections\/([^<]+)<\/loc>/g)].map(m => m[1]);
}

async function main() {
  await mkdir("data", { recursive: true });

  const products = (await allProducts("all")).map(slim);
  const byHandle = Object.fromEntries(products.map(p => [p.handle, p]));

  const handles = ["all", ...(await sitemapCollections())];
  const collections = {};
  for (let i = 0; i < handles.length; i += 4) {
    await Promise.all(handles.slice(i, i + 4).map(async h => {
      try {
        const meta = h === "all" ? { collection: { title: "Tất cả sản phẩm" } } : await getJSON(`/collections/${h}.json`);
        const list = await allProducts(h);
        list.forEach(p => { if (!byHandle[p.handle]) { const s = slim(p); byHandle[s.handle] = s; products.push(s); } });
        collections[h] = { handle: h, title: meta.collection.title || h, products: list.map(p => p.handle) };
      } catch (e) {
        console.warn("skip", h, e.message);
      }
    }));
  }

  await writeFile("data/products.json", JSON.stringify(products));
  await writeFile("data/collections.json", JSON.stringify(collections));
  console.log("products:", products.length, "collections:", Object.keys(collections).length);
}

main();
