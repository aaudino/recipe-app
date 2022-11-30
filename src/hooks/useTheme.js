import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// dieser Hook is eigentlich nur zum error check da ansonsten führen wir ganz normal unseren custom hook ais
export const useTheme = () => {
  // useContext(ThemeContext) - returned die value prop
  // in useContext übergeben wir den Context und NICHT den Provider
  const context = useContext(ThemeContext);

  if (context === undefined) {
    // der context ist nur undefined wenn er außerhalb des scopes verwendet wird.
    //  dieser Context wird für die ganze app verwendet aber das muss nicht so sein
    throw new Error("useTheme() must be used inside a ThemeProvider");
  }

  return context;
};
