import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://127.0.0.1:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const createUser = (data) =>{
  return axios.post(API_URL + `users`, data, { headers: authHeader() });
}

const updateUser = (id,data) =>{
  return axios.put(API_URL + `users/${id}`, data, { headers: authHeader() });
}

const getUser = (id) =>{
  return axios.get(API_URL+`users/${id}`,{ headers: authHeader() });
}

const getAllusers = () => {
  return axios.get(API_URL+'users',{ headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
};

const findByUsername = (username) => {
  return axios.get(API_URL + `users?username=${username}`, { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  createUser,
  updateUser,
  getUser,
  getAllusers,
  deleteUser,
  findByUsername,
};

export default UserService;