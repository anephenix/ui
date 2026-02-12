/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Terminal from "./Terminal";
import copy from "clipboard-copy";

jest.mock("clipboard-copy");

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
