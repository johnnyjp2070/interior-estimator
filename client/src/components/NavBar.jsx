import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";

const NavBar = ({ user }) => {
  console.log(user);
  console.log(user.length);

  const handleLogout = () => {
    console.log("Logout Clicked");
    auth.logout();
    auth.getCurrentUser();
    window.location = "/login";
  };

  return (
    <header id='header' className='fixed-top'>
      <div className='container d-flex align-items-center'>
        <h1 className='logo mr-auto'>
          <Link to='/'>Interiors Estimator</Link>
        </h1>

        <nav className='nav-menu d-none d-lg-block'>
          <ul>
            <li className=''>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>

            {Object.keys(user).length === 0 ? (
              <Fragment>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link to='/initial-estimator'>Initial Estimator</Link>
                </li>
                <li>
                  <Link to='/dashboard'>{user.name}</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
