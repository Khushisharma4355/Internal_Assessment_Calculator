import { gql } from "graphql-tag";
import student from "./student.js";
import adminTypeDef from "./admin.js";
import teacher from './teacher.js';
import course from './course.js';
import subject from './subject.js';
import assessment from './assessment.js';
// import shared from './shared.js';
import department from "./department.js";
// import shared from './shared.js';
import {emailTypedefs} from "./shared.js"
// import { typeDefs } from "./checkEmail.js";

const root = gql`
  type Query
  type Mutation
`;

export default [
  root,
  student,
  teacher,
  course,
  subject,
  assessment,
  adminTypeDef,
  // shared,
  department,
  emailTypedefs
];
