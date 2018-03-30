import React, { Component, Fragment } from 'react';
import { Progress } from 'antd';

const tickingSound = new Audio('/Ticking-clock-sound.mp3');
tickingSound.playbackRate = 2;
tickingSound.loop = true;

class ProgressTimer extends Component {
  state = { percent: 100 }

  componentDidMount() {
    const { totalTime, onTimeRanOut } = this.props;
    const percentToSubstract = 100 / (totalTime / 1000);

    tickingSound.play();
    const intervalId = setInterval(
      () => {
        const { percent } = this.state;
        let newPercent = percent - percentToSubstract;
        newPercent = newPercent < 0 ? 0 : newPercent;
        if (newPercent <= 0) {
          tickingSound.pause();
          clearInterval(intervalId);
          onTimeRanOut();
        }
        this.setState({ percent: newPercent })
      }, 1000
    );
  }

  componentWillUnmount() {
    tickingSound.pause();
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
