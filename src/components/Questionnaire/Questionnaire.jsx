import React, { Component, Fragment } from 'react'
import { List, Card, Row, Col, Slider, Button } from 'antd';

import { Radio } from 'antd';
import './styles.css';

const RadioGroup = Radio.Group;

class Choiches extends React.Component {
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.props.onChoiceSelection(e.target.value);
    // this.setState({
    //   value: e.target.value,
    // });
  }
  render() {
    const { bullets } = this.props;
    return (
      <RadioGroup onChange={this.onChange}>
        {bullets.map((b, i) => (
          <Radio key={b.text} value={i + 1}>{b.text}</Radio>
        ))}
      </RadioGroup>
    );
  }
}

const CardTitle = ({ text, imgUrl }) => {
  return (
  <Fragment>
    <span>{text}</span>
    {imgUrl && <img style={{ width: '100%' }} border="0" alt="Null" src="http://socialintelligence.labinthewild.org/mite/images/8.png" />}
  </Fragment>
  );
};


class ItemCard extends Component {
  handleChoiceSelection = val => {
    const { item, onChoiceSelection } = this.props;
    onChoiceSelection(item._id, val);
  }
  render() {
    const { item: { text, imgUrl, answerTemplate } } = this.props;
    return (
      <List.Item>
        <Card
          style={{ width: '100%', wordWrap: 'break-word', whiteSpace: 'normal', wordBreak: 'break-all' }}
          title={<CardTitle text={text} imgUrl={imgUrl} />}
        >
          <Choiches onChoiceSelection={this.handleChoiceSelection} bullets={answerTemplate.bullets} />
        </Card>
      </List.Item>
    );
  }
}

class Questionnaire extends Component {
  state = { disabled: true }
  itemsAnswered = new Map();

  handleChoiceSelection = (itemId, value) => {
    this.itemsAnswered.set(itemId, value);
    console.log(this.itemsAnswered.size);

    const { questionnaire: { items } } = this.props;
    this.setState({ disabled: this.itemsAnswered.size < items.length })
  }

  handleNext = () => {
    const answers = [];
    this.itemsAnswered.forEach((v, k) => {
      answers.push({ itemId: k, value: v });
    });
    this.props.onNext(answers);
  }

  render() {
    const { questionnaire } = this.props;

    return (
      <div >
        {/* {questionnaire.name + ' ' + questionnaire.items.length} */}
        <List
          dataSource={questionnaire.items}
          renderItem={e => <ItemCard onChoiceSelection={this.handleChoiceSelection} item={e} />}
        />
        <Row type="flex" justify="end">
          <Button
            style={{ alignSelf: 'flex-end' }}
            type="primary"
            onClick={this.handleNext}
            disabled={this.state.disabled}
          >
            {'>'}
          </Button>
        </Row>
      </div>
    );
  }
}

export default Questionnaire;
