import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = (props) => {
  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const continueCheckoutHandler = () => {
    props.history.replace(props.match.url + "/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.burgerBuilder.ingredients) {
    const purchasedRedirect = props.order.purchased ? (
      <Redirect to="/" />
    ) : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.burgerBuilder.ingredients}
          cancelCheckout={cancelCheckoutHandler}
          continueCheckout={continueCheckoutHandler}
        />
        <Route
          path={props.match.url + "/contact-data"}
          // passing the props we get from burger builder to ContactData
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    burgerBuilder: { ...state.burgerBuilder },
    order: { ...state.order },
  };
};

export default connect(mapStateToProps)(Checkout);
