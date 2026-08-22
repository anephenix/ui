# Porting contract (React → Svelte)

This document exists to support the planned Svelte implementation of this design system,
tracked as a phased effort starting from the current React-only codebase. It is groundwork
(Phase 0) for that plan — it doesn't change any runtime behaviour.

Purpose: give whoever ports a component (React author or Svelte author) a single checklist
of what "parity" means for that component, so the shared CSS in `design-system/` and
`src/components/*/*.css` keeps working unmodified against a future Svelte implementation.
Prop-level API docs already live in [COMPONENTS.md](./COMPONENTS.md) — this file does not
duplicate them. It adds the two things COMPONENTS.md doesn't cover: whether a component is
part of the public API, and how much internal state/lifecycle logic has to be re-expressed
in Svelte's reactivity model rather than copied.

## Package naming decision

- `@anephenix/ui` — stays the React package name (no breaking change for existing consumers).
- `@anephenix/ui-svelte` — the Svelte package, at `packages/svelte`.
- `@anephenix/ui-tokens` — the shared `design-system/` + per-component CSS, extracted as a
  workspace-internal package consumed by both. Not published to npm independently unless a
  standalone use case shows up later.

## Svelte port status

Ported (`packages/svelte/src/lib/components/`): every component except **Code** — all 29
`Simple`-rated ones (first-slice **Badge, Button, Card, Divider, Page**, then **CloseIcon,
Hamburger, MenuItem, DesktopMenu, MobileMenu, NavBar, Breadcrumb, Pagination, Hero, Footer,
Checkbox, Input, RadioButton, Select, Dropdown, Textarea, FormField, Alert, ProgressBar,
Skeleton, Spinner, Table, Terminal, Tooltip**) plus all 8 genuinely `Stateful` ones (Phase 4:
**Switch, Accordion, Avatar, Tabs, ComboBox, Popover, Modal, Toast**, ordered easiest to
hardest). Conventions established, to guide any remaining/future ports:

- Svelte components render class names only — **no per-component CSS import**. `@sveltejs/package`
  copies `.svelte` files as-is rather than bundling them, so a source-level
  `import "@anephenix/ui-tokens/components/x/X.css"` would ship unresolved to real consumers
  (`ui-tokens` is a private, unpublished workspace package). Instead `packages/svelte/scripts/build-css.js`
  bundles every token stylesheet into one `dist/index.css` at build time — same shipped result
  as React's `import '@anephenix/ui/dist/index.css'`, just built differently. This script needs
  no changes as new components are ported; it globs `packages/tokens/components/*/*.css` directly.
- `className` → `class` (renamed on destructure as `class: className` internally, since `class`
  alone is a reserved word).
- `onClick` → `onclick` (Svelte 5 uses plain DOM event attribute names).
- `forwardRef` → a `$bindable` `ref` prop bound via `bind:this` — e.g. `Button.svelte`. Note this
  isn't independently unit-tested (it's a Svelte-native mechanism, not app logic); tests just
  assert the real DOM element renders.
- A React `Component` prop (e.g. `Link` in `NavBar`/`MenuItem`/`Hero`) becomes a Svelte
  `Component<Props>` type (`import type { Component } from "svelte"`), used directly as a
  dynamic tag: `<Link {href}>{text}</Link>`.
- A React `ReactNode` prop that isn't a plain string (e.g. `children`, `footer`, `logo`,
  `midSection`) becomes a Svelte `Snippet`, rendered with `{@render x()}`. Where the original
  accepted *either* a string or a node (e.g. `Hero`'s `description`, `Tooltip`'s `content`), the
  Svelte prop type is `string | Snippet` with a `typeof x === "string"` branch.
- `Table`'s per-column `render` prop changed from `(value, row) => ReactNode` to
  `(value, row) => string`. A function returning arbitrary renderable content doesn't have a
  clean Svelte equivalent without asking every consumer to import `createRawSnippet`; a
  string-returning formatter (uppercase, date formatting, etc.) covers the realistic use case
  and is simpler to use. Documented here since it's a real, not cosmetic, API difference.
- Component tests use `@testing-library/svelte` + `createRawSnippet` (from `svelte`) to pass
  `children`/other snippet props from test code — see any `*.test.ts` in that directory for the
  pattern. One gotcha: a component whose root is an `{#if}/{:else}` block gets a comment-node
  anchor as `container.firstChild`; use `container.firstElementChild` instead (see
  `Divider.test.ts`, `Skeleton.test.ts`, `Pagination.test.ts`).
