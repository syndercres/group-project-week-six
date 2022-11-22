import React from "react";
import ReactDOM from "react-dom";
import GameOfThrones from "./components/gameOfThrones";
import DisplayShows from "./components/showDisplay";

ReactDOM.render(
  <React.StrictMode>
    <GameOfThrones />
    <DisplayShows />
  </React.StrictMode>,
  document.getElementById("root")
);
