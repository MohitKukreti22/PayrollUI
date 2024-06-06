import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import EmployeeLogin from './Components/Login/EmployeeLogin';
import EmployeeLoginNav from './Components/Login/EmployeeLoginNav';
import UpdateEmployee from './Components/Employee/UpdateEmployee'
import EmployeeNav from './Components/Employee/EmployeeNav';
import AddTimesheet from "./Components/Employee/AddTimeSheet";
import AddLeaveRequest from "./Components/Employee/AddLeaveRequest";
import ManagerLogin from "./Components/Login/ManagerLogin";
import AdminLogin from "./Components/Login/AdminLogin";
import ManagerNav from "./Components/Manager/ManagerNav";
import ManagerProfile from "./Components/Manager/ManagerProfile";
import ManagerLoginNav from "./Components/Login/ManagerLoginNav";
import LeaveRequest from "./Components/Manager/LeaveRequest";
import AdminLoginNav from "./Components/Login/AdminLoginNav";
import PayProcessorNav from "./Components/PayProcessor/PayProcessorNav";
import PayrollProcessorPayroll from "./Components/PayProcessor/PayrollProcessorPayroll";
import PayProcessorLogin from "./Components/Login/PayprocessorLogin";
import PayProcessorLoginNav from "./Components/Login/PayProcessorLoginNav";
import EmployeeRegister from "./Components/Employee/EmployeeRegister";
import EmployeeDetails from "./Components/Employee/EmployeeDetails";
import EmployeePayrollDetails from "./Components/Employee/EmployeePayrollDetails";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";
import PrivateRouteM from "./Components/PrivateRoutes/PrivateRouteM";
import ManagerDetails from "./Components/Manager/ManagerDetails";
import PayrollProcessorDetail from "./Components/PayProcessor/PayrollProcessorDetail";
import PayrollProcessorUpdate from "./Components/PayProcessor/PayrollProcessorUpdate";
import PrivateRouteP from "./Components/PrivateRoutes/PrivateRouteP";
import PrivateRouteA from "./Components/PrivateRoutes/PrivateRouteA";
import AdminNav from "./Components/Admin/AdminNav";
import AdminEmployee from "./Components/Admin/AdminEmpolyee";

function App() {
      return (
        <AuthProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<><LandingPage /></>} />
              <Route path="/login" element={<>
                <EmployeeLoginNav />
                <EmployeeLogin />
              
              </>} />
              <Route path="/updateEmployee" element={<><PrivateRoute/><EmployeeNav/><UpdateEmployee/></>}/>
              <Route path="/addtimesheet" element={<><PrivateRoute/><EmployeeNav/><AddTimesheet/></>}/>
              <Route path="/leaverequest" element={<><PrivateRoute/><EmployeeNav/><AddLeaveRequest/></>}/>
              <Route path="/mangerlogin"element={<><ManagerLoginNav/><ManagerLogin/></>}/>
              <Route path="/adminlogin"element={<><AdminLoginNav/><AdminLogin/></>}/>
              <Route path="/UpdateManager"element={<><PrivateRouteM/><ManagerNav/><ManagerProfile/></>}/>
              <Route path="/payprocessorlogin"element={<><PayProcessorLoginNav/><PayProcessorLogin/></>}/>
              <Route path="/ManageRequest"element={<><PrivateRouteM/><ManagerNav/><LeaveRequest/></>}/>
              <Route path="/payrollprocessor"element={<><PrivateRouteP/><PayProcessorNav/><PayrollProcessorPayroll/></>}/>
              <Route path="/AdminEmployee" element={<><PrivateRouteA/><AdminNav/><AdminEmployee/></>}/>
             <Route path="/detailEmployee"element={<><PrivateRoute/><EmployeeNav/><EmployeeDetails/></>}/>
              <Route path="/employeepayroll"element={<><PrivateRoute/><EmployeeNav/><EmployeePayrollDetails/></>}/>
              <Route path="/mangerDetails"element={<><PrivateRouteM/><ManagerNav/><ManagerDetails/></>}/>
               <Route path="/payprocesssordetails"element={<><PrivateRouteP/><PayProcessorNav/><PayrollProcessorDetail/></>}/>
              <Route path="/updatepayrollprocessor"element={<><PrivateRouteP/><PayProcessorNav/><PayrollProcessorUpdate/></>}/>
              <Route path="/employeeregister"element={<><EmployeeLoginNav/><EmployeeRegister/></>}/>
              </Routes>
              
    </div>
    </Router>
   

   
    </AuthProvider>
    );
    
    }
    export default App;