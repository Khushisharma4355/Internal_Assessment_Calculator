// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_STUDENT_ASSESSMENT = gql`
  query GetStudentAssessment($registrationNo: Int!) {
    getStudentAssessment(registrationNo: $registrationNo) {
      assmt_id
      subjectCode
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
      student {
        name
        registrationNo
      }
      teacher {
        emp_id
        name
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudents {
    students {
      registrationNo
      name
      course {
        name
      }
    }
  }
`;
// export const GET_STUDENT_BY_EMAIL = gql`
//   query GetStudentByEmail($student_email: String!) {
//     studentByEmail(student_email: $student_email) {
//       registrationNo
//       name
//       course {
//         name
//       }
//     }
//   }
// `;

 export const GET_STUDENT_BY_EMAIL = gql`
  query GetStudentByEmail($email: String!) {
    studentByEmail(email: $email) {
      name
      classs
      course {
        name
      }
    }
  }
`;
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      courseId
      courseName
    }
  }
`;
export const GET_ADMIN_DATA = gql`
  query GetAdmin($empid: String!) {
    getAdmin(emp_id: $empid) {
      emp_id
      teacher {
        emp_name
        emp_email
        emp_phone
      }
      teacherCount
      studentCount
      courseCount
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartment {
      dep_id
      dept_name
    }
  }
`;