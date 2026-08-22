# Anephenix UI

[![npm version](https://badge.fury.io/js/%40anephenix%2Fui.svg)](https://badge.fury.io/js/%40anephenix%2Fui) [![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Socket Badge](https://socket.dev/api/badge/npm/package/@anephenix/ui)](https://socket.dev/npm/package/@anephenix/ui)

This is an npm workspaces monorepo for the Anephenix design system.

### Layout

| Path | Package | Purpose |
|------|---------|---------|
| `packages/tokens` | `@anephenix/ui-tokens` | Shared design tokens and per-component CSS (framework-agnostic, workspace-internal). |
| `packages/react` | `@anephenix/ui` | The published React component library. See [packages/react/README.md](./packages/react/README.md) for installation and usage. |
| `packages/svelte` | `@anephenix/ui-svelte` | The Svelte component library (37 of 38 components ported — see [packages/svelte/COMPONENTS.md](./packages/svelte/COMPONENTS.md)). Not yet published to npm. |
| `apps/docs` | `@anephenix/ui-docs` | The Astro docs site at [ui.anephenix.com](https://ui.anephenix.com), including component previews (with a live React/Svelte toggle on every component page) and screenshot tooling. |

See [PORTING-CONTRACT.md](./PORTING-CONTRACT.md) for the React → Svelte parity checklist and the API differences between the two packages.

### Getting started

```
npm i
npm t
```

Root scripts fan out to the relevant workspace — e.g. `npm run build` builds the docs site, `npm run build-lib` builds `@anephenix/ui`, `npm run dev` starts the docs dev server. See each package's own `package.json` for its full script list.

### License and credits

&copy;2026 Anephenix Ltd. UI is licenced under the MIT Licence.
