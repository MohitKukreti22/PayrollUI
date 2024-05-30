import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteM(){
    var isLoggedIn = sessionStorage.getItem('token')
    var userType = sessionStorage.getItem('userType');
    var isManager = isLoggedIn && userType === 'Manager';
    return(
        isManager ? <Outlet /> : <Navigate to='/mangerlogin' />
    );
}

export default PrivateRouteM;