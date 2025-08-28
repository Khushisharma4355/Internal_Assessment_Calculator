import { motion } from "framer-motion";
import { Navbar, Nav, Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserShield, 
  FaSignInAlt,
  FaQuoteLeft
} from "react-icons/fa";
import collegeImage from "../../../src/assets/photo3.jpg";
import directorImage from "../../../src/assets/director.jpeg";
import { Footer } from "../../Components/Footer/Footer";
import "./MainHome.css";

// ✅ Features Section
const FeaturesPage = () => {
  const features = [
    {
      icon: <FaUserGraduate size={40} className="text-primary" />,
      title: "Instant Calculations",
      text: "Eliminates manual errors by auto-calculating internal assessments."
    },
    {
      icon: <FaChalkboardTeacher size={40} className="text-success" />,
      title: "Performance Insights",
      text: "Interactive analytics to track progress of students & sections."
    },
    {
      icon: <FaUserShield size={40} className="text-warning" />,
      title: "Real-time Updates",
      text: "Faculty & admins get notified instantly about updates."
    },
    {
      icon: <FaSignInAlt size={40} className="text-info" />,
      title: "Responsive Design",
      text: "Works seamlessly on mobiles, tablets, and desktops."
    }
  ];

  return (
    <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <h2 className="fw-bold text-center mb-5" style={{ color: "#1d3557" }}>Explore All Features</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col md={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-100 text-center shadow-lg border-0 rounded-4 p-3 feature-card">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.text}</p>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export const MainHome = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "95%", label: "Reduction in calculation time with UrLevel" },
    { value: "100%", label: "Accuracy in UrLevel assessments" },
    { value: "24/7", label: "Access to UrLevel" },
    { value: "4.9/5", label: "Faculty satisfaction with UrLevel" }
  ];

  const testimonial = {
    quote: "The UrLevel system has transformed how we handle assessments at MAIMT, bringing efficiency and transparency to our academic processes.",
    author: "Dr. Narinder Rana, Director",
    image: directorImage
  };

  const quotes = [
    {
      text: "Education is not just about going to school; it's about widening your knowledge and absorbing the truth about life.",
      author: "Pallavi Goswami"
    },
    {
      text: "The roots of education are bitter, but the fruit is sweet.",
      author: "Sarita Rana"
    },
    {
      text: "Learning is a treasure that will follow its owner everywhere.",
      author: "Khushi Sharma"
    }
  ];

  const handleLogin = (role) => {
    navigate(`/${role}/login`);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage" style={{ backgroundColor: "white" }}>
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-dark fixed-top shadow" style={{ backgroundColor: "#1d3557" }}>
        <Container>
          <Navbar.Brand href="#">
            <span style={{ color: "orange" }}>Ur</span>
            <span style={{ color: "white" }}>Level</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse id="nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => scrollToSection("hero-section")}>Home</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("features-section")}>Features</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("stats-section")}>Benefits</Nav.Link>
              <Nav.Link onClick={() => scrollToSection("director-section")}>About</Nav.Link>
              <Nav.Link onClick={() => navigate("/developers")}>Developers</Nav.Link>
            </Nav>
            <Dropdown as={Nav.Item}>
               <Dropdown.Toggle className="btn-lg px-4" style={{ backgroundColor: "orange", color: "white", border: "none" }}>
                      Login
                    </Dropdown.Toggle>
              {/* <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                <FaSignInAlt className="me-2" /> Login
              </Dropdown.Toggle> */}
              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item onClick={() => handleLogin("students")}>
                  <FaUserGraduate className="me-2" /> Student Portal
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogin("teachers")}>
                  <FaChalkboardTeacher className="me-2" /> Faculty Portal
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleLogin("admin")}>
                  <FaUserShield className="me-2" /> Admin Portal
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <section id="hero-section" className="hero-section py-5" style={{ paddingTop: "80px", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  <span style={{ color: "orange" }}>Ur</span>
                  <span style={{ color: "#1d3557" }}>Level</span>
                </h1>
                <h2 className="h3 mb-4 " style={{ color: "#1d3557ff" }}>MAIMT's Internal Assessment System</h2>
                <p className="lead mb-4" style={{color:"#1d3557ff"}}>
                  Streamlining academic assessments for Maharaja Agrasen Institute of Management and Technology
                </p>
                <div className="d-flex gap-3">
                  <motion.button
                    className="btn btn-lg px-4"
                    style={{ backgroundColor: "#1d3557", color: "white", border: "none" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection("features-section")}
                  >
                    Learn More
                  </motion.button>
                  {/* <Dropdown>
                    <Dropdown.Toggle className="btn-lg px-4" style={{ backgroundColor: "orange", color: "white", border: "none" }}>
                      Login
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleLogin("admin")}>Admin</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLogin("teachers")}>Faculty</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleLogin("students")}>Student</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </motion.div>
            </Col>
            {/* <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img src={collegeImage} alt="MAIMT Campus" className="img-fluid rounded-2  w-70" />
              </motion.div>
            </Col> */}
            

            <Col lg={6} className="d-flex justify-content-center align-items-center">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="w-100 text-center"
  >
    <img
      src={collegeImage}
      alt="MAIMT Campus"
     className="img-fluid rounded-4 shadow-lg mt-4"
      style={{ maxWidth: "90%", borderRadius: "20px", objectFit: "cover" }}
    />
  </motion.div>
</Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section id="features-section">
        <FeaturesPage />
      </section>

      {/* Stats */}
      <section id="stats-section" className="py-5" style={{ backgroundColor: "#1d3557", color: "white" }}>
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold">UrLevel by the Numbers</h2>
              <p className="text-white-50">Quantifying our impact on academic management</p>
            </Col>
          </Row>
          <Row className="g-4">
            {stats.map((stat, i) => (
              <Col key={i} md={3} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white bg-opacity-10 rounded h-100"
                >
                  <h1 className="display-4 fw-bold text-orange">{stat.value}</h1>
                  <p className="mb-0">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Director */}
      <section id="director-section" className="py-5" style={{ backgroundColor: "white" }}>
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold" style={{ color: "#1d3557" }}>From Our Director</h2>
              <p className="text-muted">Leadership perspective on UrLevel</p>
            </Col>
          </Row>
          <Row className="justify-content-center" >
            <Col md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{backgroundColor:"#1d3557", color:"white"}}
                className="p-4 rounded shadow-sm"
              >
                <Row className="align-items-center" >
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="img-fluid rounded-circle shadow"
                      style={{ width: "150px", height: "150px", objectFit: "cover" ,backgroundColor:"#1d3557", color:"white"}}
                    />
                  </Col>
                  <Col md={8}>
                    <div className="d-flex align-items-center mb-3">
                      <FaQuoteLeft size={24} className="text-primary me-2" />
                      <h4 className="mb-0" style={{backgroundColor:"#1d3557", color:"white"}}>Director's Message</h4>
                    </div>
                    <p className="fs-5 mb-4">"{testimonial.quote}"</p>
                    <p className=" mb-0">- {testimonial.author}</p>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quotes */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold" style={{ color: "#1d3557" }}>Words of Wisdom</h2>
              <p className="text-muted">Inspiration for academic excellence</p>
            </Col>
          </Row>
          <Row className="g-4">
            {quotes.map((q, i) => (
              <Col key={i} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column"
                >
                  <FaQuoteLeft size={24} className="text-primary mb-3" />
                  <p className="fs-5 mb-4 fst-italic flex-grow-1">"{q.text}"</p>
                
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 text-white" style={{ backgroundColor: "#1d3557" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="fw-bold mb-3">Ready to Experience UrLevel?</h2>
              <p className="fs-5 mb-0">Join MAIMT's academic community in revolutionizing assessment management.</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Dropdown>
                <Dropdown.Toggle size="lg" className="px-4" style={{ backgroundColor: "orange", border: "none" }}>
                  <FaSignInAlt className="me-2" /> Login Now
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item onClick={() => handleLogin("admin")}>
                    <FaUserShield className="me-2" /> Admin Portal
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogin("teachers")}>
                    <FaChalkboardTeacher className="me-2" /> Faculty Portal
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogin("students")}>
                    <FaUserGraduate className="me-2" /> Student Portal
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};
