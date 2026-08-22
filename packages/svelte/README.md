# UI (Svelte)

A design system for Anephenix — Svelte components.

[![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml)

**Not yet published to npm.** This package is complete (all 38 components — see
[Components](#components) below) but hasn't had its first release yet. In the meantime,
clone the [monorepo](https://github.com/anephenix/ui), run `npm i && npm run build-svelte`, and
depend on it via a local path or `npm link` from `packages/svelte`.

### Installation

```
npm i @anephenix/ui-svelte --save
```

### Dependencies

-   Node.js (24+)
-   Svelte (5+)

### Usage

Import the components and the stylesheet in your project:

```svelte
<script>
	import { Button, Input, NavBar } from '@anephenix/ui-svelte';
</script>
```

```js
import '@anephenix/ui-svelte/dist/index.css';
```

The stylesheet must be imported once at the root of your app.

### Components

37 of 38 accessible, themeable Svelte components grouped by category — forms, layout, display, overlays, and navigation. The one exception is `Code` (syntax-highlighted code blocks), which depends on a React-only highlighting library and hasn't been ported yet.

Full API reference: **[COMPONENTS.md](./COMPONENTS.md)**

If you're coming from [`@anephenix/ui`](https://www.npmjs.com/package/@anephenix/ui) (the React version), see [PORTING-CONTRACT.md](https://github.com/anephenix/ui/blob/master/PORTING-CONTRACT.md) in the monorepo root for the API differences between the two — prop names like `className`/`onClick` become `class`/`onclick`, `children` becomes a `Snippet`, and so on.

### Design System

The library ships a set of CSS custom properties for colours, spacing, typography, and grid that all components consume — the same tokens as the React package, since both are built from the same `packages/tokens` source. Override any token in your own stylesheet to theme the system without touching component code.

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

This package is part of the [anephenix/ui](https://github.com/anephenix/ui) monorepo. The docs site includes a live React/Svelte preview toggle on every component page — see the [repo root README](../../README.md).

---

### License and credits

&copy;2026 Anephenix Ltd. UI is licenced under the MIT Licence.
