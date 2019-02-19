import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard";
import Form from "./Components/Form";
import Tweet from "./Components/Tweet";
import Query from "./Components/Query";

export default (

     <Switch>
          <Route path="/" component={Auth} exact />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/tweet/:postid" component={Tweet} />
          <Route path="/new" component={Form} />
          <Route path="/query" component={Query} />
     </Switch>

);

