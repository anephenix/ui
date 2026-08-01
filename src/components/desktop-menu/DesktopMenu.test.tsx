import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MenuItem from "../menu-item/MenuItem";
import DesktopMenu from "./DesktopMenu";

vi.mock("../menu-item/MenuItem", () => ({
	default: vi.fn(() => <div>MenuItem</div>),
}));

describe("DesktopMenu", () => {
	const links = [
		{ hideOnDesktop: false, hideOptions: vi.fn(() => true), name: "Link1" },
		{ hideOnDesktop: true, hideOptions: vi.fn(() => true), name: "Link2" },
		{ hideOnDesktop: false, hideOptions: vi.fn(() => false), name: "Link3" },
	];
	const Link = vi.fn();

	test("renders without crashing", () => {
		const { container } = render(
			<DesktopMenu links={links} loggedIn={true} Link={Link} />,
		);
		expect(container).toBeInTheDocument();
	});

	test("renders only links that are not hidden on desktop and pass hideOptions", () => {
		const { getAllByText } = render(
			<DesktopMenu links={links} loggedIn={true} Link={Link} />,
		);
		expect(getAllByText("MenuItem")).toHaveLength(1);
		expect(MenuItem).toHaveBeenCalled();
	});

	test("does not render links that are hidden on desktop", () => {
		const { queryByText } = render(
			<DesktopMenu links={links} loggedIn={true} Link={Link} />,
		);
		expect(queryByText("Link2")).toBeNull();
	});

	test("does not render links that do not pass hideOptions", () => {
		const { queryByText } = render(
			<DesktopMenu links={links} loggedIn={true} Link={Link} />,
		);
		expect(queryByText("Link3")).toBeNull();
	});
});
