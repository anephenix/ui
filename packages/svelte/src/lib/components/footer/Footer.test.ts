import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Footer from "./Footer.svelte";

const leftSection = createRawSnippet(() => ({
	render: () =>
		'<div class="left-section">This is content for the left section</div>',
}));

const rightSection = createRawSnippet(() => ({
	render: () =>
		'<div class="right-section">This is content for the right section</div>',
}));

describe("Footer", () => {
	describe("when passed no props", () => {
		test("renders without crashing", () => {
			const { container } = render(Footer);
			expect(container).toBeTruthy();
		});
	});

	describe("when passed leftSection and rightSection props", () => {
		test("renders without crashing", () => {
			const { container } = render(Footer, {
				props: { leftSection, rightSection },
			});
			expect(container).toBeTruthy();
			expect(container.querySelector(".left-section")).toBeTruthy();
			expect(container.querySelector(".right-section")).toBeTruthy();
		});
	});
});
