import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

// import Error404 from "./Error404";
import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2> Dashboard </h2>;
const SurveyNew = () => <h2> SurvayNew </h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
            </div>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { fetchUser }
)(App);
//<Route path="/" component={Error404} />
