import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ThemeProvider";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
