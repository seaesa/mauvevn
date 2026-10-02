(function () {
  "use strict";
  function show(name) {
    document.querySelectorAll("[data-account-tab]").forEach(function (b) { b.classList.toggle("is-active", b.getAttribute("data-account-tab") === name); });
    document.querySelectorAll("[data-account-panel]").forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-account-panel") === name); });
  }
  document.querySelectorAll("[data-account-tab]").forEach(function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-account-tab")); });
  });
  if (location.hash === "#register") show("register");
  document.querySelectorAll(".js-account-form").forEach(function (f) {
    f.addEventListener("submit", function () { document.querySelector(".account__msg").hidden = false; });
  });
})();
