import React, { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import {Tag} from 'antd'
import Loader from '../../components/Loader';
import Error from '../../components/Error';
const MyBooking = ({user}) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/bookings/getbookingsbyuserid/${user._id}`)).data;
                setBookings(data);
                setLoading(false);
            } catch(error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const cancelBooking = async (bookingId, roomId) => {
        try {
            setLoading(true);
            const result= (await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bookings/cancelbooking`, {bookingId, roomId})).data;
            console.log(result);
            Swal.fire('Congrats', 'Your booking has been cancelled!', 'success').then(result=> {
                window.location.reload();
            });
            setLoading(true);
        } catch(error) {
            console.log(error);
            setError(true);
            setLoading(false);
            Swal.fire("Oops", "Something went wrong", "error");
        }
    }
  return (
    <Row className="booking">
      <h3 className="text-center">Bookings</h3>
      <Col className='mx-auto'>
        {loading && <Loader />}
        {error && <Error message="Unable to fetch the booking details"/>}
        {bookings.length ?
          bookings.map((booking) => (
            <>
              <h4>{booking.room}</h4>
              <p>
                <b>Booking Id:</b> {booking._id}
              </p>
              <p>
                <b>Check In:</b> {booking.checkIn}
              </p>
              <p>
                <b>Check Out:</b> {booking.checkOut}
              </p>
              <p>
                <b>Amount:</b> {booking.amount}
              </p>
              <p>
                <b>Status:</b>{" "}
                {booking.status === "booked" ? (
                  <Tag color="green">CONFIRMED</Tag>
                ) : (
                  <Tag color="red">CANCELLED</Tag>
                )}
              </p>
              <Button
                variant="secondary"
                className={booking.status === "cancelled" ? "d-none" : ""}
                onClick={() => cancelBooking(booking._id, booking.roomId)}
              >
                Cancel Booking
              </Button>
            </>
          )): <h2 className='text-center'>No booking found for you</h2>}
      </Col>
    </Row>
  );
}

export default MyBooking