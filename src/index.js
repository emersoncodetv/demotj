import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import { ApolloProvider } from "react-apollo";
// Remove the apollo-boost import and change to this:
import ApolloClient from "apollo-client";
// Setup the network "links"
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
const wsurl = "ws://129.213.97.187:8080/v1/graphql";
const httpurl = "http://129.213.97.187:8080/v1/graphql";

const wsLink = new WebSocketLink({
  uri: wsurl,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "demoml_oracle"
      }
    }
  }
});
const httpLink = new HttpLink({
  uri: httpurl,

  headers: {
    "x-hasura-admin-secret": "demoml_oracle"
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
// Use the client just as before
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
