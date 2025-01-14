/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Code from './Code';
import copy from 'clipboard-copy';

jest.mock('clipboard-copy');

describe('Code', () => {
	const code = `const a = 1;\nconst b = 2;`;
	const title = 'Sample Code';
	const language = 'javascript';

	test('renders the Code component with title and code', () => {
		render(<Code title={title} code={code} language={language} />);
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText('Copy')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('2')).toBeInTheDocument();
	});

	test('copies code to clipboard when Copy button is clicked', () => {
		render(<Code title={title} code={code} language={language} />);
		fireEvent.click(screen.getByText('Copy'));
		expect(copy).toHaveBeenCalledWith(code);
	});

	test('renders the correct number of lines', () => {
		const { container } = render(<Code title={title} code={code} language={language} />);
  		const lineCountItems = container.querySelectorAll('.line-count-item');
		expect(lineCountItems.length).toBe(2);
		expect(lineCountItems[0].textContent).toBe('1');
		expect(lineCountItems[1].textContent).toBe('2');
	});
});