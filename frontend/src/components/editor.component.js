import React, { Component } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

export default class MonacoEditor extends Component {
    constructor(props) {
        super(props);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.handleEditorDidMount = this.handleEditorDidMount.bind(this);
        this.handleEditorWillMount = this.handleEditorWillMount.bind(this);
        this.handleEditorValidation = this.handleEditorValidation.bind(this);
      }
    handleEditorChange(value, event) {
    // here is the current value
  }

   handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco)
  }

   handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

   handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  render(){
      return (
          <Editor
          height="90vh"
          defaultLanguage="cpp"
          defaultValue="// some comment"
          onChange={this.handleEditorChange}
          onMount={this.handleEditorDidMount}
          beforeMount={this.handleEditorWillMount}
          onValidate={this.handleEditorValidation}
          />
          );
    }
}