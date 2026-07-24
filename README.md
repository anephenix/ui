# UI

A design system for Anephenix.

[![npm version](https://badge.fury.io/js/%40anephenix%2Fui.svg)](https://badge.fury.io/js/%40anephenix%2Fui) [![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Socket Badge](https://socket.dev/api/badge/npm/package/@anephenix/ui)](https://socket.dev/npm/package/@anephenix/ui)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (24+)
-   React (18+)

### Usage

Import the components and the stylesheet in your project:

```jsx
import { Button, Input, NavBar } from '@anephenix/ui';
import '@anephenix/ui/dist/index.css';
```

### Components

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

**NavBar**

A responsive navigation bar with a hamburger menu for mobile and a desktop menu. Manages its own open/closed state internally.

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
    {
        id: 'about',
        text: 'About',
        url: '/about',
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
| `links` | `array` | Array of link objects (see structure below) |
| `loggedIn` | `bool` | Passed to each link's `hideOptions` function to control visibility |
| `Link` | `component` | Router link component used for internal URLs |
| `className` | `string` | Optional additional class for the nav bar element |
| `midSection` | `node` | Optional element rendered between the logo and hamburger |

Each link object in the `links` array has this shape:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `text` | `string` | Display text |
| `url` | `string` | Href (use `onClick` instead to render a button) |
| `onClick` | `function` | Click handler (renders a `<button>` instead of `<a>`) |
| `hideOnDesktop` | `bool` | Hide this link in the desktop menu |
| `hideOptions` | `function` | `({ loggedIn }) => bool` — return `true` to show the link |
| `target` | `string` | `_blank` etc. |
| `rel` | `string` | Link rel attribute |

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
| `name` | `string` | Button name attribute |
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

**RadioButton**

A styled radio button with a label. Accepts a `forwardRef`.

```jsx
import { RadioButton } from '@anephenix/ui';

<RadioButton name="colour" label="Red" defaultValue="red" />
<RadioButton name="colour" label="Blue" defaultValue="blue" />
```

| Prop | Type | Description |
|------|------|-------------|
| `name` | `string` | Name attribute (shared across a group) |
| `label` | `string` | Label text |
| `className` | `string` | CSS class(es) |
| `defaultValue` | `string` | Value for this radio option |

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

An alternative styled dropdown using a `<select>` element that supports multiple selection. Accepts a `forwardRef`.

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

**Code**

A code block with syntax highlighting, line numbers, a title bar, and a copy button.

```jsx
import { Code } from '@anephenix/ui';

const snippet = `const greet = (name) => \`Hello, \${name}!\`;`;

<Code title="greet.js" code={snippet} language="javascript" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | | Title shown in the bar above the code |
| `code` | `string` | | The code string to display |
| `language` | `string` | `"javascript"` | Syntax highlighting language |

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

---

### Tests

```
npm t
```

### License and credits

&copy;2026 Anephenix Ltd. UI is licenced under the MIT Licence.
