import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
	];

	test('renders without crashing', () => {
		const { getByRole } = render(<Select options={options} />);
		expect(getByRole('combobox')).toBeInTheDocument();
	});

	test('renders options correctly', () => {
		const { getByRole } = render(<Select options={options} />);
		const select = getByRole('combobox');
		expect(select.children.length).toBe(2);
		expect(select.children[0].value).toBe('option1');
		expect(select.children[1].value).toBe('option2');
	});

	test('calls onChange when an option is selected', () => {
		const handleChange = jest.fn();
		const { getByRole } = render(
			<Select options={options} onChange={handleChange} />
		);
		const select = getByRole('combobox');
		fireEvent.change(select, { target: { value: 'option2' } });
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
	});

	test('sets default value correctly', () => {
		const { getByRole } = render(
			<Select options={options} defaultValue="option2" />
		);
		const select = getByRole('combobox');
		expect(select.value).toBe('option2');
	});
});
