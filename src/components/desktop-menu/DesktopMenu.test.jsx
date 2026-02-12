import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DesktopMenu from "./DesktopMenu";
import MenuItem from "../menu-item/MenuItem";

jest.mock("../menu-item/MenuItem", () => jest.fn(() => <div>MenuItem</div>));

describe("DesktopMenu", () => {
	const links = [
		{ hideOnDesktop: false, hideOptions: jest.fn(() => true), name: "Link1" },
		{ hideOnDesktop: true, hideOptions: jest.fn(() => true), name: "Link2" },
		{ hideOnDesktop: false, hideOptions: jest.fn(() => false), name: "Link3" },
	];
	const Link = jest.fn();

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
