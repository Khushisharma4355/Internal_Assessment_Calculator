import { gql } from "graphql-tag";
export const typeDefs = gql`
  scalar BigInt  # Custom scalar for BigInt numbers
  type Course {
    id: ID!
    name: String!
  }
  type Student {
  id: ID!
  name: String!
  classs: String!
  courseId: Int
  course: Course
  student_email: String!  
}
  type Teacher {
    emp_id: String!
    name: String
  }
  type Assessment {
    assmt_id: String!
    registrationNo: BigInt!
    subjectCode: String
    Class_test_1: Int
    Class_test_2: Int
    MTE: Int
    ETE: Int
    attendance: Int
    sem_id: Int
    emp_id: String              # Teacher's emp_id for foreign key consistency
    student: Student
    teacher: Teacher
  }
  type Query {
    students: [Student]
    student(registrationNo: BigInt!): Student
  studentByEmail(student_email: String!): Student
    courses: [Course]
    courseById(courseId:Int!):Course
    getStudentAssessment(registrationNo: BigInt!): [Assessment]
  }
`;
