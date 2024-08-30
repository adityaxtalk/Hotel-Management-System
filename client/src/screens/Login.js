import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const navigate = useNavigate();
    const login = async () => {
        const user = {email, password};

        try {
            setLoading(true);
            const result = (await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, user)).data;
            setLoading(false);
            localStorage.setItem("currentUser", JSON.stringify(result));
            navigate('/home');
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }
  return (
    <Row className='justify-content-center mt-5'>
        <Col md={5} className="login">
          {loading && <Loader/>}
          {error && <Error message="invalid credentials"/>}
          <h1 className='text-center'>Login</h1>
          <Form.Control type="email" placeholder='Enter mail' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <Button variant='secondary' onClick={login}>Login</Button>  
        </Col> 
    </Row>
  )
}

export default Login;