import React, { useState, useEffect } from "react";
import { createQuestion } from "../actions/questions";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProfExams,} from "../actions/exam";
import { Dropdown, } from 'react-bootstrap';

let userDetails = JSON.parse(localStorage.getItem("user"));
const AddQuestion = () => {
  const initialQuestionState = {
    id: null,
    userId: userDetails.id,
    examId:"",
    qname:"",
    description:"",
    submitted: false
  };
  const [question, setQuestion] = useState(initialQuestionState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };
  useEffect(() => {
    dispatch(retrieveProfExams(userDetails.id));
  }, []);
  const exams = useSelector(state => state.exams);
  console.log(exams);
  const saveQuestion = () => {
    const { userId,examId,qname,description} = question;
    dispatch(createQuestion(userId,examId,qname,description))
      .then(data => {
        setQuestion({
          userId:userDetails.id,
          examId : data.examId,
          qname : data.qname,
          description : data.description,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newQuestion = () => {
    setQuestion(initialQuestionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newQuestion}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="dropdown" id="roleDropdown">
          <Dropdown>
            <Dropdown.Toggle 
            variant="success" 
            id="examId"
            value={question.examId}
            onChange={handleInputChange}
            name="examId"
            >
              Exam
            </Dropdown.Toggle>

            <Dropdown.Menu>
     {exams.map(exam => (
       <Dropdown.Item>{exam.ename}</Dropdown.Item>
     ))}
   </Dropdown.Menu>
          </Dropdown>
          </div>

          <div className="form-group">
            <label htmlFor="qname">Question Name</label>
            <input
              type="text"
              className="form-control"
              id="qname"
              required
              value={question.qname}
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
                required
                value={question.description}
                onChange={handleInputChange}
                name="description"
              />
          </div>

          <button onClick={saveQuestion} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestion;