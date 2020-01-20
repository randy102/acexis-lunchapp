import {gql} from "@apollo/client";

export const GET_DISHES = gql`
    query Dishes($shop: String) {
        dishes(shop: $shop){
            _id
            name
        }
    }
`;

export const DELETE_DISH = gql`
    mutation DeleteDish($id: String!){
        deleteDish(id: $id){
            name
        }
    }
`;

export const ADD_DISH = gql`
    mutation AddDish($shop: String!, $name: String!){
        addDish(shop: $shop, name: $name){
            _id
        }
    }
`;

export const UPDATE_DISH = gql`
    mutation UpdateDish($id: String!, $name: String!){
        updateDish(id: $id, name: $name){
            name
        }
    }
`;