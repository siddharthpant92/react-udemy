import React from "react";

const validationComponent = (props) => {
  let summaryText = null;
  const textLength = props.textLength;
  if (textLength >= 5) {
    summaryText = <p>Text long enough</p>;
  } else {
    summaryText = <p>Text too short</p>;
  }

  return summaryText;
};

export default validationComponent;
