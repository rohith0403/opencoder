import {
    CREATE_MARKS,
    GET_MARKS,
    RETRIEVE_MARKS,
    UPDATE_MARKS,
    DELETE_MARKS,
  } from "./types";
  
  import MarksDataService from "../services/marks.service";
  
  export const createMarks = (userId,examId,questionId,uname,ename,qname,marks) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        examId:examId,
        questionId:questionId,
        username:uname,
        examname:ename,
        questionname:qname,
        marks:marks
      }
      const res = await MarksDataService.createMarks(data);
      dispatch({
        type: CREATE_MARKS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const getMarks = (id) => async (dispatch) => {
    try {
      const res = await MarksDataService.getMarks(id);
      dispatch({
        type: GET_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getMarksCustom = (uid,eid) => async (dispatch) => {
    try {
      const res = await MarksDataService.retrieveMarksCustom(uid,eid);
      dispatch({
        type: GET_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getDistinctStudents = (eid) => async (dispatch) => {
    try {
      const res = await MarksDataService.distinctstudents(eid);
      dispatch({
        type: GET_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getDistinctByUsername = (username,eid) => async (dispatch) => {
    try {
      const res = await MarksDataService.distinctbyusername(username,eid);
      dispatch({
        type: GET_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getIndividualMarks = (username,eid) => async (dispatch) => {
    try {
      const res = await MarksDataService.indivmarks(username,eid);
      dispatch({
        type: GET_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const retrieveMarks = () => async (dispatch) => {
    try {
      const res = await MarksDataService.getAllMarks();

      dispatch({
        type: RETRIEVE_MARKS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateMarks = (id,userId,examId,questionId,uname,ename,qname,marks) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        examId:examId,
        questionId:questionId,
        username:uname,
        examname:ename,
        questionname:qname,
        marks:marks
      }
      const res = await MarksDataService.updateMarks(id, data);
  
      dispatch({
        type: UPDATE_MARKS,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteMarks = (id) => async (dispatch) => {
    try {
      await MarksDataService.deleteMarks(id);
  
      dispatch({
        type: DELETE_MARKS,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  