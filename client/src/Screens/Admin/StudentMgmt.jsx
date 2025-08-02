import { useQuery, gql } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import {Table, Alert} from "react-bootstrap"
const GET_ALL_STUDENTS = gql`
    query GetAllStudents{
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
`
export const StudentMgmt = () => {
    const {loading,error,data}=useQuery(GET_ALL_STUDENTS)
    if(loading){
        return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    }
    if(error){
         <Alert variant="danger" className="mt-4">
                Error loading assessments: {error.message}
            </Alert>
    }
    const StudentsData=data.students;
    return(
        <>
              <h1>Student Management</h1>
            <Table striped bordered hover responsive className="mt-3">
                <thead className="table-primary">
                    <tr>
                        <th>Registration Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        {/* <th>Subjects</th>
                        <th>Subject code</th> */}

                    </tr>
                </thead>
                <tbody>
                    {StudentsData.map((student, idx) => (
                        <tr key={idx}>
                            <td>{student.registrationNo}</td>
                            <td>{student.student_name??'N/A'}</td>
                            <td>{student.student_email?? 'N/A'}</td>
                            <td>{student.course?.courseName?? 'N/A'}</td>
                            {/* Subjects (nested array) */}
                            {/* <td>
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
                            </td> */}

                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}