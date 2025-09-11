import { gql } from "graphql-tag";

const assessmentTypeDef = gql`
  type Assessment {
    assmt_id: ID!
    registrationNo: BigInt!
    subjectCode: String!
    Class_test_1: Int
    Class_test_2: Int
    MTE: Int
    ETE: Int
    attendance: Int
    semester_id: ID
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

  type StudentWithAssessments {
    registrationNo: BigInt!
    studentName: String!
    parentPhone: String
    assessments: [Assessment!]!
  }

  type SendReportResponse {
    success: Boolean!
    sid: String
    error: String
  }

  type ResponseMessage {
    success: Boolean!
    message: String!
  }

  extend type Query {
    getStudentAssessment(registrationNo: BigInt!): [Assessment!]!
    getAllStudentsWithAssessments: [StudentWithAssessments!]!
  }

  extend type Mutation {
    bulkEnterMarks(
    marks: [MarksInput!]!,
    semester_id: ID!,
    emp_id: String!,
    section_id: String!
  ): ResponseMessage!

    enterMarks(
      registrationNo: BigInt!
      subjectCode: String!
      marks: Int!
      markType: String!
    ): ResponseMessage!

    sendReport(parentPhone: String!, message: String!): SendReportResponse!
  }
`;

export default assessmentTypeDef;
