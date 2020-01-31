import {gql} from "@apollo/client";

export const GET_SHOPS= gql`
    query{
        shops{
            _id
            name
        }
    }
`;

export const GET_SHOPS_DISHES = gql`
    query{
        shops{
            _id
            name
            items
        }
    }
`

export const ADD_SHOP = gql`
    mutation AddShop($name: String!){
        addShop(name: $name){
            _id
        }
    }
`;

export const UPDATE_SHOP = gql`
    mutation UpdateShop($id: String!, $name: String!){
        updateShop(id: $id, name: $name){
            name
        }
    }
`;

export const DELETE_SHOP = gql`
    mutation DeleteShop($id: String!){
        deleteShop(id: $id){
            name
        }
    }
`;