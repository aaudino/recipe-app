import React, { useDebugValue, useEffect, useState } from "react";
import { projectFirestore } from "../../firebase/config";

//Components
import RecipeList from "../../components/RecipeList";
//sytles
import "./Home.css";

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);
    // verbindet sich mit der collection - parameter sind die namen der collection
    // onSnapshot returned eine function
    // diese unsub function brauchen wir um vom ebventlistener zu unsubcriben. Andernfalls, würde der listener weiter laufen, auch wenn wir uns gar nicht mehr auf der componente befinden. Dh wir müssen unsubscriben wenn die componente unmounted
    const unsub = projectFirestore
      .collection("recipes")
      // get methode returned ein promise
      // das problem bei get ist nur dass diese methode kein realtime listener ist, das heißt es braucht immer einen refresh wenn die recipes bspw gelöscht werden
      // .get()
      // .then
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setError("No recipes to load");
            setIsPending(false);
          } else {
            let results = [];
            snapshot.docs.forEach((doc) => {
              results.push({ id: doc.id, ...doc.data() });
            });
            setData(results);
            setIsPending(false);
          }
        },
        // on snapshot hat nimmt als zweites argument eine error handling function
        (err) => {
          setError(err.message);
          setIsPending(false);
        }
      );
    // call der cleanup function
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}
