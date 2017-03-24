import React, { PropTypes } from 'react';

const MusicImage = (props) => {
  return <img alt="musicimage" src={props.image} className="imagediv" />;
};

MusicImage.propTypes = {
  image: PropTypes.string,
};

export default MusicImage;
