import { router } from "./router/router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "./context/AuthWrapper";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
