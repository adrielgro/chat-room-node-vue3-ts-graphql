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

export const UPLOAD_FILES = gql`
    mutation UploadFiles($uploadFileInput: UploadFileInput!) {
        uploadFiles(uploadFileInput: $uploadFileInput) {
            _id
            files
            createdAt
            updatedAt
        }
    }
`;
