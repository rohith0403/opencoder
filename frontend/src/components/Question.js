import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion, deleteQuestion } from "../actions/questions";
import QuestionDataService from "../services/question.service";

const Question = (props) => {
  const initialQuestionState = {
    id: null,
    examId:"",
    qname:"",
    description:"",
    submitted: false
  };
  const [currentQuestion, setcurrentQuestion] = useState(initialQuestionState);
  const [message, setMessage] = useState("");
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const getQuestion = id => {
    if (questions.length !== 0){
      if(questions.filter( x  => x._id=== id)) {
        // TODO: 505 code
      }
      setcurrentQuestion(questions.filter( x  => x._id=== id)[0]);
    }
    else{
    QuestionDataService.getQuestion(id)
      .then(response => {
        setcurrentQuestion(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };
  useEffect(() => {
    getQuestion(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateQuestion(currentQuestion._id, currentQuestion))
      .then(response => {
        console.log(response);

        setMessage("The question was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeQuestion = () => {
      console.log(currentQuestion._id);
    dispatch(deleteQuestion(currentQuestion._id))
      .then(() => {
        props.history.push("/questions");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentQuestion ? (
        <div className="edit-form">
          <h4>Question</h4>
          <form>
          <div className="form-group">
                <label htmlFor="examId">Exam</label>
                <input
                    type="text"
                    className="form-control"
                    id="examId"
                    value={currentQuestion.examId}
                    onChange={handleInputChange}
                    name="examId"
                />
            </div>

            <div className="form-group">
                <label htmlFor="qname">Question Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="qname"
                    value={currentQuestion.qname}
                    onChange={handleInputChange}
                    name="qname"
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Question</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentQuestion.description}
                  onChange={handleInputChange}
                  name="description"
                />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeQuestion}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Question...</p>
        </div>
      )}
    </div>
  );
};

export default Question;