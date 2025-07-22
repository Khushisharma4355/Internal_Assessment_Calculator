// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import {Stunav} from "../../Components/Students/Stunav"
import { useQuery,gql } from "@apollo/client";
const GET_STUDENT_BY_EMAIL = gql`
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

export const StuHome=()=>{
     const email = 'pallvi.sharma@example.com'; 
      const { loading, error, data } = useQuery(GET_STUDENT_BY_EMAIL, {
    variables: { email },
    skip: !email, // skip the query if email is null
  });
   if (loading) return <p>Loading...</p>;
 if (error) {
  console.error("GraphQL Error:", error);
  return <p>Error fetching student data: {error.message}</p>;
}

  if (!data || !data.studentByEmail) return <p>Student not found.</p>;

 const { name, classs, course } = data.studentByEmail;

    return(
        <>
<Stunav/>
        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
        <h3>Welcome  {name}!!!</h3>
                </Col>
            </Row>
             <Row className="mt-3">
          <Col className="text-center">
            <p><strong>Class:</strong> {classs}</p>
            <p><strong>Course:</strong> {course?.name}</p>
          </Col>
        </Row>
        </Container>
        </>
    )
}

