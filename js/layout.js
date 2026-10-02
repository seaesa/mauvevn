/* Shared chrome: icon sprite, header, mobile menu, footer, cart sidebar, overlay. */
(function () {
  "use strict";
  var M = window.Mauve;
  var R = M.routes;
  var THEME = M.THEME;

  var MENU = [
    { title: "BỘ SƯU TẬP", hot: "Mới", url: R.collection("lumiere"), children: [
      ["Mộng đời thường", R.collection("mong-doi-thuong")],
      ["Summer 2026", R.collection("summer-2026")],
      ["Spring Summer 2026", R.collection("spring-summer-2026")],
      ["Hoa nắng", R.collection("hoa-nang")],
      ["Kind of casual", R.collection("kind-of-casual")],
      ["Everyday", R.collection("everyday")],
      ["Mauve Signature Line", R.collection("mauve-signature-line")]
    ] },
    { title: "SẢN PHẨM", url: R.collection("all"), children: [
      ["Tất cả Sản phẩm", R.collection("all")],
      ["Đầm liền", R.collection("dress")],
      ["Áo & Quần - Chân váy", R.collection("tops-and-bottoms")]
    ] },
    { title: "LIÊN HỆ", url: R.contact() },
    { title: "Hidden Glow", url: R.collection("hidden-glow") },
    { title: "SALE 50%", url: R.collection("sale-50") }
  ];

  function isActive(url) {
    var path = location.pathname.replace(/\/$/, "") || "/";
    var here = (path === "/" ? "/" : path + "/") + location.search;
    // normalize comparison: strip trailing slash from the path part of url
    var parts = url.split("?");
    var urlPath = parts[0].replace(/\/$/, "") || "/";
    var urlNorm = (urlPath === "/" ? "/" : urlPath + "/") + (parts[1] ? "?" + parts[1] : "");
    return decodeURIComponent(here) === decodeURIComponent(urlNorm);
  }

  var sprite =
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    '<symbol id="i-search" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="45.5" cy="45.5" r="25.2"/><path d="M63.7 64 79 79.3"/></symbol>' +
    '<symbol id="i-user" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M37.1 31.3c0-6.9 4-11.2 12.4-11.2s12.4 4.3 12.4 11.2c0 9.8-4.6 19.6-12.4 19.6S37.1 41.1 37.1 31.3Z"/><path d="M22.6 80.1s-1.6-29.2 26.9-29.2 26.9 29.2 26.9 29.2"/></symbol>' +
    '<symbol id="i-hanger" viewBox="0 0 128 128" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M56 45.6c0-5.5 4.5-10 10-10s10 4.6 9.6 10.4c-.2 3-1.6 5.1-3.6 8.2L66.5 66"/><path d="M66.5 66 102.6 76.6c3.7 1.1 6.4 4.5 6.4 8.3 0 4.7-3.9 8.6-8.6 8.6H27.6c-4.7 0-8.6-3.9-8.6-8.6 0-3.8 2.5-7.2 6.2-8.3L62 66"/></symbol>' +
    '<symbol id="i-close" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M25.2 25.2 74.5 74.5M74.5 25.2 25.2 74.5"/></symbol>' +
    '<symbol id="i-x" viewBox="24 24 52 52" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M25.2 25.2 74.5 74.5M74.5 25.2 25.2 74.5"/></symbol>' +
    '<symbol id="i-bars" viewBox="0 0 36 9" fill="none" stroke="currentColor" stroke-width="0.8"><path d="M0 .5h36M0 4.5h36M0 8.5h36"/></symbol>' +
    '<symbol id="i-chevron" viewBox="0 0 100 100" fill="currentColor"><path d="m67.4 45.4-2.8-2.8L50 57.2 35.4 42.6l-2.8 2.8L50 62.8z"/></symbol>' +
    '<symbol id="i-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4 7 12l8 8"/></symbol>' +
    '<symbol id="i-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 4 8 8-8 8"/></symbol>' +
    '<symbol id="i-long-arrow" viewBox="0 0 28 8" fill="none" stroke="currentColor" stroke-width="1"><path d="M0 4h27M23.5.5 27 4l-3.5 3.5"/></symbol>' +
    '<symbol id="i-long-arrow-left" viewBox="0 0 30 11" fill="none" stroke="currentColor" stroke-width="1"><path d="M30 5.5H1M4.8 1.5 1 5.5l3.8 4"/></symbol>' +
    "</svg>";

  function navItem(item) {
    var sub = item.children
      ? '<div class="megamenu"><ul class="megamenu__panel">' + item.children.map(function (c) {
          return '<li' + (isActive(c[1]) ? ' class="is-active"' : "") + '><a href="' + c[1] + '">' + M.esc(c[0]) + "</a></li>";
        }).join("") + "</ul></div>"
      : "";
    return '<li class="nav__item' + (isActive(item.url) ? " is-active" : "") + '"><a href="' + item.url + '">' +
      (item.hot ? '<span class="nav__hot">' + item.hot + "</span>" : "") + M.esc(item.title) + "</a>" + sub + "</li>";
  }

  function mobileItem(item) {
    var head = '<div class="menu-mobile__head"><a href="' + item.url + '">' + M.esc(item.title) + "</a>" +
      (item.children ? '<button type="button" aria-label="Mở"><svg><use href="#i-chevron"/></svg></button>' : "") + "</div>";
    var sub = item.children
      ? '<ul class="menu-mobile__sub">' + item.children.map(function (c) { return '<li><a href="' + c[1] + '">' + M.esc(c[0]) + "</a></li>"; }).join("") + "</ul>"
      : "";
    return "<li>" + head + sub + "</li>";
  }

  var header =
    '<header class="header" id="header">' +
      '<div class="header-top"><p>Account instagram: @mauve.vn</p></div>' +
      '<div class="header-bottom"><div class="header-bottom__inner">' +
        '<div class="header-logo"><a class="logo" href="' + R.home() + '" aria-label="Mauve"><img src="' + THEME + 'logo.png?v=891" alt="Mauve" width="85" height="33"></a></div>' +
        '<button class="burger" type="button" aria-label="Menu" aria-expanded="false" data-toggle="menu"><svg class="icon-bars"><use href="#i-bars"/></svg><svg class="icon-close" viewBox="0 0 100 100"><use href="#i-close"/></svg></button>' +
        '<nav class="nav" aria-label="Main"><ul class="nav__list">' + MENU.map(navItem).join("") + "</ul></nav>" +
        '<div class="header-icons">' +
          '<div class="search-wrap">' +
            '<a href="#" class="header-icon" data-toggle="search" aria-label="Tìm kiếm"><svg><use href="#i-search"/></svg></a>' +
            '<form class="search-box" action="/search/" role="search"><input type="text" name="q" placeholder="Tìm kiếm sản phẩm..." autocomplete="off" required><button type="submit" aria-label="Tìm"><svg><use href="#i-search"/></svg></button></form>' +
          "</div>" +
          '<div class="account-wrap">' +
            '<a href="#" class="header-icon" data-toggle="account" aria-label="Tài khoản"><svg><use href="#i-user"/></svg></a>' +
            '<div class="account-dropdown">' +
              '<span class="account-dropdown__triangle"><svg viewBox="0 0 20 9"><path d="M.47 9c.27-.27.57-.57.9-.9L9.25.31a1.06 1.06 0 0 1 1.5 0L19.49 9H.47z" fill="#fdfdfa"/></svg></span>' +
              '<div class="account-dropdown__content">' +
                '<div class="account-panel is-active" data-panel="login">' +
                  '<div class="account-panel__head"><h2 class="account-panel__title">Đăng nhập</h2><button type="button" class="account-panel__close" data-close="account" aria-label="Đóng"><svg viewBox="0 0 100 100"><use href="#i-close"/></svg></button></div>' +
                  '<form action="#" data-demo-form>' +
                    '<div class="field"><input type="email" id="login-email" placeholder=" " required><label for="login-email">email</label></div>' +
                    '<div class="field"><input type="password" id="login-pass" placeholder=" " required><label for="login-pass">password/mật khẩu</label><p class="field__forgot"><button type="button" data-panel-go="recover">Forgot your password/Quên mật khẩu?</button></p></div>' +
                    '<button type="submit" class="btn-login">Log in / Đăng nhập</button>' +
                  "</form>" +
                  '<div class="account-panel__secondary"><p><a href="' + R.account() + '#register">Đăng ký tài khoản / Create an account</a></p><p>to track orders and subscribe Mauve new letter</p></div>' +
                "</div>" +
                '<div class="account-panel" data-panel="recover">' +
                  '<div class="account-panel__head"><h2 class="account-panel__title">Reset mật khẩu</h2></div>' +
                  '<p class="account-panel__legend">We will send you an email to reset password</p>' +
                  '<p class="account-panel__legend">Chúng tôi sẽ gửi đến bạn email xác nhận để tạo mật khẩu</p>' +
                  '<form action="#" data-demo-form><div class="field"><input type="email" id="recover-email" placeholder=" " required><label for="recover-email">Email</label></div><button type="submit" class="btn-login">Submit / Gửi</button></form>' +
                  '<div class="account-panel__secondary"><p><button type="button" data-panel-go="login">↩ Trở về đăng nhập</button></p></div>' +
                "</div>" +
              "</div>" +
            "</div>" +
          "</div>" +
          '<div class="cart-wrap"><a href="' + R.cart() + '" class="header-icon header-icon--cart" data-toggle="cart" aria-label="Giỏ hàng"><span class="cart-count">0</span><svg viewBox="0 0 128 128"><use href="#i-hanger"/></svg></a></div>' +
        "</div>" +
      "</div></div>" +
    "</header>" +
    '<div class="menu-mobile" aria-hidden="true">' +
      '<div class="menu-mobile__list"><ul>' + MENU.map(mobileItem).join("") + "</ul></div>" +
      '<div class="menu-mobile__foot"><a href="' + R.account() + '"><svg><use href="#i-user"/></svg><span>TÀI KHOẢN</span></a></div>' +
    "</div>";

  function footerCol(title, body) {
    return '<div class="footer__col footer__col--toggle"><div class="footer__title"><h2>' + title + '</h2><svg class="icon"><use href="#i-chevron"/></svg></div><div class="footer__body">' + body + "</div></div>";
  }
  function links(list) {
    return '<div class="footer__menu">' + list.map(function (l) { return '<a href="' + l[1] + '">' + l[0] + "</a>"; }).join("") + "</div>";
  }

  var footer =
    '<footer class="footer"><div class="footer__main"><div class="footer__content"><div class="footer__cols">' +
      footerCol("GIỚI THIỆU", links([["Thương hiệu", R.page("thuong-hieu")], ["Liên hệ", R.contact()]])) +
      footerCol("HỖ TRỢ", links([
        ["Bảng kích cỡ", R.page("bang-kich-co")],
        ["Chính sách giao hàng", R.page("chinh-sach-giao-hang")],
        ["Phương thức thanh toán", R.page("phuong-thuc-thanh-toan")],
        ["Chính sách đổi hàng", R.page("chinh-sach-doi-hang")],
        ["Chính sách bảo mật", R.page("chinh-sach-bao-mat")]
      ])) +
      footerCol("KẾT NỐI", '<div class="footer__social">' +
        '<a href="https://www.facebook.com/mauvevn" target="_blank" rel="noopener"><img src="' + THEME + 'anhicon1.png?v=891" alt="Facebook"></a>' +
        '<a href="https://www.instagram.com/mauve.vn/" target="_blank" rel="noopener"><img src="' + THEME + 'anhicon2.png?v=891" alt="Instagram"></a></div>') +
      '<div class="footer__col footer__col--info"><div class="footer__info">' +
        "<p>Hộ kinh doanh Mauve</p><p>GPKD số 41H8184114 do phòng Tài chính - Kế hoạch Ủy ban nhân dân Quận 8 cấp ngày 30/06/2020</p><p>MST: 0316359954</p><p>Hotline: 0896620599</p>" +
      '</div><div class="footer__bct"><a href="#"><img src="' + THEME + 'ffooter_bct_img.png?v=891" alt="Đã thông báo Bộ Công Thương"></a></div></div>' +
    '</div></div></div><div class="footer__bottom"><p>Copyright © 2024 Mauve</p></div></footer>';

  var cartSidebar =
    '<aside class="cart-sidebar" aria-hidden="true">' +
      '<div class="cart-sidebar__top"><h2>Giỏ hàng <span class="js-cart-count-label">(0)</span></h2><button type="button" class="cart-sidebar__close" data-close="cart" aria-label="Đóng"><svg viewBox="24 24 52 52"><use href="#i-x"/></svg></button></div>' +
      '<div class="cart-sidebar__mid"></div>' +
      '<div class="cart-sidebar__bot">' +
        '<div class="cart-sidebar__total"><span>Tạm tính</span><span class="js-cart-total">0đ</span></div>' +
        '<a href="' + R.cart() + '" class="cart-sidebar__checkout"><b>MUA HÀNG</b></a>' +
        '<div class="cart-sidebar__links"><button type="button" data-note="open">Ghi chú</button><a href="' + R.cart() + '"><svg><use href="#i-long-arrow"/></svg>Xem chi tiết giỏ hàng</a></div>' +
      "</div>" +
      '<div class="cart-note"><div class="cart-note__head"><span>Ghi chú</span><button type="button" data-note="close" aria-label="Đóng"><svg viewBox="24 24 52 52"><use href="#i-x"/></svg></button></div>' +
        '<textarea placeholder="Add a note to your order"></textarea><a href="#" class="cart-note__save" data-note="save">Lưu</a></div>' +
    "</aside>" +
    '<div class="overlay" data-close="all"></div>';

  document.body.insertAdjacentHTML("afterbegin", sprite + header);
  document.body.insertAdjacentHTML("beforeend", footer + cartSidebar);

  // footer must sit after <main>, before cart sidebar
  var main = document.querySelector("main");
  var foot = document.querySelector(".footer");
  if (main && foot) main.after(foot);

  /* ---------------- cart rendering ---------------- */
  function variantLine(item) {
    var parts = [];
    if (item.color) {
      parts.push('<dd class="variant-value">' + (item.chip ? '<span class="variant-chip" style="background-image:url(' + M.chipUrl(item.chip) + ')"></span>' : "") + M.esc(item.color) + "</dd>");
    }
    if (item.size) parts.push('<dd class="variant-value">size ' + M.esc(item.size) + "</dd>");
    return '<dl class="cart-variant">' + parts.join("") + "</dl>";
  }

  function renderCartSidebar() {
    var c = M.cart.get();
    var mid = document.querySelector(".cart-sidebar__mid");
    if (!mid) return;
    if (!c.items.length) {
      mid.innerHTML = '<div class="cart-sidebar__empty">Giỏ hàng của bạn còn trống</div>';
    } else {
      mid.innerHTML = '<div class="cart-sidebar__items">' + c.items.map(function (i) {
        return '<div class="cart-item" data-id="' + i.id + '">' +
          '<div class="cart-item__left"><a href="' + R.product(i.handle) + '"><img src="' + M.sized(i.image, "compact") + '" alt="' + M.esc(i.title) + '"></a></div>' +
          '<div class="cart-item__right"><h4>' + M.esc(i.title) + "</h4>" + variantLine(i) +
            '<div class="cart-item__qty"><svg viewBox="24 24 52 52"><use href="#i-x"/></svg><input type="number" min="1" value="' + i.qty + '" data-cart-qty="' + i.id + '"></div>' +
            '<p class="cart-item__price">' + M.money(i.price * i.qty) + "</p>" +
          "</div>" +
          '<button type="button" class="cart-item__remove" data-cart-remove="' + i.id + '" aria-label="Xoá"><svg viewBox="24 24 52 52"><use href="#i-x"/></svg></button>' +
        "</div>";
      }).join("") + "</div>";
    }
    var count = M.cart.count();
    document.querySelectorAll(".cart-count").forEach(function (el) { el.textContent = count; });
    document.querySelectorAll(".js-cart-count-label").forEach(function (el) { el.textContent = "(" + count + ")"; });
    document.querySelectorAll(".js-cart-total").forEach(function (el) { el.textContent = M.money(M.cart.total()); });
    var note = document.querySelector(".cart-note textarea");
    if (note && document.activeElement !== note) note.value = c.note || "";
  }

  document.addEventListener("cart:change", renderCartSidebar);
  window.addEventListener("storage", renderCartSidebar);

  document.addEventListener("click", function (e) {
    var rm = e.target.closest("[data-cart-remove]");
    if (rm) { e.preventDefault(); M.cart.remove(Number(rm.getAttribute("data-cart-remove"))); return; }
    var save = e.target.closest('[data-note="save"]');
    if (save) {
      M.cart.setNote(document.querySelector(".cart-note textarea").value);
    }
  });
  document.addEventListener("change", function (e) {
    var q = e.target.closest("[data-cart-qty]");
    if (q) M.cart.setQty(Number(q.getAttribute("data-cart-qty")), Math.max(0, parseInt(q.value, 10) || 0));
  });
  // demo forms never submit anywhere
  document.addEventListener("submit", function (e) {
    if (e.target.matches("[data-demo-form]")) e.preventDefault();
  });

  renderCartSidebar();
  M.openCart = function () {
    document.body.classList.remove("search-open", "account-open", "menu-open");
    document.body.classList.add("cart-open", "no-scroll");
  };
})();
