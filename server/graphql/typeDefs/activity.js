import { gql } from "apollo-server-express";

const activityTypeDefs = gql`
  type Activity {
    id: ID!
    action: String!
    details: String
    emp_id: String!
    teacher: Teacher!   # relation
    createdAt: String!
    updatedAt: String!
  }

  input CreateActivityInput {
    action: String!
    details: String
    emp_id: String!
  }

  type Query {
    getActivities(limit: Int): [Activity!]!
    getTeacherActivities(emp_id: String!, limit: Int): [Activity!]!
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity!
  }
`;

export default activityTypeDefs;
