import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Breadcrumb from "./Breadcrumb.svelte";

const items = [
	{ label: "Home", href: "/" },
	{ label: "Products", href: "/products" },
	{ label: "Laptops", href: "/products/laptops" },
	{ label: "MacBook Pro" },
];

describe("Breadcrumb", () => {
	test("renders all item labels", () => {
		render(Breadcrumb, { props: { items } });
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Products")).toBeInTheDocument();
		expect(screen.getByText("Laptops")).toBeInTheDocument();
		expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
	});

	test("renders links with the correct href for items with href", () => {
		render(Breadcrumb, { props: { items } });
		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
			"href",
			"/products",
		);
		expect(screen.getByRole("link", { name: "Laptops" })).toHaveAttribute(
			"href",
			"/products/laptops",
		);
	});

	test("does not render a link for the last item when href is omitted", () => {
		render(Breadcrumb, { props: { items } });
		expect(
			screen.queryByRole("link", { name: "MacBook Pro" }),
		).not.toBeInTheDocument();
	});

	test("the current item has aria-current set to page", () => {
		render(Breadcrumb, { props: { items } });
		expect(screen.getByText("MacBook Pro")).toHaveAttribute(
			"aria-current",
			"page",
		);
	});

	test("linked items do not have aria-current", () => {
		render(Breadcrumb, { props: { items } });
		expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute(
			"aria-current",
		);
	});

	test("renders the default separator between items", () => {
		const { container } = render(Breadcrumb, { props: { items } });
		const separators = container.querySelectorAll(".breadcrumb-separator");
		expect(separators).toHaveLength(items.length - 1);
		expect(separators[0]).toHaveTextContent("/");
	});

	test("does not render a separator before the first item", () => {
		const { container } = render(Breadcrumb, { props: { items } });
		const firstItem = container.querySelector(".breadcrumb-item");
		expect(
			firstItem?.querySelector(".breadcrumb-separator"),
		).not.toBeInTheDocument();
	});

	test("renders a custom separator when provided", () => {
		const { container } = render(Breadcrumb, {
			props: { items, separator: "›" },
		});
		const separators = container.querySelectorAll(".breadcrumb-separator");
		expect(separators[0]).toHaveTextContent("›");
	});

	test("separators have aria-hidden to hide them from screen readers", () => {
		const { container } = render(Breadcrumb, { props: { items } });
		for (const sep of container.querySelectorAll(".breadcrumb-separator")) {
			expect(sep).toHaveAttribute("aria-hidden", "true");
		}
	});

	test("wraps items in an ordered list", () => {
		const { container } = render(Breadcrumb, { props: { items } });
		expect(container.querySelector("ol")).toBeInTheDocument();
	});

	test("renders a nav element with aria-label Breadcrumb", () => {
		render(Breadcrumb, { props: { items } });
		expect(
			screen.getByRole("navigation", { name: "Breadcrumb" }),
		).toBeInTheDocument();
	});

	test("applies an additional class to the list", () => {
		const { container } = render(Breadcrumb, {
			props: { items, class: "page-breadcrumb" },
		});
		expect(container.querySelector("ol")).toHaveClass(
			"breadcrumb",
			"page-breadcrumb",
		);
	});

	test("renders a single item with no separator", () => {
		const { container } = render(Breadcrumb, {
			props: { items: [{ label: "Home", href: "/" }] },
		});
		expect(container.querySelectorAll(".breadcrumb-separator")).toHaveLength(0);
	});

	test("works when all items have hrefs", () => {
		const allLinked = [
			{ label: "Home", href: "/" },
			{ label: "Docs", href: "/docs" },
		];
		render(Breadcrumb, { props: { items: allLinked } });
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
	});
});
