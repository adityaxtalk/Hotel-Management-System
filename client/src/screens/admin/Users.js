import React, {useState, useEffect} from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import Loader from './../../components/Loader';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState();

    useEffect(()=> {
        const fetchData= async () => {
            try {
                const data = (await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/getallusers`)).data;
                setUsers(data);
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
            <h3>Users</h3>
            {loading && <Loader/>}
            {users.length && <h6>There are total {users.length} users.</h6>}
            <Table striped variant='dark' hover bordered>
               <thead>
                <tr>
                    <th>User Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                </tr>
               </thead>
               <tbody>
                {users.length && users.map(user=> {
                    return (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "YES" : "NO"}</td>
                        </tr>
                    )
                })}
               </tbody>
            </Table>
        </Col>
    </Row>
  )
}

export default Users