import {
    CREATE_QUESTION,
    GET_QUESTION,
    RETRIEVE_QUESTIONS,
    UPDATE_QUESTION,
    DELETE_QUESTION,
  } from "./types";
  
  import QuestionDataService from "../services/question.service";
  
  export const createQuestion = (userId,qname,description) => async (dispatch) => {
    try {
      const data = {
        userId:userId,
        qname:qname,
        description:description,
      }
      console.log(data);
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
      console.log("GETTUNF");
      const res = await QuestionDataService.getQuestion(id);
      console.log("RES ", res);
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