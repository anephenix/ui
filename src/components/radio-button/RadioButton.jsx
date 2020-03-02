const RadioButton = ({ name, label, className }) => {
  const classNames = `radio ${className}`;
  return (
    <label className={classNames}>
      <input type="radio" name={name} />
      <div className="radio-element">
        <div className="selected"></div>
      </div>
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
