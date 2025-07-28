// import { Navbar, Nav, Container, NavDropdown,Dropdown } from "react-bootstrap"
// import "./navbar.css"
// import { Link } from "react-router-dom"
// export const Stunav = () => {
//     return (
//         <>
//             <Navbar
//                 variant="dark"
//                 sticky="top" expand="lg" style={{
//                     backgroundColor: "#1d3557"
//                 }} className="m-0 p-3" sticky-top>
//                 <Container fluid className="m-0 p-0 justify-content-start">

//                     <Navbar.Brand as={Link} to="/">
//                         <img
//                             src="http://192.168.1.12/images/maimt_logo.png"
//                             width="40"
//                             height="40"
//                             className="d-inline-block align-top"
//                             alt="Maimt"
//                         />
//                         <span style={{ fontWeight: 'bold', fontSize: '1.6rem', color: 'white' }}><span style={{color:"orange"}}>Ur</span>Level</span>
//                     </Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav " className="ms-auto" />
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="me-auto fw-bold fs-5">
//                             <Nav.Link as={Link} to="/students/">Home</Nav.Link>
//                             <Nav.Link as={Link} to="/students/assesments">Assesments</Nav.Link>
//                             <Nav.Link as={Link} to="/students/reports">Report</Nav.Link>
//                         </Nav>
//                         <Nav className="fw-bold fs-5">
//                             <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </>
//     )
// }
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sidebar.css"; // Create/Use a CSS file for sidebar styles
import { MdOutlineAssessment } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GrScorecard } from "react-icons/gr";


export const Stunav = () => {
  return (
    <div className="sidebar d-flex flex-column p-3 text-white " style={{ width: "250px", height: "100vh", position: "fixed", top: 0, left: 0, backgroundColor: "#1d3557" }}>
      <div className="d-flex align-items-center mb-4">
        <img
          src="http://192.168.1.12/images/maimt_logo.png"
          width="40"
          height="40"
          className="me-2"
          alt="Maimt"
        />
        <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          <span style={{ color: "orange" }}>Ur</span>Level
        </span>
      </div>

      <Nav className="flex-column fw-bold fs-5">
        <Nav.Link as={Link} to="/students/" className="text-white">Home</Nav.Link>
        <Nav.Link as={Link} to="/students/assesments" className="text-white"><MdOutlineAssessment /> Assesments</Nav.Link>
        <Nav.Link as={Link} to="/students/reports" className="text-white"><GrScorecard /> Report</Nav.Link>
        <Nav.Link as={Link} to="/students/attendance" className="text-white"><SlCalender />Attendance</Nav.Link>
        <Nav.Link as={Link} to="/student/logout" className="text-white">Log out</Nav.Link>
      </Nav>
    </div>
  );
};
