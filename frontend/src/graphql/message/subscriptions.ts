import gql from "graphql-tag";

export const NEW_MESSAGE = gql`
    subscription Subscription($topic: String!) {
        newMessage(topic: $topic) {
            text
            files
            isMedia
            createdAt
            user {
                _id
                username
                createdAt
            }
        }
    }
`;
