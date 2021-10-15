import React, { useContext } from "react";
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from "../context/GlobalState";
import Options from "./Options";
import Output from "./Output";
import "./CSS/Editor.css"

function CodeArea({ onCodeChangeHandler }) {
  const { code } = useContext(GlobalContext);

  const { handleCodeChange } = useContext(GlobalContext);

  const options = {
    selectOnLineNumbers: true,
    renderIndentGuides: true,
    colorDecorators: true,
    cursorBlinking: "blink",
    autoClosingQuotes: "always",
    find: {
      autoFindInSelection: "always"
    },
    snippetSuggestions: "inline"
  };

  const editorDidMount = e => {
    // console.log("Editor Mounted");
  };

  const handleCopy = (e) => {
    console.log("No copy");
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    alert('Don\'t copy it!');
  };
  return (
    <>
      <div className="codearea">
        <Options/>
        <div className="codewritearea">
          <MonacoEditor       
            onCut={handleCopy}
            onCopy={handleCopy}
            onPaste={handleCopy}
            width="50%"
            height="80vh"
            left= "50%"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={newCode => handleCodeChange(newCode)}
            editorDidMount={editorDidMount}
          />
        </div>
        <Output/>
      </div>
    </>
  );
}

export default CodeArea;