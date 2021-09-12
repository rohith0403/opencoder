import React, { useContext } from "react";
import MonacoEditor from "@monaco-editor/react";
import { GlobalContext } from "../context/GlobalState";
import Options from "./Options";
// import "../CSS/CodeArea.css";

function CodeArea({ onCodeChangeHandler }) {
  const { code } = useContext(GlobalContext);

  const { lang } = useContext(GlobalContext);

  const { handleCodeChange } = useContext(GlobalContext);

  const inputChangeHandler = e => {
    return {
      input: e.target.value
    };
  };

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


  return (
    <>
      <div className="codearea">
        <Options/>
        <div className="codewritearea">
          <MonacoEditor
            width="100%"
            height="80vh"
            // defaultlanguage = "cpp"
            theme="hc-black"
            value={code}
            options={options}
            onChange={newCode => handleCodeChange(newCode)}
            editorDidMount={editorDidMount}
          />
        </div>
      </div>
    </>
  );
}

export default CodeArea;