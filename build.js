// Renders projects.js into index.html as static markup.
//
// The cards used to be built in the browser, which meant the page contained no
// projects at all until JavaScript ran. Link previews and crawlers do not run
// JavaScript, so a portfolio whose entire point is the projects looked empty to
// them. Now the markup ships in the HTML and this script regenerates it.
//
//   node build.js       after any edit to projects.js
//
// It rewrites only what sits between the cards:start / cards:end markers.

const fs = require("fs");
const path = require("path");

const DIR = __dirname;
const START = "<!-- cards:start -->";
const END = "<!-- cards:end -->";

const BADGE_CLASS = {
  "open source": "badge--open",
  "closed source": "badge--closed",
  "client work": "badge--client",
  "spec build": "badge--spec"
};

// projects.js declares a const, so evaluate it and read the binding back out.
const PROJECTS = new Function(
  fs.readFileSync(path.join(DIR, "projects.js"), "utf8") + "\nreturn PROJECTS;"
)();

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const isVideo = (p) => /\.(webm|mp4)$/i.test(p);
const primaryUrl = (p) => ((p.links || []).find((l) => l.url) || {}).url || "";

function media(p) {
  if (!p.media) {
    return '<div class="card-media card-media--ph"><span>screenshot pending</span></div>';
  }
  if (isVideo(p.media)) {
    return (
      `<video class="card-media" src="${attr(p.media)}"` +
      (p.poster ? ` poster="${attr(p.poster)}"` : "") +
      ' autoplay loop muted playsinline preload="metadata"></video>'
    );
  }
  return (
    `<img class="card-media" src="${attr(p.media)}" ` +
    `alt="${attr(p.title)} screenshot" loading="lazy">`
  );
}

function card(p) {
  const href = primaryUrl(p);
  const link = (inner) =>
    href
      ? `<a href="${attr(href)}" target="_blank" rel="noopener">${inner}</a>`
      : inner;

  const out = [];
  out.push(`<article class="card" id="${attr(p.id)}">`);

  out.push(`  <div class="card-head">`);
  out.push(`    <h3 class="card-title">${link(p.title)}</h3>`);
  if (p.badge) {
    out.push(
      `    <span class="badge ${BADGE_CLASS[p.badge] || ""}">${p.badge}</span>`
    );
  }
  out.push(`  </div>`);

  out.push(`  ${link(media(p))}`);

  out.push(`  <div class="card-body">`);
  if (p.tagline) out.push(`    <p class="tagline">${p.tagline}</p>`);
  if (p.description) out.push(`    <p class="desc">${p.description}</p>`);
  if (p.tech && p.tech.length) {
    out.push(
      `    <div class="tech">` +
        p.tech.map((t) => `<span>${t}</span>`).join("") +
        `</div>`
    );
  }
  const live = (p.links || []).filter((l) => l.url);
  if (live.length) {
    out.push(
      `    <div class="actions">` +
        live
          .map(
            (l, i) =>
              `<a class="btn${i === 0 ? " btn--primary" : ""}" ` +
              `href="${attr(l.url)}" target="_blank" rel="noopener">${l.label}</a>`
          )
          .join("") +
        `</div>`
    );
  }
  out.push(`  </div>`);
  out.push(`</article>`);
  return out.join("\n");
}

const htmlPath = path.join(DIR, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
const a = html.indexOf(START);
const b = html.indexOf(END);
if (a === -1 || b === -1) {
  console.error(`Could not find ${START} / ${END} in index.html`);
  process.exit(1);
}

const cards = PROJECTS.map(card).join("\n\n");
const next =
  html.slice(0, a + START.length) + "\n" + cards + "\n      " + html.slice(b);

fs.writeFileSync(htmlPath, next);
console.log(`Wrote ${PROJECTS.length} cards into index.html`);
