import { gql } from "graphql-tag";

const teacherTypeDef = gql`
  type Teacher {
    emp_id: String
    emp_name: String
    emp_email: String
    emp_phone: String
    Subjects: [TeacherSubSec]
    semester: [Semester]
  }

  type TeacherSubSec {
    subjectCode: String!
    section_id: String!
    subject: Subject
  }

  extend type Query {
    getTeacher(emp_id: ID!): Teacher
    getAllTeachers: [Teacher]
    getSubjects(emp_id: ID!): [TeacherSubSec]
    getTeacherClasses(emp_id: ID!): [ClassInfo!]!
  }
`;

export default teacherTypeDef;
