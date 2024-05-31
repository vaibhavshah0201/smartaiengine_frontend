// services/authService.js
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import Cookies from "js-cookie";

const authService = {
  getAccessToken,
  refreshToken,
  logout,
};

function getAccessToken() {
  return Cookies.get("accessToken");
}

async function refreshToken() {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const response = await fetchWrapper.post("http://localhost:8000/token", {
      token: refreshToken,
    });

    if (response.data.code === 200) {
      Cookies.set("accessToken", response.accessToken);
      Cookies.set("userDetails", response.result);
      return response.accessToken;
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    logout();
  }
  return null;
}

function logout() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
}

export default authService;
