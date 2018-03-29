import React, { Component } from 'react';
import BeginFormView from './BeginFormView'
import { setToken } from '../../utils/auth';

class BeginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      fetch(`/api/users/${userId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(res => {
        if (res.ok)
          return res.json();
        throw new Error(res.statusText)
      }).then(userData => {
        delete userData.id;
        this.handleSubmit(userData);
      }).catch(e => {
        console.error('Error at fetching: ', e)
        return e;
      });
    }
  }

  handleSubmit(data) {
    const { survey } = this.props;
    // TODO these should be taken from the db, except the id
    data.survey = {
      id: survey.id,
      questionaresIDsAndTypes: survey.questionaresIDsAndTypes,
      rational: survey.rational,
      followUpInfo: survey.followUpInfo,
    };
    fetch('/api/begin-survey-session', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
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