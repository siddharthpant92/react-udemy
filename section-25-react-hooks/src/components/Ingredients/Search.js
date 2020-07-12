import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/http";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import "./Search.css";

const Search = React.memo((props) => {
  const { onFilterIngredients } = props; // extracting that prop
  const [enteredFilter, setEnteredFilter] = useState("");
  const { isLoading, data, error, extra, sendRequest, clear } = useHttp();

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    sendRequest(
      "https://react-hooks-a47e8.firebaseio.com/ingredients.json" + query,
      "GET",
      null
    );
  }, [enteredFilter, sendRequest]);

  useEffect(() => {
    const loadedIngredients = [];
    for (const key in data) {
      loadedIngredients.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
      });
    }
    onFilterIngredients(loadedIngredients);
  }, [data, onFilterIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
