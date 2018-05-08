import React, { Component, Fragment } from 'react'
import { List, Card, Row, Col, Slider, Button, Input, Tag } from 'antd';


class TrickItemCard extends Component {
  constructor(props) {
    super(props);
    const { item: { correctAnswersPool } } = this.props;

    this.allInputValues = Array.apply(null, Array(correctAnswersPool.length))
      .map(_ => '');
    this.state = { areEqual: false };
    this.prevAreEqual = false;
  }

  handleInputChange = ({ target: { value } }, index) => {
    // compare the list of array with the list of correct answer pool
    this.allInputValues[index] = value;
    const { item: { correctAnswersPool } } = this.props;

    let areEqual = true;
    this.allInputValues.forEach((v, i) => {
      if (v.toLowerCase() !== correctAnswersPool[i].toLowerCase()) {
        areEqual = false;
      }
    });
    if (this.prevAreEqual !== areEqual) {
      const { onCorrectAnswerValidation } = this.props;
      this.setState({ areEqual },
        () => onCorrectAnswerValidation(areEqual)
      );
    }
    this.prevAreEqual = areEqual;
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
    const { item: { allAnswersShuffled } } = this.props;
    return (
      <Fragment>
        {allAnswersShuffled.map((a, i) => {
          return <Tag key={a} color="blue">{a}</Tag>
        })}
      </Fragment>
    );
  }

  render() {
    const { areEqual } = this.state;
    const background = areEqual ? '#6cea6c' : '';
    return (
      <List.Item>
        <Card style={{ width: '100%', background }} title={this.createBlocksQuestion()}>
          {this.createAnswers()}
        </Card>
      </List.Item>
    );
  }
}


class FakeQuestionnaire extends Component {
  equalTracker = new Set()
  state = { disabled: true, showInstructions: true }

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
    const { questionnaire: { trickitems, instructions } } = this.props;
    const { disabled, showInstructions } = this.state;
    if (instructions && showInstructions) {
      return (
        <Fragment>
          <Card style={{ width: '100%' }}   >
            <pre className="instructionText">
              {instructions}
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
