import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { DeleteDialogProvider } from "./context/DeleteDialogContext.tsx";
import DeleteDialog from "./component/DeleteDialog.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <DeleteDialogProvider>
        <Provider store={store}>
          <App />
        </Provider>
        <DeleteDialog />
      </DeleteDialogProvider>
      <Toaster position="bottom-center" gutter={8} />
    </ThemeProvider>
  </StrictMode>
);
