import React, { Component } from 'react';
import { getToken } from '../../utils/auth';


class Questionnaire extends Component {
  render() {
    const { questionnaire} = this.props;
    return questionnaire.name;
  }
}

class FakeQuestionnaire extends Component {
  render() {
    const { questionnaire} = this.props;
    return questionnaire.name;
  }
}

class QuestionnaireContainer extends Component {
  state = { questionnaire: null }

  componentDidMount() {
    const { id, type } = this.props;
    // fetch the fake q also and decide the view accordingly
    if (type === 'valid') {
      fetch(`/api/questionnaires/${id}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      }).then(res => {
        if (res.ok)
          return res.json();
        throw new Error(res.statusText)
      }).then(json => {
        this.setState({ questionnaire: json });
        return json;
      }).catch(e => {
        console.error('Error at fetching: ', e)
        return e;
      });
    }

  }

  render() {
    const { questionnaire } = this.state;
    const q = questionnaire;
    if (!questionnaire) {
      return "Loading Questionnaire..."
    }
    if (q.type === 'valid') {
      return <Questionnaire questionnaire={q} />
    }

    if (q.type === 'fake') {
      return <FakeQuestionnaire questionnaire={q} />
    }
    return <p>{questionnaire.name}</p>
  }
}


export { QuestionnaireContainer };
