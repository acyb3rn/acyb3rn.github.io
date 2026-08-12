// Everything on the site comes from this file. To add a project, add an object.
//
// media   : path to a screenshot, gif or webm in assets/. Leave "" for a placeholder.
// badge   : "open source" | "closed source" | "client work"
// tagline : one short line, shown under the title
// tech    : lowercase tags, shown as pills
// links   : { label, url } — first one is styled as the primary action
//
// Cards sit in a three-column grid, so keep descriptions to three or four
// sentences. Long paragraphs make the row heights uneven and stop people
// reading. The detail belongs in each repo's README.

const PROJECTS = [
  {
    id: "product-field-analyzer",
    title: "Product Field Analyzer",
    badge: "open source",
    media: "assets/product-field-analyzer.webm",
    poster: "assets/product-field-analyzer.jpg",
    tagline: "Vision-model attribute extraction with a human in the loop",
    description:
      "Reads product photographs and fills in missing marketplace attributes, shipped as a CLI and a Tkinter desktop client over a shared analyzer core. The model is constrained to JSON-only output and returns a per-field confidence score with <em>unknown</em> as a first-class value, so an uncertain field is recorded as an abstention rather than a wrong answer. Each item retries with configurable backoff. The desktop client runs analysis on a worker thread that reports back through a queue polled on the Tk main loop, which keeps the interface responsive and lets a run be cancelled mid-flight. Results land in a review queue where every row is approved or rejected before anything is exported.",
    tech: ["python", "openai vision", "flask", "tkinter"],
    links: [
      { label: "GitHub", url: "https://github.com/acyb3rn/product-field-analyzer" }
    ]
  },
  {
    id: "amazon-size-rule-extractor",
    title: "Size Rule Extractor",
    badge: "open source",
    media: "assets/amazon-size-rule-extractor.png",
    tagline: "Flattens deeply nested JSON Schema into a queryable table",
    description:
      "A schema flattener for Amazon's product type definitions, which encode size validation as if/then/else chains nested several levels deep across roughly 450&nbsp;KB of JSON Schema per product type. The walker recurses through every branch, lifting condition enums out of each <code>if</code> and the target field out of its <code>then</code>, and auto-detects the size container so apparel, shirt and footwear schemas resolve down the same path despite differing shapes. Every emitted row carries its rule index and branch path, so any value traces back to the exact position in the schema it came from. Output is an openpyxl workbook, one filterable sheet per product type across thirty types.",
    tech: ["python", "json schema", "openpyxl"],
    links: [
      { label: "GitHub", url: "https://github.com/acyb3rn/amazon-size-rule-extractor" }
    ]
  },
  {
    id: "argus",
    title: "Argus",
    badge: "open source",
    media: "assets/argus.png",
    tagline: "Unattended sync against a portal with no public API",
    description:
      "An unattended fetcher for a university portal that offers neither notifications nor bulk download. Playwright drives the Google OAuth flow once and a response hook lifts the bearer token out of the login traffic; from there the browser is discarded entirely and a <code>requests</code> session talks to the portal's internal REST API directly, refreshing against the token endpoint as credentials expire. Materials are diffed against a persisted seen-set so only new files are pulled, filenames are sanitised per course, and notification payloads are parsed for assignment deadlines. Runs under launchd at 08:00 daily and completed a full semester without a missed day.",
    tech: ["python", "playwright", "requests", "cron"],
    links: [
      { label: "GitHub", url: "https://github.com/acyb3rn/argus" }
    ]
  },
  {
    id: "aware",
    title: "Aware",
    badge: "closed source",
    media: "assets/aware.jpg",
    tagline: "Interrupts navigation to force a deliberate decision",
    description:
      "A Chrome extension that inserts a pause between intent and habit. Where a conventional blocker resolves a flagged domain to allow or deny, Aware interrupts navigation and holds the request until an explicit decision is made, turning an automatic action into a chosen one. Built end to end as an independent product: concept, interface and implementation. Closed source while it is prepared for release as a subscription.",
    tech: ["javascript", "chrome extensions api"],
    links: [
      { label: "Visit Site", url: "https://getaware.app/en" }
    ]
  },
  {
    id: "portex",
    title: "Portex Georgia",
    badge: "client work",
    media: "assets/portex.jpg",
    tagline: "Bilingual marketing site plus an authenticated client portal",
    description:
      "The web presence for an international freight forwarder, built and maintained as sole developer: a bilingual English and Georgian marketing site alongside an authenticated client portal that surfaces status, route and ETA per container. Auth and Postgres run on Supabase. Structured data and SEO were part of the build rather than a later pass over it. An ongoing engagement rather than a completed handoff.",
    tech: ["react", "typescript", "tailwind", "supabase"],
    links: [
      { label: "Visit Site", url: "https://portexgeo.com/" }
    ]
  },
  {
    id: "choppy",
    title: "Choppy",
    badge: "spec build",
    media: "assets/choppy.jpg",
    tagline: "Static, booking-led, built for cellular",
    description:
      "A speculative build for a Tbilisi barbershop, structured around booking: services, team, hours and a Georgian and English locale split with the Georgian as the default, since that is what the customers actually read. Astro was chosen so the output ships as static HTML with almost no client-side JavaScript — the traffic here is overwhelmingly mobile over cellular, where page weight outweighs every other consideration.",
    tech: ["astro", "html", "css"],
    links: [
      // Points at /en/ rather than the root: the site defaults to Georgian and
      // everyone reading this page is reading it in English.
      { label: "Live preview", url: "https://acyb3rn.github.io/choppy-barbershop/en/" }
    ]
  }
];
