
import React from 'react'
import { LoginForm } from '../../Components/Login/login'
import { Container, Row, Col, Card } from 'react-bootstrap'
import maimt from '../../assets/maimtphoto.jpg'

export const StuLogin = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${maimt})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)' // Dark overlay
        }}
      ></div>

      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={8} lg={5}>
            <Card className="p-4 shadow-lg rounded-4" style={{ background: 'rgba(255,255,255,0.9)' }}>
              {/* Logo & Title */}
              <div className="text-center mb-4">
                <h1 className="fw-bold" style={{ color: '#1d3557' }}>
                  Student Login
                </h1>
                <img
                  src="http://192.168.1.12/images/maimt_logo.png"
                  width="80"
                  height="80"
                  alt="MAIMT Logo"
                  className="mb-2"
                />
                <h2
                  style={{
                    fontFamily: 'cursive',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    margin: 0
                  }}
                >
                  <span style={{ color: 'orange' }}>Ur</span>
                  <span style={{ color: '#1d3557' }}>Level</span>
                </h2>
              </div>

              {/* Login Form */}
              <LoginForm role="student" />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
