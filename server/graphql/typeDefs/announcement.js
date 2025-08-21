import { gql } from "apollo-server-express";

const announcementTypeDefs = gql`

type Announcement {
  id: ID!
  title: String!
  description: String!
  type: String!
  filePath: String
  createdBy: Teacher!   
  createdAt: String!
  updatedAt: String!
}

input CreateAnnouncementInput {
  title: String!
  description: String
  type: String!
  filePath: String
  emp_id: String!   # 👈 so you can link Teacher
}

type Teacher {
  emp_id: String!
  emp_name: String!
  announcements: [Announcement!]!
}

type Query {
  getAnnouncements: [Announcement]
  announcements: [Announcement!]!
  announcement(id: ID!): Announcement
}

type Mutation {
  createAnnouncement(input: CreateAnnouncementInput!): Announcement
  updateAnnouncement(id: ID!, input: CreateAnnouncementInput!): Announcement
  deleteAnnouncement(id: ID!): Boolean
}
`;

export default announcementTypeDefs;
