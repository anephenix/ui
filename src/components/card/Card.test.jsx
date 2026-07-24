import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
	test("renders children in the body", () => {
		render(<Card>Card content</Card>);
		expect(screen.getByText("Card content")).toBeInTheDocument();
	});

	test("renders the title when provided", () => {
		render(<Card title="My Card">Content</Card>);
		expect(screen.getByText("My Card")).toBeInTheDocument();
	});

	test("does not render the header element when neither title nor subtitle is provided", () => {
		const { container } = render(<Card>Content</Card>);
		expect(container.querySelector(".card-header")).not.toBeInTheDocument();
	});

	test("renders the subtitle when provided", () => {
		render(<Card subtitle="A helpful description">Content</Card>);
		expect(screen.getByText("A helpful description")).toBeInTheDocument();
	});

	test("renders the header when only subtitle is provided", () => {
		const { container } = render(<Card subtitle="Subtitle only">Content</Card>);
		expect(container.querySelector(".card-header")).toBeInTheDocument();
	});

	test("renders the image with the correct src when provided", () => {
		render(
			<Card image="/photo.jpg" imageAlt="A photo">
				Content
			</Card>,
		);
		const img = screen.getByRole("img");
		expect(img).toHaveAttribute("src", "/photo.jpg");
	});

	test("renders the image with the provided alt text", () => {
		render(
			<Card image="/photo.jpg" imageAlt="A scenic photo">
				Content
			</Card>,
		);
		expect(screen.getByAltText("A scenic photo")).toBeInTheDocument();
	});

	test("does not render an image element when image is omitted", () => {
		const { container } = render(<Card>Content</Card>);
		expect(container.querySelector(".card-image")).not.toBeInTheDocument();
	});

	test("renders the footer when provided", () => {
		render(<Card footer={<button type="button">Action</button>}>Content</Card>);
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});

	test("does not render the footer element when footer is omitted", () => {
		const { container } = render(<Card>Content</Card>);
		expect(container.querySelector(".card-footer")).not.toBeInTheDocument();
	});

	test("applies an additional className to the card", () => {
		const { container } = render(
			<Card className="featured-card">Content</Card>,
		);
		expect(container.firstChild).toHaveClass("card", "featured-card");
	});

	test("renders rich children in the body", () => {
		render(
			<Card>
				<p>Paragraph one</p>
				<p>Paragraph two</p>
			</Card>,
		);
		expect(screen.getByText("Paragraph one")).toBeInTheDocument();
		expect(screen.getByText("Paragraph two")).toBeInTheDocument();
	});

	test("renders title and subtitle together in the same header", () => {
		const { container } = render(
			<Card title="Title" subtitle="Subtitle">
				Content
			</Card>,
		);
		const header = container.querySelector(".card-header");
		expect(header).toBeInTheDocument();
		expect(header.querySelector(".card-title")).toHaveTextContent("Title");
		expect(header.querySelector(".card-subtitle")).toHaveTextContent(
			"Subtitle",
		);
	});
});
