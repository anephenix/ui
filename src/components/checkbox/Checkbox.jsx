import React, { forwardRef } from 'react';

const Checkbox = forwardRef(function checkbox(
	{ label, className, name, defaultValue },
	ref
) {
	{
		const classNames = `checkbox ${className}`;
		return (
			<label className={classNames}>
				<input
					type="checkbox"
					name={name}
					ref={ref}
					defaultChecked={defaultValue}
				/>
				<div className="checkbox-element">
					<div className="tick"></div>
				</div>
				<span>{label}</span>
			</label>
		);
	}
});

export default Checkbox;
