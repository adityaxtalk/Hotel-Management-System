import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/Loader';
import Error from "../components/Error";
import Swal from "sweetalert2";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
const Booking = () => {
 const {roomid, checkin, checkout} = useParams();
  
 const [room,setRoom] = useState();
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState();
 const [amount, setAmount] = useState([]);
 const checkIn = moment(checkin, "DD-MM-YYYY");
 const checkOut = moment(checkout, "DD-MM-YYYY");

 const days= moment.duration(checkOut.diff(checkIn)).asDays() + 1;
 const user = JSON.parse(localStorage.getItem('currentUser'));
 const clientKey=process.env.REACT_APP_STRIPE_KEY;

 const navigate = useNavigate();

 useEffect(()=> {
   const fetchData = async () => {
      if (!localStorage.getItem("currentUser")) {
        navigate('/login');
      }
      try {
        setLoading(true);
        const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/rooms/getroombyid/${roomid}`)).data;
        setRoom(data);
        setAmount(data.rentPerNight * days);
        setLoading(false);
    } catch(error) {
        setError(true);
        console.log(error);
        setLoading(false);
    }
   }

   fetchData();
 }, []);

 const onToken = async (token) => {
  console.log(token);
  const bookingDetails = {
    room, checkIn, checkOut, amount, days, userId: user._id, token
  } 
  try {
    setLoading(true);
    const result = (await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bookings/bookroom`, bookingDetails)).data;
    setLoading(false);
    Swal.fire('Congratulations', 'Room has been booked successfully', 'success').then(result=> {
      navigate('/profile');
    });

  } catch(error) {
    setLoading(false);
    console.log(error);
    Swal.fire('Oops', 'Something went wrong', 'error');
  }
}
  return (
    <Container className="cart mt-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <h3>{room.name}</h3>
            <img src={room.imageUrls[0]} alt={room.name} className="bigimg" />
          </Col>
          <Col md={6}>
            <div>
              <Table borderless striped >
                <thead>
                  <tr>
                    <td colSpan={2} className="text-center">
                      Booking Details
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td className='text-end'>{user.name}</td>
                  </tr>
                  <tr>
                    <td>Check-In Date</td>
                    <td className='text-end'>{checkin}</td>
                  </tr>
                  <tr>
                    <td>Check-In Date</td>
                    <td className='text-end'>{checkin}</td>
                  </tr>
                  <tr>
                    <td>Check-Out Date</td>
                    <td className='text-end'>{checkout}</td>
                  </tr>
                  <tr>
                    <td>Max Count</td>
                    <td className='text-end'>{room.maxCount}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Table borderless striped >
                <thead>
                  <tr>
                    <td colSpan={2} className="text-center">
                      Amount
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Days</td>
                    <td className='text-end'>{days}</td>
                  </tr>
                  <tr>
                    <td>Rent Per Night Charges</td>
                    <td className='text-end'>Rs. {room.rentPerNight}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td className='text-end'>Rs. {room.rentPerNight * days}</td>
                  </tr>
                  <tr>
                    <td>
                      <Button variant='link' onClick={()=> navigate('/home')}>Back To Home</Button>
                    </td>
                    <td>
                      <StripeCheckout
                        token={onToken}
                        stripeKey={clientKey}
                        currency="INR"
                        amount={amount * 100}
                      >
                        <Button variant="secondary">Pay now</Button>
                      </StripeCheckout>
                    </td>
                  </tr>
                </tbody>
              </Table>
              
            </div>
          </Col>
        </Row>
      ) : (
        <Error />
      )}
    </Container>
  );
}

export default Booking;