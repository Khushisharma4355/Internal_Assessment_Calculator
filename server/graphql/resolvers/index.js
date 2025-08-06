import student from "./student.js";
import teacher from "./teacher.js";
import course from "./course.js";
import subject from "./subject.js";
import assessment from "./assessment.js";
// import shared from "./shared.js";
import admin from "./admin.js";
import department from "./department.js";
// import shared from "./shared.js";
// import { resolvers } from "./checkEmail.js";
import {emailResolvers} from "./shared.js"
const mergeResolvers = (...resolvers) => {
  return resolvers.reduce((acc, curr) => {
    for (const key in curr) {
      if (!acc[key]) acc[key] = {};
      Object.assign(acc[key], curr[key]);
    }
    return acc;
  }, {});
};

export default mergeResolvers(
  student,
  teacher,
  course,
  subject,
  assessment,
  admin,
  shared,
  department,
  emailResolvers
);
