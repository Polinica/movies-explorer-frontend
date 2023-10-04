import classNames from "classnames";
import "./FilterCheckbox.css";

function Checkbox({ className, title, name, checked, onChange }) {
  return (
    <label className={classNames(className, "checkbox")}>
      <input
        type="checkbox"
        className="checkbox__system-checkbox"
        defaultChecked={true}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox__custom-checkbox"></span>
      <span className="checkbox__label">{title}</span>
    </label>
  );
}

export default Checkbox;
