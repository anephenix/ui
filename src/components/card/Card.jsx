import "./Card.css";

const Card = ({
	image,
	imageAlt = "",
	title,
	subtitle,
	children,
	footer,
	className,
}) => {
	const classNames = `card${className ? ` ${className}` : ""}`;
	return (
		<div className={classNames}>
			{image && <img className="card-image" src={image} alt={imageAlt} />}
			{(title || subtitle) && (
				<div className="card-header">
					{title && <h3 className="card-title">{title}</h3>}
					{subtitle && <p className="card-subtitle">{subtitle}</p>}
				</div>
			)}
			<div className="card-body">{children}</div>
			{footer && <div className="card-footer">{footer}</div>}
		</div>
	);
};

export default Card;
