import { gql } from "graphql-tag";

const studentTypeDef = gql`
  scalar BigInt  # Declare the custom scalar BigInt

  type Student {
    registrationNo: BigInt!
    student_name: String!
    student_email: String!
    rollno: BigInt
    courseId: ID
    course: Course
    semester_id: Int
    section_id: String
    subjectCode: String
    subjectName: String
    courseName: String
  }

  # Input type for bulk import
  input StudentBulkInput {
  registrationNo: BigInt!
  student_name: String!
  student_email: String!
  courseId: String!
  rollno: BigInt!
  semester_id: Int!
  section_id: String
  dep_id: String
  parent_Detail: String
}

type BulkImportResult {
  success: Boolean!
  message: String!
  details: ImportDetails!
}

type ImportDetails {
  created: Int!
  updated: Int!
  skipped: Int!
  errors: [ImportError!]
}

type ImportError {
  row: Int!
  registrationNo: BigInt!
  error: String!
}

  extend type Query {
    # Fetch students for a specific class assigned to a teacher
    getStudentsByClass(
      emp_id: ID!,
      courseId: ID!,
      semester_id: Int!,
      section_id: String!,
      subjectCode: String
    ): [Student]

    # Fetch all students
    students: [Student]
    getStudentCount:Int
    # Fetch a single student by registration number
    student(registrationNo: BigInt!): Student

    # Fetch a single student by email
    studentByEmail(student_email: String!): Student

    # Fetch all students assigned to a teacher
    getStudentsByTeacher(emp_id: ID!): [Student]
  }

  extend type Mutation {
    # Bulk import students from Excel/CSV
    bulkImportStudents(data: [StudentBulkInput!]!): BulkImportResult!
  }
`;

export default studentTypeDef;