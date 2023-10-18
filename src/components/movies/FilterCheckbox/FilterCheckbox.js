import "./FilterCheckbox.css";

function Checkbox({ className, title, name, checked, onChange, disabled }) {
  const checkboxClass = `checkbox ${className}`;

  return (
    <label className={checkboxClass}>
      <input
        type="checkbox"
        className="checkbox__system-checkbox"
        // defaultChecked={true}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox__custom-checkbox"></span>
      <span className="checkbox__label">{title}</span>
    </label>
  );
}

export default Checkbox;
