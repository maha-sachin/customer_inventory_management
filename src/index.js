import React from "react";
import { createRoot } from "react-dom/client";
import "./index-gen.css";
import App from "./App";
import Modal from "react-modal";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  Modal.setAppElement("*");
  const root = createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
// const root = createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
