import { createContext, useReducer } from "react";

// erstellen ein Context Object
export const ThemeContext = createContext();

// damit der value dynamisch ist könnte man es in einen State packen
// alternativ kann man einen Reducer verwenden. Ein reducer ist nur eine function
// States sind ungünstig wenn man mehrere states updaten muss. in einem reducer kann man alles in einem erledigen und braucht nicht x states
// diese function nimmt zwei arguments
// den state
// und die action - dieses ist das Object, dass mit der dispatch übergeben wird
const themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      // alle properties vom State werden übergeben und überschreiben den payload
      //   damit updaten wir den state vom usereducer hook
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      // wir brauchen den state , da  ansonsten mode zum state object werden würde und dieses die color property nicht hat und vv
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

// diese Function ist eine gewöngliche Prob
// Man kann daher auf die children zugreifen und diese rendern
// Man könnte den Provider auch direct um die App componentn bauen
// Durch das erstellen einer custom component kann man eine custom logic einbauen
export default function ThemeProvider({ children }) {
  // state entsprciht dem default value (dem Object mit color blue)
  // die dispatch (versenden) function, die dispatch function ist verantwortlich um den themereducer zu callen
  // themereducer ist die function die den state updated
  const [state, dispatch] = useReducer(themeReducer, {
    color: "#58249",
    mode: "dark",
  });

  const changeColor = (color) => {
    // wir können zwei properties übergeben
    // type: ist was wir machen wollen
    // payload: ist der Wert von dem was wir ändern wollen
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };
  return (
    // state und changecolor werden an den context hook übergeben, sodass dieser wert von allen components verwendet werden kann
    // jede componente die diesen value verwenden renrendern wenn sich dieser value ändert
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
