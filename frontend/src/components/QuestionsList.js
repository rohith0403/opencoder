import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findQuestionsByQname, retrieveProfQuestions } from "../actions/questions";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
let userDetails = JSON.parse(localStorage.getItem("user"));

const QuestionsList = () => {
  const [currentQuestion, setcurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQname, setsearchQname] = useState("");

  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveProfQuestions(userDetails.id));
  }, [dispatch]);

  const onChangesearchQName = e => {
    const searchQname = e.target.value;
    setsearchQname(searchQname);
  };

  const refreshData = () => {
    setcurrentQuestion(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (question, index) => {
    setcurrentQuestion(question);
    setCurrentIndex(index);
  };

  const findByQName = () => {
    refreshData();
    dispatch(findQuestionsByQname(searchQname));
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
            placeholder="Search by question name"
            value={searchQname}
            onChange={onChangesearchQName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary text-white"
              type="button"
              onClick={findByQName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Questions List</h4>

        <ul className="list-group">
          {questions &&
            questions.map((question, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(question, index)}
                key={index}
              >
                {question.qname}
              </li>
            ))}
        </ul>

      </div>
      <div className="col-md-6 text-white">
        {currentQuestion ? (
          <div>
            <h4>Question</h4>
            <div>
              <label>
                <strong>Exam:</strong>
              </label>{" "}
              {currentQuestion.ename}
            </div>
            <div>
              <label>
                <strong>Question Name:</strong>
              </label>{" "}
              {currentQuestion.qname}
            </div>
            <Link
              to={"/questions/" + currentQuestion._id}
              className="badge badge-warning"
            >
            <Badge bg="warning" text="dark">
              Edit
            </Badge>{' '}
            </Link>

          </div>
        ) : (
          <div>
            <br />
            <p className = "text-white">Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default QuestionsList;