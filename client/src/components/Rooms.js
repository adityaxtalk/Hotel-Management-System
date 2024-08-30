import React, { useState } from 'react'
import { Row, Col, Modal, Button, Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Rooms = ({room, checkin, checkout}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <Row className='room'>
        <Col md={4}>
           <img src={room.imageUrls[0]} alt={room.name} className='smallimg'/>
        </Col>
        <Col md={8}>
          <h3>{room.name}</h3>
          <p>Capacity: {room.maxCount}</p>
          <p>Phone: {room.phoneNumber}</p>
          <p>Type: {room.type}</p>
          <div style={{float: "right"}}>
            {(checkin && checkout) && <Link to={`/book/${room._id}/${checkin}/${checkout}`}>
              <Button variant='secondary'>Book Now</Button>
            </Link>}
            <Button variant='secondary' className="ms-2" onClick={handleShow}>View Details</Button>
          </div>
        </Col>
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header>
                <Modal.Title>{room.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {room.imageUrls.map(url=> {
                        return (
                            <Carousel.Item key={url}>
                                <img className='d-block w-100 bigimg' src={url} alt={room.name}/>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
                <p>{room.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </Row>
  )
}

export default Rooms