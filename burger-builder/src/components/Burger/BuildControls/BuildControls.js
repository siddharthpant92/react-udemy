import React from "react";
import BuildControlsStyle from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
];

const buildControls = (props) => {
  return (
    <div className={BuildControlsStyle.BuildControls}>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={props.addIngredient.bind(this, ctrl.type)} // No value is passed back from BuildControl, but we need to pass back a value to BurgerBuilder
          removed={props.removeIngredient.bind(this, ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default buildControls;
