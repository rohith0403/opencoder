import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://192.168.1.8:8080/api/test/";

const createQuestion = (data) =>{
  return axios.post(API_URL + `questions`, data, { headers: authHeader() });
}

const updateQuestion = (id,data) =>{
  return axios.put(API_URL + `questions/${id}`, data, { headers: authHeader() });
}

const getQuestion = (id) =>{
  return axios.get(API_URL+`questions/${id}`,{ headers: authHeader() });
}

const getAllQuestions = () => {
  return axios.get(API_URL+'questions',{ headers: authHeader() });
};

const deleteQuestion = (id) => {
  return axios.delete(API_URL + `questions/${id}`, { headers: authHeader() });
};

const findByQuestionname = (qname) => {
  return axios.get(API_URL + `questions?qname=${qname}`, { headers: authHeader() });
};

const getQuestionByProf = (id) => {
  return axios.get(API_URL + `questions?userId=${id}`, { headers: authHeader() });
};


const QuestionDataService = {
  createQuestion,
  updateQuestion,
  getQuestion,
  getAllQuestions,
  deleteQuestion,
  findByQuestionname,
  getQuestionByProf,
};

export default QuestionDataService;