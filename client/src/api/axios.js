import axios from 'axios'

function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
                break
            }
        }
    }
    return cookieValue
}

const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const baseURL = rawBaseURL.replace(/\/+$/, '') + '/api';

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    xsrfCookieName: 'csrftoken', 
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

export default api