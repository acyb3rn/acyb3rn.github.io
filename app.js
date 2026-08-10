// Renders the project cards from PROJECTS (see projects.js).

(function () {
  "use strict";

  var BADGE_CLASS = {
    "open source": "badge--open",
    "closed source": "badge--closed",
    "client work": "badge--client"
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

    var head = el("div", "card-head");
    var href = primaryUrl(project);
    var title = el("h3");
    if (href) {
      var a = el("a", null, project.title);
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      title.appendChild(a);
    } else {
      title.textContent = project.title;
    }
    head.appendChild(title);

    if (project.badge) {
      head.appendChild(
        el("span", "badge " + (BADGE_CLASS[project.badge] || ""), project.badge)
      );
    }
    body.appendChild(head);

    if (project.tagline) body.appendChild(el("p", "tagline", project.tagline));
    if (project.description) body.appendChild(el("p", "desc", project.description));

    if (project.tech && project.tech.length) {
      var tech = el("div", "tech");
      project.tech.forEach(function (t) { tech.appendChild(el("span", null, t)); });
      body.appendChild(tech);
    }

    var live = (project.links || []).filter(function (l) { return l.url; });
    if (live.length) {
      var actions = el("div", "actions");
      live.forEach(function (l, i) {
        var btn = el("a", "btn" + (i === 0 ? " btn--primary" : ""), l.label);
        btn.href = l.url;
        btn.target = "_blank";
        btn.rel = "noopener";
        actions.appendChild(btn);
      });
      body.appendChild(actions);
    } else if (project.badge === "closed source") {
      body.appendChild(
        el("p", "note", "Closed source. Details and a walkthrough available on request.")
      );
    }

    card.appendChild(body);
    return card;
  }

  var list = document.getElementById("project-list");
  if (list && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach(function (p) { list.appendChild(buildCard(p)); });
  }
})();
