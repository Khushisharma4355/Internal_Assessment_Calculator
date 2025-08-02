import { useQuery, gql } from "@apollo/client";
import { Spinner, Table, Alert, Container } from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";

const GET_ALL_TEACHERS = gql`
  query GetAllTeachers {
    getAllTeachers {
      emp_id
      emp_name
      emp_email
      emp_phone
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

export const TeacherMgmt = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEACHERS);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading teachers: {error.message}
      </Alert>
    );
  }

  const Teachers = data.getAllTeachers;

  return (
    <>
      <AdminNav />
      <Container className="mt-4">
        <h1 className="mb-4">Teacher Management</h1>
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {Teachers.map((Teacher, idx) => (
              <tr key={idx}>
                <td>{Teacher.emp_id}</td>
                <td>{Teacher.emp_name ?? "N/A"}</td>
                <td>{Teacher.emp_email ?? "N/A"}</td>
                <td>{Teacher.emp_phone ?? "N/A"}</td>
                <td>
                  {Teacher.Subjects && Teacher.Subjects.length > 0 ? (
                    <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                      {Teacher.Subjects.map((sub, i) => (
                        <li key={i}>
                          {sub.subjectCode} ({sub.subject?.subjectName ?? "N/A"})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};
