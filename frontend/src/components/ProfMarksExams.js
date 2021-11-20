import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findExamsByEname, retrieveProfExams } from "../actions/exam";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
let userDetails = JSON.parse(localStorage.getItem("user"));

const ProfMarks = () => {
  const [currentExam, setcurrentExam] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEname, setsearchEname] = useState("");

  const exams = useSelector(state => state.exams);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProfExams(userDetails.id));
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
  };

  const findByEName = () => {
    refreshData();
    dispatch(findExamsByEname(searchEname));
  };

  return (
    <div style={{
      marginTop:"-16px"
    }}>
    <div className="filter" style={{ 
    zIndex:-99999,
    backgroundImage: `url("/background.jpg")`,
    width : "100%",
    marginLeft:"-120px",
    height : "95%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position:"absolute",
    // -webkit-filter: blur(10px);
    // filter: blur(10px);
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
            <h4 className = "text-white">Exam</h4>
            <div>
              <label>
                <strong>Exam Date:</strong>
              </label>{" "}
              {currentExam.start_date}
            </div>
            <Link
              to={{
                pathname:"/profmarksstudents/",
                state : {exam:currentExam._id}
              }}
              className="badge badge-warning"
            >
            <Badge bg="warning" text="dark">
              Check Results
            </Badge>{' '}
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p className = "text-white">Please click on a Exam...</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProfMarks;