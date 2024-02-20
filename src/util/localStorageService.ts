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
export const removeAccessToken = async () => {
  localStorage.removeItem('accessToken')
}
export const removeRefreshToken = async () => {
  localStorage.removeItem('refreshToken')
}

export const removeTokens = async () => {
  await removeAccessToken()
  await removeRefreshToken()
}