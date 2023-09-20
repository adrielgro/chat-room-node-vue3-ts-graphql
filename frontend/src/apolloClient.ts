import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

const graphqlUri = import.meta.env.VITE_GRAPHQL_URI;
const graphqlWs = import.meta.env.VITE_GRAPHQL_WS;

const uploadLink = createUploadLink({
  uri: graphqlUri,
  headers: {
    "keep-alive": "true",
    "Apollo-Require-Preflight": "true"
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: graphqlWs,
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  (uploadLink as unknown as ApolloLink)
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
