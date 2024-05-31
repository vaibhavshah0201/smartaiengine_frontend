import getConfig from "next/config";
import { userService } from "@/services";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import authService from "@/services/auth.service";
// const { publicRuntimeConfig } = getConfig();
const accessToken: any = Cookies.get("accessToken");
export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method: any) {
  return (url: any, body: any = null, isSecure: boolean = false) => {
    const requestOptions: any = {
      method,
      headers: authHeader(url),
    };
    if (body && method !== "GET" && method !== "HEAD") {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    if (isSecure) {
      requestOptions.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// helper functions

function authHeader(url: any) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  const isLoggedIn = user?.token;
  const isApiUrl = url.startsWith("http://localhost:3000/api/user");
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

async function handleResponse(response: any) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    console.log(response);
    if (response.status == 401 && response.statusText == "Unauthorized") {
      // const newAccessToken = await authService.refreshToken();
      // if (newAccessToken) {
      //   return data;
      // }
      // if (newAccessToken) {
      //   requestOptions.headers["Authorization"] = `Bearer ${newAccessToken}`;
      //   return fetch(url, requestOptions).then((response) =>
      //     handleResponse(response, url, requestOptions)
      //   );
      // } else {
      //   userService.logout();
      // }
    }

    if ([403].includes(response.status) && userService.userValue) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      userService.logout();
    }

    // get error message from body or default to response status
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
