import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuItem from "./MenuItem";

describe("MenuItem", () => {
	test("renders an external link correctly", () => {
		render(
			<MenuItem
				text="External Link"
				url="http://example.com"
				className="external-link"
				target="_blank"
				rel="noopener noreferrer"
				i={1}
			/>,
		);
		const linkElement = screen.getByText("External Link");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "http://example.com");
		expect(linkElement).toHaveAttribute("target", "_blank");
		expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
	});

	test("renders an internal link correctly", () => {
		const MockLink = ({ children, ...props }) => <a {...props}>{children}</a>;
		render(
			<MenuItem
				text="Internal Link"
				url="/internal"
				className="internal-link"
				Link={MockLink}
				i={2}
			/>,
		);
		const linkElement = screen.getByText("Internal Link");
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute("href", "/internal");
	});

	test("renders a button with onClick handler correctly", () => {
		const handleClick = jest.fn();
		render(
			<MenuItem text="Button" className="button" onClick={handleClick} i={3} />,
		);
		const buttonElement = screen.getByText("Button");
		expect(buttonElement).toBeInTheDocument();
		fireEvent.click(buttonElement);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("toggles menu on mobile when link is clicked", () => {
		const toggleMenu = jest.fn();
		render(
			<MenuItem
				text="Mobile Link"
				url="http://example.com"
				className="mobile-link"
				isMobile={true}
				toggleMenu={toggleMenu}
				i={4}
			/>,
		);
		const linkElement = screen.getByText("Mobile Link");
		fireEvent.click(linkElement);
		expect(toggleMenu).toHaveBeenCalledTimes(1);
	});
});
