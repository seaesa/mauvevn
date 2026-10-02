# Mauve clone (HTML/CSS/JS)

A hand-written, static rebuild of the mauvevn.com storefront theme for local study and demos.

## Run

Inner pages load catalogue data with `fetch()`, which browsers block on `file://`, so serve the folder:

```bash
python3 -m http.server 5500
# open http://localhost:5500
```

`index.html` also works when opened directly.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `collection.html?handle=<handle>` | Collection (53 handles in `data/collections.json`) |
| `product.html?handle=<handle>` | Product (72 products in `data/products.json`) |
| `search.html?q=<query>` | Search, accent-insensitive, 12 per page |
| `cart.html` | Cart (stored in `localStorage`) |
| `page.html?handle=<handle>` | Content pages: `thuong-hieu`, `bang-kich-co`, `chinh-sach-*`, `phuong-thuc-thanh-toan` |
| `contact.html` | Contact |
| `blog.html`, `article.html?handle=<handle>` | Blog |
| `account.html` | Login / register (demo only) |

## Structure

- `css/style.css`: global tokens, header, footer, home sections, cart sidebar
- `css/pages.css`: inner-page templates
- `js/store.js`: routes, money format, data loading, product card, cart and recently-viewed (localStorage)
- `js/layout.js`: injects the shared header, mobile menu, footer and cart sidebar into every page
- `js/main.js`: sticky header, menus, search/account/cart toggles, sliders, carousels, footer accordion
- `js/content.js`: text for content pages, blog and the shipping popup
- `js/pages/*.js`: one script per template
- `scripts/fetch-data.mjs`: rebuilds `data/*.json` from the store's public JSON (`node scripts/fetch-data.mjs`)
- `scripts/compare*.js`: Playwright scripts that compare element boxes against the live site

## Notes

- **Demo only.** Forms (login, register, contact) and the checkout button never send data anywhere.
- **Brand assets.** Product photos, logo, icons and the MauveSansSerif font are loaded from Mauve's CDN and belong to Mauve. Get permission or replace them before publishing anywhere.
- **Text content.** The content pages, collection descriptions, blog posts and shipping popup use short summaries written for this clone, not the shop's official copy. Paste the real text into `js/content.js`, or add a `description` field to a collection in `data/collections.json`.
