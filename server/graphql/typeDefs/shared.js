import { gql } from "graphql-tag";

const sharedTypeDef = gql`
  scalar BigInt

  type ResponseMessage {
    success: Boolean!
    message: String!
  }

  extend type Query {
    checkEmail(email: String!): Boolean!
    checkTeacherEmail(email: String!): Boolean!
    checkAdminEmail(email: String!): Boolean!
  }
`;

export default sharedTypeDef;
