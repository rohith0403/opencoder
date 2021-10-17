import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveQuestionsByEname } from "../actions/questions";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const ExamPage = (props) => {
  const [currentQuestion, setcurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveQuestionsByEname(props.location.state.ename));
  }, [props.location.state.ename, dispatch]);

  var time = props.location.state.exam_time*60*1000;
  const history = useHistory()

  setTimeout(() => {
    history.push('/allexams')
  }, time)
  
  const setActiveUser = (question, index) => {
    setcurrentQuestion(question);
    setCurrentIndex(index);
  };


  return (
    <div>
    <div className="list row">
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
      <div className="col-md-6">
        {currentQuestion ? (
            <div>
            <h4>Question</h4>
            <div>
              <div style={{whiteSpace: "pre-wrap"}}>{currentQuestion.description}</div>
            </div>
            <Link
              to={{pathname: "/viewquestion/" + currentQuestion._id, 
              state:props.location.state}}
              className="badge badge-warning"
              >
            <Badge bg="warning" text="dark">
              Code
            </Badge>{' '}
            </Link>

          </div>
        ) : (
            <div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ExamPage;