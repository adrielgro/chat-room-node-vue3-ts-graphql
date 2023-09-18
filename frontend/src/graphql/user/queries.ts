import gql from "graphql-tag";

export const GET_USERS = gql`
    query GetAllUsers {
        getAllUsers {
            _id
            username
            createdAt
            updatedAt
        }
    }
`;

export const GET_USER = gql`
    query GetUser($getUserId: String!) {
        getUser(id: $getUserId) {
            _id
            username
            createdAt
            updatedAt
        }
    }
`;

