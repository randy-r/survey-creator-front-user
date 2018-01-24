import React, { Component } from 'react';
import { getToken } from '../../utils/auth';
import Questionnaire from './Questionnaire';
import FakeQuestionnaire from './FakeQuestionnaire';


class QuestionnaireContainer extends Component {
  state = { questionnaire: null }

  fetchQuestionnaire = (id, type) => {
    const token = getToken();

    let endpoint;
    if (type === 'valid') {
      endpoint = `/api/questionnaires/${id}`;
    } else if (type === 'fake') {
      endpoint = `/api/fakequestionnaires/${id}`;
    }

    fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => {
      if (res.ok)
        return res.json();
      throw new Error(res.statusText)
    }).then(json => {
      this.setState({ questionnaire: json });
      console.log(JSON.stringify(json));
    }).catch(e => {
      console.error('Error at fetching: ', e)
      return e;
    });
  }

  componentDidMount() {
    const { id, type } = this.props;
    this.fetchQuestionnaire(id, type);
  }

  componentDidUpdate( prevProps ) {
    const { id, type } = this.props;
    if (prevProps.id !== id) {
      this.fetchQuestionnaire(id,type);
    }
  }

  render() {
    const { questionnaire } = this.state;
    const q = questionnaire;
    if (!questionnaire) {
      return "Loading Questionnaire..."
    }
    if (q.type === 'valid') {
      return <Questionnaire onNext={this.props.onNext} questionnaire={q} />
    }

    if (q.type === 'fake') {
      return <FakeQuestionnaire onNext={this.props.onNext} questionnaire={q} />
    }
    throw new Error('Invalid questionare type ' + q.type);
  }
}


export { QuestionnaireContainer };
