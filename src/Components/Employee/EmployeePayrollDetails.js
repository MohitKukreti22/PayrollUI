
// import React, { useState, useEffect } from 'react';

// function EmployeePayrollDetails() {
//     const [payrollDetails, setPayrollDetails] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const employeeId = sessionStorage.getItem('employeeID');
//         if (!employeeId) {
//             setError('Employee ID not found in session storage');
//             return;
//         }

//         const fetchPayrollDetails = async () => {
//             setLoading(true);
//             try {
//                 const storedToken = sessionStorage.getItem('token');
//                 if (!storedToken) {
//                     throw new Error('Token not found in session storage');
//                 }

//                 const response = await fetch(`https://localhost:7198/api/EmployeePayroll/${employeeId}`, {
//                     headers: {
//                         'Authorization': `Bearer ${storedToken}`,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 });
                
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch payroll details');
//                 }

//                 const payrollData = await response.json();
//                 setPayrollDetails(payrollData);
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         };

//         fetchPayrollDetails();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className="containers mt-4">
//             <h2 className="mb-4">Employee Payroll Details</h2>
//             <div className="table-responsive">
//                 <table className="table table-bordered">
//                     <tbody>
//                         <tr>
//                             <th>Payroll ID</th>
//                             <td>{payrollDetails.payrollID}</td>
//                         </tr>
//                         <tr>
//                             <th>Payroll Month</th>
//                             <td>{payrollDetails.payrollMonth}</td>
//                         </tr>
//                         <tr>
//                             <th>Status</th>
//                             <td>{payrollDetails.status}</td>
//                         </tr>
//                         <tr>
//                             <th>Payroll Year</th>
//                             <td>{payrollDetails.payrollYear}</td>
//                         </tr>
//                         <tr>
//                             <th>Total Earnings</th>
//                             <td>{payrollDetails.totalEarnings}</td>
//                         </tr>
//                         <tr>
//                             <th>Total Deductions</th>
//                             <td>{payrollDetails.totalDeductions}</td>
//                         </tr>
//                         <tr>
//                             <th>Net Salary</th>
//                             <td>{payrollDetails.netSalary}</td>
//                         </tr>
//                         <tr>
//                             <th>Payroll Processor ID</th>
//                             <td>{payrollDetails.payrollProcessorID}</td>
//                         </tr>
//                         <tr>
//                             <th>Verified At</th>
//                             <td>{payrollDetails.verifiedAt}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default EmployeePayrollDetails;


import React, { useState, useEffect } from 'react';

function EmployeePayrollDetails() {
    const [payrollDetails, setPayrollDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const employeeId = sessionStorage.getItem('employeeID');
        if (!employeeId) {
            setError('Employee ID not found in session storage');
            return;
        }

        const fetchPayrollDetails = async () => {
            setLoading(true);
            try {
                const storedToken = sessionStorage.getItem('token');
                if (!storedToken) {
                    throw new Error('Token not found in session storage');
                }

                const response = await fetch(`https://localhost:7198/api/EmployeePayroll/${employeeId}`, {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch payroll details');
                }

                const payrollData = await response.json();
                setPayrollDetails(Array.isArray(payrollData) ? payrollData : [payrollData]);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchPayrollDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="containers mt-4">
            <h2 className="mb-4">Employee Payroll Details</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        {payrollDetails.length > 0 ? (
                            <>
                                <tr>
                                    <th>Payroll ID</th>
                                    <td>{payrollDetails[0].payrollID}</td>
                                </tr>
                                <tr>
                                    <th>Payroll Month</th>
                                    <td>{payrollDetails[0].payrollMonth}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{payrollDetails[0].status}</td>
                                </tr>
                                <tr>
                                    <th>Payroll Year</th>
                                    <td>{payrollDetails[0].payrollYear}</td>
                                </tr>
                                <tr>
                                    <th>Total Earnings</th>
                                    <td>{payrollDetails[0].totalEarnings}</td>
                                </tr>
                                <tr>
                                    <th>Total Deductions</th>
                                    <td>{payrollDetails[0].totalDeductions}</td>
                                </tr>
                                <tr>
                                    <th>Net Salary</th>
                                    <td>{payrollDetails[0].netSalary}</td>
                                </tr>
                                <tr>
                                    <th>Payroll Processor ID</th>
                                    <td>{payrollDetails[0].payrollProcessorID}</td>
                                </tr>
                                <tr>
                                    <th>Verified At</th>
                                    <td>{payrollDetails[0].verifiedAt}</td>
                                </tr>
                            </>
                        ) : (
                            <tr>
                                <td colSpan="2">No payroll details found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeePayrollDetails;
