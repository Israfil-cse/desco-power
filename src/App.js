import { createContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Home from './Components/Home/Home';

export const billContext = createContext()
export const userContext = createContext()

function App() {
  const [searchResult, setSearchResult] = useState([])
  const [loggedUser, setLoggedUser] = useState({})


  useEffect(() => {
    let sessionUser = sessionStorage.getItem("user");
    let userEmail = JSON.parse(sessionUser)
    setLoggedUser(userEmail)
  }, []);

  return (
    <billContext.Provider value={[searchResult, setSearchResult]} >
      <userContext.Provider value={[loggedUser, setLoggedUser]}>
        <div className="container">
          <Router>
            <Switch>
              <PrivateRoute exact path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/home">
                <Home />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </Router>
        </div>
      </userContext.Provider>
    </billContext.Provider >
  );
}

export default App;
