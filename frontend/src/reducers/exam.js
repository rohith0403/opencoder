import {
    CREATE_EXAM,
    GET_EXAM,
    RETRIEVE_EXAMS,
    UPDATE_EXAM,
    DELETE_EXAM,
  } from "../actions/types";
  
  const examInitialState = [];
  
  function examReducer(exams = examInitialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_EXAM:
        return [...exams, payload];
      case GET_EXAM:
        return payload;

      case RETRIEVE_EXAMS:
        return payload;
  
      case UPDATE_EXAM:
        return exams.map((exam) => {
          if (exam.id === payload.id) {
            return {
              ...exam,
              ...payload,
            };
          } else {
            return exam;
          }
        });
  
      case DELETE_EXAM:
        return exams.filter(({ id }) => id !== payload.id);
  
      default:
        return exams;
    }
  };
  
  export default examReducer;