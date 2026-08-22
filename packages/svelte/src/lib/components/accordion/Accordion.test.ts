import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Accordion from "./Accordion.svelte";

const items = [
	{ id: "one", title: "What is this?", content: "This is the first answer." },
	{
		id: "two",
		title: "How does it work?",
		content: "This is the second answer.",
	},
	{ id: "three", title: "Is it free?", content: "This is the third answer." },
];

describe("Accordion", () => {
	test("renders all item titles", () => {
		render(Accordion, { props: { items } });
		expect(screen.getByText("What is this?")).toBeInTheDocument();
		expect(screen.getByText("How does it work?")).toBeInTheDocument();
		expect(screen.getByText("Is it free?")).toBeInTheDocument();
	});

	test("all panels are closed by default", () => {
		render(Accordion, { props: { items } });
		for (const { id } of items) {
			expect(document.getElementById(`panel-${id}`)).not.toHaveClass(
				"accordion-panel-open",
			);
		}
	});

	test("clicking a trigger opens its panel", () => {
		render(Accordion, { props: { items } });
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(document.getElementById("panel-one")).toHaveClass(
			"accordion-panel-open",
		);
	});

	test("clicking an open trigger closes it", () => {
		render(Accordion, { props: { items, defaultOpen: "one" } });
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("trigger has aria-expanded false when closed", () => {
		render(Accordion, { props: { items } });
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-expanded", "false");
	});

	test("trigger has aria-expanded true when open", () => {
		render(Accordion, { props: { items, defaultOpen: "one" } });
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-expanded", "true");
	});

	test("defaultOpen opens that item initially", () => {
		render(Accordion, { props: { items, defaultOpen: "two" } });
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("opening one item closes the previously open item by default", () => {
		render(Accordion, { props: { items, defaultOpen: "one" } });
		fireEvent.click(screen.getByRole("button", { name: /how does it work/i }));
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-one")).not.toHaveClass(
			"accordion-panel-open",
		);
	});

	test("allowMultiple lets multiple items be open simultaneously", () => {
		render(Accordion, {
			props: { items, allowMultiple: true, defaultOpen: "one" },
		});
		fireEvent.click(screen.getByRole("button", { name: /how does it work/i }));
		expect(document.getElementById("panel-one")).toHaveClass(
			"accordion-panel-open",
		);
		expect(document.getElementById("panel-two")).toHaveClass(
			"accordion-panel-open",
		);
	});

	test("calls onChange with the array of open ids when toggled", () => {
		const handleChange = vi.fn();
		render(Accordion, { props: { items, onChange: handleChange } });
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(handleChange).toHaveBeenCalledWith(["one"]);
	});

	test("onChange is called with an empty array when the last open item is closed", () => {
		const handleChange = vi.fn();
		render(Accordion, {
			props: { items, defaultOpen: "one", onChange: handleChange },
		});
		fireEvent.click(screen.getByRole("button", { name: /what is this/i }));
		expect(handleChange).toHaveBeenCalledWith([]);
	});

	test("trigger aria-controls points to the correct panel id", () => {
		render(Accordion, { props: { items } });
		expect(
			screen.getByRole("button", { name: /what is this/i }),
		).toHaveAttribute("aria-controls", "panel-one");
	});

	test("panel aria-labelledby points to the correct trigger id", () => {
		render(Accordion, { props: { items } });
		expect(document.getElementById("panel-one")).toHaveAttribute(
			"aria-labelledby",
			"trigger-one",
		);
	});

	test("applies an additional class to the wrapper", () => {
		const { container } = render(Accordion, {
			props: { items, class: "faq-accordion" },
		});
		expect(container.firstChild).toHaveClass("accordion", "faq-accordion");
	});
});
