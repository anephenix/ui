import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import MobileMenu from "./MobileMenu.svelte";

describe("MobileMenu", () => {
	const mockToggleMenu = vi.fn();
	const mockLinks = [
		{ id: "1", text: "Link1", hideOptions: vi.fn(() => true) },
		{ id: "2", text: "Link2", hideOptions: vi.fn(() => false) },
	];

	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("renders correctly when menu is open", () => {
		render(MobileMenu, {
			props: {
				menuOpen: true,
				toggleMenu: mockToggleMenu,
				links: mockLinks,
				loggedIn: true,
			},
		});
		expect(screen.getByText("Link1")).toBeInTheDocument();
	});

	test("renders correctly when menu is closed", () => {
		render(MobileMenu, {
			props: {
				menuOpen: false,
				toggleMenu: mockToggleMenu,
				links: mockLinks,
				loggedIn: true,
			},
		});
		expect(screen.queryByText("Link1")).not.toBeInTheDocument();
	});

	test("calls toggleMenu when close icon is clicked", () => {
		const { container } = render(MobileMenu, {
			props: {
				menuOpen: true,
				toggleMenu: mockToggleMenu,
				links: mockLinks,
				loggedIn: true,
			},
		});
		fireEvent.click(container.querySelector("#close-icon") as Element);
		expect(mockToggleMenu).toHaveBeenCalledTimes(1);
	});

	test("filters links based on hideOptions", () => {
		render(MobileMenu, {
			props: {
				menuOpen: true,
				toggleMenu: mockToggleMenu,
				links: mockLinks,
				loggedIn: true,
			},
		});
		expect(mockLinks[0].hideOptions).toHaveBeenCalledWith({ loggedIn: true });
		expect(mockLinks[1].hideOptions).toHaveBeenCalledWith({ loggedIn: true });
		expect(screen.getByText("Link1")).toBeInTheDocument();
		expect(screen.queryByText("Link2")).not.toBeInTheDocument();
	});
});
