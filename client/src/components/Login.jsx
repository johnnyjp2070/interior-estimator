import React, { useState, useEffect, useRef } from "react";
import auth from "../services/authService";
import Spinner from "./Spinner";
const Login = ({ user }) => {
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const { username, password } = credential;

  const firstRender = useRef(true);

  const handleChange = (e) => {
    e.persist();
    setCredential((credential) => ({
      ...credential,
      [e.target.name]: e.target.value,
    }));
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth.login(username, password);
      setLoading(false);
      window.location = "/";
    } catch (ex) {
      setLoading(false);
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data.errors);
        setErrors({ ...errors, loginError: ex.response.data.errors });
        setTimeout(() => {
          const newError = [{ ...errors }];
          delete newError.loginError;
          setErrors(newError);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const validateUsername = () => {
      if (
        username === "" ||
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)
      ) {
        setUsernameError("Enter a valid email");
      } else {
        setUsernameError("");
      }
    };

    const validatePassword = () => {
      if (password === "") {
        setPasswordError("Please enter a valid Password");
      } else {
        setPasswordError("");
      }
    };

    validateUsername();
    validatePassword();
    return () => {
      // do something with dependency
    };
  }, [username, password]);

  return (
    <div className='contact mt-header'>
      <div className='row p-0 m-0 align-items-center justify-content-center'>
        <div className='col-md-6 mt-5 d-flex align-items-center justify-content-center flex-column'>
          <form className='php-email-form' onSubmit={doSubmit}>
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
              {usernameError && (
                <p className='alert alert-danger'> {usernameError}</p>
              )}
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
                autoComplete='on'
              />
              {passwordError && (
                <p className='alert alert-danger'> {passwordError}</p>
              )}
            </div>
            <div className='text-center'>
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            </div>
          </form>

          {loading ? (
            <Spinner></Spinner>
          ) : (
            <ul className='list-style-none mt-3'>
              {errors.loginError &&
                errors.loginError.map((error, i) => (
                  <li key={i} className='alert alert-danger'>
                    {error.msg}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
