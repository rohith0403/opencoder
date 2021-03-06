import {
    CREATE_USER,
    GET_USER,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
    SET_MESSAGE,
  } from "./types";
  
  import UserDataService from "../services/user.service";
  
  export const createUser = (username,email,password,roles) => async (dispatch) => {
      const data = {
        username:username,
        email:email,
        password:password,
        roles:roles
      }
      return UserDataService.createUser(data).then(
        (response) => {
          dispatch({
            type: CREATE_USER,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
    
          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
      
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
        }
      )
  };
  export const getUser = (id) => async (dispatch) => {
    try {
      const res = await UserDataService.getUser(id);
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await UserDataService.getAllusers();

      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserDataService.updateUser(id, data);
  
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await UserDataService.deleteUser(id);
  
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findUsersByUsername = (username) => async (dispatch) => {
    try {
      const res = await UserDataService.findByUsername(username);
  
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };