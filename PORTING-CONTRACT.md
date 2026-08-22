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
- `@anephenix/ui-svelte` — new Svelte package, once it exists.
- `@anephenix/ui-tokens` — the shared `design-system/` + per-component CSS, extracted as a
  workspace-internal package consumed by both. Not published to npm independently unless a
  standalone use case shows up later.

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
| NavBar | Y | Simple | NavBar.css | multiple/nested — see file |
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
- 8 components are `Stateful` and need careful review during the port: Accordion, Avatar,
  ComboBox, Switch, Popover, Tabs, Modal, Toast. Everything else is presentational or
  React-ref plumbing only.
- 30 of 38 directories have a dedicated CSS file; the other 8 (Button, Checkbox, CloseIcon,
  Dropdown, Input, MenuItem, RadioButton, Textarea) style purely through shared
  `design-system/` tokens — those are the simplest to verify for parity since there's no
  component-local CSS to cross-check.
