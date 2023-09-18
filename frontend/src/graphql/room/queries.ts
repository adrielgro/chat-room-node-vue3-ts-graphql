import gql from "graphql-tag";

export const GET_ROOMS = gql`
    query GetAllRooms {
        getAllRooms {
            _id
            title
            icon
            newChannel
            createdAt
            updatedAt
        }
    }
`;

export const GET_ROOM = gql`
    query GetRoom($getRoomId: String!) {
        getRoom(id: $getRoomId) {
            _id
            title
            icon
            newChannel
            createdAt
            updatedAt
        }
    }
`;

