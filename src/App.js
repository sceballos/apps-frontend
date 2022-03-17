import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/NavBar';
import AppList from './components/home/AppList';
import Login from './components/login/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const loginCallback = useCallback((userdata) => {
    console.log(userdata);
    setLoggedIn(true);
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <MainNavBar loggedIn={loggedIn}></MainNavBar>
          <Switch>
            <Route exact path="/"> <AppList/></Route>
            <Route exact path="/login"> <Login onUserLogged={loginCallback}/> </Route>            
            <Route exact path="/create" component={null} />
            <Route exact path="/edit" component={null} />
            <Route exact path="/" component={null} />            
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;