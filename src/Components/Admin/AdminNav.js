import React from 'react';
import { Link } from 'react-router-dom';
import {  useAuth } from '../../AuthContext';

const AdminNav = () => {
  const{signOut}=useAuth();
  return (
    <nav id="navbarNav" className="navbars navbar-expand-lg navbar-dark" style={{ backgroundColor: '#ff4c68' }}>
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img src="https://previews.123rf.com/images/mohammadmuhtadi/mohammadmuhtadi1811/mohammadmuhtadi181105068/121325736-initial-letter-ep-template-design.jpg" alt="Maverick Bank Logo" width="50" height="50" className="d-inline-block rounded-circle" />
        <strong><b>EsayPay</b></strong>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
        <li className="nav-item m-2">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link" to="/">Account</Link>
          </li>
          <li className="nav-item m-2">
            <Link className="nav-link" to="/">Manage Employee</Link>
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

export default AdminNav