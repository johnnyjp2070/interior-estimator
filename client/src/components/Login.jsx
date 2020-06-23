import React, { useState, useEffect } from "react";
import auth from "../services/authService";

const Login = ({ user }) => {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  //   const [password, setPassword] = useState("");
  const { username, password } = credential;

  const handleChange = (e) => {
    e.persist();
    setCredential((credential) => ({
      ...credential,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.login(username, password);
    window.location = "/";
  };

  //   useEffect(() => {
  //     console.log(user);
  //     if (Object.keys(user).length === 0) {
  //       window.location = "/";
  //     }
  //   });

  return (
    <div className='contact mt-header'>
      <div className='row p-0 m-0 align-items-center justify-content-center'>
        <div className='col-md-6 mt-5 d-flex align-items-center justify-content-center'>
          <form className='php-email-form' onSubmit={(e) => handleSubmit(e)}>
            <p></p>
            <div className='form-group'>
              <label htmlFor='username'>Your Email</label>
              <input
                type='email'
                className='form-control'
                name='username'
                id='username'
                onChange={(e) => handleChange(e)}
                value={username}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                id='password'
                onChange={(e) => handleChange(e)}
                value={password}
              />
            </div>
            <div className='text-center'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
