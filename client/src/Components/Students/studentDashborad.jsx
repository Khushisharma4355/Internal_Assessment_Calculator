

// import React, { useState } from 'react';
// import { Container, Row, Col, Card, ListGroup, Image, Navbar, Offcanvas, Button } from 'react-bootstrap';
// import student2 from '../../assets/student2.jpg';

// export const StudentDashboard = () =>{
//   const [showSidebar, setShowSidebar] = useState(false);

//   const handleClose = () => setShowSidebar(false);
//   const handleShow = () => setShowSidebar(true);

//   const student = {
//     name: "Sarita Rana",
//     email: "sarita.rana@example.com",
//     classRoll: "71",
//     universityRoll: "2024124855",
//   };

//   return (
//     <Container fluid className="p-0">
//       {/* Top Navbar for mobile */}
//       <Navbar className="d-md-none px-3 py-2" style={{ backgroundColor: '#1d3557' }}>
//         <Button variant="light" onClick={handleShow}>
//           ☰
//         </Button>
//         <Navbar.Brand className="mx-auto fw-bold text-white fs-3">Learner's Dashboard</Navbar.Brand>
//       </Navbar>

//       <Row className="g-0">
//         {/* Sidebar for desktop */}
//         <Col md={3} className="d-none d-md-block">
//           <SidebarContent />
//         </Col>

//         {/* Main Content */}
//         <Col md={9}>
//           <div style={{ backgroundColor: '#1d3557', minHeight: '100vh', padding: '2rem' }}>
//             <Card>
//               <h1 className="text-white text-center fw-bold" style={{ background: "#1d3557" }}>
//                 <strong>Student Profile</strong>
//               </h1>
//               <Card.Body>
//                 {/* Profile Picture */}

//                 <div className="d-flex justify-content-center mb-4">
//                   <Image
//                     src={student2}
//                     roundedCircle
//                     width={160}
//                     height={160}
//                     style={{ objectFit: 'cover', border: '3px solid navy ' }}
//                   />
//                 </div>

//                 {/* Profile Info */}
//                 <Row className="mb-3" style={{ color: "#1d3557" }}>
//                   <Col sm={4}><strong>Name:</strong></Col>
//                   <Col sm={8}>{student.name}</Col>
//                 </Row>
//                 <Row className="mb-3" style={{ color: "#1d3557" }}>
//                   <Col sm={4}><strong>Email:</strong></Col>
//                   <Col sm={8}>{student.email}</Col>
//                 </Row>
//                 <Row className="mb-3" style={{ color: "#1d3557" }}>
//                   <Col sm={4}><strong>Class Roll No:</strong></Col>
//                   <Col sm={8}>{student.classRoll}</Col>
//                 </Row>
//                 <Row className="mb-3" style={{ color: "#1d3557" }}>
//                   <Col sm={4}><strong>University Roll No:</strong></Col>
//                   <Col sm={8}>{student.universityRoll}</Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </div>
//         </Col>
//       </Row>

//       {/* Offcanvas Sidebar for mobile */}
//       <Offcanvas show={showSidebar} onHide={handleClose} responsive="md">
//         <Offcanvas.Header closeButton style={{ backgroundColor: '#f1c40f' }}>
//           <Offcanvas.Title>Learner's Dashboard</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body className="p-0">
//           <SidebarContent />
//         </Offcanvas.Body>
//       </Offcanvas>
//     </Container>
//   );
// };

// const SidebarContent = () => (
//   <Row >
//     <div className="h-100 d-flex flex-column align-items-center" style={{ backgroundColor: '#f1c40f', minHeight: '100vh' }}>
//     <div className="text-center py-4">
//       <img
//         src="http://192.168.1.12/images/maimt_logo.png"
//         width="100"
//         height="100"
//         alt="MAIMT Logo"
//       />
//       <h2 style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
//         <span style={{ color: 'orange' }}>Ur</span>
//         <span style={{ color: '#1d3557' }}>Level</span>
//       </h2>
//     </div>
//     <ListGroup variant="flush" className="w-100 text-center">
//       <ListGroup.Item style={navItemStyle}>📑 Assessments</ListGroup.Item>
//       <ListGroup.Item style={navItemStyle}>📋 Report Card</ListGroup.Item>
//       <ListGroup.Item style={navItemStyle}>📅 Attendance</ListGroup.Item>
//       <ListGroup.Item style={navItemStyle}>🎓 Services</ListGroup.Item>
//     </ListGroup>
//   </div>
//   </Row>
// );

// const navItemStyle = {
//   backgroundColor: '#f1c40f',
//   color: '#1d3557',
//   border: 'none',
//   padding: '1rem',
//   fontSize: '22px',
//   fontWeight: '500',
//   cursor: 'pointer',
// };






// // StudentDashboard.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import student2 from '../../assets/student2.jpg'
import { MdOutlineAssessment } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GrScorecard } from "react-icons/gr";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { Stunav } from './Stunav';
// import maimtlogo from '../../assets/maimtlogo.jpeg'


export const StudentDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const navItemStyle = {
    backgroundColor: '#1d3557',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    fontSize:"23px"
    
  };

  return (
    <Container  className="p-0">
      <Row className="min-vh-100 gap-0">
        <Col>
<Stunav/>
</Col>
        {/* Toggle button for mobile */}
        <Col xs={12} className="d-md-none px-3 py-2 d-flex justify-content-end">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.8rem',
              color: '#1d3557', // icon color
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </Col>

        {/* Sidebar (mobile toggle) */}
        {showSidebar && (
          <Col xs={12} className=" d-md-none p-0">
            <div className="text-center py-3">
              <ListGroup variant="flush" className="w-100">
                <ListGroup.Item style={navItemStyle}><MdOutlineAssessment /> Assessments</ListGroup.Item>
                <ListGroup.Item style={navItemStyle}><GrScorecard />    Report Card</ListGroup.Item>
                <ListGroup.Item style={navItemStyle}><SlCalender />     Attendance</ListGroup.Item>
                <ListGroup.Item style={navItemStyle}><MdOutlineMiscellaneousServices />      Services</ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        )}

        {/* Profile Section */}
        <Col md={9} xs={12} className="bg-white p-4">
          <Card className="shadow">
            <Card.Header className="text-center text-white" style={{ backgroundColor: '#1d3557' }}>
              <h4>Your Profile</h4>
            </Card.Header>
            <Card.Body className="text-center">
              <div
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: '120px',
                  height: '120px',
                  overflow: 'hidden',
                  border: '3px solid #1d3557',
                }}
              >
                <img
                  src={student2}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h5><strong>Name:</strong> Sarita Rana</h5>
              <p><strong>Email:</strong> saritarana@example.com</p>
              <p><strong>Class Roll No:</strong> 23</p>
              <p><strong>University Roll No:</strong> MAIMT23CS123</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
};




















