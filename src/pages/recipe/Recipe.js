import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";
import { projectFirestore } from "../../firebase/config";
// styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);
    // doc such nach einem bestimmten doc in der collection und nimmt eine id als argument
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setError("Recipe does not exist ");
          setIsPending(false);
        } else {
          setIsPending(false);
          setRecipe(doc.data());
        }
      });
    // id müsste eigentlich keine dependency sein, aber da react sonst eine warnung ausgibt - wird es als dependency erfasst
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title"> {recipe.title}</h2>
          <p> Takes :{recipe.cookingTime} to cook </p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
