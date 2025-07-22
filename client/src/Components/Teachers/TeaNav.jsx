import { Navbar, Nav, Container, NavDropdown,Dropdown } from "react-bootstrap"
import "./navbar.css"
import { Link } from "react-router-dom"
export const TeaNav = () => {
    return (
        <>
            <Navbar
                variant="dark"
                sticky="top" expand="lg" style={{
                    backgroundColor: "#1d3557"
                }} className="m-0 p-3" sticky-top>
                <Container fluid className="m-0 p-0 justify-content-start">

                    <Navbar.Brand  as={Link} to="/">
                        <img
                            src="http://192.168.1.12/images/maimt_logo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Maimt"
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '1.6rem', color: 'white' }}><span style={{color:"orange"}}>Ur</span>Level</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav " className="ms-auto" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto fw-bold fs-5">
                            <Nav.Link as={Link} to="/teachers">Home</Nav.Link>
                            <Nav.Link as={Link} to="/teachers/managestudents">Manage Students</Nav.Link>
                            <Nav.Link as={Link} to="/teachers/uploadmarks">Upload marks</Nav.Link>
                            <Nav.Link as={Link} to="/teachers/reports">Reports</Nav.Link>
                        </Nav>
                        <Nav className="fw-bold fs-5">
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}