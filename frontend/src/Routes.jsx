import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Projects from "./components/pages/Projects";
import BlogDetail from "./components/pages/BlogDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects",
    element: (
      <Projects isOpen={true} onClose={() => (window.location.href = "/")} />
    ),
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
]);
