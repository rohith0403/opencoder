import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMarksCustom } from "../actions/marks";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
let userDetails = JSON.parse(localStorage.getItem("user"));

const MarksList = (props) => {
  const [totalmarks,setTotalMarks] = useState(0);
  const [count,setCount] = useState(0);
  const marks = useSelector(state => state.marks);
  const total_marks = () => {
    var total = 0;
    for(let i=0;i<marks.length;i++) total+=marks[i].marks;
    setTotalMarks(total);
    setCount(marks.length);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMarksCustom(userDetails.id,props.location.state.exam._id));
  }, [dispatch]);

  useEffect(() => {
    total_marks();
  }, );

  return (
    <div className="container">
            <h3 className="p-3 text-center"></h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {marks && marks.map(mark =>
                        <tr key={mark._id}>
                            <td>{mark.questionname}</td>
                            <td>{mark.marks}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h2>Total marks  :  {totalmarks*10} out of {count*50}</h2>
            <div className="home">
            <Link
              to={{
                pathname: "/allexams",
              }}
              className="badge badge-warning"
            >
            <Badge bg="success" text="dark">
              Home
            </Badge>{' '}
            </Link>
      </div> 
        </div>
  );
};

export default MarksList;