# Screenshots go here

The site works without these — missing files fall back to a "screenshot pending" placeholder rather than a broken image. But the cards are carrying a lot of text, and a portfolio of six text blocks reads as thin. Media is what makes this format work.

Filenames must match the `media` field in `projects.js`:

| File | What to capture |
|---|---|
| `product-field-analyzer.png` | The desktop app mid-review: rows filled in, a photo loaded in the preview pane, one row approved (green) and one rejected (red). This is the single most valuable screenshot on the site because it shows the human-in-the-loop design rather than describing it. |
| `amazon-size-rule-extractor.png` | The generated Excel with a filter applied, showing the `valid_values` column populated. The point is "450 KB of nested schema became this table". |
| `argus.png` | Terminal output of a run: the per-course lines and the "N new file(s) downloaded" summary. |
| `aware.png` | The extension intercepting a site, showing the prompt. |
| `portex.png` | The live site homepage. |
| `choppy.png` | The live site homepage. |

## Practical notes

**Size.** Aim for 1600×900. Anything above 2000px wide is wasted, since cards render around 830px on desktop.

**Format.** PNG for interfaces with text, JPEG for photo-heavy pages. Run them through [squoosh.app](https://squoosh.app) and target under 300&nbsp;KB each — a slow portfolio undoes the point of having one.

**Video.** `.webm` and `.mp4` work too, and autoplay muted on loop. A 6–10 second screen recording of the desktop app review flow would be stronger than a static image. Keep it under 2&nbsp;MB. Anything longer than about 12 seconds does not get watched.

**Use real data where you can.** Screenshots with placeholder text or Lorem Ipsum read as unfinished. If the data is client-sensitive, use the sample files in each repo instead.

**Retina.** On macOS, screenshots come out at 2× by default, so a window captured at 800px wide gives you a 1600px file. That is the right size already.
