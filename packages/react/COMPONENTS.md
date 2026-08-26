# Component Reference

All components are exported from `@anephenix/ui`. Import the stylesheet once at the top level of your app before using any component:

```js
import '@anephenix/ui/dist/index.css';
```

Components are grouped below by category.

---

#### Layout

**Page**

A full-page wrapper `div`. Wrap your entire app content inside it.

```jsx
import { Page } from '@anephenix/ui';

<Page>
    <p>Your content here</p>
</Page>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `node` | Content to render inside the page wrapper |

---

**Hero**

A hero section with a heading, description, and call-to-action buttons.

```jsx
import { Hero } from '@anephenix/ui';

const ctas = [
    { href: '/get-started', text: 'Get started', buttonClass: 'primary' },
    { href: '/docs', text: 'Documentation', buttonClass: 'secondary' },
];

<Hero
    title="Welcome"
    description="A short description of your product."
    ctas={ctas}
    Link={Link}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | The main heading |
| `description` | `string \| node` | A short description (string is wrapped in `<p>`) |
| `ctas` | `array` | Array of `{ href, text, buttonClass }` objects |
| `Link` | `component` | Optional router link component (falls back to `<a>`) |

---

**Footer**

A two-column footer with left and right sections.

```jsx
import { Footer } from '@anephenix/ui';

<Footer
    leftSection={<span>&copy; 2026 Acme Ltd.</span>}
    rightSection={<a href="/privacy">Privacy</a>}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `leftSection` | `node` | Content for the left side of the footer |
| `rightSection` | `node` | Content for the right side of the footer |

---

#### Navigation

**Breadcrumb**

A navigation trail showing the user's location within a hierarchy. Follows the WAI-ARIA Breadcrumb pattern.

```jsx
import { Breadcrumb } from '@anephenix/ui';

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
| `separator` | `string \| node` | Separator rendered between items. Defaults to `"/"` |
| `className` | `string` | Optional additional CSS class on the list |

---

**NavBar**

A responsive navigation bar with a hamburger menu for mobile and a desktop menu.

```jsx
import { NavBar } from '@anephenix/ui';

const links = [
    {
        id: 'home',
        text: 'Home',
        url: '/',
        hideOnDesktop: false,
        hideOptions: ({ loggedIn }) => true,
    },
];

<NavBar
    logo={<a href="/">My App</a>}
    links={links}
    loggedIn={false}
    Link={Link}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `logo` | `node` | Logo element rendered on the left |
| `links` | `array` | Array of link objects (see shape below) |
| `loggedIn` | `bool` | Passed to each link's `hideOptions` function |
| `Link` | `component` | Router link component used for internal URLs |
| `className` | `string` | Optional additional class for the nav bar element |
| `midSection` | `node` | Optional element rendered between logo and hamburger |

Each link object:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `text` | `string` | Display text |
| `url` | `string` | Href (use `onClick` to render a button instead) |
| `onClick` | `function` | Click handler (renders a `<button>`) |
| `hideOnDesktop` | `bool` | Hide this link in the desktop menu |
| `hideOptions` | `function` | `({ loggedIn }) => bool` — return `true` to show |
| `target` | `string` | `_blank` etc. |
| `rel` | `string` | Link rel attribute |

---

**Pagination**

Page-number controls with first, previous, next, and last buttons. Returns `null` when `totalPages` is less than 2.

```jsx
import { Pagination } from '@anephenix/ui';

const [page, setPage] = useState(1);

<Pagination
    currentPage={page}
    totalPages={20}
    onPageChange={setPage}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `number` | The currently active page (1-based) |
| `totalPages` | `number` | Total number of pages |
| `onPageChange` | `function` | Called with the new page number when any button is clicked |
| `siblingCount` | `number` | Pages shown on each side of the current page. Defaults to `1` |
| `showFirstLast` | `bool` | Show First and Last buttons. Defaults to `true` |
| `className` | `string` | Optional additional CSS class on the nav |

---

#### Forms

**Button**

A basic button element. Accepts a `forwardRef`.

