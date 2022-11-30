import React from "react";
import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientsInput = useRef(null);

  const history = useHistory();
  // redirect User nach dem Post effect

  const handleSubmit = async (e) => {
    e.preventDefault();
    // doc soll in der collection gespeichert werden
    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + "minutes",
    };
    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    // verhindern , dass page nach button click reloaded wird
    e.preventDefault();
    // Whitespaces werden entfernt
    const ing = newIngredient.trim();
    //
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    // damit man sofort wieder tippen kann ohne in das fled clicken zu müssen
    ingredientsInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title"> Add a new Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label>
          <span> Recipe Ingredients</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button onClick={handleAdd} className="btn">
              add
            </button>
          </div>
        </label>
        <p>
          {" "}
          Current Ingredients:{" "}
          {ingredients.map((ing) => {
            return <em key={ing}>{ing}, </em>;
          })}{" "}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time in Minutes</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}
