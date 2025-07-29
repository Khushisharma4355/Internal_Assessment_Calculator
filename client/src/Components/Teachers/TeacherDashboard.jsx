import React from 'react'
import { Container,Col,Row } from 'react-bootstrap'
import { TeaNav } from './TeaNav'

export const TeacherDashboard = () => {
  return (
    <>
    <Container>
       <Row>
         <Col>
<TeaNav/>
        </Col>

        <Col>
        <h1>Welcome to the Teacher Dashboard</h1>
        </Col>
       </Row>
    </Container>
    </>
  )
}
