import React, { Component, Fragment } from 'react'
import { List, Card, Row, Col, Slider, Button } from 'antd';

import { Radio } from 'antd';
import './styles.css';
import ProgressTimer from './ProgressTimer';

const RadioGroup = Radio.Group;

class Choiches extends React.Component {
  onChange = (e) => {
    this.props.onChoiceSelection(e.target.value);
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
      {imgUrl && <img style={{ width: '100%' }} border="0" alt="Null" src={imgUrl} />}
    </Fragment>
  );
};


class ItemCard extends Component {
  handleChoiceSelection = val => {
    const { item, onChoiceSelection } = this.props;
    onChoiceSelection(item._id, val, false);
  }
  render() {
    const { item: { text, imgUrl, answerTemplate, _id }, onChoiceSelection } = this.props;
    return (
      <List.Item>
        <Card
          style={{ width: '100%', wordWrap: 'break-word', whiteSpace: 'normal', wordBreak: 'break-all' }}
          title={<CardTitle text={text} imgUrl={imgUrl} />}
        >
          <Choiches onChoiceSelection={this.handleChoiceSelection} bullets={answerTemplate.bullets} />
        </Card>
        {imgUrl && <ProgressTimer totalTime={5000} onTimeRanOut={() => onChoiceSelection(_id, -1, true)} />}
      </List.Item>
    );
  }
}

class Questionnaire extends Component {
  state = { disabled: true, showInstructions: true }
  itemsAnswered = new Map();

  handleChoiceSelection = (itemId, value, shouldGoToNext) => {
    const prevValue = this.itemsAnswered.get(itemId);
    let newValue = value;
    if (value === -1 && prevValue !== undefined && prevValue !== null) {
      newValue = prevValue;
    }
    this.itemsAnswered.set(itemId, newValue);
    if (shouldGoToNext === true) {
      this.handleNext();
      return;
    }

    const { questionnaire: { items } } = this.props;
    this.setState({ disabled: this.itemsAnswered.size < items.length })
  }

  handleNext = () => {
    const { questionnaire } = this.props;

    const items = [];
    this.itemsAnswered.forEach((v, k) => {
      items.push({ id: k, answer: v });
    });
    this.props.onNext({
      items,
      id: questionnaire.id
    });
  }

  render() {
    const { questionnaire } = this.props;
    const { showInstructions } = this.state;
    if (questionnaire.instructions && showInstructions) {
      return (
        <Fragment>
          <Card style={{ width: '100%' }}   >
            <pre>
              {questionnaire.instructions}
            </pre>
          </Card>
          <Row type="flex" justify="end">
            <Button
              style={{ alignSelf: 'flex-end' }}
              type="primary"
              onClick={() => this.setState({ showInstructions: false })}
            >
              {'>'}
            </Button>
          </Row>
        </Fragment>
      );
    }
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
