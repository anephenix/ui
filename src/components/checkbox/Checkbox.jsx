const Checkbox = ({ label, className }) => {
  const classNames = `checkbox ${className}`;
  return (
    <label className={classNames}>
      <input type="checkbox" />
      <div className="checkbox-element">
        <div className="tick"></div>
      </div>
      <span>{label}</span>
    </label>
  );
};
export default Checkbox;
