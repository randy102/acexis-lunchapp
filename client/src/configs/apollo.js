import { ApolloClient, InMemoryCache, ApolloLink, split, HttpLink, getMainDefinition } from '@apollo/client'
import {setContext} from "apollo-link-context";
import { WebSocketLink } from 'apollo-link-ws';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}))

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true
  }
});

const linkSplit = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const link = ApolloLink.from([authLink,linkSplit])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export { client }
