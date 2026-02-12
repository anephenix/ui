import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Page from "./Page";

describe("Page", () => {
	test("renders children correctly", () => {
		const { getByText } = render(<Page>Test Content</Page>);
		expect(getByText("Test Content")).toBeInTheDocument();
	});

	test("has the correct className", () => {
		const { container } = render(<Page>Test Content</Page>);
		expect(container.firstChild).toHaveClass("page");
	});
});
