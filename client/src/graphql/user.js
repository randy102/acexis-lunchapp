import {gql} from "@apollo/client";

export const GET_USER = gql`
    query Users($site: String){
        users(site: $site){
            _id
            name
            status
            role
            site{
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($user: AddUserInput){
        addUser(user: $user){
            _id
        }
    }
`

export const DELETE_USER = gql`
    mutation DeleteUser($id: String!){
        deleteUser(id: $id){
            name
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: String!, $data: String!){
        updateUser(id:$id, data: $data){
            _id
        }
    }
`