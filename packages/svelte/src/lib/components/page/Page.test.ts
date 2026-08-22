import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Page from "./Page.svelte";

function textSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`,
	}));
}

describe("Page", () => {
	test("renders children correctly", () => {
		render(Page, { props: { children: textSnippet("Test Content") } });
		expect(screen.getByText("Test Content")).toBeInTheDocument();
	});

	test("has the correct class", () => {
		const { container } = render(Page, {
			props: { children: textSnippet("Test Content") },
		});
		expect(container.firstChild).toHaveClass("page");
	});
});
