import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import AuthStyles from "./Auth.module.css";
import * as actions from "../../store/actions/indexActions";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "email address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
          touched: false,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "password address",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          touched: false,
        },
        valid: false,
      },
    },
    isSignup: true,
  };

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };

    this.setState({
      controls: updatedControls,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();

    if (this.state.controls.password.value.length < 6) {
      alert("password should have minimum length of 6");
    } else {
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignup
      );
    }
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.validation.valid}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    if (this.props.auth.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.auth.error) {
      errorMessage = <p>{this.props.auth.error.message}</p>;
    }

    return (
      <div className={AuthStyles.Auth}>
        {errorMessage}
        <p>
          Note: no real custom validation checking for input fields. Only
          placeholder validation done. See code. Don't care about this part.
          Focusing more on react stuff
        </p>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignup ? "Sign in" : "Sign up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: { ...state.auth },
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
