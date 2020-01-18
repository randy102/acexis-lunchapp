import { ApolloClient, InMemoryCache, ApolloLink, split, HttpLink, getMainDefinition } from '@apollo/client'
import {setContext} from "apollo-link-context";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: localStorage.getItem('access-token') || 'eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTIxYWNmNTY0ODVjMzEzMjhjOGVjOGIiLCJuYW1lIjoicXVhbmciLCJwYXNzd29yZCI6IjEyMzQ1Iiwicm9sZSI6IkFETUlOIiwic3RhdHVzIjoiQkxPQ0tFRCIsInNpdGUiOiIxIn0.om0BL-ZgcNvykrjFotOoltAmrGY4jj3oSeotqKznmoI',
    currentsite: localStorage.getItem('currentsite') || ''
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
