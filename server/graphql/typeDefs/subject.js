import { gql } from "graphql-tag";

const subjectTypeDef = gql`
  type Subject {
    subjectCode: String!
    subjectName: String!
    courseId: ID
    course: Course
    semester_id: ID
    Semester: Semester
  }

  extend type Query {
    subject(subjectCode: String!): Subject
  }
`;

export default subjectTypeDef;
