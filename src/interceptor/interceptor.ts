import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from '../util/localStorageService';

const axiosInstance = axios.create();
const SERVER_URI =import.meta.env.VITE_SERVER_URI
axiosInstance.defaults.baseURL=SERVER_URI

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config
},
    (error) => {
        Promise.reject(error)
    }
)


axiosInstance.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === `getNewAccessToken`) {
        return Promise.reject(error)
    }
    
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await getRefreshToken()   
        return axiosInstance.post(`getNewAccessToken`, {
            refreshToken:refreshToken
        }).then((res) => {
            if (res.status === 201 && res.data.success) {
                setAccessToken(res.data.accessToken)
                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ` + getAccessToken()
                
                return axiosInstance(originalRequest)
            }
        })
    }
return Promise.reject(error)
})

 export default axiosInstance