import React, { useState } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  const addIngredientHandler = (newIngredient) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...newIngredient },
    ]);
  };

  const removeItemHandler = (clickedItemId) => {
    setUserIngredients(
      userIngredients.filter((ingredient) => ingredient.id != clickedItemId)
    );
  };

  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={(newIngredient) => addIngredientHandler(newIngredient)}
      />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={(clickedItemId) => removeItemHandler(clickedItemId)}
        />
      </section>
    </div>
  );
}

export default Ingredients;
