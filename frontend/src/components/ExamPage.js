import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveQuestionsByEname } from "../actions/questions";
import { createMarks,getMarksCustom,updateMarks } from "../actions/marks";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import Editor from "./Editor";
import "./CSS/Editor.css";
import "./CSS/Options.css";
import "./CSS/Output.css";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
let userDetails = JSON.parse(localStorage.getItem("user"));

const ExamPage = (props) => {
  var outputStatus = false;
  const [runStatus,setrunStatus] = useState("Submit to see passed cases");
  const [currentQuestion, setcurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [passedCases, setpassedCases] = useState(0);
  const questions = useSelector(state => state.questions);
  var marks = useSelector(state => state.marks);
  const { code } = useContext(GlobalContext);
  const { lang } = useContext(GlobalContext);
  const { result } = useContext(GlobalContext);
  const { handleLangChange } = useContext(GlobalContext);
  const { handleInputChange } = useContext(GlobalContext);
  const { input } = useContext(GlobalContext);
  const { displayOutput } = useContext(GlobalContext);
  const { download } = useContext(GlobalContext);
  const nMinuteSeconds = 60;
  const nSecondInMiliseconds = 1000;
  const dispatch = useDispatch();
  const convertMinutesToMiliseconds = (minute) => minute * nMinuteSeconds * nSecondInMiliseconds;
  const convertMilisecondsToHour = (miliseconds) => new Date(miliseconds).toISOString().slice(11, -5);

  let [timerCount, setTimerCount] = useState(convertMinutesToMiliseconds(props.location.state.exam_time));
  let interval;
  var time = props.location.state.exam_time*60*1000;
  const history = useHistory()

  setTimeout(() => {
    history.push({
      pathname:'/marks',
      state:{exam:props.location.state}})
  }, time)

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
    questionid: props.match.params.id,
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
      codestate.questionid = currentQuestion._id;
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
      codestate.questionid = currentQuestion._id;
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

  const checkresults = (data,output) => {
    const result = data;
    if(result.trim()===output.trim()) outputStatus=true;
    else outputStatus=false;
    return outputStatus;
  }

  const temp_submit1 = () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase1).then(
        res => {
        outputStatus = (checkresults(res,currentQuestion.output1));
        resolve(outputStatus);
        })
      })
  }

  const temp_submit2 = () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase2).then(
        res => {
          outputStatus = (checkresults(res,currentQuestion.output2));
          resolve(outputStatus);
      })
    })
  }

  const temp_submit3 = () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase3).then(
        res => {
          outputStatus = (checkresults(res,currentQuestion.output3));
          resolve(outputStatus);
      })
    })
  }

  const temp_submit4 = () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase4).then(
        res => {
          outputStatus = (checkresults(res,currentQuestion.output4));
          resolve(outputStatus);
      })
    })
  }

  const temp_submit5 = () =>{
    return new Promise((resolve) => {
      onSubmitHandler(currentQuestion.testcase5).then(
        res => {
          outputStatus = (checkresults(res,currentQuestion.output5));
          resolve(outputStatus);
      })
    })
  }

  const getMarks = () => {
      dispatch(getMarksCustom(userDetails.id,props.location.state._id))
  }

  const submitall = () => {
    getMarks()
    let localPassedCases=0;
    setrunStatus("Running");
    setpassedCases(localPassedCases);
      temp_submit1().then( data => {
        if(data){
          localPassedCases+=1;
          setpassedCases(localPassedCases);
        } 
        temp_submit2().then(data => {
        if(data) {
          localPassedCases+=1;
          setpassedCases(localPassedCases);
        }
          temp_submit3().then(data => {
            if(data){
              localPassedCases+=1;
              setpassedCases(localPassedCases);
            }
              temp_submit4().then(data=>{
                if(data){
                  localPassedCases+=1;
                  setpassedCases(localPassedCases);
                }
                  temp_submit5().then(data=>{
                      if(data){
                        localPassedCases+=1;
                        setpassedCases(localPassedCases);
                      }
                      let temp_id=true;
                      for(let i=0;i<marks.length;i++)
                      {
                        if(marks[i].questionId===currentQuestion._id)
                        {
                          dispatch(updateMarks(marks[i]._id,userDetails.id,props.location.state._id,
                          currentQuestion._id,userDetails.username,props.location.state.ename,currentQuestion.qname,Math.max(localPassedCases,marks[i].marks)));
                          temp_id=false;
                          break;
                        } 
                      }
                      if(temp_id) dispatch(createMarks(userDetails.id,props.location.state._id,currentQuestion._id,userDetails.username,props.location.state.ename,currentQuestion.qname,localPassedCases))
                      setrunStatus("Done");
                    })
                })
            })
        }) 
      })    
  }

  useEffect(() => {
    dispatch(retrieveQuestionsByEname(props.location.state.ename));
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      if (timerCount === 0 && interval) {
        clearInterval(interval);
      }

      setTimerCount((timerCount -= nSecondInMiliseconds));
    }, nSecondInMiliseconds);
  }, [props.location.state.ename, dispatch]);

  return (
    <div>
    <div className="timer">TimeLeft : {convertMilisecondsToHour(timerCount)}</div>
    {/* <button className="timer" onClick={}>Submit</button> */}
    <div className="timer">
    <Link
              to={{
                pathname: "/marks",
                state : {exam:props.location.state}
              }}
              className="badge badge-warning"
            >
            <Badge bg="success" text="dark">
              Submit
            </Badge>{' '}
            </Link>
      </div> 
    <div className="exampage" >
      <div className="left">
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
      <div className="right">
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
            <div className="cases">Status : {runStatus}</div>
            <div className="cases">Passed Cases : {passedCases} out of 5</div>
            <div className="cases"> <br /></div>
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