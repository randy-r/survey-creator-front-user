import React, { Component } from 'react';

import { BeginForm } from '../BeginForm';

class TakeSurveyPage extends Component {
  state = { survey: null }

  componentDidMount() {
    const { match } = this.props;
    const { surveyId } = match.params;

    fetch(`/api/surveys/${surveyId}`)
      .then(res => {
        if(res.ok)
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


  render() {
    const { match: { params: { surveyId } } } = this.props;
    const { survey } = this.state;
    if (!survey) {
      return 'Loading...'
    }
    return (
      <div>
        {survey.name}
        <BeginForm />
      </div>
    );
  }
}



export { TakeSurveyPage };
