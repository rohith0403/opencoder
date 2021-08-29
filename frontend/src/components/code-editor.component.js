import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import {split as SplitEditor} from 'react-ace';
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import 'brace/mode/javascript'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log("change", newValue);
}

// Render editor
export default class Editor extends Component{
  render() {
    return (
        <div>
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={onChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
              }}
            />
        </div>
    );
}
}
