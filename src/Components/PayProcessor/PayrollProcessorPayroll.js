


// import React, { useState, useEffect } from 'react';

// function PayrollProcessorPayroll() {
//     const [formData, setFormData] = useState({
//         employeeId: '',
//         payrollMonth: '',
//         status: 'Completed',
//         payrollYear: '',
//         totalEarnings: '',
//         totalDeductions: '',
//         payrollProcessorId: sessionStorage.getItem('payrollProcessorID') || '',
//     });

//     const [payrolls, setPayrolls] = useState([]);
//     const [showData, setShowData] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
//     const token = sessionStorage.getItem('token') || '';

//     useEffect(() => {
//         const fetchPayrolls = async () => {
//             try {
//                 const response = await fetch('https://localhost:7198/api/PayrollProcessorPayroll/all', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Accept': 'application/json',
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch payrolls');
//                 }

//                 const payrollsData = await response.json();
//                 setPayrolls(payrollsData);
//             } catch (error) {
//                 console.error('Error fetching payrolls:', error.message);
//             }
//         };

//         fetchPayrolls();
//     }, [token]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const url = `https://localhost:7198/api/PayrollProcessorPayroll/add?employeeId=${formData.employeeId}&payrollMonth=${formData.payrollMonth}&status=${formData.status}&payrollYear=${formData.payrollYear}&totalEarnings=${formData.totalEarnings}&totalDeductions=${formData.totalDeductions}&payrollProcessorId=${formData.payrollProcessorId}`;

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to add payroll');
//             }

//             const data = await response.json();
//             setAlertMessage('Payroll added successfully');
//             setFormData({
//                 employeeId: '',
//                 payrollMonth: '',
//                 status: 'Completed',
//                 payrollYear: '',
//                 totalEarnings: '',
//                 totalDeductions: '',
//                 payrollProcessorId: sessionStorage.getItem('payrollProcessorID') || '',
//             });
//             setPayrolls(prevPayrolls => [...prevPayrolls, data]); // Add new payroll to the existing list
//         } catch (error) {
//             console.error('Error adding payroll:', error.message);
//             setAlertMessage('Failed to add payroll');
//         }
//     };

//     const toggleShowData = () => {
//         setShowData(prevState => !prevState);
//     };


//     return (
//         <div className="containers mt-4">
//             <div className="row">
//                 <div className="col-md-6">
//                     <h2>Add Payroll Processor Payroll</h2>
//                     {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="mb-3">
//                             <label htmlFor="employeeId" className="form-label">Employee ID</label>
//                             <input type="number" className="form-control" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="payrollMonth" className="form-label">Payroll Month</label>
//                             <input type="number" className="form-control" id="payrollMonth" name="payrollMonth" value={formData.payrollMonth} onChange={handleChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="payrollYear" className="form-label">Payroll Year</label>
//                             <input type="number" className="form-control" id="payrollYear" name="payrollYear" value={formData.payrollYear} onChange={handleChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="totalEarnings" className="form-label">Total Earnings</label>
//                             <input type="number" className="form-control" id="totalEarnings" name="totalEarnings" value={formData.totalEarnings} onChange={handleChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="totalDeductions" className="form-label">Total Deductions</label>
//                             <input type="number" className="form-control" id="totalDeductions" name="totalDeductions" value={formData.totalDeductions} onChange={handleChange} required />
//                         </div>
//                         {/* Additional inputs can be added here */}
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </form>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="card">
//                         <div className="card-body">
                            
//                             <button className="btn btn-primary mb-3" onClick={toggleShowData}>
//                                 {showData ? 'Cancel ' : 'Show Payroll'}
//                             </button>
//                             {showData && (
//                                 <table className="table">
//                                     <thead>
//                                         <tr>
//                                             <th>Payroll ID</th>
//                                             <th>Employee ID</th>
//                                             <th>Payroll Month</th>
//                                             <th>Status</th>
//                                             <th>Payroll Year</th>
//                                             <th>Total Earnings</th>
//                                             <th>Total Deductions</th>
//                                             <th>Net Salary</th>
//                                             <th>Payroll Processor ID</th>
//                                             <th>Verified At</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {payrolls.map(payroll => (
//                                             <tr key={payroll.payrollID}>
//                                                 <td>{payroll.payrollID}</td>
//                                                 <td>{payroll.employeeID}</td>
//                                                 <td>{payroll.payrollMonth}</td>
//                                                 <td>{payroll.status}</td>
//                                                 <td>{payroll.payrollYear}</td>
//                                                 <td>{payroll.totalEarnings}</td>
//                                                 <td>{payroll.totalDeductions}</td>
//                                                 <td>{payroll.netSalary}</td>
//                                                 <td>{payroll.payrollProcessorID}</td>
//                                                 <td>{payroll.verifiedAt}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PayrollProcessorPayroll;



import React, { useState, useEffect } from 'react';
import './PayrollProcessorPayroll.css'; // Ensure you create and link this CSS file for styling

function PayrollProcessorPayroll() {
    const [formData, setFormData] = useState({
        employeeId: '',
        payrollMonth: '',
        status: 'Completed',
        payrollYear: '',
        totalEarnings: '',
        totalDeductions: '',
        payrollProcessorId: sessionStorage.getItem('payrollProcessorID') || '',
    });

    const [payrolls, setPayrolls] = useState([]);
    const [activeCard, setActiveCard] = useState('addPayroll'); // State to control which card is active
    const [alertMessage, setAlertMessage] = useState('');
    const token = sessionStorage.getItem('token') || '';

    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const response = await fetch('https://localhost:7198/api/PayrollProcessorPayroll/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch payrolls');
                }

                const payrollsData = await response.json();
                setPayrolls(payrollsData);
            } catch (error) {
                console.error('Error fetching payrolls:', error.message);
            }
        };

        fetchPayrolls();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `https://localhost:7198/api/PayrollProcessorPayroll/add?employeeId=${formData.employeeId}&payrollMonth=${formData.payrollMonth}&status=${formData.status}&payrollYear=${formData.payrollYear}&totalEarnings=${formData.totalEarnings}&totalDeductions=${formData.totalDeductions}&payrollProcessorId=${formData.payrollProcessorId}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add payroll');
            }

            const data = await response.json();
            setAlertMessage('Payroll added successfully');
            setFormData({
                employeeId: '',
                payrollMonth: '',
                status: 'Completed',
                payrollYear: '',
                totalEarnings: '',
                totalDeductions: '',
                payrollProcessorId: sessionStorage.getItem('payrollProcessorID') || '',
            });
            setPayrolls(prevPayrolls => [...prevPayrolls, data]); // Add new payroll to the existing list
        } catch (error) {
            console.error('Error adding payroll:', error.message);
            setAlertMessage('Failed to add payroll');
        }
    };

    return (
        <div className="payroll-layout">
            <div className="payroll-sidebar">
                <button onClick={() => setActiveCard('addPayroll')} className="sidebar-button">Add Payroll</button>
                <button onClick={() => setActiveCard('viewPayroll')} className="sidebar-button">View Payroll</button>
            </div>
            <div className="payroll-content">
                {activeCard === 'addPayroll' && (
                    <div className="cardss">
                        <div className="cardss-body">
                            <h2>Add Payroll Processor Payroll</h2>
                            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
                            <form onSubmit={handleSubmit} className='forms-control'>
                            <div className="mb-3">
                        <label htmlFor="employeeId" className="form-label">Employee ID</label>
                        <input type="number" className="forms-control" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="payrollMonth" className="form-label">Payroll Month</label>
                        <input type="number" className="forms-control" id="payrollMonth" name="payrollMonth" value={formData.payrollMonth} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="payrollYear" className="form-label">Payroll Year</label>
                        <input type="number" className="forms-control" id="payrollYear" name="payrollYear" value={formData.payrollYear} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalEarnings" className="form-label">Total Earnings</label>
                        <input type="number" className="forms-control" id="totalEarnings" name="totalEarnings" value={formData.totalEarnings} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalDeductions" className="form-label">Total Deductions</label>
                        <input type="number" className="forms-control" id="totalDeductions" name="totalDeductions" value={formData.totalDeductions} onChange={handleChange} required />
                    </div>
                    {/* Additional inputs can be added here */}
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                {activeCard === 'viewPayroll' && (
                    <div className="cardss">
                        <div className="cardss-body">
                            <table className="table">
                            <thead>
                                    <tr>
                                        <th>Payroll ID</th>
                                        <th>Employee ID</th>
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
                                    {payrolls.map(payroll => (
                                        <tr key={payroll.payrollID}>
                                            <td>{payroll.payrollID}</td>
                                            <td>{payroll.employeeID}</td>
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
                )}
            </div>
        </div>
    );
}

export default PayrollProcessorPayroll;
