import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import "./CSS/Output.css";

function OutputArea() {
  const { result } = useContext(GlobalContext);
  return (
    <div className="outputarea">
      {console.log("output area " + result)}
      <textarea className="textarea" value={result}></textarea>
    </div>
  );
}

export default OutputArea;