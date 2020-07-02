import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import CheckoutSummaryStyle from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={CheckoutSummaryStyle.CheckoutSummary}>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelCheckout}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continueCheckout}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
