import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{ authUser }}></AuthContext.Provider>;
};

export default AuthProvider;
