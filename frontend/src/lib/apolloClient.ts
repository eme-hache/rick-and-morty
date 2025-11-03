import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

console.log(import.meta.env.VITE_BACKEND_URL);

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
