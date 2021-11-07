import React, { useState, useEffect } from "react";
import { createQuestion } from "../actions/questions";
import { useDispatch, useSelector } from "react-redux";
import { retrieveProfExams,} from "../actions/exam";
import { Dropdown, } from 'react-bootstrap';
import "./CSS/General.css"

let userDetails = JSON.parse(localStorage.getItem("user"));
const AddQuestion = () => {
  const initialQuestionState = {
    id: null,
    userId: userDetails.id,
    ename:"",
    qname:"",
    description:"",
    t1:"",
    t2:"",
    t3:"",
    t4:"",
    t5:"",
    o1:"",
    o2:"",
    o3:"",
    o4:"",
    o5:"",
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
    const { userId,ename,qname,description,t1,t2,t3,t4,t5,o1,o2,o3,o4,o5} = question;
    dispatch(createQuestion(userId,ename,qname,description,t1,t2,t3,t4,t5,o1,o2,o3,o4,o5))
      .then(data => {
        setQuestion({
          userId:userDetails.id,
          ename : data.ename,
          qname : data.qname,
          description : data.description,
          t1: data.t1,
          t2: data.t2,
          t3: data.t3,
          t4: data.t4,
          t5: data.t5,
          o1: data.o1,
          o2: data.o2,
          o3: data.o3,
          o4: data.o4,
          o5: data.o5,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const  changeExamName = async (eName) => {
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
          <div className="right">
          <div className="form_group">
              <label htmlFor="t1">Test Case 1</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="t1"
                required
                value={question.t1}
                onChange={handleInputChange}
                name="t1"
              />
          </div>
          <div className="form_group">
              <label htmlFor="t2">Test Case 2</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="t2"
                required
                value={question.t2}
                onChange={handleInputChange}
                name="t2"
              />
          </div>
          <div className="form_group">
              <label htmlFor="t3">Test Case 3</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="t3"
                required
                value={question.t3}
                onChange={handleInputChange}
                name="t3"
              />
          </div>
          <div className="form_group">
              <label htmlFor="t4">Test Case 4</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="t4"
                required
                value={question.t4}
                onChange={handleInputChange}
                name="t4"
              />
          </div>
          <div className="form_group">
              <label htmlFor="t5">Test Case 5</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="t5"
                required
                value={question.t5}
                onChange={handleInputChange}
                name="t5"
              />
          </div>
          <div className="form_group">
              <label htmlFor="o1">Output 1</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="o1"
                required
                value={question.o1}
                onChange={handleInputChange}
                name="o1"
              />
          </div>
          <div className="form_group">
              <label htmlFor="o2">Output 2</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="o2"
                required
                value={question.o2}
                onChange={handleInputChange}
                name="o2"
              />
          </div>
          <div className="form_group">
              <label htmlFor="o3">Output 3</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="o3"
                required
                value={question.o3}
                onChange={handleInputChange}
                name="o3"
              />
          </div>
          <div className="form_group">
              <label htmlFor="o4">Output 4</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="o4"
                required
                value={question.o4}
                onChange={handleInputChange}
                name="o4"
              />
          </div>
          <div className="form_group">
              <label htmlFor="o5">Output 5</label>
              <textarea
                type="text"
                className="input_width_testcase"
                id="o5"
                required
                value={question.o5}
                onChange={handleInputChange}
                name="o5"
              />
          </div>
          </div>
          <div className="left">
          <div className="form_group">
              <label htmlFor="description">Question</label>
              <textarea
                type="text"
                className="input_width"
                id="description"
                required
                value={question.description}
                onChange={handleInputChange}
                name="description"
                />
          </div>
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