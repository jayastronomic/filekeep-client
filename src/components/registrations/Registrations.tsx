import { Link, useNavigate } from "react-router";
import TextField from "../utility/TextField";
import { useLocation } from "react-router";
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import ErrorBanner from "./ErrorBanner";
import { AuthContext } from "../../components/contexts/AuthContext";

const SignUp: FC<SignUpProps> = ({ handleChange, user, isPending }) => {
  const { email, password, passwordConfirmation, firstName, lastName } = user;
  return (
    <div className="w-full space-y-4">
      <TextField
        autoFocus
        label="email"
        name="email"
        handleChange={handleChange}
        value={email || ""}
        required
      />
      <div className="space-x-2 inline-flex">
        <TextField
          label="first name"
          name="firstName"
          handleChange={handleChange}
          value={firstName || ""}
          required
        />
        <TextField
          label="last name"
          name="lastName"
          handleChange={handleChange}
          value={lastName || ""}
          required
        />
      </div>
      <TextField
        type="password"
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
        required
      />
      <TextField
        type="password"
        label="password confirmation"
        name="passwordConfirmation"
        handleChange={handleChange}
        value={passwordConfirmation || ""}
        required
      />
      <button
        type="submit"
        className={`text-center  text-white font-light rounded-md p-2 border-[0.5px] w-full text-sm mt-4 ${
          isPending ? " bg-gray-400" : " bg-gray-900"
        }`}
      >
        {isPending ? "Signing up..." : "Sign up"}
      </button>
      <div className="w-full flex items-center space-x-1 text-white text-sm">
        <span>Already have an account?</span>
        <Link to="/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
};

const LogIn: FC<LogInPrps> = ({ handleChange, user, isPending }) => {
  const { email, password } = user;

  return (
    <div className="w-full space-y-4">
      <TextField
        autoFocus
        label="email"
        name="email"
        handleChange={handleChange}
        value={email || ""}
        required
      />
      <TextField
        type="password"
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
        required
      />
      <button
        type="submit"
        className={`text-center text-white font-light rounded-md p-2 border-[0.5px] w-full text-sm mt-4 ${
          isPending ? " bg-gray-400" : " bg-gray-900"
        }`}
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>
      <div className="w-full flex items-center space-x-1 text-white text-sm">
        <span>Don't have an account? </span>
        <Link to={"/register"} className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const Registrations: FC<RegistrationsProps> = ({
  classes = "",
  assetName,
  secured,
  token,
}) => {
  const [user, setUser] = useState<User>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const title = pathname === "/register" ? "Sign up" : "Log in";
  const endpoint =
    pathname === "/register" ? AuthEndpoint.register : AuthEndpoint.login;

  const { mutate, error, isPending } = useMutation({
    mutationFn: endpoint,
    onSuccess: ({ data, status }) => {
      if (status === "SUCCESS") {
        localStorage.setItem("token", data);
        queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
        if (pathname.startsWith("/s")) navigate(`/s/${token}/${assetName}`);
      }
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <main
      className={`bg-[#0d1117] flex flex-col items-center w-full h-full p-4 ${classes}`}
    >
      {!secured && (
        <Link className="pointer" to={"/"}>
          <FileKeepIcon width="50" height="50" viewBox="85 90 200 200" />
        </Link>
      )}
      <h1 className="text-2xl text-white">{title}</h1>

      {pathname === "/login" && error && (
        <ErrorBanner message={error.message} />
      )}
      {secured && (
        <div className="text-xl text-gray-200 mt-4 text-center">
          <span>To keep </span>
          <span className="text-gray-500">{assetName} </span>
          <span>secure, we need to confirm your identity </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-8 w-[18rem] border border-gray-600 rounded-lg bg-[#151B23] p-4"
      >
        {pathname === "/register" ? (
          <SignUp
            handleChange={handleChange}
            user={user}
            isPending={isPending}
          />
        ) : (
          <LogIn
            handleChange={handleChange}
            user={user}
            isPending={isPending}
          />
        )}
      </form>
    </main>
  );
};

export default Registrations;
