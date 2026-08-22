import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/svelte";
import Toast from "./Toast.svelte";

describe("Toast", () => {
	test("renders the message when visible", () => {
		render(Toast, {
			props: {
				isVisible: true,
				message: "Saved successfully",
				onClose: () => {},
			},
		});
		expect(screen.getByText("Saved successfully")).toBeInTheDocument();
	});

	test("renders nothing when not visible", () => {
		const { container } = render(Toast, {
			props: {
				isVisible: false,
				message: "Saved successfully",
				onClose: () => {},
			},
		});
		expect(container.firstElementChild).toBeNull();
	});

	test("renders the title when provided", () => {
		render(Toast, {
			props: {
				isVisible: true,
				title: "Success",
				message: "Your changes were saved.",
				onClose: () => {},
			},
		});
		expect(screen.getByText("Success")).toBeInTheDocument();
	});

	test("does not render a title element when title is omitted", () => {
		const { container } = render(Toast, {
			props: { isVisible: true, message: "Saved", onClose: () => {} },
		});
		expect(container.querySelector(".toast-title")).not.toBeInTheDocument();
	});

	test("calls onClose when the close button is clicked", () => {
		const handleClose = vi.fn();
		render(Toast, {
			props: { isVisible: true, message: "Saved", onClose: handleClose },
		});
		fireEvent.click(screen.getByRole("button", { name: /close/i }));
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test("auto-dismisses after the specified duration", () => {
		vi.useFakeTimers();
		const handleClose = vi.fn();
		render(Toast, {
			props: {
				isVisible: true,
				message: "Saved",
				onClose: handleClose,
				duration: 3000,
			},
		});
		vi.advanceTimersByTime(3000);
		expect(handleClose).toHaveBeenCalledTimes(1);
		vi.useRealTimers();
	});

	test("does not auto-dismiss when duration is 0", () => {
		vi.useFakeTimers();
		const handleClose = vi.fn();
		render(Toast, {
			props: {
				isVisible: true,
				message: "Saved",
				onClose: handleClose,
				duration: 0,
			},
		});
		vi.advanceTimersByTime(10000);
		expect(handleClose).not.toHaveBeenCalled();
		vi.useRealTimers();
	});

	test("does not start the auto-dismiss timer when not visible", () => {
		vi.useFakeTimers();
		const handleClose = vi.fn();
		render(Toast, {
			props: {
				isVisible: false,
				message: "Saved",
				onClose: handleClose,
				duration: 3000,
			},
		});
		vi.advanceTimersByTime(3000);
		expect(handleClose).not.toHaveBeenCalled();
		vi.useRealTimers();
	});

	test("applies the correct variant class", () => {
		const { container } = render(Toast, {
			props: {
				isVisible: true,
				message: "Error occurred",
				variant: "error",
				onClose: () => {},
			},
		});
		expect(container.firstElementChild).toHaveClass("toast-error");
	});

	test("applies the correct position class", () => {
		const { container } = render(Toast, {
			props: {
				isVisible: true,
				message: "Saved",
				position: "bottom-left",
				onClose: () => {},
			},
		});
		expect(container.firstElementChild).toHaveClass("toast-bottom-left");
	});

	test("has role alert for accessibility", () => {
		render(Toast, {
			props: { isVisible: true, message: "Saved", onClose: () => {} },
		});
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	test("has an accessible label on the close button", () => {
		render(Toast, {
			props: { isVisible: true, message: "Saved", onClose: () => {} },
		});
		expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
	});

	test("defaults to the info variant", () => {
		const { container } = render(Toast, {
			props: { isVisible: true, message: "Note", onClose: () => {} },
		});
		expect(container.firstElementChild).toHaveClass("toast-info");
	});

	test("defaults to the top-right position", () => {
		const { container } = render(Toast, {
			props: { isVisible: true, message: "Note", onClose: () => {} },
		});
		expect(container.firstElementChild).toHaveClass("toast-top-right");
	});
});
