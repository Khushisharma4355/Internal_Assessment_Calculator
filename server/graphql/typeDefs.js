// import { gql } from "graphql-tag";

// export const typeDefs = gql`
//   scalar BigInt

//   type Course {
//     courseId: ID!
//     courseName: String!
//   }

//   type Student {
//     registrationNo: BigInt!          # Used as the unique identifier
//     student_name: String!                    # Maps to student_name in DB
//     student_email: String!
//     rollno:BigInt!
//     courseId: ID
//     course: Course
//     semester_id: ID
//     section_id: String
//   }
//     type Subject {
//     subjectCode: String!
//     subjectName: String!
//     courseId: ID
//     course: Course
//     semester_id: ID
//     Semester: Semester
//   }
    
//    type TeacherSubSec {
//     subjectCode: String!
//     section_id: String!
//     subject:Subject
//   }

//   type Teacher {
//     emp_id: String
//     emp_name: String
//     emp_email: String
//     emp_phone: String
//     Subjects: [TeacherSubSec]
//     semester: [Semester]
//   }

//   type ClassInfo {
//     courseId: ID!
//     courseName: String!
//     semester_id: ID
//     section_id: String!
//     subjectCode: String!
//     subjectName: String!
//   }

  

//   type Semester {
//     sem_id: ID!
//     semesterName: String
//   }

//   type Section {
//     section_id: ID!
//     section_name: String!
//   }

//   type Assessment {
//     assmt_id: ID!
//     registrationNo: BigInt!
//     subjectCode: String
//     Class_test_1: Int
//     Class_test_2: Int
//     MTE: Int
//     ETE: Int
//     attendance: Int
//     sem_id: ID
//     emp_id: String
//     student: Student
//     subject:Subject
//     teacher: Teacher
//   }

//   type ResponseMessage {
//     success: Boolean!
//     message: String!
//   }

  type Query{
    // courses: [Course]
    // semesters: [Semester]
    // sections: [Section]
    // getStudentsByClass(courseId: ID!, semester_id: ID!, section_id: String!): [Student]
    // students: [Student]
    // getTeacher(emp_id: ID!): Teacher
    // getAllTeachers:[Teacher]
    // student(registrationNo: BigInt!): Student
    // studentByEmail(student_email: String!): Student
    // getCourseBySubCode(subjectCode: String!): Course
    // courseById(courseId: ID!): Course
    // getSubjects(emp_id: ID!): [TeacherSubSec]
    // subject(subjectCode: String!): Subject
    // semester(subjectCode: String!): Semester
    // getStudentAssessment(registrationNo: BigInt!): [Assessment]
    // getTeacherClasses(emp_id: ID!): [ClassInfo!]!
    
    checkEmail(email: String!, role: String!): Boolean
    
    //  getStudentsByTeacher(emp_id: ID!): [Student]
  }
`;

 input MarksInput {
 registrationNo: BigInt!
   subjectCode: String!
   marks: Int!
   markType: String!
 }

  type Mutation {
  sendLoginOtp(email: String!, role: String!): ResponseMessage!
  verifyLoginOtp(email: String!, otp: String!, role: String!): AuthPayload!
    bulkEnterMarks(marks: [MarksInput!]!): ResponseMessage
    enterMarks(
      registrationNo: BigInt!
      subjectCode: String!
      marks: Int!
      markType: String!
    ): ResponseMessage
  }

type AuthPayload {
  success: Boolean!
  token: String
  message: String!
}
`;
