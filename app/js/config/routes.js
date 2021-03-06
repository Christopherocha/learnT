// Include the React library
import React from "react";

// Include the react-router module along with...
// the Route component for displaying individual routes
// the Router component to contain all our Routes
// the hashHistory prop to handle routing client side without a server
// the IndexRoute (catch-all route)
//import router, {Route, Router, hashHistory, IndexRoute} from "react-router";

import { Router, Route, Switch, hashHistory, IndexRoute, browserHistory } from 'react-router'


// import {router from 'react-router';

// const Route = router.Route;
// const Router = router.Router;
// const hashHistory = router.hashHistory;
// const IndexRoute = router.IndexRoute;


// Reference the high-level components
import Main from "../components/Main";
import Profile from "../components/Profile";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ViewProfile from "../components/children/ViewProfile";
import EditProfile from "../components/children/EditProfile";

// Export the Routes
export default (

  // The high level component is the Router component
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
    	<Route path="/profile" component={Profile}>
        <Route path="/view" component={ViewProfile}></Route>
        <Route path="/edit" component={EditProfile}></Route>
        <IndexRoute component={ViewProfile}/>
      </Route>
    	<Route path="/home" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>

      
    	<IndexRoute component={Home} />
    </Route>
  </Router>

);
