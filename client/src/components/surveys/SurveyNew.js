//getting a global component to manage both the SurveyNew and SurveyReview
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    );
  }
}

export default SurveyNew;
