import { Link } from "react-router";
import TextField from "../utility/TextField";
import { useLocation } from "react-router";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FileKeepIcon from "../../components/home/FileKeepIcon";

const SignUp: FC<SignUpProps> = ({ handleChange, user }) => {
  const { email, password, passwordConfirmation } = user;
  return (
    <div className="w-full space-y-4">
      <TextField
        label="email"
        name="email"
        handleChange={handleChange}
        value={email || ""}
      />
      <TextField
        type="password"
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
      />
      <TextField
        type="password"
        label="password confirmation"
        name="passwordConfirmation"
        handleChange={handleChange}
        value={passwordConfirmation || ""}
      />
      <button
        type="submit"
        className="text-center bg-gray-900 text-white font-light rounded-md p-2 border-[0.5px] w-full text-sm border-gray-400"
      >
        Sign up
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

const LogIn: FC<LogInPrps> = ({ handleChange, user }) => {
  const { email, password } = user;
  return (
    <div className="w-full space-y-4">
      <TextField
        label="email"
        name="email"
        handleChange={handleChange}
        value={email || ""}
      />
      <TextField
        type="password"
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
      />
      <button
        type="submit"
        className="text-center text-white font-light rounded-md p-2 border-[0.5px] w-full text-sm border-gray-400 bg-gray-900"
      >
        Log in
      </button>
      <div className="w-full flex items-center space-x-1 text-white text-sm">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const Registrations = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const title = pathname === "/register" ? "Sign up" : "Log in";
  const endpoint =
    pathname === "/register" ? AuthEndpoint.register : AuthEndpoint.login;

  const mutation = useMutation({
    mutationFn: endpoint,
    onSuccess: ({ data, status }) => {
      if (status === "SUCCESS") {
        localStorage.setItem("token", data);
        queryClient.invalidateQueries({ queryKey: ["is-logged-in"] });
      }
    },
    onError(e) {
      console.log(e);
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
    if (pathname === "/login") delete user.passwordConfirmation;
    mutation.mutate(user);
  };

  return (
    <main className="bg-[#0d1117] flex flex-col items-center w-full h-full p-4">
      <Link className="pointer" to={"/"}>
        <FileKeepIcon width="50" height="50" viewBox="85 90 200 200" />
      </Link>
      <h1 className="text-2xl text-white">{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="p-2 mt-8 w-[18rem] border border-gray-600 rounded-lg bg-[#151B23] p-4"
      >
        {pathname === "/register" ? (
          <SignUp handleChange={handleChange} user={user} />
        ) : (
          <LogIn handleChange={handleChange} user={user} />
        )}
      </form>
    </main>
  );
};

export default Registrations;
