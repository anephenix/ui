import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import FormField from "./FormField.svelte";

const testChild = createRawSnippet(() => ({
	render: () => "<span>Test Child</span>",
}));

describe("FormField", () => {
	test("renders children correctly", () => {
		const { getByText } = render(FormField, { props: { children: testChild } });
		expect(getByText("Test Child")).toBeInTheDocument();
	});

	test("renders error message when error prop is provided", () => {
		const { getByText } = render(FormField, {
			props: { children: testChild, error: "Test Error" },
		});
		expect(getByText("Test Error")).toBeInTheDocument();
	});

	test("applies error class when error prop is provided", () => {
		const { container } = render(FormField, {
			props: { children: testChild, error: "Test Error" },
		});
		expect(container.firstChild).toHaveClass("error");
	});

	test("does not render error message when error prop is not provided", () => {
		const { queryByText } = render(FormField, {
			props: { children: testChild },
		});
		expect(queryByText("Test Error")).not.toBeInTheDocument();
	});

	test("does not apply error class when error prop is not provided", () => {
		const { container } = render(FormField, { props: { children: testChild } });
		expect(container.firstChild).not.toHaveClass("error");
	});
});
