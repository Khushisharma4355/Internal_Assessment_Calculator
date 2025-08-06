import { gql } from "graphql-tag";

const studentTypeDef = gql`
<<<<<<< HEAD
  scalar BigInt  # Declare the custom scalar BigInt

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

=======
 type Student {
  registrationNo: BigInt!
  student_name: String!
  student_email: String!
  rollno: BigInt
  courseId: ID
  course: Course
  semester_id: Int
  section_id: String
  subjectCode: String      # <- Add this
  subjectName: String      # <- Add this
  courseName: String       # <- Add this
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
>>>>>>> f4611fcc04e7c72e72ba824c196f50748e6bf8ba
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