```jsx
import { Button } from '@anephenix/ui';

<Button text="Submit" className="button theme-default primary" onClick={handleClick} />
```

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Button label |
| `name` | `string` | Name attribute |
| `className` | `string` | CSS class(es) |
| `onClick` | `function` | Click handler |

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

A styled checkbox with a label. Accepts a `forwardRef`.

```jsx
import { Checkbox } from '@anephenix/ui';

<Checkbox name="agree" label="I agree to the terms" defaultValue={false} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `label` | `string` | Label text |
| `className` | `string` | CSS class(es) |
| `defaultValue` | `bool` | Whether the checkbox is checked by default |

---

**Switch**

A toggle switch for binary on/off settings. Supports controlled and uncontrolled usage. Accepts a `forwardRef`.

```jsx
import { Switch } from '@anephenix/ui';

// Uncontrolled
<Switch name="notifications" label="Enable notifications" defaultChecked={false} />

// Controlled
const [enabled, setEnabled] = useState(false);
<Switch
    name="darkMode"
    label="Dark mode"
    checked={enabled}
    onChange={(e) => setEnabled(e.target.checked)}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `label` | `string` | Optional label text |
| `checked` | `bool` | Checked state in controlled mode |
| `defaultChecked` | `bool` | Initial checked state in uncontrolled mode |
| `onChange` | `function` | Change handler — receives the native input change event |
| `disabled` | `bool` | Disables interaction and dims the switch |
| `className` | `string` | Optional additional CSS class |

---

**Input**

A text input element. Accepts a `forwardRef`.

```jsx
import { Input } from '@anephenix/ui';

<Input
    name="email"
    type="email"
    placeholder="you@example.com"
    onChange={handleChange}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | Input type |
| `name` | `string` | | Name attribute |
| `className` | `string` | | CSS class(es) |
| `defaultValue` | `string` | | Initial value |
| `placeholder` | `string` | | Placeholder text |
| `onChange` | `function` | | Change handler |

---

**RadioButton**

A styled radio button with a label. Accepts a `forwardRef`.

```jsx
import { RadioButton } from '@anephenix/ui';

const [selected, setSelected] = useState('');

<RadioButton
    name="colour"
    label="Red"
    value="red"
    checked={selected === 'red'}
    onChange={() => setSelected('red')}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute (shared across a group) |
| `label` | `string` | Label text |
| `className` | `string` | CSS class(es) |
| `value` | `string` | Value for this option (controlled mode) |
| `checked` | `bool` | Whether this option is selected (controlled mode) |
| `onChange` | `function` | Called when this option is selected |
| `defaultValue` | `string` | Value attribute for uncontrolled usage |

---

**Select**

A styled `<select>` element. Accepts a `forwardRef`.

```jsx
import { Select } from '@anephenix/ui';

const options = [
    { value: 'gb', label: 'United Kingdom' },
    { value: 'us', label: 'United States' },
];

<Select name="country" options={options} onChange={handleChange} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `className` | `string` | CSS class(es) |
| `defaultValue` | `string` | Initially selected value |
| `onChange` | `function` | Change handler |
| `options` | `array` | Array of `{ value, label }` objects |

---

**Dropdown**

A styled dropdown using a `<select>` element that supports multiple selection. Accepts a `forwardRef`. Options use a `text` field (not `label`) to distinguish it from Select.

```jsx
import { Dropdown } from '@anephenix/ui';

const options = [
    { value: 'js', text: 'JavaScript' },
    { value: 'ts', text: 'TypeScript' },
];

<Dropdown name="language" options={options} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `id` | `string` | Element id |
| `className` | `string` | CSS class(es) |
| `multiple` | `bool` | Allow multiple selections |
| `defaultValue` | `string \| array` | Initially selected value(s) |
| `options` | `array` | Array of `{ value, text }` objects |

---

**ComboBox**

A searchable input that filters a list of options as the user types. Supports keyboard navigation (arrow keys, Enter, Escape), outside-click dismissal, and full ARIA combobox semantics.

