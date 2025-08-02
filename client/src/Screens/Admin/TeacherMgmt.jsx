import { useQuery, gql } from "@apollo/client"
import { Spinner } from "react-bootstrap"
import {Table, Alert} from "react-bootstrap"

const GET_ALL_TEACHERS = gql`
    query GetAllTeachers{
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
`
export const TeacherMgmt = () => {
    const { loading, error, data } = useQuery(GET_ALL_TEACHERS)
    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    }
    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                Error loading assessments: {error.message}
            </Alert>
        );
    }
    const Teachers = data.getAllTeachers;
    return (
        <>
            <h1>Teacher Management</h1>
            <Table striped bordered hover responsive className="mt-3">
                <thead className="table-primary">
                    <tr>
                        <th>Employee id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subjects</th>
                        <th>Subject code</th>

                    </tr>
                </thead>
                <tbody>
                    {Teachers.map((Teacher, idx) => (
                        <tr key={idx}>
                            <td>{Teacher.emp_id}</td>
                            <td>{Teacher.emp_name??'N/A'}</td>
                            <td>{Teacher.emp_email ?? 'N/A'}</td>
                            <td>{Teacher.emp_phone ?? 'N/A'}</td>
                            {/* Subjects (nested array) */}
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
        </>
    )
}