/* Shared store helpers: routes, money, catalogue data, product card, cart (localStorage). */
(function () {
  "use strict";

  var THEME = "https://theme.hstatic.net/200000408461/1001266442/14/";
  var CART_KEY = "mauve_cart";
  var SEEN_KEY = "mauve_seen";

  var routes = {
    home: function () { return "/"; },
    collection: function (h) { return "/collection/?handle=" + encodeURIComponent(h); },
    product: function (h) { return "/product/?handle=" + encodeURIComponent(h); },
    page: function (h) { return "/page/?handle=" + encodeURIComponent(h); },
    search: function (q) { return "/search/?q=" + encodeURIComponent(q || ""); },
    contact: function () { return "/contact/"; },
    cart: function () { return "/cart/"; },
    blog: function () { return "/blog/"; },
    article: function (h) { return "/article/?handle=" + encodeURIComponent(h); },
    account: function () { return "/account/"; }
  };

  function money(n) {
    return Math.round(n).toLocaleString("en-US") + "đ";
  }

  function param(name) {
    return new URLSearchParams(location.search).get(name) || "";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // "abc.jpg" -> "abc_1024x1024.jpg" (Haravan image size suffix)
  function sized(src, size) {
    if (!src) return "";
    return src.replace(/(\.[a-z]+)(\?.*)?$/i, "_" + size + "$1");
  }

  function chipUrl(file) {
    return file ? THEME + file + "?v=891" : "";
  }

  /* ---------------- data ---------------- */
  var cache = {};
  function load(name) {
    if (!cache[name]) {
      cache[name] = fetch("/data/" + name + ".json").then(function (r) {
        if (!r.ok) throw new Error(name + " " + r.status);
        return r.json();
      });
    }
    return cache[name];
  }
  function products() { return load("products"); }
  function collections() { return load("collections"); }
  function productMap() {
    return products().then(function (list) {
      var m = {};
      list.forEach(function (p) { m[p.handle] = p; });
      return m;
    });
  }

  function priceInfo(p) {
    var v = p.variants.filter(function (x) { return x.available; })[0] || p.variants[0] || { price: 0, compare: 0 };
    return { price: v.price, compare: v.compare > v.price ? v.compare : 0 };
  }

  /* ---------------- product card ---------------- */
  function card(p, extraClass) {
    var info = priceInfo(p);
    var img1 = sized(p.images[0], "1024x1024");
    var img2 = sized(p.images[1] || p.images[0], "1024x1024");
    var price = info.compare
      ? '<strong class="is-sale">' + money(info.price) + "</strong><del>" + money(info.compare) + "</del>"
      : "<strong>" + money(info.price) + "</strong>";
    var sw = "";
    if (p.swatches && p.swatches.length > 1) {
      sw = p.swatches.map(function (s) {
        var v = p.variants.filter(function (x) { return x.options[p.colorIndex] === s.name && x.image; })[0];
        var style = s.chip ? ' style="background-image:url(' + chipUrl(s.chip) + ')"' : "";
        return '<span class="swatch" data-title="' + esc(s.name) + '" data-img="' + (v ? sized(v.image, "1024x1024") : "") + '"' + style + "></span>";
      }).join("");
    }
    return '<div class="pro-loop' + (extraClass ? " " + extraClass : "") + '"><div class="pro-loop__wrap">' +
      '<div class="pro-loop__image"><a href="' + routes.product(p.handle) + '">' +
        '<img class="img-1" src="' + img1 + '" alt="' + esc(p.title) + '" loading="lazy">' +
        '<img class="img-2" src="' + img2 + '" alt="" loading="lazy">' +
      "</a>" + (info.compare ? '<div class="lbl-sale">Sale</div>' : "") + "</div>" +
      '<h3 class="pro-loop__name"><a href="' + routes.product(p.handle) + '" title="' + esc(p.title) + '">' + esc(p.title) + "</a></h3>" +
      '<div class="pro-loop__price">' + price + "</div>" +
      '<div class="swatches">' + sw + "</div>" +
    "</div></div>";
  }

  // swatch hover swaps the main image (delegated, works for any rendered card)
  function bindCards(root) {
    (root || document).querySelectorAll(".pro-loop").forEach(function (cardEl) {
      if (cardEl._bound) return;
      cardEl._bound = true;
      var img1 = cardEl.querySelector(".img-1");
      var box = cardEl.querySelector(".pro-loop__image");
      if (!img1) return;
      var original = img1.getAttribute("src");
      cardEl.querySelectorAll(".swatch").forEach(function (s) {
        s.addEventListener("mouseenter", function () {
          var src = s.getAttribute("data-img");
          if (!src) return;
          img1.src = src;
          box.classList.add("is-swatch");
        });
        s.addEventListener("mouseleave", function () {
          img1.src = original;
          box.classList.remove("is-swatch");
        });
      });
    });
  }

  /* ---------------- cart ---------------- */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || { items: [], note: "" }; }
    catch (e) { return { items: [], note: "" }; }
  }
  function writeCart(c) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("cart:change", { detail: c }));
  }
  var cart = {
    get: readCart,
    count: function () { return readCart().items.reduce(function (n, i) { return n + i.qty; }, 0); },
    total: function () { return readCart().items.reduce(function (n, i) { return n + i.qty * i.price; }, 0); },
    add: function (item, qty) {
      var c = readCart();
      var found = c.items.filter(function (i) { return i.id === item.id; })[0];
      if (found) found.qty += qty;
      else c.items.push(Object.assign({}, item, { qty: qty }));
      writeCart(c);
    },
    setQty: function (id, qty) {
      var c = readCart();
      c.items = c.items.map(function (i) { if (i.id === id) i.qty = qty; return i; }).filter(function (i) { return i.qty > 0; });
      writeCart(c);
    },
    remove: function (id) {
      var c = readCart();
      c.items = c.items.filter(function (i) { return i.id !== id; });
      writeCart(c);
    },
    setNote: function (note) { var c = readCart(); c.note = note; writeCart(c); }
  };

  /* ---------------- recently viewed ---------------- */
  var seen = {
    get: function () { try { return JSON.parse(localStorage.getItem(SEEN_KEY)) || []; } catch (e) { return []; } },
    push: function (h) {
      var list = seen.get().filter(function (x) { return x !== h; });
      list.unshift(h);
      try { localStorage.setItem(SEEN_KEY, JSON.stringify(list.slice(0, 12))); } catch (e) {}
    }
  };

  window.Mauve = {
    THEME: THEME,
    routes: routes,
    money: money,
    param: param,
    esc: esc,
    sized: sized,
    chipUrl: chipUrl,
    products: products,
    collections: collections,
    productMap: productMap,
    priceInfo: priceInfo,
    card: card,
    bindCards: bindCards,
    cart: cart,
    seen: seen
  };
})();
