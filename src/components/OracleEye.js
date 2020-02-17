import React from 'react';

import { ReactComponent as Blinky1 } from '../assets/blinky/blinky_1.svg';
import { ReactComponent as Blinky2 } from '../assets/blinky/blinky_2.svg';
import { ReactComponent as Blinky3 } from '../assets/blinky/blinky_3.svg';
import { ReactComponent as Blinky4 } from '../assets/blinky/blinky_4.svg';
import { ReactComponent as Blinky5 } from '../assets/blinky/blinky_5.svg';

import { ReactComponent as Pupil } from '../assets/pupil.svg';
// import { ReactComponent as Eye } from '../assets/blinky.svg';

class OracleEye extends React.Component {
  constructor() {
    super();
    this.frameAssets = [
      <Blinky1 />,
      <Blinky2 />,
      <Blinky3 />,
      <Blinky4 />,
      <Blinky5 />
    ];

    this.frameSequence = [0, 1, 2, 3, 3, 4, 4, 4, 3, 3, 2, 1, 0];
    this.defaultAsset = this.frameAssets[0];
    this.minBlinkInterval = 7;
    this.maxBlinkInterval = 19;

    this.state = {
      sequencePosition: 0,
      blinking: false,
      showAsset: this.defaultAsset
    };
  }

  componentDidMount() {
    this.startBlink();
  }

  getRandomBlinkInterval = () => {
    let int;
    if (Math.random() > 0.85) {
      int = 500;
    } else {
      const min = this.minBlinkInterval;
      const max = this.maxBlinkInterval;
      const diff = max - min;
      int = (min + Math.random() * diff) * 1000;
    }
    return int;
  };

  blink = () => {
    let { showAsset, blinking, sequencePosition } = this.state;

    if (sequencePosition >= this.frameSequence.length) {
      showAsset = this.defaultAsset;
      blinking = false;
      setTimeout(this.startBlink, this.getRandomBlinkInterval());
    } else {
      const assetIndex = this.frameSequence[sequencePosition];
      showAsset = this.frameAssets[assetIndex];
      window.requestAnimationFrame(this.blink);
    }
    sequencePosition += 1;
    this.setState({ showAsset, blinking, sequencePosition });
  };

  startBlink = () => {
    if (!this.state.blinking) {
      this.setState({ sequencePosition: 0, blinking: true });
      this.blink();
    }
  };

  render() {
    return (
      <div className='wrapper'>
        <div className='inner'>
          <Pupil />
          {this.state.showAsset}
        </div>
      </div>
    );
  }
}
export default OracleEye;
