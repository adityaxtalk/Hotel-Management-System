import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import axios from 'axios';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState();

    useEffect(()=> {
        const fetchData= async () => {
            try {
                const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/bookings/getallbookings`)).data;
                setBookings(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(error)
            }
        }
        fetchData();
    }, []);
  return (
    <Row>
        <Col xs={12}>
            <h3>Bookings</h3>
            {loading && <Loader/>}
            {bookings.length ? <h6>There are total {bookings.length} bookings.</h6>: ""}
            <Table striped variant='dark' hover bordered>
               <thead>
                <tr>
                    <th>Booking Id</th>
                    <th>User Id</th>
                    <th>Room</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Status</th>
                </tr>
               </thead>
               <tbody>
                {bookings.length && bookings.map(booking=> {
                    return (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.userId}</td>
                            <td>{booking.room}</td>
                            <td>{booking.checkIn}</td>
                            <td>{booking.checkOut}</td>
                            <td>{booking.status}</td>
                        </tr>
                    )
                })}
               </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default Bookings;