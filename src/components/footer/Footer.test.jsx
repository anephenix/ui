import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
	test('renders correctly', () => {
		const { container } = render(<Footer />);
		expect(container).toMatchSnapshot();
	});

	test('displays the current year in the copright', () => {
		const { container } = render(<Footer />);
		const currentYear = new Date().getFullYear();
		const className = 'copyright';
		const element = container.querySelector(`.${className}`);
		expect(element).toBeTruthy();
		expect(element.textContent.match(new RegExp(currentYear))).toBeTruthy();
	});

	test('contains a link to Anephenix', () => {
		const { getByText } = render(<Footer />);
		const link = getByText('Anephenix').closest('a');
		expect(link).toHaveAttribute('href', 'https://anephenix.com');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopen noreferrer');
	});

	test('contains a link to the MIT License', () => {
		const { getByText } = render(<Footer />);
		const link = getByText('MIT License').closest('a');
		expect(link).toHaveAttribute('href', 'https://raw.githubusercontent.com/anephenix/ui/master/LICENSE');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopen noreferrer');
	});

	test('contains a link to the UK government site', () => {
		const { getByText } = render(<Footer />);
		const link = getByText('Made in the United Kingdom').closest('a');
		expect(link).toHaveAttribute('href', 'https://www.gov.uk');
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopen noreferrer');
	});
});
