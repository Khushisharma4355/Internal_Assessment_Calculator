const { gql } = require('apollo-server-express');

module.exports = gql`
  type Announcement {
    id: ID!
    title: String!
    description: String!
    fileUrl: String
    uploadedBy: String!
    createdAt: String
  }

  input CreateAnnouncementInput {
    title: String!
    description: String!
    fileUrl: String
    uploadedBy: String!
  }

  type Query {
    getAllAnnouncements: [Announcement!]!
  }

  type Mutation {
    createAnnouncement(input: CreateAnnouncementInput!): Announcement
  }
`;
