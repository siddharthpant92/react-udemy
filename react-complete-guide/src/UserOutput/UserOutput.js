import React from "react";

const userOutput = (props) => {
  return (
    <div>
      <p>{props.children} | {props.userName}</p>
    </div>
  );
};

export default userOutput