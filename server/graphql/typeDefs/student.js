import { gql } from "graphql-tag";

const studentTypeDef = gql`
  type Student {
    registrationNo: BigInt!
    student_name: String!
    student_email: String!
    rollno: BigInt!
    courseId: ID
    course: Course
    semester_id: Int!       # Integer type
    section_id: String
  }

  extend type Query {
    # Fetch students for a specific class assigned to a teacher
    getStudentsByClass(
      emp_id: ID!,
      courseId: ID!,
      semester_id: Int!,    # Integer type to match usage
      section_id: String!
        subjectCode: String   # Add this field

    ): [Student]

    # Fetch all students
    students: [Student]

    # Fetch a single student by registration number
    student(registrationNo: BigInt!): Student

    # Fetch a single student by email
    studentByEmail(student_email: String!): Student

    # Fetch all students assigned to a teacher
    getStudentsByTeacher(emp_id: ID!): [Student]
  }
`;

export default studentTypeDef;
