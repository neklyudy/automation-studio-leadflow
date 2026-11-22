import { createRoot, hydrateRoot } from "react-dom/client";
import "./fonts.css";
import "./styles.css";
import App from "./App";
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
