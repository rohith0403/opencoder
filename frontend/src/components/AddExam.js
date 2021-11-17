import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../actions/exam";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "react-datepicker/dist/react-datepicker.css";

let userDetails = JSON.parse(localStorage.getItem("user"));
const AddExam = () => {
  const initialExamState = {
    id: null,
    userId: userDetails.id,
    ename:"",
    start_date:"",
    start_time:"",
    end_time:"",
    exam_time:"",
    submitted: false
  };
  const [exam, setExam] = useState(initialExamState);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('10:00');
  const [EndTime, setEndTime] = useState('10:00');
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector(state => state.message);
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setExam({ ...exam, [name]: value });
  };
  const saveExam = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    const { userId,ename,exam_time} = exam;
    var day = startDate.getDate();
    var month = startDate.getMonth()+1;
    var year = startDate.getFullYear();
    const start_date = day+'-'+month+'-'+year;
    const start_time = startTime;
    const end_time = EndTime;
    if (checkBtn.current.context._errors.length === 0) {
    dispatch(createExam(userId,ename,start_date,start_time,end_time,exam_time))
      .then(data => {
        setExam({
          userId:userDetails.id,
          ename : data.ename,
          start_date : data.start_date,
          start_time : data.start_time,
          end_time : data.end_time,
          exam_time : data.exam_time
        });
        setSubmitted(true);
      })
      .catch(err => {
        console.log(err);
      });
    }
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
            Add Another Exam
          </button>
        </div>
      ) : (
        <div>
          <Form onSubmit={saveExam} ref={form}>
          {!successful && (
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

          <div className="form-group">
            <label htmlFor="exam_time">Exam time in minutes</label>
            <input
              type="Number"
              className="form-control"
              id="exam_time"
              required
              value={exam.exam_time}
              onChange={handleInputChange}
              name="exam_time"
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_date">Date</label>
            <DatePicker 
              selected={startDate}
              required
              minDate={new Date()}
              placeholderText="Please select a date"
              onChange={(date) => setStartDate(date)}
              format='yyyy-MM-dd'
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_time">Start Time</label>
            <TimePicker
              selected={startTime}
              onChange={(time) =>setStartTime(time)}
              showTimeSelect
              locale="sv-sv"
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_time">End Time</label>
            <TimePicker
              selected={EndTime}
              onChange={(time) =>setEndTime(time)}
              showTimeSelect
              locale="sv-sv"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block">Submit</button>
          </div>
          </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddExam;