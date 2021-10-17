import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import 'react-dropdown/style.css';
import Select from "react-select";
import axios from "axios";
import "./CSS/Options.css"

function Options() {
  const { code } = useContext(GlobalContext);
  const { lang } = useContext(GlobalContext);
  const { result } = useContext(GlobalContext);
  const { handleLangChange } = useContext(GlobalContext);
  const { handleInputChange } = useContext(GlobalContext);
  const { input } = useContext(GlobalContext);
  const { displayOutput } = useContext(GlobalContext);
  const { download } = useContext(GlobalContext);

  const state = {
    code: code,
    result: result,
    lang: lang,
    input: input
  };

  const options = [
    { value: "cpp", label: "cpp" },
    { value: "c", label: "c" },
    { value: "python", label: "python" },
    { value: "java", label: "java" }
  ];

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(GlobalContext);
    alert("Submit Code");
    axios
      .post(`http://127.0.0.1:8080/api/code/submit`, state)
      .then(res => {
        console.log("this is it" + JSON.stringify(res.data));
        const data = res.data;

        if (data.err) {
          console.log("options" + state);
          if (
            data.output ===
            "RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded"
          ) {
            alert("Possible infinite loop or recurssion call");
          }
          displayOutput(data.error);
        }
        displayOutput(data.output);
      })
      .catch(err => {
        console.log(err);
      });
  };



  return (
    <>
      <div className="options">
        <div className="optionsbox1">
            <Select
            options={options}
            onChange={option => handleLangChange(option.value)}
          />

          <div className="btncont">
            <button className="optionsbtn" onClick={onSubmitHandler}>
              Run
            </button>

            <button className="optionsbtn" onClick={download}>
              Download
            </button>
            {/* <button className="optionsbtn" onClick={storePreviousInput}>
              Store Input
            </button>
            <button className="optionsbtn" onClick={loadPreviousInput}>
              Load Input
            </button> */}
          </div>
        </div>
        <div className="optionsbox2">
          <textarea
            className="optionswritearea"
            placeholder={input}
            onChange={e => {
              handleInputChange(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default Options;