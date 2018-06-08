import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './braintree/homepage/Home';
import Downloads from './braintree/downloads/Downloads';
import Company from './braintree/company/Company';

export default () => (

<BrowserRouter>
    <Switch>
		<Route path="/" exact render={() => <Home/>}/>
		<Route path="/downloads" exact  render={() => <Downloads/>}/>
		<Route path="/company" exact  render={() => <Company/>}/>
	</Switch>
</BrowserRouter>

);