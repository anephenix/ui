import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Tooltip from "./Tooltip.svelte";

const saveButton = createRawSnippet(() => ({
	render: () => '<button type="button">Save</button>',
}));

const actionButton = createRawSnippet(() => ({
	render: () => '<button type="button">Action</button>',
}));

describe("Tooltip", () => {
	test("renders the children", () => {
		render(Tooltip, {
			props: { content: "Save this item", children: saveButton },
		});
		expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
	});

	test("tooltip element is always present in the DOM", () => {
		render(Tooltip, {
			props: { content: "Save this item", children: saveButton },
		});
		expect(screen.getByRole("tooltip")).toBeInTheDocument();
	});

	test("tooltip has the correct text content", () => {
		render(Tooltip, {
			props: { content: "Helpful hint", children: actionButton },
		});
		expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful hint");
	});

	test("applies the correct position class", () => {
		render(Tooltip, {
			props: { content: "Hint", position: "bottom", children: actionButton },
		});
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip-bottom");
	});

	test("defaults to the top position", () => {
		render(Tooltip, { props: { content: "Hint", children: actionButton } });
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip-top");
	});

	test("applies an additional class to the tooltip", () => {
		render(Tooltip, {
			props: { content: "Hint", class: "custom-tip", children: actionButton },
		});
		expect(screen.getByRole("tooltip")).toHaveClass("tooltip", "custom-tip");
	});

	test.each(["top", "bottom", "left", "right"])(
		"renders the %s position without error",
		(position) => {
			render(Tooltip, {
				props: { content: "Hint", position, children: actionButton },
			});
			expect(screen.getByRole("tooltip")).toHaveClass(`tooltip-${position}`);
		},
	);

	test("renders rich content in the tooltip", () => {
		render(Tooltip, {
			props: {
				content: createRawSnippet(() => ({
					render: () => "<strong>Bold hint</strong>",
				})),
				children: actionButton,
			},
		});
		expect(screen.getByText("Bold hint")).toBeInTheDocument();
	});

	test("wrapper has the tooltip-wrapper class", () => {
		const { container } = render(Tooltip, {
			props: { content: "Hint", children: actionButton },
		});
		expect(container.querySelector(".tooltip-wrapper")).toBeInTheDocument();
	});
});
