import http from "./httpService";
import jwtDecode from "jwt-decode";
const apiEndpoint = `http://localhost:5000/auth`;

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem("token", jwt.token);
  // getCurrentUser();
  console.log(jwt.token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  // console.log(localStorage.getItem('token'));
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
