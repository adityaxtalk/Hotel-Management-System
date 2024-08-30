import React, {useState, useEffect} from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import Loader from './../../components/Loader';
import axios from 'axios';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState();

    useEffect(()=> {
        const fetchData= async () => {
            try {
                const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/rooms/getallrooms`)).data;
                setRooms(data);
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
            <h3>Rooms</h3>
            {loading && <Loader/>}
            {rooms.length && <h6>There are total {rooms.length} rooms.</h6>}
            <Table striped variant='dark' hover bordered>
               <thead>
                <tr>
                    <th>Room Id</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Rent</th>
                    <th>Capacity</th>
                    <th>Phone</th>
                </tr>
               </thead>
               <tbody>
                {rooms.length && rooms.map(room=> {
                    return (
                        <tr key={room._id}>
                            <td>{room._id}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.rentPerNight}</td>
                            <td>{room.maxCount}</td>
                            <td>{room.phoneNumber}</td>
                        </tr>
                    )
                })}
               </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default Rooms