import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateExam, deleteExam } from "../actions/exam";
import ExamDataService from "../services/exam.service";
import { Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

const Exam = (props) => {
  const initialExamState = {
    id: null,
    userId:"",
    ename:"",
    exam_time:"",
    submitted: false
  };
  const [currentExam, setcurrentExam] = useState(initialExamState);
  const [message, setMessage] = useState("");
  const exams = useSelector(state => state.exams);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('10:00');
  const [EndTime, setEndTime] = useState('10:00');

  const getExam = useCallback((id) => {
    if (exams.length !== 0){
      if(exams.filter( x  => x._id=== id)) {
      }
      setcurrentExam(exams.filter( x  => x._id=== id)[0]);
    }
    else{
    ExamDataService.getExam(id)
      .then(response => {
        setcurrentExam(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  },[exams]);
  useEffect(() => {
    getExam(props.match.params.id);
  }, [props.match.params.id,getExam]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentExam({ ...currentExam, [name]: value });
  };

  const updateContent = () => {
    const ename = currentExam.ename;
    const exam_time = currentExam.exam_time;
    var day = startDate.getDate();
    var month = startDate.getMonth()+1;
    var year = startDate.getFullYear();
    const start_date = day+'-'+month+'-'+year;
    const start_time = startTime;
    const end_time = EndTime;
    dispatch(updateExam(currentExam._id,ename,start_date,start_time,end_time,exam_time))
      .then(response => {
        console.log(response);

        setMessage("The exam was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeExam = () => {
    dispatch(deleteExam(currentExam._id))
      .then(() => {
        props.history.push("/exams");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentExam ? (
        <div className="edit-form">
          <h4>Exam</h4>
          <form>

            <div className="form-group">
                <label htmlFor="ename">Exam Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="ename"
                    value={currentExam.ename}
                    onChange={handleInputChange}
                    name="ename"
                />
            </div>

            <div className="form-group">
                <label htmlFor="exam_time">Exam Time in minutes</label>
                <input
                    type="Number"
                    className="form-control"
                    id="exam_time"
                    value={currentExam.exam_time}
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

          </form>

          <Button variant="danger" onClick={removeExam} >Delete</Button> {' '}
          <Button variant="warning" onClick={updateContent}>Update</Button>{' '}
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Exam...</p>
        </div>
      )}
    </div>
  );
};

export default Exam;