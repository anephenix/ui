import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import { createRawSnippet } from "svelte";
import Modal from "./Modal.svelte";

const modalContent = createRawSnippet(() => ({
	render: () => "<p>Modal content</p>",
}));

const innerContent = createRawSnippet(() => ({
	render: () => "<p>Inner content</p>",
}));

const emptyChildren = createRawSnippet(() => ({
	render: () => "<span></span>",
}));

const confirmFooter = createRawSnippet(() => ({
	render: () => '<button type="button">Confirm</button>',
}));

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = vi.fn(function (
		this: HTMLDialogElement,
	) {
		this.open = true;
	});
	HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
		this.open = false;
	});
});

describe("Modal", () => {
	test("renders the title when open", () => {
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
			},
		});
		expect(screen.getByText("Test Modal")).toBeInTheDocument();
	});

	test("renders children in the modal body", () => {
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: modalContent,
			},
		});
		expect(screen.getByText("Modal content")).toBeInTheDocument();
	});

	test("calls showModal when isOpen is true", () => {
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
			},
		});
		expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
	});

	test("calls close when isOpen transitions to false", () => {
		const { rerender } = render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
			},
		});
		rerender({
			isOpen: false,
			title: "Test Modal",
			onClose: () => {},
			children: emptyChildren,
		});
		expect(HTMLDialogElement.prototype.close).toHaveBeenCalledTimes(1);
	});

	test("calls onClose when the close button is clicked", () => {
		const handleClose = vi.fn();
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: handleClose,
				children: emptyChildren,
			},
		});
		fireEvent.click(screen.getByRole("button", { name: /close/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("renders the footer when provided", () => {
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
				footer: confirmFooter,
			},
		});
		expect(screen.getByText("Confirm")).toBeInTheDocument();
	});

	test("does not render the footer element when footer prop is omitted", () => {
		const { container } = render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
			},
		});
		expect(container.querySelector(".modal-footer")).not.toBeInTheDocument();
	});

	test("calls onClose when the backdrop (dialog element) is clicked", () => {
		const handleClose = vi.fn();
		const { container } = render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: handleClose,
				children: emptyChildren,
			},
		});
		const dialog = container.querySelector("dialog");
		fireEvent.click(dialog as Element, { target: dialog });
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("does not call onClose when content inside the modal is clicked", () => {
		const handleClose = vi.fn();
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: handleClose,
				children: innerContent,
			},
		});
		fireEvent.click(screen.getByText("Inner content"));
		expect(handleClose).not.toHaveBeenCalled();
	});

	test("renders a close button with an accessible label", () => {
		render(Modal, {
			props: {
				isOpen: true,
				title: "Test Modal",
				onClose: () => {},
				children: emptyChildren,
			},
		});
		expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
	});
});
