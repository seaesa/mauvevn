(function () {
  "use strict";
  var M = window.Mauve;
  var C = window.MauveContent;
  var root = document.getElementById("product");
  var handle = M.param("handle");
  var SIZE_CHART = "https://file.hstatic.net/200000408461/file/size_chart_-_new_d8d3394d1a004174983d0b77b2700ee6.jpg";
  // collections that are promotions / price buckets, not real "collections"
  var SKIP = /^(all|shop-all|sale-50|50|18|88k|488k|688k|888k|new-year-offer-10-off|tron-mau|hoa-tiet|dress|tops-and-bottoms|mauve-ladies|mua-quan-lua-tang-ao-phong)$/;

  Promise.all([M.productMap(), M.collections()]).then(function (res) {
    var map = res[0];
    var cols = res[1];
    var p = map[handle];
    if (!p) {
      root.innerHTML = '<div class="container-xl"><div class="page-wrapper"><h1>Không tìm thấy sản phẩm</h1><p style="text-align:center"><a class="link-underline" href="' + M.routes.collection("all") + '">Xem tất cả sản phẩm</a></p></div></div>';
      return;
    }
    M.seen.push(p.handle);
    document.title = p.title;
    render(p, map, cols);
  });

  function optionIndex(p, re) {
    return p.options.findIndex(function (o) { return re.test(o.name); });
  }

  function render(p, map, cols) {
    var colorIdx = p.colorIndex;
    var sizeIdx = optionIndex(p, /kích|size/i);
    var first = p.variants.filter(function (v) { return v.available; })[0] || p.variants[0];
    var state = {
      color: colorIdx >= 0 ? first.options[colorIdx] : null,
      size: sizeIdx >= 0 ? first.options[sizeIdx] : null
    };

    var colorLine = "";
    if (colorIdx >= 0) {
      colorLine = '<div class="sw-line sw-line--color"><div class="sw-title"><b>' + M.esc(p.options[colorIdx].name) + "</b>" +
        "<p>Màu sản phẩm thật giống hình ảnh đến 99%</p></div><div class=\"sw-select\">" +
        p.swatches.map(function (s) {
          var v = p.variants.filter(function (x) { return x.options[colorIdx] === s.name && x.image; })[0];
          var bg = s.chip ? "background-image:url(" + M.chipUrl(s.chip) + ")" : (v ? "background-image:url(" + M.sized(v.image, "small") + ")" : "background:#ccc");
          return '<span class="sw-item sw-item--color" data-color="' + M.esc(s.name) + '" title="' + M.esc(s.name) + '"><span style="' + bg + '"></span></span>';
        }).join("") + "</div></div>";
    }
    var sizeLine = "";
    if (sizeIdx >= 0) {
      sizeLine = '<div class="sw-line sw-line--size"><div class="sw-title"><b>Kích cỡ</b></div><div class="sw-select">' +
        p.options[sizeIdx].values.map(function (s) {
          return '<span class="sw-item sw-item--size" data-size="' + M.esc(s) + '">' + M.esc(s) + "</span>";
        }).join("") + '</div><a class="link-underline sw-size-guide js-open-size">Bảng kích cỡ</a></div>';
    }

    root.innerHTML =
      '<div class="product__wrap">' +
        '<div class="product__gallery"><div class="product__images"></div><div class="product__dots"></div></div>' +
        '<div class="product__side"><div class="product__detail">' +
          '<a class="product__back" href="' + M.routes.collection("all") + '"><svg><use href="#i-long-arrow-left"/></svg>Xem thêm sản phẩm</a>' +
          '<h1 class="product__title">' + M.esc(p.title) + "</h1>" +
          '<div class="product__sku"><span>SKU:</span><b class="js-sku" style="font-weight:300"></b></div>' +
          '<div class="product__price"><span class="product__price-main js-price"></span><del class="js-compare"></del></div>' +
          '<div class="product__swatch">' + colorLine + sizeLine + "</div>" +
          '<div class="product__links"><div class="js-open-size"><a class="link-underline">Bảng kích cỡ</a></div><div><a class="link-underline js-open-info">Thông tin sản phẩm</a></div></div>' +
          '<div class="product__qty"><button type="button" data-qty="-1">-</button><input type="number" min="1" value="1" class="js-qty"><button type="button" data-qty="1">+</button></div>' +
          '<button type="button" class="btn-add js-add">THÊM VÀO GIỎ HÀNG</button>' +
          '<p class="product__ship"><a class="link-underline js-open-ship">Chính sách giao hàng</a></p>' +
        "</div></div>" +
      "</div>" +
      related(p, map, cols) +
      popups(p);

    var imagesEl = root.querySelector(".product__images");
    var dotsEl = root.querySelector(".product__dots");

    function currentVariant() {
      return p.variants.filter(function (v) {
        return (colorIdx < 0 || v.options[colorIdx] === state.color) && (sizeIdx < 0 || v.options[sizeIdx] === state.size);
      })[0];
    }

    // image order never changes (as on the live site); on phones the slider jumps to the colour's image
    function showColorImage() {
      var v = p.variants.filter(function (x) { return x.options[colorIdx] === state.color && x.image; })[0];
      var i = v ? p.images.indexOf(v.image) : -1;
      if (i >= 0 && window.innerWidth <= 767) imagesEl.scrollTo({ left: imagesEl.clientWidth * i, behavior: "smooth" });
    }

    function renderImages() {
      var imgs = p.images;
      imagesEl.innerHTML = imgs.map(function (src, i) {
        return '<div><img src="' + M.sized(src, "1024x1024") + '" alt="' + M.esc(p.title) + '"' + (i > 1 ? ' loading="lazy"' : "") + "></div>";
      }).join("");
      dotsEl.innerHTML = imgs.map(function (_, i) { return '<button type="button" class="' + (i === 0 ? "is-active" : "") + '" data-dot="' + i + '">' + (i + 1) + "</button>"; }).join("");
      imagesEl.scrollLeft = 0;
    }

    function update() {
      var v = currentVariant();
      root.querySelectorAll("[data-color]").forEach(function (el) { el.classList.toggle("is-active", el.getAttribute("data-color") === state.color); });
      root.querySelectorAll("[data-size]").forEach(function (el) {
        var s = el.getAttribute("data-size");
        el.classList.toggle("is-active", s === state.size);
        var any = p.variants.some(function (x) { return x.options[sizeIdx] === s && (colorIdx < 0 || x.options[colorIdx] === state.color) && x.available; });
        el.classList.toggle("is-soldout", !any);
      });
      root.querySelector(".js-sku").textContent = v ? v.sku : "";
      var price = v ? v.price : M.priceInfo(p).price;
      var compare = v && v.compare > v.price ? v.compare : 0;
      var priceEl = root.querySelector(".js-price");
      priceEl.textContent = M.money(price);
      priceEl.classList.toggle("is-sale", !!compare);
      root.querySelector(".js-compare").textContent = compare ? M.money(compare) : "";
      var btn = root.querySelector(".js-add");
      var ok = v && v.available;
      btn.disabled = !ok;
      btn.textContent = ok ? "THÊM VÀO GIỎ HÀNG" : "HẾT HÀNG";
    }

    root.addEventListener("click", function (e) {
      var c = e.target.closest("[data-color]");
      if (c) { state.color = c.getAttribute("data-color"); update(); showColorImage(); return; }
      var s = e.target.closest("[data-size]");
      if (s) { state.size = s.getAttribute("data-size"); update(); return; }
      var q = e.target.closest("[data-qty]");
      if (q) {
        var input = root.querySelector(".js-qty");
        input.value = Math.max(1, (parseInt(input.value, 10) || 1) + Number(q.getAttribute("data-qty")));
        return;
      }
      var dot = e.target.closest("[data-dot]");
      if (dot) { imagesEl.scrollTo({ left: imagesEl.clientWidth * Number(dot.getAttribute("data-dot")), behavior: "smooth" }); return; }
      if (e.target.closest(".js-add")) { addToCart(); return; }
      if (e.target.closest(".js-open-size")) { openPopup("size"); return; }
      if (e.target.closest(".js-open-info")) { openPopup("info"); return; }
      if (e.target.closest(".js-open-ship")) { openPopup("ship"); return; }
    });

    imagesEl.addEventListener("scroll", function () {
      var i = Math.round(imagesEl.scrollLeft / Math.max(1, imagesEl.clientWidth));
      dotsEl.querySelectorAll("button").forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
    }, { passive: true });

    function addToCart() {
      var v = currentVariant();
      if (!v || !v.available) return;
      var qty = Math.max(1, parseInt(root.querySelector(".js-qty").value, 10) || 1);
      var sw = p.swatches.filter(function (s) { return s.name === state.color; })[0];
      M.cart.add({
        id: v.id,
        handle: p.handle,
        title: p.title,
        image: v.image || p.images[0],
        price: v.price,
        color: state.color,
        chip: sw ? sw.chip : null,
        size: state.size
      }, qty);
      M.openCart();
    }

    renderImages();
    update();
    M.bindCards(root);
    root.querySelectorAll("[data-carousel]").forEach(function (el) { M.initCarousel(el); });
  }

  function related(p, map, cols) {
    var col = Object.keys(cols).map(function (k) { return cols[k]; }).filter(function (c) {
      return !SKIP.test(c.handle) && c.products.indexOf(p.handle) !== -1 && c.products.length > 1;
    })[0] || cols.all;
    var same = col.products.filter(function (h) { return h !== p.handle && map[h]; }).slice(0, 12);
    var seen = M.seen.get().filter(function (h) { return map[h]; }).slice(0, 12);
    return section("CÙNG BỘ SƯU TẬP", same, map) + section("CÓ THỂ BẠN CŨNG THÍCH", seen, map);
  }

  function section(title, handles, map) {
    if (!handles.length) return "";
    return '<section class="product__related">' +
      '<div class="section-head"><h2>' + title + "</h2></div>" +
      '<div class="carousel" data-carousel data-show="4.5,3,2.2">' +
        '<button type="button" class="carousel__arrow carousel__arrow--prev" aria-label="Previous"><svg><use href="#i-left"/></svg></button>' +
        '<div class="carousel__viewport"><div class="carousel__track">' + handles.map(function (h) { return M.card(map[h]); }).join("") + "</div></div>" +
        '<button type="button" class="carousel__arrow carousel__arrow--next" aria-label="Next"><svg><use href="#i-right"/></svg></button>' +
      "</div></section>";
  }

  function popups(p) {
    var specs = (p.specs || []).map(function (line) {
      return /^[A-ZÀ-Ỹ\s]+$/.test(line) && line.length < 40 ? "<h3>" + M.esc(line) + "</h3>" : "<p>" + M.esc(line) + "</p>";
    }).join("");
    function shell(name, cls, body) {
      return '<div class="side-popup ' + cls + '" data-popup="' + name + '">' +
        '<button type="button" class="side-popup__close" data-popup-close aria-label="Đóng"><svg viewBox="24 24 52 52"><use href="#i-x"/></svg></button>' +
        '<div class="side-popup__body">' + body + "</div></div>";
    }
    return shell("size", "", '<img src="' + SIZE_CHART + '" alt="Size chart">') +
      shell("info", "side-popup--info", specs || "<p>Đang cập nhật.</p>") +
      shell("ship", "side-popup--ship", C.shippingHtml);
  }

  function openPopup(name) {
    closePopups();
    var el = document.querySelector('[data-popup="' + name + '"]');
    if (!el) return;
    el.scrollTop = 0;
    el.classList.add("is-open");
    document.body.classList.add("popup-open", "no-scroll");
  }
  function closePopups() {
    document.querySelectorAll(".side-popup.is-open").forEach(function (el) { el.classList.remove("is-open"); });
    document.body.classList.remove("popup-open");
    if (!document.body.classList.contains("cart-open")) document.body.classList.remove("no-scroll");
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-popup-close]") || (e.target.closest(".overlay") && document.body.classList.contains("popup-open"))) closePopups();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePopups(); });
})();
