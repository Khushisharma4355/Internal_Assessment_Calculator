// src/graphql/subscriptions.js
import { gql } from '@apollo/client';

export const ASSESSMENT_UPDATED = gql`
  subscription OnAssessmentUpdated($registrationNo: BigInt!) {
    assessmentUpdated(registrationNo: $registrationNo) {
      assmt_id
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
    }
  }
`;
