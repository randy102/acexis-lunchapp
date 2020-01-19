import {gql} from "@apollo/client";

export const GET_SITES = gql`
    query{
        sites{
            _id
            name
        }
    }
`;