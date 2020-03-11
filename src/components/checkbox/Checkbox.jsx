import React, { forwardRef } from 'react';

// TODO - support for default initial value
const Checkbox = forwardRef(function checkbox({ label, className, name }, ref) {
	{
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
	}
});

export default Checkbox;
