import { gql } from "graphql-tag";
export const typeDefs = gql`
  scalar BigInt  # Custom scalar for BigInt numbers
  type Course {
    courseId: ID!
    courseName: String!
  }
  type Student {
  id: ID!
  name: String!
  classs: String!
  courseId: String
  course: Course
  student_email: String!  
}
  type Teacher {
    emp_id: String!
    emp_name: String
    emp_email:String
    emp_phone:String
    Subjects:[TeacherSubSec]
  }
    type TeacherSubSec{
    subjectCode:String!
    section_id:String!
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
    getTeacher(emp_id:String!):Teacher
    student(registrationNo: BigInt!): Student
  studentByEmail(student_email: String!): Student
    courses: [Course]
    courseById(courseId:ID!):Course
    getSubjects(emp_id:String!):[TeacherSubSec]
    getStudentAssessment(registrationNo: BigInt!): [Assessment]
  }

 
`;
