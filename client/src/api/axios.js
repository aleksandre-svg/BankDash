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

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
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