// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row, Col, Container, Card } from "react-bootstrap"
import { Stunav } from "../../Components/Students/Stunav"
import { Footer } from "../../Components/Footer/Footer"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Nav } from "react-bootstrap"
import { CiHome } from "react-icons/ci";
import { MdOutlineAssessment } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GrScorecard } from "react-icons/gr";

import { MdLogout } from "react-icons/md";
import "./assessment.css"
import { ViewAssessment } from "../../Components/Students/ViewAssessment"
export const Assesments = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    
      const navItemStyle = {
        backgroundColor: '#1d3557',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: 'none',
        fontSize: "23px"
      };
  return (
    <div className="d-flex flex-column min-vh-100">
   <Container fluid className="bg-light py-4">
  <Row>
     <Col md={3} className="d-none d-md-block ">
              <Stunav />
            </Col>
               {/* Hamburger for small screens */}
                    <Col xs={12} className="d-flex d-md-none justify-content-end align-items-center  shadow-sm ">
                      <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          fontSize: '1.8rem',
                          color: '#1d3557',
                          cursor: 'pointer',
                        }}
                      >
                        ☰
                      </button>
                    </Col>
                     {/* Mobile Sidebar Slide-in */}
                    <div className={`mobile-sidebar ${showSidebar ? 'show' : ''}`}>
          <div className="text-end p-3">
            <button
              onClick={() => setShowSidebar(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: 'white',
              }}
            >
              ✕
            </button>
          </div>
           <Nav className="flex-column fw-bold fs-5">
        <Nav.Link as={Link} to="/students/" className="text-white" ><CiHome />Home</Nav.Link>
        <Nav.Link as={Link} to="/students/assesments" className="text-white"><MdOutlineAssessment /> Assesments</Nav.Link>
        <Nav.Link as={Link} to="/students/reports" className="text-white"><GrScorecard /> Report</Nav.Link>
        <Nav.Link as={Link} to="/students/attendance" className="text-white"><SlCalender /> Attendance</Nav.Link>
        <Nav.Link as={Link} to="/student/logout" className="text-white"><MdLogout /> Log out</Nav.Link>
      </Nav>
        </div>
    <Col xs={12} md={9} className="d-flex justify-content-center">
      <Card className="centered-view">
        <ViewAssessment />
      </Card>
    </Col>
  </Row>
</Container>

      {/* Footer */}
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  );
};


