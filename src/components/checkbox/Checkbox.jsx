import React from 'react';

const Checkbox = ({ label, className, name, ref }) => {
	const classNames = `checkbox ${className}`;
	return (
		<label className={classNames}>
			<input type="checkbox" name={name} ref={ref} />
			<div className="checkbox-element">
				<div className="tick"></div>
			</div>
			<span>{label}</span>
		</label>
	);
};
export default Checkbox;
