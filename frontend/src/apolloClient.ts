import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client/core";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const graphqlUri = import.meta.env.VITE_GRAPHQL_URI;
const graphqlWs = import.meta.env.VITE_GRAPHQL_WS;

const httpLink = new HttpLink({
  uri: graphqlUri,
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
  httpLink
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
