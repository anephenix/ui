import { Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `import { NavBar } from '@anephenix/ui';

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
  {
    id: 'github',
    text: 'GitHub',
    url: 'https://github.com/acme/app',
    target: '_blank',
    rel: 'noopener noreferrer',
    hideOptions: ({ loggedIn }) => true,
  },
];

// Link is your router's link component, e.g. Next.js Link
<NavBar
  logo={<Link href="/"><strong>My App</strong></Link>}
  links={links}
  loggedIn={false}
  Link={Link}
/>`;

export default function NavBarPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>NavBar</h1>
				<p>
					A responsive navigation bar that renders a desktop menu on wider
					screens and a slide-in mobile menu triggered by a hamburger button on
					smaller screens. Manages open/closed state internally using a React
					class component.
				</p>

				<h2>Import</h2>
				<Code code={"import { NavBar } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code title="NavBar usage" code={usageSnippet} language="jsx" />

				<h2>NavBar props</h2>
				<PropTable
					rows={[
						["logo", "node", "Logo element rendered on the left"],
						["links", "array", "Array of link objects — see structure below"],
						[
							"loggedIn",
							"bool",
							"Passed to each link's hideOptions function to control visibility",
						],
						[
							"Link",
							"component",
							"Router link component used for internal URLs",
						],
						[
							"className",
							"string",
							"Optional additional CSS class for the nav bar element",
						],
						[
							"midSection",
							"node",
							"Optional element rendered between the logo and the hamburger",
						],
					]}
				/>

				<h2>Link object shape</h2>
				<PropTable
					rows={[
						["id", "string", "Unique identifier"],
						["text", "string", "Display text"],
						[
							"url",
							"string",
							"Href for the link. Use onClick instead to render a button.",
						],
						[
							"onClick",
							"function",
							"Click handler — renders a <button> rather than an <a>",
						],
						["hideOnDesktop", "bool", "Hide this item in the desktop menu"],
						[
							"hideOptions",
							"function",
							"({ loggedIn }) => bool — return true to show the item",
						],
						["target", "string", "_blank etc."],
						["rel", "string", "Link rel attribute"],
					]}
				/>
			</div>
		</DocsLayout>
	);
}
