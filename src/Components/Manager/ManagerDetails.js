// import React, { useState, useEffect } from 'react';

// function ManagerDetails() {
//     const [managerDetails, setManagerDetails] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const email = sessionStorage.getItem('email');

//         if (!email) {
//             setError('Email not found in session storage');
//             return;
//         }

//         const fetchManagerDetails = async () => {
//             setLoading(true);
//             try {
//                 const token = sessionStorage.getItem('token');
//                 if (!token) {
//                     throw new Error('Token not found in session storage');
//                 }

//                 const response = await fetch(`https://localhost:7198/api/Manager/${encodeURIComponent(email)}`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch manager details');
//                 }

//                 const managerData = await response.json();
//                 setManagerDetails(managerData);

//                 // Store manager ID and userType in session storage
//                 sessionStorage.setItem('managerID', managerData.managerID);
//                 sessionStorage.setItem('userType', managerData.validation.userType);
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         };

//         fetchManagerDetails();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="containers mt-4">
//             <h2>Manager Details</h2>
//             <ul>
//                 <li><strong>Manager ID:</strong> {managerDetails.managerID}</li>
//                 <li><strong>Name:</strong> {managerDetails.name}</li>
//                 <li><strong>Email:</strong> {managerDetails.email}</li>
//                 <li><strong>Phone:</strong> {managerDetails.phone}</li>
//             </ul>
//             <div>
//                 <h3>Validation Information</h3>
//                 <ul>
//                     <li><strong>Email:</strong> {managerDetails.validation && managerDetails.validation.email}</li>
//                     {/* Other validation information */}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default ManagerDetails;

import React, { useState, useEffect } from 'react';
import './ManagerDetails.css'; // Ensure you create and link this CSS file for styling

function ManagerDetails() {
    const [managerDetails, setManagerDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const email = sessionStorage.getItem('email');

        if (!email) {
            setError('Email not found in session storage');
            return;
        }

        const fetchManagerDetails = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found in session storage');
                }

                const response = await fetch(`https://localhost:7198/api/Manager/${encodeURIComponent(email)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch manager details');
                }

                const managerData = await response.json();
                setManagerDetails(managerData);

                // Store manager ID and userType in session storage
                sessionStorage.setItem('managerID', managerData.managerID);
                sessionStorage.setItem('userType', managerData.validation.userType);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchManagerDetails();
    }, []);

    if (loading) {
        return <div className="manager-loading">Loading...</div>;
    }

    if (error) {
        return <div className="manager-error">Error: {error}</div>;
    }

    return (
        <div className="manager-container">
            <h2 className="manager-title">Manager Details</h2>
            <ul className="manager-list">
                <li><strong>Manager ID:</strong> {managerDetails.managerID}</li>
                <li><strong>Name:</strong> {managerDetails.name}</li>
                <li><strong>Email:</strong> {managerDetails.email}</li>
                <li><strong>Phone:</strong> {managerDetails.phone}</li>
            </ul>
            <div className="manager-validation">
                <h3>Validation Information</h3>
                <ul>
                    <li><strong>Email:</strong> {managerDetails.validation && managerDetails.validation.email}</li>
                    {/* Other validation information */}
                </ul>
            </div>
        </div>
    );
}

export default ManagerDetails;
