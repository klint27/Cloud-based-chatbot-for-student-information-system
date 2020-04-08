import React from 'react';
import {BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";
import Landing from "./pages/Landing";
import Majors from "./pages/Majors";
import CourseCatalog from "./pages/CourseCatalog";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Chatbot from "./chatbot/Chatbot";
import PrivateRoute from "../components/private-route/PrivateRoute";
import Header from "./Header";
import './style_css.css'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

    }
}

const App = () => {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App appBody">
                        <Chatbot/>
                        <Switch>
                            <Route exact path="/Login" component={Login}/>
                            <Header/>
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/Dashboard" component={Dashboard}/>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/Majors" component={Majors}/>
                            <Route exact path="/CourseCatalog" component={CourseCatalog}/>
                            <Route exact path="/Events" component={Events}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
};

export default App;