import React from "react";

import {
	Button,
	// Input,
	// Select,
	// Checkbox,
	// RadioButton,
	// Dropdown,
	// FormField,
	// Terminal,
	// Code,
	// Hero,
	// Textarea
} from "../dist";

const buttonsList = [
	{ text: "Primary", className: "primary" },
	{ text: "Secondary", className: "secondary" },
	{ text: "Tertiary", className: "tertiary" },
	{ text: "Green two", className: "green-two" },
	{ text: "Green one", className: "green-one" },
	{ text: "Blue one", className: "blue-one" },
	{ text: "Blue two", className: "blue-two" },
];

const colours = [
	{ name: "Primary", className: "primary" },
	{ name: "Secondary", className: "secondary" },
	{ name: "Tertiary", className: "tertiary" },
	{ name: "Green Two", className: "green-two" },
	{ name: "Green One", className: "green-one" },
	{ name: "Blue one", className: "blue-one" },
	{ name: "Blue two", className: "blue-two" },
];

const DocsPage = () => (
	<>
		<div>
			<h1>Docs</h1>
			<p>Below is a list of the items and how they are used</p>
			<div style={{ display: "flex" }}>
				{colours.map((c) => (
					<div key={c.name} className={`colour-key ${c.className}`}>
						{c.name}
					</div>
				))}
			</div>

			<h2>Colours available</h2>
			<h2>Buttons</h2>
			{buttonsList.map(({ text, className }) => (
				<Button
					key={text}
					text={text}
					className={`button theme-default ${className}`}
				/>
			))}
			<p>Alternate option</p>
			{buttonsList.map(({ text, className }) => (
				<Button
					key={text}
					text={text}
					className={`button theme-default alternate ${className}`}
				/>
			))}
		</div>
	</>
);

export default DocsPage;
