// import { gql   } from "@apollo/client";

// export const CHECK_EMAIL=gql`
// query checkEmail($email:String){
// checkEmail(email:$email)
// }
// `;


// import { gql } from "@apollo/client";

// export const CHECK_EMAIL = gql`
//   query checkEmail($email: String!, $role: String!) {
//     checkEmail(email: $email, role: $role)
    
//   }
// `;

import { gql } from "@apollo/client";

export const CHECK_EMAIL = gql`
  query checkEmail($email: String!, $role: String!) {
    checkEmail(email: $email, role: $role) {
      success
      message
    }
  }
`;
