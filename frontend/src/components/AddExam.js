import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExam } from "../actions/exam";
let userDetails = JSON.parse(localStorage.getItem("user"));
const AddExam = () => {
  const initialExamState = {
    id: null,
    userId: userDetails.id,
    ename:"",
    submitted: false
  };
  const [exam, setExam] = useState(initialExamState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    // console.log(name, value);
    setExam({ ...exam, [name]: value });
  };
  const saveExam = () => {
    const { userId,ename} = exam;
    dispatch(createExam(userId,ename))
      .then(data => {
        setExam({
          userId:userDetails.id,
          ename : data.ename,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newExam = () => {
    setExam(initialExamState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newExam}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="ename">Exam Name</label>
            <input
              type="text"
              className="form-control"
              id="ename"
              required
              value={exam.ename}
              onChange={handleInputChange}
              name="ename"
            />
          </div>

          <button onClick={saveExam} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExam;