import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Appointment from './components/appointment/appointment-container'
import Home from './components/home/home-container';

function App() {
    return (
        <BrowserRouter basename="/" className="App">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/appointment">
                    <Appointment />
                </Route>
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
