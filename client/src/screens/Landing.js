import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Row className='landing'>
        <Col md={12}>
            <h1>
                AdiRooms
            </h1>
            <h3>There's only one boss. The Guest.</h3>
            <Link to="/home">
              <Button variant='secondary'>Get Started</Button>
            </Link>
        </Col>
    </Row>
  )
}

export default Landing