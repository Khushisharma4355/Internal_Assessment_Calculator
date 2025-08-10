import { gql } from "graphql-tag";

const teacherTypeDef = gql`
  type Teacher {
    emp_id: String
    emp_name: String
    emp_email: String
    emp_phone: String
    Subjects: [TeacherSubSec]
    semester: [Semester]
    dep_id:Department
  }
  type ClassInfo {
    courseId: ID!
    courseName: String!
    semester_id: Int        # Change from ID to Int
    section_id: String!
    subjectCode: String!
    subjectName: String!
  }   
    
  type TeacherSubSec {
    id: ID!
    emp_id: ID!
    subjectCode: String!
    section_id: String!
    subject: Subject
  }
    type TeacherResponse {
      teacher: Teacher
      teacherCount: Int
}
  type Mutation {
    addTeacher(
      emp_id: String!
      emp_name: String!
      emp_email: String!
      emp_phone: String!
      dep_id: String!
    ): TeacherResponse
  }
  extend type Query {
    getTeacher(emp_id: ID!): Teacher
    getAllTeachers: [Teacher]
    getSubjects(emp_id: ID!): [TeacherSubSec]
    getTeacherClasses(emp_id: ID!): [ClassInfo!]!

    # Secure student fetch for assigned classes only
    getStudentsByClass(
      emp_id: ID!,
      courseId: ID!,
      semester_id: Int!,      # FIXED here
      section_id: String!
    ): [Student]
  }
`;

export default teacherTypeDef;
