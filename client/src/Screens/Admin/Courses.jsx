// import React from "react";
// import { AdminNav } from "../../Components/Admin/AdminNav";
// import { useQuery, gql } from "@apollo/client";
// import { Alert, Container, Row, Col, Spinner, Card } from "react-bootstrap";
// import { Navigate,useNavigate } from "react-router-dom";
// const GET_COURSES = gql`
//   query GetCourses {
//     courses {
//       courseId
//       courseName
//     }
//   }
// `;

// export const Course = () => {
//     const navigate=useNavigate()
//   const { loading, error, data } = useQuery(GET_COURSES);

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center mt-4">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <Alert variant="danger" className="mt-4">
//         Error Loading Course Data: {error.message}
//       </Alert>
//     );
//   }

//   return (
//     <div className="d-flex">
//       <div style={{ flexShrink: 0, width: "250px" }}>
//         <AdminNav />
//       </div>
//       <Container className="bg-light p-4">
//         <Row>
//           <Col className="d-flex justify-content-center mb-4">
//             <h1>Courses</h1>
//           </Col>
//         </Row>
//         <Row>
//           {data.courses.map((course) => (
//             <Col key={course.courseId} md={4} sm={6} xs={12} className="mb-4">
//               <Card  onClick={()=>{navigate(`/courses/${course.courseId}`)}}
//               className="shadow-sm">
//                 <Card.Body>
//                   <Card.Title>{course.courseName}</Card.Title>
//                   <Card.Text>
//                     <strong>ID:</strong> {course.courseId}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </div>
//   );
// };









import React from "react";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useQuery, gql } from "@apollo/client";
import { 
  Alert, 
  Container, 
  Row, 
  Col, 
  Spinner, 
  Card,
  Button,
  Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiBook, FiPlus } from "react-icons/fi";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      courseId
      courseName
    }
  }
`;

export const Course = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error Loading Courses</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <AdminNav />
      </div>
      
      <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Row className="mb-4 align-items-center">
          <Col>
            <h2 className="mb-0 d-flex align-items-center">
              <FiBook className="me-2" size={24} /> Courses
            </h2>
          </Col>
          <Col xs="auto">
            <Button 
              variant="primary" 
              onClick={() => navigate("/courses/new")}
              className="d-flex align-items-center"
            >
              <FiPlus className="me-2" /> Add Course
            </Button>
          </Col>
        </Row>

        <Row className="g-4">
          {data.courses.map((course) => (
            <Col key={course.courseId} xl={3} lg={4} md={6} sm={12}>
              <Card 
                onClick={() => navigate(`/courses/${course.courseId}`)}
                className="h-100 shadow-sm hover-shadow"
                style={{ 
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  borderLeft: "4px solid #0d6efd"
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="light" text="dark" className="fs-6">
                      #{course.courseId}
                    </Badge>
                  </div>
                  <Card.Title className="mb-3">{course.courseName}</Card.Title>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/courses/${course.courseId}`);
                    }}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {data.courses.length === 0 && (
          <Alert variant="info" className="mt-4">
            No courses available. Click "Add Course" to create one.
          </Alert>
        )}
      </Container>
    </div>
  );
};
