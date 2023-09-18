import gql from "graphql-tag";

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($createMessageInput: CreateMessageInput!) {
        createMessage(createMessageInput: $createMessageInput) {
            _id
            text
            createdAt
            updatedAt
        }
    }
`;
