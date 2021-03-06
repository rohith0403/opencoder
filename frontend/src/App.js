import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AddUser from "./components/AddUser";
import User from "./components/User";
import UsersList from "./components/UsersList";
import Question from "./components/Question";
import AddQuestion from "./components/AddQuestion";
import QuestionsList from "./components/QuestionsList";
import AddExam from "./components/AddExam";
import ExamsList from "./components/ExamsList";
import Exam from "./components/Exam";
import Marks from "./components/Marks";
import ProfMarksExams from "./components/ProfMarksExams";
import ProfMarksStudents from "./components/ProfMarksStudents";
import IndividualMarks from "./components/IndividualMarks";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { GlobalProvider } from "./context/GlobalState";
import { history } from "./helpers/history";
import Homepage from "./components/HomePage";
import Exampage from "./components/ExamPage";
import ProfileEdit from "./components/ProfileEdit";
import EventBus from "./common/EventBus";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showStudentBoard, setShowStudentBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  require('dotenv').config();
  // console.log(process.env.REACT_APP_API_KEY)
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowStudentBoard(currentUser.roles.includes("ROLE_STUDENT"))
      setShowModeratorBoard(currentUser.roles.includes("ROLE_PROFESSOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
      setShowStudentBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <GlobalProvider>
    <Router history={history}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Opencoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              {/* <Link to={"/home"} className="nav-link">
                Home
              </Link> */}
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/addquestion"} className="nav-link">
                  Add Questions
                </Link>
              </li>
            )}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/questions"} className="nav-link">
                  Questions
                </Link>
              </li>
            )}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/addexam"} className="nav-link">
                  Add Exam
                </Link>
              </li>
            )}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/exams"} className="nav-link">
                  Exams
                </Link>
              </li>
            )}
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/profmarks"} className="nav-link">
                  Marks
                </Link>
              </li>
            )}
            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/allexams"} className="nav-link">
                  Exam
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/adduser"} className="nav-link">
                  Add User
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li> */}
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path={["/", "/home"]} component={Home} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/addexam" component={AddExam} />
            <Route path="/exams/:id" component={Exam} />
            <Route path="/exams" component={ExamsList} />
            <Route path="/addquestion" component={AddQuestion} />
            <Route path="/questions/:id" component={Question} />
            <Route path="/questions" component={QuestionsList} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/users/:id" component={User} />
            <Route path="/users" component={UsersList} />
            <Route path="/allexams" component={Homepage} />
            <Route path="/enamequestions" component={Exampage} />
            <Route path="/profileedit/:id" component={ProfileEdit} />
            <Route path="/marks" component={Marks} />
            <Route path="/profmarks" component={ProfMarksExams} />
            <Route path="/profmarksstudents" component={ProfMarksStudents} />
            <Route path="/indivmarks" component={IndividualMarks} />

          </Switch>
        </div>

        {/* <AuthVerify logOut={logOut}/> */}
      </div>
    </Router>
    </GlobalProvider>
  );
};

export default App;
