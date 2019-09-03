import { WebSocketLink } from "apollo-link-ws";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

export const createApolloClient = () => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://129.213.97.187:8080/v1/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            "x-hasura-admin-secret": "demoml_oracle"
          }
        }
      }
    }),
    cache: new InMemoryCache()
  });
};
