import React, { useContext } from "react";
// import "../CSS/Options.css";
import { GlobalContext } from "../context/GlobalState";
// import secret from "../secret";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from "react-select";
import axios from "axios";

function Options() {
  const { code } = useContext(GlobalContext);
  const { lang } = useContext(GlobalContext);
  const { result } = useContext(GlobalContext);
  const { handleLangChange } = useContext(GlobalContext);
  const { handleInputChange } = useContext(GlobalContext);
  const { input } = useContext(GlobalContext);
  const { displayOutput } = useContext(GlobalContext);
  const { download } = useContext(GlobalContext);
  const { loadPreviousInput } = useContext(GlobalContext);
  const { storePreviousInput } = useContext(GlobalContext);

  const state = {
    code: code,
    result: result,
    lang: lang,
    input: input
  };

  console.log(state);
  
  // const options = ["python", "java", "cpp", "c", "javascript"];
  // const defaultOption = options[0];

  const options = [
    { value: "python", label: "python" },
    { value: "java", label: "java" },
    { value: "cpp", label: "cpp" },
    { value: "c", label: "c" }
  ];

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(GlobalContext);
    // handleLangChange("java");
    alert("Submit Code");
    // axios
    //   .post(`${secret.url}code/submit`, state)
    //   .then(res => {
    //     console.log("this is it" + JSON.stringify(res.data));
    //     const data = res.data;

    //     if (data.err) {
    //       // Error in user code
    //       console.log("options" + state);
    //       if (
    //         data.output ==
    //         "RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded"
    //       ) {
    //         alert("Possible infinite loop or recurssion call");
    //       }
    //       displayOutput(data.error);
    //     }
    //     displayOutput(data.output);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };



  return (
    <>
      <div className="options">
        <div className="optionsbox1">
          <div className="btncont">
            <button className="optionsbtn" onClick={onSubmitHandler}>
              Run
              <span className="btnicon">
                <img src="" />
              </span>
            </button>

            <button className="optionsbtn" onClick={download}>
              Download
              <span className="btnicon">
                <img src="" />
              </span>
            </button>
            <button className="optionsbtn" onClick={storePreviousInput}>
              Store Input
            </button>
            <button className="optionsbtn" onClick={loadPreviousInput}>
              Load Input
            </button>
          </div>
          {/* <Dropdown
            className="dropdwn"
            options={options}
            onChange={option => handleLangChange(option.value)}
          /> */}
          <Select
            className="select"
            options={options}
            onChange={option => handleLangChange(option.value)}
          />
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