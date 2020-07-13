import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import AuthStyles from "./Auth.module.css";
import * as actions from "../../store/actions/indexActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const [controls, setControls] = useState({
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
  });

  const [isSignup, setIsSignup] = useState(true);

  const checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      },
    };

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (controls.password.value.length < 6) {
      alert("password should have minimum length of 6");
    } else {
      props.onAuth(controls.email.value, controls.password.value, isSignup);
    }
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.validation.valid}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.auth.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.auth.error) {
    errorMessage = <p>{props.auth.error.message}</p>;
  }

  let authRedirect = null;
  if (props.auth.token) {
    authRedirect = <Redirect to={props.auth.authRedirectPath} />;
  }

  return (
    <div className={AuthStyles.Auth}>
      {authRedirect}
      {errorMessage}
      <p>
        Note: no real custom validation checking for input fields. Only
        placeholder validation done. See code. Don't care about part. Focusing
        more on react stuff
      </p>
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandler}>
        Switch to {isSignup ? "Sign in" : "Sign up"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: { ...state.auth },
  burgerBuilder: { ...state.burgerBuilder },
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
