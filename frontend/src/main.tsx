import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { MainContextProvider } from "./context/main.context";
import { createRoot } from "react-dom/client";
import { client } from "./lib/apolloClient";
import Routes from "./routes/routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MainContextProvider>
          <Routes />
        </MainContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
