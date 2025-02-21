import {
  FC,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { IoIosClose } from "react-icons/io";

const PillContainer: FC<PillContainerProps> = ({ setEmailError }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [email, setEmail] = useState<EmailData>({ value: "", isValid: true });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (emails.some(({ isValid }) => !isValid)) setEmailError(true);
    else setEmailError(false);
  }, [emails, setEmailError]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.length > 0) {
      if (emails.some(({ value }) => value === email.value)) {
        setEmail({ value: "", isValid: true });
        return;
      }
      const validatedEmail = validateEmail(email);
      setEmails((prev) => [...prev, validatedEmail]);
      setEmail({ value: "", isValid: true });
    }
  };

  const validateEmail = (emailData: EmailData): EmailData => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
      return { ...emailData, isValid: false };
    else return { ...emailData, isValid: true };
  };

  const handleDelete = (email: EmailData) => {
    setEmails(
      emails.filter((currentEmail) => currentEmail.value !== email.value)
    );
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const { value } = email;

  console.log(emails);
  return (
    <div
      className={`flex grow space-x-2 items-center flex-wrap w-full mt-8 rounded border-box ${isFocused && "ring-2"} p-1 border border-gray-700 hover:ring-2 transition`}
      onClick={handleFocus}
    >
      {emails.map((email) => (
        <button
          onClick={() => handleDelete(email)}
          className={`flex space-x-1 items-center bg-gray-800 rounded-full my-1 mx-0.5 px-1.5 text-xs py-1 ${email.isValid ? "bg-gray-800" : "bg-red-950"}`}
        >
          <span>{email.value}</span>
          <IoIosClose className="text-lg text-gray-500 hover:text-gray-200 transition" />
        </button>
      ))}
      <input
        ref={inputRef}
        role="combobox"
        className="text-sm border rounded py-1 px-2 focus:outline-none border-none flex-1 grow h-[22px] p-0 appearance-none"
        placeholder={emails.length > 0 ? "" : "Add an email"}
        onChange={handleChange}
        onKeyDown={handleEnter}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
      />
    </div>
  );
};

export default PillContainer;
