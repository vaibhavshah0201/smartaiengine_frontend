import { BehaviorSubject } from "rxjs";
// import getConfig from "next/config";
import Router from "next/router";

import { alertService } from "@/services/alert.service";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

// const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `http://localhost:8000/user`;
const userSubject: any = new BehaviorSubject(
  typeof window !== "undefined" && localStorage.getItem("user")
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

async function login(username: any, password: any) {
  const user = await fetchWrapper.post(`${baseUrl}/login`, {
    username,
    password,
  });

  // publish user to subscribers and store in local storage to stay logged in between page refreshes
  userSubject.next(user);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}

function logout() {
  alertService.clear();
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
}

async function register(user: any) {
  await fetchWrapper.post(`${baseUrl}/register`, user);
}

async function getAll() {
  return await fetchWrapper.get(baseUrl, {});
}

async function getById(id: any) {
  return await fetchWrapper.get(`${baseUrl}/${id}`, {});
}

async function update(id: any, params: any) {
  await fetchWrapper.put(`${baseUrl}/${id}`, params);

  // update stored user if the logged in user updated their own record
  if (id === userSubject.value.id) {
    // update local storage
    const user = { ...userSubject.value, ...params };
    localStorage.setItem("user", JSON.stringify(user));

    // publish updated user to subscribers
    userSubject.next(user);
  }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id: any) {
  await fetchWrapper.delete(`${baseUrl}/${id}`, {});

  // auto logout if the logged in user deleted their own record
  if (id === userSubject.value.id) {
    logout();
  }
}
