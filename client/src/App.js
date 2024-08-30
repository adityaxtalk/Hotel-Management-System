import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './screens/Landing';
import Booking from './screens/Booking';
import Login from "./screens/Login";
import Register from './screens/Register'; 
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";
import Home from "./screens/Home";

function App() {
  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path='/book/:roomid/:checkin/:checkout' element={<Booking/>}/>
        </Routes>
      </BrowserRouter>
    </>
    
  );
}

export default App;
