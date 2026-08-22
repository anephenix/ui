import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Card from "./Card.svelte";

function htmlSnippet(html: string) {
	return createRawSnippet(() => ({
		render: () => html,
	}));
}

describe("Card", () => {
	test("renders children in the body", () => {
		render(Card, { props: { children: htmlSnippet("<p>Card content</p>") } });
		expect(screen.getByText("Card content")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(Card, {
			props: { title: "My Card", children: htmlSnippet("<p>Content</p>") },
		});
		expect(screen.getByText("My Card")).toBeInTheDocument();
	});

	test("does not render the header element when neither title nor subtitle is provided", () => {
		const { container } = render(Card, {
			props: { children: htmlSnippet("<p>Content</p>") },
		});
		expect(container.querySelector(".card-header")).not.toBeInTheDocument();
	});

	test("renders the subtitle when provided", () => {
		render(Card, {
			props: {
				subtitle: "A helpful description",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		expect(screen.getByText("A helpful description")).toBeInTheDocument();
	});

	test("renders the header when only subtitle is provided", () => {
		const { container } = render(Card, {
			props: {
				subtitle: "Subtitle only",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		expect(container.querySelector(".card-header")).toBeInTheDocument();
	});

	test("renders the image with the correct src when provided", () => {
		render(Card, {
			props: {
				image: "/photo.jpg",
				imageAlt: "A photo",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "/photo.jpg");
	});

	test("renders the image with the provided alt text", () => {
		render(Card, {
			props: {
				image: "/photo.jpg",
				imageAlt: "A scenic photo",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		expect(screen.getByAltText("A scenic photo")).toBeInTheDocument();
	});

	test("does not render an image element when image is omitted", () => {
		const { container } = render(Card, {
			props: { children: htmlSnippet("<p>Content</p>") },
		});
		expect(container.querySelector(".card-image")).not.toBeInTheDocument();
	});

	test("renders the footer when provided", () => {
		render(Card, {
			props: {
				children: htmlSnippet("<p>Content</p>"),
				footer: htmlSnippet('<button type="button">Action</button>'),
			},
		});
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});

	test("does not render the footer element when footer is omitted", () => {
		const { container } = render(Card, {
			props: { children: htmlSnippet("<p>Content</p>") },
		});
		expect(container.querySelector(".card-footer")).not.toBeInTheDocument();
	});

	test("applies an additional class to the card", () => {
		const { container } = render(Card, {
			props: {
				class: "featured-card",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		expect(container.firstChild).toHaveClass("card", "featured-card");
	});

	test("renders rich children in the body", () => {
		render(Card, {
			props: {
				children: htmlSnippet(
					"<div><p>Paragraph one</p><p>Paragraph two</p></div>",
				),
			},
		});
		expect(screen.getByText("Paragraph one")).toBeInTheDocument();
		expect(screen.getByText("Paragraph two")).toBeInTheDocument();
	});

	test("renders title and subtitle together in the same header", () => {
		const { container } = render(Card, {
			props: {
				title: "Title",
				subtitle: "Subtitle",
				children: htmlSnippet("<p>Content</p>"),
			},
		});
		const header = container.querySelector(".card-header");
		expect(header).toBeInTheDocument();
		expect(header?.querySelector(".card-title")).toHaveTextContent("Title");
		expect(header?.querySelector(".card-subtitle")).toHaveTextContent(
			"Subtitle",
		);
	});
});
