import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import QuestionDataService from "../services/question.service";
import Editor from "./Editor"
import Select from "react-select";
import axios from "axios";
import "./CSS/Editor.css"
import "./CSS/Options.css"
import { GlobalContext } from "../context/GlobalState";
import Output from "./Output";
let userDetails = JSON.parse(localStorage.getItem("user"));


const ViewQuestion = (props) => {
    const initialQuestionState = {
        id: null,
        examId:"",
        qname:"",
        description:"",
        testcase1:"",
        submitted: false
      };
  const [currentQuestion, setcurrentQuestion] = useState(initialQuestionState);
  const { code } = useContext(GlobalContext);
  const { lang } = useContext(GlobalContext);
  const { result } = useContext(GlobalContext);
  const { handleLangChange } = useContext(GlobalContext);
  const { handleInputChange } = useContext(GlobalContext);
  const { input } = useContext(GlobalContext);
  const { displayOutput } = useContext(GlobalContext);
  const { download } = useContext(GlobalContext);

  const codestate = {
    code: code,
    result: result,
    lang: lang,
    input: input,
    examid: props.location.state._id,
    questionid:props.match.params.id,
    userid: userDetails.id
  };
  const options = [
    { value: "cpp", label: "cpp" },
    { value: "c", label: "c" },
    { value: "python", label: "python" },
    { value: "java", label: "java" }
  ];

  const onSubmitHandler = e => {
    e.preventDefault();
    alert("Submit Code");
    axios
      .post(`http://127.0.0.1:8080/api/code/submit`, codestate)
      .then(res => {
        const data = res.data;

        if (data.err) {
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
  const questions = useSelector(state => state.questions);
  const getQuestion = useCallback((id) => {
    if (questions.length !== 0){
      if(questions.filter( x  => x._id=== id)) {
      }
      setcurrentQuestion(questions.filter( x  => x._id=== id)[0]);
    }
    else{
    QuestionDataService.getQuestionForStudents(id)
      .then(response => {
        setcurrentQuestion(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },[questions]);
  useEffect(() => {
    getQuestion(props.match.params.id);
  }, [props.match.params.id,getQuestion]);

  return (
    <div>
    <div className="container">
      <div className="question">
        {currentQuestion ? (
          <div>
            <div>
              <label>
                <strong>Question:</strong>
              </label>{" "}
              <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.description}</div>
            </div>
            <div>
              <label>
                <strong>Test Case 1:</strong>
              </label>{" "}
              <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.testcase1}</div>
            </div>
            <div>
              <label>
                <strong>Test Case 2:</strong>
              </label>{" "}
              <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.testcase2}</div>
            </div>
          </div> 
            
        ) : (
            <div>
          </div>
        )}
      </div>
      <div className="options">
        <div className="optionsbox1">
            <Select
            options={options}
            onChange={option => handleLangChange(option.value)}
          />
        </div>
      </div>
      <Editor/>
      <div>
        <div className="optionsbox2">
          <textarea
            className="optionswritearea"
            placeholder={input}
            onChange={e => {
              handleInputChange(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="btncont">
        {/* type="button" class="btn btn-secondary" */}
          <button className="optionsbtn" onClick={onSubmitHandler}>
            Run
          </button>

          <button className="optionsbtn" onClick={download}>
            Download
          </button>
        </div>
      </div>
      <div>
        <Output/>
      </div>
    </div>
    </div>
  );
};

export default ViewQuestion;