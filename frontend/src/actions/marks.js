import {
    CREATE_MARKS,
    GET_MARKS,
    RETRIEVE_MARKS,
    UPDATE_MARKS,
    DELETE_MARKS,
  } from "./types";
  
  import MarksDataService from "../services/marks.service";
  
  export const createMarks = (userId,examId,questionId,marks) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        examId:examId,
        questionId:questionId,
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
  
  export const getMarksCustom = (uid,eid,qid) => async (dispatch) => {
    try {
      console.log("sfkds  "+qid);
      const res = await MarksDataService.retrieveMarksCustom(uid,eid,qid);
      console.log(res.data);
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

  export const updateMarks = (id,userId,examId,questionId,marks) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        examId:examId,
        questionId:questionId,
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
  