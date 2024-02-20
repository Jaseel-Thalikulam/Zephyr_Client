import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute(props: PublicRouteProps) {
    try {
      
        if (! localStorage.getItem('accessToken') && !localStorage.getItem("refreshToken")) {
            
            return props.children
        
        } else {
        
            return <Navigate to={'/chats'} />
        
        }

    } catch (err) {
        
        console.log(err);
        
    }
    
}