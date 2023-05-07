import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MainLayout from "./components/layout/main-layout.tsx";
import { store } from "./lib/redux/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <MainLayout>
          <App />
        </MainLayout>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
