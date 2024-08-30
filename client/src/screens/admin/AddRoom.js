import React, { useState } from 'react'
import Swal from "sweetalert2";
import {useNavigate} from 'react-router-dom';
import { Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import Loader from "./../../components/Loader";
import axios from 'axios';

const AddRoom = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const [rentPerNight, setRentPerNight] = useState();
    const [maxCount, setMaxCount] = useState();
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [type, setType] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();

    const navigate = useNavigate();
    const addRoom = async () => {
        const newRoom = {name, rentPerNight, maxCount, description, phoneNumber, type, imageUrls: [image1, image2, image3]};
        try {
            setLoading(true);
            const result = (await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/rooms/addroom`, newRoom)).data;
            console.log(result);
            setLoading(false);
            Swal.fire('Congrats', 'Room added Successfully', 'success').then(result=> navigate('/home'));
        } catch (error) {
            console.error(error);
            setLoading(false);
            Swal.fire("Oops", 'Something went wrong', 'error');
        }
    }
  return (
    <Row>
        <h3>Add Room</h3>
        {loading && <Loader/>}
        <Col xs={12} md={5}>
           <FloatingLabel className='mb-3' controlId='room-name' label="Please enter room name">
                <Form.Control placeholder='Please enter room name' value={name} onChange={(e)=> setName(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='room-rent' label="Please enter charge of room per night">
                <Form.Control placeholder='Please enter rent per night' type="number" value={rentPerNight} onChange={(e)=> setRentPerNight(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='max-Count' label="Please enter maximum capacity of room">
                <Form.Control placeholder='Please enter max capacity' value={maxCount} type="number" onChange={(e)=> setMaxCount(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='room-description' label="Please enter room description">
                <Form.Control placeholder='Please enter room description' value={description} onChange={(e)=> setDescription(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='phone-number' label="Please enter contact number">
                <Form.Control placeholder='Please enter phone number' value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
           </FloatingLabel>           
        </Col>
        <Col xs={12} md={6}>
            <FloatingLabel className='mb-3' controlId='room-type' label="Please enter room type">
                <Form.Control placeholder='Please enter room type' value={type} onChange={(e)=> setType(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='room-image-url-1' label="Please enter image url">
                <Form.Control placeholder='Please enter Image Url 1' value={image1} onChange={(e)=> setImage1(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='room-image-url-2' label="Please enter image url">
                <Form.Control placeholder='Please enter Image Url 2' value={image2} onChange={(e)=> setImage2(e.target.value)}/>
           </FloatingLabel>
           <FloatingLabel className='mb-3' controlId='room-image-url-3' label="Please enter image url">
                <Form.Control placeholder='Please enter Image Url 3' value={image3} onChange={(e)=> setImage3(e.target.value)}/>
           </FloatingLabel>
           <Button variant='secondary'onClick={addRoom} className='add-room'>Add Room</Button>
        </Col>
    </Row>
  )
}

export default AddRoom;