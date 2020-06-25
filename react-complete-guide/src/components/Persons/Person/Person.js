import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 1px solid #eee;
  width: 60%;
  margin: 16px auto;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;
`;

const person = (props) => {
  return (
    <StyledDiv>
      <p onClick={props.click}>
        Name: {props.name} | Age: {props.age}
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
      <p>____</p>
    </StyledDiv>
  );
};

export default person;
