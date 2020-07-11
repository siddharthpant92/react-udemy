import React, { useState, useEffect } from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  /*
  The second argument is the list of dependencies which triggers this. Meaning, everytime one of those entities
  are updated is updated, the useEffect is triggered.
  eg:
  useEffect(() => console.log("useEffect"), [userIngredients]);
  
  If we do not supply a second argument, then it runs after every render cycle.
  If we provide an empyty error: it acts like componentDidMount()
  */
  useEffect(() => {
    fetch("https://react-hooks-a47e8.firebaseio.com/ingredients.json")
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = (newIngredient) => {
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
      });
  };

  const removeItemHandler = (clickedItemId) => {
    setUserIngredients(
      userIngredients.filter((ingredient) => ingredient.id !== clickedItemId)
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
