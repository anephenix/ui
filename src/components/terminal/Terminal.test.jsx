import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import copy from "clipboard-copy";
import Terminal from "./Terminal";

vi.mock("clipboard-copy");

describe("Terminal", () => {
	const title = "Test Terminal";
	const code = 'console.log("Hello, World!");';

	beforeEach(() => {
		render(<Terminal title={title} code={code} />);
	});

	test("should render the terminal with the correct title", () => {
		expect(screen.getByText(title)).toBeInTheDocument();
	});

	test("should render the terminal with the correct code", () => {
		expect(screen.getByText(code)).toBeInTheDocument();
	});

	test("should call clipboard-copy when copy button is clicked", () => {
		const copyButton = screen.getByText("Copy");
		fireEvent.click(copyButton);
		expect(copy).toHaveBeenCalledWith(code);
	});
});
