import React, { Fragment, useState, useEffect } from "react";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
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
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
