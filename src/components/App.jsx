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
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: '0 2% 0 2%', display: 'flex' }}>
          <Router>
            <Row style={{ flex: 1, alignItems: 'center' }} type="flex" justify="center" >
              <Col xs={24} sm={24} md={18} lg={12} xl={12} style={{ top: '-15px' }}>
                <Route path="/user/take-survey/:surveyId" component={TakeSurveyPage} />
                <Route path="/user/:userId/take-survey/:surveyId" component={TakeSurveyPage} />
              </Col>
            </Row>
          </Router>
        </Content>
      </Layout>
    );
  }
}

export default App;
