import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Rooms from "../components/Rooms";
import Loader from '../components/Loader';
import Error from "../components/Error";
import moment from 'moment';
import 'antd/dist/reset.css';

import { DatePicker, Space } from 'antd';
import { Container, Form, Row, Col } from 'react-bootstrap';

const {RangePicker} = DatePicker;

const Home = () => {
  const [rooms,setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [type,setType] = useState('all');


  useEffect(()=> {
     const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/rooms/getallrooms`)).data
            setRooms(data);
            setDuplicateRooms(data);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setLoading(false);
        }
     }
     fetchData();
  }, [])

  const filterByDate = dates => {
    setCheckIn(dates[0].format("DD-MM-YYYY"));
    setCheckOut(dates[1].format('DD-MM-YYYY'));
    let temp=[];
    for (const room of duplicateRooms) {
        let availability = false;
        if (room.currentBookings.length>0) {
            for (const booking of room.currentBookings) {
                if (!moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(booking.checkIn, booking.checkOut) && !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(booking.checkIn, booking.checkOut)) {
                    if (
                        dates[0].format('DD-MM-YYYY') !== booking.checkIn && dates[0].format('DD-MM-YYYY') !== booking.checkOut
                        && dates[1].format('DD-MM-YYYY') !== booking.checkIn && dates[1].format('DD-MM-YYYY')
                    ) {
                        availability = true
                    }
                }
            }
        } else {
            availability = true;
        }
        if (availability === true) {
            temp.push(room);
        }
    }
  }

  const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter(
        room=> room.name.toLowerCase().includes(search.toLowerCase())
    );
    setRooms(tempRooms);
  }

  const filterByType = (event) => {
    setType(event);

    if (event !== "all") {
        const tempRooms=duplicateRooms.filter(room=> room.type.toLowerCase() === event.toLowerCase())
        setRooms(tempRooms);
    } else {
        setRooms(duplicateRooms);
    }
  }

  return (
    <Container className='mt-2'>
        <Row>
            <Col md={4}>
                <RangePicker format="DD-MM-YYYY" onChange={filterByDate}/>
            </Col>
            <Col md={4}>
                <Form.Control value={search} onChange={(e)=> setSearch(e.target.value)} onKeyUp={filterBySearch}/>
            </Col>
            <Col md={4}>
               <Form.Select value={type} onChange={(e)=> filterByType(e.target.value)}>
                <option value="all">
                    All
                </option>
                <option value="delux">Delux</option>
                <option value="non-delux">Non-delux</option>
               </Form.Select>
            </Col>
        </Row>
        <Row className='justify-content-center mt-5'>
            {loading ? <Loader/>: (rooms.map(room=> {
                return <Col md={9} className="mt-2"><Rooms room={room} checkin={checkIn} checkout={checkOut}/></Col>
            }))}
        </Row>
    </Container>
  )
}

export default Home