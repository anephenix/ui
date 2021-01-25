import React from 'react';
import { primaryColour, secondaryColour, tertiaryColour, greenOneColour, greenTwoColour, blueOneColour, blueTwoColour } from '../design-system/colours.scss';

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
} from '../index';
import '../styles/docs.scss';

const buttonsList = [
	{ text: 'Primary', className: 'primary' },
	{ text: 'Secondary', className: 'secondary' },
	{ text: 'Tertiary', className: 'tertiary' }, 
	{ text: 'Green two', className: 'green-two' },
	{ text: 'Green one', className: 'green-one' },
	{ text: 'Blue one', className: 'blue-one' },
	{ text: 'Blue two', className: 'blue-two' },
];

const colours = [
	{name: 'Primary', value: primaryColour, className: 'primary' },
	{name: 'Secondary', value: secondaryColour, className: 'secondary' },
	{name: 'Tertiary', value: tertiaryColour, className: 'tertiary' },
	{name: 'Green Two', value: greenTwoColour, className: 'green-two' },
	{name: 'Green One', value: greenOneColour, className: 'green-one' },
	{name: 'Blue one', value: blueOneColour, className: 'blue-one' },
	{name: 'Blue two', value: blueTwoColour, className: 'blue-two' },
];

const DocsPage = () => (
	<>
		<div>
			<h1>Docs</h1>
			<p>Below is a list of the items and how they are used</p>
			<div style={{display: 'flex'}}>
				{colours.map(c => <div key={c.name} className={`colour-key ${c.className}`}>{c.name} - {c.value}</div>)}
			</div>

			<h2>Colours available</h2>
			<h2>Buttons</h2>
			{buttonsList.map(({ text, className }) => (
				<Button
					key={text}
					text={text}
					className={'button theme-default ' + className}
				/> 
			))}
			<p>Alternate option</p>
			{buttonsList.map(({ text, className }) => (
				<Button
					key={text}
					text={text}
					className={'button theme-default alternate ' + className}
				/>
			))}
		</div>
	</>
);

export default DocsPage;
