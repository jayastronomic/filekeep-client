import { BrowserRouter, Route } from "react-router";
import Home from "./components/home/Home";
import Registrations from "./components/registrations/Registrations";
import AppLayout from "./components/layouts/AppLayout";
import ConsoleLayout from "./components/layouts/ConsoleLayout";
import AuthenticatedTemplate from "./components/templates/AuthenticatedTemplate";
import UnauthenticatedTemplate from "./components/templates/UnauthenticatedTemplate";
import NotFound from "./components/errors/NotFound";
import HomeFolder from "./components/console/HomeFolder";
import SharedFolder from "./components/console/SharedFolder";
import ShareableLinkPage from "./components/shareable/ShareableLinkPage";

function App() {
  return (
    <BrowserRouter>
      <AuthenticatedTemplate>
        <Route element={<ConsoleLayout />}>
          <Route index path="/home/*" element={<HomeFolder />} />
          <Route path="/shared/*" element={<SharedFolder />} />
        </Route>
        <Route path="/s/:token/:assetName" element={<ShareableLinkPage />} />
        <Route path="*" element={<NotFound />} />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Registrations />} />
          <Route path="/login" element={<Registrations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/s/:token/:assetName" element={<ShareableLinkPage />} />
      </UnauthenticatedTemplate>
    </BrowserRouter>
  );
}

export default App;
