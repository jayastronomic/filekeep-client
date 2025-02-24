import { FC, useState, KeyboardEvent, ChangeEvent, useRef } from "react";
import { IoIosClose } from "react-icons/io";

const PillContainer: FC<PillContainerProps> = ({
  setEmailList,
  emailList,
  validEmail,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addEmail = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email.length > 0) {
      if (emailList.some((currentEmail) => currentEmail === email)) {
        setEmail("");
        return;
      }
      setEmailList((prev) => [...prev, email]);
      setEmail("");
    }
  };

  const handleDelete = (email: string) => {
    setEmailList(emailList.filter((currentEmail) => currentEmail !== email));
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={`flex grow space-x-2 items-center flex-wrap w-full mt-8 rounded border-box ${isFocused && "ring-2"} p-1 border border-gray-700 hover:ring-2 transition`}
      onClick={handleFocus}
    >
      {emailList.map((email) => (
        <button
          key={email}
          className={`flex space-x-1 items-center bg-gray-800 rounded-full my-1 mx-0.5 px-1.5 text-xs py-1 ${validEmail(email) ? "bg-gray-800" : "bg-red-950"}`}
        >
          <span>{email}</span>
          <IoIosClose
            onClick={() => handleDelete(email)}
            className="text-lg text-gray-500 hover:text-gray-200 transition"
          />
        </button>
      ))}
      <input
        ref={inputRef}
        role="combobox"
        className="text-sm border rounded py-1 px-2 focus:outline-none border-none flex-1 grow h-[22px] p-0 appearance-none"
        placeholder={emailList.length > 0 ? "" : "Add an email"}
        onChange={handleChange}
        onKeyDown={addEmail}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={email}
      />
    </div>
  );
};

export default PillContainer;
