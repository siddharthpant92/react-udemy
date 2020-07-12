import React, { useState, useReducer, useEffect, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

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

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };

    case "RESPONSE":
      return { ...httpState, loading: false };

    case "ERROR":
      return { loading: false, error: action.error };

    case "CLEAR":
      return { ...httpState, error: null };

    default:
      throw new Error("Ingredients -> httpReducer -> Case not handled");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: "",
  });

  /*
  The second argument is the list of dependencies which triggers this. Meaning, everytime one of those entities
  are updated is updated, the useEffect is triggered.
  eg:
  useEffect(() => console.log("useEffect"), [userIngredients]);
  
  If we do not supply a second argument, then it runs after every render cycle.
  If we provide an empyty error: it acts like componentDidMount()
  */

  const addIngredientHandler = (newIngredient) => {
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-a47e8.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(newIngredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: "ADD",
          newIngredient: { id: responseData.id, ...newIngredient },
        });
        dispatchHttp({ type: "RESPONSE" });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", error: error.message });
      });
  };

  const removeItemHandler = (clickedItemId) => {
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-a47e8.firebaseio.com/ingredients/${clickedItemId}/.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        dispatch({
          type: "DELETE",
          id: clickedItemId,
        });
        dispatchHttp({ type: "RESPONSE" });
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR", error: error.message });
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const clearError = () => {
    // React batches these state updates so that there is 1 render cycle, and not 2 after each update
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={(newIngredient) => addIngredientHandler(newIngredient)}
        loading={httpState.loading}
      />

      <section>
        <Search onFilterIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(clickedItemId) => removeItemHandler(clickedItemId)}
        />
      </section>
    </div>
  );
}

export default Ingredients;
