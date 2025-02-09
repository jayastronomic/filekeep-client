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
      <div className="label mb-2">
        <span className="label-text text-white font-light text-sm font-[400]">
          {label}
        </span>
      </div>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="w-full border focus:outline-none bg-[#0d1117] text-white border-gray-600 rounded px-2 py-1 text-sm"
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
