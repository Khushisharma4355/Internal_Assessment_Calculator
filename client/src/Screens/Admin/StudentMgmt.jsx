import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import {Table, Alert} from "react-bootstrap"
const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    students {
      student_name
      student_email
      courseId
      registrationNo
      course {
        courseName
      }
    }
  }
`;

export const StudentMgmt = () => {
  const { loading, error, data } = useQuery(GET_ALL_STUDENTS);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading students: {error.message}
      </Alert>
    );
  }

  const StudentsData = data.students;

  return (
    <>
      <AdminNav />
      <Container className="mt-4">
        <h1 className="mb-4">Student Management</h1>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Registration Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {StudentsData.map((student, idx) => (
              <tr key={idx}>
                <td>{student.registrationNo}</td>
                <td>{student.student_name ?? "N/A"}</td>
                <td>{student.student_email ?? "N/A"}</td>
                <td>{student.course?.courseName ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
