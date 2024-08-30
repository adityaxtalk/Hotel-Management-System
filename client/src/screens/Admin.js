import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Tabs} from "antd";
import TabPane from 'antd/es/tabs/TabPane';

import Bookings from "./admin/Bookings";
import Rooms from './admin/Rooms';
import Users from './admin/Users';
import AddRoom from './admin/AddRoom';

const Admin = () => {
    const navigate= useNavigate()
    const admin=JSON.parse(localStorage.getItem("currentUser")).isAdmin;
    
    useEffect(()=> {
        if (!admin) {
            navigate("/home");
        }
    }, []);

  return (
    <Container>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Bookings" key="1"><Bookings/></TabPane>
        <TabPane tab="Rooms" key="2"><Rooms/></TabPane>
        <TabPane tab="Users" key="3"><Users/></TabPane> 
        <TabPane tab="Add Room" key="4"><AddRoom/></TabPane>
      </Tabs>
    </Container>
  )
}

export default Admin;