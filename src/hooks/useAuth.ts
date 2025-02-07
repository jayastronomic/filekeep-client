import { AuthContext } from "../components/contexts/AuthContext";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
