import React, { useState, useRef } from "react";
import { useDispatch, useSelector} from "react-redux";
import { createUser } from "../actions/users";
import { Dropdown } from 'react-bootstrap';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const AddUser = () => {
  const initialUserState = {
    id: null,
    username: "",
    email:"",
    password:"",
    roles:[],
    submitted: false
  };
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
const  changeRole = async (role) => {
    let roles = [role];
    await setUser({ ...user, roles: roles });
  };
  const saveUser = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();
    const { username,email,password,roles } = user;
    if (checkBtn.current.context._errors.length === 0) {
    dispatch(createUser(username,email,password,roles))
      .then(data => {
        setUser({
          username : data.username,
          email : data.email,
          password : data.password,
          roles: data.roles,
        });
        setSubmitted(true);
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    }
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div style={{
      marginTop:"-20px"
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
    <div className="submit-form text-white">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add Another User
          </button>
        </div>
      ) : (
        <div>
          <Form onSubmit={saveUser} ref={form}>
          {!successful && (
            <div>
              <div className="dropdown" id="roleDropdown">
            <Dropdown>
            <Dropdown.Toggle 
            variant="success" 
            id="roles"
            value={user.roles}
            onChange={handleInputChange}
            validations={[required]}
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
              validations={[required, vusername]}
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
                validations={[required, validEmail]}
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
                validations={[required, vpassword]}
                name="password"
              />
          </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </div>
      )}
    </div>
    </div>
  );
};

export default AddUser;