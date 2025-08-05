import { Row, Col, Container } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";
import { useQuery, gql } from "@apollo/client";
// const GET_STUDENT_BY_EMAIL = gql`
//   query GetStudentByEmail($student_email: String!) {
//     studentByEmail(student_email: $student_email) {
//       registrationNo
//       name
//       classs
//       course {
//         courseName
//       }
//     }
//   }
// `;

export const StuHome = () => {

  // const student_email = "pallavi@example.com"; // You can make this dynamic later

  // const { loading, error, data } = useQuery(GET_STUDENT_BY_EMAIL, {
  //   variables: { student_email },
  //   skip: !student_email,
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // if (!data || !data.studentByEmail) return <p>Student not found.</p>;

  // const { registrationNo, name, classs, course } = data.studentByEmail;

  return (
    <>
      <div className="d-flex">
        <div style={{flexShrink:0, width:"250px"}}>
          <Stunav/>
        </div>
      {/* <Container className="bg-light">
        <Row>
          <Col className="d-flex justify-content-center">
            <h3>Welcome {name}!!!</h3>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p><strong>Registration No:</strong> {registrationNo}</p>
            <p><strong>Class:</strong> {classs ?? "N/A"}</p>
            <p><strong>Course:</strong> {course?.courseName ?? "N/A"}</p>
          </Col>
        </Row>
      </Container> */}
      </div>
    </>
  );
};
