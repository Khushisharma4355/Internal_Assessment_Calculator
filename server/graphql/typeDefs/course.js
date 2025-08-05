import { gql } from "graphql-tag";

const courseTypeDef = gql`
  type Course {
    courseId: ID!
    courseName: String!
  }

  type Section {
    section_id: ID!
    section_name: String!
  }

  type Semester {
    sem_id: ID!
    semesterName: String
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
