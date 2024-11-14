import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopcontextProvider from "./Context/Shopcontext.jsx";

createRoot(document.getElementById("root")).render(
  <ShopcontextProvider>
    <App />
  </ShopcontextProvider>
);
