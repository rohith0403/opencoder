import React, { Component } from "react";
import UserService from "../services/user.service";

export default class User extends Component {
    constructor(props) {
      super(props);
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.getUser = this.getUser.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.deleteUser = this.deleteUser.bind(this);
  
      this.state = {
        currentUser: {
          id: null,
          username: "",
          email: "",
          published: false
        },
        message: ""
      };
    }
  
    componentDidMount() {
      this.getUser(this.props.match.params.id);
    }
  
    onChangeUsername(e) {
      const username = e.target.value;
  
      this.setState(function(prevState) {
        return {
          currentUser: {
            ...prevState.currentUser,
            username: username
          }
        };
      });
    }
  
    onChangeEmail(e) {
      const email = e.target.value;
      
      this.setState(prevState => ({
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      }));
    }
  
    getUser(id) {
      UserService.getUser(id)
        .then(response => {
          this.setState({
            currentUser: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    updateUser() {
      UserService.updateUser(
        this.state.currentUser._id,
        this.state.currentUser
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "The user was updated successfully!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    deleteUser() {    
      UserService.deleteUser(this.state.currentUser._id)
        .then(response => {
          console.log(response.data);
          this.props.history.push('/users')
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    render() {
        const { currentUser } = this.state;
    
        return (
          <div>
            {currentUser ? (
              <div className="edit-form">
                <h4>User</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={currentUser.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      value={currentUser.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                </form>
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteUser}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.updateUser}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a User...</p>
              </div>
            )}
          </div>
        );
      }
  }