import { gql   } from "@apollo/client";

export const CHECK_EMAIL=gql`
query checkEmail($email:String){
checkEmail(email:$email)
}
`;