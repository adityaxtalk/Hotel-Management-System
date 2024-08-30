import React, {useState} from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import Error from '../components/Error';
import Success from "../components/Success";
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [success, setSuccess] = useState();

    const register = async () => {
        if (password === confirmPassword) {
            const user ={
                name, email, password, isAdmin
            }
            try{
                setLoading(true)
                const result = (await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, user)).data;
                setLoading(false);
                setSuccess(true);
                setName('');
                setEmail('');
                setPassword('');
                setIsAdmin(false);
                setConfirmPassword(''); 
            } catch(error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        } else {
            alert("Password not matched");
        }
    }
  return (
    <Row className='justify-content-center mt-5'>
      {loading && <Loader/>}
      {error && <Error/>}
      <Col md={5} className="login">
         {success && <Success message="Registeration Success"/>}
         <div>
                <h1>Register</h1>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <Form.Control type="email" placeholder='Enter mail' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <Form.Control type="password" placeholder='Re-Enter password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>    
                <Form.Check  type="checkbox" checked={isAdmin} onChange={(e)=> setIsAdmin(e.target.checked)} label='Check for Admin access'/>
                <Button variant="secondary" onClick={register}>Register</Button>
         </div>
      </Col>
    </Row>
  )
}

export default Register;