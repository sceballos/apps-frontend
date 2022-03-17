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
import AppEdit from './components/app/edit/AppEdit'
import Login from './components/login/Login';

function App() {
  const [loggedUser, setLoggedUser] = useState();

  const loginCallback = useCallback((userdata) => {
    setLoggedUser(userdata);
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <MainNavBar loggedUser={loggedUser}></MainNavBar>
          <Switch>
            <Route exact path="/"> <AppList loggedUser={loggedUser}/> </Route>
            <Route exact path="/login"> <Login onUserLogged={loginCallback}/> </Route>            
            <Route exact path="/create" component={null} />
            <Route exact path="/edit"> <AppEdit/></Route>
            <Route exact path="/" component={null} />            
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;