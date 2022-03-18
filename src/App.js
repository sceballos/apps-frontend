import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from './components/navbar/NavBar';
import AppList from './components/home/AppList';
import AppEdit from './components/app/edit/AppEdit'
import AppCreate from './components/app/create/AppCreate'
import Logout from './components/user/logout/Logout';
import UserPortal from './components/user/portal/UserPortal';

function App() {
  const [loggedUser, setLoggedUser] = useState();

  const loginCallback = useCallback((userdata) => {
    setLoggedUser(userdata);
  }, []);

  const logoutCallback = useCallback(() => {
    setLoggedUser();
  }, []);

  return (
    <div data-testid="main-app-container" className="App">
      <Router>
        <div>
          <MainNavBar loggedUser={loggedUser}></MainNavBar>
          <Switch>
            <Route exact path="/"> <AppList loggedUser={loggedUser}/> </Route>
            <Route exact path="/login"> <UserPortal onUserLogged={loginCallback} onUserCreated={loginCallback}/> </Route>
            <Route exact path="/logout"> <Logout loggedUser={loggedUser} onUserLoggedOut={logoutCallback}/> </Route>
            <Route exact path="/create"> <AppCreate loggedUser={loggedUser}/> </Route>
            <Route exact path="/edit"> <AppEdit/> </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;