import React, { useContext, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveQuestionsByEname } from "../actions/questions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { Badge } from 'react-bootstrap';
import Select from "react-select";
import { GlobalContext } from "../context/GlobalState";
import Editor from "./Editor";
import "./CSS/Editor.css"
import "./CSS/Options.css"
import "./CSS/Output.css";
import axios from "axios";
let userDetails = JSON.parse(localStorage.getItem("user"));

const ExamPage = (props) => {
  var passedCases = 0;
  const [currentQuestion, setcurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [outputStatus, setoutputStatus ] = useState(false);
  const [showResults, setshowResults] = useState(false);
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const { code } = useContext(GlobalContext);
  const { lang } = useContext(GlobalContext);
  const { result } = useContext(GlobalContext);
  const { handleLangChange } = useContext(GlobalContext);
  const { handleInputChange } = useContext(GlobalContext);
  const { input } = useContext(GlobalContext);
  const { displayOutput } = useContext(GlobalContext);
  const { download } = useContext(GlobalContext);


  var time = props.location.state.exam_time*60*1000;
  const history = useHistory()

  // setTimeout(() => {
  //   history.push('/allexams')
  // }, time)
  
  const options = [
    { value: "cpp", label: "cpp" },
    { value: "c", label: "c" },
    { value: "python", label: "python" },
    { value: "java", label: "java" }
  ];
  
  const codestate = {
    code: code,
    result: result,
    lang: lang,
    input: input,
    examid: props.location.state._id,
    questionid:props.match.params.id,
    userid: userDetails.id
  };

  const setActiveUser = (question, index) => {
    setcurrentQuestion(question);
    setCurrentIndex(index);
  };

  const onSubmitSingleTestCase = e =>  {
    e.preventDefault();
    alert("Submit Code");
    return new Promise((resolve, reject)=>{
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
          resolve(data.error)
        }
        displayOutput(data.output);
        resolve(data.output);
        
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  };

  const onSubmitHandler = async (inp)=>  {
    return new Promise((resolve, reject)=>{
      codestate.input = inp;
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
          resolve(data.error)
        }
        displayOutput(data.output);
        resolve(data.output);
        
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  };

  const checkresults = async (data,output) => {
    const result = data;
    // console.log(result);
    // console.log(output);
    if(result.trim()===output.trim()) 
    {
      console.log("testcase succeeded");
      setoutputStatus(true);
    }
    else 
    {
      console.log("testcase failed");
      setoutputStatus(false);
    }
    return outputStatus;
  }

  const temp_submit1 = async () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase1).then(
        res => {
        resolve(setoutputStatus(checkresults(res,currentQuestion.output1)));
        if(outputStatus) passedCases=+1;
        // console.log(outputStatus);
        // console.log(passedCases);
      })
    })
  }

  const temp_submit2 = async () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase2).then(
        res => {
        resolve(setoutputStatus(checkresults(res,currentQuestion.output2)));
        if(outputStatus) passedCases=+1;
      })
    })
  }

  const temp_submit3 = async () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase3).then(
        res => {
        resolve(setoutputStatus(checkresults(res,currentQuestion.output3)));
        if(outputStatus) passedCases=+1;
      })
    })
  }

  const temp_submit4 = async () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase4).then(
        res => {
        resolve(setoutputStatus(checkresults(res,currentQuestion.output4)));
        if(outputStatus) passedCases=+1;
      })
    })
  }

  const temp_submit5 = async () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase5).then(
        res => {
        resolve(setoutputStatus(checkresults(res,currentQuestion.output5)));
        if(outputStatus) passedCases=+1;
      })
    })
  }


  const submitall = async () => {
    passedCases=0;
    setshowResults(false);
    // console.log(showResults);
    temp_submit1().then(temp_submit2).then(temp_submit3).then(temp_submit4)
    .then(temp_submit5).then(setshowResults(true));
    // console.log(showResults);
    // new Promise((resolve,reject)=>
    // {
    //   resolve(
    //     onSubmitHandler(currentQuestion.testcase1).then(
    //       res => {
    //       setoutputStatus(checkresults(res,currentQuestion.output1));
    //       if(outputStatus) passedCases+=1;
    //     })
    //   )
    // }).then(
    //   onSubmitHandler(currentQuestion.testcase2).then(res => {
    //     setoutputStatus(checkresults(res,currentQuestion.output2));
    //      if(outputStatus) passedCases+=1;
    //     })
    // )    
  }

  useEffect(() => {
    dispatch(retrieveQuestionsByEname(props.location.state.ename));
  }, [props.location.state.ename, dispatch]);

  return (
    <div>
    <div className="">
      <div className="col-md-6">
        <h4>Questions List</h4>

        <ul className="list-group">
          {questions &&
            questions.map((question, index) => (
              <li
              className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(question, index)}
                key={index}
              >
                {question.qname}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentQuestion ? (
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
                      <strong>Output 1:</strong>
                    </label>{" "}
                    <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.output1}</div>
                  </div>
                  <div>
                    <label>
                      <strong>Test Case 2:</strong>
                    </label>{" "}
                    <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.testcase2}</div>
                  </div>
                  <div>
                    <label>
                      <strong>Output 2:</strong>
                    </label>{" "}
                    <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.output2}</div>
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
                {/* <button className="optionsbtn" onClick={async function(){onSubmitHandler().then(res => {
                    checkresults(res);
                })}}>
                  Run
                </button> */}
                <button className="optionsbtn" onClick={onSubmitSingleTestCase} >
                    Run
                </button>
      
                <button className="optionsbtn" onClick={download}>
                  Download
                </button>
                <button className="optionsbtn" onClick={submitall}>
                  Submit
                </button>
              </div>
            </div>
            <div className="outputarea" >
              <textarea className="textarea"  readOnly = {true} value={result} onChange={checkresults}></textarea>
            </div>
              {showResults? <div v-if="showResults">
                  <div>
                    <label>
                      <strong>Passed:</strong>
                    </label>
                    <div>{passedCases}</div>
                  </div>
                </div> : ' ' }
          </div>
        ) : (
            <div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ExamPage;