- Testing a component that takes another component as a prop (e.g. `MenuItem`'s `Link`) needs a
  real `.svelte` fixture, not a plain mock object — see `menu-item/MockLink.test.svelte`. Name
  test-only `.svelte` fixtures `*.test.svelte` so they're excluded from the publish tarball by
  the same `package.json` `files` globs that exclude `*.test.ts`, and are never picked up by
  vitest (which only matches `src/**/*.test.ts`).

**Phase 4 (stateful component) conventions, on top of the above:**

- `useState`/`useRef` → `$state`/plain `let` bound via `bind:this`; `useEffect` (with its
  cleanup-function return) → `$effect` (same cleanup-return shape). Reactive dependencies are
  inferred automatically from what the effect body reads synchronously — no dependency array.
  When seeding `$state` from a prop that's only meant to set an *initial* value (React's
  `useState(someProp)` pattern, e.g. `defaultOpen`/`defaultTab`), Svelte's compiler warns
  (`state_referenced_locally`) since it can't tell that's deliberate; suppress with
  `// svelte-ignore state_referenced_locally` and a comment explaining why, rather than
  silencing it blindly — see `Accordion.svelte`, `Tabs.svelte`, `ComboBox.svelte`.
- `useId()` → `$props.id()`.
- Controlled/uncontrolled dual-mode props (React's `checked`/`defaultChecked` pattern, manually
  tracked with an `isControlled` boolean) collapse into a single `$bindable` prop in Svelte —
  `$bindable` already covers both cases (parent-bound = controlled, unbound = the component's
  own local state seeded from that prop's initial value). See `Switch.svelte`, which merges
  React's two props into one `checked` prop as a result; documented as a real, intentional API
  simplification, not an oversight.
- React's `onChange` on a plain `<input>`/`<textarea>` actually tracks the native `input` event
  (fires on every keystroke), not `change` (fires on blur/commit). The Svelte equivalent for
  "notify on every keystroke" behaviour is `oninput`, not `onchange` — using `onchange` would be
  a silent UX regression (filtering/live-search wouldn't update until the field lost focus). See
  `ComboBox.svelte`; its tests use `fireEvent.input`, not `fireEvent.change`, accordingly.
- A React pattern of cloning an arbitrary caller-supplied element to inject props
  (`cloneElement(trigger, { onClick, "aria-expanded": ... })`, as in `Popover`) has no Svelte
  equivalent — Svelte has no runtime "element as cloneable data" concept. The idiomatic
  replacement is a parameterized `Snippet<[Props]>`: the caller defines
  `{#snippet trigger(props)}<button {...props}>...</button>{/snippet}` and spreads the given
  props themselves. See `Popover.svelte`'s `trigger` prop and `PopoverHost.test.svelte` for a
  full example of both defining and consuming one.
- Fake-timer tests (`vi.useFakeTimers()` + `vi.advanceTimersByTime()`) don't need an `act()`
  wrapper the way React Testing Library requires — `@testing-library/svelte` doesn't have an
  equivalent requirement; call the timer APIs directly (see `Toast.test.ts`).

**NavBar correction:** the original audit below (from grepping for `useState`/`useEffect`/etc.)
missed that `NavBar` is a **class component** with `this.state.menuOpen` — genuinely stateful,
just not hook-based. Ported using `$state`/`$derived`, same as the 8 already-known stateful
components; simple enough (one boolean toggle) to include in this pass rather than deferring
to Phase 4. Treat any remaining unaudited component with suspicion if it's a class component,
not just for hooks.

**Code deferred:** `Code.tsx` uses `react-syntax-highlighter`, a React-only rendering library —
this isn't a mechanical port, it's a dependency decision (which Svelte-compatible syntax
highlighter to adopt, e.g. `svelte-highlight` or a direct Prism.js integration) that changes the
bundle and API shape. Left unported pending that decision. `Terminal` (which shares the
`.title-bar-button`/`.title-bar-action` CSS classes but has no syntax highlighting, just
`clipboard-copy`) is already ported.

## How to read the table

- **Public API** — `Y` if exported from `index.tsx` (part of `@anephenix/ui`'s public
  surface); `N` if it's an internal building block only used by another component (currently
  all `N`s are sub-parts of `NavBar`). Internal components still need porting, but they don't
  need a standalone entry in a future Svelte `COMPONENTS.md`.
- **State** — `Simple` means presentational only, or React-only plumbing (`forwardRef`) with
  no internal state/effects to re-derive. `Stateful` means it uses `useState`/`useEffect`/
  `useRef`/`useId` for real behaviour (open/close, positioning, focus, timers) that has to be
  re-expressed using Svelte idioms (runes, `onMount`, actions) rather than copied — these are
  the components to port last and review most carefully (Phase 4 in the plan).
- **CSS** — the component's own stylesheet if it has one; `shared tokens` if it relies only on
  `design-system/*.css` (buttons.css, form-fields.css, etc.) with no dedicated file.
- **Root class(es)** — the top-level class name(s) a Svelte implementation must render for the
  shared CSS to apply. `dynamic — see source` flags components that compose class names at
  runtime (variant/size props) rather than using a single static string; read the `.tsx` file
  before porting rather than trusting this table for those.

---

### Layout

| Component | Public API | State | CSS | Root class(es) |
|---|---|---|---|---|
| Page | Y | Simple | Page.css | `.page` |
| Hero | Y | Simple | Hero.css | multiple/nested — see file |
| Footer | Y | Simple | Footer.css | multiple/nested — see file |

### Navigation

| Component | Public API | State | CSS | Root class(es) |
|---|---|---|---|---|
| Breadcrumb | Y | Simple | Breadcrumb.css | `.breadcrumb`, `.breadcrumb-item`, `.breadcrumb-link`, `.breadcrumb-current`, `.breadcrumb-separator` |
| NavBar | Y | **Stateful** (class component, `this.state.menuOpen` — not hook-based, missed by the original grep audit) | NavBar.css | multiple/nested — see file |
| Pagination | Y | Simple | Pagination.css | `.pagination`, `.pagination-nav`, `.pagination-page`, `.pagination-page-active`, `.pagination-ellipsis` |
| CloseIcon | N (internal, used by NavBar) | Simple | shared tokens | dynamic — see source |
| DesktopMenu | N (internal, used by NavBar) | Simple | DesktopMenu.css | multiple/nested — see file |
| Hamburger | N (internal, used by NavBar) | Simple | Hamburger.css | multiple/nested — see file |
| MenuItem | N (internal, used by NavBar) | Simple | shared tokens | dynamic — see source |
| MobileMenu | N (internal, used by NavBar) | Simple | MobileMenu.css | multiple/nested — see file |

### Forms

| Component | Public API | State | CSS | Root class(es) |
|---|---|---|---|---|
| Button | Y | Simple (`forwardRef`) | shared tokens (buttons.css) | dynamic — see source |
| Checkbox | Y | Simple (`forwardRef`) | shared tokens (form-fields.css) | `.checkbox-element`, `.tick` |
| Switch | Y | **Stateful** (`useState`) | Switch.css | `.switch`, `.switch-track`, `.switch-thumb`, `.switch-label`, `.switch-disabled` |
| Input | Y | Simple (`forwardRef`) | shared tokens (form-fields.css) | dynamic — see source |
| RadioButton | Y | Simple (`forwardRef`) | shared tokens (form-fields.css) | `.radio-element`, `.selected` |
| Select | Y | Simple (`forwardRef`) | Select.css | dynamic — see source |
| Dropdown | Y | Simple (`forwardRef`) | shared tokens (form-fields.css) | dynamic — see source |
| ComboBox | Y | **Stateful** (`useState`, `useEffect`, `useRef`, `useId`) | ComboBox.css | `.combo-box`, `.combo-box-input`, `.combo-box-listbox`, `.combo-box-option`, `.combo-box-option-active`, `.combo-box-no-results` |
| Textarea | Y | Simple (`forwardRef`) | shared tokens (form-fields.css) | dynamic — see source |
| FormField | Y | Simple | FormField.css | `.form-field`, `.error-message` |

### Display

| Component | Public API | State | CSS | Root class(es) |
|---|---|---|---|---|
| Accordion | Y | **Stateful** (`useState`) | Accordion.css | `.accordion`, `.accordion-item`, `.accordion-heading`, `.accordion-trigger`(`-open`), `.accordion-title`, `.accordion-panel`(`-open`), `.accordion-panel-inner`, `.accordion-chevron`(`-open`) |
| Alert | Y | Simple | Alert.css | `.alert`, `.alert-{info,success,warning,error}`, `.alert-icon`, `.alert-content`, `.alert-title`, `.alert-body`, `.alert-close` |
| Divider | Y | Simple | Divider.css | `.divider`, `.divider-horizontal`, `.divider-vertical`, `.divider-label` |
| Avatar | Y | **Stateful** (`useState`, image load fallback) | Avatar.css | `.avatar`, `.avatar-{circle,square,rounded}`, `.avatar-{sm,md,lg,xl}`, `.avatar-img`, `.avatar-initials`, `.avatar-icon` |
| Badge | Y | Simple | Badge.css | dynamic — `.badge` + variant/size classes composed at runtime, see source |
| Card | Y | Simple | Card.css | `.card`, `.card-image`, `.card-header`, `.card-title`, `.card-subtitle`, `.card-body`, `.card-footer` |
| Code | Y | Simple | Code.css | `.code`, `.code-editor`, `.code-line-numbers`, `.code-line-number`, plus `.title-bar-button`/`.title-bar-action` (shared with Terminal) |
| Popover | Y | **Stateful** (`useState`, `useEffect`, `useRef` — positioning) | Popover.css | `.popover`, `.popover-{top,bottom,left,right}`, `.popover-wrapper`, `.popover-header`, `.popover-title`, `.popover-close`, `.popover-body` |
| ProgressBar | Y | Simple | ProgressBar.css | `.progress-bar-wrapper`, `.progress-bar`, `.progress-bar-{default,success,warning,error}`, `.progress-bar-{sm,md,lg}`, `.progress-bar-fill`, `.progress-bar-indeterminate`, `.progress-bar-header`, `.progress-bar-label`, `.progress-bar-value` |
| Skeleton | Y | Simple | Skeleton.css | `.skeleton`, `.skeleton-group` |
| Spinner | Y | Simple | Spinner.css | dynamic — `.spinner` + size class composed at runtime, see source |
| Table | Y | Simple | Table.css | `.table-wrapper` |
| Tabs | Y | **Stateful** (`useState`, `useRef`) | Tabs.css | `.tabs`, `.tabs-list`, `.tabs-tab`(`-active`), `.tabs-panel` |
| Terminal | Y | Simple | Terminal.css | `.terminal`, `.title-bar-button`, `.title-bar-action` |
| Tooltip | Y | Simple | Tooltip.css | `.tooltip-wrapper`, `.tooltip`, `.tooltip-{top,bottom,left,right}` |

### Overlays

| Component | Public API | State | CSS | Root class(es) |
|---|---|---|---|---|
| Modal | Y | **Stateful** (`useEffect`, `useRef` — native `<dialog>` imperative API) | Modal.css | `.modal`, `.modal-content`, `.modal-header`, `.modal-title`, `.modal-close`, `.modal-body`, `.modal-footer` |
| Toast | Y | **Stateful** (`useEffect` — likely auto-dismiss timer) | Toast.css | `.toast`, `.toast-{top,bottom}-{left,center,right}`, `.toast-{info,success,warning,error}`, `.toast-icon`, `.toast-content`, `.toast-title`, `.toast-message`, `.toast-close` |

### Utilities

| Export | Public API | Notes |
|---|---|---|
| `handleErrors` | Y | Plain function, not a component — framework-agnostic as-is, ports to the Svelte package with no changes needed. |

---

## Summary

- 38 component directories: 33 public components + 5 internal (`NavBar` sub-parts) + `handleErrors`.
- 9 components are `Stateful` and need careful review: Accordion, Avatar, ComboBox, Switch,
  Popover, Tabs, Modal, Toast, and **NavBar** (found stateful only after auditing the class
  component directly — see the correction above). Everything else is presentational or
  React-ref plumbing only.
- 30 of 38 directories have a dedicated CSS file; the other 8 (Button, Checkbox, CloseIcon,
  Dropdown, Input, MenuItem, RadioButton, Textarea) style purely through shared
  `design-system/` tokens — those are the simplest to verify for parity since there's no
  component-local CSS to cross-check.
- Svelte port progress: **37 of 38 components ported** — every component except `Code`, which
  remains deferred pending a syntax-highlighter dependency decision (React's
  `react-syntax-highlighter` has no Svelte equivalent to swap in mechanically). All 5 internal
  `NavBar` sub-parts and all 9 `Stateful` components (including the reclassified `NavBar`) are
  done. `Code` is the only remaining gap in `packages/svelte`.
