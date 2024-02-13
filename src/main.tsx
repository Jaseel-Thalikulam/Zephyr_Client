import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PublicClientApplication, EventType,AccountEntity, AccountInfo } from '@azure/msal-browser';
import { msalConfig } from './util/authConfig.ts';

const msalInstance = new PublicClientApplication(msalConfig);



if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
 
  
  const activeAccount = msalInstance.getActiveAccount();


  if (activeAccount) {
    msalInstance.setActiveAccount(activeAccount);
  }
}


// Listen for sign-in event and set active account
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload!.account) {

        
      const account = event.payload?.account;
      console.log(event.payload);
    
      
        msalInstance.setActiveAccount(account);
    }
});





ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App instance={msalInstance}/>
  // </StrictMode>,
)
