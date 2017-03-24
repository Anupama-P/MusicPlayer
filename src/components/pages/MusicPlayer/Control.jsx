import React, { PropTypes } from 'react';

const Control = (props) => {
  return (
    <div className="controldiv">
      <div className="seekbar">
        <input type="range" id="seek-bar" min="0" max="100" step="1" value={props.progressvalue ? props.progressvalue : 0} onChange={props.onchangeseek} />
      </div>
      <div className="durationdiv">
        <div className="currenttimediv">{props.currenttime}</div>
        <div className="durationinnerdiv">{props.duration === 'NaN:NaN' ? '0:0' : props.duration}</div>
      </div>
      <div className="othercontrols">
        <button onClick={props.onClickprevious} disabled={props.disableprev}><i className="fa fa-step-backward" /></button>
        <button onClick={props.onClickplay} className="play-pause-button"><i className={props.playicon} /></button>
        <button onClick={props.onClicknext} disabled={props.disablenext}><i className="fa fa-step-forward" /></button>
      </div>
      <button onClick={props.onClickshuffle} disabled={props.disableshuffle} className="shuffle-button"><i className="fa fa-random" style={{ color: props.shuffleicon }} /></button>
      <button onClick={props.isloop} className="loop-button"><i className="fa fa-retweet" style={{ color: props.loopicon }} /></button>
    </div>
  );
};

Control.propTypes = {
  onClicknext: PropTypes.func,
  onClickprevious: PropTypes.func,
  onClickplay: PropTypes.func,
  onClickshuffle: PropTypes.func,
  disablenext: PropTypes.string,
  disableprev: PropTypes.string,
  disableshuffle: PropTypes.string,
  progressvalue: PropTypes.number,
  onchangeseek: PropTypes.func,
  playicon: PropTypes.string,
  shuffleicon: PropTypes.string,
  loopicon: PropTypes.string,
  currenttime: PropTypes.string,
  duration: PropTypes.string,
  isloop: PropTypes.func
};

export default Control;
