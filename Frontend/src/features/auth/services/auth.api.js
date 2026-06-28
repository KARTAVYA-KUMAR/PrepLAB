import axios from "axios"


const getBaseURL = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        return "http://localhost:3000"
    }
    return ""
}

const api = axios.create({
    baseURL: getBaseURL(),
    withCredentials: true
})

export async function register({ username, email, password }) {
    const response = await api.post('/api/auth/register', {
        username, email, password
    })
    return response.data
}

export async function login({ email, password }) {
    const response = await api.post("/api/auth/login", {
        email, password
    })
    return response.data
}

export async function logout() {
    const response = await api.get("/api/auth/logout")
    return response.data
}

export async function getMe() {
    const response = await api.get("/api/auth/get-me")
    return response.data
}