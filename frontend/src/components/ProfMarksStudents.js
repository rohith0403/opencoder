import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDistinctStudents ,getDistinctByUsername} from "../actions/marks";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';

const ProfMarksStudents = (props) => {
  const [currentMarks, setcurrentMarks] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchEname, setsearchEname] = useState("");

  const marks = useSelector(state => state.marks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistinctStudents(props.location.state.exam));
  }, [dispatch]);

  const onChangesearchUName = e => {
    const searchEname = e.target.value;
    setsearchEname(searchEname);
  };

  const refreshData = () => {
    setcurrentMarks(null);
    setCurrentIndex(-1);
  };

  const setActiveMarks = (marks, index) => {
    setcurrentMarks(marks);
    setCurrentIndex(index);
  };

  const findByUName = () => {
    refreshData();
    dispatch(getDistinctByUsername(searchEname,props.location.state.exam));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by student name"
            value={searchEname}
            onChange={onChangesearchUName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByUName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Marks List</h4>

        <ul className="list-group">
          {marks &&
            marks.map((mark, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveMarks(mark, index)}
                key={index}
              >
                {mark}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentMarks ? (
          <div>
            <Link
              to={{
                pathname:"/indivmarks/",
                state : {username:currentMarks,
                          examid:props.location.state.exam}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfMarksStudents;