import links from "../../data/navbar-links.js";
import { Footer, NavBar, Page } from "../../dist/index.js";

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
		items: [{ href: "/docs", label: "Overview" }],
	},
	{
		label: "Layout",
		items: [
			{ href: "/docs/page", label: "Page" },
			{ href: "/docs/hero", label: "Hero" },
			{ href: "/docs/footer", label: "Footer" },
		],
	},
	{
		label: "Navigation",
		items: [{ href: "/docs/nav-bar", label: "NavBar" }],
	},
	{
		label: "Forms",
		items: [
			{ href: "/docs/button", label: "Button" },
			{ href: "/docs/checkbox", label: "Checkbox" },
			{ href: "/docs/input", label: "Input" },
			{ href: "/docs/radio-button", label: "RadioButton" },
			{ href: "/docs/select", label: "Select" },
			{ href: "/docs/dropdown", label: "Dropdown" },
			{ href: "/docs/textarea", label: "Textarea" },
			{ href: "/docs/form-field", label: "FormField" },
		],
	},
	{
		label: "Display",
		items: [
			{ href: "/docs/code", label: "Code" },
			{ href: "/docs/terminal", label: "Terminal" },
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
			<NavBar logo={logo} links={links} loggedIn={false} Link={Link} />
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
