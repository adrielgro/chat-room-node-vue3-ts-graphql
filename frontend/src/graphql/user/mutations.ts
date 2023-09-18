import gql from "graphql-tag";

export const CREATE_USER = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            _id
            username
            createdAt
            updatedAt
        }
    }
`;
