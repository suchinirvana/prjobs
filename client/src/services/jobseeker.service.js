import axios from "axios";
import { authHeader } from "../helpers";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const jobseekerService = {
  update
};



function logout() {
  localStorage.removeItem("user");
  //window.location.reload(true);
}

function update(data) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${API_BASE_URL}/jobseeker/${data.id}`, requestOptions).then(
    handleResponse
  );
}



// function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(`${API_BASE_URL}/user/${id}`, requestOptions).then(
//     handleResponse
//   );
// }


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
