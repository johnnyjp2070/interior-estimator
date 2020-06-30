import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Importing Components

import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import InitialEstimator from "./components/InitialEstimator";
import About from "./components/About";
import Login from "./components/Login";

// Importing Services
import auth from "./services/authService";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const user = auth.getCurrentUser();
    // console.log(user.user);
    if (user) {
      setCurrentUser(user.user);
    } else {
      setCurrentUser({});
    }
  }, []);

  return (
    <Fragment>
      <Router>
        <NavBar user={currentUser}></NavBar>

        <Switch className='mt-5'>
          <Route path='/' exact>
            <Landing></Landing>
          </Route>
          <Route path='/about' exact>
            <About></About>
          </Route>
          <Route path='/login' exact>
            {Object.keys(currentUser).length !== 0 ? (
              <Redirect to='/'></Redirect>
            ) : (
              <Login user={currentUser}></Login>
            )}
          </Route>
          <Route path='/initial-estimator' exact>
            {Object.keys(currentUser).length !== 0 ? (
              <InitialEstimator></InitialEstimator>
            ) : (
              <Redirect to='/login'></Redirect>
            )}
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
