import React, { PropTypes } from 'react';

const Title = (props) => {
  return <h2 className="title">{props.title}</h2>;
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
