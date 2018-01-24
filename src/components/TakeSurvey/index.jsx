import React, { Component } from 'react';

import { BeginForm } from '../BeginForm';
import { QuestionnaireContainer } from '../Questionnaire';

class TakeSurveyPage extends Component {
  state = {
    survey: null,
    crtQIdAndType: null,
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

    const { survey, crtQIdAndType } = this.state;
    const { questionaresIDsAndTypes } = survey;
    if (questionaresIDsAndTypes.length < 1) {
      throw new Error(`Survey at id ${survey.id} has no questionnaires`);
    }
    this.setState({ crtQIdAndType: questionaresIDsAndTypes[0] });
  }


  render() {
    const { match: { params: { surveyId } } } = this.props;
    const { survey, crtQIdAndType } = this.state;
    if (!survey) {
      return 'Loading...'
    }
    if (!crtQIdAndType) {
      return (
        <div>
          {survey.name}
          <BeginForm survey={survey} onSuccess={this.handleBeginFormSuccess} />
        </div>
      );
    }
    return <QuestionnaireContainer id={crtQIdAndType.id} type={crtQIdAndType.type} />;
  }
}



export { TakeSurveyPage };
