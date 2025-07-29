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
export const GET_STUDENT_BY_EMAIL = gql`
  query GetStudentByEmail($student_email: String!) {
    studentByEmail(student_email: $student_email) {
      registrationNo
      name
      course {
        name
      }
    }
  }
`;
export const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      name
    }
  }
`;
