import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import MenuItem from "./MenuItem.svelte";
import MockLink from "./MockLink.test.svelte";

describe("MenuItem", () => {
	test("renders an external link correctly", () => {
		render(MenuItem, {
			props: {
				text: "External Link",
				url: "http://example.com",
				class: "external-link",
				target: "_blank",
				rel: "noopener noreferrer",
			},
		});
		const linkElement = screen.getByText("External Link");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "http://example.com");
		expect(linkElement).toHaveAttribute("target", "_blank");
		expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
	});

	test("renders an internal link correctly", () => {
		render(MenuItem, {
			props: {
				text: "Internal Link",
				url: "/internal",
				class: "internal-link",
				Link: MockLink,
			},
		});
		const linkElement = screen.getByText("Internal Link");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/internal");
	});

	test("renders a button with onclick handler correctly", () => {
		const handleClick = vi.fn();
		render(MenuItem, {
			props: { text: "Button", class: "button", onclick: handleClick },
		});
		const buttonElement = screen.getByText("Button");
		expect(buttonElement).toBeInTheDocument();
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("toggles menu on mobile when link is clicked", () => {
		const toggleMenu = vi.fn();
		render(MenuItem, {
			props: {
				text: "Mobile Link",
				url: "http://example.com",
				class: "mobile-link",
				isMobile: true,
				toggleMenu,
			},
		});
		const linkElement = screen.getByText("Mobile Link");
		fireEvent.click(linkElement);
		expect(toggleMenu).toHaveBeenCalledTimes(1);
	});
});
