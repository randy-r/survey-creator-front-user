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
        <Layout style={{ minHeight: "100vh" }}>
          <Header>Header</Header>
          <Content >
            <div style={{ padding: '0 2% 0 2%' }}>
              <Router>
                <Row type="flex" justify="center">
                  <Col xs={24} sm={24} md={18} lg={12} xl={12}>
                    <Route path="/take-survey/:surveyId" component={TakeSurveyPage} />
                  </Col>
                </Row>
              </Router>
              {/* <Row type="flex" justify="center">
              <Col span={12}>text</Col>
            </Row> */}
              {/* <Row type="flex" justify="center">
              <DatePicker onChange={v => console.log('DatePicker chose: ', v)} />
              {this.state.foos.map(f => <h3>{f}</h3>)}
            </Row> */}
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
