import React, { forwardRef } from 'react';

// const Option = (value, text) => <option value={value}>{text}</option>;

const Dropdown = forwardRef(function dropdown(
	{ options, multiple, id, className, name, defaultValue },
	ref
) {
	const classNames = `dropdown ${className}`;
	return (
		<div className={classNames}>
			<select
				name={name}
				multiple={multiple}
				id={id}
				ref={ref}
				defaultValue={defaultValue}
			>
				{options.map(({ value, text }, key) => (
					<option key={key} value={value}>
						{text}
					</option>
				))}
			</select>
		</div>
	);
});

export default Dropdown;
