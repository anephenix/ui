const Input = ({ type = "text", className, value, placeholder }) => (
  <input
    type={type}
    className={className}
    value={value}
    placeholder={placeholder}
  />
);

export default Input;
