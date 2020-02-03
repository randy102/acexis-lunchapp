import { gql } from "@apollo/client";

export const ADD_MENU = gql`
    mutation AddMenu($name: String!, $site: String!, $status: MenuStatus!) {
        addMenu(name: $name, site: $site, status: $status) {
            _id
        }
    }
`;
export const GET_MENUS = gql`
    query Menus($site: String!) {
        menus(site: $site) {
            _id
            site {
                _id
                name
            }
            name
            status
            created_date
        }
    }
`;

export const GET_USER_MENU = gql`
    query {
        userMenu {
            _id
            name
            booked
            total
        }
    }
`;

export const DELETE_MENU = gql`
    mutation DeleteMenu($id: String!) {
        deleteMenu(id: $id) {
            name
        }
    }
`;

export const UPDATE_MENU = gql`
    mutation UpdateMenu($id: String!, $status: MenuStatus!, $name: String!) {
        updateMenu(id: $id, status: $status, name: $name) {
            _id
        }
    }
`;

export const MENU_PUBLISHED_SUBS = gql`
    subscription Menu($site: String){
        menuPublished(site: $site){
            _id
        }
    }
`