import React from 'react';
import { primaryColour, secondaryColour, tertiaryColour, greenOneColour, greenTwoColour } from '../design-system/colours.scss';

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
} from '../index';

const buttonsList = [
	{ text: 'Primary', className: 'primary' },
	{ text: 'Secondary', className: 'secondary' },
	{ text: 'Tertiary', className: 'tertiary' }, 
	{ text: 'Green one', className: 'green-one' },
	{ text: 'Green two', className: 'green-two' },
	{ text: 'Blue one', className: 'blue-one' },
	{ text: 'Blue two', className: 'blue-two' },
];

const colours = [
	{name: 'Primary', value: primaryColour },
	{name: 'Secondary', value: secondaryColour },
	{name: 'Tertiary', value: tertiaryColour },
	{name: 'Green Two', value: greenTwoColour },
	{name: 'Green One', value: greenOneColour }
];

const DocsPage = () => (
	<>
		<div>
			<h1>Docs</h1>
			<p>Below is a list of the items and how they are used</p>
			<div style={{display: 'flex'}}>
				{colours.map(c => <div key={c.name} style={{ display: 'flex', background: c.value, width: '80px', height: '80px', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'}}>{c.value}</div>)}
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
