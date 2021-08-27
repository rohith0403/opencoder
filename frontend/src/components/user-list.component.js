import React, { Component } from "react";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

export default class UsersList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
      this.retrieveUsers = this.retrieveUsers.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActiveUser = this.setActiveUser.bind(this);
      this.removeAllUsers = this.removeAllUsers.bind(this);
      this.searchUsername = this.searchUsername.bind(this);
  
      this.state = {
        users: [],
        currentUser: null,
        currentIndex: -1,
        searchUsername: ""
      };
    }
  
    componentDidMount() {
      this.retrieveUsers();
    }
  
    onChangeSearchUsername(e) {
      const searchUsername = e.target.value;
  
      this.setState({
        searchUsername: searchUsername
      });
    }
  
    retrieveUsers() {
      UserService.getAllusers()
        .then(response => {
          this.setState({
            users: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    refreshList() {
      this.retrieveUsers();
      this.setState({
        currentUser: null,
        currentIndex: -1
      });
    }
  
    setActiveUser(user, index) {
      this.setState({
        currentUser: user,
        currentIndex: index
      });
    }
  
    removeAllUsers() {
      UserService.deleteAllUsers()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    searchUsername() {
      UserService.findByUsername(this.state.searchUsername)
        .then(response => {
          this.setState({
            users: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

    render() {
        const { searchUsername, users, currentUser, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by username"
                  value={searchUsername}
                  onChange={this.onChangeSearchUsername}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchUsername}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Users List</h4>
    
              <ul className="list-group">
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveUser(user, index)}
                      key={index}
                    >
                      {user.username}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllUsers}
              >
                Remove All
              </button>
            </div>
            <div className="col-md-6">
              {currentUser ? (
                <div>
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>Username:</strong>
                    </label>{" "}
                    {currentUser.username}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentUser.email}
                  </div>
    
                  <Link
                    to={"/users/" + currentUser._id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
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
      }
}
