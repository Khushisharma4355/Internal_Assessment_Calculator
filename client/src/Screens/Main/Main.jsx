import { motion } from "framer-motion";
import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUserShield, 
  FaCalculator, 
  FaChartLine,
  FaBell,
  FaMobileAlt,
  FaGraduationCap,
  FaQuoteLeft
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "./MainHome.css";
import collegeImage from "../../../src/assets/dummy.jpg";
import directorImage from "../../../src/assets/director.jpeg";
import { Footer } from "../../Components/Footer/Footer";

export const MainHome = () => {
  const navigate = useNavigate();
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const data = [
    { 
      id: 1, 
      login: "Students", 
      oper: "/students/login", 
      icon: <FaUserGraduate size={50} />,
      bg: "linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)"
    },
    { 
      id: 2, 
      login: "Teachers", 
      oper: "/teachers/login", 
      icon: <FaChalkboardTeacher size={50} />,
      bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    },
    { 
      id: 3, 
      login: "Admin", 
      oper: "/admin/login", 
      icon: <FaUserShield size={50} />,
      bg: "linear-gradient(135deg, #f46b45 0%, #eea849 100%)"
    },
  ];

  const features = [
    { 
      icon: <FaCalculator size={50} className="text-primary" />, 
      title: "Instant Calculations",
      text: "UrLevel automatically computes internal assessments with precision, eliminating manual errors and saving valuable time for our faculty.",
      bg: "bg-white"
    },
    { 
      icon: <FaChartLine size={50} className="text-success" />, 
      title: "Performance Insights",
      text: "UrLevel's visual analytics help identify student strengths and weaknesses at a glance with intuitive dashboards tailored for MAIMT.",
      bg: "bg-light",
      reverse: true
    },
    { 
      icon: <FaBell size={50} className="text-warning" />, 
      title: "Real-time Updates",
      text: "UrLevel's automated notifications keep faculty and administration informed about student academic progress instantly.",
      bg: "bg-white"
    },
    { 
      icon: <FaMobileAlt size={50} className="text-info" />, 
      title: "Campus-wide Access",
      text: "UrLevel's fully responsive design works perfectly on all devices across our college campus.",
      bg: "bg-light",
      reverse: true
    },
  ];

  const testimonials = [
    {
      quote: "The UrLevel system has transformed how we handle assessments at MAIMT, bringing efficiency and transparency to our academic processes.",
      author: "Dr. Narinder Rana, Director",
      image: directorImage
    }
  ];

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

  const stats = [
    { value: "95%", label: "Reduction in calculation time with UrLevel" },
    { value: "100%", label: "Accuracy in UrLevel assessments" },
    { value: "24/7", label: "Access to UrLevel" },
    { value: "4.9/5", label: "Faculty satisfaction with UrLevel" }
  ];

  const handleClick = (oper) => {
    navigate(`${oper}`);
  };

  const scrollToLogin = () => {
    document.getElementById("login-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      {/* Hero Section with UrLevel branding */}
      <section className="hero-section py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="d-flex align-items-center mb-4">
                  <h1 className="display-4 fw-bold mb-0">
                    <span style={{ color: 'orange' }}>Ur</span>
                    <span style={{ color: '#1d3557' }}>Level</span>
                  </h1>
                </div>
                <h2 className="h3 mb-4">
                  MAIMT's Internal Assessment System
                </h2>
                <p className="lead mb-4">
                  The official assessment management platform of Maharaja Agrasen Institute of Management and Technology
                </p>
                <motion.button 
                  className="btn btn-primary btn-lg px-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToLogin}
                >
                  Get Started with UrLevel
                </motion.button>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src={collegeImage} 
                  alt="MAIMT Campus" 
                  className="img-fluid rounded shadow"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Login Cards */}
      <section id="login-section" className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center mb-4">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold mb-4">Access UrLevel</h2>
              <p className="text-muted mb-5">Select your role to login to UrLevel</p>
            </Col>
          </Row>
          <Row className="justify-content-center g-4">
            {data.map((item) => (
              <Col key={item.id} md={4} className="d-flex justify-content-center">
                <Card 
                  className="border-0 shadow-hover text-white text-center p-4 login-card"
                  style={{ 
                    background: item.bg,
                    borderRadius: "15px",
                    minHeight: "250px",
                    cursor: "pointer",
                    transition: "transform 0.3s ease"
                  }}
                  onClick={() => handleClick(item.oper)}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <div className="mb-4">
                      {item.icon}
                    </div>
                    <h3 className="mb-0">{item.login} Portal</h3>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-5">
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold">Why Choose UrLevel?</h2>
              <p className="text-muted">Discover the features that make UrLevel the perfect assessment solution</p>
            </Col>
          </Row>
          
          {features.map((feature, index) => (
            <Row key={index} className={`align-items-center mb-5 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <Col md={6} className="mb-4 mb-md-0">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`p-4 rounded ${feature.bg}`}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        {/* {feature.icon} */}
                      </div>
                      <h3 className="mb-0">{feature.title}</h3>
                    </div>
                    <p className="fs-5">{feature.text}</p>
                  </div>
                </motion.div>
              </Col>
              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className={`p-5 text-center ${feature.bg} rounded`}>
                    {feature.icon}
                  </div>
                </motion.div>
              </Col>
            </Row>
          ))}
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold">UrLevel by the Numbers</h2>
            </Col>
          </Row>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} md={3} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white bg-opacity-10 rounded"
                >
                  <h1 className="display-4 fw-bold">{stat.value}</h1>
                  <p className="mb-0">{stat.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Director's Message */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold">From Our Director</h2>
            </Col>
          </Row>
          <Row className="g-4 justify-content-center">
            {testimonials.map((testimonial, index) => (
              <Col key={index} md={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white rounded shadow-sm"
                >
                  <Row className="align-items-center">
                    <Col md={4} className="text-center mb-4 mb-md-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="img-fluid rounded-circle shadow"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={8}>
                      <div className="d-flex align-items-center mb-3">
                        <FaQuoteLeft size={24} className="text-primary me-2" />
                        <h4 className="mb-0">Director's Message</h4>
                      </div>
                      <p className="fs-5 mb-4">"{testimonial.quote}"</p>
                      <p className="text-muted mb-0">- {testimonial.author}</p>
                    </Col>
                  </Row>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Motivational Quotes */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col xs={12} className="text-center">
              <h2 className="fw-bold">Words of Wisdom</h2>
            </Col>
          </Row>
          <Row className="g-4">
            {quotes.map((quote, index) => (
              <Col key={index} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-white rounded shadow-sm h-100 text-center"
                >
                  <FaQuoteLeft size={24} className="text-primary mb-3" />
                  <p className="fs-5 mb-4 fst-italic">"{quote.text}"</p>
                  {/* <p className="text-muted mb-0">- {quote.author}</p> */}
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Ready to Experience UrLevel?</h2>
              <p className="fs-5 mb-0">MAIMT faculty, staff and students can login above to access UrLevel.</p>
            </Col>
            <Col md={4} className="text-md-end">
              <motion.button
                className="btn btn-primary btn-lg px-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToLogin}
              >
                Login to UrLevel
              </motion.button>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
    
  );
};






