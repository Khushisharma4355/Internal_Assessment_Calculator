import { gql } from "graphql-tag";

const assessmentTypeDef = gql`
  type Assessment {
    assmt_id: ID!
    registrationNo: BigInt!
    subjectCode: String
    Class_test_1: Int
    Class_test_2: Int
    MTE: Int
    ETE: Int
    attendance: Int
    sem_id: ID
    emp_id: String
    student: Student
    subject: Subject
    teacher: Teacher
  }

  input MarksInput {
    registrationNo: BigInt!
    subjectCode: String!
    marks: Int!
    markType: String!
  }

  extend type Query {
    getStudentAssessment(registrationNo: BigInt!): [Assessment]
  }

  extend type Mutation {
    bulkEnterMarks(marks: [MarksInput!]!): ResponseMessage
    enterMarks(
      registrationNo: BigInt!
      subjectCode: String!
      marks: Int!
      markType: String!
    ): ResponseMessage
  }
`;

export default assessmentTypeDef;
