import {
    DISPLAY_OUTPUT,
    CODE_CHANGE,
    PREVIOUS_INPUT,
    INPUT_CHANGE,
    LANG_CHANGE,
  } from "./types";
  

  export const displayOutput = (id, output) => async(dispatch) => {
    try{

          return new Promise( (resolve, reject) => {
            dispatch({
                type: DISPLAY_OUTPUT,
                payload: output
              });
            if ( successful ) {
                resolve(); // we're done so call resolve.
            } else {
                reject(); // failed.
            }
        });
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const codeChange = (id, input) => async(dispatch) => {
    try{
        dispatch({
            type: DISPLAY_OUTPUT,
            payload: output
          });
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const previousInput = (id) => async(dispatch) => {
    var lastInput = "";
    
    dispatch({
        type: PREVIOUS_INPUT,
        payload: lastInput
    });
}

export const inputChange = (id, input_data) => async(dispatch) => {
    try{
        toStore = input_data;
        dispatch({
          type: INPUT_CHANGE,
          payload: input_data
        });
    }
    catch(err){
        return Promise.reject(err);
    }
}

export const langChange = (id, input) => async(dispatch) => {
    try{
        dispatch({
            type: LANG_CHANGE,
            payload: input
          });
    }
    catch(err){
        return Promise.reject(err);
    }
}
