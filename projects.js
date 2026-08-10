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
    tagline: "Reads product photos to fill missing listing data",
    description:
      "Marketplace listings get rejected for missing attributes. The usual fix is to ask the brand and wait weeks, even though the answer is visible in the photo. The harder problem is being wrong at a volume where you cannot check every answer: every field carries a confidence score, <em>unknown</em> is an allowed answer rather than a guess, and a person approves each row before export.",
    tech: ["python", "openai vision", "flask", "tkinter"],
    links: [
      { label: "GitHub", url: "https://github.com/acyb3rn/product-field-analyzer" }
    ]
  },
  {
    id: "amazon-size-rule-extractor",
    title: "Amazon Size Rule Extractor",
    badge: "open source",
    media: "assets/amazon-size-rule-extractor.png",
    tagline: "Flattens nested JSON Schema into something readable",
    description:
      "Amazon encodes size validation as if/then/else chains nested several levels deep in JSON Schema, around 450&nbsp;KB per product type. Finding one whitelist by hand takes minutes and is easy to get wrong, and there are thirty product types. This walks every branch and flattens them into a filterable Excel workbook, keeping the branch path on each row so any result traces back to its exact position in the schema.",
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
    tagline: "Daily course material downloader, unattended",
    description:
      "My university posts course materials with no notification and no bulk download. Argus gets through the Google OAuth wall with Playwright, then abandons the browser entirely and calls the portal's internal REST API directly, which I reverse-engineered from network traffic. It diffs against what it already has and fetches only what is new. Ran every morning at 08:00 for a full semester with zero missed days.",
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
    tagline: "Chrome extension for intentional browsing",
    description:
      "Most site blockers work on brute force: either the tab opens or it does not. Aware sits in between, intercepting flagged sites and asking for a conscious decision before letting you through, which turns an automatic habit into a choice you have to actually make. Built end to end as my own product, from the idea through to the interface. Currently being prepared for release as a subscription product.",
    tech: ["javascript", "chrome extensions api"],
    links: []
  },
  {
    id: "portex",
    title: "Portex Georgia",
    badge: "client work",
    media: "assets/portex.jpg",
    tagline: "Website and portal for a freight forwarder",
    description:
      "Sole developer of the web presence for an international freight forwarding company: a bilingual English and Georgian marketing site plus a customer portal for tracking shipments. SEO and structured data handled properly rather than bolted on, and a container tracking integration so customers can check status without emailing anyone. Ongoing work rather than a finished handoff.",
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
    tagline: "Concept site for a Tbilisi barbershop",
    description:
      "A speculative build for a local barbershop: booking-led layout, services, team, and opening hours, with a Georgian language toggle since that is what most of the customers actually read. Built with Astro so the output is mostly static HTML, because nearly all the traffic would arrive on a phone over mobile data and page weight matters more than anything clever.",
    tech: ["astro", "html", "css"],
    links: [
      { label: "Preview", url: "" }
    ]
  }
];
