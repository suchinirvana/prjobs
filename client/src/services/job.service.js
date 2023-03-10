import axios from "axios";
import { authHeader } from "../helpers";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//const API_BASE_URL = "http://localhost:3001/api";
//const API_BASE_URL = "http://3.131.231.110:34677/api";
export const jobService = {
  addJob,
  updateJob,  
  getById,
  getAll,
  getAllByUser,
  deleteJob,
  getRecommendedJob,
  getFilterJob,
  applyForJob,
  getJobApplications,
  updateApplicationsStatus
};



function addJob(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job/add`, requestOptions).then(handleResponse);
}


function updateJob(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job/${data.id}`, requestOptions).then(
    handleResponse
  );
}


function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${API_BASE_URL}/job/${id}`, requestOptions).then(
    handleResponse
  );
}

function deleteJob(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${API_BASE_URL}/job/${id}`, requestOptions).then(
    handleResponse
  );
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${API_BASE_URL}/alljobs`, requestOptions).then(
    handleResponse
  );
}

function getFilterJob(data) {
 
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${API_BASE_URL}/alljobs`, requestOptions).then(
    handleResponse
  );
}



function getAllByUser(id) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${API_BASE_URL}/job/all/${id}`, requestOptions).then(
    handleResponse
  );
}

function getRecommendedJob(data){
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job/recmjob`, requestOptions).then(handleResponse);
}

function applyForJob(data){
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job-apply`, requestOptions).then(handleResponse);
}

function getJobApplications(data){
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job-applications`, requestOptions).then(handleResponse);
}

function updateApplicationsStatus(data){
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/job-applications-status`, requestOptions).then(handleResponse);
}


function logout() {
    localStorage.removeItem("user");
    //window.location.reload(true);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        //location.reload(true);
      }

      const error = (data && data) || response;
      return Promise.reject(error);
    }

    return data;
  });
}
