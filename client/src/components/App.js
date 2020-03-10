import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

import Error404 from "./Error404";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <>
        <div className="container">
          <BrowserRouter>
            <>
              <Switch>
                <Route exact path="/">
                  <Header />
                  <Landing />
                </Route>
                <Route exact path="/surveys">
                  <Header />
                  <Dashboard />
                </Route>
                <Route exact path="/surveys/new">
                  <Header />
                  <SurveyNew />
                </Route>
                <Route path="/api/surveys/:something1/:something2">
                  <Header />
                  <Dashboard />
                </Route>
                <Route>
                  <Error404 />
                </Route>
              </Switch>
            </>
          </BrowserRouter>
        </div>
      </>
    );
  }
}

export default connect(null, { fetchUser })(App);

/*
<BrowserRouter>
            <div>
              <Route exact path="/">
                <Header />
                <Landing />
              </Route>
              <Route exact path="/surveys">
                <Header />
                <Dashboard />
              </Route>
              <Route path="/surveys/new">
                <Header />
                <SurveyNew />
              </Route>
              <Route path="/api/surveys/:something1/:something2">
                <Header />
                <Dashboard />
              </Route>
              <Route path="*">
                <div> Error 404 </div>
              </Route>
            </div>
          </BrowserRouter>

          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
              <Route
                path="/api/surveys/:something1/:something2"
                component={Dashboard}
              />
            </div>
          </BrowserRouter>
*/
