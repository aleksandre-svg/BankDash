import axios from 'axios'

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const baseURL = rawBaseURL.replace(/\/+$/, '') + '/api'

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const method = config.method ? config.method.toUpperCase() : ''
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        const csrfToken = localStorage.getItem('csrftoken')
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken
        }
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default api