(function () {
  var splashKey = "kuaforSplashSeen";
  var path = window.location.pathname;
  var isSplash = path === "/" || path === "/index.html";
  var isBot = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|yandex/i.test(
    navigator.userAgent || ""
  );

  if (!isSplash && !isBot) {
    try {
      if (!sessionStorage.getItem(splashKey)) {
        window.location.replace("/");
        return;
      }
    } catch (e) {}
  }

  var toggle = document.querySelector(".nav-toggle");
  var form = document.getElementById("randevu-form");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = toggle.querySelector("img");
      if (icon) {
        icon.src = open ? "/assets/icons/close.svg" : "/assets/icons/menu.svg";
      }
    });
  }

  document.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("nav-open");
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = String(data.get("ad") || "").trim();
      var phone = String(data.get("telefon") || "").trim();
      var service = String(data.get("hizmet") || "").trim();
      var date = String(data.get("tarih") || "").trim();
      var time = String(data.get("saat") || "").trim();
      var note = String(data.get("not") || "").trim();

      if (!name || !phone || !service) {
        alert("Lütfen ad, telefon ve hizmet alanlarını doldurun.");
        return;
      }

      var message = [
        "Merhaba, internetten görüp randevu istiyorum.",
        "Ad: " + name,
        "Telefon: " + phone,
        "Hizmet: " + service,
        date ? "Tarih: " + date : "",
        time ? "Saat: " + time : "",
        note ? "Not: " + note : ""
      ].filter(Boolean).join("\n");

      window.location.href =
        "https://wa.me/905388303683?text=" + encodeURIComponent(message);
    });
  }
})();
