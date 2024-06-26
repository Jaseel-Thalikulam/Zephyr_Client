import axios, { AxiosResponse } from "axios";

import { IUser } from "../interfaces/IUser";
const SERVER_URI = import.meta.env.VITE_SERVER_URI as string

export const getUser = async (user:IUser):Promise<AxiosResponse |null> => {
    try {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const gitAuthCode = urlParams.get("code");
        if (gitAuthCode) {
            
           return await axios.get(SERVER_URI+'getGithubAccessToken', {
                params: {
                    code: gitAuthCode
                }
            })

        } else {
                      
            if (user && user.email) {   
                console.log(user,"user");
                
               return await axios.post(SERVER_URI + 'createUserWithMicrosoftOrGoogle', {
                   user
                })
    
            } 
       
            return null

        }

    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch user data');
    }
}

