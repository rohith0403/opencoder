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

const retrieveMarksCustom = (uid,eid) => {
  return axios.get(API_URL+`marks?userId=${uid}`+`&examId=${eid}`,{ headers: authHeader() });
};

const deleteMarks = (id) => {
  return axios.delete(API_URL + `marks/${id}`, { headers: authHeader() });
};

const distinctstudents = (eid) => {
  return axios.get(API_URL+`profmarks?examId=${eid}`,{ headers: authHeader() });
}
// for search option
const distinctbyusername = (username,eid) => {
  return axios.get(API_URL+`profmarks?username=${username}`+`&examId=${eid}`,{ headers: authHeader() });
}

const indivmarks = (username,eid) => {
  return axios.get(API_URL+`indivmarks?username=${username}`+`&examId=${eid}`,{ headers: authHeader() });
}


const MarksDataService = {
  createMarks,
  updateMarks,
  getMarks,
  getAllMarks,
  deleteMarks,
  retrieveMarksCustom,
  distinctstudents,
  distinctbyusername,
  indivmarks,
};

export default MarksDataService;