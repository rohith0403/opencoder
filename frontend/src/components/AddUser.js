import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../actions/users";
import { Dropdown } from 'react-bootstrap';

const AddUser = () => {
  const initialUserState = {
    id: null,
    username: "",
    email:"",
    password:"",
    roles:[],
    submitted: false
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };
const  changeRole = async (role) => {
    let roles = [role];
    await setUser({ ...user, roles: roles });
    console.log(user);
  };
  const saveUser = () => {
    const { username,email,password,roles } = user;

    dispatch(createUser(username,email,password,roles))
      .then(data => {
        setUser({
          username : data.username,
          email : data.email,
          password : data.password,
          roles: data.roles,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="dropdown" id="roleDropdown">
          <Dropdown>
            <Dropdown.Toggle 
            variant="success" 
            id="roles"
            value={user.roles}
            value={user.roles}
            onChange={handleInputChange}
            name="roles"
            >
              Roles
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={()=>{changeRole("admin")}}>admin</Dropdown.Item>
              <Dropdown.Item href="#" onClick={()=>{changeRole("professor")}}>professor</Dropdown.Item>
              <Dropdown.Item href="#" onClick={()=>{changeRole("student")}}>student</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
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
                value={user.email}
                onChange={handleInputChange}
                name="email"
              />
          </div>

          <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="text"
                className="form-control"
                id="password"
                required
                value={user.password}
                onChange={handleInputChange}
                name="password"
              />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;