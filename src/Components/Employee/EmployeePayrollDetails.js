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
                    <thead>
                        <tr>
                            <th>Payroll ID</th>
                            <th>Payroll Month</th>
                            <th>Status</th>
                            <th>Payroll Year</th>
                            <th>Total Earnings</th>
                            <th>Total Deductions</th>
                            <th>Net Salary</th>
                            <th>Payroll Processor ID</th>
                            <th>Verified At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrollDetails.map(payroll => (
                            <tr key={payroll.payrollID}>
                                <td>{payroll.payrollID}</td>
                                <td>{payroll.payrollMonth}</td>
                                <td>{payroll.status}</td>
                                <td>{payroll.payrollYear}</td>
                                <td>{payroll.totalEarnings}</td>
                                <td>{payroll.totalDeductions}</td>
                                <td>{payroll.netSalary}</td>
                                <td>{payroll.payrollProcessorID}</td>
                                <td>{payroll.verifiedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeePayrollDetails;
