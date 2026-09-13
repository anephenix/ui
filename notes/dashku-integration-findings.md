# Findings from re-theming Dashku with @anephenix/ui

Context: re-themed https://github.com/anephenix/new-dashku's UI to match
anephenix.com (light theme), using `@anephenix/ui` components where they
fit. See anephenix/ui issue tracker for the filed version of this.

## 1. The published npm package is far behind the repo source

Dashku had `@anephenix/ui@0.1.17` installed. The `packages/react` source in
this repo is at `0.4.5` and has ~20 more components than what's published:
`Modal`, `Popover`, `Toast`, `Table`, `Tabs`, `Accordion`, `Avatar`,
`Badge`, `Breadcrumb`, `Card`, `CodeEditor`, `ComboBox`, `Divider`,
`LiveTerminal`, `Pagination`, `ProgressBar`, `Skeleton`, `Spinner`,
`Switch`, `Tooltip`.

This mattered concretely: Dashku needed a modal dialog (its "Add widget"
form) and hand-rolled one, because the published package has no `Modal`.
The source repo already has a real one
(`src/components/modal/Modal.tsx`, using native `<dialog>`) that would
have covered this need directly. Same story for `Popover` - Dashku's
account-avatar action menu (Settings / Log out) is exactly what
`Popover` (trigger + click-toggle content, outside-click/Escape
handling already built in) is for, but it wasn't available to use.

**Ask**: cut a release and publish current `packages/react` to npm, then
keep publishing roll forward as new components land, so consumers aren't
building things that already exist a few commits away.

## 2. `CloseIcon` isn't exported from the public API

`src/components/close-icon/CloseIcon.tsx` exists and is used internally by
`MobileMenu`, but isn't imported/re-exported in `index.tsx`. A consumer
who finds it in the source (e.g. via the published dist bundle, where the
string "CloseIcon" shows up from `MobileMenu`'s usage) and imports it
directly gets `undefined` - in React this crashes with error #130
("element type is invalid") the moment it renders, not at import time,
which makes it a nasty one to debug.

Notably, `Modal.tsx`'s own close button doesn't use `CloseIcon` either -
it's a plain `&times;`, so even the library's own component doesn't
dogfood it.

**Ask**: either export `CloseIcon` from `index.tsx` so it's usable as
documented/expected, or use it in `Modal`'s own close button (and export
it) so there's one obvious way to get a close icon.

## 3. `Hero`'s CTA items don't forward arbitrary props

`src/components/hero/Hero.tsx`'s `CTAItem` type is
`{ href, text, buttonClass? }` - the `CTA` renderer only ever passes
those three to the generated `<a>`/`Link`. There's no way to attach an
`id` (or any other prop - `data-testid`, `aria-*`, `onClick`, etc.) to a
CTA.

This blocked using `Hero` for Dashku's logged-out homepage: its existing
Cucumber suite depends on stable `id="signup-button"` /
`id="login-button"` selectors on those exact links, so `Hero` had to be
skipped in favour of a hand-rolled hero section.

**Ask**: widen `CTAItem` to accept `...rest` props (or at least `id`) and
spread them onto the generated element.

## 4. Two Dashku-side fixes that surfaced the above (not `@anephenix/ui` bugs, for reference)

- Dashku's `styles/index.scss` was unconditionally forcing a dark theme
  via an equal-specificity `#nav-bar` override loaded after
  `@anephenix/ui/dist/index.css`, which meant `NavBar`'s own light-theme
  default (and its `prefers-color-scheme: dark` variant) never had a
  chance to show. Not a library bug, just worth knowing the override
  pattern silently wins regardless of the media query.
