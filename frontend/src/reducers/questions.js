import {
    CREATE_QUESTION,
    RETRIEVE_QUESTIONS,
    GET_QUESTION,
    UPDATE_QUESTION,
    DELETE_QUESTION,
  } from "../actions/types";
  
  const questionInitialState = [];
  
  function questionReducer(questions = questionInitialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_QUESTION:
        return [...questions, payload];
      case GET_QUESTION:
        return payload;

      case RETRIEVE_QUESTIONS:
        return payload;
  
      case UPDATE_QUESTION:
        return questions.map((question) => {
          if (question.id === payload.id) {
            return {
              ...question,
              ...payload,
            };
          } else {
            return question;
          }
        });
  
      case DELETE_QUESTION:
        return questions.filter(({ id }) => id !== payload.id);
  
      default:
        return questions;
    }
  };
  
  export default questionReducer;