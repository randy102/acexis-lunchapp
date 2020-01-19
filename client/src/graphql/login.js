import {gql} from "@apollo/client";

export const USER_LOGIN = gql`
    query Login($name: String!, $password: String!){
        login(name: $name, password: $password)
    }
`;