(function () {
  "use strict";
  var M = window.Mauve;
  var C = window.MauveContent;
  var handle = M.param("handle");
  var page = C.PAGES[handle];
  var title = document.querySelector(".js-page-title");
  var body = document.querySelector(".js-page-content");
  if (!page) {
    title.textContent = "Không tìm thấy trang";
    return;
  }
  document.title = "Mauve – " + page.title;
  title.textContent = page.title;
  body.innerHTML = page.html;
})();
