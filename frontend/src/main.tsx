import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import { DeleteDialogProvider } from "./context/DeleteDialogContext.tsx";
import DeleteDialog from "./component/DeleteDialog.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeleteDialogProvider>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
      <DeleteDialog />
    </DeleteDialogProvider>
    <Toaster position="bottom-center" gutter={8} />
  </StrictMode>
);
