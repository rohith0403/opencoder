import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import QuestionDataService from "../services/question.service";
import Editor from "./Editor"


const ViewQuestion = (props) => {
    const initialQuestionState = {
        id: null,
        examId:"",
        qname:"",
        description:"",
        submitted: false
      };
  const [currentQuestion, setcurrentQuestion] = useState(initialQuestionState);
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
    <div className="list row">
      <div className="col-md-6">
        {currentQuestion ? (
            <div>
              <label>
                <strong>Question:</strong>
              </label>{" "}
              {currentQuestion.description}
            </div>
        ) : (
            <div>
          </div>
        )}
      </div>
    </div>
    <Editor/>
    </div>
  );
};

export default ViewQuestion;