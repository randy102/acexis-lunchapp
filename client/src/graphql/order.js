import {gql} from "@apollo/client";

export const GET_ORDERS = gql`
    query {
        orders{
            _id
            item
            user
            site
            confirmed
            note
            quantity
            created_date
        }
    }
`;

export const GET_USER_ORDERS = gql`
    query OrderOfUser($date: String){
        orderOfUser(date: $date){
            _id
            item
            note
            quantity
            confirmed
            created_date
        }
    }
`;

export const DELETE_ORDER = gql`
    mutation DeleteOrder($id: String!){
        deleteOrder(id: $id)
    }
`;

export const ADD_ORDER = gql`
    mutation AddOrder($user: String!, $quantity: Int!, $item: String!, $note: String!){
        addOrder(user: $user, quantity: $quantity, item: $item, note: $note)
    }
`;

export const UPDATE_ORDER = gql`
    mutation UpdateOrder($id: String!, $name: String!){
        updateOrder(id: $id, name: $name){
            name
        }
    }
`;