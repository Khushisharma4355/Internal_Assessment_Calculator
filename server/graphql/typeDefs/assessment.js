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

<<<<<<< HEAD
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
    bulkEnterMarks(marks: [MarksInput!]!): ResponseMessage!
=======
  extend type Query {
    getStudentAssessment(registrationNo: BigInt!): [Assessment]
  }

  extend type Mutation {
    bulkEnterMarks(marks: [MarksInput!]!): ResponseMessage
>>>>>>> d9ec1fac727b6d87b731acce07ec22df71d6758e
    enterMarks(
      registrationNo: BigInt!
      subjectCode: String!
      marks: Int!
      markType: String!
<<<<<<< HEAD
    ): ResponseMessage!
    sendReport(parentPhone: String!, message: String!): SendReportResponse!
  }
`;

export default assessmentTypeDef;
=======
    ): ResponseMessage
  }
`;

export default assessmentTypeDef;
>>>>>>> d9ec1fac727b6d87b731acce07ec22df71d6758e
