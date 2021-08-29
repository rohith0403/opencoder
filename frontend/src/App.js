import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardStudent from "./components/board-student.component";
import BoardProfessor from "./components/board-professor.components";
import AddUser from "./components/add-user.component";
import User from "./components/user.component";
import UsersList from "./components/user-list.component";
import Editor from "./components/code-editor.component"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showProfessorBoard: false,
      showAdminBoard: false,
      showStudentBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showProfessorBoard: user.roles.includes("ROLE_PROFESSOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showStudentBoard: user.roles.includes("ROLE_STUDENT")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showProfessorBoard, showAdminBoard, showStudentBoard} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Open Coder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showProfessorBoard && (
              <li className="nav-item">
                <Link to={"/prof"} className="nav-link">
                  Professor Board
                </Link>
              </li>
            )}

            {showStudentBoard && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student Board
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

            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/student"} className="nav-link">
                  Student
                </Link>
              </li>
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
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
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/student" component={BoardStudent} />
            <Route path="/prof" component={BoardProfessor} />
            <Route path="/adduser" component={AddUser} />
            <Route path="/users" component={UsersList} />
            <Route path="/users/:id" component={User} />
            <Route path="/editor" component={Editor} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;