import React, { useContext } from "react";
// import MonacoEditor from "react-monaco-editor";
import MonacoEditor from "@monaco-editor/react";
import { GlobalContext } from "../context/GlobalState";
// import "../CSS/CodeArea.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
function Editor({ onCodeChangeHandler }) {
  const { code } = useContext(GlobalContext);

//   const { lang } = useContext(GlobalContext);

  const { handleCodeChange } = useContext(GlobalContext);

  const inputChangeHandler = e => {
    return {
      input: e.target.value
    };
  };

  const setdefaultlanguage = e => {
    return {
      defaultLanguage: e.target.value
    };
    };
  
  const onLangSelectHandler = (e) => {
      const lang = e.target.value
      this.setState({
          lang,
          code: code[lang]
      })
  }
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

  const languages = [
    'python',
    'java',
    'c',
    'cpp'
  ];

  const editorDidMount = e => {
    console.log("Editor Mounted");
  };

  return (
    <>
      <div className="codearea">
        <div className="codewritearea">
        <Dropdown options={languages} onChange={onLangSelectHandler} value={languages[0]} placeholder="Select an option" />
          <MonacoEditor
            width="100%"
            height="80vh"
            defaultLanguage= {languages[0]}
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

export default Editor;