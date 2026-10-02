(function () {
  "use strict";
  var M = window.Mauve;
  var handle = M.param("handle") || "all";
  var titleEl = document.querySelector(".collection__title");
  var descEl = document.querySelector(".collection__desc");
  var grid = document.querySelector(".product-grid");

  // descriptions live in their own file so scripts/fetch-data.mjs never overwrites them
  var descriptions = fetch("/data/collection-descriptions.json")
    .then(function (r) { return r.ok ? r.json() : {}; })
    .catch(function () { return {}; });

  Promise.all([M.collections(), M.productMap(), descriptions]).then(function (res) {
    var col = res[0][handle];
    var map = res[1];
    var descs = res[2];
    if (!col) {
      titleEl.textContent = "Không tìm thấy bộ sưu tập";
      grid.innerHTML = '<p class="collection__empty">Bộ sưu tập không tồn tại.</p>';
      return;
    }
    document.title = "Mauve – " + col.title;
    titleEl.textContent = col.title;
    descEl.textContent = col.description || descs[handle] || "";
    grid.innerHTML = col.products.map(function (h) { return map[h] ? M.card(map[h]) : ""; }).join("");
    M.bindCards(grid);
  }).catch(function () {
    grid.innerHTML = '<p class="collection__empty">Không tải được dữ liệu. Hãy mở trang qua một web server (xem README).</p>';
  });
})();
