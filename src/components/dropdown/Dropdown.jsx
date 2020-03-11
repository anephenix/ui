import React from 'react';

const Option = (value, text) => <option value={value}>{text}</option>;

const Dropdown = ({ options, multiple, id, className, name, ref }) => {
	const classNames = `dropdown ${className}`;
	return (
		<div className={classNames}>
			<select name={name} multiple={multiple} id={id} ref={ref}>
				{options.map(Option)}
			</select>
		</div>
	);
};

export default Dropdown;
