import { FC } from "react";
import { useLocation } from "react-router";

const TextField: FC<TextFieldProps> = ({
  label,
  type,
  placeholder,
  handleChange,
  name,
  value,
}) => {
  const { pathname } = useLocation();
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-gray-700">{label}</span>
      </div>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="input w-full border focus:outline-none focus:ring"
        autoComplete={
          type === "password" && pathname === "/login" ? "current-password" : ""
        }
        onChange={handleChange}
        name={name}
        value={value}
      />
    </label>
  );
};

export default TextField;
