import { ApolloClient, InMemoryCache, ApolloLink, split, HttpLink, getMainDefinition } from '@apollo/client'
import {setContext} from "apollo-link-context";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('token') || ''
  }
}))

const linkSplit = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  httpLink
)

const link = ApolloLink.from([linkSplit, authLink, httpLink])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
})

export { client }
