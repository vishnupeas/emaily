//getting a global component to manage both the SurveyNew and SurveyReview
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    return (
      <SurveyForm
        onSurveySubmit={values => {
          this.setState({ showFormReview: true });
        }}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;
