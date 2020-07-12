import React, { useState, useEffect, useCallback } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /*
  The second argument is the list of dependencies which triggers this. Meaning, everytime one of those entities
  are updated is updated, the useEffect is triggered.
  eg:
  useEffect(() => console.log("useEffect"), [userIngredients]);
  
  If we do not supply a second argument, then it runs after every render cycle.
  If we provide an empyty error: it acts like componentDidMount()
  */

  const addIngredientHandler = (newIngredient) => {
    setIsLoading(true);
    fetch("https://react-hooks-a47e8.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(newIngredient),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.id, ...newIngredient },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const removeItemHandler = (clickedItemId) => {
    setIsLoading(true);
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
        setUserIngredients(
          userIngredients.filter(
            (ingredient) => ingredient.id !== clickedItemId
          )
        );
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);

  const clearError = () => {
    // React batches these state updates so that there is 1 render cycle, and not 2 after each update
    setError();
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={(newIngredient) => addIngredientHandler(newIngredient)}
        loading={isLoading}
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