```jsx
import { ComboBox } from '@anephenix/ui';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
];

const [selected, setSelected] = useState(null);

<ComboBox
    options={options}
    placeholder="Search fruit..."
    onSelect={(option) => setSelected(option)}
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

A multi-line text input. Accepts a `forwardRef`.

```jsx
import { Textarea } from '@anephenix/ui';

<Textarea name="message" placeholder="Enter your message..." onChange={handleChange} />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute |
| `className` | `string` | CSS class(es) |
| `defaultValue` | `string` | Initial value |
| `placeholder` | `string` | Placeholder text |
| `onChange` | `function` | Change handler |

---

**FormField**

A wrapper for form inputs that displays a validation error message below the input.

```jsx
import { FormField, Input } from '@anephenix/ui';

<FormField error="This field is required">
    <Input name="email" type="email" />
</FormField>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `node` | The form control(s) to wrap |
| `error` | `string` | Error message to display (omit when valid) |

---

#### Display

**Accordion**

Collapsible sections that expand and collapse to reveal content. Follows the WAI-ARIA Accordion pattern. Panels animate open and closed.

```jsx
import { Accordion } from '@anephenix/ui';

const items = [
    { id: 'q1', title: 'What is this?', content: <p>An answer.</p> },
    { id: 'q2', title: 'How does it work?', content: <p>Another answer.</p> },
];

<Accordion items={items} defaultOpen="q1" />
```

| Prop | Type | Description |
|------|------|-------------|
| `items` | `array` | Array of `{ id, title, content }` objects |
| `allowMultiple` | `bool` | Allow more than one panel open at a time. Defaults to `false` |
| `defaultOpen` | `string \| string[]` | Id(s) of item(s) open on first render |
| `onChange` | `function` | Called with an array of currently open ids on change |
| `className` | `string` | Optional additional CSS class |

---

**Alert**

An inline status banner for contextual feedback. The `role` is automatically set to `"alert"` for error/warning variants and `"status"` for info/success.

```jsx
import { Alert } from '@anephenix/ui';

// Persistent
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>

// Dismissible
<Alert variant="warning" onClose={() => setVisible(false)}>
    Your session will expire in 5 minutes.
</Alert>
```

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | Visual style. Defaults to `"info"` |
| `title` | `string` | Optional bold heading above the body |
| `children` | `node` | The alert content |
| `onClose` | `function` | Optional dismiss callback — renders a close button when provided |
| `className` | `string` | Optional additional CSS class |

---

**Divider**

A visual separator between sections of content. Supports horizontal and vertical orientations, three line styles, and an optional centred text label.

```jsx
import { Divider } from '@anephenix/ui';

<Divider />
<Divider label="or" />
<Divider variant="dashed" />
```

| Prop | Type | Description |
|------|------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | Direction of the divider. Defaults to `"horizontal"` |
| `variant` | `"solid" \| "dashed" \| "dotted"` | Line style. Defaults to `"solid"` |
| `label` | `string` | Optional text centred on the divider line |
| `className` | `string` | Optional additional CSS class on the wrapper |

---

**Avatar**

A user profile picture with three automatic states: image, initials (derived from `name`), and a generic icon fallback. The initials background colour is consistently derived from the name.

```jsx
import { Avatar } from '@anephenix/ui';

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
| `className` | `string` | Optional additional CSS class |

---

**Badge**

A small inline label for counts, status indicators, and tags.

```jsx
import { Badge } from '@anephenix/ui';

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">99+</Badge>
```

| Prop | Type | Description |
|------|------|-------------|
| `children` | `node` | The badge content |
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "info" \| "error"` | Colour scheme. Defaults to `"default"` |
| `size` | `"sm" \| "md" \| "lg"` | Size preset. Defaults to `"md"` |
| `className` | `string` | Optional additional CSS class |

---

**Card**

A flexible content container with optional image, header, body, and footer sections. Width fills the parent.

```jsx
import { Card } from '@anephenix/ui';

