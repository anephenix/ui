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

This package is part of the [anephenix/ui](https://github.com/anephenix/ui) monorepo. The docs site, component previews, and screenshot tooling live in `apps/docs` there — see the [repo root README](../../README.md).

---

### License and credits

&copy;2026 Anephenix Ltd. UI is licenced under the MIT Licence.
