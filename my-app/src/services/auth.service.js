import axios from "axios";

const API_URL = "http://localhost:4000/api";

const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.tokenSession) {
          console.log("dsadsa",response.data);
          window.localStorage.setItem("user", JSON.stringify(response.data));
          return console.log("entroooooooo", JSON.parse(localStorage.getItem("user")));
      }

      return console.log("user", JSON.stringify(response.data));
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;