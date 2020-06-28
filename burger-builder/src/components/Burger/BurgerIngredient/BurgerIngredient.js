import React, { Component } from "react";
import BurgerIngredientStyle from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

// class BurgerIngredient extends Component {
//   render() {
//     let ingredient = null;

//     switch (this.props.type) {
//       case "bread-bottom":
//         ingredient = <div className={BurgerIngredientStyle.BreadBottom}></div>;
//         break;

//       case "bread-top":
//         ingredient = (
//           <div className={BurgerIngredientStyle.BreadTop}>
//             <div className={BurgerIngredientStyle.Seeds1}></div>
//             <div className={BurgerIngredientStyle.Seeds2}></div>
//           </div>
//         );
//         break;

//       case "meat":
//         ingredient = <div className={BurgerIngredientStyle.Meat}></div>;
//         break;

//       case "cheese":
//         ingredient = <div className={BurgerIngredientStyle.Cheese}></div>;
//         break;

//       case "salad":
//         ingredient = <div className={BurgerIngredientStyle.Salad}></div>;
//         break;

//       case "bacon":
//         ingredient = <div className={BurgerIngredientStyle.Bacon}></div>;
//         break;

//       default:
//         ingredient = null;
//         break;
//     }

//     return ingredient;
//   }
// }

// BurgerIngredient.propTypes = {
//   type: PropTypes.string.isRequired
// }

// export default BurgerIngredient;

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={BurgerIngredientStyle.BreadBottom}></div>;
      break;

    case "bread-top":
      ingredient = (
        <div className={BurgerIngredientStyle.BreadTop}>
          <div className={BurgerIngredientStyle.Seeds1}></div>
          <div className={BurgerIngredientStyle.Seeds2}></div>
        </div>
      );
      break;

    case "meat":
      ingredient = <div className={BurgerIngredientStyle.Meat}></div>;
      break;

    case "cheese":
      ingredient = <div className={BurgerIngredientStyle.Cheese}></div>;
      break;

    case "salad":
      ingredient = <div className={BurgerIngredientStyle.Salad}></div>;
      break;

    case "bacon":
      ingredient = <div className={BurgerIngredientStyle.Bacon}></div>;
      break;

    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default burgerIngredient;
