import {gql} from "@apollo/client";

export const GET_CONFIG = gql`
    query{
        config{
            closeOrder
            closeConfirm
            startConfirm
        }
    }
`;

export const UPDATE_CONFIG = gql`
    mutation Update($order: String, $closeConfirm: String, $startConfirm: String){
        updateConfig(order:$order, closeConfirm: $closeConfirm, startConfirm: $startConfirm){
            closeOrder
            closeConfirm
            startConfirm
        }
    }
`