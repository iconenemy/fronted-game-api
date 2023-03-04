import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Provider } from 'react-redux';
import App from "./App";
import { theme } from "./components/Theme";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>

  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
  </Provider>
);
