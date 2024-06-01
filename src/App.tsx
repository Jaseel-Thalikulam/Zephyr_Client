import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { ColorPicker, ConfigProvider } from "antd";
import { useState } from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { MsalProvider } from '@azure/msal-react';
import Chats from "./pages/Chats";
import { IMicrosoftAzureAccountInstance } from "./interfaces/IMicrosoftAzureAccountInstance";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Interceptor } from "./interceptor/Interceptor";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
function App({ instance }:IMicrosoftAzureAccountInstance ): JSX.Element {
  const [primary, setPrimary] = useState("#fc03df");
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  // const initialTheme = {
  //   token: {
  //     colorPrimary: primary,
  //   },
  // }

  // const [theme,setTheme] =useState(initialTheme)
console.log(instance,"instance form app.jsx");

  return (
    <>
      {/* <ColorPicker
        showText
        value={primary}
        onChangeComplete={(color) => setPrimary(color.toHexString())}
      /> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primary, 
          },
        }}
      >
        <StyleProvider hashPriority="high">
          
          <MsalProvider instance={instance}>

            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              
              <BrowserRouter>
                
                <Interceptor />

                <Routes>
                  
                  <Route path="/" element={
                  
                    <PublicRoute>
                      
                      <Login />
                      
                  </PublicRoute>
                  
                  } />

                  <Route path="/chats" element={
                  
                    <PrivateRoute>
                      
                      <Chats />
                      
                  </PrivateRoute>
                  
                  } />

                </Routes>
                
              </BrowserRouter>
              
            </GoogleOAuthProvider>
            
          </MsalProvider>
          
        </StyleProvider>

      </ConfigProvider>
    </>
  );
}

export default App;
