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
export const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    students {
      student_name
      student_email
      rollno
      registrationNo
      course {
        courseName
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

//admin home
export const GET_ADMIN_DATA = gql`
  query GetAdmin($empid: String!) {
    getAdmin(emp_id: $empid) {
      emp_id
      teacher {
        emp_name
        emp_email
        emp_phone
      }
    }
  }
`;
export const GET_COURSE_COUNT = gql`
  query GetCourseCount{
    getCourseCount
  }
`
export const GET_STUDENT_COUNT = gql`
  query GetStudentCount{
    getStudentCount
  }
  `
export const GET_TEACHER_COUNT=gql`
  query GetTeacherCount{
    getTeacherCount
  }
`
export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartment {
    dep_id
    dept_name
  }
}
`;
//teacher>>managestudents
export const GET_STUDENTS_BY_TEACHER = gql`
  query GetStudentsByTeacher($emp_id: ID!) {
  getStudentsByTeacher(emp_id: $emp_id) {
    registrationNo
    student_name
    student_email
    courseId
    courseName
    semester_id
    section_id
    subjectCode
    subjectName
  }
}
`;

//teaHome
export const GET_TEACHER = gql`
  query GetTeacher($emp_id: String!) {
  getTeacher(emp_id: $emp_id) {
    emp_name
    emp_email
  }
}
`;

export const GET_TEACHER_CLASSES = gql`
  query GetTeacherClasses($emp_id: String!) {
  getTeacherClasses(emp_id: $emp_id) {
    courseId
    courseName
    semester_id
    section_id
    subjectCode
    subjectName
  }
}
`;

export const GET_STUDENTS_BY_CLASS = gql`
  query GetStudentsByClass($emp_id: String!, $courseId: String!, $semester_id: String!, $section_id: String!) {
  getStudentsByClass(
    emp_id: $emp_id,
    courseId: $courseId,
    semester_id: $semester_id,
    section_id: $section_id
  ) {
    registrationNo
    student_name
  }
}
`;



//teacher mangement

export const GET_ALL_TEACHERS = gql`
  query GetAllTeachers {
    getAllTeachers {
      emp_id
      emp_name
      emp_email
      emp_phone
      isAdmin
      Subjects {
        section_id
        subjectCode
        subject {
          subjectName
        }
      }
    }
  }
`;

export const GET_COURSE_DETAILS = gql`
  query GetCourseDetails($courseId: ID!) {
    courseById(courseId: $courseId) {
      courseName
      semesters {
        semester_id
        semester_Name
        subjects {
          subjectCode
          subjectName
        }
      }
    }
  }
`;

export const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
    }
  }
`;

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
    }
  }
`;
export const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id)
  }
`;

export const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: ID!, $input: CreateAnnouncementInput!) {
    updateAnnouncement(id: $id, input: $input) {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
      updatedAt
    }
  }
`;