import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/api/test/";

const createMarks = (data) =>{
  return axios.post(API_URL + `marks`, data, { headers: authHeader() });
}

const updateMarks = (id,data) =>{
  return axios.put(API_URL + `marks/${id}`, data, { headers: authHeader() });
}

const getMarks = (id) =>{
  return axios.get(API_URL+`marks/${id}`,{ headers: authHeader() });
}

const getAllMarks = () => {
  return axios.get(API_URL+'marks',{ headers: authHeader() });
};

const retrieveMarksCustom = (uid,eid,qid) => {
  return axios.get(API_URL+`marks?userId=${uid}`+`&examId=${eid}`+`&questionId=${qid}`,{ headers: authHeader() });
};

const deleteMarks = (id) => {
  return axios.delete(API_URL + `marks/${id}`, { headers: authHeader() });
};


const MarksDataService = {
  createMarks,
  updateMarks,
  getMarks,
  getAllMarks,
  deleteMarks,
  retrieveMarksCustom,
};

export default MarksDataService;