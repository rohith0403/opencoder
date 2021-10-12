import React, { useContext } from "react";
// import MonacoEditor from "@monaco-editor/react";
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from "../context/GlobalState";
import Options from "./Options";
import Output from "./Output";

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
    console.log("Editor Mounted");
  };

  const handleCopy = (e) => {
    e.preventDefault();
    console.log("No copy")
    e.nativeEvent.stopImmediatePropagation();
    alert('Don\'t copy it!');
  };
  return (
    <>
      <div className="codearea">
        <Options/>
        <div className="codewritearea">
          <MonacoEditor
            // onCut={handleChange}
            onCopy={handleCopy}
            onPaste={handleCopy}          
            width="50%"
            height="80vh"
            left= "50%"
            // defaultlanguage = "cpp"
            theme="vs-dark"
            value={code}
            options={options}
            onChange={newCode => handleCodeChange(newCode)}
            editorDidMount={editorDidMount}
            onpaste="return false"
          />
        </div>
        <Output/>
      </div>
    </>
  );
}

export default CodeArea;