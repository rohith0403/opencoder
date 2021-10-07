import {
    CREATE_EXAM,
    GET_EXAM,
    RETRIEVE_EXAMS,
    UPDATE_EXAM,
    DELETE_EXAM,
  } from "./types";
  
  import ExamDataService from "../services/exam.service";
  
  export const createExam = (userId,ename) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        ename:ename,
      }
      const res = await ExamDataService.createExam(data);
      dispatch({
        type: CREATE_EXAM,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const getExam = (id) => async (dispatch) => {
    try {
      const res = await ExamDataService.getExam(id);
      dispatch({
        type: GET_EXAM,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveExams = () => async (dispatch) => {
    try {
      const res = await ExamDataService.getAllExams();

      dispatch({
        type: RETRIEVE_EXAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const retrieveProfExams = (id) => async (dispatch) => {
    try {
      const res = await ExamDataService.getExamByProf(id);

      dispatch({
        type: RETRIEVE_EXAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateExam = (id, data) => async (dispatch) => {
    try {
      const res = await ExamDataService.updateExam(id, data);
  
      dispatch({
        type: UPDATE_EXAM,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteExam = (id) => async (dispatch) => {
    try {
      await ExamDataService.deleteExam(id);
  
      dispatch({
        type: DELETE_EXAM,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findExamsByEname = (ename) => async (dispatch) => {
    try {
      const res = await ExamDataService.findByExamname(ename);
  
      dispatch({
        type: RETRIEVE_EXAMS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };