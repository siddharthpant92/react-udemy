import React, { useReducer, useCallback, useEffect } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;

    case "ADD":
      return [...currentIngredients, action.newIngredient];

    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);

    default:
      throw new Error("Ingredients -> IngredientReducer -> Case not handled");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { isLoading, data, error, extra, sendRequest, clear } = useHttp();
  /*
  useEffect runs after the render and is controlled by the dependencies!
  The second argument is the list of dependencies which triggers this. Meaning, everytime one of those entities
  are updated is updated, the useEffect is triggered.
  
  If we do not supply a second argument, then it runs after every render cycle.
  If we provide an empyty error: it acts like componentDidMount()
  */
  useEffect(() => {
    if (extra != null && extra.identifier === "DELETE") {
      dispatch({ type: "DELETE", id: extra.clickedItemId });
    } else if (extra != null && extra.identifier === "ADD") {
      dispatch({
        type: "ADD",
        newIngredient: {
          id: data.name,
          ...extra.newIngredient,
        },
      });
    }
  }, [data, extra]);

  const addIngredientHandler = (newIngredient) => {
    sendRequest(
      "https://react-hooks-a47e8.firebaseio.com/ingredients.json",
      "POST",
      JSON.stringify(newIngredient),
      {
        newIngredient: newIngredient,
        identifier: "ADD",
      }
    );
  };

  const removeIngredientHandler = useCallback(
    (clickedItemId) => {
      sendRequest(
        `https://react-hooks-a47e8.firebaseio.com/ingredients/${clickedItemId}.json`,
        "DELETE",
        null,
        {
          clickedItemId: clickedItemId,
          identifier: "DELETE",
        }
      );
      // Shouldn't delete here because we need to do it after we know the request was successful
    },
    [sendRequest]
  );

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={(newIngredient) => addIngredientHandler(newIngredient)}
        loading={isLoading}
      />

      <section>
        <Search onFilterIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(clickedItemId) =>
            removeIngredientHandler(clickedItemId)
          }
        />
      </section>
    </div>
  );
}

export default Ingredients;
