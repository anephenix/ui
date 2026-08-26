# Component Reference

All components are exported from `@anephenix/ui-svelte`. Import the stylesheet once at the top level of your app before using any component:

```js
import '@anephenix/ui-svelte/dist/index.css';
```

Components are grouped below by category. This package mirrors [`@anephenix/ui`](https://github.com/anephenix/ui/blob/master/packages/react/COMPONENTS.md) (the React version) — see [PORTING-CONTRACT.md](https://github.com/anephenix/ui/blob/master/PORTING-CONTRACT.md) for the full list of API differences and why they exist. In short:

- `className` → `class`.
- Native DOM event props are lowercase (`onclick`, `onchange`, `oninput`) and forwarded straight to the underlying element. Custom callback props a component defines itself keep their original camelCase name (`onChange`, `onClose`, `onSelect`, `onPageChange`, etc.) — they were never native DOM attributes.
- `forwardRef` becomes a bindable `ref` prop: `<Input bind:ref={myInput} />`.
- A prop that's a snippet of content is typed `Snippet` and rendered by the consumer as `{#snippet name()}...{/snippet}`, or filled implicitly by nesting content between a component's tags when the prop is named `children`.
- Every component in the React package's list is here, including **Code** — see its entry below for the one deliberate API/behavioural difference from the React version.

---

#### Layout

**Page**

A full-page wrapper `div`. Wrap your entire app content inside it.

```svelte
<script>
	import { Page } from '@anephenix/ui-svelte';
</script>

<Page>
	<p>Your content here</p>
</Page>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `snippet` | Content to render inside the page wrapper |

---

**Hero**

A hero section with a heading, description, and call-to-action buttons.

```svelte
<script>
	import { Hero } from '@anephenix/ui-svelte';

	const ctas = [
		{ href: '/get-started', text: 'Get started', buttonClass: 'primary' },
		{ href: '/docs', text: 'Documentation', buttonClass: 'secondary' },
	];
</script>

<Hero
	title="Welcome"
	description="A short description of your product."
	{ctas}
	Link={MyRouterLink}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | The main heading |
| `description` | `string \| snippet` | A short description (string is wrapped in `<p>`) |
| `ctas` | `array` | Array of `{ href, text, buttonClass }` objects |
| `Link` | `component` | Optional router link component (falls back to `<a>`) |

---

**Footer**

A two-column footer with left and right sections.

```svelte
<script>
	import { Footer } from '@anephenix/ui-svelte';
</script>

<Footer>
	{#snippet leftSection()}<span>&copy; 2026 Acme Ltd.</span>{/snippet}
	{#snippet rightSection()}<a href="/privacy">Privacy</a>{/snippet}
</Footer>
```

| Prop | Type | Description |
|------|------|-------------|
| `leftSection` | `snippet` | Content for the left side of the footer |
| `rightSection` | `snippet` | Content for the right side of the footer |

---

#### Navigation

**Breadcrumb**

A navigation trail showing the user's location within a hierarchy. Follows the WAI-ARIA Breadcrumb pattern.

```svelte
<script>
	import { Breadcrumb } from '@anephenix/ui-svelte';
</script>

<Breadcrumb
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Laptops' },
	]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Array of `{ label, href? }` objects. Omit `href` on the last item to mark it as the current page |
| `separator` | `string` | Separator rendered between items. Defaults to `"/"` |
| `class` | `string` | Optional additional CSS class on the list |

---

**NavBar**

A responsive navigation bar with a hamburger menu for mobile and a desktop menu. Manages open/closed state internally with `$state`.

```svelte
<script>
	import { NavBar } from '@anephenix/ui-svelte';

	const links = [
		{
			id: 'home',
			text: 'Home',
			url: '/',
			hideOnDesktop: false,
			hideOptions: ({ loggedIn }) => true,
		},
	];
</script>

<NavBar {links} loggedIn={false} Link={MyRouterLink}>
	{#snippet logo()}<a href="/">My App</a>{/snippet}
</NavBar>
```

| Prop | Type | Description |
|------|------|-------------|
| `logo` | `snippet` | Logo content rendered on the left |
| `links` | `array` | Array of link objects (see shape below) |
| `loggedIn` | `bool` | Passed to each link's `hideOptions` function |
| `Link` | `component` | Router link component used for internal URLs |
| `class` | `string` | Optional additional class for the nav bar element |
| `midSection` | `snippet` | Optional content rendered between logo and hamburger |

Each link object:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `text` | `string` | Display text |
| `url` | `string` | Href (use `onclick` to render a button instead) |
| `onclick` | `function` | Click handler (renders a `<button>`) |
| `hideOnDesktop` | `bool` | Hide this link in the desktop menu |
| `hideOptions` | `function` | `({ loggedIn }) => bool` — return `true` to show |
| `target` | `string` | `_blank` etc. |
| `rel` | `string` | Link rel attribute |

---

**Pagination**

Page-number controls with first, previous, next, and last buttons. Renders nothing when `totalPages` is less than 2.

```svelte
<script>
	import { Pagination } from '@anephenix/ui-svelte';

	let page = $state(1);
</script>

<Pagination currentPage={page} totalPages={20} onPageChange={(p) => (page = p)} />
```

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | The currently active page (1-based) |
| `totalPages` | `number` | Total number of pages |
| `onPageChange` | `function` | Called with the new page number when any button is clicked |
| `siblingCount` | `number` | Pages shown on each side of the current page. Defaults to `1` |
| `showFirstLast` | `bool` | Show First and Last buttons. Defaults to `true` |
| `class` | `string` | Optional additional CSS class on the nav |

---

#### Forms

**Button**

A basic button element. Exposes a bindable `ref`.

```svelte
<script>
	import { Button } from '@anephenix/ui-svelte';
</script>

<Button text="Submit" class="button theme-default primary" onclick={handleClick} />
```

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Button label |
| `name` | `string` | Name attribute |
| `class` | `string` | CSS class(es) |
| `onclick` | `function` | Click handler |
| `ref` | `HTMLButtonElement` (bindable) | `bind:ref={myButton}` to access the underlying element |

Button variant classes (combine with `button theme-default`):

| Class | Alternate |
|-------|-----------|
| `primary` | `primary alternate` |
| `secondary` | `secondary alternate` |
| `tertiary` | `tertiary alternate` |
| `green-one` | `green-one alternate` |
| `green-two` | `green-two alternate` |
| `blue-one` | `blue-one alternate` |
| `blue-two` | `blue-two alternate` |

---

**Checkbox**

A styled checkbox with a label. Exposes a bindable `ref`.

```svelte
<script>
	import { Checkbox } from '@anephenix/ui-svelte';
</script>

<Checkbox name="agree" label="I agree to the terms" defaultValue={false} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `label` | `string` | Label text |
| `class` | `string` | CSS class(es) |
| `defaultValue` | `bool` | Whether the checkbox is checked by default |
| `ref` | `HTMLInputElement` (bindable) | `bind:ref={myCheckbox}` to access the underlying element |

---

**Switch**

A toggle switch for binary on/off settings. Exposes a bindable `ref`.

**API note:** unlike the React version, there is no separate `defaultChecked` prop. `checked` is a single [`$bindable`](https://svelte.dev/docs/svelte/$bindable) prop that covers both cases — pass a plain value to seed the initial state (uncontrolled), or `bind:checked` for two-way controlled usage.

```svelte
<script>
	import { Switch } from '@anephenix/ui-svelte';

	// Uncontrolled
</script>
<Switch name="notifications" label="Enable notifications" />

<script>
	// Controlled
	let enabled = $state(false);
</script>
<Switch name="darkMode" label="Dark mode" bind:checked={enabled} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `label` | `string` | Optional label text |
| `checked` | `bool` (bindable) | Checked state — initial value if unbound, two-way if `bind:checked` |
| `onchange` | `function` | Change handler — receives the native input change event |
| `disabled` | `bool` | Disables interaction and dims the switch |
| `class` | `string` | Optional additional CSS class |
| `ref` | `HTMLInputElement` (bindable) | `bind:ref={mySwitch}` to access the underlying element |

---

**Input**

A text input element. Exposes a bindable `ref`.

**API note:** the change handler is `oninput`, not `onchange` — it fires on every keystroke, matching React's `onChange` behaviour for text inputs (the native `change` event only fires on blur/commit, which would be a silent behaviour regression).

```svelte
<script>
	import { Input } from '@anephenix/ui-svelte';
</script>

<Input
	name="email"
	type="email"
	placeholder="you@example.com"
	oninput={handleChange}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | Input type |
| `name` | `string` | | Name attribute |
| `class` | `string` | | CSS class(es) |
| `defaultValue` | `string` | | Initial value |
| `placeholder` | `string` | | Placeholder text |
| `oninput` | `function` | | Fires on every keystroke |
| `ref` | `HTMLInputElement` (bindable) | | `bind:ref={myInput}` to access the underlying element |

---

**RadioButton**

A styled radio button with a label. Exposes a bindable `ref`.

```svelte
<script>
	import { RadioButton } from '@anephenix/ui-svelte';

	let selected = $state('');
</script>

<RadioButton
	name="colour"
	label="Red"
	value="red"
	checked={selected === 'red'}
	onchange={() => (selected = 'red')}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute (shared across a group) |
| `label` | `string` | Label text |
| `class` | `string` | CSS class(es) |
| `value` | `string` | Value for this option (controlled mode) |
| `checked` | `bool` | Whether this option is selected (controlled mode) |
| `onchange` | `function` | Called when this option is selected |
| `defaultValue` | `string` | Value attribute for uncontrolled usage |
| `ref` | `HTMLInputElement` (bindable) | `bind:ref={myRadio}` to access the underlying element |

---

**Select**

A styled `<select>` element. Exposes a bindable `ref`.

```svelte
<script>
	import { Select } from '@anephenix/ui-svelte';

	const options = [
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'us', label: 'United States' },
	];
</script>

<Select name="country" {options} onchange={handleChange} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `class` | `string` | CSS class(es) |
| `defaultValue` | `string` | Initially selected value |
| `onchange` | `function` | Change handler |
| `options` | `array` | Array of `{ value, label }` objects |
| `ref` | `HTMLSelectElement` (bindable) | `bind:ref={mySelect}` to access the underlying element |

---

**Dropdown**

A styled dropdown using a `<select>` element that supports multiple selection. Exposes a bindable `ref`. Options use a `text` field (not `label`) to distinguish it from Select.

```svelte
<script>
	import { Dropdown } from '@anephenix/ui-svelte';

	const options = [
		{ value: 'js', text: 'JavaScript' },
		{ value: 'ts', text: 'TypeScript' },
	];
</script>

<Dropdown name="language" {options} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `id` | `string` | Element id |
| `class` | `string` | CSS class(es) |
| `multiple` | `bool` | Allow multiple selections |
| `defaultValue` | `string \| array` | Initially selected value(s) |
| `options` | `array` | Array of `{ value, text }` objects |
| `ref` | `HTMLSelectElement` (bindable) | `bind:ref={myDropdown}` to access the underlying element |

---

**ComboBox**

A searchable input that filters a list of options as the user types. Supports keyboard navigation (arrow keys, Enter, Escape), outside-click dismissal, and full ARIA combobox semantics.

```svelte
<script>
	import { ComboBox } from '@anephenix/ui-svelte';

	const options = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
	];

	let selected = $state(null);
</script>

<ComboBox
	{options}
	placeholder="Search fruit..."
	onSelect={(option) => (selected = option)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `options` | `array` | Array of `{ value, label }` objects. Defaults to `[]` |
| `value` | `string` | Initial text value of the input (uncontrolled seed) |
| `onChange` | `function` | Called with the current input string on every keystroke |
| `onSelect` | `function` | Called with the selected `{ value, label }` object when an option is chosen |
| `placeholder` | `string` | Placeholder text for the input. Defaults to `"Search..."` |
| `disabled` | `bool` | Disables the input and prevents interaction. Defaults to `false` |

---

**Textarea**

A multi-line text input. Exposes a bindable `ref`. Same `oninput`-not-`onchange` note as Input applies here.

```svelte
<script>
	import { Textarea } from '@anephenix/ui-svelte';
</script>

<Textarea name="message" placeholder="Enter your message..." oninput={handleChange} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `class` | `string` | CSS class(es) |
| `defaultValue` | `string` | Initial value |
| `placeholder` | `string` | Placeholder text |
| `oninput` | `function` | Fires on every keystroke |
| `ref` | `HTMLTextAreaElement` (bindable) | `bind:ref={myTextarea}` to access the underlying element |

---

**FormField**

A wrapper for form inputs that displays a validation error message below the input.

```svelte
<script>
	import { FormField, Input } from '@anephenix/ui-svelte';
</script>

<FormField error="This field is required">
	<Input name="email" type="email" />
</FormField>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `snippet` | The form control(s) to wrap |
| `error` | `string` | Error message to display (omit when valid) |

---

#### Display

**Accordion**

Collapsible sections that expand and collapse to reveal content. Follows the WAI-ARIA Accordion pattern.

```svelte
<script>
	import { Accordion } from '@anephenix/ui-svelte';

	const items = [
		{ id: 'q1', title: 'What is this?', content: 'An answer.' },
		{ id: 'q2', title: 'How does it work?', content: 'Another answer.' },
	];
</script>

<Accordion {items} defaultOpen="q1" />
```

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Array of `{ id, title, content }` objects — `title`/`content` are `string \| snippet` |
| `allowMultiple` | `bool` | Allow more than one panel open at a time. Defaults to `false` |
| `defaultOpen` | `string \| string[]` | Id(s) of item(s) open on first render |
| `onChange` | `function` | Called with an array of currently open ids on change |
| `class` | `string` | Optional additional CSS class |

---

**Alert**

An inline status banner for contextual feedback. The `role` is automatically set to `"alert"` for error/warning variants and `"status"` for info/success.

```svelte
<script>
	import { Alert } from '@anephenix/ui-svelte';
</script>

<!-- Persistent -->
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>

<!-- Dismissible -->
<Alert variant="warning" onClose={() => (visible = false)}>
	Your session will expire in 5 minutes.
</Alert>
```

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | Visual style. Defaults to `"info"` |
| `title` | `string` | Optional bold heading above the body |
| `children` | `snippet` | The alert content |
| `onClose` | `function` | Optional dismiss callback — renders a close button when provided |
| `class` | `string` | Optional additional CSS class |

---

**Divider**

A visual separator between sections of content. Supports horizontal and vertical orientations, three line styles, and an optional centred text label.

```svelte
<script>
	import { Divider } from '@anephenix/ui-svelte';
</script>

<Divider />
<Divider label="or" />
<Divider variant="dashed" />
```

| Prop | Type | Description |
|------|------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | Direction of the divider. Defaults to `"horizontal"` |
| `variant` | `"solid" \| "dashed" \| "dotted"` | Line style. Defaults to `"solid"` |
| `label` | `string` | Optional text centred on the divider line |
| `class` | `string` | Optional additional CSS class on the wrapper |

---

**Avatar**

A user profile picture with three automatic states: image, initials (derived from `name`), and a generic icon fallback. The initials background colour is consistently derived from the name.

```svelte
<script>
	import { Avatar } from '@anephenix/ui-svelte';
</script>

<Avatar src="/photo.jpg" alt="Alice Brown" />
<Avatar name="Alice Brown" size="lg" />
<Avatar size="md" shape="rounded" />
```

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image URL. Falls back to initials or icon on error |
| `alt` | `string` | Alt text for the image. Defaults to `name` if provided |
| `name` | `string` | Used to generate initials and a consistent background colour |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | Avatar diameter. Defaults to `"md"` |
| `shape` | `"circle" \| "rounded" \| "square"` | Border radius style. Defaults to `"circle"` |
| `class` | `string` | Optional additional CSS class |

---

**Badge**

A small inline label for counts, status indicators, and tags.

```svelte
<script>
	import { Badge } from '@anephenix/ui-svelte';
</script>

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">99+</Badge>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `snippet` | The badge content |
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | Colour scheme. Defaults to `"default"` |
| `size` | `"sm" \| "md" \| "lg"` | Size preset. Defaults to `"md"` |
| `class` | `string` | Optional additional CSS class |

---

**Card**

A flexible content container with optional image, header, body, and footer sections. Width fills the parent.

```svelte
<script>
	import { Button, Card } from '@anephenix/ui-svelte';
</script>

<Card title="Getting started" subtitle="Up and running in minutes">
	{#snippet footer()}
		<Button text="View docs" class="button theme-default primary" />
	{/snippet}
	<p>Build consistent UIs with a plain-CSS design system.</p>
</Card>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Optional heading in the card header |
| `subtitle` | `string` | Optional secondary line below the title |
| `image` | `string` | Optional URL for a cover image at the top |
| `imageAlt` | `string` | Alt text for the image. Defaults to `""` |
| `children` | `snippet` | Main body content |
| `footer` | `snippet` | Optional footer content |
| `class` | `string` | Optional additional CSS class |

---

**Code**

A code block with syntax highlighting, line numbers, a title bar, and a copy button.

**API note:** React's version uses `react-syntax-highlighter`, a React-only library. This version
calls [Prism](https://prismjs.com/) directly and renders its real `.token.*` HTML output, styled
with plain CSS transcribed from `react-syntax-highlighter`'s bundled "one-dark" theme so both
packages use the same palette. Only `javascript`, `jsx`, and `css` grammars are registered (the
languages this codebase actually uses) — see the comment at the top of `Code.svelte` for how to
register another one. An unregistered `language` value falls back to escaped plain text rather
than throwing. One token (the `=` operator in JavaScript) renders a different colour than the
React version: `react-syntax-highlighter`'s inline-style engine doesn't apply the theme's
language-scoped `.language-javascript .token.operator` override, while this CSS-based
implementation does — this version is arguably more faithful to the theme's own definition, not
a bug to match.

```svelte
<script>
	import { Code } from '@anephenix/ui-svelte';
</script>

<Code title="greet.js" code={snippet} language="javascript" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | | Title shown in the bar above the code |
| `code` | `string` | | The code string to display |
| `language` | `string` | `"javascript"` | Syntax highlighting language — must have a registered Prism grammar |

---

**CodeEditor**

An editable version of Code: type or paste code directly into it, with line numbers that grow as you add lines, a resizable window, a fullscreen toggle (click the green title-bar button), and a footer with a language switcher and a live line:column cursor position.

**API note:** props use Svelte's lowercase event-callback convention — `onchange`/`onfinishedtyping`, not `onChange`/`onFinishedTyping`.

```svelte
<script>
	import { CodeEditor } from '@anephenix/ui-svelte';
</script>

<CodeEditor
	title="greet.js"
	code={snippet}
	language="javascript"
	onfinishedtyping={(code) => console.log(code)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | | Title shown in the bar above the editor |
| `code` | `string` | | The initial code shown in the editor |
| `language` | `string` | `"javascript"` | Initial syntax-highlighting language — must have a registered Prism grammar |
| `languages` | `string[]` | `["javascript", "jsx", "css"]` | Languages offered in the footer switcher |
| `width` | `number` | `600` | Initial width in pixels |
| `height` | `number` | `300` | Initial height of the scrollable code area in pixels |
| `resizable` | `boolean` | `true` | Whether the bottom-right corner grip can resize the editor |
| `expandable` | `boolean` | `true` | Whether the green title-bar button can expand the editor to fill the browser window |
| `onchange` | `(code: string) => void` | | Called on every keystroke with the current code |
| `onfinishedtyping` | `(code: string) => void` | | Called after typing pauses (or on blur) with the current code |
| `finishedTypingDelay` | `number` | `800` | Milliseconds of inactivity before `onfinishedtyping` fires |

---

**Popover**

A click-triggered floating panel for richer interactive content. Closes on Escape, outside click, or the × button.

**API note:** React clones the `trigger` element to inject `onClick`/`aria-*` props onto it — Svelte has no equivalent "clone an arbitrary element" mechanism. `trigger` is instead a parameterized snippet: you define the trigger element yourself and spread the props the snippet receives onto it.

```svelte
<script>
	import { Popover, Switch } from '@anephenix/ui-svelte';
</script>

<Popover title="Display options" position="bottom">
	{#snippet trigger(triggerProps)}
		<button type="button" class="button theme-default secondary" {...triggerProps}>
			Options
		</button>
	{/snippet}
	{#snippet content()}
		<Switch name="dark" label="Dark mode" />
	{/snippet}
</Popover>
```

| Prop | Type | Description |
|------|------|-------------|
| `trigger` | `snippet<[{ onclick, "aria-expanded", "aria-haspopup" }]>` | Renders the trigger element — spread the given props onto it |
| `content` | `string \| snippet` | Content rendered in the popover body |
| `title` | `string` | Optional heading shown in the popover header |
| `position` | `"bottom" \| "top" \| "left" \| "right"` | Placement relative to the trigger. Defaults to `"bottom"` |
| `class` | `string` | Optional additional CSS class |

---

**ProgressBar**

A horizontal bar that communicates the completion state of an operation. Supports four colour variants, three sizes, an optional label and percentage display, and an indeterminate animated state.

```svelte
<script>
	import { ProgressBar } from '@anephenix/ui-svelte';
</script>

<ProgressBar value={75} label="Uploading..." showValue={true} />
<ProgressBar value={100} variant="success" label="Complete" showValue={true} />
<ProgressBar indeterminate={true} label="Processing..." />
```

| Prop | Type | Description |
|------|------|-------------|
| `value` | `number` | Current progress value. Defaults to `0` |
| `max` | `number` | Maximum value. Defaults to `100` |
| `variant` | `"default" \| "success" \| "warning" \| "error"` | Colour of the fill. Defaults to `"default"` |
| `size` | `"sm" \| "md" \| "lg"` | Height of the bar. Defaults to `"md"` |
| `label` | `string` | Optional label rendered above the bar |
| `showValue` | `bool` | Show the computed percentage to the right of the label. Defaults to `false` |
| `indeterminate` | `bool` | Animates the bar for operations of unknown duration. Defaults to `false` |
| `class` | `string` | Optional additional CSS class on the wrapper |

---

**Skeleton**

A shimmer placeholder that mimics the shape of content while it loads.

```svelte
<script>
	import { Skeleton } from '@anephenix/ui-svelte';
</script>

<Skeleton width="60%" />
<Skeleton lines={3} />
<Skeleton width={48} height={48} borderRadius="50%" />
```

| Prop | Type | Description |
|------|------|-------------|
| `width` | `string \| number` | Width. Numbers are converted to px. Defaults to `"100%"` |
| `height` | `string \| number` | Height. Numbers are converted to px. Defaults to `"1rem"` |
| `borderRadius` | `string` | Border radius. Use `"50%"` for circles. Defaults to `"4px"` |
| `lines` | `number` | Render multiple stacked lines. The last line is 70% wide. Defaults to `1` |
| `class` | `string` | Optional additional CSS class |

---

**Spinner**

An animated loading indicator for indeterminate progress.

```svelte
<script>
	import { Spinner } from '@anephenix/ui-svelte';
</script>

<Spinner size="md" label="Loading..." />
```

| Prop | Type | Description |
|------|------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | Controls the diameter and border width. Defaults to `"md"` |
| `label` | `string` | Accessible `aria-label` for screen readers. Defaults to `"Loading..."` |
| `class` | `string` | Optional additional CSS class |

---

**Table**

A data table with column definitions and optional custom cell renderers. Horizontally scrollable on small screens.

**API note:** each column's `render` function returns a plain `string`, not arbitrary node content (React's version returns `ReactNode`). A function returning arbitrary renderable content has no clean Svelte equivalent without requiring every consumer to import `createRawSnippet`; a string-returning formatter (uppercase, date formatting, etc.) covers the realistic use case.

```svelte
<script>
	import { Table } from '@anephenix/ui-svelte';

	const columns = [
		{ key: 'name', header: 'Name' },
		{ key: 'role', header: 'Role' },
		{ key: 'status', header: 'Status', render: (value) => value.toUpperCase() },
	];

	const rows = [
		{ id: 1, name: 'Alice Chen', role: 'Engineer', status: 'Active' },
	];
</script>

<Table {columns} {rows} caption="Team members" />
```

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `array` | Array of column definition objects |
| `rows` | `array` | Array of row data objects |
| `rowKey` | `string` | Field name used as the `{#each}` key. Defaults to `"id"` |
| `caption` | `string` | Optional accessible caption |
| `class` | `string` | Optional additional CSS class on the `<table>` element |

Each column object: `key` (string), `header` (string), `render` (optional `(value, row) => string`).

---

**Tabs**

Content-switching tabs with full WAI-ARIA keyboard support (arrow keys, roving `tabindex`).

```svelte
<script>
	import { Tabs } from '@anephenix/ui-svelte';

	const tabs = [
		{ id: 'overview', label: 'Overview', content: 'Overview content.' },
		{ id: 'specs', label: 'Specifications', content: 'Specs here.' },
	];
</script>

<Tabs {tabs} defaultTab="overview" onChange={(id) => console.log(id)} />
```

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `array` | Array of `{ id, label, content }` objects — `content` is `string \| snippet` |
| `defaultTab` | `string` | Id of the initially selected tab. Defaults to the first tab |
| `onChange` | `function` | Optional `(id) => void` called when the active tab changes |
| `class` | `string` | Optional additional CSS class on the wrapper |

---

**Terminal**

A terminal-style block for showing shell commands or plain-text output. Includes a copy button.

```svelte
<script>
	import { Terminal } from '@anephenix/ui-svelte';
</script>

<Terminal title="Install" code="npm i @anephenix/ui-svelte" />
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Title shown in the bar above the output |
| `code` | `string` | The text to display |

---

**Tooltip**

A small floating label that appears on hover and keyboard focus. Shown and hidden entirely via CSS.

```svelte
<script>
	import { Tooltip } from '@anephenix/ui-svelte';
</script>

<Tooltip content="Save your changes" position="top">
	<button type="button">Save</button>
</Tooltip>
```

| Prop | Type | Description |
|------|------|-------------|
| `content` | `string \| snippet` | The tooltip text or content |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | Placement relative to the child. Defaults to `"top"` |
| `children` | `snippet` | The element the tooltip is attached to |
| `class` | `string` | Optional additional CSS class on the tooltip bubble |

---

#### Overlays

**Modal**

A dialog overlay built on the native `<dialog>` element. Traps focus, closes on Escape, and supports an optional footer for action buttons.

```svelte
<script>
	import { Button, Modal } from '@anephenix/ui-svelte';

	let isOpen = $state(false);
</script>

<Modal isOpen={isOpen} onClose={() => (isOpen = false)} title="Confirm action">
	{#snippet footer()}
		<Button text="Cancel" class="button theme-default secondary alternate" onclick={() => (isOpen = false)} />
		<Button text="Confirm" class="button theme-default primary" onclick={() => (isOpen = false)} />
	{/snippet}
	<p>Are you sure you want to do this?</p>
</Modal>
```

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `bool` | Controls whether the modal is shown |
| `onClose` | `function` | Called when the user dismisses the modal |
| `title` | `string` | Heading shown in the modal header |
| `children` | `snippet` | Content rendered in the modal body |
| `footer` | `snippet` | Optional footer content |

---

**Toast**

A fixed-position notification with four variants and optional auto-dismiss.

```svelte
<script>
	import { Toast } from '@anephenix/ui-svelte';

	let isVisible = $state(false);
</script>

<Toast
	isVisible={isVisible}
	title="Saved"
	message="Your changes have been saved."
	variant="success"
	duration={4000}
	onClose={() => (isVisible = false)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `isVisible` | `bool` | Controls whether the toast is shown |
| `message` | `string` | The notification text |
| `title` | `string` | Optional bold heading above the message |
| `variant` | `"info" \| "success" \| "warning" \| "error"` | Visual style. Defaults to `"info"` |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | Corner of the viewport. Defaults to `"top-right"` |
| `duration` | `number` | Milliseconds before auto-dismissing. Pass `0` to disable. Defaults to `4000` |
| `onClose` | `function` | Called when the close button is clicked or the duration elapses |

---

#### Utilities

**handleErrors**

A helper that extracts validation errors from an Axios-style API response and normalises them into an array. Identical to the React version — it's a plain function with no framework dependency.

```js
import { handleErrors } from '@anephenix/ui-svelte';

try {
	await api.post('/login', data);
} catch (err) {
	handleErrors(setError, err);
}
```

`setError` receives an array of `{ name, message }` objects corresponding to the server-returned field errors.
