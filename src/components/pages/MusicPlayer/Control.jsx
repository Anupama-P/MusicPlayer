import React, { PropTypes } from 'react';

const Control = (props) => {
  return (
    <div>
      <button onClick={props.onClicknext} disabled={props.disablenext}>Next</button>
      <button onClick={props.onClickprevious} disabled={props.disableprev}>Previous</button>
      <button onClick={props.onClickplay}>Play/Pause</button>
      <button onClick={props.onClickshuffle} disabled={props.disableshuffle}>shuffle</button>
      <progress value={props.progressvalue} max="100" />
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
};

export default Control;
