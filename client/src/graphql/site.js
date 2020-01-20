import {gql} from "@apollo/client";

export const GET_SITES = gql`
    query{
        sites{
            _id
            name
            count
        }
    }
`;

export const ADD_SITE = gql`
    mutation AddSite($name: String!){
        addSite(name: $name){
            _id
        }
    }
`;

export const DELETE_SITE = gql`
    mutation DeleteSite($id: String!){
        deleteSite(id: $id){
            name
        }
    }
`;

export const UPDATE_SITE = gql`
    mutation UpdateSite($id: String!, $name: String!){
        updateSite(id:$id, name:$name){
            name
        }
    }
`;