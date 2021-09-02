import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../actions/questions";
let userDetails = JSON.parse(localStorage.getItem("user"));
const AddQuestion = () => {
  const initialQuestionState = {
    id: null,
    userId: userDetails.id,
    qname:"",
    description:"",
    submitted: false
  };
  const [question, setQuestion] = useState(initialQuestionState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    setQuestion({ ...question, [name]: value });
  };
  const saveQuestion = () => {
    const { userId,qname,description} = question;
    dispatch(createQuestion(userId,qname,description))
      .then(data => {
        setQuestion({
          userId:userDetails.id,
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