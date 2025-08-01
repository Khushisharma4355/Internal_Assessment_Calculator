import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar BigInt

  type Course {
    courseId: ID!
    courseName: String!
  }

  type Student {
    id: ID!
    name: String!
    class: String!
    courseId: String
    course: Course
    student_email: String!
  }

  type Teacher {
    emp_id: String!
    emp_name: String
    emp_email: String
    emp_phone: String
    Subjects: [TeacherSubSec]
    Subject: [Subject]
    semester: [Semester]
  }

  type TeacherSubSec {
    subjectCode: String!
    section_id: String!
  }

  type ClassInfo {
  courseId: String!
  courseName: String!
  semester_id: String    # add this line if you want to expose semester
  section_id: String!
  subjectCode: String!
  subjectName: String!
}


  type Subject {
    subjectName: String!
    course: Course
    Semester: Semester
  }

  type Semester {
    sem_id: ID!
  }

  type Section {
    section_id: String!
    section_name: String!
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
    emp_id: String
    student: Student
    teacher: Teacher
  }

  type ResponseMessage {
    success: Boolean!
    message: String!
  }

  type Query {
    courses: [Course]
    semesters: [Semester]
    sections: [Section]
    getStudentsByClass(courseId: ID!, sem_id: ID!, section_id: String!): [Student]
    students: [Student]
    getTeacher(emp_id: String!): Teacher
    student(registrationNo: BigInt!): Student
    studentByEmail(student_email: String!): Student
    getCourseBySubCode(subjectCode: String!): Course
    courseById(courseId: ID!): Course
    getSubjects(emp_id: String!): [TeacherSubSec]
    subject(subjectCode: String!): Subject
    semester(subjectCode: String!): Semester
    getStudentAssessment(registrationNo: BigInt!): [Assessment]
    getTeacherClasses(emp_id: String!): [ClassInfo!]!
    checkEmail(email: String!): Boolean!
    checkTeacherEmail(email: String!): Boolean!
    checkAdminEmail(email: String!): Boolean!
  }

  input MarksInput {
    student_id: ID!
    subjectCode: String!
    marks: Int!
    markType: String!
  }

  type Mutation {
    bulkEnterMarks(marks: [MarksInput!]!): ResponseMessage
    enterMarks(
      registrationNo: ID!
      subjectCode: String!
      marks: Int!
      markType: String!
    ): ResponseMessage
  }
`;
