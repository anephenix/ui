import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import MockLink from "../menu-item/MockLink.test.svelte";
import NavBar from "./NavBar.svelte";

function textSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<div>${text}</div>`,
	}));
}

describe("NavBar", () => {
	const props = {
		logo: textSnippet("Logo"),
		links: [
			{
				id: "home",
				text: "Home",
				href: "/home",
				hideOnDesktop: false,
				hideOptions: () => false,
			},
		],
		Link: MockLink,
		loggedIn: true,
		class: "test-class",
		midSection: textSnippet("Mid Section"),
	};

	describe("When viewed on a desktop", () => {
		test("renders logo and midSection", () => {
			render(NavBar, { props });
			expect(screen.getByText("Logo")).toBeInTheDocument();
			expect(screen.getByText("Mid Section")).toBeInTheDocument();
		});

		test.todo("renders the desktop menu");
	});

	describe("When viewed on a tablet or mobile device", () => {
		test.todo("renders the mobile menu");

		test("toggles the mobile menu when the hamburger is clicked", () => {
			const { container } = render(NavBar, { props });
			const mobileMenu = () => container.querySelector("#mobile-menu");
			expect(mobileMenu()).toHaveClass("closed");
			fireEvent.click(screen.getByTestId("hamburger"));
			expect(mobileMenu()).toHaveClass("open");
		});
	});
});
