(function () {
  "use strict";
  var M = window.Mauve;
  var list = window.MauveContent.ARTICLES;
  document.querySelector(".js-blog-list").innerHTML = list.map(function (a) {
    var url = M.routes.article(a.handle);
    return '<div class="blog__item">' +
      '<a href="' + url + '"><img src="' + a.cover + '" alt="' + M.esc(a.title) + '" loading="lazy"></a>' +
      '<h2><a href="' + url + '">' + M.esc(a.title) + "</a></h2>" +
      "<p>" + M.esc(a.excerpt) + "</p>" +
      '<a class="blog__more" href="' + url + '">Discove more</a>' +
    "</div>";
  }).join("");
})();
