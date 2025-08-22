import { gql } from "graphql-tag";

const adminTypeDef = gql`
  type Admin {
    emp_id: String!
    emp_name: String
    teacher: Teacher
  }
  extend type Query {
    getAdmin(emp_id: String!): Admin
    getAllAdmin: [Admin]
  }
  extend type Mutation {
    addAdmin(emp_id: String!): Admin
    removeAdmin(emp_id:String!):Boolean
  }
`;


export default adminTypeDef;