import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Stunav } from '../../Components/Students/Stunav'
export const Attendance = () => {
  return (
    <Container className="bg-light">

                <Row >
                    <Col>
                        <Stunav />
                    </Col>
                    <Col className="d-flex  justify-content-center">
                        <h3>DON'T TAKE MUCH LEAVES</h3>
                    </Col>
                </Row>
            </Container>
    
  )
}
