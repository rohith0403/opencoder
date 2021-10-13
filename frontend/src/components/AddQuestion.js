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
    ename:"",
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
  }, [dispatch]);
  
  const exams = useSelector(state => state.exams);

  const saveQuestion = () => {
    const { userId,ename,qname,description} = question;
    dispatch(createQuestion(userId,ename,qname,description))
      .then(data => {
        setQuestion({
          userId:userDetails.id,
          ename : data.ename,
          qname : data.qname,
          description : data.description,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const  changeExamName = async (eName) => {
    console.log("asdasdas   ",eName);
      await setQuestion({ ...question, ename: eName });
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
            id="ename"
            value={question.ename}
            onChange={handleInputChange}
            name="ename"
            >
              Exam
            </Dropdown.Toggle>

            <Dropdown.Menu>
     {exams.map(exam => (
       <Dropdown.Item href="#" onClick={()=>{changeExamName(exam.ename)}}>{exam.ename}</Dropdown.Item>
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