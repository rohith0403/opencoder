import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findExamsByEnameByStudents,retrieveExamsByStudents } from "../actions/exam";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
const Homepage = () => {
  const [currentExam, setcurrentExam] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEname, setsearchEname] = useState("");
  const [startexam, setstartExam] = useState(true);
  const exams = useSelector(state => state.exams);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(retrieveExamsByStudents());
  }, [dispatch]);

  const onChangesearchEName = e => {
    const searchEname = e.target.value;
    setsearchEname(searchEname);
  };

  const refreshData = () => {
    setcurrentExam(null);
    setCurrentIndex(-1);
  };

  const setActiveExam = (exam, index) => {
    setcurrentExam(exam);
    setCurrentIndex(index);
    var currentDateWithFormat = new Date();
    var day = currentDateWithFormat.getDate();
    var month = currentDateWithFormat.getMonth()+1;
    var year = currentDateWithFormat.getFullYear();
    var hours = currentDateWithFormat.getHours();
    var minutes = currentDateWithFormat.getMinutes();
    var time = hours+':'+minutes;
    const startDate = day+'-'+month+'-'+year;
      // if (exam.start_date === startDate && exam.start_time <= time && exam.end_time >= time) {
      //   setstartExam(true);
      // } else {
      //   setstartExam(false);
      // }
  };

  const findByEName = () => {
    refreshData();
    dispatch(findExamsByEnameByStudents(searchEname));
  };

  return (
    <div>
      <div style={{ 
      backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSySC6u-UsTKekPEFZVzsO73wQhieW8xHHpg&usqp=CAU")` 
      }}>
      </div>
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by exam name"
            value={searchEname}
            onChange={onChangesearchEName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByEName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Exams List</h4>

        <ul className="list-group">
          {exams &&
            exams.map((exam, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveExam(exam, index)}
                key={index}
              >
                {exam.ename}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentExam ? (
          <div>
            <h4>Exam</h4>
            <div>
              <label>
                <strong>Exam Name:</strong>
              </label>{" "}
              {currentExam.ename}
            </div>
            <div>
              <label>
                <strong>Start Date:</strong>
              </label>{" "}
              {currentExam.start_date}
            </div>
            <div>
              <label>
                <strong>Start Time:</strong>
              </label>{" "}
              {currentExam.start_time}
            </div>
            <div>
              <label>
                <strong>End Time:</strong>
              </label>{" "}
              {currentExam.end_time}
            </div>
            <div>
              <label>
                <strong>Exam Time in minutes:</strong>
              </label>{" "}
              {currentExam.exam_time}
            </div>
           {startexam? <div v-if="startexam">
            <Link
              to={{
                pathname: "/enamequestions",
                state : currentExam
              }}
              className="badge badge-warning"
              >
            <Badge bg="success" text="dark">
              Start
            </Badge>{' '}
            </Link>
          </div> : ''}

          </div>
        ) : (
          <div>
            <br />
            <p>Please select your exam...</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Homepage;