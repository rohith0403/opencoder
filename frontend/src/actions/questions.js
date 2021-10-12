import {
    CREATE_QUESTION,
    GET_QUESTION,
    RETRIEVE_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
  } from "./types";
  
  import QuestionDataService from "../services/question.service";
  
  export const createQuestion = (userId,ename,qname,description) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        ename:ename,
        qname:qname,
        description:description,
      }
      const res = await QuestionDataService.createQuestion(data);
      dispatch({
        type: CREATE_QUESTION,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const getQuestion = (id) => async (dispatch) => {
    try {
      const res = await QuestionDataService.getQuestion(id);
      dispatch({
        type: GET_QUESTION,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  export const retrieveQuestions = () => async (dispatch) => {
    try {
      const res = await QuestionDataService.getAllQuestions();
      
      dispatch({
        type: RETRIEVE_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const retrieveProfQuestions = (id) => async (dispatch) => {
    try {
      const res = await QuestionDataService.getQuestionByProf(id);

      dispatch({
        type: RETRIEVE_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const retrieveQuestionsByEname = (ename) => async (dispatch) => {
    try {
      const res = await QuestionDataService.retrieveQuestionsByEname(ename);

      dispatch({
        type: RETRIEVE_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateQuestion = (id, data) => async (dispatch) => {
    try {
      const res = await QuestionDataService.updateQuestion(id, data);
  
      dispatch({
        type: UPDATE_QUESTION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteQuestion = (id) => async (dispatch) => {
    try {
      await QuestionDataService.deleteQuestion(id);
  
      dispatch({
        type: DELETE_QUESTION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const findQuestionsByQname = (qname) => async (dispatch) => {
    try {
      const res = await QuestionDataService.findByQuestionname(qname);
  
      dispatch({
        type: RETRIEVE_QUESTIONS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };