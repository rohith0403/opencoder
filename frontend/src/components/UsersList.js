import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveUsers,
  findUsersByUsername,
} from "../actions/users";
import { Link } from "react-router-dom";
import { Badge } from 'react-bootstrap';

const UsersList = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUsername, setsearchUsername] = useState("");

  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  const onChangesearchUsername = e => {
    const searchUsername = e.target.value;
    setsearchUsername(searchUsername);
  };

  const refreshData = () => {
    setcurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setcurrentUser(user);
    setCurrentIndex(index);
  };

  const findByUsername = () => {
    refreshData();
    dispatch(findUsersByUsername(searchUsername));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by username"
            value={searchUsername}
            onChange={onChangesearchUsername}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByUsername}
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
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.username}
              </li>
            ))}
        </ul>

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
            <Badge bg="warning" text="dark">
              Edit
            </Badge>{' '}
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
};

export default UsersList;