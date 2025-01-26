import { BrowserRouter, Route } from "react-router";
import Home from "./components/home/Home";
import Registrations from "./components/registrations/Registrations";
import AppLayout from "./components/layout/AppLayout";
import Console from "./components/console/Console";
import ConsoleLayout from "./components/layout/ConsoleLayout";
import AuthenticatedTemplate from "./components/template/AuthenticatedTemplate";
import UnauthenticatedTemplate from "./components/template/UnauthenticatedTemplate";
import NotFound from "./components/errors/NotFound";
import FolderPage from "./components/console/FolderPage";

function App() {
  return (
    <BrowserRouter>
      <AuthenticatedTemplate>
        <Route element={<ConsoleLayout />}>
          <Route index path="/home" element={<Console />} />
          <Route path="/home/*" element={<FolderPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/login" element={<Registrations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </UnauthenticatedTemplate>
    </BrowserRouter>
  );
}

export default App;
