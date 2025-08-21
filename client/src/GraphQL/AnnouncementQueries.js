import { gql } from "@apollo/client";

// GraphQL Mutation
export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
    }
  }
`;

// GraphQL Query
export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
    }
  }
`;
export const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id)
  }
`;

export const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: ID!, $input: CreateAnnouncementInput!) {
    updateAnnouncement(id: $id, input: $input) {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
      updatedAt
    }
  }
`;
