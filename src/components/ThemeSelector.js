import "./ThemeSelector.css";
import { useTheme } from "../hooks/useTheme";

import React from "react";

import modeIcon from "../assets/mode-icon.svg";

export default function ThemeSelector() {
  const { changeColor, mode, changeMode } = useTheme();
  const themeColors = ["#58249c", "#249c6b", "#b70233"];

  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          onClick={toggleMode}
          alt="dark/white mode toggle"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => {
          return (
            <div
              style={{ background: color }}
              key={color}
              onClick={() => {
                changeColor(color);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
