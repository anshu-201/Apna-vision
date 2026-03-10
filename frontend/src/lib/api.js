import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function adminLogin(key) {
  await api.post("/api/admin/login", { key });
}

export async function adminLogout() {
  await api.post("/api/admin/logout");
}

export async function adminMe() {
  const res = await api.get("/api/admin/me");
  return res.data;
}

