// API_URL
const baseURL = "http://localhost:4000/api";

export const http = (suffix: string, init?: RequestInit) => fetch(baseURL + suffix);
