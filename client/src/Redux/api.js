import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("userToken")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("userToken")).token}`
    }
    return req
})

export const signUp = (data) => API.post("/signup", data)
export const login = (data) => API.post("/login", data)
export const city = (data) => API.post("/city", data)
export const cities = () => API.get("/cities")
