import { FC, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useQuery } from "@tanstack/react-query";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: AuthEndpoint.isLoggedIn,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { data: user } = data;
      setAuthUser(user);
    }
  }, [isSuccess, data]);

  const logIn = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
