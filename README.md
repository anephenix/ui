# UI

A design system for Anephenix.

[![npm version](https://badge.fury.io/js/%40anephenix%2Fui.svg)](https://badge.fury.io/js/%40anephenix%2Fui) [![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Socket Badge](https://socket.dev/api/badge/npm/package/@anephenix/ui)](https://socket.dev/npm/package/@anephenix/ui)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (24+)
-   React (19+)

### Usage

Import the components and the stylesheet in your project:

```jsx
import { Button, Input, NavBar } from '@anephenix/ui';
import '@anephenix/ui/dist/index.css';
```

The stylesheet must be imported once at the root of your app. See the full [Get Started guide](https://ui.anephenix.com/get-started) for framework-specific setup (Next.js App Router, Vite, Pages Router), token customisation, and layout utilities.

### Components

35+ accessible, themeable React components grouped by category — forms, layout, display, overlays, and navigation.

Full API reference: **[COMPONENTS.md](./COMPONENTS.md)**

### Design System

The library ships a set of CSS custom properties for colours, spacing, typography, and grid that all components consume. Override any token in your own stylesheet to theme the system without touching component code.

| Token group | Variables | Docs |
|-------------|-----------|------|
| Colours | `--primary-colour`, `--blue-one-colour`, … | [Colours](https://ui.anephenix.com/docs/colours) |
| Spacing | `--spacer-one` … `--spacer-five` | [Grid](https://ui.anephenix.com/docs/grid) |
| Typography | `--font-size-base`, `--font-weight-bold`, … | [Typography](https://ui.anephenix.com/docs/typography) |
| Layout | `.page`, `.container`, `.withSidePadding` | [Layout](https://ui.anephenix.com/docs/layout) |

### Tests

```
npm t
```

### Component screenshots

Screenshots of each component are stored in `public/screenshots/` and displayed on the docs overview page. Two scripts manage them.

#### Compute clip regions

```
npm run compute-clips
```

Visits every component's preview page at the configured viewport size (set in `scripts/screenshot-config.json`), measures each component element's bounding box via Puppeteer, adds padding, enforces a minimum size, and writes a `"clip"` entry for every component back into the config. Run this whenever a new component is added or an existing preview layout changes.

#### Generate screenshots

```
npm run screenshots
```

Reads `scripts/screenshot-config.json`, boots the Astro dev server, and captures a screenshot for each component using the configured strategy:

| Strategy | Behaviour |
|----------|-----------|
| `"clip"` | Crops to the `{ x, y, width, height }` region |
| `"element"` | Crops to the bounding box of a CSS selector |
| `"full"` | Captures the full viewport |

The output files are saved to `public/screenshots/<ComponentName>.png`.

#### Fine-tuning a clip manually

Open the preview page for a component in your browser:

```
http://localhost:4321/preview?component=Button
```

A **Crop Tool** panel appears in the bottom-right corner. Click **Draw crop**, drag a rectangle over the component, then click **Copy config snippet** to copy a ready-to-paste entry for `scripts/screenshot-config.json`. After saving the config, re-run `npm run screenshots` to regenerate.

#### Typical workflow for a new component

1. Add the component preview to `site/components/PreviewPage.jsx`
2. Run `npm run compute-clips` to auto-measure the clip region
3. Run `npm run screenshots` to generate the screenshot
4. Optionally open the preview page, use the Crop Tool to fine-tune, update the config, and re-run `npm run screenshots`

---

### License and credits

&copy;2026 Anephenix Ltd. UI is licenced under the MIT Licence.
