import { gql } from "graphql-tag";

const adminTypeDef = gql`
  type Admin {
    emp_id: String!
    teacher: Teacher
    teacherCount:Int
    studentCount:Int
    courseCount:Int
  }
  extend type Query {
    getAdmin(emp_id: String!): Admin
  }
  extend type Mutation{
   addAdmin(
    emp_id:String!
   ):Admin
  }
  
`;

export default adminTypeDef;