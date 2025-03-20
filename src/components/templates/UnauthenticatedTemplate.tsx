import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router";

const UnauthenticatedTemplate = ({ children }: { children: ReactNode }) => {
  const { authUser } = useContext(AuthContext);

  if (authUser) {
    return null; // Do not render anything if authenticated
  }

  console.log("Unauthenticated");
  return (
    <Routes>
      <Route path="/home/*" element={<Navigate to={"/login"} />} />
      {children}
    </Routes>
  ); // Render children if unauthenticated
};

export default UnauthenticatedTemplate;
