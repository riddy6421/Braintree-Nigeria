import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './braintree/homepage/Home';
import Downloads from './braintree/downloads/Downloads';
import Company from './braintree/company/Company';
import GetStarted from './braintree/GetStarted/GetStarted';
import Matimatiks from './Matimatiks/homepage/Homepage';
import Mode from './Matimatiks/Mode/Mode';

export default () => (

<BrowserRouter>
    <Switch>
		<Route path="/" exact render={() => <Home/>}/>
		<Route path="/downloads" exact  render={() => <Downloads/>}/>
		<Route path="/company" exact  render={() => <Company/>}/>
		<Route path="/getStarted" exact  render={() => <GetStarted/>}/>
		<Route path="/Matimatiks" exact  render={() => <Matimatiks/>}/>
		<Route path="/Matimatiks/mode" exact  render={() => <Mode/>}/>
	</Switch>
</BrowserRouter>

);