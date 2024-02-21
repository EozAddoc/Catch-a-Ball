import { Navigate, Outlet } from 'react-router-dom'
import jsCookie from "js-cookie";
  
const PrivateRoutes = ({ element}) => {
    const token = jsCookie.get("token");
    let authenticated = token !== null && token !== undefined;

    return (
      authenticated ? element : <Navigate to='/'/>
    )
  }
export default PrivateRoutes;