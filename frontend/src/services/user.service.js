import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  createUser(data)
  {
    return axios.post(API_URL + `users`, data, { headers: authHeader() });
  }
  updateUser(id,data)
  {
    return axios.put(API_URL + `users/${id}`, data, { headers: authHeader() });
  }
  getUser(id)
  {
    return axios.get(API_URL+`users/${id}`,{ headers: authHeader() });
  }
  getAllusers()
  {
    return axios.get(API_URL+'users',{ headers: authHeader() });
  }
  deleteAllUsers()
  {
    return axios.delete(API_URL + `users`, { headers: authHeader() });
  }
  deleteUser(id)
  {
    return axios.delete(API_URL + `users/${id}`, { headers: authHeader() });
  }
  findByUsername(username)
  {
    return axios.get(API_URL + `users?username=${username}`, { headers: authHeader() });
  }


  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getProfessorBoard() {
    return axios.get(API_URL + 'prof', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();