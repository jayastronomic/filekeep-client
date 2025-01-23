import { FC } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthEndpoint from "../../endpoints/AuthEndpoint";
import { useQuery } from "@tanstack/react-query";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: () => {
      console.log("fetching user...");
      return AuthEndpoint.isLoggedIn();
    },
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError)
    return (
      <AuthContext.Provider value={{ authUser: null }}>
        {children}
      </AuthContext.Provider>
    );

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
