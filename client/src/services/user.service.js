import axios from "axios";
import { authHeader } from "../helpers";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
//onst API_BASE_URL = "http://localhost:3001/api";
//const API_BASE_URL = "http://3.131.231.110:34677/api";
export const userService = {
  login,
  logout,
  register,
  update,
  getById,
  userUploads,
  changePassword
};

function login(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  return fetch(`${API_BASE_URL}/user/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.user));

      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
  //window.location.reload(true);
}

function register(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/user/register`, requestOptions).then(
    handleResponse
  );
}

function update(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/user/${data.id}`, requestOptions).then(
    handleResponse
  );
}

function changePassword(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/user/changepassword/${data.id}`, requestOptions).then(
    handleResponse
  );
}



function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${API_BASE_URL}/user/${id}`, requestOptions).then(
    handleResponse
  );
}

function userUploads(data) {
    const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: data,
    };


    return fetch(`${API_BASE_URL}/user/uploads`, requestOptions).then(
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
