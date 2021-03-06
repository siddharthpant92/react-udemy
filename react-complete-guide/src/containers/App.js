import React, { Component } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
// works only with react-scripts@2.0.0 and higher. For renaming css file see https://stackoverflow.com/questions/53062306/css-modules-not-working-for-react-version-16-6-0
import styleClasses from "./App.module.css";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { id: "rytuj", name: "abcd", age: 23, temp: "123" },
        { id: "rfvec", name: "efgh", age: 25 },
      ],
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false,
    };

    console.log("App.js constructor");
  }

  static getDerivedStateFromProps(props, state) {
    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#new-lifecycle-getderivedstatefromprops
    console.log("App.js getDerivedStateFromProps: ", props);
    return state;
  }

  componentDidMount() {
    console.log("App.js componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("App.js shouldComponentUpdate");

    return true;
  }

  componentDidUpdate() {
    console.log("App.js componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("App.js componentWillUnmount");
  }

  nameChangeHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === personId);
    // Good practice to not mutate state directly
    const updatedPersons = [...this.state.persons];

    updatedPersons[personIndex].name = event.target.value;

    // https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
    this.setState((prevState, props) => {
      return {
        persons: updatedPersons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const person = this.state.persons
    // Creating a copy of the original array, so that the original array is untouched - good practice
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };

  toggleCockPit = () => {
    this.setState({ showCockpit: !this.state.showCockpit });
  };

  loginHandler = () => {
    this.setState({ authenticated: !this.state.authenticated });
  }

  render() {
    let persons = null;
    console.log("App.js render");

    if (this.state.showPersons) {
      persons = (
        // You can use for-each, but then you have to add each new Person object to an array and return that array to 'persons' to be rendered. array.map does that
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
      );
    }

    return (
      <div className={styleClasses.App}>
        <button onClick={this.toggleCockPit}>Toggle Cockpit component</button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated, // This value is set from 'Cockpit' component used directly in 'person' component without passing it through 'Persons' component
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              appTitle={this.props.appTitle} // passed from index.js
              personsLength={this.state.persons.length}
              showPersons={this.state.showPersons}
              togglePersonHandler={this.togglePersonHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
