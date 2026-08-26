import { Footer, NavBar, Page } from "@anephenix/ui";
import links from "../../data/navbar-links.js";
import ThemeToggle from "./ThemeToggle.jsx";

const Link = ({ href, children, ...props }) => (
	<a href={href} {...props}>
		{children}
	</a>
);

const UKFlag = ({ width = 60, height = 30 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 60 30"
		width={width}
		height={height}
	>
		<title>Union Jack Flag</title>
		<clipPath id="s">
			<path d="M0,0 v30 h60 v-30 z" />
		</clipPath>
		<clipPath id="t">
			<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
		</clipPath>
		<g clipPath="url(#s)">
			<path d="M0,0 v30 h60 v-30 z" fill="#012169" />
			<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
			<path
				d="M0,0 L60,30 M60,0 L0,30"
				clipPath="url(#t)"
				stroke="#C8102E"
				strokeWidth="4"
			/>
			<path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
			<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
		</g>
	</svg>
);

const LeftSection = () => (
	<div className="copyright">
		&copy; {new Date().getFullYear()}{" "}
		<a href="https://anephenix.com" rel="noopen noreferrer" target="_blank">
			Anephenix
		</a>
		. UI is licensed under the{" "}
		<a
			href="https://raw.githubusercontent.com/anephenix/ui/master/LICENSE"
			rel="noopen noreferrer"
			target="_blank"
		>
			MIT License
		</a>
		.
	</div>
);

const RightSection = () => (
	<div className="made-in-location">
		<UKFlag width={24} height={12} />
		<a href="https://www.gov.uk" rel="noopen noreferrer" target="_blank">
			&nbsp; Made in the United Kingdom
		</a>
	</div>
);

const sidebarGroups = [
	{
		label: null,
		items: [
			{ href: "/docs", label: "Overview" },
			{ href: "/docs/components", label: "Components" },
		],
	},
	{
		label: "Design System",
		items: [
			{ href: "/docs/colours", label: "Colours" },
			{ href: "/docs/grid", label: "Grid" },
			{ href: "/docs/layout", label: "Layout" },
			{ href: "/docs/typography", label: "Typography" },
		],
	},
	{
		label: "Layout",
		items: [
			{ href: "/docs/components/page", label: "Page" },
			{ href: "/docs/components/hero", label: "Hero" },
			{ href: "/docs/components/footer", label: "Footer" },
		],
	},
	{
		label: "Navigation",
		items: [
			{ href: "/docs/components/breadcrumb", label: "Breadcrumb" },
			{ href: "/docs/components/nav-bar", label: "NavBar" },
			{ href: "/docs/components/pagination", label: "Pagination" },
		],
	},
	{
		label: "Forms",
		items: [
			{ href: "/docs/components/button", label: "Button" },
			{ href: "/docs/components/checkbox", label: "Checkbox" },
			{ href: "/docs/components/switch", label: "Switch" },
			{ href: "/docs/components/input", label: "Input" },
			{ href: "/docs/components/radio-button", label: "RadioButton" },
			{ href: "/docs/components/select", label: "Select" },
			{ href: "/docs/components/dropdown", label: "Dropdown" },
			{ href: "/docs/components/combo-box", label: "ComboBox" },
			{ href: "/docs/components/textarea", label: "Textarea" },
			{ href: "/docs/components/form-field", label: "FormField" },
		],
	},
	{
		label: "Display",
		items: [
			{ href: "/docs/components/accordion", label: "Accordion" },
			{ href: "/docs/components/divider", label: "Divider" },
			{ href: "/docs/components/alert", label: "Alert" },
			{ href: "/docs/components/avatar", label: "Avatar" },
			{ href: "/docs/components/badge", label: "Badge" },
			{ href: "/docs/components/card", label: "Card" },
			{ href: "/docs/components/code", label: "Code" },
			{ href: "/docs/components/code-editor", label: "CodeEditor" },
			{ href: "/docs/components/skeleton", label: "Skeleton" },
			{ href: "/docs/components/spinner", label: "Spinner" },
			{ href: "/docs/components/table", label: "Table" },
			{ href: "/docs/components/tabs", label: "Tabs" },
			{ href: "/docs/components/terminal", label: "Terminal" },
			{ href: "/docs/components/popover", label: "Popover" },
			{ href: "/docs/components/progress-bar", label: "ProgressBar" },
			{ href: "/docs/components/tooltip", label: "Tooltip" },
		],
	},
	{
		label: "Overlays",
		items: [
			{ href: "/docs/components/modal", label: "Modal" },
			{ href: "/docs/components/toast", label: "Toast" },
		],
	},
];

export default function DocsLayout({ children, currentPath }) {
	const logo = (
		<Link href="/">
			<div style={{ fontWeight: "bold", cursor: "pointer" }} id="logo">
				UI
			</div>
		</Link>
	);

	return (
		<Page>
			<NavBar
				logo={logo}
				links={links}
				loggedIn={false}
				Link={Link}
				midSection={<ThemeToggle />}
			/>
			<div className="docs-layout-wrapper container withSidePadding">
				<aside className="docs-sidebar">
					<nav>
						{sidebarGroups.map((group) => (
							<div key={group.items[0].href} className="docs-sidebar-group">
								{group.label && (
									<div className="docs-sidebar-group-label">{group.label}</div>
								)}
								<ul>
									{group.items.map(({ href, label }) => (
										<li key={href}>
											<a
												href={href}
												className={currentPath === href ? "active" : ""}
											>
												{label}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</aside>
				<main className="docs-main">{children}</main>
			</div>
			<Footer leftSection={<LeftSection />} rightSection={<RightSection />} />
		</Page>
	);
}
