import React, { Component } from "react";

import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);
        this.state = {
          id: null,
          username: "",
          email:"",
          password:"",
          roles:"",
          submitted: false
      };
    }
    
    onChangeUsername(e)
    {
        this.setState({username:e.target.value});
    }
    onChangeEmail(e)
    {
        this.setState({email:e.target.value});
    }
    onChangePassword(e)
    {
        this.setState({password:e.target.value});
    }
    onChangeRole(e)
    {
        this.setState({roles:e.target.value});
    }

    saveUser()
    {
        var data = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password,
            roles: this.state.roles,
        };
        console.log(data);
        UserService.createUser(data)
        .then(response => {
            this.setState({
              id: response.data.id,
              username: response.data.username,
              email: response.data.email,
              password: response.data.password,
              roles:response.data.roles,
              submitted: true    
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }
    
    newUser()
    {
        this.state = {
            id: null,
            username: "",
            email:"",
            password:"",
            roles:"",
            submitted: false
          };
    }
    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTutorial}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    required
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    name="username"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>
                
                {/* <div className="dropdown" id="roleDropdown">
                  <label htmlFor="dropdownMenuButton">Roles</label>
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    value={this.state.roles}
                    onChange={this.onChangeRole}
                    name="roles"
                  >
                    Roles
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">admin</a>
                    <a className="dropdown-item" href="#">guide</a>
                    <a className="dropdown-item" href="#">user</a>
                  </div>
                </div> */}
                
                <div>
                <select 
                    id="roles"
                    required
                    value={this.state.roles} 
                    onChange={this.onChangeRole} 
                    name="roles"
                >
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    name="password"
                  />
                </div>
    
                <button onClick={this.saveUser} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
}