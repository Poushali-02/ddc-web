import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { SignInModal } from "./components/auth/SignInModal";
import Projects from "./components/pages/Projects";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signIn",
    element: (
      <SignInModal isOpen={true} onClose={() => (window.location.href = "/")} />
    ),
  },
  {
    path: "/projects",
    element: (
      <Projects isOpen={true} onClose={() => (window.location.href = "/")} />
    ),
  },
]);
