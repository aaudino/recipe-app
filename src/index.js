import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // disabled strict Mode because  react 18 is not compatible with react router 5.1
  // will be upgraded to react router 6 soon
  // <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
