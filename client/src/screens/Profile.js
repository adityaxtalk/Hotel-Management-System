import React, { useEffect } from 'react'
import { Tabs } from 'antd';

import { useNavigate } from 'react-router-dom';
import MyBooking from './profile/MyBooking';

const {TabPane} = Tabs;


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  useEffect(()=> {
    if (!user) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='ms-3 mt-3'>
        <Tabs defaultActiveKey='1'>
            <TabPane tab="Profile" key="1">
                <h3>My Profile</h3>
                <p>
                    <b>Name:</b> {user.name}
                </p>
                <p>
                    <b>Email:</b> {user.email}
                </p>
                <p>
                    <b>isAdmin:</b> {user.isAdmin? "YES": "NO"}
                </p>
            </TabPane>
            <TabPane tab="Bookings" key="2">
                <MyBooking user={user}/>
            </TabPane>
        </Tabs>
    </div>
  )
}

export default Profile