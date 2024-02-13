export const getRefreshToken = async () => {
  return  localStorage.getItem('refreshToken')
}
export const getAccessToken = async () => {
  return  localStorage.getItem('accessToken')
}

export const setRefreshToken = async(refreshToken:string)=> {
    localStorage.setItem('refreshToken',refreshToken);
    
}
export const setAccessToken = async(accessToken:string)=> {
    localStorage.setItem('accessToken',accessToken);
    
}