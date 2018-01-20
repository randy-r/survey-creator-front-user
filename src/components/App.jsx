import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { Layout } from 'antd';
import { DatePicker, Row, Col } from 'antd';
import 'antd/dist/antd.css';

import { TakeSurveyPage } from './TakeSurvey';


const { Header, Footer, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { foos: [] }
    fetch('/api/foo').then(res => res.json()).then(foos => this.setState({ foos })).catch(e => console.error(e))

  }

  render() {
    return (
      <div>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Router>
              <Row type="flex" justify="center">
                <Col span={12}>
                  <Route path="/take-survey/:surveyId" component={TakeSurveyPage} />
                </Col>
              </Row>
            </Router>
            <Row type="flex" justify="center">
              <Col span={12}>text</Col>
            </Row>
            <Row type="flex" justify="center">
              <DatePicker onChange={v => console.log('DatePicker chose: ', v)} />
              {this.state.foos.map(f => <h3>{f}</h3>)}
            </Row>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
