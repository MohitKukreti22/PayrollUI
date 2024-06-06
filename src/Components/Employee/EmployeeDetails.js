
// import React, { useState, useEffect } from 'react';

// function EmployeeDetails() {
//     const [employeeDetails, setEmployeeDetails] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             setLoading(true);
//             try {
//                 // Retrieve email from session storage
//                 const email = sessionStorage.getItem('email');
//                 const response = await fetch(`https://localhost:7198/api/Employee/${encodeURIComponent(email)}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch employee details');
//                 }
//                 const employeeData = await response.json();
//                 setEmployeeDetails(employeeData);
//                 // Store employee ID in session storage
//                 sessionStorage.setItem('employeeID', employeeData.employeeID);
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         };

//         fetchEmployee();
//     }, []);

//     if (loading) {
//         return <div className="container mt-5">Loading...</div>;
//     }

//     if (error) {
//         return <div className="container mt-5">Error: {error}</div>;
//     }

//     return (
//         <div className="containers mt-5">
//             <div className="card">
//                 <div className="card-header">
//                     <h2 className="card-title">Welcome</h2>
//                 </div>
//                 <div className="card-body">
                    
//                     <p className="card-text">Name: {employeeDetails.employeeName}</p>
//                     <p className="card-text">Date of Birth: {employeeDetails.dateOfBirth}</p>
//                     <p className="card-text">Joining Date: {employeeDetails.joiningDate}</p>
//                     <p className="card-text">Department: {employeeDetails.department}</p>
//                     <p className="card-text">Position: {employeeDetails.position}</p>
//                     <p className="card-text">Contact Number: {employeeDetails.contactNumber}</p>
//                     <p className="card-text">Address: {employeeDetails.address}</p>
//                     <p className="card-text">Bank Details: {employeeDetails.bankDetails}</p>
//                     <p className="card-text">Tax Information: {employeeDetails.taxInformation}</p>
//                     <p className="card-text">Email: {employeeDetails.email}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EmployeeDetails;

import React, { useState, useEffect } from 'react';
import './EmployeeDetail.css'; // Ensure the CSS file path is correct

function EmployeeDetails() {
    const [employeeDetails, setEmployeeDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const email = sessionStorage.getItem('email');
                const response = await fetch(`https://localhost:7198/api/Employee/${encodeURIComponent(email)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch employee details');
                }
                const employeeData = await response.json();
                setEmployeeDetails(employeeData);
                sessionStorage.setItem('employeeID', employeeData.employeeID);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchEmployee();
    }, []);

    if (loading) {
        return <div className="profile-container">Loading...</div>;
    }

    if (error) {
        return <div className="profile-container">Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2 className="profile-title">Welcome</h2>
                </div>
                <div className="profile-body">
                    <p className="profile-text">Name: {employeeDetails.employeeName}</p>
                    <p className="profile-text">Date of Birth: {employeeDetails.dateOfBirth}</p>
                    <p className="profile-text">Joining Date: {employeeDetails.joiningDate}</p>
                    <p className="profile-text">Department: {employeeDetails.department}</p>
                    <p className="profile-text">Position: {employeeDetails.position}</p>
                    <p className="profile-text">Contact Number: {employeeDetails.contactNumber}</p>
                    <p className="profile-text">Address: {employeeDetails.address}</p>
                    <p className="profile-text">Bank Details: {employeeDetails.bankDetails}</p>
                    <p className="profile-text">Tax Information: {employeeDetails.taxInformation}</p>
                    <p className="profile-text">Email: {employeeDetails.email}</p>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;