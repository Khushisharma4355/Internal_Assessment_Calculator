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
