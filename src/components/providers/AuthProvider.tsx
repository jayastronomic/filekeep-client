import { FC } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useQuery } from "@tanstack/react-query";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isError } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: AuthEndpoint.isLoggedIn,
    retry: false,
  });

  if (isError) {
    return (
      <AuthContext.Provider value={{ authUser: null }}>
        {children}
      </AuthContext.Provider>
    );
  }

  if (data) {
    const { data: authUser } = data;
    return (
      <AuthContext.Provider value={{ authUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
