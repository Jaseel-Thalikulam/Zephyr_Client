import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    
  children: React.ReactNode;

}

export default  function PrivateRoute(props: PrivateRouteProps) {
  
    if ( localStorage.getItem('accessToken')&&localStorage.getItem("refreshToken")) {
    
        return props.children

    } else {

        return <Navigate to={'/'} />

    }
    
}

