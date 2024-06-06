import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteA(){
    var isLoggedIn = sessionStorage.getItem('token')
    var userType = sessionStorage.getItem('userType');
    var isManager = isLoggedIn && userType === 'Admin';
    return(
        isManager ? <Outlet /> : <Navigate to='/adminlogin'/>
    );
}

export default PrivateRouteA;