import { Link } from "react-router";
import TextField from "../utility/TextField";
import { useLocation } from "react-router";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useMutation } from "@tanstack/react-query";

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
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
      />
      <TextField
        label="password confirmation"
        name="passwordConfirmation"
        handleChange={handleChange}
        value={passwordConfirmation || ""}
      />
      <button
        type="submit"
        className="btn text-white w-full bg-blue-500 text-base hover:bg-blue-600"
      >
        Sign up
      </button>
      <div className="w-full flex justify-center space-x-1">
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
        label="password"
        name="password"
        handleChange={handleChange}
        value={password || ""}
      />
      <button
        type="submit"
        className="btn text-white w-full bg-blue-500 text-base hover:bg-blue-600"
      >
        Log in
      </button>
      <div className="w-full flex justify-center space-x-1">
        <span>Don't have an account? </span>
        <Link to="/register" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

const Registrations = () => {
  const { pathname } = useLocation();
  const title = pathname === "/register" ? "Sign up" : "Log in";
  const endpoint =
    pathname === "/register" ? AuthEndpoint.register : AuthEndpoint.login;

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const mutate = useMutation({
    mutationFn: endpoint,
    onSuccess: (data) => {
      console.log(data);
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
    mutate.mutate(user);
  };

  return (
    <main className="flex flex-col items-center w-full h-full p-4">
      <h1 className="text-2xl louis">{title}</h1>
      <form onSubmit={handleSubmit} className="p-2 mt-8 w-full">
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
