import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import DesktopMenu from "./DesktopMenu.svelte";

describe("DesktopMenu", () => {
	const links = [
		{
			id: "1",
			text: "Link1",
			hideOnDesktop: false,
			hideOptions: vi.fn(() => true),
		},
		{
			id: "2",
			text: "Link2",
			hideOnDesktop: true,
			hideOptions: vi.fn(() => true),
		},
		{
			id: "3",
			text: "Link3",
			hideOnDesktop: false,
			hideOptions: vi.fn(() => false),
		},
	];

	test("renders without crashing", () => {
		const { container } = render(DesktopMenu, {
			props: { links, loggedIn: true },
		});
		expect(container).toBeInTheDocument();
	});

	test("renders only links that are not hidden on desktop and pass hideOptions", () => {
		render(DesktopMenu, { props: { links, loggedIn: true } });
		expect(screen.getByText("Link1")).toBeInTheDocument();
	});

	test("does not render links that are hidden on desktop", () => {
		render(DesktopMenu, { props: { links, loggedIn: true } });
		expect(screen.queryByText("Link2")).not.toBeInTheDocument();
	});

	test("does not render links that do not pass hideOptions", () => {
		render(DesktopMenu, { props: { links, loggedIn: true } });
		expect(screen.queryByText("Link3")).not.toBeInTheDocument();
	});
});
