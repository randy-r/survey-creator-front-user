import React, { Component } from 'react';
import BeginFormView from './BeginFormView'
import { setToken } from '../../utils/auth';

class BeginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    const { survey } = this.props;
    data.survey = {
      id: survey.id,
      questionaresIds: survey.questionaresIds
    };
    fetch('/api/begin-survey-session', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok)
        return res.json();
      throw new Error(res.statusText)
    }).then(json => {
      setToken(json)
      this.props.onSuccess();
    }).catch(e => {
      console.error('Error at fetching: ', e)
      return e;
    });
  }

  render() {
    return <BeginFormView onSubmit={this.handleSubmit} />
  }
};




export { BeginForm }