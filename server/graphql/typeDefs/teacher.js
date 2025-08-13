import { gql } from "graphql-tag";

const teacherTypeDef = gql`
  type Teacher {
  emp_id: String!
  emp_name: String!
  emp_email: String!
  emp_phone: String!
  Subjects: [TeacherSubSec]
  department: Department
}

type ClassInfo {
  courseId: String!
  courseName: String
  semester_id: Int!
  semester_Name: String
  section_id: String!
  section_name: String
  subjectCode: String!
  subjectName: String
}

type TeacherSubSec {
  id: ID!
  emp_id: String!
  subjectCode: String!
  section_id: String!
  subject: Subject
  courseId: String
  semester_id: Int
}

type TeacherResponse {
  teacher: Teacher
  teacherCount: Int
}

input TeacherInput {
  emp_id: String!
  emp_name: String!
  emp_email: String!
  emp_phone: String!
  dep_id: String!
}

input BulkImportTeachersInput {
  teachers: [TeacherInput!]!
  overwrite: Boolean
}

input BulkUpdateTeachersInput {
  teachers: [TeacherInput!]!
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
  errors: [ImportError!]!
}

type ImportError {
  row: Int!
  emp_id: String
  error: String!
}

type Query {
  getTeacher(emp_id: String!): Teacher
  getAllTeachers: [Teacher]
  getSubjects(emp_id: String!): [TeacherSubSec]
  getAssessmentsByTeacher(empId: String!): [Assessment]
  getTeacherClasses(emp_id: String!): [ClassInfo!]!
  getStudentsByClass(
    emp_id: String!
    courseId: String!
    semester_id: Int!
    section_id: String!
  ): [Student]
}

type Mutation {
  bulkImportTeachers(input: BulkImportTeachersInput!): BulkImportResult!
  bulkUpdateTeachers(input: BulkUpdateTeachersInput!): BulkImportResult!
  addTeacher(
    emp_id: String!
    emp_name: String!
    emp_email: String!
    emp_phone: String!
    dep_id: String!
  ): TeacherResponse
}
`;

export default teacherTypeDef;
