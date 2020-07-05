import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.counter} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCouner}
        />
        <CounterControl label="Add 5" clicked={() => this.props.onAdd(5)} />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onSubtract(5)}
        />
        <hr />
        <button onClick={this.props.onStoreResult}>Store result</button>
        <ul>
          {this.props.results.map((result) => (
            <li
              onClick={this.props.onDeleteResult}
              key={result.id}
              onClick={() => this.props.onDeleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Configuration to only get the state that this container needs
const mapStateToProps = (state) => {
  // 'state' refers to what is managed by redux in reducer.js, returns a property called 'ctr'
  return {
    ...state,
  };
};

// Configuration for the actions that this container needs to be dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCouner: () => dispatch({ type: "DECREMENT" }),
    onAdd: (addValue) => dispatch({ type: "ADD", value: addValue }),
    onSubtract: (subValue) => dispatch({ type: "SUBTRACT", value: subValue }),
    onStoreResult: () => dispatch({ type: "STORE_RESULT" }),
    onDeleteResult: (idValue) =>
      dispatch({ type: "DELETE_RESULT", idValue: idValue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
