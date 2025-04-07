import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.tsx";
import { ReactFlowContextProvider } from "./context/ReactFlowContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowContextProvider>
      <UserProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </UserProvider>
    </ReactFlowContextProvider>
  </StrictMode>
);
