// The project cards are static markup now, generated from projects.js by
// build.js. This file is only the small bit of behaviour the page needs.

(function () {
  "use strict";

  // A looping video is motion the reader did not ask for. CSS cannot stop
  // playback, so honour the OS setting here and leave the poster frame showing.
  if (window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    Array.prototype.forEach.call(
      document.querySelectorAll("video[autoplay]"),
      function (v) {
        v.autoplay = false;
        v.loop = false;
        v.removeAttribute("autoplay");
        v.pause();
      }
    );
  }

  // Click the email to copy it. navigator.clipboard needs a secure context,
  // so fall back to a hidden textarea for file:// and older browsers.
  var copyBtn = document.querySelector(".copy-email");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function () {
    var email = copyBtn.getAttribute("data-email");

    function done() {
      copyBtn.classList.add("is-copied");
      setTimeout(function () { copyBtn.classList.remove("is-copied"); }, 1600);
    }

    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
