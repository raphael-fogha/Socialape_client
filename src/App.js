import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from 'jwt-decode'
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store'
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions'
//Pages
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import User from './pages/User'
import Navbar from './components/Layout/Navbar'
import themeObject from './util/theme';
//Material UI
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
//axios
import axios from 'axios';

const theme = createMuiTheme(themeObject);



const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 100000 < Date.now()) {
    //console.log(decodedToken);
    store.dispatch(logoutUser())
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Navbar />
              <div className="container">

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login"
                    component={Login}
                     />
                  <Route path="/signup"
                    component={SignUp}
                     />
                  <Route exact path="/user/:handle"
                    component={User}
                     />
                     <Route exact path="/user/:handle/scream/:screamId"
                      component={User}/>
                </Switch>
              </div>

            </Router>
        </Provider>
      </MuiThemeProvider>

    );
  }
}

export default App;
