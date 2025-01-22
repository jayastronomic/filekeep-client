import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/home/Home";
import Registrations from "./components/registrations/Registrations";
import AppLayout from "./components/layout/AppLayout";
import { useContext } from "react";
import { AuthContext } from "./components/contexts/AuthContext";
import Console from "./components/console/Console";
import { Navigate } from "react-router";
import ConsoleLayout from "./components/layout/ConsoleLayout";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {authUser ? (
        <Routes>
          <Route element={<ConsoleLayout />}>
            <Route path="/" element={<Navigate to={"/home"} />} />
            <Route index path="/home" element={<Console />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Registrations />} />
            <Route path="/login" element={<Registrations />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
