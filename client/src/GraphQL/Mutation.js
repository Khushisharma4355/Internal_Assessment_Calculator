// src/graphql/mutations.js
import { gql } from '@apollo/client';

export const UPDATE_ASSESSMENT = gql`
  mutation UpdateAssessment(
    $assmt_id: String!,
    $Class_test_1: Int,
    $Class_test_2: Int,
    $MTE: Int,
    $ETE: Int,
    $attendance: Int
  ) {
    updateAssessment(
      assmt_id: $assmt_id,
      Class_test_1: $Class_test_1,
      Class_test_2: $Class_test_2,
      MTE: $MTE,
      ETE: $ETE,
      attendance: $attendance
    ) {
      assmt_id
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
    }
    
  }
  
`;
export const SEND_LOGIN_OTP = gql`
  mutation SendLoginOtp($email: String!, $role: String!) {
    sendLoginOtp(email: $email, role: $role) {
      success
      message
    }
  }
`;


export const VERIFY_OTP = gql`
  mutation verifyLoginOtp($email: String!, $otp: String!, $role: String!) {
    verifyLoginOtp(email: $email, otp: $otp, role: $role) {
      success
      message
      token
      
    }
  }
`;

export const BULK_IMPORT_STUDENTS = gql`
  mutation BulkImportStudents($data: [StudentBulkInput!]!) {
    bulkImportStudents(data: $data) {
      success
      message
      details {
        created
        updated
        skipped
        errors {
          row
          registrationNo
          error
        }
      }
    }
  }
`;
export const BULK_IMPORT_TEACHERS = gql`
  mutation BulkImportTeachers($input: BulkImportTeachersInput!) {
    bulkImportTeachers(input: $input) {
      success
      message
      details {
        created
        updated
        skipped
        errors {
          row
          emp_id
          error
        }
      }
    }
  }
`;
export const ADD_ADMIN = gql`
  mutation AddAdmin($emp_id: String!) {
    addAdmin(emp_id: $emp_id) {
      emp_id
      emp_name
      teacher {
        emp_id
        emp_name
        emp_email
        emp_phone
      }
    }
  }
`;
export const REMOVE_ADMIN=gql`
  mutation RemoveAdmin($emp_id:String!){
     removeAdmin(emp_id: $emp_id)
  }
`