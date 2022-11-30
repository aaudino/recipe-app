import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useTheme } from "../hooks/useTheme";

import "./Navbar.css";
import Searchbar from "./Searchbar";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  // der context wird über einen custom hook abgerufen. Das verpacken in einen Hook erlaubt es wieder eine custom logic einzubauen
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1> Cooking.com</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
