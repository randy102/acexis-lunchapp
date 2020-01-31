import {gql} from "@apollo/client";

export const GET_ITEMES = gql`
    query Itemes($menu: String) {
        items(menu: $menu){
            _id
            name
            shop
            total
            booked
        }
    }
`;

export const DELETE_ITEM = gql`
    mutation DeleteItem($id: String!){
        deleteItem(id: $id){
            name
        }
    }
`;

export const ADD_ITEM = gql`
    mutation AddItem($menu: String!, $name: String!, $total: Int!){
        addItem(menu: $menu, name: $name, total: $total){
            _id
        }
    }
`;

export const ADD_ITEMS_SHOP = gql`
    mutation AddItemFromShop($menu: String!, $shop: String!, $items: String!, $total: Int!){
        addItemFromShop(menu: $menu, shop: $shop, items: $items, total: $total)
    }
`

export const UPDATE_ITEM = gql`
    mutation UpdateItem($id: String!, $name: String!, $total: Int!){
        updateItem(id: $id, name: $name, total: $total)
    }
`;