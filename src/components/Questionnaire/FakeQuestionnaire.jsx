import React, { Component, Fragment } from 'react'
import { List, Card, Row, Col, Slider, Button, Input, Tag } from 'antd';

const m = ' nhduisadas saudsuadnisaunbu an jn djshajdh suahba  sajk fhhabfsa faj hiabghsidsaf majfhruijgrhgtds sgbufshdidywumng ukfsabdsa';

class TrickItemCard extends Component {
  constructor(props) {
    super(props);
    const { item: { trickAnswers } } = this.props;

    this.allInputValues = Array.apply(null, Array(trickAnswers[0].values.length));
    this.state = { disabled: true };
    this.prevAreEqual = false;
  }

  handleInputChange = ({ target: { value } }, index) => {
    this.allInputValues[index] = value;

    const { item: { trickAnswers, correctTrickAnswerIndex } } = this.props;
    // compare what the user filled in with what is the 'correct' answer    
    const correctTrickAnswer = trickAnswers[correctTrickAnswerIndex];
    const correctTrickValues = correctTrickAnswer.values;
    let areEqual = true;
    this.allInputValues.forEach((v, i) => {
      if (v !== correctTrickValues[i]) {
        areEqual = false;
      }
    });
    if (this.prevAreEqual !== areEqual) {
      const { onCorrectAnswerValidation } = this.props;
      onCorrectAnswerValidation(areEqual);
    }
    this.prevAreEqual = areEqual;
    console.log(areEqual);
  }

  createBlocksQuestion = () => {
    const { item } = this.props;
    let blankIndex = 0;

    return (
      <Fragment>
        {item.blocks.map((b, i) => b.type === 'text' ?
          <span key={i}> {b.text} </span>
          :
          <Input
            onChange={(
              () => {
                const index = blankIndex++;
                const func = e => this.handleInputChange(e, index);
                return func;
              }
            )()}
            key={i} style={{ width: 200 }} />)}
      </Fragment>
    );
  }

  createAnswers = () => {
    const { item } = this.props;
    return (
      <Fragment>
        {item.trickAnswers.map((a, i) => {
          return (
            <div key={i} style={{ marginBottom: 4 }}>
              {i + 1}) {a.values.map(v => <Tag key={v} color="blue">{v}</Tag>)}
            </div>
          );
        })}
      </Fragment>
    );
  }

  render() {
    return (
      <List.Item>
        <Card style={{ width: '100%' }} title={this.createBlocksQuestion()}>
          {this.createAnswers()}
        </Card>
      </List.Item>
    );
  }
}


class FakeQuestionnaire extends Component {
  equalTracker = new Set()
  state = { disabled: true }

  handleCorrectAnswerValidation = (id, areEqual) => {
    // // map for all and reduce it for the button
    // const prevAreEqual = this.areAllEqual;
    // this.areAllEqual = prevAreEqual && areEqual;
    // if (this.areAllEqual !== prevAreEqual) {
    //   // value has changed
    //   this.setState({ disabled: !this.areAllEqual });
    // }
    const { questionnaire: { trickitems } } = this.props;

    if (areEqual) {
      this.equalTracker.add(id);
    } else {
      this.equalTracker.delete(id);
    }
    const disabled = this.equalTracker.size !== trickitems.length;
    this.setState({ disabled });
  }

  handleNext = () => {
    const answers = null;
    const isFake = true;
    this.props.onNext(answers, isFake);
  }

  render() {
    const { questionnaire: { trickitems } } = this.props;
    const { disabled } = this.state;
    return (
      <Fragment>
        <List
          dataSource={trickitems}
          renderItem={e => <TrickItemCard onCorrectAnswerValidation={areEqual => this.handleCorrectAnswerValidation(e._id, areEqual)} item={e} />}
        />
        <Row type="flex" justify="end">
          <Button
            style={{ alignSelf: 'flex-end' }}
            type="primary"
            onClick={this.handleNext}
            disabled={disabled}
          >
            {'>'}
          </Button>
        </Row>
      </Fragment>
    );
  }
}

export default FakeQuestionnaire;
