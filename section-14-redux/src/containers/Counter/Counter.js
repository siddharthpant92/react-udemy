import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
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
      </div>
    );
  }
}

// Configuration to only get the state that this container needs
const mapStateToProps = (state) => {
  // 'state' refers to what is managed by redux in reducer.js, returns a property called 'ctr'
  return {
    ctr: state.counter,
  };
};

// Configuration for the actions that this container needs to be dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: "INCREMENT" }),
    onDecrementCouner: () => dispatch({ type: "DECREMENT" }),
    onAdd: (addValue) => dispatch({ type: "ADD", value: addValue }),
    onSubtract: (subValue) => dispatch({ type: "SUBTRACT", value: subValue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
