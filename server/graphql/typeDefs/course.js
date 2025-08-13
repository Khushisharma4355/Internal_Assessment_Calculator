import { gql } from "graphql-tag";

const courseTypeDef = gql`
  type Course {
    courseId: ID!
    courseName: String!
    semesters: [Semester]
  }

  type Semester {
    semester_id: ID!
    semester_Name: String
    subjects: [Subject]
  }

  type Subject {
    subjectCode: String!
    subjectName: String!
  }

  type Section {
    section_id: ID!
    section_name: String!
  }

  extend type Query {
    courses: [Course]
    courseById(courseId: ID!): Course
    semesters: [Semester]
    sections: [Section]
    getCourseBySubCode(subjectCode: String!): Course
    semester(subjectCode: String!): Semester
  }
`;

export default courseTypeDef;
