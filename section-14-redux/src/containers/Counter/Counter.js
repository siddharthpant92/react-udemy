import React, { Component } from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionCreators from "../../store/actions/actions";

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
        <button onClick={() => this.props.onStoreResult(this.props.counter)}>
          Store result
        </button>
        <ul>
          {this.props.results.map((result) => (
            <li
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
    results: state.res.results,
  };
};

// Configuration for the actions that this container needs to be dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()),
    onDecrementCouner: () => dispatch(actionCreators.decrement()),
    onAdd: (addValue) => dispatch(actionCreators.add(addValue)),
    onSubtract: (subValue) => dispatch(actionCreators.subtract(subValue)),
    onStoreResult: (counterValue) =>
      dispatch(actionCreators.storeResult(counterValue)),
    onDeleteResult: (idValue) => dispatch(actionCreators.deleteResult(idValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