<Card
    title="Getting started"
    subtitle="Up and running in minutes"
    footer={<Button text="View docs" className="button theme-default primary" />}
>
    <p>Build consistent UIs with a plain-CSS design system.</p>
</Card>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Optional heading in the card header |
| `subtitle` | `string` | Optional secondary line below the title |
| `image` | `string` | Optional URL for a cover image at the top |
| `imageAlt` | `string` | Alt text for the image. Defaults to `""` |
| `children` | `node` | Main body content |
| `footer` | `node` | Optional footer content |
| `className` | `string` | Optional additional CSS class |

---

**Code**

A code block with syntax highlighting, line numbers, a title bar, and a copy button.

```jsx
import { Code } from '@anephenix/ui';

<Code title="greet.js" code={snippet} language="javascript" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | | Title shown in the bar above the code |
| `code` | `string` | | The code string to display |
| `language` | `string` | `"javascript"` | Syntax highlighting language |

---

**CodeEditor**

An editable version of Code: type or paste code directly into it, with line numbers that grow as you add lines, a resizable window, a fullscreen toggle (click the green title-bar button), and a footer with a language switcher and a live line:column cursor position.

```jsx
import { CodeEditor } from '@anephenix/ui';

<CodeEditor
    title="greet.js"
    code={snippet}
    language="javascript"
    onFinishedTyping={(code) => console.log(code)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | | Title shown in the bar above the editor |
| `code` | `string` | | The initial code shown in the editor |
| `language` | `string` | `"javascript"` | Initial syntax-highlighting language |
| `languages` | `string[]` | `["javascript", "jsx", "css"]` | Languages offered in the footer switcher |
| `width` | `number` | `600` | Initial width in pixels |
| `height` | `number` | `300` | Initial height of the scrollable code area in pixels |
| `resizable` | `boolean` | `true` | Whether the bottom-right corner grip can resize the editor |
| `expandable` | `boolean` | `true` | Whether the green title-bar button can expand the editor to fill the browser window |
| `onChange` | `(code: string) => void` | | Called on every keystroke with the current code |
| `onFinishedTyping` | `(code: string) => void` | | Called after typing pauses (or on blur) with the current code |
| `finishedTypingDelay` | `number` | `800` | Milliseconds of inactivity before `onFinishedTyping` fires |

---

**Popover**

A click-triggered floating panel for richer interactive content. Closes on Escape, outside click, or the × button.

```jsx
import { Popover } from '@anephenix/ui';

<Popover
    trigger={<Button text="Options" className="button theme-default secondary" />}
    title="Display options"
    content={<p>Popover body content.</p>}
    position="bottom"
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `trigger` | `element` | The element that toggles the popover |
| `content` | `node` | Content rendered in the popover body |
| `title` | `string` | Optional heading shown in the popover header |
| `position` | `"bottom" \| "top" \| "left" \| "right"` | Placement relative to the trigger. Defaults to `"bottom"` |
| `className` | `string` | Optional additional CSS class |

---

**ProgressBar**

A horizontal bar that communicates the completion state of an operation. Supports four colour variants, three sizes, an optional label and percentage display, and an indeterminate animated state.

```jsx
import { ProgressBar } from '@anephenix/ui';

<ProgressBar value={75} label="Uploading..." showValue />
<ProgressBar value={100} variant="success" label="Complete" showValue />
<ProgressBar indeterminate label="Processing..." />
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
| `className` | `string` | Optional additional CSS class on the wrapper |

---

**Skeleton**

A shimmer placeholder that mimics the shape of content while it loads.

```jsx
import { Skeleton } from '@anephenix/ui';

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
| `className` | `string` | Optional additional CSS class |

---

**Spinner**

An animated loading indicator for indeterminate progress.

```jsx
import { Spinner } from '@anephenix/ui';

<Spinner size="md" label="Loading..." />
```

| Prop | Type | Description |
|------|------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | Controls the diameter and border width. Defaults to `"md"` |
| `label` | `string` | Accessible `aria-label` for screen readers. Defaults to `"Loading..."` |
| `className` | `string` | Optional additional CSS class |

---

**Table**

A data table with column definitions and optional custom cell renderers. Horizontally scrollable on small screens.

```jsx
import { Table } from '@anephenix/ui';

const columns = [
    { key: 'name', header: 'Name' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status', render: (value) => <strong>{value}</strong> },
];

const rows = [
    { id: 1, name: 'Alice Chen', role: 'Engineer', status: 'Active' },
];

<Table columns={columns} rows={rows} caption="Team members" />
```

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `array` | Array of column definition objects |
| `rows` | `array` | Array of row data objects |
| `rowKey` | `string` | Field name used as the React key. Defaults to `"id"` |
| `caption` | `string` | Optional accessible caption |
| `className` | `string` | Optional additional CSS class on the `<table>` element |

Each column object: `key` (string), `header` (string), `render` (optional `(value, row) => node`).

---

**Tabs**

Content-switching tabs with full WAI-ARIA keyboard support (arrow keys, roving `tabIndex`).

```jsx
import { Tabs } from '@anephenix/ui';

const tabs = [
    { id: 'overview', label: 'Overview', content: <p>Overview content.</p> },
    { id: 'specs', label: 'Specifications', content: <p>Specs here.</p> },
];

<Tabs tabs={tabs} defaultTab="overview" onChange={(id) => console.log(id)} />
```

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `array` | Array of `{ id, label, content }` objects |
| `defaultTab` | `string` | Id of the initially selected tab. Defaults to the first tab |
| `onChange` | `function` | Optional `(id) => void` called when the active tab changes |
| `className` | `string` | Optional additional CSS class on the wrapper |

---

**Terminal**

A terminal-style block for showing shell commands or plain-text output. Includes a copy button.

```jsx
import { Terminal } from '@anephenix/ui';

<Terminal title="Install" code="npm i @anephenix/ui" />
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Title shown in the bar above the output |
| `code` | `string` | The text to display |

---

**Tooltip**

A small floating label that appears on hover and keyboard focus. Shown and hidden entirely via CSS.

```jsx
import { Tooltip } from '@anephenix/ui';

<Tooltip content="Save your changes" position="top">
    <button type="button">Save</button>
</Tooltip>
```

| Prop | Type | Description |
|------|------|-------------|
| `content` | `string \| node` | The tooltip text or content |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | Placement relative to the child. Defaults to `"top"` |
| `children` | `node` | The element the tooltip is attached to |
| `className` | `string` | Optional additional CSS class on the tooltip bubble |

---

#### Overlays

**Modal**

A dialog overlay built on the native `<dialog>` element. Traps focus, closes on Escape, and supports an optional footer for action buttons.

```jsx
import { Modal } from '@anephenix/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm action"
    footer={
        <>
            <Button text="Cancel" className="button theme-default secondary alternate" onClick={() => setIsOpen(false)} />
            <Button text="Confirm" className="button theme-default primary" onClick={() => setIsOpen(false)} />
        </>
    }
>
    <p>Are you sure you want to do this?</p>
</Modal>
```

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `bool` | Controls whether the modal is shown |
| `onClose` | `function` | Called when the user dismisses the modal |
| `title` | `string` | Heading shown in the modal header |
| `children` | `node` | Content rendered in the modal body |
| `footer` | `node` | Optional footer content |

---

**Toast**

A fixed-position notification with four variants and optional auto-dismiss.

```jsx
import { Toast } from '@anephenix/ui';

const [isVisible, setIsVisible] = useState(false);

<Toast
    isVisible={isVisible}
    title="Saved"
    message="Your changes have been saved."
    variant="success"
    duration={4000}
    onClose={() => setIsVisible(false)}
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

A helper that extracts validation errors from an Axios-style API response and normalises them into an array.

```js
import { handleErrors } from '@anephenix/ui';

try {
    await api.post('/login', data);
} catch (err) {
    handleErrors(setError, err);
}
```

`setError` receives an array of `{ name, message }` objects corresponding to the server-returned field errors.
