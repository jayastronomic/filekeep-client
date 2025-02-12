import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router";
import ConsoleProvider from "../../components/providers/ConsoleProvider";

const AuthenticatedTemplate = ({ children }: { children: ReactNode }) => {
  const { authUser } = useContext(AuthContext);

  if (!authUser) {
    return null; // Do not render anything if not authenticated
  }

  return (
    <ConsoleProvider>
      <Routes>
        <Route path="/register" element={<Navigate to={"/home"} />} />
        <Route path="/login" element={<Navigate to={"/home"} />} />
        <Route path="/" element={<Navigate to={"/home"} />} />
        {children}
      </Routes>
    </ConsoleProvider>
  ); // Render children if authenticated
};

export default AuthenticatedTemplate;
