import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken } from '../util/localStorageService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomAlert from '../mui/CustomAlert';

const SERVER_URI = import.meta.env.VITE_SERVER_URI
const axiosInstance = axios.create();




function Interceptor() {
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
    axiosInstance.defaults.baseURL = SERVER_URI

    axiosInstance.interceptors.request.use(async(config) => {
    
        const accessToken = await getAccessToken()
        
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

        if (error.code === 'ERR_NETWORK') {
            setSnackbarMessage('Request timed out: The network is slow.');
            setSnackbarOpen(true);
            return Promise.reject(error);
          }
        

        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === `getNewAccessToken`) {
            navigate('/')
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
            }, (err) => {
                console.log(err);
                
            })
        }
    return Promise.reject(error)
    }) 
    

     const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
      <>
          <CustomAlert handleCloseSnackbar={handleCloseSnackbar} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} severity='warning'/>
      </>
  )
}

export  {axiosInstance,Interceptor}



