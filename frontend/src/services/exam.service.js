import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/api/test/";

const createExam = (data) =>{
  return axios.post(API_URL + `exams`, data, { headers: authHeader() });
}

const updateExam = (id,data) =>{
  return axios.put(API_URL + `exams/${id}`, data, { headers: authHeader() });
}

const getExam = (id) =>{
  return axios.get(API_URL+`exams/${id}`,{ headers: authHeader() });
}

const getAllExams = () => {
  return axios.get(API_URL+'exams',{ headers: authHeader() });
};

const deleteExam = (id) => {
  return axios.delete(API_URL + `exams/${id}`, { headers: authHeader() });
};

const findByExamname = (ename) => {
  return axios.get(API_URL + `exams?ename=${ename}`, { headers: authHeader() });
};

const getExamByProf = (id) => {
  return axios.get(API_URL + `exams?userId=${id}`, { headers: authHeader() });
};

const getAllExamsByStudents = () => {
  return axios.get(API_URL+'allexams',{ headers: authHeader() });
};

const findByExamnameByStudents = (ename) => {
  return axios.get(API_URL + `allexams?ename=${ename}`, { headers: authHeader() });
};




const ExamDataService = {
  createExam,
  updateExam,
  getExam,
  getAllExams,
  deleteExam,
  findByExamname,
  getExamByProf,
  getAllExamsByStudents,
  findByExamnameByStudents,
};

export default ExamDataService;