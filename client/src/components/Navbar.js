import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const Navbar = () => {
  const navigate= useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const logOut = () => {
    localStorage.removeItem("currentUser");
    navigate('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <Link className="navbar-brand" to="/">
        Adi Rooms
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-5">
          {user?(
             <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                  <Link to="/profile" className="dropdown-item">Bookings</Link>
                </li>
                {user.isAdmin && (<>
                  <Link to="/admin" className="dropdown-item">Admin</Link>
                </>)}
                <li>
                  <Button variant="link" className="dropdown-item" onClick={logOut}>Logout</Button>
                </li>
              </ul>
             </div>
          ) :(
            <>
            <li className="nav-item active">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
            </>
            
          
          )}
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
