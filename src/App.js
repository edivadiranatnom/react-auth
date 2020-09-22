import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Account from "./components/pages/Account";
import UserContext from './context/UserContext';
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedin = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      )
      if (tokenRes.data) {
        const userRes = await Axios.get(
          "http://localhost:5000/users/",
          { headers: { "x-auth-token": token } }
        )
        setUserData({
          token,
          user: userRes.data
        })
      }
    }

    checkLoggedin();
  }, [])

  return (
    <>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/register" component={Register} ></Route>
            <Route exact path="/login" component={Login} ></Route>
            <Route exact path="/account" component={Account} ></Route>
            <Route path="*" component={NotFound} ></Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
