import React, { Component, Fragment } from 'react';
import { Progress } from 'antd';

const tickingSound = new Audio(`${process.env.PUBLIC_URL}/Ticking-clock-sound.mp3`);
tickingSound.playbackRate = 1;
tickingSound.loop = true;

class ProgressTimer extends Component {
  state = { percent: 100 }
  substractionInterval = 500

  computeNewPercent = () => {
    const { totalTime } = this.props;
    const percentToSubstract = 100 / (totalTime / this.substractionInterval);
    const { percent } = this.state;
    let newPercent = percent - percentToSubstract;
    newPercent = newPercent < 0 ? 0 : newPercent;
    return newPercent;
  }

  componentDidMount() {
    const { onTimeRanOut } = this.props;

    let newPercent;
    newPercent = this.computeNewPercent();
    this.setState({ percent: newPercent });

    tickingSound.play();
    this.intervalId = setInterval(
      () => {
        newPercent = this.computeNewPercent();
        this.setState({ percent: newPercent }, () => {
          if (newPercent <= 0) {
            tickingSound.pause();
            clearTimeout(this.intervalId);
            onTimeRanOut();
          }
        });
      }, this.substractionInterval
    );
  }

  componentWillUnmount() {
    tickingSound.pause();
    clearTimeout(this.intervalId);
  }

  render() {
    const { percent } = this.state;
    return (
      <Fragment>
        <Progress type="circle" percent={percent} width={80} status="exception" showInfo={false} />
      </Fragment>
    )
  }
}



export default ProgressTimer;
