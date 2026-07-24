import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Tabs from "./Tabs";

const tabs = [
	{ id: "alpha", label: "Alpha", content: <p>Alpha content</p> },
	{ id: "beta", label: "Beta", content: <p>Beta content</p> },
	{ id: "gamma", label: "Gamma", content: <p>Gamma content</p> },
];

describe("Tabs", () => {
	test("renders all tab labels", () => {
		render(<Tabs tabs={tabs} />);
		expect(screen.getByText("Alpha")).toBeInTheDocument();
		expect(screen.getByText("Beta")).toBeInTheDocument();
		expect(screen.getByText("Gamma")).toBeInTheDocument();
	});

	test("shows the first tab's content by default", () => {
		render(<Tabs tabs={tabs} />);
		const panel = document.getElementById("panel-alpha");
		expect(panel).not.toHaveAttribute("hidden");
	});

	test("hides non-active tab panels by default", () => {
		render(<Tabs tabs={tabs} />);
		expect(document.getElementById("panel-beta")).toHaveAttribute("hidden");
		expect(document.getElementById("panel-gamma")).toHaveAttribute("hidden");
	});

	test("shows the defaultTab panel when specified", () => {
		render(<Tabs tabs={tabs} defaultTab="beta" />);
		expect(document.getElementById("panel-beta")).not.toHaveAttribute("hidden");
		expect(document.getElementById("panel-alpha")).toHaveAttribute("hidden");
	});

	test("switches panel when a tab is clicked", () => {
		render(<Tabs tabs={tabs} />);
		fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
		expect(document.getElementById("panel-beta")).not.toHaveAttribute("hidden");
		expect(document.getElementById("panel-alpha")).toHaveAttribute("hidden");
	});

	test("applies the active class to the selected tab", () => {
		render(<Tabs tabs={tabs} />);
		expect(screen.getByRole("tab", { name: "Alpha" })).toHaveClass(
			"tabs-tab-active",
		);
		expect(screen.getByRole("tab", { name: "Beta" })).not.toHaveClass(
			"tabs-tab-active",
		);
	});

	test("updates the active class when a tab is clicked", () => {
		render(<Tabs tabs={tabs} />);
		fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
		expect(screen.getByRole("tab", { name: "Beta" })).toHaveClass(
			"tabs-tab-active",
		);
		expect(screen.getByRole("tab", { name: "Alpha" })).not.toHaveClass(
			"tabs-tab-active",
		);
	});

	test("sets aria-selected correctly on the active tab", () => {
		render(<Tabs tabs={tabs} />);
		expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
		expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
			"aria-selected",
			"false",
		);
	});

	test("calls onChange with the tab id when a tab is clicked", () => {
		const handleChange = vi.fn();
		render(<Tabs tabs={tabs} onChange={handleChange} />);
		fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
		expect(handleChange).toHaveBeenCalledWith("beta");
	});

	test("ArrowRight moves focus to the next tab", () => {
		render(<Tabs tabs={tabs} />);
		const alphaTab = screen.getByRole("tab", { name: "Alpha" });
		fireEvent.keyDown(alphaTab, { key: "ArrowRight" });
		expect(document.getElementById("panel-beta")).not.toHaveAttribute("hidden");
	});

	test("ArrowLeft moves focus to the previous tab", () => {
		render(<Tabs tabs={tabs} defaultTab="beta" />);
		const betaTab = screen.getByRole("tab", { name: "Beta" });
		fireEvent.keyDown(betaTab, { key: "ArrowLeft" });
		expect(document.getElementById("panel-alpha")).not.toHaveAttribute(
			"hidden",
		);
	});

	test("ArrowRight wraps from the last tab to the first", () => {
		render(<Tabs tabs={tabs} defaultTab="gamma" />);
		const gammaTab = screen.getByRole("tab", { name: "Gamma" });
		fireEvent.keyDown(gammaTab, { key: "ArrowRight" });
		expect(document.getElementById("panel-alpha")).not.toHaveAttribute(
			"hidden",
		);
	});

	test("ArrowLeft wraps from the first tab to the last", () => {
		render(<Tabs tabs={tabs} />);
		const alphaTab = screen.getByRole("tab", { name: "Alpha" });
		fireEvent.keyDown(alphaTab, { key: "ArrowLeft" });
		expect(document.getElementById("panel-gamma")).not.toHaveAttribute(
			"hidden",
		);
	});

	test("tab panels have aria-labelledby pointing to their tab", () => {
		render(<Tabs tabs={tabs} />);
		expect(document.getElementById("panel-alpha")).toHaveAttribute(
			"aria-labelledby",
			"tab-alpha",
		);
	});

	test("tab buttons have aria-controls pointing to their panel", () => {
		render(<Tabs tabs={tabs} />);
		expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
			"aria-controls",
			"panel-alpha",
		);
	});

	test("active tab has tabIndex 0 and inactive tabs have tabIndex -1", () => {
		render(<Tabs tabs={tabs} />);
		expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute(
			"tabIndex",
			"0",
		);
		expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute(
			"tabIndex",
			"-1",
		);
	});

	test("applies an additional className to the wrapper", () => {
		const { container } = render(<Tabs tabs={tabs} className="custom-tabs" />);
		expect(container.firstChild).toHaveClass("tabs", "custom-tabs");
	});
});
