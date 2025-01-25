import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import FormField from './FormField';

describe('FormField', () => {
	test('renders children correctly', () => {
		const { getByText } = render(
			<FormField>
				<span>Test Child</span>
			</FormField>
		);
		expect(getByText('Test Child')).toBeInTheDocument();
	});

	test('renders error message when error prop is provided', () => {
		const { getByText } = render(
			<FormField error="Test Error">
				<span>Test Child</span>
			</FormField>
		);
		expect(getByText('Test Error')).toBeInTheDocument();
	});

	test('applies error class when error prop is provided', () => {
		const { container } = render(
			<FormField error="Test Error">
				<span>Test Child</span>
			</FormField>
		);
		expect(container.firstChild).toHaveClass('error');
	});

	test('does not render error message when error prop is not provided', () => {
		const { queryByText } = render(
			<FormField>
				<span>Test Child</span>
			</FormField>
		);
		expect(queryByText('Test Error')).not.toBeInTheDocument();
	});

	test('does not apply error class when error prop is not provided', () => {
		const { container } = render(
			<FormField>
				<span>Test Child</span>
			</FormField>
		);
		expect(container.firstChild).not.toHaveClass('error');
	});
});
