(function () {
  "use strict";

  var CDN = "https://cdn.hstatic.net/products/200000408461/";
  var THEME = "https://theme.hstatic.net/200000408461/1001266442/14/";

  var PRODUCTS = [
    { handle: "ao-luc", name: "Áo Lục dáng suông | Mauve Sage top", price: "620,000đ", img1: "10_44f9f479ac814173939bb74e73230343", img2: "11_18697053913549f9bb09216b59801b74" },
    { handle: "an-dress", name: "Đầm An dáng babydoll | Mauve Soft Floral dress", price: "1,090,000đ", img1: "1_9168590c727f45b18b4d391cdeb0bdae", img2: "2_8153f3d97ca84743ba72eac7bf00606c" },
    { handle: "da-khuc-dress", name: "Đầm Dạ Khúc 12 tầng bèo | Mauve Midnight Melody dress", price: "1,590,000đ", img1: "27_8fce4929decd42c79da39f1bde2675b2", img2: "28_aa2c831d8c384aa5b804ed587c5c815b" },
    { handle: "dung-dress", name: "Đầm Dung cổ vuông | Mauve Parisian dress", price: "1,190,000đ", img1: "37_78860e489fa44627b540dca90caa06fb", img2: "38_9695bd704d0e4f44a5078ad56a0574fe",
      swatches: [
        { title: "Nâu vân", chip: "color_code_new_2.png", img: "38_9695bd704d0e4f44a5078ad56a0574fe" },
        { title: "Đỏ rượu", chip: "color_code_new_4.png", img: "45_02b9d751d4854f8db315e176ef29b583" }
      ] },
    { handle: "luc-dress", name: "Đầm Lục phối bèo | Mauve Sage dress", price: "1,390,000đ", img1: "23_51ea2fd4b033435396fa717fb6ffe561", img2: "24_ba3737f897954e2498ba5e3201aa3e31" },
    { handle: "nguyet-dress", name: "Đầm Nguyệt tùng chữ A | Mauve Moon dress", price: "1,190,000đ", img1: "5_287b6405baa74105ae48187b827de2c8", img2: "7_64990bff76e14ed99dc6718a87155a1a",
      swatches: [
        { title: "Xanh hoạ tiết", chip: "color_code_new_12.png", img: "6_f77117e697334256adbe4a7211e80e72" },
        { title: "Vàng hoạ tiết", chip: "color_code_new_13.png", img: "3_0be5ee52dd5f4c2c8df9370aa7c9ba3e" }
      ] },
    { handle: "suong-lam-dress", name: "Đầm Sương Lam lụa tay dài | Mauve Blue Haze dress", price: "1,190,000đ", img1: "48_416e3d5e1ae54f368e76e343d0a511d2", img2: "49_257f84635cb944f6aae9ababa2fb162a" },
    { handle: "thanh-hoa-dress", name: "Đầm Thanh Hoa midi tùng xoè | Mauve Grace dress", price: "1,290,000đ", img1: "53_8395826ea21f462cb9bc8d358c9a69a1", img2: "54_649da3301573477f805a78411386d7e1" },
    { handle: "yen-dom-dress", name: "Đầm Yên Đơm dáng yếm | Mauve Quiet Bloom dress", price: "1,590,000đ", img1: "33_4258154059074439a9d04f58d7f925f6", img2: "34_d7879292d4de499c881643ef5b0a4788" },
    { handle: "quan-luc", name: "Quần Lục ống loe | Mauve Sage pants", price: "890,000đ", img1: "17_3fe6582ef28343c6966b5ebc630bfa81", img2: "18_e6950243392441be8948a90b3df0d30c" }
  ];

  var root = document.documentElement;
  var body = document.body;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------ */
  /* Products                                                            */
  /* ------------------------------------------------------------------ */
  function renderProducts() {
    var track = $("#product-track");
    if (!track) return;
    track.innerHTML = PRODUCTS.map(function (p) {
      var sw = '<div class="swatches"></div>';
      if (p.swatches) {
        sw = '<div class="swatches">' + p.swatches.map(function (s) {
          return '<span class="swatch" data-title="' + s.title + '" data-img="' + CDN + s.img + '_1024x1024.jpg" style="background-image:url(' + THEME + s.chip + '?v=891)"></span>';
        }).join("") + "</div>";
      }
      return '<div class="pro-loop"><div class="pro-loop__wrap">' +
        '<div class="pro-loop__image"><a href="product.html?handle=' + p.handle + '">' +
          '<img class="img-1" src="' + CDN + p.img1 + '_1024x1024.jpg" alt="' + p.name + '" loading="lazy">' +
          '<img class="img-2" src="' + CDN + p.img2 + '_1024x1024.jpg" alt="" loading="lazy">' +
        "</a></div>" +
        '<h3 class="pro-loop__name"><a href="product.html?handle=' + p.handle + '" title="' + p.name + '">' + p.name + "</a></h3>" +
        '<div class="pro-loop__price"><strong>' + p.price + "</strong></div>" +
        sw +
      "</div></div>";
    }).join("");

    // swatch hover swaps the main image
    $$(".pro-loop", track).forEach(function (card) {
      var img1 = $(".img-1", card);
      var imageBox = $(".pro-loop__image", card);
      var original = img1.getAttribute("src");
      $$(".swatch", card).forEach(function (s) {
        s.addEventListener("mouseenter", function () {
          img1.src = s.getAttribute("data-img");
          imageBox.classList.add("is-swatch");
        });
        s.addEventListener("mouseleave", function () {
          img1.src = original;
          imageBox.classList.remove("is-swatch");
        });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Sticky header: fixed after 400px                                    */
  /* ------------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = $("#header");
    function measure() {
      root.style.setProperty("--header-h", header.getBoundingClientRect().bottom + "px");
    }
    function onScroll() {
      var scrolled = window.pageYOffset > 400;
      body.classList.toggle("is-scrolled", scrolled);
      if (scrolled) {
        $(".search-box") && body.classList.remove("search-open");
      }
      if (!body.classList.contains("menu-open")) measure();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    onScroll();
  }

  /* ------------------------------------------------------------------ */
  /* Header toggles: search / account / cart / mobile menu               */
  /* ------------------------------------------------------------------ */
  function closeAll() {
    body.classList.remove("cart-open", "menu-open", "no-scroll");
    $(".burger").setAttribute("aria-expanded", "false");
    $(".cart-note").classList.remove("is-active");
  }

  function initToggles() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-toggle]");
      if (t) {
        e.preventDefault();
        var what = t.getAttribute("data-toggle");
        if (what === "search") {
          body.classList.remove("account-open");
          body.classList.toggle("search-open");
          if (body.classList.contains("search-open")) $(".search-box input").focus();
        } else if (what === "account") {
          body.classList.remove("search-open");
          body.classList.toggle("account-open");
        } else if (what === "cart") {
          body.classList.remove("search-open", "account-open", "menu-open");
          body.classList.add("cart-open", "no-scroll");
        } else if (what === "menu") {
          var open = !body.classList.contains("menu-open");
          if (open) {
            var header = $("#header");
            var bottom = body.classList.contains("is-scrolled")
              ? $(".header-bottom").getBoundingClientRect().bottom
              : header.getBoundingClientRect().bottom;
            root.style.setProperty("--header-h", Math.max(bottom, 0) + "px");
          }
          body.classList.toggle("menu-open", open);
          body.classList.toggle("no-scroll", open);
          t.setAttribute("aria-expanded", String(open));
        }
        return;
      }

      var c = e.target.closest("[data-close]");
      if (c) {
        e.preventDefault();
        var target = c.getAttribute("data-close");
        if (target === "account") body.classList.remove("account-open");
        else closeAll();
        return;
      }

      var go = e.target.closest("[data-panel-go]");
      if (go) {
        e.preventDefault();
        var name = go.getAttribute("data-panel-go");
        $$(".account-panel").forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === name);
        });
        return;
      }

      var note = e.target.closest("[data-note]");
      if (note) {
        e.preventDefault();
        $(".cart-note").classList.toggle("is-active", note.getAttribute("data-note") === "open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        body.classList.remove("search-open", "account-open");
        closeAll();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 992 && body.classList.contains("menu-open")) closeAll();
    });
  }

  /* ------------------------------------------------------------------ */
  /* slideToggle helper                                                  */
  /* ------------------------------------------------------------------ */
  function slideToggle(el, duration) {
    duration = duration || 400;
    var isHidden = getComputedStyle(el).display === "none";
    el.style.overflow = "hidden";
    if (isHidden) {
      el.style.display = "block";
      var h = el.scrollHeight;
      el.style.height = "0px";
      el.offsetHeight; // reflow
      el.style.transition = "height " + duration + "ms ease";
      el.style.height = h + "px";
    } else {
      el.style.height = el.scrollHeight + "px";
      el.offsetHeight;
      el.style.transition = "height " + duration + "ms ease";
      el.style.height = "0px";
    }
    clearTimeout(el._slideT);
    el._slideT = setTimeout(function () {
      el.style.transition = "";
      el.style.height = "";
      el.style.overflow = "";
      el.style.display = isHidden ? "block" : "none";
    }, duration);
  }

  /* megamenu: links start under their own parent item (padding-left = item x) */
  function initMegamenu() {
    $$(".nav__item").forEach(function (item) {
      var panel = $(".megamenu__panel", item);
      if (!panel) return;
      item.addEventListener("mouseenter", function () {
        var link = item.querySelector(":scope > a");
        var base = $(".header-bottom").getBoundingClientRect().left;
        panel.style.paddingLeft = (link.getBoundingClientRect().left - base) + "px";
      });
    });
  }

  function initMobileMenu() {
    $$(".menu-mobile__head button").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var sub = btn.closest("li").querySelector(".menu-mobile__sub");
        if (!sub) return;
        slideToggle(sub, 400);
        btn.classList.toggle("is-active");
      });
    });
  }

  function initFooterAccordion() {
    $$(".footer__col--toggle .footer__title").forEach(function (title) {
      title.addEventListener("click", function () {
        if (window.innerWidth > 991) return;
        title.classList.toggle("is-open");
        slideToggle(title.nextElementSibling, 400);
      });
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 991) {
        $$(".footer__col--toggle .footer__body").forEach(function (b) { b.style.display = ""; });
        $$(".footer__title.is-open").forEach(function (t) { t.classList.remove("is-open"); });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero: fade slider, autoplay 4s, 1s fade, infinite, dots            */
  /* ------------------------------------------------------------------ */
  function initHero() {
    var hero = $("#hero");
    if (!hero) return;
    var slides = $$(".hero__slide", hero);
    var dotsWrap = $(".dots-vertical", hero);
    var index = 0;
    var timer;

    dotsWrap.innerHTML = slides.map(function (_, i) {
      return '<li><button type="button" class="dot' + (i === 0 ? " is-active" : "") + '" aria-label="' + (i + 1) + " of " + slides.length + '">' + (i + 1) + "</button></li>";
    }).join("");
    var dots = $$(".dot", dotsWrap);

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-active", k === index); });
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === index); });
    }
    function play() { clearInterval(timer); timer = setInterval(function () { go(index + 1); }, 4000); }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); play(); }); });
    hero.addEventListener("mouseenter", function () { clearInterval(timer); });
    hero.addEventListener("mouseleave", play);
    addSwipe(hero, function (dir) { go(index + dir); play(); });
    play();
  }

  /* ------------------------------------------------------------------ */
  /* Banners: <992 becomes an autoplay slide carousel with dots          */
  /* ------------------------------------------------------------------ */
  function initBanners() {
    var wrap = $("#banners");
    if (!wrap) return;
    var track = $(".banners__track", wrap);
    var items = $$(".banners__item", wrap);
    var dotsWrap = $(".banners__dots", wrap);
    var index = 0;
    var timer;

    dotsWrap.innerHTML = items.map(function (_, i) {
      return '<li><button type="button" class="dot' + (i === 0 ? " is-active" : "") + '" aria-label="' + (i + 1) + '">' + (i + 1) + "</button></li>";
    }).join("");
    var dots = $$(".dot", dotsWrap);

    function active() { return window.innerWidth < 992; }
    function go(i) {
      index = (i + items.length) % items.length;
      track.style.transform = active() ? "translateX(" + (-100 * index) + "%)" : "";
      dots.forEach(function (d, k) { d.classList.toggle("is-active", k === index); });
    }
    function play() {
      clearInterval(timer);
      if (active()) timer = setInterval(function () { go(index + 1); }, 4000);
    }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); play(); }); });
    addSwipe(wrap, function (dir) { if (active()) { go(index + dir); play(); } });
    window.addEventListener("resize", function () { go(active() ? index : 0); play(); });
    play();
  }

  /* simple horizontal swipe detection */
  function addSwipe(el, cb) {
    var x0 = null, y0 = null;
    el.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) cb(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Carousel: fractional slidesToShow, non-infinite, drag + arrows      */
  /* breakpoints: >1024 / ≤1024 / <991 ; ≤767 → native scroll (CSS)      */
  /* ------------------------------------------------------------------ */
  function initCarousel(el) {
    var viewport = $(".carousel__viewport", el);
    var track = $(".carousel__track", el);
    var prev = $(".carousel__arrow--prev", el);
    var next = $(".carousel__arrow--next", el);
    var show = el.getAttribute("data-show").split(",").map(Number);
    var index = 0;

    function perView() {
      var w = window.innerWidth;
      if (w < 991) return show[2];
      if (w <= 1024) return show[1];
      return show[0];
    }
    function slideW() { return Math.ceil(viewport.clientWidth / perView()); }
    function isNative() { return window.innerWidth <= 767; }
    function items() { return Array.prototype.slice.call(track.children); }
    function maxIndex() { return Math.max(0, Math.ceil(items().length - perView())); }

    function layout() {
      if (isNative()) {
        items().forEach(function (it) { it.style.width = ""; });
        track.style.transform = "";
        return;
      }
      var w = slideW();
      items().forEach(function (it) { it.style.width = w + "px"; });
      update();
    }
    function offsetFor(i) {
      var w = slideW();
      var maxOffset = Math.max(0, items().length * w - viewport.clientWidth);
      return Math.min(i * w, maxOffset);
    }
    function update() {
      if (isNative()) return;
      index = Math.max(0, Math.min(index, maxIndex()));
      track.style.transform = "translate3d(" + (-offsetFor(index)) + "px,0,0)";
      prev.classList.toggle("is-disabled", index === 0);
      next.classList.toggle("is-disabled", index >= maxIndex());
    }

    prev.addEventListener("click", function () { index--; update(); });
    next.addEventListener("click", function () { index++; update(); });

    // mouse / touch drag
    var startX = null, startOffset = 0, moved = false;
    function down(x) {
      if (isNative()) return;
      startX = x; startOffset = offsetFor(index); moved = false;
      track.classList.add("is-dragging");
    }
    function move(x) {
      if (startX === null) return;
      var dx = x - startX;
      if (Math.abs(dx) > 5) moved = true;
      track.style.transform = "translate3d(" + (-(startOffset - dx)) + "px,0,0)";
    }
    function up(x) {
      if (startX === null) return;
      track.classList.remove("is-dragging");
      var dx = x - startX;
      var w = slideW();
      if (Math.abs(dx) > w / 5) index += dx < 0 ? Math.max(1, Math.round(-dx / w)) : -Math.max(1, Math.round(dx / w));
      startX = null;
      update();
    }
    viewport.addEventListener("mousedown", function (e) { e.preventDefault(); down(e.clientX); });
    window.addEventListener("mousemove", function (e) { move(e.clientX); });
    window.addEventListener("mouseup", function (e) { up(e.clientX); });
    viewport.addEventListener("touchstart", function (e) { down(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener("touchmove", function (e) { move(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener("touchend", function (e) { up(e.changedTouches[0].clientX); });
    viewport.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });

    window.addEventListener("resize", layout);
    layout();
  }

  /* ------------------------------------------------------------------ */
  renderProducts();
  initHeaderScroll();
  initToggles();
  initMegamenu();
  initMobileMenu();
  initFooterAccordion();
  initHero();
  initBanners();
  $$("[data-carousel]").forEach(initCarousel);

  if (window.Mauve) {
    window.Mauve.initCarousel = initCarousel;
    window.Mauve.slideToggle = slideToggle;
  }
})();
