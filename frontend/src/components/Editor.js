import React, { useContext } from "react";
import MonacoEditor from 'react-monaco-editor';
import { GlobalContext } from "../context/GlobalState";
import $ from 'jquery';
import "./CSS/Editor.css"

function CodeArea({onCodeChangeHandler}) {
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

  

  $(document).ready(function() {
    const bclick = document.getElementById('editor');
    bclick.addEventListener('keydown', function(event) {
      var ctrlDown = event.ctrlKey||event.metaKey
      if (ctrlDown && (event.key === 'c' || event.key === 'C')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        alert("No copy!")
      }
      else if (ctrlDown && (event.key === 'v' || event.key === 'V')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        alert("No Paste!")
      }
      else if (ctrlDown && (event.key === 'x' || event.key === 'X')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        alert("No cut!")
      }
      else if (ctrlDown && (event.key === 'r' || event.key === 'R')) {
        event.stopImmediatePropagation();
        event.preventDefault();
        alert("No Refresh!")
      }
    },false);
  });
  
  return (
    <>
      <div className="codearea">
        <div className="codewritearea" id="editor">
          <MonacoEditor       
            width="700"
            height="80vh"
            left= "50%"
            theme="vs-dark"
            value={code}
            options={options}
            editorDidMount={editorDidMount}
            onChange={newCode => handleCodeChange(newCode)}
          />
        </div>
      </div>
    </>
  );
}

export default CodeArea;