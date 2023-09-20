import gql from "graphql-tag";

export const GET_MESSAGES_BY_ROOM = gql`
    query GetMessagesByRoom($getMessagesByRoomId: String!) {
        getMessagesByRoom(id: $getMessagesByRoomId) {
            _id
            text
            files
            isMedia
            createdAt
            user {
                _id
                username
            }
        }
    }
`;
