import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("Avatar", () => {
	test("renders an image when src is provided", () => {
		render(<Avatar src="/photo.jpg" alt="Alice" />);
		expect(screen.getByRole("img", { name: "Alice" })).toBeInTheDocument();
	});

	test("uses the provided alt text on the image", () => {
		render(<Avatar src="/photo.jpg" alt="Profile photo" />);
		expect(screen.getByAltText("Profile photo")).toBeInTheDocument();
	});

	test("falls back to name as alt text when alt is omitted", () => {
		render(<Avatar src="/photo.jpg" name="Bob Smith" />);
		expect(screen.getByAltText("Bob Smith")).toBeInTheDocument();
	});

	test("renders initials when name is provided and no src", () => {
		render(<Avatar name="Alice Brown" />);
		expect(screen.getByText("AB")).toBeInTheDocument();
	});

	test("renders a single initial for a single-word name", () => {
		render(<Avatar name="Alice" />);
		expect(screen.getByText("A")).toBeInTheDocument();
	});

	test("uses only the first two words for initials", () => {
		render(<Avatar name="Alice Marie Brown" />);
		expect(screen.getByText("AM")).toBeInTheDocument();
	});

	test("applies a background colour derived from the name", () => {
		const { container } = render(<Avatar name="Alice" />);
		const avatar = container.firstChild as HTMLElement;
		expect(avatar.style.backgroundColor).not.toBe("");
	});

	test("renders the fallback icon when neither src nor name is provided", () => {
		const { container } = render(<Avatar />);
		expect(container.querySelector(".avatar-icon")).toBeInTheDocument();
	});

	test("falls back to initials when the image fails to load", () => {
		render(<Avatar src="/broken.jpg" name="Carol White" />);
		const img = screen.getByRole("img");
		fireEvent.error(img);
		expect(screen.getByText("CW")).toBeInTheDocument();
	});

	test("defaults to the md size class", () => {
		const { container } = render(<Avatar name="Alice" />);
		expect(container.firstChild).toHaveClass("avatar-md");
	});

	test("defaults to the circle shape class", () => {
		const { container } = render(<Avatar name="Alice" />);
		expect(container.firstChild).toHaveClass("avatar-circle");
	});

	test("applies the correct size class", () => {
		const { container } = render(<Avatar name="Alice" size="lg" />);
		expect(container.firstChild).toHaveClass("avatar-lg");
	});

	test("applies the correct shape class", () => {
		const { container } = render(<Avatar name="Alice" shape="rounded" />);
		expect(container.firstChild).toHaveClass("avatar-rounded");
	});

	test("applies an additional className", () => {
		const { container } = render(
			<Avatar name="Alice" className="user-avatar" />,
		);
		expect(container.firstChild).toHaveClass("avatar", "user-avatar");
	});

	test.each(["sm", "md", "lg", "xl"])(
		"renders the %s size without error",
		(size) => {
			const { container } = render(<Avatar name="Alice" size={size} />);
			expect(container.firstChild).toHaveClass(`avatar-${size}`);
		},
	);

	test.each(["circle", "rounded", "square"])(
		"renders the %s shape without error",
		(shape) => {
			const { container } = render(<Avatar name="Alice" shape={shape} />);
			expect(container.firstChild).toHaveClass(`avatar-${shape}`);
		},
	);
});
