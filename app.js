// Renders the project cards from PROJECTS (see projects.js).

(function () {
  "use strict";

  var BADGE_CLASS = {
    "open source": "badge--open",
    "closed source": "badge--closed",
    "client work": "badge--client",
    "spec build": "badge--spec"
  };

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function isVideo(path) {
    return /\.(webm|mp4)$/i.test(path);
  }

  // The first link, if there is one, becomes the clickable target for the
  // media and the title. Falls back to no link at all for closed source.
  function primaryUrl(project) {
    var first = (project.links || []).find(function (l) { return l.url; });
    return first ? first.url : "";
  }

  function buildMedia(project) {
    var href = primaryUrl(project);

    var media;
    if (!project.media) {
      media = el("div", "card-media card-media--ph");
      media.appendChild(el("span", null, "screenshot pending"));
    } else if (isVideo(project.media)) {
      media = el("video", "card-media");
      media.src = project.media;
      media.autoplay = true;
      media.loop = true;
      media.muted = true;
      media.playsInline = true;
      media.preload = "metadata";
      // Shown if the browser blocks autoplay or cannot decode the video.
      if (project.poster) media.poster = project.poster;
    } else {
      media = el("img", "card-media");
      media.src = project.media;
      media.alt = project.title + " screenshot";
      media.loading = "lazy";
      // If the file is missing, swap in the placeholder rather than
      // showing a broken image icon.
      media.onerror = function () {
        var ph = el("div", "card-media card-media--ph");
        ph.appendChild(el("span", null, "screenshot pending"));
        media.replaceWith(ph);
      };
    }

    if (!href) return media;

    var link = el("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener";
    link.appendChild(media);
    return link;
  }

  function buildCard(project) {
    var card = el("article", "card");
    card.id = project.id;

    card.appendChild(buildMedia(project));

    var body = el("div", "card-body");

    var href = primaryUrl(project);
    var title = el("h3", "card-title");
    if (href) {
      var a = el("a", null, project.title);
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      title.appendChild(a);
    } else {
      title.textContent = project.title;
    }
    body.appendChild(title);

    if (project.tagline) body.appendChild(el("p", "tagline", project.tagline));

    if (project.description) {
      var desc = el("p", "desc", project.description);
      body.appendChild(desc);

      // The description is clamped by CSS. Only offer the toggle when the
      // text is actually taller than the clamp, which we can only tell once
      // it has been laid out.
      var more = el("button", "more", "Read more");
      more.type = "button";
      more.hidden = true;
      more.addEventListener("click", function () {
        var open = card.classList.toggle("is-open");
        more.textContent = open ? "Show less" : "Read more";
      });
      body.appendChild(more);

      requestAnimationFrame(function () {
        if (desc.scrollHeight > desc.clientHeight + 2) more.hidden = false;
      });
    }

    if (project.tech && project.tech.length) {
      var tech = el("div", "tech");
      project.tech.forEach(function (t) { tech.appendChild(el("span", null, t)); });
      body.appendChild(tech);
    }

    // Footer row: buttons on the left, status label pushed to the right.
    var foot = el("div", "card-foot");

    var actions = el("div", "actions");
    (project.links || []).filter(function (l) { return l.url; })
      .forEach(function (l, i) {
        var btn = el("a", "btn" + (i === 0 ? " btn--primary" : ""), l.label);
        btn.href = l.url;
        btn.target = "_blank";
        btn.rel = "noopener";
        actions.appendChild(btn);
      });
    foot.appendChild(actions);

    if (project.badge) {
      foot.appendChild(
        el("span", "badge " + (BADGE_CLASS[project.badge] || ""), project.badge)
      );
    }
    body.appendChild(foot);

    card.appendChild(body);
    return card;
  }

  var list = document.getElementById("project-list");
  if (list && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach(function (p) { list.appendChild(buildCard(p)); });
  }

  // Click the email to copy it. navigator.clipboard needs a secure context,
  // so fall back to a hidden textarea for file:// and older browsers.
  var copyBtn = document.querySelector(".copy-email");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");

      function done() {
        copyBtn.classList.add("is-copied");
        setTimeout(function () { copyBtn.classList.remove("is-copied"); }, 1600);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done, fallback);
      } else {
        fallback();
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
    });
  }
})();
