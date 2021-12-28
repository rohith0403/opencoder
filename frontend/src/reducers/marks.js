import {
    CREATE_MARKS,
    RETRIEVE_MARKS,
    GET_MARKS,
    UPDATE_MARKS,
    DELETE_MARKS,
  } from "../actions/types";
  
  const marksInitialState = [];
  
  function marksReducer(marks = marksInitialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_MARKS:
        return [...marks, payload];
      case GET_MARKS:
        return payload;

      case RETRIEVE_MARKS:
        return payload;
  
      case UPDATE_MARKS:
        return marks.map((marks) => {
          if (marks.id === payload.id) {
            return {
              ...marks,
              ...payload,
            };
          } else {
            return marks;
          }
        });
  
      case DELETE_MARKS:
        return marks.filter(({ id }) => id !== payload.id);
  
      default:
        return marks;
    }
  };
  
  export default marksReducer;