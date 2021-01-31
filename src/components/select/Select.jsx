import React, { forwardRef } from 'react';
import './Select.module.scss';

const Option = ({ value, label }, index) => (
	<option key={index} value={value}>
		{label}
	</option>
);

const Select = forwardRef(function select(
	{ className, defaultValue, name, onChange, options },
	ref
) {
	return (
		<select
			ref={ref}
			name={name}
			className={'select ' + className}
			defaultValue={defaultValue}
			onChange={onChange}
		>
			{options.map(Option)}
		</select>
	);
});

export default Select;
