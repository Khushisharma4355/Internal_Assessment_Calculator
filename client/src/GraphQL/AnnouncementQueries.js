
import { gql } from '@apollo/client';

export const GET_ANNOUNCEMENTS = gql`
  query GetAllAnnouncements {
    getAllAnnouncements {
      id
      title
      description
      fileUrl
      uploadedBy
      createdAt
    }
  }
`;

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      id
      title
      description
      fileUrl
      uploadedBy
      createdAt
    }
  }
`;
// This file contains GraphQL queries for fetching and creating announcements.