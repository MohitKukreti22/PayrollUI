import { Navigate, Outlet } from "react-router-dom"

function PrivateRouteP(){
    var isLoggedIn = sessionStorage.getItem('token')
    var userType = sessionStorage.getItem('userType');
    var isManager = isLoggedIn && userType === 'PayrollProcessor';
    return(
        isManager ? <Outlet /> : <Navigate to='/payprocessorlogin' />
    );
}

export default PrivateRouteP;