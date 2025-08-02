import { motion } from "framer-motion";
import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import "./MainHome.css"; // For custom font import

export const MainHome = () => {
  const navigate = useNavigate();
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const data = [
    { id: 1, login: "Students", oper: "/students/login", icon: <FaUserGraduate size={40} /> },
    { id: 2, login: "Teachers", oper: "/teachers/login", icon: <FaChalkboardTeacher size={40} /> },
    { id: 3, login: "Admin", oper: "/admin/login", icon: <FaUserShield size={40} /> },
  ];

  const handleClick = (oper) => {
    navigate(`${oper}`);
  };

  return (
    <>
      <Container fluid className="bg-light py-5 min-vh-100">
        {/* Logo and Title */}
        <Row className="text-center mb-4">
          <Col>
            <img
              src="http://192.168.1.12/images/maimt_logo.png"
              width="120"
              height="120"
              alt="MAIMT Logo"
              className="mb-3"
            />
            <h1 className="main-title">
              <span style={{ color: "orange" }}>Ur</span>Level
            </h1>
          </Col>
        </Row>

        {/* Login Cards */}
        <Row className="justify-content-center gap-4">
          {data.map((item) => (
            <Col key={item.id} xs={10} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  className="text-white text-center p-4 shadow border-0"
                  style={{
                    background: "linear-gradient(135deg, #1d3557 0%, #152a47 100%)",
                    cursor: "pointer",
                    borderRadius: "1.2rem",
                    minWidth: "180px",
                  }}
                  onClick={() => handleClick(item.oper)}
                >
                  <Card.Body className="fs-4 fw-semibold">
                    <div className="mb-2">{item.icon}</div>
                    {item.login}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* About Section */}
        <Row
          ref={aboutRef}
          className="justify-content-center text-center mt-5"
        >
          <Col md={8}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="about-heading">What is UrLevel?</h2>
              <p className="about-text">
                <strong>UrLevel</strong> is a smart <em>Internal Assessment Calculator</em> 
                and <em>Communication System</em> designed to simplify the way schools and colleges 
                manage student performance. Teachers can quickly enter marks, calculate results 
                instantly, and send updates to parents through <strong>WhatsApp</strong> or <strong>SMS</strong>.
              </p>
              <p className="about-text">
                It’s user-friendly, time-saving, and ensures accurate reporting for everyone — 
                <strong>students</strong>, <strong>teachers</strong>, and <strong>parents</strong>.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
