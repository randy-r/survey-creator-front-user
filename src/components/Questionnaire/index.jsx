import React, { Component } from 'react';
import { getToken } from '../../utils/auth';


class Questionnaire extends Component {
  state = {questionnaire: null}

  componentDidMount() {
    const { id } = this.props;
    fetch(`/api/questionnaires/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    }).then(res => {
      if (res.ok)
        return res.json();
      throw new Error(res.statusText)
    }).then(json => {
      this.setState({questionnaire: json});
      return json;
    }).catch(e => {
      console.error('Error at fetching: ', e)
      return e;
    });
  }

  render() {
    const { questionnaire } = this.state;
    if(!questionnaire){
      return "Loading Questionnaire..."
    }
    return <p>{questionnaire.name}</p>
  }
}


export { Questionnaire };
