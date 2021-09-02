import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../actions/users";
import UserDataService from "../services/user.service";

const User = (props) => {
  const initialUserState = {
    id: null,
    username: "",
    email: "",
    password:"",
  };
  const [currentUser, setcurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const getUser = id => {
    if (users.length != 0){
      console.log(users);
      if(users.filter( x  => x._id=== id)) {
        // TODO: 505 code
      }
      setcurrentUser(users.filter( x  => x._id=== id)[0]);
    }
    else{
    UserDataService.getUser(id)
      .then(response => {
        setcurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }
  };
  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setcurrentUser({ ...currentUser, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateUser(currentUser._id, currentUser))
      .then(response => {
        console.log(response);

        setMessage("The user was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeUser = () => {
    dispatch(deleteUser(currentUser._id))
      .then(() => {
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

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
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeUser}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;