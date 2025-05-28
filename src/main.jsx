import database from "../Database/Firebase.config.js";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ToastContainer } from "react-toastify";
// import { CounterProvider } from "./contex/CountContex.jsx";
// import store from './features/store.js'
// import { Provider } from "react-redux";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <ToastContainer />
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { CounterProvider } from "./contex/CountContex.jsx"; 
import store from "./features/store.js";
// import { Provider } from "react-redux";
import { Provider } from "react-redux";

// If 'database' isn't used in this file, don't import it
// import database from "../Database/Firebase.config.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <CounterProvider>
        <App />
      </CounterProvider>
    </Provider>
  </StrictMode>
);
