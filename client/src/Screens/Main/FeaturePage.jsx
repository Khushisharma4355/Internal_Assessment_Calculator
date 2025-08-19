import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCalculator, FaChartLine, FaBell, FaMobileAlt } from "react-icons/fa";

export const FeaturesPage = () => {
  const features = [
    {
      icon: <FaCalculator size={40} className="text-primary" />,
      title: "Instant Calculations",
      text: "Eliminates manual errors by auto-calculating internal assessments."
    },
    {
      icon: <FaChartLine size={40} className="text-success" />,
      title: "Performance Insights",
      text: "Interactive analytics to track progress of students & sections."
    },
    {
      icon: <FaBell size={40} className="text-warning" />,
      title: "Real-time Updates",
      text: "Faculty & admins get notified instantly about updates."
    },
    {
      icon: <FaMobileAlt size={40} className="text-info" />,
      title: "Responsive Design",
      text: "Works seamlessly on mobiles, tablets, and desktops."
    }
  ];

  return (
    <div className="py-5" style={{ background: "linear-gradient(to right, #f8f9fa, #eef2f3)" }}>
      <Container>
        <h2 className="fw-bold text-center mb-5">Explore All Features</h2>
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
