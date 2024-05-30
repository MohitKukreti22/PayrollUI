import React from 'react';
import { Link } from 'react-router-dom';
import {  useAuth } from '../../AuthContext';

const EmpolyeeNav = () => {

  const{signOut}=useAuth();

  return (
    <nav id="navbarNav" className="navbars navbar-expand-lg navbar-dark" style={{ backgroundColor: '#ff4c68' }}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGbrZCdHlfhEVvjShAvvV3z7TEuU21PGPPNg&usqp=CAU" alt="Maverick Bank Logo" width="50" height="50" className="d-inline-block rounded-circle" />
        <strong><b>EsayPay</b></strong>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
        <li className="nav-item m-2">
            <Link className="nav-link" to="/detailEmployee">Home</Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link" to="/updateEmployee">Account</Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link" to="/addtimesheet">TimeSheet</Link>
          </li>
          
          <li className="nav-item m-2">
            <Link className="nav-link" to="/employeepayroll">Payroll</Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link" to="/leaverequest">LeaveRequest</Link>
          </li>
          <li className="nav-item m-2">
            <button className="nav-link btn btn-link" onClick={signOut}>SignOut</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default EmpolyeeNav