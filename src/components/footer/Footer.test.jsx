import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Footer from "./Footer";

const LeftSection = () => (
	<div className="left-section">This is content for the left section</div>
);

const RightSection = () => (
	<div className="right-section">This is content for the right section</div>
);

describe("Footer", () => {
	describe("when passed no props", () => {
		test("renders without crashing", () => {
			const { container } = render(<Footer />);
			expect(container).toBeTruthy();
		});
	});

	describe("when passed leftSection and rightSection props", () => {
		test("renders without crashing", () => {
			const { container } = render(
				<Footer
					leftSection={<LeftSection />}
					rightSection={<RightSection />}
				/>,
			);
			expect(container).toBeTruthy();
			expect(container.querySelector(".left-section")).toBeTruthy();
			expect(container.querySelector(".right-section")).toBeTruthy();
		});
	});
});
