import React, { Component } from 'react';

import { BeginForm } from '../BeginForm';
import { QuestionnaireContainer } from '../Questionnaire';
import { getToken, clearSession } from '../../utils/auth';

class TakeSurveyPage extends Component {
  qsResults = [];
  state = {
    survey: null,
    crtQIdAndTypeIndex: -1,
    surveyCompleted: false,
  }

  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { surveyId } = match.params;

    fetch(`/api/surveys/${surveyId}/take-shape`)
      .then(res => {
        if (res.ok)
          return res.json();
        throw new Error(res.statusText)
      })
      .then(survey => {
        // check if there is a participant already and skip the begin form
        const token = getToken();
        if (token) {
          const { questionaresIDsAndTypes } = survey;
          if (questionaresIDsAndTypes.length < 1) {
            throw new Error(`Survey at id ${survey.id} has no questionnaires`);
          }
          this.setState({
            survey,
            crtQIdAndTypeIndex: 0 // dev stuff
          });
        } else {
          this.setState({ survey });
        }

      })
      .catch(e => {
        console.error('Error at fetching: ', e)
        return e;
      })
  }

  handleBeginFormSuccess = () => {
    // hide the form, show the first questionnare
    // do not use the router as the participant should not go back to the prev 

    const { survey, crtQIdAndTypeIndex } = this.state;
    const { questionaresIDsAndTypes } = survey;
    if (questionaresIDsAndTypes.length < 1) {
      throw new Error(`Survey at id ${survey.id} has no questionnaires`);
    }
    this.setState({ crtQIdAndTypeIndex: 0 });
  }

  handleNext(answersInfo, isFake) {
    if (answersInfo) { // should work on params
      this.qsResults = this.qsResults.concat(answersInfo);
    }

    // set the next crtQIdAndTypeIndex
    const { crtQIdAndTypeIndex, survey } = this.state;
    const { questionaresIDsAndTypes } = survey;

    if (crtQIdAndTypeIndex === questionaresIDsAndTypes.length - 1) {
      // last q in survey
      // send all answers to the server
      console.log('last q in survey, sending answers...');

      const data = {
        // surveyId: survey.id, this info is on the crt user
        questionnairesResults: this.qsResults
      };

      fetch('/api/end-survey-session', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => {
        if (res.ok)
          return res.json();
        throw new Error(res.statusText)
      }).then(json => {
        console.log('Successfully ended the survey session', json);
        clearSession();
        this.setState({ surveyCompleted: true });
      }).catch(e => {
        console.error('Error at fetching: ', e)
        return e;
      });

    } else {
      const index = crtQIdAndTypeIndex + 1;
      this.setState({ crtQIdAndTypeIndex: index });
    }
  }


  render() {
    const { match: { params: { surveyId } } } = this.props;
    const { survey, crtQIdAndTypeIndex, surveyCompleted } = this.state;
    if (!survey) {
      return 'Loading...'
    }
    if (surveyCompleted) {
      return (
        <h1 style={{ textAlign: 'center' }}>Thanks for taking the survey!</h1>
      );
    }
    if (crtQIdAndTypeIndex === -1) {
      return (
        <div>
          {survey.name}
          <BeginForm survey={survey} onSuccess={this.handleBeginFormSuccess} />
        </div>
      );
    }
    const { questionaresIDsAndTypes } = survey;
    const crtQIdAndType = questionaresIDsAndTypes[crtQIdAndTypeIndex];
    return <QuestionnaireContainer onNext={this.handleNext} id={crtQIdAndType.id} type={crtQIdAndType.type} />;
  }
}



export { TakeSurveyPage };
