import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import Fonts from "./fonts/Fonts.jsx";
import theme from "./theme/theme.js";
import App from "./App.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import "../public/icon-font/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
