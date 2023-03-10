import axios from "axios";
import { authHeader } from "../helpers";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//const API_BASE_URL = "http://3.131.231.110:34677/api";
export const employerService = {
  addEmployer,
  updateEmployer,  
  getById,
  employerUploads,
  getAll,
  deleteEmployer
};



function addEmployer(data) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: data,
  };
  return fetch(`${API_BASE_URL}/employer/add`, requestOptions).then(handleResponse);
}


function updateEmployer(data, id) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: data,
  };
  return fetch(`${API_BASE_URL}/employer/${id}`, requestOptions).then(
    handleResponse
  );
}

// function updateEmployer(data, id) {
//   const requestOptions = {
//     method: "put",
//     url : `${API_BASE_URL}/employer/${id}`,
//     headers: authHeader(),
//     data: data,
//   };
//  return  axios(requestOptions).then(handleResponse);
// }


function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_BASE_URL}/employer/${id}`, requestOptions).then(
    handleResponse
  );
}

function deleteEmployer(id) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(`${API_BASE_URL}/employer/${id}`, requestOptions).then(
    handleResponse
  );
}

function getAll(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_BASE_URL}/employer/all/${id}`, requestOptions).then(
    handleResponse
  );
}

function logout() {
    localStorage.removeItem("user");
    //window.location.reload(true);
  }
function employerUploads(data) {
    const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: data,
    };


    return fetch(`${API_BASE_URL}/employer/uploads`, requestOptions).then(
      handleResponse
    );
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
