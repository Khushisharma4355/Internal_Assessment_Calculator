import { gql } from "graphql-tag";

const studentTypeDef = gql`
  type Student {
    registrationNo: BigInt!
    student_name: String!
    student_email: String!
    rollno: BigInt!
    courseId: ID
    course: Course
    semester_id: ID
    section_id: String
  }

  extend type Query {
getStudentsByClass(
  emp_id: ID!,
  courseId: ID!,
  semester_id: ID!,
  section_id: String!
): [Student]
    students: [Student]
    student(registrationNo: BigInt!): Student
    studentByEmail(student_email: String!): Student
    getStudentsByTeacher(emp_id: ID!): [Student]
  }
`;

export default studentTypeDef;
