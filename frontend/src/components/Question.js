import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion, deleteQuestion } from "../actions/questions";
import QuestionDataService from "../services/question.service";
import { Button,Row, Col } from 'react-bootstrap'
import "./CSS/General.css"

const Question = (props) => {
  const initialQuestionState = {
    id: null,
    examId:"",
    qname:"",
    description:"",
    testcase1:"",
    testcase2:"",
    testcase3:"",
    testcase4:"",
    testcase5:"",
    output1:"",
    output2:"",
    output3:"",
    output4:"",
    output5:"",
    submitted: false
  };
  const [currentQuestion, setcurrentQuestion] = useState(initialQuestionState);
  const [message, setMessage] = useState("");
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const getQuestion = useCallback((id) => {
    if (questions.length !== 0){
      if(questions.filter( x  => x._id=== id)) {
      }
      setcurrentQuestion(questions.filter( x  => x._id=== id)[0]);
    }
    else{
    QuestionDataService.getQuestion(id)
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
        <div>
          <h4>Question</h4>
          {/* <form> */}
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
            <div>
            <Row className="mx-auto">
          <Col >
            <div className="form_group">
              <label htmlFor="testcase1">Test Case 1</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="testcase1"
                required
                value={currentQuestion.testcase1}
                onChange={handleInputChange}
                name="testcase1"
              />
          </div>
          <div className="form_group">
              <label htmlFor="testcase2">Test Case 2</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="testcase2"
                required
                value={currentQuestion.testcase2}
                onChange={handleInputChange}
                name="testcase2"
              />
          </div>
          <div className="form_group">
              <label htmlFor="testcase3">Test Case 3</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="testcase3"
                required
                value={currentQuestion.testcase3}
                onChange={handleInputChange}
                name="testcase3"
              />
          </div>
          <div className="form_group">
              <label htmlFor="testcase4">Test Case 4</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="testcase4"
                required
                value={currentQuestion.testcase4}
                onChange={handleInputChange}
                name="testcase4"
              />
          </div>
          <div className="form_group">
              <label htmlFor="testcase5">Test Case 5</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="testcase5"
                required
                value={currentQuestion.testcase5}
                onChange={handleInputChange}
                name="testcase5"
              />
          </div>
          </Col>
          <Col>
          <div className="form_group">
              <label htmlFor="output1">Output 1</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="output1"
                required
                value={currentQuestion.output1}
                onChange={handleInputChange}
                name="output1"
              />
          </div>
          <div className="form_group">
              <label htmlFor="output2">Output 2</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="output2"
                required
                value={currentQuestion.output2}
                onChange={handleInputChange}
                name="output2"
              />
          </div>
          <div className="form_group">
              <label htmlFor="output3">Output 3</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="output3"
                required
                value={currentQuestion.output3}
                onChange={handleInputChange}
                name="output3"
              />
          </div>
          <div className="form_group">
              <label htmlFor="output4">Output 4</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="output4"
                required
                value={currentQuestion.output4}
                onChange={handleInputChange}
                name="output4"
              />
          </div>
          <div className="form_group">
              <label htmlFor="output5">Output 5</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="output5"
                required
                value={currentQuestion.output5}
                onChange={handleInputChange}
                name="output5"
              />
          </div>
          </Col>
          </Row>
          </div>
          <div>
            <div className="form-group">
                <label htmlFor="description">Question</label>
                <textarea
                  className="input_width"
                  type="text"
                  style={{width:"100%", height:"300px" }}
                  id="description"
                  value={currentQuestion.description}
                  onChange={handleInputChange}
                  name="description"
                />
            </div>
            </div>
          {/* </form> */}

          <Button variant="danger" onClick={removeQuestion} >Delete</Button> {' '}
          <Button variant="warning" onClick={updateContent}>Update</Button>{' '}
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