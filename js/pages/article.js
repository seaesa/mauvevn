(function () {
  "use strict";
  var M = window.Mauve;
  var list = window.MauveContent.ARTICLES;
  var handle = M.param("handle");
  var idx = list.findIndex(function (a) { return a.handle === handle; });
  var a = list[idx];
  if (!a) {
    document.querySelector(".js-article-title").textContent = "Không tìm thấy bài viết";
    return;
  }
  document.title = "Mauve – " + a.title;
  document.querySelector(".js-article-title").textContent = a.title;
  document.querySelector(".js-article-date").textContent = a.date;
  document.querySelector(".js-article-body").innerHTML =
    "<p>" + M.esc(a.excerpt) + "</p>" +
    a.images.map(function (src) { return '<img src="' + src + '" alt="" loading="lazy">'; }).join("");
  var prev = list[idx - 1], next = list[idx + 1];
  document.querySelector(".js-article-nav").innerHTML =
    (prev ? '<a class="link-underline" href="' + M.routes.article(prev.handle) + '">← ' + M.esc(prev.title) + "</a>" : "<span></span>") +
    (next ? '<a class="link-underline" href="' + M.routes.article(next.handle) + '">' + M.esc(next.title) + " →</a>" : "");
})();
