import { Hero } from "../../dist/index.js";
import SiteLayout from "./SiteLayout.jsx";

const Link = ({ href, children, ...props }) => (
	<a href={href} {...props}>
		{children}
	</a>
);

const title = "A Design System for React";
const description = "Built for Anephenix";
const ctas = [
	{ href: "/get-started", text: "Get started", buttonClass: "primary" },
	{ href: "/docs", text: "Documentation", buttonClass: "secondary" },
];

export default function HomePage() {
	return (
		<SiteLayout>
			<div id="home-page">
				<Hero title={title} description={description} ctas={ctas} Link={Link} />
			</div>
		</SiteLayout>
	);
}
