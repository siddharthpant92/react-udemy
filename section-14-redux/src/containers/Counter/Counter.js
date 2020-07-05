import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import ACTION_TYPES from "../../store/actions";

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
        <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store result</button>
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
  // 'state' refers to what is managed by redux in "reducers/counter.js" and "reducers/results.js". See index.js
  return {
    counter: state.ctr.counter,
    results: state.res.results
  }
};

// Configuration for the actions that this container needs to be dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: ACTION_TYPES.INCREMENT }),
    onDecrementCouner: () => dispatch({ type: ACTION_TYPES.DECREMENT }),
    onAdd: (addValue) => dispatch({ type: ACTION_TYPES.ADD, value: addValue }),
    onSubtract: (subValue) =>
      dispatch({ type: ACTION_TYPES.SUBTRACT, value: subValue }),
    onStoreResult: (counterValue) =>
      dispatch({
        type: ACTION_TYPES.STORE_RESULT,
        counterValue: counterValue,
      }),
    onDeleteResult: (idValue) =>
      dispatch({ type: ACTION_TYPES.DELETE_RESULT, idValue: idValue }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
