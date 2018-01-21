import React, { Component } from 'react';

import { BeginForm } from '../BeginForm';
import { Questionnaire } from '../Questionnaire';

class TakeSurveyPage extends Component {
  state = {
    survey: null,
    crtQId: null,
  }


  componentDidMount() {
    const { match } = this.props;
    const { surveyId } = match.params;

    fetch(`/api/surveys/${surveyId}`)
      .then(res => {
        if (res.ok)
          return res.json();
        throw new Error(res.statusText)
      })
      .then(survey => {
        this.setState({ survey })
      })
      .catch(e => {
        console.error('Error at fetching: ', e)
        return e;
      })
  }

  handleBeginFormSuccess = () => {
    // hide the form, show the first questionnare
    // do not use the router as the participant should not go back to the prev 

    const { survey, crtQId } = this.state;
    const { questionaresIds } = survey;
    if (questionaresIds.length < 1) {
      throw new Error(`Survey at id ${survey.id} has no questionnaires`);
    }
    this.setState({ crtQId: questionaresIds[0] });
  }


  render() {
    const { match: { params: { surveyId } } } = this.props;
    const { survey, crtQId } = this.state;
    if (!survey) {
      return 'Loading...'
    }
    if (!crtQId) {
      return (
        <div>
          {survey.name}
          <BeginForm survey={survey} onSuccess={this.handleBeginFormSuccess} />
        </div>
      );
    }
    return <Questionnaire id={crtQId} />;
  }
}



export { TakeSurveyPage };
