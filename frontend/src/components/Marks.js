import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarksCustom } from "../actions/marks";
let userDetails = JSON.parse(localStorage.getItem("user"));

const MarksList = (props) => {
  const [currentMarks, setcurrentMarks] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const marks = useSelector(state => state.marks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarksCustom(userDetails.id,props.location.state.exam._id));
  }, [dispatch]);

  const setActiveUser = (mark, index) => {
    setcurrentMarks(mark);
    setCurrentIndex(index);
  };


  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Marks</h4>

        <ul className="list-group">
          {marks &&
            marks.map((mark, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(mark, index)}
                key={index}
              >
                {mark.questionname}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6">
        {currentMarks ? (
          <div>
            <h4>Marks</h4>
            <div>
              <label>
                <strong>Marks:</strong>
              </label>{" "}
              {currentMarks.marks}
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksList;