import { ApolloClient, InMemoryCache, ApolloLink, split, HttpLink, getMainDefinition } from '@apollo/client'
import {setContext} from "apollo-link-context";
import { WebSocketLink } from 'apollo-link-ws';

const httpUri = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const wsUri = process.env.REACT_APP_SUBSCRIPTION_ENDPOINT;

const httpLink = new HttpLink({
  uri:   httpUri || "https://lun-app-randy102.herokuapp.com/graphql"
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}))

const wsLink = new WebSocketLink({
  uri:  wsUri || "wss://lun-app-randy102.herokuapp.com/graphql",
  options: {
    reconnect: true,
    reconnectionAttempts: 3,
    connectionParams: () =>({
      authorization: localStorage.getItem('token') || ''
    })
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
