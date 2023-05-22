import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import DarkMode from "./comp/Context/DarkContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkMode>
      <App />
    </DarkMode>
  </React.StrictMode>
);
