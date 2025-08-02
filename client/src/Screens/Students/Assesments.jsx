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
                    {/* Row for Logo and Hamburger (on small screens only) */}
                    <Row className="d-md-none align-items-center shadow-sm px-3 py-2">
                        {/* Logo on the left */}
                        <Col xs="auto" className="d-flex align-items-center">
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
                        </Col>

                        {/* Hamburger on the right */}
                        <Col className="d-flex justify-content-end">
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
                    </Row>

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


