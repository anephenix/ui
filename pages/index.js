// Dependencies
import React from "react";
import Link from "next/link";

// Components
import { Hero } from "../dist";

// Data
const title = "A Design System for React";
const description = "Built for Anephenix";
const ctas = [
	{ href: "/get-started", text: "Get started", buttonClass: "primary" },
	{ href: "/docs", text: "Documentation", buttonClass: "secondary" },
];

const HomePage = () => (
	<div id="home-page">
		<Hero {...{ title, description, ctas }} Link={Link} />
	</div>
);

export default HomePage;
