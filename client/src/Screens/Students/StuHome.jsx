// // import {Navv} from "../../Components/Students/NavBar/Navbar"
// import { Row,Col,Container } from "react-bootstrap"
// import {Stunav} from "../../Components/Students/Stunav"
// import { useQuery,gql } from "@apollo/client";
// const GET_STUDENT_BY_EMAIL = gql`
//   query GetStudentByEmail($email: String!) {
//     studentByEmail(email: $email) {
//       name
//       classs
//       course {
//         name
//       }
//     }
//   }
// `;

// export const StuHome=()=>{
//      const email = 'pallvi.sharma@example.com'; 
//       const { loading, error, data } = useQuery(GET_STUDENT_BY_EMAIL, {
//     variables: { email },
//     skip: !email, // skip the query if email is null
//   });
//    if (loading) return <p>Loading...</p>;
//  if (error) {
//   console.error("GraphQL Error:", error);
//   return <p>Error fetching student data: {error.message}</p>;
// }

//   if (!data || !data.studentByEmail) return <p>Student not found.</p>;

//  const { name, classs, course } = data.studentByEmail;

//     return(
//         <>
// <Stunav/>
//         <Container className="bg-light">
//             <Row >
//           <Col className="d-flex  justify-content-center">
//         <h3>Welcome  {name}!!!</h3>
//                 </Col>
//             </Row>
//              <Row className="mt-3">
//           <Col className="text-center">
//             <p><strong>Class:</strong> {classs}</p>
//             <p><strong>Course:</strong> {course?.name}</p>
//           </Col>
//         </Row>
//         </Container>
        
//         </>
//     )
// }



import { Row, Col, Container } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";
import { useQuery, gql } from "@apollo/client";

// const GET_STUDENT_BY_EMAIL = gql`
//   query GetStudentByEmail($email: String!) {
//     studentByEmail(email: $email) {
//       registrationNo
//       name
//       classs   # keep if this is the actual field in DB, else change to class or className
//       course {
//         name
//       }
//     }
//   }
// `;

// export const StuHome = () => {
//   const email = "pallavi@example.com"; // Replace with actual logged-in user email
//   const { loading, error, data } = useQuery(GET_STUDENT_BY_EMAIL, {
//     variables: { email },
//     skip: !email,
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     console.error("GraphQL Error:", error);
//     return <p>Error fetching student data: {error.message}</p>;
//   }
//   if (!data || !data.studentByEmail) return <p>Student not found.</p>;

//   const { registrationNo, name, classs, course } = data.studentByEmail;

//   return (
//     <>
//       <Stunav />
//       <Container className="bg-light">
//         <Row>
//           <Col className="d-flex justify-content-center">
//             <h3>Welcome {name}!!!</h3>
//           </Col>
//         </Row>
//         <Row className="mt-3">
//           <Col className="text-center">
//             <p>
//               <strong>Registration No:</strong> {registrationNo}
//             </p>
//             <p>
//               <strong>Class:</strong> {classs}
//             </p>
//             <p>
//               <strong>Course:</strong> {course?.name || "N/A"}
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };


const GET_STUDENT_BY_EMAIL = gql`
  query GetStudentByEmail($student_email: String!) {
    studentByEmail(student_email: $student_email) {
      registrationNo
      name
      classs
      course {
        name
      }
    }
  }
`;

export const StuHome = () => {
  const student_email = "pallavi@example.com"; // your email here
  const { loading, error, data } = useQuery(GET_STUDENT_BY_EMAIL, {
  variables: { student_email: "pallavi@example.com" },

    skip: !student_email,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.studentByEmail) return <p>Student not found.</p>;

  const { registrationNo, name, classs, course } = data.studentByEmail;

  return (
    <>
      <Stunav />
      <Container className="bg-light">
        <Row>
          <Col className="d-flex justify-content-center">
            <h3>Welcome {name}!!!</h3>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p><strong>Registration No:</strong> {registrationNo}</p>
            <p><strong>Class:</strong> {classs ?? "N/A"}</p>
            <p><strong>Course:</strong> {course?.name ?? "N/A"}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
